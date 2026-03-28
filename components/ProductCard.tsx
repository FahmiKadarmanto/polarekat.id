import type { Product } from '@/lib/data'
import Link from 'next/link'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover-lift group">
      {/* Image Area */}
      <div className="h-52 bg-navy flex items-center justify-center relative overflow-hidden">
        {product.image ? (
          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="grid grid-cols-2 gap-3 p-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-navy-light rounded-xl h-20 flex items-center justify-center group-hover:bg-navy-mid transition-colors duration-300"
              >
                <div className="w-12 h-12 rounded-full gradient-gold flex items-center justify-center text-[8px] font-bold text-navy text-center leading-tight border-2 border-white/20 group-hover:scale-110 transition-transform duration-300">
                  POLA<br />REKAT
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-5">
        <span className="inline-block bg-indigo-50 text-indigo-600 text-[11px] font-bold px-2.5 py-1 rounded uppercase tracking-wider mb-3">
          {product.tagline}
        </span>
        <h3 className="text-xl font-bold text-navy mb-2 leading-tight">{product.name}</h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-4">{product.description}</p>

        {/* Features */}
        <div className="mb-5 space-y-1.5">
          {product.features.slice(0, 3).map((feature) => (
            <div key={feature} className="flex items-center gap-2 text-[13px] text-gray-500">
              <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
              {feature}
            </div>
          ))}
        </div>

        <Link
          href={`https://wa.me/6281234567890?text=Halo, saya tertarik dengan ${product.name}`}
          target="_blank"
          className="block w-full text-center bg-gold text-navy font-bold text-sm py-3 rounded-lg btn-transition hover:bg-yellow-300 hover-glow-gold"
        >
          Pesan Sekarang
        </Link>
      </div>
    </div>
  )
}
