'use client'
import { useState } from 'react'
import { Save, Shield, Bell, Palette, Building2 } from 'lucide-react'

export default function SettingsPage() {
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="font-display text-2xl font-bold text-steel-100">Settings</h1>
        <p className="text-sm text-steel-400 mt-1">Manage application settings and preferences</p>
      </div>

      {/* Company Info */}
      <div className="p-6 rounded-xl border border-dark-border bg-dark-card">
        <div className="flex items-center gap-2 mb-6">
          <Building2 size={18} className="text-orange-400" />
          <h2 className="text-sm font-semibold text-steel-200">Company Information</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { label: 'Company Name', value: 'PIEM GeoSolutions LLC' },
            { label: 'Partner Company', value: 'Petro-Explorers Inc.' },
            { label: 'Primary Phone', value: '+58 212 265 5321' },
            { label: 'Website', value: 'www.piemgeosolutions.com' },
          ].map((field) => (
            <div key={field.label}>
              <label className="block text-xs text-steel-400 uppercase tracking-wide mb-1">{field.label}</label>
              <input
                defaultValue={field.value}
                className="w-full px-3 py-2.5 rounded-lg bg-dark-surface border border-dark-border text-steel-200 text-sm focus:outline-none focus:border-orange-400/50 transition-colors"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <div className="p-6 rounded-xl border border-dark-border bg-dark-card">
        <div className="flex items-center gap-2 mb-6">
          <Bell size={18} className="text-orange-400" />
          <h2 className="text-sm font-semibold text-steel-200">Notifications</h2>
        </div>
        <div className="space-y-4">
          {[
            { label: 'Email notifications for new contact form submissions', defaultChecked: true },
            { label: 'Weekly project status digest', defaultChecked: true },
            { label: 'New user registration alerts', defaultChecked: true },
            { label: 'System maintenance notifications', defaultChecked: false },
          ].map((item, i) => (
            <label key={i} className="flex items-center justify-between cursor-pointer group">
              <span className="text-sm text-steel-300 group-hover:text-steel-200 transition-colors">{item.label}</span>
              <input
                type="checkbox"
                defaultChecked={item.defaultChecked}
                className="w-4 h-4 rounded border-dark-border bg-dark-surface text-orange-400 focus:ring-orange-400/30 cursor-pointer"
              />
            </label>
          ))}
        </div>
      </div>

      {/* Appearance */}
      <div className="p-6 rounded-xl border border-dark-border bg-dark-card">
        <div className="flex items-center gap-2 mb-6">
          <Palette size={18} className="text-orange-400" />
          <h2 className="text-sm font-semibold text-steel-200">Appearance</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-xs text-steel-400 uppercase tracking-wide mb-1">Default Theme</label>
            <select className="w-full max-w-xs px-3 py-2.5 rounded-lg bg-dark-surface border border-dark-border text-steel-200 text-sm focus:outline-none focus:border-orange-400/50 transition-colors">
              <option value="dark">Dark (Default)</option>
              <option value="light">Light</option>
              <option value="system">System</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-steel-400 uppercase tracking-wide mb-1">Accent Color</label>
            <div className="flex gap-2">
              {['#FF671D', '#1a4a6b', '#2d7a4a', '#c44b0f'].map((color) => (
                <button
                  key={color}
                  className="w-8 h-8 rounded-lg border-2 border-transparent hover:border-white/30 transition-colors"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="p-6 rounded-xl border border-dark-border bg-dark-card">
        <div className="flex items-center gap-2 mb-6">
          <Shield size={18} className="text-orange-400" />
          <h2 className="text-sm font-semibold text-steel-200">Security</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-xs text-steel-400 uppercase tracking-wide mb-1">Current Password</label>
            <input
              type="password"
              placeholder="Enter current password"
              className="w-full max-w-md px-3 py-2.5 rounded-lg bg-dark-surface border border-dark-border text-steel-200 text-sm focus:outline-none focus:border-orange-400/50 transition-colors placeholder:text-steel-500"
            />
          </div>
          <div>
            <label className="block text-xs text-steel-400 uppercase tracking-wide mb-1">New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full max-w-md px-3 py-2.5 rounded-lg bg-dark-surface border border-dark-border text-steel-200 text-sm focus:outline-none focus:border-orange-400/50 transition-colors placeholder:text-steel-500"
            />
          </div>
          <div>
            <label className="block text-xs text-steel-400 uppercase tracking-wide mb-1">Confirm New Password</label>
            <input
              type="password"
              placeholder="Confirm new password"
              className="w-full max-w-md px-3 py-2.5 rounded-lg bg-dark-surface border border-dark-border text-steel-200 text-sm focus:outline-none focus:border-orange-400/50 transition-colors placeholder:text-steel-500"
            />
          </div>
        </div>
      </div>

      {/* Save button */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-orange-400 text-steel-900 font-semibold text-sm hover:bg-orange-300 transition-all shadow-orange"
        >
          <Save size={15} />
          Save Settings
        </button>
        {saved && (
          <span className="text-sm text-green-400 animate-fade-in">Settings saved successfully!</span>
        )}
      </div>
    </div>
  )
}
