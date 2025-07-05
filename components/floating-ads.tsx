interface FloatingAdsProps {
  position?: "left" | "right"
  className?: string
}

export function FloatingAds({ position = "right", className }: FloatingAdsProps) {
  const positionClass = position === "left" ? "left-4" : "right-4"

  return (
    <div
      className={`hidden xl:block fixed ${positionClass} top-1/2 transform -translate-y-1/2 z-40 space-y-4 ${className}`}
    >
      <div className="bg-gradient-to-br from-brand-teal/10 to-brand-green/10 border-2 border-dashed border-brand-teal/30 rounded-xl p-4 text-center commercial-shadow w-32 h-64">
        <p className="text-brand-teal text-xs font-sans sans-modern font-bold mb-2">Publicidad</p>
        <p className="text-brand-gray text-xs font-serif serif-elegant">120x240</p>
        <p className="text-brand-gray text-xs font-serif serif-elegant mt-2">Flotante</p>
      </div>
      <div className="bg-gradient-to-br from-brand-purple/10 to-brand-gray/10 border-2 border-dashed border-brand-purple/30 rounded-xl p-4 text-center commercial-shadow w-32 h-32">
        <p className="text-brand-purple text-xs font-sans sans-modern font-bold mb-2">Banner</p>
        <p className="text-brand-gray text-xs font-serif serif-elegant">120x120</p>
      </div>
    </div>
  )
}
