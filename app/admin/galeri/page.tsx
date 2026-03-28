'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  isLoggedIn,
  getAllImages,
  saveImage,
  deleteImage,
  generateId,
  readFileAsDataURL,
  logout,
} from '@/lib/store'
import type { StoredImage } from '@/lib/store'

export default function GaleriPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [images, setImages] = useState<StoredImage[]>([])
  const [mounted, setMounted] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    setMounted(true)
    if (!isLoggedIn()) {
      router.push('/login')
      return
    }
    setImages(getAllImages())
  }, [router])

  const showMessage = (msg: string) => {
    setMessage(msg)
    setTimeout(() => setMessage(''), 3000)
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    setUploading(true)

    for (const file of Array.from(files)) {
      if (file.size > 5 * 1024 * 1024) {
        showMessage(`⚠️ ${file.name} terlalu besar (max 5MB)`)
        continue
      }
      const dataUrl = await readFileAsDataURL(file)
      saveImage({
        id: generateId(),
        name: file.name,
        data: dataUrl,
        size: file.size,
        type: file.type,
        uploadedAt: new Date().toISOString(),
      })
    }

    setImages(getAllImages())
    setUploading(false)
    showMessage(`✅ ${files.length} gambar berhasil diupload!`)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Hapus gambar "${name}"?`)) {
      deleteImage(id)
      setImages(getAllImages())
      showMessage('✅ Gambar berhasil dihapus')
    }
  }

  const copyUrl = (data: string) => {
    navigator.clipboard.writeText(data)
    showMessage('✅ URL gambar disalin ke clipboard!')
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  if (!mounted) return null

  return (
    <div className="bg-[#F8FAFC] min-h-screen font-admin">
      {/* Admin Nav */}
      <div className="bg-navy px-8 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/images/logo.png" alt="Polarekat.id" className="w-7 h-7 rounded object-contain bg-white p-0.5" />
          <h1 className="text-white text-[15px] font-bold">Galeri Gambar</h1>
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
          <Link href="/admin/galeri" className="flex items-center gap-2.5 px-5 py-2.5 text-[13px] font-semibold text-navy bg-blue-50 border-r-[3px] border-navy">
            <span className="text-base">🖼️</span> Galeri Gambar
          </Link>
          <Link href="/admin/pengaturan" className="flex items-center gap-2.5 px-5 py-2.5 text-[13px] font-semibold text-gray-400 hover:text-navy hover:bg-gray-50">
            <span className="text-base">⚙️</span> Pengaturan
          </Link>
        </aside>

        {/* Content */}
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-navy">Galeri Gambar</h2>
              <p className="text-gray-400 text-sm mt-0.5">{images.length} gambar tersimpan</p>
            </div>
            <div className="flex items-center gap-3">
              {message && (
                <span className="text-sm font-medium animate-fade-in bg-white px-3 py-1 rounded-full border border-gray-200 shadow-sm">
                  {message}
                </span>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                className="hidden"
                onChange={handleUpload}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="bg-gold text-navy font-bold text-sm px-5 py-2.5 rounded-lg btn-transition hover:bg-yellow-300 hover-glow-gold flex items-center gap-2 disabled:opacity-60"
              >
                <span>📤</span> {uploading ? 'Uploading...' : 'Upload Gambar'}
              </button>
            </div>
          </div>

          {images.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-16 text-center">
              <span className="text-5xl block mb-4">🖼️</span>
              <h3 className="text-lg font-bold text-navy mb-2">Belum ada gambar</h3>
              <p className="text-gray-400 text-sm mb-4">Upload gambar pertama Anda untuk memulai.</p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-gold text-navy font-bold text-sm px-6 py-2.5 rounded-lg btn-transition hover:bg-yellow-300"
              >
                Upload Gambar
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((img) => (
                <div key={img.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden group hover-lift">
                  <div className="h-40 bg-gray-100 relative">
                    <img src={img.data} alt={img.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
                      <button
                        onClick={() => copyUrl(img.data)}
                        className="bg-white text-navy text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-gold transition-colors"
                      >
                        Copy URL
                      </button>
                      <button
                        onClick={() => handleDelete(img.id, img.name)}
                        className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-red-600 transition-colors"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-[12px] text-navy font-semibold truncate">{img.name}</p>
                    <p className="text-[11px] text-gray-400">{formatSize(img.size)} · {img.type.split('/')[1].toUpperCase()}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
