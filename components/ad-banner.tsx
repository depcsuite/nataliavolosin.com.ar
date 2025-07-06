interface AdBannerProps {
  size?: "small" | "medium" | "large"
  className?: string
}

export function AdBanner({ size = "medium", className = "" }: AdBannerProps) {
  const sizeClasses = {
    small: "h-24 text-sm",
    medium: "h-32 text-base",
    large: "h-48 text-lg",
  }

  const dimensions = {
    small: "320x100",
    medium: "728x90",
    large: "970x250",
  }

  return (
    <div
      className={`bg-gradient-to-r from-brand-gray/10 to-brand-light-gray border-2 border-dashed border-brand-gray/30 rounded-2xl flex flex-col items-center justify-center text-center commercial-shadow ${sizeClasses[size]} ${className}`}
    >
      <p className="text-brand-gray font-arimo font-bold mb-1">Publicidad</p>
      <p className="text-brand-gray text-xs font-arimo">{dimensions[size]}</p>
    </div>
  )
}
