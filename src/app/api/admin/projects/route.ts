import { auth } from '@/lib/auth'
import { MOCK_PROJECTS } from '@/lib/constants'
import { NextResponse } from 'next/server'

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  return NextResponse.json(MOCK_PROJECTS)
}
