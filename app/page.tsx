"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
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
  Twitter,
  Music,
  Heart,
  MessageCircle,
  Share,
  Mail,
} from "lucide-react"
import Image from "next/image"
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

// Instagram Videos data
const instagramVideos = [
  {
    id: "1",
    videoUrl:
      "https://s3.us-east-1.amazonaws.com/nataliavolosin.com.ar/videos/el-fallo-de-la-Corte-en-la-causa-vialidad.mp4",
    caption: "#cfk : el fallo de la Corte en la causa #vialidad",
    likes: 1247,
    comments: 89,
    shares: 156,
    timeAgo: "2h",
  },
  {
    id: "2",
    videoUrl:
      "https://s3.us-east-1.amazonaws.com/nataliavolosin.com.ar/videos/las-mentiras-de-juliana-santilla%CC%81n-ante-el-reclamo-de-las-me%CC%81dicas.mp4",
    caption: "#garrahan las mentiras de Juliana Santillán ante el reclamo de las médicas del hospital",
    likes: 892,
    comments: 67,
    shares: 134,
    timeAgo: "5h",
  },
  {
    id: "3",
    videoUrl:
      "https://s3.us-east-1.amazonaws.com/nataliavolosin.com.ar/videos/El-llanto-de-la-mujer-de-Jorge-Macri.mp4",
    caption:
      "El llanto de la mujer de Jorge Macri, Belén Ludueña, ante una simple pregunta de su panelista al Jefe de Gobierno. #jorgemacri #belenludueña #amaliaguiñazú #bicisenda",
    likes: 2156,
    comments: 234,
    shares: 298,
    timeAgo: "8h",
  },
]

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [tweets, setTweets] = useState<Tweet[]>([])
  const [isLoadingTweets, setIsLoadingTweets] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false) // Changed to false to show top bar initially
  const [playingVideo, setPlayingVideo] = useState<string | null>(null)
  const [showPlayButton, setShowPlayButton] = useState<{ [key: string]: boolean }>({})

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
    // Navegar directamente a la página del artículo sin validación
    window.location.href = `/articulo/${article.slug}`
  }

  const shareOnTwitter = (article: any) => {
    const text = encodeURIComponent(`${article.title} por @nataliavolosin`)
    const url = encodeURIComponent(`${window.location.origin}/articulo/${article.slug}`)
    const twitterUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`
    window.open(twitterUrl, "_blank", "width=550,height=420")
  }

  // Inicializar el estado para mostrar todos los botones de play
  useEffect(() => {
    const initialState: { [key: string]: boolean } = {}
    instagramVideos.forEach((video) => {
      initialState[video.id] = true
    })
    setShowPlayButton(initialState)
  }, [])

  const handleVideoClick = (videoId: string) => {
    const videoElement = document.getElementById(`video-${videoId}`) as HTMLVideoElement

    if (!videoElement) return

    if (playingVideo === videoId) {
      // Pause the current video
      videoElement.pause()
      setPlayingVideo(null)
      setShowPlayButton((prev) => ({ ...prev, [videoId]: true }))
    } else {
      // Pause all other videos first
      instagramVideos.forEach((v) => {
        if (v.id !== videoId) {
          const otherVideo = document.getElementById(`video-${v.id}`) as HTMLVideoElement
          if (otherVideo && !otherVideo.paused) {
            otherVideo.pause()
            setShowPlayButton((prev) => ({ ...prev, [v.id]: true }))
          }
        }
      })

      // Play the clicked video
      videoElement.muted = false // Asegurar que el audio esté habilitado
      videoElement
        .play()
        .then(() => {
          setPlayingVideo(videoId)
          setShowPlayButton((prev) => ({ ...prev, [videoId]: false }))
        })
        .catch((error) => {
          console.error("Error playing video:", error)
        })
    }
  }

  return (
    <div className="min-h-screen bg-brand-light-gray font-arimo">
      {/* Header */}
      <header className="bg-brand-white border-b border-brand-gray/20 commercial-shadow sticky top-0 z-50">
        {/* Top Bar - Se oculta al hacer scroll */}
        <div
          className={`bg-gradient-to-r from-brand-purple to-brand-teal text-brand-white transition-all duration-300 ${
            isScrolled ? "h-0 overflow-hidden py-0" : "py-2"
          }`}
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between text-sm font-arimo">
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
                    className={`font-garamond font-medium text-brand-black hover:text-brand-purple transition-all duration-300 ${
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
                  className={`font-arimo font-black text-brand-black transition-all duration-300 ${
                    isScrolled ? "text-lg" : "text-2xl"
                  }`}
                >
                  →
                </span>
                <h2
                  className={`font-arimo font-black text-brand-black tracking-wider transition-all duration-300 ${
                    isScrolled ? "text-xl" : "text-3xl"
                  }`}
                >
                  LA JUSTA
                </h2>
              </div>
              {!isScrolled && (
                <div className="hidden lg:block text-sm text-brand-gray font-arimo font-medium">Pensar es urgente</div>
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
                    className="pl-12 pr-4 py-3 w-72 bg-brand-light-gray border-2 border-brand-gray/30 focus:bg-brand-white focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 transition-all duration-300 rounded-xl font-arimo"
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
                  className={`bg-gradient-to-r from-brand-green to-brand-teal hover:from-brand-green/80 hover:to-brand-teal/80 text-brand-black font-arimo font-bold rounded-xl neon-glow transition-all duration-300 ${
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
            <Link href="/" className="text-brand-purple font-arimo font-bold text-base transition-colors tracking-wide">
              INICIO
            </Link>
            <Link
              href="/sobre-mi"
              className="text-brand-black hover:text-brand-teal font-arimo font-bold text-base transition-colors tracking-wide"
            >
              QUIÉN
            </Link>
            <Link
              href="/newsletter"
              className="text-brand-black hover:text-brand-purple font-arimo font-bold text-base transition-colors tracking-wide"
            >
              LA JUSTA
            </Link>
            <Link
              href="/suscripcion"
              className="text-brand-black hover:text-brand-teal font-arimo font-bold text-base transition-colors tracking-wide"
            >
              POR QUÉ
            </Link>
            <Link
              href="/videos"
              className="text-brand-black hover:text-brand-purple font-arimo font-bold text-base transition-colors tracking-wide"
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
            <span className="bg-brand-black text-brand-white px-4 py-2 text-sm font-arimo font-bold mr-6 rounded-full flex items-center">
              <Zap className="w-4 h-4 mr-2" />
              BREAKING
            </span>
            <div className="flex-1 overflow-hidden">
              <div className="animate-marquee whitespace-nowrap text-lg font-arimo font-medium text-brand-black">
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
                <Badge className="bg-brand-purple text-brand-white px-4 py-2 font-arimo font-bold text-sm mb-4">
                  Bienvenid@ a La Justa
                </Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-garamond font-medium text-brand-black mb-6">
                La plataforma de contenidos digitales de{" "}
                <span className="font-script script-enhanced text-brand-purple">Natalia Volosin</span>
              </h1>
              <p className="text-xl font-arimo font-medium text-brand-black mb-6 tracking-wide">
                DATOS • INVESTIGACIÓN • ANÁLISIS INDEPENDIENTE
              </p>
              <div className="max-w-4xl mx-auto space-y-4 text-lg font-arimo leading-relaxed text-brand-black mb-8">
                <p className="font-arimo">
                  <strong>La Justa</strong> te trae lo que los medios tradicionales no te quieren contar, con la
                  independencia, la claridad y la irreverencia de siempre.
                </p>
                <p className="font-arimo">
                  <span className="bg-brand-green/30 px-2 py-1 rounded">
                    No recibimos ni vamos a recibir pauta de ningún gobierno ni de empresas vinculadas al juego,
                    servicios públicos o sindicatos.
                  </span>{" "}
                  Esto nos diferencia de TODOS los medios y periodistas.
                </p>
                <p className="font-arimo">
                  <strong>La Justa te va a incomodar, porque no somos neutrales.</strong> Pero nunca te va a manipular,
                  porque sí somos independientes.
                </p>
                <p className="text-brand-purple font-medium font-arimo">
                  Y porque no exageramos cuando decimos que{" "}
                  <span className="font-script script-enhanced text-2xl">la invitación a pensar es urgente.</span>
                </p>
              </div>
              <div className="flex justify-center">
                <Link href="/suscripcion">
                  <Button className="bg-gradient-to-r from-brand-purple to-brand-teal text-brand-white font-arimo font-bold px-8 py-4 rounded-2xl text-lg hover:scale-105 transition-transform duration-300">
                    <Users className="w-5 h-5 mr-2" />
                    Quiero bancar a La Justa
                  </Button>
                </Link>
              </div>
            </section>

            {/* Advertising Banner - After Hero */}
            <section className="mb-16">
              <div className="bg-gradient-to-r from-brand-gray/10 to-brand-light-gray border-2 border-dashed border-brand-gray/30 rounded-2xl p-8 text-center commercial-shadow">
                <p className="text-brand-gray text-sm font-arimo font-bold mb-2">Espacio Publicitario</p>
                <p className="text-brand-gray text-xs font-arimo">728x90 - Banner Superior</p>
              </div>
            </section>

            {/* Real Twitter Feed */}
            <section className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-arimo font-black text-brand-black tracking-wide">En vivo desde X</h2>
                <Link href="https://twitter.com/nataliavolosin" target="_blank">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-brand-white font-arimo font-bold px-6 py-3 rounded-xl transition-all duration-300 bg-transparent"
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
                <div className="grid md:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
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
                <div className="grid md:grid-cols-3 gap-6">
                  {tweets.slice(0, 3).map((tweet) => (
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
                              <h3 className="font-arimo font-bold text-brand-black group-hover:text-brand-purple transition-colors">
                                {tweet.author?.name}
                              </h3>
                              <Badge className="bg-brand-green text-brand-black text-xs font-arimo font-bold">
                                VERIFICADO
                              </Badge>
                            </div>
                            <p className="text-sm text-brand-gray font-arimo">
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
                              <span className="text-xs font-arimo font-medium">{tweet.public_metrics.reply_count}</span>
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
                              <span className="text-xs font-arimo font-medium">
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
                              <span className="text-xs font-arimo font-medium">{tweet.public_metrics.like_count}</span>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-brand-gray hover:text-brand-purple transition-colors"
                            onClick={(e) => {
                              e.stopPropagation() // Prevent Card onClick
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
                    <h3 className="text-lg font-arimo font-bold text-brand-black mb-2">
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

            {/* Instagram Videos Section */}
            <section className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-arimo font-black text-brand-black tracking-wide">
                  Últimos reels de Instagram
                </h2>
                <Link href="https://www.instagram.com/nataliavolosin" target="_blank">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-brand-white font-arimo font-bold px-6 py-3 rounded-xl transition-all duration-300 bg-transparent"
                  >
                    <Instagram className="w-5 h-5 mr-2" />
                    Ver en Instagram
                  </Button>
                </Link>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {instagramVideos.map((video) => (
                  <Card
                    key={video.id}
                    className="bg-brand-white commercial-shadow border-2 border-brand-gray/20 rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform duration-300"
                  >
                    <div className="relative group">
                      <video
                        id={`video-${video.id}`}
                        className="w-full h-96 object-cover cursor-pointer"
                        preload="metadata"
                        muted={playingVideo !== video.id} // Solo mutear si no es el video que se está reproduciendo
                        playsInline
                        onLoadedMetadata={(e) => {
                          // Set the video to show the first frame
                          const videoElement = e.target as HTMLVideoElement
                          videoElement.currentTime = 0.1
                        }}
                        onPause={() => {
                          if (playingVideo === video.id) {
                            setPlayingVideo(null)
                            setShowPlayButton((prev) => ({ ...prev, [video.id]: true }))
                          }
                        }}
                        onEnded={() => {
                          if (playingVideo === video.id) {
                            setPlayingVideo(null)
                            setShowPlayButton((prev) => ({ ...prev, [video.id]: true }))
                          }
                        }}
                        onClick={() => handleVideoClick(video.id)}
                      >
                        <source src={video.videoUrl} type="video/mp4" />
                        Tu navegador no soporta el elemento de video.
                      </video>

                      {/* Play/Pause button overlay */}
                      {showPlayButton[video.id] && (
                        <div
                          className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/40 transition-all duration-300 cursor-pointer"
                          onClick={() => handleVideoClick(video.id)}
                        >
                          <div className="bg-white/90 hover:bg-white rounded-full p-4 transform group-hover:scale-110 transition-all duration-300 shadow-lg">
                            <Play className="w-8 h-8 text-brand-black ml-1" fill="currentColor" />
                          </div>
                        </div>
                      )}

                      {/* Instagram badge */}
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-brand-purple text-brand-white px-3 py-1 text-xs font-arimo font-bold">
                          <Instagram className="w-3 h-3 mr-1" />
                          Instagram
                        </Badge>
                      </div>

                      {/* Time ago badge */}
                      <div className="absolute top-4 right-4">
                        <span className="bg-black/70 text-white px-2 py-1 rounded text-xs font-arimo">
                          {video.timeAgo}
                        </span>
                      </div>

                      {/* Video duration indicator */}
                      <div className="absolute bottom-4 right-4">
                        <span className="bg-black/70 text-white px-2 py-1 rounded text-xs font-arimo">Video</span>
                      </div>
                    </div>

                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2 mb-3">
                        <Image
                          src="/natalia-volosin.jpg"
                          alt="Natalia Volosin"
                          width={32}
                          height={32}
                          className="w-8 h-8 rounded-full border-2 border-brand-gray/20"
                        />
                        <div>
                          <h4 className="font-arimo font-bold text-brand-black text-sm">nataliavolosin</h4>
                          <Badge className="bg-brand-green text-brand-black text-xs font-arimo font-bold">
                            VERIFICADO
                          </Badge>
                        </div>
                      </div>
                      <p className="text-brand-black font-arimo text-sm leading-relaxed mb-4 line-clamp-3">
                        {video.caption}
                      </p>
                      <div className="flex items-center justify-between pt-3 border-t border-brand-gray/20">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1 text-brand-gray hover:text-red-500 transition-colors cursor-pointer">
                            <Heart className="w-4 h-4" />
                            <span className="text-xs font-arimo font-medium">{video.likes.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-brand-gray hover:text-brand-purple transition-colors cursor-pointer">
                            <MessageCircle className="w-4 h-4" />
                            <span className="text-xs font-arimo font-medium">{video.comments}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-brand-gray hover:text-brand-teal transition-colors cursor-pointer">
                            <Share className="w-4 h-4" />
                            <span className="text-xs font-arimo font-medium">{video.shares}</span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-brand-gray hover:text-brand-purple transition-colors"
                          onClick={() => window.open("https://www.instagram.com/nataliavolosin", "_blank")}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* New Black Section - IMPACTO DE LA JUSTA */}
            <section className="mb-16">
              <div className="bg-gradient-to-br from-brand-black via-gray-900 to-brand-black rounded-3xl p-12 relative overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-10 left-10 w-32 h-32 bg-brand-purple rounded-full blur-2xl"></div>
                  <div className="absolute bottom-10 right-10 w-24 h-24 bg-brand-teal rounded-full blur-2xl"></div>
                  <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-yellow-400 rounded-full blur-xl"></div>
                </div>

                <div className="relative z-10 text-center max-w-3xl mx-auto">
                  <Badge className="bg-gradient-to-r from-brand-purple to-brand-teal text-white font-arimo font-bold px-6 py-3 text-sm mb-8 rounded-full shadow-lg">
                    IMPACTO DE LA JUSTA
                  </Badge>

                  <p className="text-white font-garamond text-lg mb-6 italic">
                    "La Justa no solo informa, sino que educa y empodera a los ciudadanos para que puedan participar
                    activamente en la vida democrática del país."
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/suscripcion">
                      <Button className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-arimo font-bold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105">
                        <Heart className="w-5 h-5 mr-2" />
                        Apoyar La Justa
                      </Button>
                    </Link>
                    <Link href="https://substack.com/@nataliavolosin" target="_blank">
                      <Button
                        variant="outline"
                        className="border-2 border-gray-600 text-white hover:bg-gray-800 font-arimo font-bold px-6 py-3 rounded-xl bg-transparent"
                      >
                        <Mail className="w-5 h-5 mr-2" />
                        Suscribirse Gratis
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* Featured Articles Section */}
            <section className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-arimo font-black text-brand-black tracking-wide">
                  Newsletters destacados
                </h2>
                <Link href="/articulos">
                  <Button
                    variant="outline"
                    className="border-2 border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-brand-white font-arimo font-bold px-6 py-3 rounded-xl transition-all duration-300 bg-transparent"
                  >
                    Ver todos
                  </Button>
                </Link>
              </div>

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
                        <TagBadge index={article.id} className="text-sm font-arimo font-bold">
                          {article.category}
                        </TagBadge>
                        <span className="text-sm text-brand-gray font-arimo font-medium">
                          {article.date} • {article.readTime}
                        </span>
                      </div>
                      <CardTitle className="text-xl font-garamond font-medium text-brand-black">
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
                          <span className="text-sm text-brand-gray font-arimo font-medium">{article.views}</span>
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
                <h3 className="text-xl font-arimo font-medium text-brand-black mb-2">Natalia Volosin</h3>
                <p className="text-brand-gray font-arimo font-medium mb-3">Mamá de 2/Bostera 💙💛🎾⚽️</p>
                <p className="text-brand-black font-arimo leading-relaxed mb-2">
                  Abogada, consultora, académica y comunicadora
                </p>
                <p className="text-brand-purple font-arimo font-bold text-sm mb-4">
                  Máster y Doctora en Derecho (Yale)
                </p>
                <Button asChild variant="secondary" className="w-full">
                  <Link href="/sobre-mi">Conoceme</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Social Media Card */}
            <Card className="mb-8 bg-brand-white commercial-shadow border-2 border-brand-gray/20 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg font-arimo">Seguime en redes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                    <Link href="https://x.com/nataliavolosin" target="_blank">
                      <Twitter className="w-4 h-4 mr-2" />
                      @nataliavolosin
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                    <Link href="https://www.instagram.com/nataliavolosin" target="_blank">
                      <Instagram className="w-4 h-4 mr-2" />
                      @nataliavolosin
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                    <Link href="https://www.tiktok.com/@nataliaavolosin" target="_blank">
                      <Music className="w-4 h-4 mr-2" />
                      @nataliaavolosin
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Popular Videos Section - YouTube Style Design with Vertical Layout */}
            <Card className="mb-8 bg-brand-white commercial-shadow border-2 border-brand-gray/20 rounded-2xl">
              <CardHeader className="p-6">
                <CardTitle className="text-xl font-arimo font-black text-brand-black tracking-wide flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-brand-purple" />
                  VIDEOS MÁS VISTOS
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="grid grid-cols-1 gap-3">
                  {[
                    {
                      id: 4,
                      title:
                        "CRISTINA: HOY FALLA LA CORTE y PUEDE IR PRESA con NOE BARRAL y NATALIA VOLOSIN | ESCUCHO OFERTAS",
                      views: "4.2K",
                      duration: "45:33",
                      thumbnail: "https://img.youtube.com/vi/KWikXTJIoC8/maxresdefault.jpg",
                      publishedAt: "hace 3 días",
                    },
                    {
                      id: 3,
                      title: 'Natalia Volosin - FORO "ARGENTINA: LA CORRUPCIÓN POLÍTICA"',
                      views: "3.1K",
                      duration: "31:28",
                      thumbnail: "https://img.youtube.com/vi/Tnctnmyon-c/maxresdefault.jpg",
                      publishedAt: "hace 1 semana",
                    },
                    {
                      id: 6,
                      title: 'Natalia Volosin, abogada, desde la marcha de jubilados: "Militarizaron la Plaza"',
                      views: "2.7K",
                      duration: "12:18",
                      thumbnail: "https://img.youtube.com/vi/dxNn_9UdN1o/maxresdefault.jpg",
                      publishedAt: "hace 2 semanas",
                    },
                    {
                      id: 1,
                      title: '"Mi calificación moral a Patricia Bullrich es de asesina" Natalia Volosin Abogada',
                      views: "2.3K",
                      duration: "18:45",
                      thumbnail: "https://img.youtube.com/vi/qXjxRHPMZqo/maxresdefault.jpg",
                      publishedAt: "hace 2 semanas",
                    },
                  ].map((video, index) => (
                    <Link key={video.id} href="/videos" className="block">
                      <div className="cursor-pointer hover:bg-brand-gray/5 p-2 rounded-lg transition-all duration-200 group">
                        {/* Thumbnail - Arriba */}
                        <div className="relative mb-2">
                          <Image
                            src={video.thumbnail || "/placeholder.svg"}
                            alt={video.title}
                            width={160}
                            height={90}
                            className="w-full aspect-video rounded-lg object-cover"
                          />
                          {/* Play button overlay */}
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                            <Play className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        {/* Title and Views - Abajo */}
                        <div className="space-y-1">
                          <h4 className="text-sm font-arimo font-bold text-brand-black line-clamp-2 group-hover:text-brand-purple transition-colors">
                            {video.title}
                          </h4>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-brand-gray font-arimo">{video.views} views</span>
                            <span className="text-xs text-brand-gray font-arimo">{video.duration}</span>
                          </div>
                          <span className="text-xs text-brand-gray font-arimo">{video.publishedAt}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Newsletter Signup - Unificado */}
            <Card className="bg-gradient-to-br from-brand-green/40 to-brand-green/60 border-2 border-brand-green commercial-shadow rounded-2xl neon-glow">
              <CardHeader className="text-center p-8">
                <div className="mb-4">
                  <h3 className="text-2xl font-garamond font-medium text-brand-black mb-2">
                    LA INVITACIÓN A{" "}
                    <span className="font-script script-enhanced text-3xl text-brand-purple">pensar</span>
                  </h3>
                  <h4 className="text-2xl font-arimo font-black text-brand-black">
                    ES <span className="bg-brand-gray text-brand-white px-3 py-1 rounded">URGENTE</span>
                  </h4>
                </div>
                <p className="text-sm font-arimo text-brand-black font-medium">Recibe análisis semanales los viernes</p>
              </CardHeader>
              <CardContent className="text-center p-8 pt-0">
                <div className="space-y-4 mb-6">
                  <p className="text-sm text-brand-black font-arimo">
                    Suscríbete al newsletter gratuito de los viernes haciendo clic en el enlace:
                  </p>
                </div>
                <Link href="https://substack.com/@nataliavolosin" target="_blank">
                  <Button className="w-full bg-brand-black hover:bg-brand-gray text-brand-white font-arimo font-bold py-4 rounded-xl text-lg mb-4 transition-all duration-300 hover:scale-105">
                    Suscribirse Gratis
                  </Button>
                </Link>
                <p className="text-sm text-brand-black font-arimo font-medium">
                  Newsletter gratuito • Análisis semanales • Sin compromisos
                </p>
              </CardContent>
            </Card>

            {/* Advertising Banner - Sidebar */}
            <Card className="mb-8 mt-6 bg-gradient-to-br from-brand-purple/5 to-brand-teal/5 border-2 border-dashed border-brand-purple/20 rounded-2xl p-8 text-center commercial-shadow">
              <p className="text-brand-purple text-lg font-arimo font-bold mb-2">Publicidad</p>
              <p className="text-brand-gray text-sm font-arimo">300x250 - Rectángulo Medio</p>
            </Card>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-brand-black text-brand-white py-16 mt-20">
        <div className="container mx-auto px-4">
          {/* Logo y tagline centrados */}
          <div className="text-center mb-12">
            <h4 className="text-3xl font-garamond font-medium mb-2">
              Natalia <span className="font-script script-enhanced text-4xl text-brand-purple">Volosin</span>
            </h4>
            <h5 className="text-2xl font-arimo font-black mb-4 tracking-wider">LA JUSTA</h5>
            <p className="text-brand-gray text-lg font-serif serif-elegant font-arimo">
              Portal de análisis independiente
            </p>
          </div>

          {/* Sección comercial rediseñada */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Servicios Profesionales */}
            <div className="bg-gradient-to-br from-brand-green/20 to-brand-teal/20 rounded-2xl p-8 border-2 border-brand-green/30 commercial-shadow hover:scale-[1.02] transition-all duration-300">
              <div className="text-center mb-6">
                <div className="bg-brand-green/30 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4">
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
                    className="text-brand-green"
                  >
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                    <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
                  </svg>
                </div>
                <h3 className="font-garamond font-arimo font-black text-brand-white mb-2 tracking-wide">
                  SERVICIOS PROFESIONALES
                </h3>
                <p className="text-brand-green font-arimo font-bold text-lg">
                  Charlas • Eventos • Consultoría • Capacitaciones
                </p>
              </div>

              <div className="space-y-4 mb-6 font-arimo">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-brand-green rounded-full"></div>
                  <span className="text-brand-white font-serif serif-elegant">Conferencias magistrales</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-brand-green rounded-full"></div>
                  <span className="text-brand-white font-serif serif-elegant">
                    Asesoramiento jurídico especializado
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-brand-green rounded-full"></div>
                  <span className="text-brand-white font-serif serif-elegant">Capacitaciones institucionales</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-brand-green rounded-full"></div>
                  <span className="text-brand-white font-serif serif-elegant">Análisis de políticas públicas</span>
                </div>
              </div>

              <div className="text-center">
                <Link
                  href="mailto:lajusta@nataliavolosin.com"
                  className="inline-flex items-center space-x-2 bg-brand-green hover:bg-brand-green/80 text-brand-black font-arimo font-bold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-10 5L2 7" />
                  </svg>
                  <span>lajusta@nataliavolosin.com</span>
                </Link>
              </div>
            </div>

            {/* Consultas Comerciales */}
            <div className="bg-gradient-to-br from-brand-purple/20 to-brand-teal/20 rounded-2xl p-8 border-2 border-brand-purple/30 commercial-shadow hover:scale-[1.02] transition-all duration-300">
              <div className="text-center mb-6">
                <div className="bg-brand-purple/30 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4">
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
                    className="text-brand-purple"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="m22 21-3-3m0 0a5.5 5.5 0 1 0-7.78-7.78 5.5 5.5 0 0 0 7.78 7.78Z" />
                  </svg>
                </div>
                <h3 className="font-garamond font-arimo font-black text-brand-white mb-2 tracking-wide">
                  CONSULTAS COMERCIALES
                </h3>
                <p className="text-brand-purple font-arimo font-bold text-lg">
                  Publicidad • Patrocinios • Colaboraciones
                </p>
              </div>

              <div className="space-y-4 mb-6 font-arimo">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-brand-purple rounded-full"></div>
                  <span className="text-brand-white font-serif serif-elegant">Espacios publicitarios premium</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-brand-purple rounded-full"></div>
                  <span className="text-brand-white font-serif serif-elegant">Patrocinios de contenido</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-brand-purple rounded-full"></div>
                  <span className="text-brand-white font-serif serif-elegant">Colaboraciones estratégicas</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-brand-purple rounded-full"></div>
                  <span className="text-brand-white font-serif serif-elegant">Branded content</span>
                </div>
              </div>

              <div className="text-center">
                <Link
                  href="mailto:comercial@nataliavolosin.com"
                  className="inline-flex items-center space-x-2 bg-brand-purple hover:bg-brand-purple/80 text-brand-white font-arimo font-bold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-10 5L2 7" />
                  </svg>
                  <span>comercial@nataliavolosin.com</span>
                </Link>
              </div>
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

          {/* Copyright */}
          <div className="text-center text-sm text-brand-gray font-arimo font-medium">
            © 2025 Natalia Volosin. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  )
}
