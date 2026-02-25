import { auth } from '@/lib/auth'
import { getAllUsers, createUser, updateUser, deleteUser } from '@/lib/users'
import { NextRequest, NextResponse } from 'next/server'

async function requireAdmin() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if ((session.user as Record<string, unknown>).role !== 'admin')
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  return null
}

export async function GET() {
  const guard = await requireAdmin()
  if (guard) return guard
  return NextResponse.json(getAllUsers())
}

export async function POST(req: NextRequest) {
  const guard = await requireAdmin()
  if (guard) return guard
  const body = await req.json()
  const user = await createUser(body)
  return NextResponse.json(user, { status: 201 })
}

export async function PUT(req: NextRequest) {
  const guard = await requireAdmin()
  if (guard) return guard
  const body = await req.json()
  const { id, ...data } = body
  const user = updateUser(id, data)
  if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(user)
}

export async function DELETE(req: NextRequest) {
  const guard = await requireAdmin()
  if (guard) return guard
  const { id } = await req.json()
  const ok = deleteUser(id)
  if (!ok) return NextResponse.json({ error: 'Cannot delete' }, { status: 400 })
  return NextResponse.json({ success: true })
}
