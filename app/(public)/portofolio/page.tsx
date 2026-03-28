'use client'

import { useState } from 'react'
import { portfolioItems, portfolioCategories } from '@/lib/data'
import PortfolioCard from '@/components/PortfolioCard'

export default function PortofolioPage() {
  const [activeFilter, setActiveFilter] = useState('Semua')

  const filtered = activeFilter === 'Semua'
    ? portfolioItems
    : portfolioItems.filter((item) => item.category === activeFilter)

  return (
    <>
      {/* Hero */}
      <section className="bg-navy px-[5%] pt-16 pb-12">
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-block bg-gold/15 text-gold text-xs font-semibold px-3 py-1 rounded-full border border-gold/30 mb-4">
            PORTOFOLIO
          </span>
          <h1 className="text-white text-4xl font-bold mb-3">
            Hasil Karya <em className="text-gold not-italic">Terbaik</em> Kami
          </h1>
          <p className="text-white/55 text-[15px] leading-relaxed">
            Koleksi proyek cutting sticker yang telah kami selesaikan untuk klien di berbagai kota di Indonesia.
          </p>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="bg-navy py-10 px-[5%]">
        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {portfolioCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-250 border ${
                activeFilter === cat
                  ? 'bg-gold text-navy border-gold'
                  : 'bg-transparent text-white/60 border-white/20 hover:border-gold/50 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {filtered.map((item) => (
            <PortfolioCard key={item.id} item={item} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-white/40 text-sm mt-10">
            Belum ada portofolio untuk kategori ini.
          </p>
        )}
      </section>
    </>
  )
}
