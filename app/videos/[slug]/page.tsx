"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Calendar,
  Eye,
  TrendingUp,
  Zap,
  Star,
  Menu,
  ArrowLeft,
  Play,
  Twitter,
  Instagram,
  Music,
  ExternalLink,
  Share2,
  ThumbsUp,
  MessageCircle,
} from "lucide-react"
import { TagBadge } from "@/components/ui/tag-badge"

const videos = [
  {
    id: 1,
    title: '"Mi calificación moral a Patricia Bullrich es de asesina" Natalia Volosin Abogada',
    description:
      "Análisis crítico sobre las políticas de seguridad y las declaraciones controvertidas de la ministra Patricia Bullrich.",
    youtubeId: "qXjxRHPMZqo",
    thumbnail: "https://img.youtube.com/vi/qXjxRHPMZqo/maxresdefault.jpg",
    duration: "18:45",
    views: "2.3K",
    date: "2025-01-15",
    tags: ["Política", "Seguridad", "Análisis", "Bullrich"],
  },
  {
    id: 2,
    title: 'Natalia Volosin: "Una cosa es lo que yo pueda pensar y otra es lo que se pueda probar en un juicio"',
    description:
      "Reflexiones sobre la diferencia entre opiniones personales y evidencia judicial en casos de corrupción.",
    youtubeId: "iGS-OiAHuL4",
    thumbnail: "https://img.youtube.com/vi/iGS-OiAHuL4/maxresdefault.jpg",
    duration: "24:12",
    views: "1.8K",
    date: "2025-01-08",
    tags: ["Justicia", "Derecho", "Corrupción", "Análisis"],
  },
  {
    id: 3,
    title: 'Natalia Volosin - FORO "ARGENTINA: LA CORRUPCIÓN POLÍTICA"',
    description:
      "Participación en foro académico sobre los mecanismos de corrupción política en Argentina y sus posibles soluciones.",
    youtubeId: "Tnctnmyon-c",
    thumbnail: "https://img.youtube.com/vi/Tnctnmyon-c/maxresdefault.jpg",
    duration: "31:28",
    views: "3.1K",
    date: "2025-01-01",
    tags: ["Corrupción", "Política", "Foro", "Academia"],
  },
  {
    id: 4,
    title: "CRISTINA: HOY FALLA LA CORTE y PUEDE IR PRESA con NOE BARRAL y NATALIA VOLOSIN | ESCUCHO OFERTAS",
    description:
      "Análisis jurídico sobre el fallo de la Corte Suprema en el caso de Cristina Kirchner y sus implicancias legales.",
    youtubeId: "KWikXTJIoC8",
    thumbnail: "https://img.youtube.com/vi/KWikXTJIoC8/maxresdefault.jpg",
    duration: "45:33",
    views: "4.2K",
    date: "2024-12-20",
    tags: ["Cristina Kirchner", "Corte Suprema", "Justicia", "Análisis"],
  },
  {
    id: 5,
    title: '"IDEAS PARA CONSTRUIR UNA CIUDAD PROGRESISTA" debate post elecciones de la Ciudad de Buenos Aires',
    description:
      "Debate sobre políticas públicas progresistas para la Ciudad de Buenos Aires tras las elecciones locales.",
    youtubeId: "KLxRtwbazvk",
    thumbnail: "https://img.youtube.com/vi/KLxRtwbazvk/maxresdefault.jpg",
    duration: "28:15",
    views: "1.9K",
    date: "2024-12-15",
    tags: ["Buenos Aires", "Elecciones", "Debate", "Políticas Públicas"],
  },
  {
    id: 6,
    title: 'Natalia Volosin, abogada, desde la marcha de jubilados: "Militarizaron la Plaza"',
    description:
      "Testimonio desde la marcha de jubilados sobre la represión policial y la militarización del espacio público.",
    youtubeId: "dxNn_9UdN1o",
    thumbnail: "https://img.youtube.com/vi/dxNn_9UdN1o/maxresdefault.jpg",
    duration: "12:18",
    views: "2.7K",
    date: "2024-12-10",
    tags: ["Jubilados", "Represión", "Derechos Humanos", "Protesta"],
  },
]

const breakingNews = [
  "🔥 Escándalo y suspensión del Juicio por la muerte de Diego Maradona",
  "⚡ Procuración General anuncia reformas en investigaciones económicas",
  "🚨 Debate sobre transparencia en contrataciones públicas gana impulso",
]

// Function to generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters except spaces and hyphens
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .trim()
}

export default function VideoPage() {
  const params = useParams()
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [currentVideo, setCurrentVideo] = useState<(typeof videos)[0] | null>(null)

  // Find video by slug
  useEffect(() => {
    const slug = params.slug as string
    const video = videos.find((v) => generateSlug(v.title) === slug)
    setCurrentVideo(video || null)
  }, [params.slug])

  // Scroll listener para ocultar el top bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (!currentVideo) {
    return (
      <div className="min-h-screen bg-brand-light-gray font-serif flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-sans sans-modern font-black text-brand-black mb-4">Video no encontrado</h1>
          <p className="text-brand-gray font-arimo mb-6">El video que buscas no existe o ha sido movido.</p>
          <Button
            onClick={() => router.push("/videos")}
            className="bg-brand-purple hover:bg-brand-purple/80 text-brand-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a Videos
          </Button>
        </div>
      </div>
    )
  }

  // Get related videos (exclude current video)
  const relatedVideos = videos.filter((v) => v.id !== currentVideo.id).slice(0, 4)

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
              <Button
                className={`bg-gradient-to-r from-brand-green to-brand-teal hover:from-brand-green/80 hover:to-brand-teal/80 text-brand-black font-sans sans-modern font-bold rounded-xl neon-glow transition-all duration-300 ${
                  isScrolled ? "px-4 py-2 text-sm" : "px-6 py-3"
                }`}
                size="lg"
                asChild
              >
                <Link href="/suscripcion">
                  <Star className="w-5 h-5 mr-2" />
                  {isScrolled ? "Bancar a La Justa" : "Quiero bancar a La Justa"}
                </Link>
              </Button>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Navigation - Altura reducida */}
          <nav className="hidden md:flex items-center space-x-8 mt-4 pt-3 border-t border-brand-gray/20">
            <Link
              href="/"
              className="text-brand-black hover:text-brand-purple font-sans sans-modern font-bold text-base transition-colors tracking-wide"
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
              className="text-brand-purple font-sans sans-modern font-bold text-base transition-colors tracking-wide"
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

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Video Content */}
          <div className="lg:col-span-3">
            {/* Back Button */}
            <Button variant="ghost" onClick={() => router.push("/videos")} className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver a videos
            </Button>

            <div className="bg-brand-white rounded-2xl commercial-shadow overflow-hidden">
              {/* Video Player */}
              <div className="relative aspect-video bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${currentVideo.youtubeId}?si=qYIAJw15T9O7ss9e`}
                  title={currentVideo.title}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>

              {/* Video Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    {currentVideo.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} className="bg-brand-purple text-brand-white text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-brand-gray">
                    <span className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {currentVideo.views} visualizaciones
                    </span>
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(currentVideo.date).toLocaleDateString("es-AR")}
                    </span>
                  </div>
                </div>

                <h1 className="text-2xl md:text-3xl font-serif serif-elegant font-medium text-brand-black mb-4">
                  {currentVideo.title}
                </h1>

                <p className="text-brand-gray mb-6 font-arimo">{currentVideo.description}</p>

                {/* Action Buttons */}
                <div className="flex items-center space-x-4 mb-6">
                  <Button variant="outline" size="sm" className="flex items-center space-x-2 bg-transparent">
                    <ThumbsUp className="w-4 h-4" />
                    <span>Me gusta</span>
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center space-x-2 bg-transparent">
                    <Share2 className="w-4 h-4" />
                    <span>Compartir</span>
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center space-x-2 bg-transparent">
                    <MessageCircle className="w-4 h-4" />
                    <span>Comentar</span>
                  </Button>
                </div>

                <Separator className="my-6" />

                <div className="flex items-center space-x-4">
                  <Image
                    src="https://s3.us-east-1.amazonaws.com/nataliavolosin.com.ar/natalia-volosin.jpg"
                    alt="Natalia Volosin"
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="font-sans sans-modern font-bold">Natalia Volosin</h3>
                    <p className="text-sm text-brand-gray font-arimo">
                      Doctora en Derecho (Yale) • Especialista en Derecho Público
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Videos */}
            {relatedVideos.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-sans sans-modern font-black text-brand-black mb-6">Videos relacionados</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {relatedVideos.map((video) => (
                    <Card
                      key={video.id}
                      className="overflow-hidden hover:scale-[1.02] transition-all duration-300 cursor-pointer commercial-shadow rounded-2xl"
                      onClick={() => {
                        const slug = generateSlug(video.title)
                        router.push(`/videos/${slug}`)
                      }}
                    >
                      <div className="relative">
                        <Image
                          src={video.thumbnail || "/placeholder.svg"}
                          alt={video.title}
                          width={350}
                          height={200}
                          className="w-full h-32 object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <Play className="w-8 h-8 text-white" />
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
                          {video.duration}
                        </div>
                        <div className="absolute top-2 left-2">
                          <TagBadge index={0} className="text-xs">
                            {video.tags[0]}
                          </TagBadge>
                        </div>
                      </div>
                      <CardHeader className="p-3">
                        <CardTitle className="text-sm hover:text-brand-purple transition-colors line-clamp-2 font-serif serif-elegant">
                          {video.title}
                        </CardTitle>
                        <div className="flex items-center justify-between text-xs text-brand-gray">
                          <span className="flex items-center">
                            <Eye className="w-3 h-3 mr-1" />
                            {video.views}
                          </span>
                          <span>{new Date(video.date).toLocaleDateString("es-AR")}</span>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Channel Info */}
            <Card className="commercial-shadow rounded-2xl">
              <CardHeader className="text-center">
                <Image
                  src="https://s3.us-east-1.amazonaws.com/nataliavolosin.com.ar/natalia-volosin.jpg"
                  alt="Natalia Volosin"
                  width={80}
                  height={80}
                  className="rounded-full mx-auto border-2 border-brand-gray/20"
                />
                <CardTitle className="text-lg font-serif serif-elegant">Canal de Natalia Volosin</CardTitle>
                <CardDescription className="text-sm font-arimo">
                  Análisis jurídicos y políticos en video
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-sans sans-modern font-bold text-lg">6</div>
                      <div className="text-brand-gray font-arimo">Videos</div>
                    </div>
                    <div>
                      <div className="font-sans sans-modern font-bold text-lg">16.1K</div>
                      <div className="text-brand-gray font-arimo">Visualizaciones</div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent" asChild>
                    <Link href="https://youtube.com/@nataliavolosin" target="_blank">
                      Ver en YouTube
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Sidebar Ad Space 1 */}
            <div className="bg-gradient-to-br from-brand-teal/10 to-brand-green/10 border-2 border-dashed border-brand-teal/30 rounded-2xl p-6 text-center commercial-shadow">
              <p className="text-brand-teal text-sm font-sans sans-modern font-bold mb-2">Publicidad</p>
              <p className="text-brand-gray text-xs font-arimo">300x250</p>
            </div>

            {/* Newsletter Signup */}
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

            {/* Social Media */}
            <Card className="commercial-shadow rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg font-serif serif-elegant">Seguime en redes</CardTitle>
              </CardHeader>
              <CardContent>
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
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-brand-black text-brand-white py-16 mt-20">
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
    </div>
  )
}
