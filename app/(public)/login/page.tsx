'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { login } from '@/lib/store'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Small delay for UX
    await new Promise((r) => setTimeout(r, 500))

    const success = login(email, password)
    if (success) {
      router.push('/admin')
    } else {
      setError('Email atau password salah.')
      setLoading(false)
    }
  }

  return (
    <section className="min-h-screen bg-navy flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <img
            src="/images/logo.png"
            alt="Polarekat.id"
            className="w-14 h-14 rounded-xl object-contain bg-white p-1 mx-auto mb-4"
          />
          <h1 className="text-white text-3xl font-bold mb-2">Admin Login</h1>
          <p className="text-white/50 text-sm">Masuk ke dashboard admin Polarekat.id</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="bg-white rounded-2xl p-8 shadow-xl">
          {error && (
            <div className="bg-red-50 text-red-600 text-sm font-medium px-4 py-3 rounded-lg mb-5 border border-red-100">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-[12px] font-semibold text-gray-400 uppercase tracking-wide mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@polarekat.id"
              required
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-navy outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
            />
          </div>

          <div className="mb-6">
            <label className="block text-[12px] font-semibold text-gray-400 uppercase tracking-wide mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-navy outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold text-navy font-bold text-sm py-3 rounded-lg btn-transition hover:bg-yellow-300 hover-glow-gold disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Memproses...' : 'Masuk ke Dashboard'}
          </button>

          <p className="text-center text-gray-400 text-xs mt-4">
            Hanya admin yang bisa mengakses halaman ini.
          </p>
        </form>

        {/* Hint */}
        <div className="mt-6 bg-white/5 rounded-xl p-4 border border-white/10">
          <p className="text-white/40 text-xs text-center">
            <span className="text-gold font-semibold">Demo credentials:</span><br />
            Email: admin@polarekat.id<br />
            Password: polarekat2025
          </p>
        </div>
      </div>
    </section>
  )
}
