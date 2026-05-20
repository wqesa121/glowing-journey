import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { ObjectId } from 'mongodb';

export async function PATCH(request: Request, context: any) {
  const { params } = context;
  const session = await getServerSession(authOptions);
  const user = session?.user as any;
  if (!user?.id || user.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { role, disabled } = body as { role?: 'user' | 'admin'; disabled?: boolean };

    let client;
    try {
      client = await clientPromise;
    } catch (dbErr) {
      console.error('Admin PATCH user DB connect error:', dbErr);
      return NextResponse.json({ error: 'Database unavailable' }, { status: 503 });
    }
    const db = client.db();

    const update: any = { updatedAt: new Date() };
    if (role) update.role = role;
    if (typeof disabled === 'boolean') update.disabled = disabled;

    await db.collection('users').updateOne({ _id: new ObjectId(params.id) }, { $set: update });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal' }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: any) {
  const { params } = context;
  const session = await getServerSession(authOptions);
  const user = session?.user as any;
  if (!user?.id || user.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    let client;
    try {
      client = await clientPromise;
    } catch (dbErr) {
      console.error('Admin DELETE user DB connect error:', dbErr);
      return NextResponse.json({ error: 'Database unavailable' }, { status: 503 });
    }
    const db = client.db();
    await db.collection('users').deleteOne({ _id: new ObjectId(params.id) });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal' }, { status: 500 });
  }
}
