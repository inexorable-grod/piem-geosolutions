'use client'
import { useSession } from 'next-auth/react'

export function useAuth() {
  const { data: session, status } = useSession()

  return {
    session,
    user: session?.user as Record<string, unknown> | undefined,
    isAuthenticated: status === 'authenticated',
    isLoading: status === 'loading',
    role: (session?.user as Record<string, unknown>)?.role as string | undefined,
  }
}
