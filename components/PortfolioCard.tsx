import type { PortfolioItem } from '@/lib/data'

interface PortfolioCardProps {
  item: PortfolioItem
}

export default function PortfolioCard({ item }: PortfolioCardProps) {
  return (
    <div className="bg-navy-light rounded-2xl overflow-hidden cursor-pointer hover-lift group">
      {/* Image */}
      <div className="h-44 bg-navy-mid flex items-center justify-center relative overflow-hidden">
        {item.image ? (
          <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-20 h-20 rounded-full border-[3px] border-gold/40 flex items-center justify-center group-hover:scale-110 group-hover:border-gold/70 transition-all duration-400">
            <div className="w-14 h-14 rounded-full gradient-gold flex items-center justify-center text-[9px] font-bold text-navy text-center leading-tight">
              POLA<br />REKAT
            </div>
          </div>
        )}
        {/* Category badge */}
        <span className="absolute top-3 right-3 bg-gold/20 text-gold text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm border border-gold/20">
          {item.category}
        </span>
        <div className="absolute inset-0 bg-gradient-to-t from-navy-light/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Body */}
      <div className="p-4">
        <h4 className="text-white text-sm font-semibold mb-1 group-hover:text-gold transition-colors duration-200">
          {item.title}
        </h4>
        <p className="text-white/50 text-xs">
          📍 {item.location} · {item.year}
        </p>
      </div>
    </div>
  )
}
