"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"

export function StickyAd() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsVisible(scrollPosition > 500)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 hidden lg:block">
      <Card className="bg-gradient-to-br from-brand-green/20 to-brand-teal/20 border-2 border-brand-green/30 rounded-2xl p-6 text-center commercial-shadow w-48">
        <p className="text-brand-green text-sm font-sans sans-modern font-bold mb-2">Publicidad</p>
        <p className="text-brand-gray text-xs font-serif serif-elegant">Sticky Ad 200x150</p>
      </Card>
    </div>
  )
}
