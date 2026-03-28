'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getAllPosts, deletePost, isLoggedIn, logout } from '@/lib/store'
import type { BlogPost } from '@/lib/data'

export default function AdminPage() {
  const router = useRouter()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (!isLoggedIn()) {
      router.push('/login')
      return
    }
    setPosts(getAllPosts())
  }, [router])

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Hapus post "${title}"?`)) {
      deletePost(id)
      setPosts(getAllPosts())
    }
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  if (!mounted) return null

  return (
    <div className="bg-[#F8FAFC] min-h-screen font-admin">
      {/* Admin Nav */}
      <div className="bg-navy px-8 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/images/logo.png" alt="Polarekat.id" className="w-7 h-7 rounded object-contain bg-white p-0.5" />
          <h1 className="text-white text-[15px] font-bold">Admin Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-white/60 text-sm hover:text-white transition-colors duration-200"
          >
            ← Website
          </Link>
          <button
            onClick={handleLogout}
            className="text-red-300 text-sm hover:text-red-100 transition-colors duration-200"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="grid grid-cols-[220px_1fr] min-h-[calc(100vh-56px)]">
        {/* Sidebar */}
        <aside className="bg-white border-r border-gray-200 py-6">
          <Link href="/admin" className="flex items-center gap-2.5 px-5 py-2.5 text-[13px] font-semibold text-navy bg-blue-50 border-r-[3px] border-navy">
            <span className="text-base">📄</span> Semua Post
          </Link>
          <Link href="/admin/write" className="flex items-center gap-2.5 px-5 py-2.5 text-[13px] font-semibold text-gray-400 hover:text-navy hover:bg-gray-50 transition-colors duration-200">
            <span className="text-base">✏️</span> Tulis Post Baru
          </Link>
          <Link href="/admin/galeri" className="flex items-center gap-2.5 px-5 py-2.5 text-[13px] font-semibold text-gray-400 hover:text-navy hover:bg-gray-50 transition-colors duration-200">
            <span className="text-base">🖼️</span> Galeri Gambar
          </Link>
          <Link href="/admin/pengaturan" className="flex items-center gap-2.5 px-5 py-2.5 text-[13px] font-semibold text-gray-400 hover:text-navy hover:bg-gray-50 transition-colors duration-200">
            <span className="text-base">⚙️</span> Pengaturan
          </Link>
        </aside>

        {/* Content */}
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-navy">Semua Post</h2>
              <p className="text-gray-400 text-sm mt-0.5">{posts.length} post total</p>
            </div>
            <Link
              href="/admin/write"
              className="bg-gold text-navy font-bold text-sm px-5 py-2.5 rounded-lg btn-transition hover:bg-yellow-300 hover-glow-gold flex items-center gap-2"
            >
              <span>✏️</span> Tulis Post Baru
            </Link>
          </div>

          {/* Posts Table */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr_120px] px-5 py-3 bg-[#F8FAFC] border-b border-gray-200 text-[12px] font-bold text-gray-400 uppercase tracking-wide">
              <span>Judul</span>
              <span>Kategori</span>
              <span>Tanggal</span>
              <span>Status</span>
              <span>Aksi</span>
            </div>

            {/* Table Rows */}
            {posts.length === 0 ? (
              <div className="px-5 py-10 text-center text-gray-400 text-sm">
                Belum ada post. <Link href="/admin/write" className="text-accent font-semibold hover:underline">Tulis post pertama →</Link>
              </div>
            ) : (
              posts.map((post) => (
                <div
                  key={post.id}
                  className="grid grid-cols-[2fr_1fr_1fr_1fr_120px] px-5 py-3.5 border-b border-gray-100 items-center text-[13px] hover:bg-gray-50 transition-colors duration-150"
                >
                  <span className="font-semibold text-navy truncate pr-4">{post.title}</span>
                  <span className="text-gray-400">{post.category || '—'}</span>
                  <span className="text-gray-400">{post.createdAt}</span>
                  <span>
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        post.status === 'published'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {post.status === 'published' ? 'Published' : 'Draft'}
                    </span>
                  </span>
                  <span className="flex gap-3">
                    <Link
                      href={`/admin/write?id=${post.id}`}
                      className="text-accent text-xs font-semibold hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(post.id, post.title)}
                      className="text-red-400 text-xs font-semibold hover:text-red-600 transition-colors"
                    >
                      Hapus
                    </button>
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
