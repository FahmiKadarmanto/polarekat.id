import type { BlogPost } from '@/lib/data'
import Link from 'next/link'

interface BlogCardProps {
  post: BlogPost
  featured?: boolean
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  if (featured) {
    return (
      <Link href={`/blog/${post.slug}`} className="block group">
        <div className="bg-navy rounded-2xl overflow-hidden hover-lift cursor-pointer">
          {/* Image */}
          <div className="h-56 bg-navy-mid flex items-center justify-center relative overflow-hidden">
            {post.coverImage ? (
              <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            ) : (
              <div className="w-24 h-24 rounded-full border-4 border-gold/30 flex items-center justify-center animate-float">
                <img src="/images/logo.png" alt="Polarekat.id" className="w-16 h-16 object-contain" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
          </div>
          {/* Body */}
          <div className="p-6">
            <span className="text-gold text-[11px] font-bold uppercase tracking-wider">{post.category}</span>
            <h3 className="text-white font-bold text-xl mt-2 mb-2 leading-tight group-hover:text-gold transition-colors duration-200">
              {post.title}
            </h3>
            <p className="text-white/50 text-sm leading-relaxed mb-3">{post.excerpt}</p>
            <span className="text-white/40 text-xs">{post.publishedAt}</span>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover-lift cursor-pointer">
        {/* Image */}
        <div className="h-36 bg-navy flex items-center justify-center relative overflow-hidden">
          {post.coverImage ? (
            <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <div className="w-16 h-16 rounded-full border-3 border-gold/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <img src="/images/logo.png" alt="Polarekat.id" className="w-11 h-11 object-contain" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
        </div>
        {/* Body */}
        <div className="p-4">
          <span className="text-accent text-[11px] font-bold uppercase tracking-wider">{post.category}</span>
          <h4 className="text-sm font-bold mt-1.5 mb-1.5 leading-snug text-navy group-hover:text-accent transition-colors duration-200">
            {post.title}
          </h4>
          <span className="text-gray-400 text-xs">{post.publishedAt}</span>
        </div>
      </div>
    </Link>
  )
}
