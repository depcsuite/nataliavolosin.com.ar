"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Instagram,
  Star,
  Menu,
  Search,
  TrendingUp,
  Zap,
  Users,
  ExternalLink,
  Play,
  Eye,
  Twitter,
  Music,
} from "lucide-react"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import { TagBadge } from "@/components/ui/tag-badge"

// Datos de ejemplo para los artículos
const featuredArticle = {
  id: 1,
  slug: "crisis-institucional-reformas-estructurales-argentina",
  title: "Crisis institucional: El momento decisivo para las reformas estructurales en Argentina",
  excerpt:
    "Un análisis exhaustivo sobre la coyuntura política actual y las oportunidades únicas que se presentan para implementar cambios profundos en el sistema institucional argentino.",
  content: "Contenido completo del artículo principal...",
  date: "2025-01-16",
  readTime: "15 min",
  category: "Análisis Político",
  image: "/placeholder.svg?height=400&width=600",
  views: "2.3K",
}

const articles = [
  {
    id: 2,
    slug: "corrupcion-contrataciones-publicas-mecanismos-control",
    title: "La corrupción en las contrataciones públicas: Nuevos mecanismos de control",
    excerpt:
      "Propuestas concretas para fortalecer la transparencia en las compras del Estado basadas en experiencias internacionales exitosas.",
    content: "Contenido completo del artículo sobre corrupción...",
    date: "2025-01-15",
    readTime: "8 min",
    category: "Derecho Público",
    image: "/placeholder.svg?height=200&width=300",
    views: "1.8K",
  },
  {
    id: 3,
    slug: "reformas-judiciales-lecciones-yale-sistema-argentino",
    title: "Reformas judiciales: Lecciones desde Yale para el sistema argentino",
    excerpt:
      "Reflexiones sobre las reformas necesarias en el Poder Judicial, comparando modelos internacionales con la realidad local.",
    content: "Contenido completo sobre reformas judiciales...",
    date: "2025-01-14",
    readTime: "12 min",
    category: "Justicia",
    image: "/placeholder.svg?height=200&width=300",
    views: "1.5K",
  },
  {
    id: 4,
    slug: "criminalidad-economica-desafios-procuracion-general",
    title: "Criminalidad económica: Los desafíos de la Procuración General",
    excerpt:
      "Una mirada desde adentro sobre los obstáculos y oportunidades en la persecución de delitos económicos complejos.",
    content: "Contenido completo sobre criminalidad económica...",
    date: "2025-01-13",
    readTime: "10 min",
    category: "Derecho Penal",
    image: "/placeholder.svg?height=200&width=300",
    views: "2.1K",
  },
  {
    id: 5,
    slug: "transparencia-gubernamental-rol-sociedad-civil",
    title: "Transparencia gubernamental: El rol de la sociedad civil",
    excerpt: "Cómo las organizaciones ciudadanas pueden ser catalizadoras del cambio institucional en Argentina.",
    content: "Contenido completo sobre transparencia...",
    date: "2025-01-12",
    readTime: "7 min",
    category: "Sociedad",
    image: "/placeholder.svg?height=200&width=300",
    views: "1.2K",
  },
]

const breakingNews = [
  "🔥 Escándalo y suspensión del Juicio por la muerte de Diego Maradona",
  "⚡ Procuración General anuncia reformas en investigaciones económicas",
  "🚨 Debate sobre transparencia en contrataciones públicas gana impulso",
]

// Interface para tweets
interface Tweet {
  id: string
  text: string
  created_at: string
  public_metrics: {
    retweet_count: number
    like_count: number
    reply_count: number
  }
  author?: {
    name: string
    username: string
    profile_image_url: string
  }
}

// Instagram Reels data
const instagramReels = [
  {
    id: "DKvV_ReM1Hl",
    url: "https://www.instagram.com/reel/DKvV_ReM1Hl/?utm_source=ig_embed&utm_campaign=loading",
  },
  {
    id: "DKfm0PQx0mn",
    url: "https://www.instagram.com/reel/DKfm0PQx0mn/?utm_source=ig_embed&utm_campaign=loading",
  },
  {
    id: "DJpvWLDMVSb",
    url: "https://www.instagram.com/reel/DJpvWLDMVSb/?utm_source=ig_embed&utm_campaign=loading",
  },
]

// Mock data for videos
const popularVideos = [
  {
    id: "1",
    title: "Debate sobre la corrupción en Argentina",
    thumbnail: "/placeholder.svg?height=100&width=200",
    views: "12K",
    duration: "15:30",
  },
  {
    id: "2",
    title: "Análisis de las reformas judiciales",
    thumbnail: "/placeholder.svg?height=100&width=200",
    views: "8.5K",
    duration: "22:45",
  },
  {
    id: "3",
    title: "El rol de la sociedad civil en la transparencia",
    thumbnail: "/placeholder.svg?height=100&width=200",
    views: "6.2K",
    duration: "18:10",
  },
]

export default function HomePage() {
  const [freeArticlesRead, setFreeArticlesRead] = useState(0)
  const [showPaywall, setShowPaywall] = useState(false)
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [tweets, setTweets] = useState<Tweet[]>([])
  const [isLoadingTweets, setIsLoadingTweets] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("freeArticlesRead")
    if (stored) {
      setFreeArticlesRead(Number.parseInt(stored))
    }
  }, [])

  // Load Instagram embed script
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "//www.instagram.com/embed.js"
    script.async = true
    document.body.appendChild(script)

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector('script[src="//www.instagram.com/embed.js"]')
      if (existingScript) {
        document.body.removeChild(existingScript)
      }
    }
  }, [])

  // Scroll listener para ocultar el top bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Función para obtener tweets en tiempo real desde la API
  useEffect(() => {
    const fetchTweets = async () => {
      try {
        setIsLoadingTweets(true)

        const response = await fetch("/api/twitter")
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()

        if (data.data && Array.isArray(data.data)) {
          // Filter out tweets without proper author data
          const validTweets = data.data.filter(
            (tweet: Tweet) => tweet && tweet.author && tweet.author.profile_image_url,
          )
          setTweets(validTweets)
        }
      } catch (error) {
        console.error("Error fetching tweets:", error)
        // Set empty array on error
        setTweets([])
      } finally {
        setIsLoadingTweets(false)
      }
    }

    fetchTweets()

    // Actualizar tweets cada 5 minutos
    const interval = setInterval(fetchTweets, 5 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  const formatTimeAgo = (dateString: string) => {
    const now = new Date()
    const tweetDate = new Date(dateString)
    const diffInHours = Math.floor((now.getTime() - tweetDate.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - tweetDate.getTime()) / (1000 * 60))
      return `Hace ${diffInMinutes} min`
    } else if (diffInHours < 24) {
      return `Hace ${diffInHours}h`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `Hace ${diffInDays}d`
    }
  }

  const handleArticleClick = (article: any) => {
    if (freeArticlesRead >= 3) {
      setShowPaywall(true)
      return
    }

    const newCount = freeArticlesRead + 1
    setFreeArticlesRead(newCount)
    localStorage.setItem("freeArticlesRead", newCount.toString())

    // Navegar a la página del artículo
    window.location.href = `/articulo/${article.slug}`
  }

  const handleSubscribe = () => {
    setIsSubscriptionOpen(true)
    setShowPaywall(false)
  }

  const shareOnTwitter = (article: any) => {
    const text = encodeURIComponent(`${article.title} por @nataliavolosin`)
    const url = encodeURIComponent(`${window.location.origin}/articulo/${article.slug}`)
    const twitterUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`
    window.open(twitterUrl, "_blank", "width=550,height=420")
  }

  return (
    <div className="min-h-screen bg-brand-light-gray font-serif">
      {/* Header */}
      <header className="bg-brand-white border-b border-brand-gray/20 commercial-shadow sticky top-0 z-50">
        {/* Top Bar - Se oculta al hacer scroll */}
        <div
          className={`bg-gradient-to-r from-brand-purple to-brand-teal text-brand-white transition-all duration-300 ${
            isScrolled ? "h-0 overflow-hidden py-0" : "py-2"
          }`}
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between text-sm font-sans sans-modern">
              <div className="flex items-center space-x-4">
                <span className="font-bold flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  ÚLTIMO MOMENTO:
                </span>
                <div className="hidden md:block">
                  <span className="animate-pulse">{breakingNews[0]}</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="font-medium">
                  {new Date().toLocaleDateString("es-AR", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Header - Altura reducida */}
        <div className={`container mx-auto px-4 transition-all duration-300 ${isScrolled ? "py-3" : "py-6"}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-4">
                <Link href="/">
                  <h1
                    className={`font-serif serif-elegant font-medium text-brand-black hover:text-brand-purple transition-all duration-300 ${
                      isScrolled ? "text-2xl" : "text-4xl"
                    }`}
                  >
                    Natalia{" "}
                    <span
                      className={`font-script script-enhanced text-brand-purple transition-all duration-300 ${
                        isScrolled ? "text-3xl" : "text-5xl"
                      }`}
                    >
                      Volosin
                    </span>
                  </h1>
                </Link>
                <span
                  className={`font-sans sans-modern font-black text-brand-black transition-all duration-300 ${
                    isScrolled ? "text-lg" : "text-2xl"
                  }`}
                >
                  →
                </span>
                <h2
                  className={`font-sans sans-modern font-black text-brand-black tracking-wider transition-all duration-300 ${
                    isScrolled ? "text-xl" : "text-3xl"
                  }`}
                >
                  LA JUSTA
                </h2>
              </div>
              {!isScrolled && (
                <div className="hidden lg:block text-sm text-brand-gray font-sans sans-modern font-medium">
                  Pensar es urgente
                </div>
              )}
            </div>

            <div className="flex items-center space-x-4">
              {/* Enhanced Search */}
              <div className="relative hidden md:block">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-gray w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Buscar noticias..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-4 py-3 w-72 bg-brand-light-gray border-2 border-brand-gray/30 focus:bg-brand-white focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 transition-all duration-300 rounded-xl font-sans sans-modern"
                  />
                  {searchQuery && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-brand-green/20"
                      onClick={() => setSearchQuery("")}
                    >
                      ×
                    </Button>
                  )}
                </div>
              </div>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Search className="w-5 h-5" />
              </Button>
              <Link href="/suscripcion">
                <Button
                  className={`bg-gradient-to-r from-brand-green to-brand-teal hover:from-brand-green/80 hover:to-brand-teal/80 text-brand-black font-sans sans-modern font-bold rounded-xl neon-glow transition-all duration-300 ${
                    isScrolled ? "px-4 py-2 text-sm" : "px-6 py-3"
                  }`}
                  size="lg"
                >
                  <Star className="w-5 h-5 mr-2" />
                  {isScrolled ? "Bancar a La Justa" : "Quiero bancar a La Justa"}
                </Button>
              </Link>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Navigation - Altura reducida */}
          <nav className="hidden md:flex items-center space-x-8 mt-4 pt-3 border-t border-brand-gray/20">
            <Link
              href="/"
              className="text-brand-purple font-sans sans-modern font-bold text-base transition-colors tracking-wide"
            >
              INICIO
            </Link>
            <Link
              href="/sobre-mi"
              className="text-brand-black hover:text-brand-teal font-sans sans-modern font-bold text-base transition-colors tracking-wide"
            >
              QUIÉN
            </Link>
            <Link
              href="/newsletter"
              className="text-brand-black hover:text-brand-purple font-sans sans-modern font-bold text-base transition-colors tracking-wide"
            >
              LA JUSTA
            </Link>
            <Link
              href="/suscripcion"
              className="text-brand-black hover:text-brand-teal font-sans sans-modern font-bold text-base transition-colors tracking-wide"
            >
              POR QUÉ
            </Link>
            <Link
              href="/videos"
              className="text-brand-black hover:text-brand-purple font-sans sans-modern font-bold text-base transition-colors tracking-wide"
            >
              VIDEOS
            </Link>
          </nav>
        </div>
      </header>

      {/* Breaking News Ticker - Se oculta al hacer scroll */}
      <div
        className={`bg-gradient-to-r from-brand-green via-brand-green to-brand-green/80 border-b border-brand-gray/20 transition-all duration-300 ${
          isScrolled ? "h-0 overflow-hidden py-0" : "py-3"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center">
            <span className="bg-brand-black text-brand-white px-4 py-2 text-sm font-sans sans-modern font-bold mr-6 rounded-full flex items-center">
              <Zap className="w-4 h-4 mr-2" />
              BREAKING
            </span>
            <div className="flex-1 overflow-hidden">
              <div className="animate-marquee whitespace-nowrap text-lg font-serif serif-elegant font-medium text-brand-black">
                {breakingNews.join(" • ")}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {/* Hero Section with Slogan */}
            <section className="mb-16 text-center bg-gradient-to-br from-brand-purple/10 via-brand-green/20 to-brand-teal/10 p-12 rounded-3xl commercial-shadow">
              <div className="mb-6">
                <Badge className="bg-brand-purple text-brand-white px-4 py-2 font-sans sans-modern font-bold text-sm mb-4">
                  Bienvenid@ a La Justa
                </Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-serif serif-elegant font-medium text-brand-black mb-6">
                La plataforma de contenidos digitales de{" "}
                <span className="font-script script-enhanced text-brand-purple">Natalia Volosin</span>
              </h1>
              <p className="text-xl font-sans sans-modern font-medium text-brand-black mb-6 tracking-wide">
                DATOS • INVESTIGACIÓN • ANÁLISIS INDEPENDIENTE
              </p>
              <div className="max-w-4xl mx-auto space-y-4 text-lg font-arimo leading-relaxed text-brand-black mb-8">
                <p>
                  <strong>La Justa</strong> te trae lo que los medios tradicionales no te quieren contar, con la
                  independencia, la claridad y la irreverencia de siempre.
                </p>
                <p>
                  <span className="bg-brand-green/30 px-2 py-1 rounded">
                    No recibimos ni vamos a recibir pauta de ningún gobierno ni de empresas vinculadas al juego,
                    servicios públicos o sindicatos.
                  </span>{" "}
                  Esto nos diferencia de TODOS los medios y periodistas.
                </p>
                <p>
                  <strong>La Justa te va a incomodar, porque no somos neutrales.</strong> Pero nunca te va a manipular,
                  porque sí somos independientes.
                </p>
                <p className="text-brand-purple font-medium">
                  Y porque no exageramos cuando decimos que{" "}
                  <span className="font-script script-enhanced text-2xl">la invitación a pensar es urgente.</span>
                </p>
              </div>
              <div className="flex justify-center">
                <Link href="/suscripcion">
                  <Button className="bg-gradient-to-r from-brand-purple to-brand-teal text-brand-white font-sans sans-modern font-bold px-8 py-4 rounded-2xl text-lg hover:scale-105 transition-transform duration-300">
                    <Users className="w-5 h-5 mr-2" />
                    Quiero bancar a La Justa
                  </Button>
                </Link>
              </div>
            </section>

            {/* Advertising Banner - After Hero */}
            <section className="mb-16">
              <div className="bg-gradient-to-r from-brand-gray/10 to-brand-light-gray border-2 border-dashed border-brand-gray/30 rounded-2xl p-8 text-center commercial-shadow">
                <p className="text-brand-gray text-sm font-sans sans-modern font-bold mb-2">Espacio Publicitario</p>
                <p className="text-brand-gray text-xs font-serif serif-elegant">728x90 - Banner Superior</p>
              </div>
            </section>

            {/* Latest Newsletter Preview */}
            <section className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-sans sans-modern font-black text-brand-black tracking-wide">
                  ÚLTIMO NEWSLETTER
                </h2>
                <Link href="/newsletter">
                  <Button
                    variant="outline"
                    className="border-2 border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-brand-white font-sans sans-modern font-bold px-6 py-3 rounded-xl transition-all duration-300 bg-transparent"
                  >
                    Ver todos
                  </Button>
                </Link>
              </div>
              <Card className="overflow-hidden commercial-shadow border-2 border-brand-gray/20 rounded-2xl hover:scale-[1.02] transition-transform duration-300">
                <CardHeader className="bg-gradient-to-r from-brand-green/20 to-brand-teal/20 p-8">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-brand-black text-brand-white px-4 py-2 text-sm font-sans sans-modern font-bold rounded-full">
                      Newsletter #47
                    </Badge>
                    <span className="text-sm text-brand-gray font-sans sans-modern font-medium">16 de enero, 2025</span>
                  </div>
                  <CardTitle className="text-2xl font-serif serif-elegant font-medium text-brand-black mt-4">
                    Peligra el decomiso contra Cristina
                  </CardTitle>
                  <CardDescription className="text-brand-gray text-lg font-arimo leading-relaxed">
                    La Cámara Federal de Casación Penal podría anular el decomiso de $5.000 millones contra Cristina
                    Kirchner por un error procesal. Un análisis de las implicancias jurídicas y políticas de esta
                    decisión que va más allá de las preferencias partidarias...
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <Link href="/newsletter">
                    <Button className="w-full bg-gradient-to-r from-brand-black to-brand-gray hover:from-brand-gray hover:to-brand-black text-brand-white font-sans sans-modern font-bold py-4 rounded-xl text-lg mb-4 transition-all duration-300 hover:scale-105">
                      Leer newsletter completo
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </section>

            {/* Instagram Reels Section */}
            <section className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-sans sans-modern font-black text-brand-black tracking-wide">
                  ÚLTIMOS REELS DE INSTAGRAM
                </h2>
                <Link href="https://www.instagram.com/nataliavolosin" target="_blank">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-brand-white font-sans sans-modern font-bold px-6 py-3 rounded-xl transition-all duration-300 bg-transparent"
                  >
                    <Instagram className="w-5 h-5 mr-2" />
                    Ver en Instagram
                  </Button>
                </Link>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {instagramReels.map((reel) => (
                  <iframe
                    key={reel.id}
                    src={`${reel.url}&embed=true`}
                    className="w-full h-96 rounded-2xl commercial-shadow"
                    allow="autoplay; encrypted-media; fullscreen"
                    loading="lazy"
                    title={reel.id}
                  />
                ))}
              </div>
            </section>

            {/* Advertising Banner - Mid Content */}
            <section className="mb-16">
              <div className="bg-gradient-to-br from-brand-purple/5 to-brand-teal/5 border-2 border-dashed border-brand-purple/20 rounded-2xl p-12 text-center commercial-shadow">
                <p className="text-brand-purple text-lg font-sans sans-modern font-bold mb-2">Publicidad</p>
                <p className="text-brand-gray text-sm font-serif serif-elegant">300x250 - Rectángulo Medio</p>
              </div>
            </section>

            {/* Real Twitter Feed */}
            <section className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-sans sans-modern font-black text-brand-black tracking-wide">
                  EN VIVO DESDE X
                </h2>
                <Link href="https://twitter.com/nataliavolosin" target="_blank">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-brand-white font-sans sans-modern font-bold px-6 py-3 rounded-xl transition-all duration-300 bg-transparent"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-5 h-5 mr-2"
                    >
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 1.6 3.4 1.6 5.1 0-1.2-1.2-3-1.2-4.6 0C2 16 3.5 12 12 14 8 21.9 1 20.4 0 18c2.2 3 4.7 3 6.5 1 2-2 4.9-1 6.2 1 1.2-1 2.1-2.1 3-3.1 0 2.2.9 4.3 2 5.1-2-3-6.1-9.3-6.1-9.3l1.5 3.6" />
                    </svg>
                    Seguir en X
                  </Button>
                </Link>
              </div>

              {isLoadingTweets ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map((i) => (
                    <Card
                      key={i}
                      className="bg-brand-white commercial-shadow border-2 border-brand-gray/20 rounded-2xl"
                    >
                      <CardHeader className="p-6">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-brand-gray/20 rounded-full animate-pulse" />
                          <div className="space-y-2">
                            <div className="w-32 h-4 bg-brand-gray/20 rounded animate-pulse" />
                            <div className="w-24 h-3 bg-brand-gray/20 rounded animate-pulse" />
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6 pt-0">
                        <div className="space-y-3">
                          <div className="w-full h-4 bg-brand-gray/20 rounded animate-pulse" />
                          <div className="w-3/4 h-4 bg-brand-gray/20 rounded animate-pulse" />
                          <div className="w-1/2 h-4 bg-brand-gray/20 rounded animate-pulse" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : tweets.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {tweets.slice(0, 4).map((tweet) => (
                    <Card
                      key={tweet.id}
                      className="bg-brand-white commercial-shadow border-2 border-brand-gray/20 rounded-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer group"
                      onClick={() =>
                        window.open(`https://twitter.com/${tweet.author?.username}/status/${tweet.id}`, "_blank")
                      }
                    >
                      <CardHeader className="p-6">
                        <div className="flex items-center space-x-4">
                          <div className="relative">
                            <img
                              src={tweet.author?.profile_image_url || "/placeholder.svg"}
                              alt={tweet.author?.name}
                              className="w-12 h-12 rounded-full border-2 border-brand-gray/20"
                            />
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-brand-purple rounded-full flex items-center justify-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="white"
                                className="w-3 h-3"
                              >
                                <path d="M22 4s-.7 2.1-2 3.4c1.6 1.6 3.4 1.6 5.1 0-1.2-1.2-3-1.2-4.6 0C2 16 3.5 12 12 14 8 21.9 1 20.4 0 18c2.2 3 4.7 3 6.5 1 2-2 4.9-1 6.2 1 1.2-1 2.1-2.1 3-3.1 0 2.2.9 4.3 2 5.1-2-3-6.1-9.3-6.1-9.3l1.5 3.6" />
                              </svg>
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <h3 className="font-sans sans-modern font-bold text-brand-black group-hover:text-brand-purple transition-colors">
                                {tweet.author?.name}
                              </h3>
                              <Badge className="bg-brand-green text-brand-black text-xs font-sans sans-modern font-bold">
                                VERIFICADO
                              </Badge>
                            </div>
                            <p className="text-sm text-brand-gray font-sans sans-modern">
                              @{tweet.author?.username} • {formatTimeAgo(tweet.created_at)}
                            </p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6 pt-0">
                        <p className="text-brand-black font-arimo leading-relaxed mb-4 line-clamp-3">{tweet.text}</p>
                        <div className="flex items-center justify-between pt-4 border-t border-brand-gray/20">
                          <div className="flex items-center space-x-6">
                            <div className="flex items-center space-x-1 text-brand-gray hover:text-brand-purple transition-colors">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                              </svg>
                              <span className="text-xs font-sans sans-modern font-medium">
                                {tweet.public_metrics.reply_count}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1 text-brand-gray hover:text-brand-teal transition-colors">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="m17 2 2 2 2-2" />
                                <path d="M7 22 5 20 3 22" />
                                <path d="M4 12v8a2 2 0 0 0 2 2h14" />
                                <path d="M20 12V4a2 2 0 0 0-2-2H4" />
                              </svg>
                              <span className="text-xs font-sans sans-modern font-medium">
                                {tweet.public_metrics.retweet_count}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1 text-brand-gray hover:text-red-500 transition-colors">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.04 0-2.07.27-3 .75A5.5 5.5 0 0 0 8.5 3A5.5 5.5 0 0 0 3 8.5c0 2.29 1.51 4.04 3 5.5l6 6 6-6Z" />
                              </svg>
                              <span className="text-xs font-sans sans-modern font-medium">
                                {tweet.public_metrics.like_count}
                              </span>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-brand-gray hover:text-brand-purple transition-colors"
                            onClick={(e) => {
                              e.stopPropagation()
                              window.open(`https://twitter.com/${tweet.author?.username}/status/${tweet.id}`, "_blank")
                            }}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="bg-brand-white commercial-shadow border-2 border-brand-gray/20 rounded-2xl">
                  <CardContent className="p-12 text-center">
                    <div className="w-16 h-16 bg-brand-gray/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-brand-gray"
                      >
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 1.6 3.4 1.6 5.1 0-1.2-1.2-3-1.2-4.6 0C2 16 3.5 12 12 14 8 21.9 1 20.4 0 18c2.2 3 4.7 3 6.5 1 2-2 4.9-1 6.2 1 1.2-1 2.1-2.1 3-3.1 0 2.2.9 4.3 2 5.1-2-3-6.1-9.3-6.1-9.3l1.5 3.6" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-sans sans-modern font-bold text-brand-black mb-2">
                      No se pudieron cargar los tweets
                    </h3>
                    <p className="text-brand-gray font-arimo mb-4">
                      Visitá el perfil de X para ver las últimas actualizaciones
                    </p>
                    <Button variant="outline" asChild>
                      <Link href="https://twitter.com/nataliavolosin" target="_blank">
                        Ver en X
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </section>

            {/* Featured Articles Section */}
            <section className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-sans sans-modern font-black text-brand-black tracking-wide">
                  ARTÍCULOS DESTACADOS
                </h2>
                <Link href="/articulos">
                  <Button
                    variant="outline"
                    className="border-2 border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-brand-white font-sans sans-modern font-bold px-6 py-3 rounded-xl transition-all duration-300 bg-transparent"
                  >
                    Ver todos
                  </Button>
                </Link>
              </div>

              {/* Featured Article Card */}
              <Card
                onClick={() => handleArticleClick(featuredArticle)}
                className="bg-brand-white commercial-shadow border-2 border-brand-gray/20 rounded-2xl cursor-pointer hover:scale-[1.02] transition-transform duration-300"
              >
                <CardHeader className="p-0">
                  <img
                    src={featuredArticle.image || "/placeholder.svg"}
                    alt={featuredArticle.title}
                    className="w-full h-64 object-cover rounded-t-2xl"
                  />
                </CardHeader>
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <TagBadge index={0} className="text-sm font-sans sans-modern font-bold">
                      {featuredArticle.category}
                    </TagBadge>
                    <span className="text-sm text-brand-gray font-sans sans-modern font-medium">
                      {featuredArticle.date} • {featuredArticle.readTime}
                    </span>
                  </div>
                  <CardTitle className="text-2xl font-serif serif-elegant font-medium text-brand-black">
                    {featuredArticle.title}
                  </CardTitle>
                  <CardDescription className="text-brand-gray text-lg font-arimo leading-relaxed">
                    {featuredArticle.excerpt}
                  </CardDescription>
                  <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center space-x-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-eye w-5 h-5 text-brand-gray"
                      >
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                      <span className="text-sm text-brand-gray font-sans sans-modern font-medium">
                        {featuredArticle.views}
                      </span>
                    </div>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation() // Prevent Card onClick
                        shareOnTwitter(featuredArticle)
                      }}
                    >
                      Compartir
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Other Articles Grid */}
              <div className="grid md:grid-cols-2 gap-8 mt-12">
                {articles.map((article) => (
                  <Card
                    key={article.id}
                    onClick={() => handleArticleClick(article)}
                    className="bg-brand-white commercial-shadow border-2 border-brand-gray/20 rounded-2xl cursor-pointer hover:scale-[1.02] transition-transform duration-300"
                  >
                    <CardHeader className="p-0">
                      <img
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        className="w-full h-48 object-cover rounded-t-2xl"
                      />
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <TagBadge index={article.id} className="text-sm font-sans sans-modern font-bold">
                          {article.category}
                        </TagBadge>
                        <span className="text-sm text-brand-gray font-sans sans-modern font-medium">
                          {article.date} • {article.readTime}
                        </span>
                      </div>
                      <CardTitle className="text-xl font-serif serif-elegant font-medium text-brand-black">
                        {article.title}
                      </CardTitle>
                      <CardDescription className="text-brand-gray text-base font-arimo leading-relaxed">
                        {article.excerpt}
                      </CardDescription>
                      <div className="flex items-center justify-between mt-6">
                        <div className="flex items-center space-x-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-eye w-5 h-5 text-brand-gray"
                          >
                            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                          <span className="text-sm text-brand-gray font-sans sans-modern font-medium">
                            {article.views}
                          </span>
                        </div>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation() // Prevent Card onClick
                            shareOnTwitter(article)
                          }}
                        >
                          Compartir
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Advertising Banner - Bottom Content */}
            <section className="mb-16">
              <div className="bg-gradient-to-r from-brand-green/10 to-brand-teal/10 border-2 border-dashed border-brand-green/30 rounded-2xl p-8 text-center commercial-shadow">
                <p className="text-brand-green text-lg font-sans sans-modern font-bold mb-2">Espacio Comercial</p>
                <p className="text-brand-gray text-xs font-serif serif-elegant">728x90 - Banner Inferior</p>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            {/* About Me Card - Redesigned */}
            <Card className="mb-8 bg-brand-white commercial-shadow border-2 border-brand-gray/20 rounded-2xl">
              <CardContent className="p-6 text-center">
                <Image
                  src="/natalia-volosin.jpg"
                  alt="Natalia Volosin"
                  width={120}
                  height={120}
                  className="w-32 h-32 object-cover rounded-full mx-auto mb-4 border-4 border-brand-gray/20"
                />
                <h3 className="text-xl font-serif serif-elegant font-medium text-brand-black mb-2">Natalia Volosin</h3>
                <p className="text-brand-gray font-sans sans-modern font-medium mb-3">Mamá de 2/Bostera 💙💛🎾⚽️</p>
                <p className="text-brand-black font-arimo leading-relaxed mb-2">
                  Abogada, consultora, académica y comunicadora
                </p>
                <p className="text-brand-purple font-sans sans-modern font-bold text-sm mb-4">
                  Máster y Doctora en Derecho (Yale)
                </p>
                <Button asChild variant="secondary" className="w-full">
                  <Link href="/sobre-mi">Conoceme</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Social Media Card */}
            <Card className="mb-8 bg-brand-white commercial-shadow border-2 border-brand-gray/20 rounded-2xl">
              <CardHeader className="p-6">
                <CardTitle className="text-xl font-sans sans-modern font-black text-brand-black tracking-wide">
                  SÍGUEME EN REDES
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <Link
                    href="https://x.com/nataliavolosin"
                    target="_blank"
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-brand-light-gray/50 transition-colors group"
                  >
                    <Twitter className="w-5 h-5 text-brand-gray group-hover:text-brand-black" />
                    <span className="font-sans sans-modern font-medium text-brand-black">@nataliavolosin</span>
                    <ExternalLink className="w-4 h-4 text-brand-gray ml-auto" />
                  </Link>
                  <Link
                    href="https://www.instagram.com/nataliavolosin"
                    target="_blank"
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-brand-light-gray/50 transition-colors group"
                  >
                    <Instagram className="w-5 h-5 text-brand-gray group-hover:text-brand-black" />
                    <span className="font-sans sans-modern font-medium text-brand-black">@nataliavolosin</span>
                    <ExternalLink className="w-4 h-4 text-brand-gray ml-auto" />
                  </Link>
                  <Link
                    href="https://www.tiktok.com/@nataliaavolosin"
                    target="_blank"
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-brand-light-gray/50 transition-colors group"
                  >
                    <Music className="w-5 h-5 text-brand-gray group-hover:text-brand-black" />
                    <span className="font-sans sans-modern font-medium text-brand-black">@nataliaavolosin</span>
                    <ExternalLink className="w-4 h-4 text-brand-gray ml-auto" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Popular Videos Section - Updated to match /videos page */}
            <Card className="mb-8 bg-brand-white commercial-shadow border-2 border-brand-gray/20 rounded-2xl">
              <CardHeader className="p-6">
                <CardTitle className="text-xl font-sans sans-modern font-black text-brand-black tracking-wide flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-brand-purple" />
                  VIDEOS MÁS VISTOS
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {[
                    {
                      id: 4,
                      title:
                        "CRISTINA: HOY FALLA LA CORTE y PUEDE IR PRESA con NOE BARRAL y NATALIA VOLOSIN | ESCUCHO OFERTAS",
                      views: "4.2K",
                      duration: "45:33",
                      thumbnail: "https://img.youtube.com/vi/KWikXTJIoC8/maxresdefault.jpg",
                    },
                    {
                      id: 3,
                      title: 'Natalia Volosin - FORO "ARGENTINA: LA CORRUPCIÓN POLÍTICA"',
                      views: "3.1K",
                      duration: "31:28",
                      thumbnail: "https://img.youtube.com/vi/Tnctnmyon-c/maxresdefault.jpg",
                    },
                    {
                      id: 6,
                      title: 'Natalia Volosin, abogada, desde la marcha de jubilados: "Militarizaron la Plaza"',
                      views: "2.7K",
                      duration: "12:18",
                      thumbnail: "https://img.youtube.com/vi/dxNn_9UdN1o/maxresdefault.jpg",
                    },
                    {
                      id: 1,
                      title: '"Mi calificación moral a Patricia Bullrich es de asesina" Natalia Volosin Abogada',
                      views: "2.3K",
                      duration: "18:45",
                      thumbnail: "https://img.youtube.com/vi/qXjxRHPMZqo/maxresdefault.jpg",
                    },
                  ].map((video, index) => (
                    <Link key={video.id} href="/videos" className="block">
                      <div className="flex items-start space-x-3 cursor-pointer hover:bg-brand-gray/10 p-2 rounded-lg transition-colors group">
                        <div className="relative flex-shrink-0">
                          <Image
                            src={video.thumbnail || "/placeholder.svg"}
                            alt={video.title}
                            width={80}
                            height={60}
                            className="rounded-lg object-cover"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                            <Play className="w-4 h-4 text-white" />
                          </div>
                          <div className="absolute bottom-1 right-1 bg-black bg-opacity-75 text-white px-1 text-xs rounded">
                            {video.duration}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="bg-brand-purple text-brand-white text-xs px-2 py-1 rounded-full font-sans sans-modern font-bold">
                              #{index + 1}
                            </span>
                            <span className="text-xs text-brand-gray font-sans sans-modern">
                              <Eye className="w-3 h-3 inline mr-1" />
                              {video.views}
                            </span>
                          </div>
                          <h4 className="text-sm font-arimo font-medium text-brand-black line-clamp-2 hover:text-brand-purple transition-colors">
                            {video.title}
                          </h4>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <Button asChild variant="secondary" className="w-full mt-4">
                  <Link href="/videos">Ver todos los videos</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Sidebar Ad Space 1 */}
            <div className="bg-gradient-to-br from-brand-teal/10 to-brand-green/10 border-2 border-dashed border-brand-teal/30 rounded-2xl p-6 text-center commercial-shadow">
              <p className="text-brand-teal text-sm font-sans sans-modern font-bold mb-2">Publicidad</p>
              <p className="text-brand-gray text-xs font-serif serif-elegant">300x250</p>
            </div>

            {/* Sidebar Ad Space 2 */}
            <div className="bg-gradient-to-br from-brand-purple/10 to-brand-gray/10 border-2 border-dashed border-brand-purple/30 rounded-2xl p-6 text-center commercial-shadow">
              <p className="text-brand-purple text-sm font-sans sans-modern font-bold mb-2">Banner</p>
              <p className="text-brand-gray text-xs font-serif serif-elegant">300x100</p>
            </div>

            {/* Newsletter Subscription Card */}
            <Card className="bg-gradient-to-br from-brand-green/40 to-brand-green/60 border-2 border-brand-green commercial-shadow rounded-2xl neon-glow">
              <CardHeader className="text-center p-8">
                <div className="mb-4">
                  <h3 className="text-2xl font-serif serif-elegant font-medium text-brand-black mb-2">
                    LA INVITACIÓN A{" "}
                    <span className="font-script script-enhanced text-3xl text-brand-purple">pensar</span>
                  </h3>
                  <h4 className="text-2xl font-sans sans-modern font-black text-brand-black">
                    ES <span className="bg-brand-gray text-brand-white px-3 py-1 rounded">URGENTE</span>
                  </h4>
                </div>
                <p className="text-sm font-sans sans-modern text-brand-black font-medium">
                  Recibe análisis semanales los viernes
                </p>
              </CardHeader>
              <CardContent className="text-center p-8 pt-0">
                <div className="space-y-4 mb-6">
                  <p className="text-sm text-brand-black font-arimo">
                    Suscríbete al newsletter gratuito de los viernes haciendo clic en el enlace:
                  </p>
                </div>
                <Link href="https://substack.com/@nataliavolosin" target="_blank">
                  <Button className="w-full bg-brand-black hover:bg-brand-gray text-brand-white font-sans sans-modern font-bold py-4 rounded-xl text-lg mb-4 transition-all duration-300 hover:scale-105">
                    Suscribirse Gratis
                  </Button>
                </Link>
                <p className="text-sm text-brand-black font-sans sans-modern font-medium">
                  Newsletter gratuito • Análisis semanales • Sin compromisos
                </p>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-brand-black text-brand-white py-16">
        <div className="container mx-auto px-4">
          {/* Logo y tagline centrados */}
          <div className="text-center mb-12">
            <h4 className="text-3xl font-serif serif-elegant font-medium mb-2">
              Natalia <span className="font-script script-enhanced text-4xl text-brand-purple">Volosin</span>
            </h4>
            <h5 className="text-2xl font-sans sans-modern font-black mb-4 tracking-wider">LA JUSTA</h5>
            <p className="text-brand-gray text-lg font-arimo">Portal de análisis independiente</p>
          </div>

          {/* Información de contacto en dos columnas */}
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div>
              <h4 className="text-brand-green font-sans sans-modern font-bold text-lg mb-4">
                Charlas, eventos, consultoría y capacitaciones:
              </h4>
              <p className="text-brand-gray font-arimo text-lg">lajusta@nataliavolosin.com</p>
            </div>
            <div>
              <h4 className="text-brand-teal font-sans sans-modern font-bold text-lg mb-4">Consultas comerciales:</h4>
              <p className="text-brand-gray font-arimo text-lg">comercial@nataliavolosin.com</p>
            </div>
          </div>

          {/* Separador */}
          <Separator className="bg-brand-gray/30 mb-12" />

          {/* Redes sociales centradas */}
          <div className="flex justify-center space-x-8 mb-8">
            <Link
              href="https://x.com/nataliavolosin"
              target="_blank"
              className="text-brand-gray hover:text-brand-white transition-colors p-3 rounded-full hover:bg-brand-gray/20"
            >
              <Twitter className="w-8 h-8" />
            </Link>
            <Link
              href="https://www.instagram.com/nataliavolosin"
              target="_blank"
              className="text-brand-gray hover:text-brand-white transition-colors p-3 rounded-full hover:bg-brand-gray/20"
            >
              <Instagram className="w-8 h-8" />
            </Link>
            <Link
              href="https://www.tiktok.com/@nataliaavolosin"
              target="_blank"
              className="text-brand-gray hover:text-brand-white transition-colors p-3 rounded-full hover:bg-brand-gray/20"
            >
              <Music className="w-8 h-8" />
            </Link>
          </div>

          {/* Copyright centrado */}
          <div className="text-center text-sm text-brand-gray font-sans sans-modern font-medium">
            © 2025 Natalia Volosin. Todos los derechos reservados.
          </div>
        </div>
      </footer>

      {/* Paywall Popup */}
      {showPaywall && (
        <div className="fixed top-0 left-0 w-full h-full bg-brand-black/50 z-50 flex items-center justify-center">
          <Card className="max-w-md w-full p-8 rounded-2xl commercial-shadow">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-sans sans-modern font-black text-brand-black tracking-wide">
                ¡Llegaste al límite de artículos gratis!
              </CardTitle>
              <CardDescription className="text-brand-gray font-arimo leading-relaxed">
                Suscribite para seguir disfrutando de contenido exclusivo.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-brand-black font-arimo leading-relaxed mb-6">
                Con tu suscripción, accedés a todos los artículos, newsletters y videos de La Justa.
              </p>
              <Button
                onClick={handleSubscribe}
                className="bg-gradient-to-r from-brand-purple to-brand-teal text-brand-white font-sans sans-modern font-bold px-8 py-4 rounded-2xl text-lg hover:scale-105 transition-transform duration-300"
              >
                Quiero suscribirme
              </Button>
              <Button
                variant="ghost"
                onClick={() => setShowPaywall(false)}
                className="mt-4 text-brand-gray hover:text-brand-black"
              >
                Cerrar
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Subscription Modal */}
      {isSubscriptionOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-brand-black/50 z-50 flex items-center justify-center">
          <Card className="max-w-md w-full p-8 rounded-2xl commercial-shadow">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-sans sans-modern font-black text-brand-black tracking-wide">
                ¡Gracias por suscribirte!
              </CardTitle>
              <CardDescription className="text-brand-gray font-arimo leading-relaxed">
                Ya podés disfrutar de todo el contenido exclusivo de La Justa.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-brand-black font-arimo leading-relaxed mb-6">
                Te damos la bienvenida a la comunidad de La Justa.
              </p>
              <Button
                onClick={() => setIsSubscriptionOpen(false)}
                className="bg-gradient-to-r from-brand-purple to-brand-teal text-brand-white font-sans sans-modern font-bold px-8 py-4 rounded-2xl text-lg hover:scale-105 transition-transform duration-300"
              >
                ¡A disfrutar!
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
