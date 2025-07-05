import type React from "react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface TagBadgeProps {
  children: React.ReactNode
  index: number
  className?: string
}

const tagColors = [
  { bg: "bg-brand-purple", text: "text-brand-white" },
  { bg: "bg-brand-teal", text: "text-brand-black" },
  { bg: "bg-brand-green", text: "text-brand-black" },
  { bg: "bg-brand-yellow", text: "text-brand-black" },
  { bg: "bg-brand-orange", text: "text-brand-black" },
]

export function TagBadge({ children, index, className }: TagBadgeProps) {
  const colorScheme = tagColors[index % tagColors.length]

  return (
    <Badge
      className={cn(colorScheme.bg, colorScheme.text, "font-arimo font-bold px-2 py-1 text-xs rounded-full", className)}
    >
      {children}
    </Badge>
  )
}
