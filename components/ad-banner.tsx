import { cn } from "@/lib/utils"

interface AdBannerProps {
  size: "leaderboard" | "rectangle" | "banner" | "skyscraper" | "square" | "mobile"
  position?: "top" | "middle" | "bottom" | "sidebar"
  className?: string
  label?: string
}

const adSizes = {
  leaderboard: { width: "728x90", height: "h-24", text: "Banner Superior" },
  rectangle: { width: "300x250", height: "h-64", text: "Rectángulo Medio" },
  banner: { width: "468x60", height: "h-16", text: "Banner Medio" },
  skyscraper: { width: "300x600", height: "h-96", text: "Rascacielos" },
  square: { width: "300x300", height: "h-72", text: "Cuadrado" },
  mobile: { width: "320x50", height: "h-14", text: "Banner Móvil" },
}

const positionStyles = {
  top: "from-brand-gray/10 to-brand-light-gray border-brand-gray/30",
  middle: "from-brand-purple/5 to-brand-teal/5 border-brand-purple/20",
  bottom: "from-brand-green/10 to-brand-teal/10 border-brand-green/30",
  sidebar: "from-brand-teal/10 to-brand-green/10 border-brand-teal/30",
}

export function AdBanner({ size, position = "middle", className, label = "Espacio Publicitario" }: AdBannerProps) {
  const sizeConfig = adSizes[size]
  const positionStyle = positionStyles[position]

  return (
    <div
      className={cn(
        "bg-gradient-to-br border-2 border-dashed rounded-2xl p-8 text-center commercial-shadow",
        sizeConfig.height,
        positionStyle,
        className,
      )}
    >
      <p className="text-brand-gray text-sm font-sans sans-modern font-bold mb-2">{label}</p>
      <p className="text-brand-gray text-xs font-serif serif-elegant">
        {sizeConfig.width} - {sizeConfig.text}
      </p>
    </div>
  )
}
