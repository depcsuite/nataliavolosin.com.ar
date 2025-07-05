import { Card } from "@/components/ui/card"

interface AdBannerProps {
  size: string
  className?: string
}

export function AdBanner({ size, className }: AdBannerProps) {
  return (
    <Card
      className={`bg-gradient-to-br from-brand-gray/10 to-brand-light-gray border-2 border-dashed border-brand-gray/30 rounded-2xl p-8 text-center commercial-shadow ${className}`}
    >
      <p className="text-brand-gray text-sm font-sans sans-modern font-bold mb-2">Espacio Publicitario</p>
      <p className="text-brand-gray text-xs font-serif serif-elegant">{size}</p>
    </Card>
  )
}
