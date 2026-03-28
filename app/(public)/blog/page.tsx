'use client'

import { useState, useEffect } from 'react'
import { getAllPosts } from '@/lib/store'
import { blogCategories } from '@/lib/data'
import BlogCard from '@/components/BlogCard'
import type { BlogPost } from '@/lib/data'

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const allPosts = getAllPosts().filter((p) => p.status === 'published')
    setPosts(allPosts)
  }, [])

  if (!mounted) return null

  const featuredPost = posts[0]
  const recentPosts = posts.slice(1)

  return (
    <>
      {/* Hero */}
      <section className="bg-navy px-[5%] pt-16 pb-12">
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-block bg-gold/15 text-gold text-xs font-semibold px-3 py-1 rounded-full border border-gold/30 mb-4">
            BLOG
          </span>
          <h1 className="text-white text-4xl font-bold mb-3">
            Artikel & <em className="text-gold not-italic">Inspirasi</em>
          </h1>
          <p className="text-white/55 text-[15px] leading-relaxed">
            Tips, tutorial, dan panduan seputar cutting sticker dan branding bisnis.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-gray-bg py-12 px-[5%]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Featured Post */}
            {featuredPost && <BlogCard post={featuredPost} featured />}

            {/* Recent Posts List */}
            {recentPosts.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-navy">Artikel Terbaru</h3>
                {recentPosts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-white rounded-xl border border-gray-200 p-4 flex gap-4 items-start hover-lift cursor-pointer group"
                  >
                    {/* Thumbnail */}
                    <div className="w-20 h-20 bg-navy rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {post.coverImage ? (
                        <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-10 h-10 rounded-full gradient-gold flex items-center justify-center text-[7px] font-bold text-navy text-center leading-tight group-hover:scale-110 transition-transform duration-300">
                          P
                        </div>
                      )}
                    </div>
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <span className="text-accent text-[11px] font-bold uppercase tracking-wider">{post.category}</span>
                      <h4 className="text-sm font-bold text-navy mt-0.5 leading-snug group-hover:text-accent transition-colors duration-200 truncate">
                        {post.title}
                      </h4>
                      <p className="text-gray-400 text-xs mt-1">{post.publishedAt}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {posts.length === 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-10 text-center">
                <p className="text-gray-400 text-sm">Belum ada artikel yang dipublikasikan.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Categories */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h4 className="text-lg font-bold text-navy mb-4">Kategori</h4>
              <div className="space-y-2.5">
                {blogCategories.map((cat) => (
                  <div
                    key={cat.name}
                    className="flex justify-between items-center text-sm text-gray-500 hover:text-navy transition-colors duration-200 cursor-pointer group"
                  >
                    <span className="group-hover:text-navy font-medium">{cat.name}</span>
                    <span className="bg-gray-bg text-gray-400 text-xs font-bold px-2 py-0.5 rounded-full group-hover:bg-gold group-hover:text-navy transition-colors duration-200">
                      {cat.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Posts Widget */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h4 className="text-lg font-bold text-navy mb-4">Post Terbaru</h4>
              <div className="space-y-3">
                {posts.slice(0, 4).map((post) => (
                  <div key={post.id} className="cursor-pointer group">
                    <h5 className="text-[13px] font-semibold text-navy leading-snug group-hover:text-accent transition-colors duration-200">
                      {post.title}
                    </h5>
                    <p className="text-gray-400 text-xs mt-0.5">{post.publishedAt}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
