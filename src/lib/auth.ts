import NextAuth, { NextAuthConfig } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { verifyUser } from './users'

export const authConfig: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email:    { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        const user = await verifyUser(
          credentials.email as string,
          credentials.password as string
        )
        return user ?? null
      },
    }),
  ],
  session: { strategy: 'jwt', maxAge: 8 * 60 * 60 },
  pages: {
    signIn:  '/login',
    error:   '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id      = user.id
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        token.role    = (user as any).role
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        token.company = (user as any).company
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (session.user as any).id      = token.id
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(session.user as any).role   = token.role
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(session.user as any).company = token.company
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
}

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig)
