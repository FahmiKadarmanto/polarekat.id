import { products } from '@/lib/data'
import ProductCard from '@/components/ProductCard'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Produk — Polarekat.id',
  description: 'Daftar lengkap produk cutting sticker profesional dari Polarekat.id. Cutting sticker, print & cut, sandblast, dan vinyl.',
}

export default function ProdukPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy px-[5%] pt-16 pb-12">
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-block bg-gold/15 text-gold text-xs font-semibold px-3 py-1 rounded-full border border-gold/30 mb-4">
            PRODUK KAMI
          </span>
          <h1 className="text-white text-4xl font-bold mb-3">
            Solusi Sticker <em className="text-gold not-italic">Premium</em>
          </h1>
          <p className="text-white/55 text-[15px] leading-relaxed">
            Pilih dari berbagai jenis layanan cutting sticker berkualitas tinggi untuk kebutuhan branding dan dekorasi bisnis Anda.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="bg-gray-bg py-16 px-[5%]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-14 px-[5%] text-center">
        <h2 className="text-2xl font-bold text-white mb-3">Butuh Konsultasi?</h2>
        <p className="text-white/50 text-sm mb-6 max-w-md mx-auto">
          Hubungi kami untuk mendiskusikan kebutuhan sticker Anda. Konsultasi gratis!
        </p>
        <a
          href="https://wa.me/6281234567890"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-gold text-navy font-bold text-sm px-8 py-3 rounded-lg btn-transition hover:bg-yellow-300 hover-glow-gold"
        >
          Chat WhatsApp
        </a>
      </section>
    </>
  )
}
