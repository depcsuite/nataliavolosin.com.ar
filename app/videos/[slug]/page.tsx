"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Clock,
  Search,
  Play,
  Eye,
  TrendingUp,
  Zap,
  Menu,
  Twitter,
  Instagram,
  Music,
  ExternalLink,
  Heart,
  ArrowLeft,
  Share2,
  ThumbsUp,
  MessageCircle,
} from "lucide-react"
import { TagBadge } from "@/components/ui/tag-badge"
import { Separator } from "@/components/ui/separator"

// Video data - same as in videos page
const videos = [
  {
    id: 1,
    title: '"Mi calificación moral a Patricia Bullrich es de asesina" Natalia Volosin Abogada',
    description:
      "En este análisis profundo, examino las políticas de seguridad implementadas por la ministra Patricia Bullrich y sus declaraciones controvertidas. Analizo el impacto de estas medidas en los derechos humanos y la democracia argentina, así como las implicancias legales y éticas de las acciones del gobierno en materia de seguridad pública.",
    youtubeId: "qXjxRHPMZqo",
    thumbnail: "https://img.youtube.com/vi/qXjxRHPMZqo/maxresdefault.jpg",
    duration: "18:45",
    views: "2.3K",
    date: "2025-01-15",
    tags: ["Política", "Seguridad", "Análisis", "Bullrich"],
    slug: "mi-calificacion-moral-a-patricia-bullrich-es-de-asesina-natalia-volosin-abogada",
  },
  {
    id: 2,
    title: 'Natalia Volosin: "Una cosa es lo que yo pueda pensar y otra es lo que se pueda probar en un juicio"',
    description:
      "Reflexiones profundas sobre la diferencia fundamental entre opiniones personales y evidencia judicial en casos de corrupción. Exploro cómo funciona el sistema judicial argentino, los estándares de prueba requeridos y por qué es crucial mantener la separación entre el análisis político y el proceso legal.",
    youtubeId: "iGS-OiAHuL4",
    thumbnail: "https://img.youtube.com/vi/iGS-OiAHuL4/maxresdefault.jpg",
    duration: "24:12",
    views: "1.8K",
    date: "2025-01-08",
    tags: ["Justicia", "Derecho", "Corrupción", "Análisis"],
    slug: "natalia-volosin-una-cosa-es-lo-que-yo-pueda-pensar-y-otra-es-lo-que-se-pueda-probar-en-un-juicio",
  },
  {
    id: 3,
    title: 'Natalia Volosin - FORO "ARGENTINA: LA CORRUPCIÓN POLÍTICA"',
    description:
      "Mi participación en este importante foro académico donde analizo los mecanismos de corrupción política en Argentina y propongo soluciones concretas. Discuto las reformas necesarias en el sistema judicial, la importancia de la transparencia y cómo los ciudadanos pueden participar activamente en la lucha contra la corrupción.",
    youtubeId: "Tnctnmyon-c",
    thumbnail: "https://img.youtube.com/vi/Tnctnmyon-c/maxresdefault.jpg",
    duration: "31:28",
    views: "3.1K",
    date: "2025-01-01",
    tags: ["Corrupción", "Política", "Foro", "Academia"],
    slug: "natalia-volosin-foro-argentina-la-corrupcion-politica",
  },
  {
    id: 4,
    title: "CRISTINA: HOY FALLA LA CORTE y PUEDE IR PRESA con NOE BARRAL y NATALIA VOLOSIN | ESCUCHO OFERTAS",
    description:
      "Análisis jurídico exhaustivo sobre el fallo de la Corte Suprema en el caso de Cristina Kirchner y sus implicancias legales. Junto a Noe Barral, examinamos los aspectos técnicos del fallo, las posibles consecuencias políticas y jurídicas, y qué significa esto para el futuro de la justicia argentina.",
    youtubeId: "KWikXTJIoC8",
    thumbnail: "https://img.youtube.com/vi/KWikXTJIoC8/maxresdefault.jpg",
    duration: "45:33",
    views: "4.2K",
    date: "2024-12-20",
    tags: ["Cristina Kirchner", "Corte Suprema", "Justicia", "Análisis"],
    slug: "cristina-hoy-falla-la-corte-y-puede-ir-presa-con-noe-barral-y-natalia-volosin-escucho-ofertas",
  },
  {
    id: 5,
    title: '"IDEAS PARA CONSTRUIR UNA CIUDAD PROGRESISTA" debate post elecciones de la Ciudad de Buenos Aires',
    description:
      "Debate post-electoral sobre políticas públicas progresistas para la Ciudad de Buenos Aires. Analizo las propuestas presentadas durante la campaña, evalúo su viabilidad y propongo ideas concretas para construir una ciudad más justa, inclusiva y sostenible para todos los porteños.",
    youtubeId: "KLxRtwbazvk",
    thumbnail: "https://img.youtube.com/vi/KLxRtwbazvk/maxresdefault.jpg",
    duration: "28:15",
    views: "1.9K",
    date: "2024-12-15",
    tags: ["Buenos Aires", "Elecciones", "Debate", "Políticas Públicas"],
    slug: "ideas-para-construir-una-ciudad-progresista-debate-post-elecciones-de-la-ciudad-de-buenos-aires",
  },
  {
    id: 6,
    title: 'Natalia Volosin, abogada, desde la marcha de jubilados: "Militarizaron la Plaza"',
    description:
      "Testimonio directo desde la marcha de jubilados sobre la represión policial y la militarización del espacio público. Analizo las implicancias legales de estas acciones, los derechos constitucionales vulnerados y la importancia de defender el derecho a la protesta pacífica en democracia.",
    youtubeId: "dxNn_9UdN1o",
    thumbnail: "https://img.youtube.com/vi/dxNn_9UdN1o/maxresdefault.jpg",
    duration: "12:18",
    views: "2.7K",
    date: "2024-12-10",
    tags: ["Jubilados", "Represión", "Derechos Humanos", "Protesta"],
    slug: "natalia-volosin-abogada-desde-la-marcha-de-jubilados-militarizaron-la-plaza",
  },
]

const breakingNews = [
  "🔥 Escándalo y suspensión del Juicio por la muerte de Diego Maradona",
  "⚡ Procuración General anuncia reformas en investigaciones económicas",
  "🚨 Debate sobre transparencia en contrataciones públicas gana impulso",
]

// Function to generate slug from title, handling accents
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD") // Normalize to decomposed form
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics (accents)
    .replace(/[^\w\s-]/g, "") // Remove non-word characters (now without accents)
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .trim()
}

interface VideoPageProps {
  params: { slug: string }
}

export default function VideoPage({ params }: VideoPageProps) {
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [currentVideo, setCurrentVideo] = useState<(typeof videos)[0] | null>(null)
  const [relatedVideos, setRelatedVideos] = useState<typeof videos>([])

  // Scroll listener para ocultar el top bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Find current video and related videos
  useEffect(() => {
    // Normalize the incoming slug from the URL to match the canonical (unaccented) slugs
    const normalizedParamSlug = generateSlug(params.slug)

    const video = videos.find((v) => v.slug === normalizedParamSlug)
    if (video) {
      setCurrentVideo(video)
      // Get related videos (exclude current video and limit to 4)
      const related = videos.filter((v) => v.id !== video.id).slice(0, 4)
      setRelatedVideos(related)
    }
  }, [params.slug])

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleVideoClick = (video: (typeof videos)[0]) => {
    router.push(`/videos/${video.slug}`)
  }

  if (!currentVideo) {
    return (
      <div className="min-h-screen bg-brand-light-gray font-arimo flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-garamond font-bold text-brand-black mb-4">Video no encontrado</h1>
          <Link href="/videos">
            <Button className="bg-brand-purple hover:bg-brand-purple/80 text-white">Volver a Videos</Button>
          </Link>
        </div>
      </div>
    )
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
                  <Heart className="w-5 h-5 mr-2" />
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
              className="text-brand-black hover:text-brand-purple font-arimo font-bold text-base transition-colors tracking-wide"
            >
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
              className="text-brand-purple font-arimo font-bold text-base transition-colors tracking-wide"
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
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/videos">
            <Button variant="outline" className="bg-transparent border-brand-gray/30 hover:bg-brand-purple/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver a Videos
            </Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-4 gap-12">
          {/* Main Video Content */}
          <div className="lg:col-span-3">
            {/* Video Player */}
            <div className="mb-8">
              <div className="relative aspect-video bg-black rounded-2xl overflow-hidden commercial-shadow">
                <iframe
                  src={`https://www.youtube.com/embed/${currentVideo.youtubeId}?autoplay=0&rel=0`}
                  title={currentVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Video Info */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <Badge className="bg-black/70 text-white px-3 py-1 text-sm font-arimo">
                    <Clock className="w-4 h-4 mr-1" />
                    {currentVideo.duration}
                  </Badge>
                  <div className="flex items-center space-x-2">
                    <Eye className="w-4 h-4 text-brand-gray" />
                    <span className="text-sm text-brand-gray font-arimo font-medium">
                      {currentVideo.views} visualizaciones
                    </span>
                  </div>
                  <span className="text-sm text-brand-gray font-arimo font-medium">
                    {new Date(currentVideo.date).toLocaleDateString("es-AR")}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" className="bg-transparent">
                    <ThumbsUp className="w-4 h-4 mr-2" />
                    Me gusta
                  </Button>
                  <Button variant="outline" size="sm" className="bg-transparent">
                    <Share2 className="w-4 h-4 mr-2" />
                    Compartir
                  </Button>
                </div>
              </div>

              <h1 className="text-3xl font-garamond font-bold text-brand-black mb-6 leading-tight">
                {currentVideo.title}
              </h1>

              <div className="flex flex-wrap gap-2 mb-6">
                {currentVideo.tags.map((tag, index) => (
                  <TagBadge key={tag} index={index} className="text-sm font-arimo font-medium">
                    {tag}
                  </TagBadge>
                ))}
              </div>

              <div className="prose max-w-none">
                <p className="text-brand-gray text-lg font-arimo leading-relaxed">{currentVideo.description}</p>
              </div>
            </div>

            {/* Author Info */}
            <Card className="mb-8 bg-brand-white commercial-shadow border-2 border-brand-gray/20 rounded-2xl">
              <CardContent className="p-8">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <Image
                      src="/natalia-volosin.jpg"
                      alt="Natalia Volosin"
                      width={80}
                      height={80}
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-garamond font-bold text-brand-black mb-2">Natalia Volosin</h3>
                    <p className="text-brand-gray font-arimo mb-4">
                      Abogada especializada en derecho penal y análisis político. Autora de "La Máquina de Corrupción" y
                      columnista en diversos medios nacionales.
                    </p>
                    <div className="flex items-center space-x-4">
                      <Link href="/sobre-mi">
                        <Button variant="outline" size="sm" className="bg-transparent">
                          Ver perfil completo
                        </Button>
                      </Link>
                      <Link href="/suscripcion">
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-brand-green to-brand-teal text-brand-black font-bold"
                        >
                          <Heart className="w-4 h-4 mr-2" />
                          Apoyar
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Comments Section Placeholder */}
            <Card className="mb-8 bg-brand-white commercial-shadow border-2 border-brand-gray/20 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-arimo font-bold text-brand-black flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Comentarios
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-brand-gray font-arimo mb-4">
                    Los comentarios están disponibles en el video de YouTube
                  </p>
                  <Button variant="outline" asChild>
                    <Link href={`https://www.youtube.com/watch?v=${currentVideo.youtubeId}`} target="_blank">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Ver en YouTube
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Related Videos */}
            <section>
              <h2 className="text-2xl font-arimo font-black text-brand-black mb-8 tracking-wide">
                VIDEOS RELACIONADOS
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {relatedVideos.map((video) => (
                  <Card
                    key={video.id}
                    className="bg-brand-white commercial-shadow border-2 border-brand-gray/20 rounded-2xl cursor-pointer hover:scale-[1.02] transition-transform duration-300 group"
                    onClick={() => handleVideoClick(video)}
                  >
                    <CardHeader className="p-0">
                      <div className="relative">
                        <Image
                          src={video.thumbnail || "/placeholder.svg"}
                          alt={video.title}
                          width={640}
                          height={360}
                          className="w-full h-48 object-cover rounded-t-2xl"
                        />
                        {/* Play button overlay */}
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/40 transition-all duration-300">
                          <div className="bg-white/90 hover:bg-white rounded-full p-3 transform group-hover:scale-110 transition-all duration-300 shadow-lg">
                            <Play className="w-6 h-6 text-brand-black ml-1" fill="currentColor" />
                          </div>
                        </div>
                        {/* Duration badge */}
                        <div className="absolute bottom-3 right-3">
                          <Badge className="bg-black/70 text-white px-2 py-1 text-xs font-arimo">
                            <Clock className="w-3 h-3 mr-1" />
                            {video.duration}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <Eye className="w-3 h-3 text-brand-gray" />
                          <span className="text-xs text-brand-gray font-arimo font-medium">
                            {video.views} visualizaciones
                          </span>
                        </div>
                        <span className="text-xs text-brand-gray font-arimo font-medium">
                          {new Date(video.date).toLocaleDateString("es-AR")}
                        </span>
                      </div>
                      <CardTitle className="text-lg font-garamond font-medium text-brand-black mb-2 line-clamp-2 group-hover:text-brand-purple transition-colors">
                        {video.title}
                      </CardTitle>
                      <div className="flex flex-wrap gap-1">
                        {video.tags.slice(0, 2).map((tag, tagIndex) => (
                          <TagBadge key={tag} index={tagIndex} className="text-xs font-arimo font-medium">
                            {tag}
                          </TagBadge>
                        ))}
                        {video.tags.length > 2 && (
                          <Badge className="bg-brand-gray/20 text-brand-gray text-xs font-arimo font-medium">
                            +{video.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            {/* Sidebar Ad Space */}
            <div className="mb-8 bg-gradient-to-r from-brand-gray/10 to-brand-light-gray border-2 border-dashed border-brand-gray/30 rounded-2xl p-8 text-center commercial-shadow">
              <p className="text-brand-gray text-sm font-arimo font-bold mb-2">Publicidad</p>
              <p className="text-brand-gray text-xs font-arimo">300x250</p>
            </div>

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

            {/* Newsletter Signup */}
            <Card className="bg-gradient-to-br from-brand-green/40 to-brand-green/60 border-2 border-brand-green commercial-shadow rounded-2xl neon-glow">
              <CardHeader className="text-center p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-garamond font-medium text-brand-black mb-2">
                    LA INVITACIÓN A{" "}
                    <span className="font-script script-enhanced text-2xl text-brand-purple">pensar</span>
                  </h3>
                  <h4 className="text-xl font-arimo font-black text-brand-black">
                    ES <span className="bg-brand-gray text-brand-white px-2 py-1 rounded">URGENTE</span>
                  </h4>
                </div>
                <p className="text-sm font-arimo text-brand-black font-medium">Recibe análisis semanales los viernes</p>
              </CardHeader>
              <CardContent className="text-center p-6 pt-0">
                <Link href="https://substack.com/@nataliavolosin" target="_blank">
                  <Button className="w-full bg-brand-black hover:bg-brand-gray text-brand-white font-arimo font-bold py-3 rounded-xl text-base mb-4 transition-all duration-300 hover:scale-105">
                    Suscribirse Gratis
                  </Button>
                </Link>
                <p className="text-sm text-brand-black font-arimo font-medium">
                  Newsletter gratuito • Análisis semanales • Sin compromisos
                </p>
              </CardContent>
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
                    <path d="M16 4h2a2 4 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
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
