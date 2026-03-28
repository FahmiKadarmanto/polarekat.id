import Link from 'next/link'

const footerLinks = {
  produk: [
    { label: 'Cutting Sticker', href: '/produk' },
    { label: 'Print & Cut', href: '/produk' },
    { label: 'Sandblast', href: '/produk' },
    { label: 'Sticker Vinyl', href: '/produk' },
  ],
  perusahaan: [
    { label: 'Tentang Kami', href: '/' },
    { label: 'Portofolio', href: '/portofolio' },
    { label: 'Blog', href: '/blog' },
    { label: 'Karir', href: '/' },
  ],
  bantuan: [
    { label: 'FAQ', href: '/' },
    { label: 'Kontak', href: '/#contact' },
    { label: 'Kebijakan Privasi', href: '/' },
    { label: 'Syarat & Ketentuan', href: '/' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-navy pt-12 pb-6 px-[5%]">
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        {/* Brand */}
        <div className="md:col-span-1">
          <Link href="/" className="flex items-center gap-2 mb-3">
            <img
              src="/images/logo.png"
              alt="Polarekat.id"
              className="w-8 h-8 rounded-md object-contain bg-white p-0.5"
            />
            <span className="text-white font-bold text-[15px]">polarekat.id</span>
          </Link>
          <p className="text-white/50 text-[13px] leading-relaxed max-w-[220px]">
            Layanan cutting sticker profesional di Bandung. Kualitas premium, harga bersahabat.
          </p>
          {/* Social links */}
          <div className="flex gap-2 mt-4">
            {['IG', 'WA', 'TkPd'].map((social) => (
              <span
                key={social}
                className="bg-navy-light text-white text-[11px] font-semibold px-3 py-1.5 rounded-md cursor-pointer hover:bg-gold hover:text-navy transition-colors duration-200"
              >
                {social}
              </span>
            ))}
          </div>
        </div>

        {/* Produk */}
        <div>
          <h5 className="text-white text-[13px] font-bold uppercase tracking-wider mb-4">Produk</h5>
          {footerLinks.produk.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block text-white/50 text-[13px] mb-2 hover:text-gold transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Perusahaan */}
        <div>
          <h5 className="text-white text-[13px] font-bold uppercase tracking-wider mb-4">Perusahaan</h5>
          {footerLinks.perusahaan.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block text-white/50 text-[13px] mb-2 hover:text-gold transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Bantuan */}
        <div>
          <h5 className="text-white text-[13px] font-bold uppercase tracking-wider mb-4">Bantuan</h5>
          {footerLinks.bantuan.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block text-white/50 text-[13px] mb-2 hover:text-gold transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 pt-5 flex flex-col md:flex-row justify-between items-center gap-2">
        <p className="text-white/40 text-xs">© 2025 Polarekat.id — Hak Cipta Dilindungi.</p>
        <p className="text-white/30 text-xs">Bandung, Jawa Barat, Indonesia</p>
      </div>
    </footer>
  )
}
