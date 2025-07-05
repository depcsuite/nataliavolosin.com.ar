export function FloatingAds() {
  return (
    <div className="hidden lg:block fixed right-4 top-1/2 transform -translate-y-1/2 space-y-4 z-40">
      <div className="bg-gradient-to-br from-brand-teal/10 to-brand-green/10 border-2 border-dashed border-brand-teal/30 rounded-xl p-4 text-center commercial-shadow w-32">
        <p className="text-brand-teal text-xs font-sans sans-modern font-bold mb-1">Ad</p>
        <p className="text-brand-gray text-xs font-serif serif-elegant">120x240</p>
      </div>
      <div className="bg-gradient-to-br from-brand-purple/10 to-brand-gray/10 border-2 border-dashed border-brand-purple/30 rounded-xl p-4 text-center commercial-shadow w-32">
        <p className="text-brand-purple text-xs font-sans sans-modern font-bold mb-1">Banner</p>
        <p className="text-brand-gray text-xs font-serif serif-elegant">120x240</p>
      </div>
    </div>
  )
}
