import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import clientPromise from './mongodb';
import bcrypt from 'bcrypt';
import connectMongoose from './mongoose';
import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        await connectMongoose();

        const db = mongoose.connection.db;
        const user = await db.collection('users').findOne({
          email: credentials.email.toLowerCase()
        });

        if (!user || !user.password || user.disabled) {
          return null;
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          return null;
        }

        return {
          id: user._id.toString(),
          name: user.name ?? user.email,
          email: user.email,
          role: user.role ?? 'user'
        };
      }
    })
  ],
  pages: {
    signIn: '/signin'
  },
  callbacks: {
    async jwt({ token, user }) {
      // attach user id to token on sign in
      if (user?.id) token.sub = user.id as string;

      // attach role from user on sign-in
      if (user && (user as any).role) {
        token.role = (user as any).role;
      }

      // if token has no role but has sub, fetch from DB
      if (!token.role && token.sub) {
        try {
          const client = await clientPromise;
          const db = client.db();
          const u = await db.collection('users').findOne({ _id: new ObjectId(token.sub) });
          if (u && u.role) token.role = u.role;
        } catch (e) {
          // ignore DB errors here
        }
      }

      return token;
    },
    async session({ session, token, user }) {
      // prefer user.id (first sign-in), otherwise token.sub
      if (session.user) {
        (session.user as any).id = user?.id ?? token.sub;
        // expose role in session
        (session.user as any).role = (token as any).role ?? 'user';
      }
      return session;
    }
  }
};
