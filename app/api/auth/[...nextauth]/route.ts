import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { comparePassword } from '@/lib/auth';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Please provide email and password');
                }

                try {
                    await connectDB();

                    // Find user with password field
                    const user = await User.findOne({
                        email: credentials.email.toLowerCase(),
                    }).select('+password');

                    if (!user) {
                        throw new Error('Invalid email or password');
                    }

                    // Verify password
                    const isValid = await comparePassword(
                        credentials.password,
                        user.password
                    );

                    if (!isValid) {
                        throw new Error('Invalid email or password');
                    }

                    // Return user object (without password)
                    return {
                        id: user._id.toString(),
                        name: user.name,
                        email: user.email,
                        userType: user.userType,
                    };
                } catch (error: any) {
                    console.error('Auth error:', error);
                    throw new Error(error.message || 'Authentication failed');
                }
            },
        }),
    ],
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    pages: {
        signIn: '/login',
        error: '/login',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.userType = (user as any).userType;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).id = token.id;
                (session.user as any).userType = token.userType;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
