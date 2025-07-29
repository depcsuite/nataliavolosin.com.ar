"use client"

import { Separator } from "@/components/ui/separator"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { MenuIcon, RssIcon, InstagramIcon, YoutubeIcon, MusicIcon } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function Header() {
  const isMobile = useIsMobile()
  const pathname = usePathname()

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/newsletter", label: "Newsletters" },
    { href: "/sobre-mi", label: "Sobre Mí" },
    { href: "/por-que", label: "Por Qué Suscribirse" },
    { href: "/suscripcion", label: "Suscripción" },
  ]

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background px-4 py-3 shadow-sm md:px-6">
      <div className="container mx-auto flex h-14 items-center justify-between">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <span className="text-xl font-bold font-garamond">Natalia Volosin</span>
        </Link>

        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MenuIcon className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-4">
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "text-lg font-medium hover:text-primary",
                      pathname === link.href ? "text-primary" : "text-foreground",
                    )}
                    prefetch={false}
                  >
                    {link.label}
                  </Link>
                ))}
                <Separator className="my-2" />
                <div className="flex gap-4">
                  <Link href="#" className="text-muted-foreground hover:text-primary" prefetch={false}>
                    <RssIcon className="h-6 w-6" />
                    <span className="sr-only">RSS Feed</span>
                  </Link>
                  <Link href="#" className="text-muted-foreground hover:text-primary" prefetch={false}>
                    <InstagramIcon className="h-6 w-6" />
                    <span className="sr-only">Instagram</span>
                  </Link>
                  <Link href="#" className="text-muted-foreground hover:text-primary" prefetch={false}>
                    <YoutubeIcon className="h-6 w-6" />
                    <span className="sr-only">YouTube</span>
                  </Link>
                  <Link href="#" className="text-muted-foreground hover:text-primary" prefetch={false}>
                    <MusicIcon className="h-6 w-6" /> {/* TikTok icon */}
                    <span className="sr-only">TikTok</span>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === link.href ? "text-primary" : "text-foreground",
                )}
                prefetch={false}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-4 ml-4">
              <Link href="#" className="text-muted-foreground hover:text-primary" prefetch={false}>
                <RssIcon className="h-5 w-5" />
                <span className="sr-only">RSS Feed</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary" prefetch={false}>
                <InstagramIcon className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary" prefetch={false}>
                <YoutubeIcon className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary" prefetch={false}>
                <MusicIcon className="h-5 w-5" /> {/* TikTok icon */}
                <span className="sr-only">TikTok</span>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
