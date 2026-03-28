'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { isLoggedIn, getSettings, saveSettings, logout } from '@/lib/store'
import type { SiteSettings } from '@/lib/store'

export default function PengaturanPage() {
  const router = useRouter()
  const [settings, setSettings] = useState<SiteSettings>({
    siteName: '',
    tagline: '',
    phone: '',
    email: '',
    location: '',
    instagram: '',
    whatsapp: '',
    tokopedia: '',
  })
  const [mounted, setMounted] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    setMounted(true)
    if (!isLoggedIn()) {
      router.push('/login')
      return
    }
    setSettings(getSettings())
  }, [router])

  const handleSave = () => {
    saveSettings(settings)
    setMessage('✅ Pengaturan berhasil disimpan!')
    setTimeout(() => setMessage(''), 3000)
  }

  const updateField = (field: keyof SiteSettings, value: string) => {
    setSettings((prev) => ({ ...prev, [field]: value }))
  }

  if (!mounted) return null

  return (
    <div className="bg-[#F8FAFC] min-h-screen font-admin">
      {/* Admin Nav */}
      <div className="bg-navy px-8 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/images/logo.png" alt="Polarekat.id" className="w-7 h-7 rounded object-contain bg-white p-0.5" />
          <h1 className="text-white text-[15px] font-bold">Pengaturan</h1>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-white/60 text-sm hover:text-white transition-colors duration-200">
            ← Website
          </Link>
          <button onClick={() => { logout(); router.push('/') }} className="text-red-300 text-sm hover:text-red-100 transition-colors duration-200">
            Logout
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="grid grid-cols-[220px_1fr] min-h-[calc(100vh-56px)]">
        {/* Sidebar */}
        <aside className="bg-white border-r border-gray-200 py-6">
          <Link href="/admin" className="flex items-center gap-2.5 px-5 py-2.5 text-[13px] font-semibold text-gray-400 hover:text-navy hover:bg-gray-50">
            <span className="text-base">📄</span> Semua Post
          </Link>
          <Link href="/admin/write" className="flex items-center gap-2.5 px-5 py-2.5 text-[13px] font-semibold text-gray-400 hover:text-navy hover:bg-gray-50">
            <span className="text-base">✏️</span> Tulis Post Baru
          </Link>
          <Link href="/admin/galeri" className="flex items-center gap-2.5 px-5 py-2.5 text-[13px] font-semibold text-gray-400 hover:text-navy hover:bg-gray-50">
            <span className="text-base">🖼️</span> Galeri Gambar
          </Link>
          <Link href="/admin/pengaturan" className="flex items-center gap-2.5 px-5 py-2.5 text-[13px] font-semibold text-navy bg-blue-50 border-r-[3px] border-navy">
            <span className="text-base">⚙️</span> Pengaturan
          </Link>
        </aside>

        {/* Content */}
        <div className="p-8 max-w-3xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-navy">Pengaturan Website</h2>
              <p className="text-gray-400 text-sm mt-0.5">Konfigurasi informasi website Anda</p>
            </div>
            <div className="flex items-center gap-3">
              {message && (
                <span className="text-sm font-medium animate-fade-in bg-white px-3 py-1 rounded-full border border-gray-200 shadow-sm">
                  {message}
                </span>
              )}
              <button
                onClick={handleSave}
                className="bg-gold text-navy font-bold text-sm px-5 py-2.5 rounded-lg btn-transition hover:bg-yellow-300 hover-glow-gold"
              >
                💾 Simpan Pengaturan
              </button>
            </div>
          </div>

          {/* General Settings */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-[14px] font-bold text-navy uppercase tracking-wider mb-4">Informasi Umum</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[12px] font-semibold text-gray-400 uppercase tracking-wide mb-1 block">
                  Nama Website
                </label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) => updateField('siteName', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-[13px] text-navy outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                />
              </div>
              <div>
                <label className="text-[12px] font-semibold text-gray-400 uppercase tracking-wide mb-1 block">
                  Tagline
                </label>
                <input
                  type="text"
                  value={settings.tagline}
                  onChange={(e) => updateField('tagline', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-[13px] text-navy outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Contact Settings */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-[14px] font-bold text-navy uppercase tracking-wider mb-4">Informasi Kontak</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[12px] font-semibold text-gray-400 uppercase tracking-wide mb-1 block">
                  Telepon
                </label>
                <input
                  type="text"
                  value={settings.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-[13px] text-navy outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                />
              </div>
              <div>
                <label className="text-[12px] font-semibold text-gray-400 uppercase tracking-wide mb-1 block">
                  Email
                </label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-[13px] text-navy outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-[12px] font-semibold text-gray-400 uppercase tracking-wide mb-1 block">
                  Lokasi
                </label>
                <input
                  type="text"
                  value={settings.location}
                  onChange={(e) => updateField('location', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-[13px] text-navy outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Social Media Settings */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-[14px] font-bold text-navy uppercase tracking-wider mb-4">Media Sosial</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[12px] font-semibold text-gray-400 uppercase tracking-wide mb-1 block">
                  Instagram
                </label>
                <input
                  type="text"
                  value={settings.instagram}
                  onChange={(e) => updateField('instagram', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-[13px] text-navy outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                />
              </div>
              <div>
                <label className="text-[12px] font-semibold text-gray-400 uppercase tracking-wide mb-1 block">
                  WhatsApp
                </label>
                <input
                  type="text"
                  value={settings.whatsapp}
                  onChange={(e) => updateField('whatsapp', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-[13px] text-navy outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                />
              </div>
              <div>
                <label className="text-[12px] font-semibold text-gray-400 uppercase tracking-wide mb-1 block">
                  Tokopedia
                </label>
                <input
                  type="text"
                  value={settings.tokopedia}
                  onChange={(e) => updateField('tokopedia', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-[13px] text-navy outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
