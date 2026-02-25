import bcrypt from 'bcryptjs'
import { User } from '@/types'

// In-memory user store — replace with a real DB (Prisma/Supabase) in production
let users: (User & { passwordHash: string })[] = [
  {
    id: 'u0',
    name: 'System Administrator',
    email: 'admin@piemgeosolutions.com',
    role: 'admin',
    status: 'active',
    createdAt: '2024-01-01',
    company: 'PIEM GeoSolutions LLC',
    country: 'Venezuela',
    passwordHash: '',
  },
]

let initialized = false

export async function initUsers() {
  if (initialized) return
  initialized = true

  if (process.env.ADMIN_PASSWORD_HASH && !process.env.ADMIN_PASSWORD_HASH.includes('PLACEHOLDER')) {
    users[0].passwordHash = process.env.ADMIN_PASSWORD_HASH
  } else {
    users[0].passwordHash = await bcrypt.hash('Admin@PIEM2024!', 12)
  }

  if (process.env.DEMO_USERS) {
    try {
      const demoUsers = JSON.parse(process.env.DEMO_USERS)
      users = [users[0], ...demoUsers]
    } catch {
      console.warn('Could not parse DEMO_USERS env var')
    }
  }
}

export async function verifyUser(email: string, password: string): Promise<User | null> {
  await initUsers()
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase())
  if (!user) return null
  if (user.status !== 'active') return null
  const valid = await bcrypt.compare(password, user.passwordHash)
  if (!valid) return null
  const { passwordHash: _, ...safeUser } = user
  return safeUser
}

export function getUserById(id: string): User | undefined {
  const user = users.find((u) => u.id === id)
  if (!user) return undefined
  const { passwordHash: _, ...safeUser } = user
  return safeUser
}

export function getAllUsers(): User[] {
  return users.map(({ passwordHash: _, ...u }) => u)
}

export async function createUser(data: Omit<User, 'id' | 'createdAt'> & { password: string }): Promise<User> {
  const { password, ...rest } = data
  const passwordHash = await bcrypt.hash(password, 12)
  const newUser: User & { passwordHash: string } = {
    ...rest,
    id: `u${Date.now()}`,
    createdAt: new Date().toISOString(),
    passwordHash,
  }
  users.push(newUser)
  const { passwordHash: _, ...safeUser } = newUser
  return safeUser
}

export function updateUser(id: string, data: Partial<User>): User | null {
  const idx = users.findIndex((u) => u.id === id)
  if (idx === -1) return null
  users[idx] = { ...users[idx], ...data }
  const { passwordHash: _, ...safeUser } = users[idx]
  return safeUser
}

export function deleteUser(id: string): boolean {
  const idx = users.findIndex((u) => u.id === id)
  if (idx === -1) return false
  if (users[idx].role === 'admin') return false
  users.splice(idx, 1)
  return true
}
