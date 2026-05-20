import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { ObjectId } from 'mongodb';

const registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6)
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = registerSchema.parse(body);

    let client;
    try {
      client = await clientPromise;
    } catch (dbErr) {
      console.error('Registration DB connect error:', dbErr);
      return NextResponse.json({ error: 'Database unavailable' }, { status: 503 });
    }
    const db = client.db();

    // ensure unique index on email
    await db.collection('users').createIndex({ email: 1 }, { unique: true });

    const usersCount = await db.collection('users').countDocuments();

    // If no users exist, allow open registration and make first user an admin
    let role = 'user';
    if (usersCount === 0) {
      role = 'admin';
    } else {
      // public registration for subsequent users; role stays user
      role = 'user';
    }

    const existing = await db.collection('users').findOne({ email: parsed.email.toLowerCase() });
    if (existing) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }

    const hashed = await bcrypt.hash(parsed.password, 10);

    const now = new Date();
    const result = await db.collection('users').insertOne({
      name: parsed.name,
      email: parsed.email.toLowerCase(),
      password: hashed,
      role,
      disabled: false,
      createdAt: now,
      updatedAt: now
    });

    return NextResponse.json({ ok: true, id: result.insertedId.toString(), role }, { status: 201 });
  } catch (err: any) {
    if (err.name === 'ZodError') {
      return NextResponse.json({ error: err.errors }, { status: 422 });
    }
    console.error('Registration error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
