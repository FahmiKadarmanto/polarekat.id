'use client'

import { useState, useEffect } from 'react'
import { getAllPosts } from '@/lib/store'
import type { BlogPost } from '@/lib/data'

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const allPosts = getAllPosts()
    const found = allPosts.find((p) => p.slug === params.slug)
    if (found) setPost(found)
  }, [params.slug])

  if (!mounted) return null

  if (!post) {
    return (
      <section className="bg-gray-bg min-h-screen py-12 px-[5%]">
        <div className="max-w-3xl mx-auto text-center py-20">
          <h1 className="text-3xl font-bold text-navy mb-4">Artikel Tidak Ditemukan</h1>
          <p className="text-gray-400 mb-6">Artikel yang Anda cari tidak tersedia.</p>
          <a href="/blog" className="text-accent font-semibold hover:underline">← Kembali ke Blog</a>
        </div>
      </section>
    )
  }

  // Basic markdown rendering
  const renderBody = (text: string) => {
    if (!text) return '<p class="text-gray-400 italic">Konten artikel belum tersedia.</p>'

    let html = text
      // Headings
      .replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold text-navy mt-6 mb-2">$1</h3>')
      .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-navy mt-8 mb-3">$1</h2>')
      .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold text-navy mt-8 mb-3">$1</h1>')
      // Bold
      .replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-navy">$1</strong>')
      // Italic
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      // Images
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="my-4 rounded-lg max-w-full" />')
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-accent font-semibold hover:underline">$1</a>')
      // Blockquotes
      .replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-gold pl-4 py-1 my-3 text-gray-500 italic">$1</blockquote>')
      // Unordered lists
      .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc text-gray-500">$1</li>')
      // Paragraphs (lines that aren't already wrapped)
      .replace(/^(?!<[a-z])((?!<).+)$/gm, '<p class="text-gray-500 leading-relaxed mb-3">$1</p>')

    // Wrap consecutive <li> in <ul>
    html = html.replace(/((?:<li[^>]*>.*?<\/li>\s*)+)/g, '<ul class="my-3 space-y-1">$1</ul>')

    return html
  }

  return (
    <section className="bg-gray-bg min-h-screen py-12 px-[5%]">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          {/* Cover Image */}
          <div className="h-64 bg-navy flex items-center justify-center relative overflow-hidden">
            {post.coverImage ? (
              <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-24 h-24 rounded-full gradient-gold flex items-center justify-center text-lg font-bold text-navy animate-float">
                P
              </div>
            )}
          </div>
          {/* Article Content */}
          <div className="p-8">
            <span className="text-accent text-[11px] font-bold uppercase tracking-wider">{post.category}</span>
            <h1 className="text-3xl font-bold text-navy mt-2 mb-4 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-3 text-sm text-gray-400 mb-8 pb-6 border-b border-gray-100">
              <span>Polarekat.id</span>
              <span>·</span>
              <span>{post.publishedAt || post.createdAt}</span>
              {post.tags.length > 0 && (
                <>
                  <span>·</span>
                  <div className="flex gap-1">
                    {post.tags.map((tag) => (
                      <span key={tag} className="bg-gray-100 text-gray-500 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
            <div
              className="prose prose-gray max-w-none"
              dangerouslySetInnerHTML={{ __html: renderBody(post.body) }}
            />
            <div className="mt-10 pt-6 border-t border-gray-100">
              <a href="/blog" className="text-accent font-semibold hover:underline text-sm">
                ← Kembali ke Blog
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
