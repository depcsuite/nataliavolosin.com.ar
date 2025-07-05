"use client"
import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface StickyAdProps {
  position?: "top" | "bottom"
  className?: string
}

export function StickyAd({ position = "bottom", className }: StickyAdProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!isVisible) return null

  const positionClass = position === "top" ? "top-0" : "bottom-0"

  return (
    <div
      className={`fixed ${positionClass} left-0 right-0 z-50 bg-gradient-to-r from-brand-green/90 to-brand-teal/90 backdrop-blur-sm border-t-2 border-brand-green/30 transition-transform duration-300 ${
        position === "top" && isScrolled ? "transform -translate-y-full" : ""
      } ${className}`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex-1 text-center">
            <p className="text-brand-black font-sans sans-modern font-bold text-sm mb-1">Publicidad Adhesiva</p>
            <p className="text-brand-black/80 text-xs font-serif serif-elegant">
              728x90 - Banner {position === "top" ? "Superior" : "Inferior"} Fijo
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVisible(false)}
            className="text-brand-black hover:bg-brand-black/10 p-1 h-8 w-8"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
