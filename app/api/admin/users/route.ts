import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

const createSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['user', 'admin']).optional()
});

export async function GET() {
  const session = await getServerSession(authOptions);
  const user = session?.user as any;
  if (!user?.id || user.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  let client;
  try {
    client = await clientPromise;
  } catch (dbErr) {
    console.error('Admin GET users DB connect error:', dbErr);
    return NextResponse.json({ error: 'Database unavailable' }, { status: 503 });
  }
  const db = client.db();
  const users = await db.collection('users').find({}, { projection: { password: 0 } }).toArray();
  const sanitized = users.map((user) => ({
    _id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role ?? 'user',
    disabled: !!user.disabled
  }));
  return NextResponse.json({ users: sanitized });
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const user = session?.user as any;
  if (!user?.id || user.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const parsed = createSchema.parse(body);

    let client;
    try {
      client = await clientPromise;
    } catch (dbErr) {
      console.error('Admin POST users DB connect error:', dbErr);
      return NextResponse.json({ error: 'Database unavailable' }, { status: 503 });
    }
    const db = client.db();

    await db.collection('users').createIndex({ email: 1 }, { unique: true });
    const exists = await db.collection('users').findOne({ email: parsed.email.toLowerCase() });
    if (exists) return NextResponse.json({ error: 'User exists' }, { status: 409 });

    const hashed = await bcrypt.hash(parsed.password, 10);
    const now = new Date();
    const result = await db.collection('users').insertOne({
      name: parsed.name,
      email: parsed.email.toLowerCase(),
      password: hashed,
      role: parsed.role ?? 'user',
      disabled: false,
      createdAt: now,
      updatedAt: now
    });

    return NextResponse.json({ ok: true, id: result.insertedId.toString() }, { status: 201 });
  } catch (err: any) {
    if (err.name === 'ZodError') return NextResponse.json({ error: err.errors }, { status: 422 });
    console.error(err);
    return NextResponse.json({ error: 'Internal' }, { status: 500 });
  }
}
