'use client'
import { useState } from 'react'
import { MOCK_USERS } from '@/lib/constants'
import { User } from '@/types'
import { Plus, Edit2, Trash2, Search } from 'lucide-react'

const ROLE_CONFIG: Record<string, { label: string; color: string }> = {
  admin:   { label: 'Admin',   color: 'text-orange-400 bg-orange-400/10 border-orange-400/20' },
  analyst: { label: 'Analyst', color: 'text-blue-400 bg-blue-400/10 border-blue-400/20' },
  viewer:  { label: 'Viewer',  color: 'text-green-400 bg-green-400/10 border-green-400/20' },
  client:  { label: 'Client',  color: 'text-purple-400 bg-purple-400/10 border-purple-400/20' },
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(MOCK_USERS)
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editUser, setEditUser] = useState<User | null>(null)

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.company?.toLowerCase().includes(search.toLowerCase())
  )

  const handleDelete = (id: string) => {
    if (id === 'u0') return
    if (confirm('Remove this user?')) {
      setUsers((prev) => prev.filter((u) => u.id !== id))
    }
  }

  const handleToggleStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u
      )
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-steel-100">User Management</h1>
          <p className="text-sm text-steel-400 mt-1">{users.length} total users</p>
        </div>
        <button
          onClick={() => { setEditUser(null); setShowForm(true) }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-orange-400 text-steel-900 font-semibold text-sm hover:bg-orange-300 transition-all shadow-orange"
        >
          <Plus size={15} /> Add User
        </button>
      </div>

      <div className="relative max-w-sm">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-steel-500" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users..."
          className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-dark-card border border-dark-border text-steel-200 text-sm focus:outline-none focus:border-orange-400/50 transition-colors placeholder:text-steel-500"
        />
      </div>

      <div className="bg-dark-card border border-dark-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-dark-border">
                {['User', 'Role', 'Company', 'Status', 'Last Login', 'Actions'].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-steel-400 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-border">
              {filtered.map((user) => {
                const role = ROLE_CONFIG[user.role] || ROLE_CONFIG.viewer
                return (
                  <tr key={user.id} className="hover:bg-dark-surface/50 transition-colors">
                    <td className="px-5 py-4">
                      <div>
                        <p className="font-medium text-steel-200">{user.name}</p>
                        <p className="text-xs text-steel-500">{user.email}</p>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${role.color}`}>{role.label}</span>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-steel-400 text-xs">{user.company || '\u2014'}</p>
                      <p className="text-steel-500 text-xs">{user.country}</p>
                    </td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => handleToggleStatus(user.id)}
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border cursor-pointer transition-all ${
                          user.status === 'active'
                            ? 'bg-green-400/10 text-green-400 border-green-400/20 hover:bg-red-400/10 hover:text-red-400 hover:border-red-400/20'
                            : 'bg-red-400/10 text-red-400 border-red-400/20 hover:bg-green-400/10 hover:text-green-400 hover:border-green-400/20'
                        }`}
                      >{user.status}</button>
                    </td>
                    <td className="px-5 py-4 text-xs text-steel-500">
                      {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => { setEditUser(user); setShowForm(true) }}
                          className="p-1.5 rounded-lg text-steel-400 hover:text-orange-400 hover:bg-orange-400/10 transition-all"
                          title="Edit"
                        ><Edit2 size={13} /></button>
                        {user.id !== 'u0' && (
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="p-1.5 rounded-lg text-steel-400 hover:text-red-400 hover:bg-red-400/10 transition-all"
                            title="Delete"
                          ><Trash2 size={13} /></button>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setShowForm(false)}>
          <div className="bg-dark-card border border-orange-400/20 rounded-2xl p-6 w-full max-w-md shadow-orange-lg" onClick={(e) => e.stopPropagation()}>
            <h2 className="font-display text-lg font-semibold text-steel-100 mb-6">{editUser ? 'Edit User' : 'Add New User'}</h2>
            <form className="space-y-4" onSubmit={(e) => {
              e.preventDefault()
              const fd = new FormData(e.currentTarget)
              if (editUser) {
                setUsers((prev) => prev.map((u) => u.id === editUser.id ? { ...u, name: fd.get('name') as string, role: fd.get('role') as User['role'], company: fd.get('company') as string } : u))
              } else {
                const newUser: User = {
                  id: `u${Date.now()}`, name: fd.get('name') as string, email: fd.get('email') as string,
                  role: fd.get('role') as User['role'], status: 'active', createdAt: new Date().toISOString(),
                  company: fd.get('company') as string, country: fd.get('country') as string,
                }
                setUsers((prev) => [...prev, newUser])
              }
              setShowForm(false)
            }}>
              {[
                { name: 'name', label: 'Full Name', type: 'text', default: editUser?.name },
                { name: 'email', label: 'Email', type: 'email', default: editUser?.email },
                { name: 'company', label: 'Company', type: 'text', default: editUser?.company },
                { name: 'country', label: 'Country', type: 'text', default: editUser?.country },
              ].map((f) => (
                <div key={f.name}>
                  <label className="block text-xs text-steel-400 uppercase tracking-wide mb-1">{f.label}</label>
                  <input required={f.name !== 'company' && f.name !== 'country'} name={f.name} type={f.type} defaultValue={f.default || ''}
                    className="w-full px-3 py-2.5 rounded-lg bg-dark-surface border border-dark-border text-steel-200 text-sm focus:outline-none focus:border-orange-400/50 transition-colors" />
                </div>
              ))}
              <div>
                <label className="block text-xs text-steel-400 uppercase tracking-wide mb-1">Role</label>
                <select name="role" defaultValue={editUser?.role || 'viewer'}
                  className="w-full px-3 py-2.5 rounded-lg bg-dark-surface border border-dark-border text-steel-200 text-sm focus:outline-none focus:border-orange-400/50 transition-colors">
                  <option value="viewer">Viewer</option>
                  <option value="analyst">Analyst</option>
                  <option value="client">Client</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-2.5 rounded-lg border border-dark-border text-steel-400 text-sm hover:border-steel-500 transition-colors">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 rounded-lg bg-orange-400 text-steel-900 text-sm font-semibold hover:bg-orange-300 transition-colors">{editUser ? 'Save Changes' : 'Create User'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
