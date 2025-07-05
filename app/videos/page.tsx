"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Clock,
  Search,
  Play,
  Eye,
  TrendingUp,
  Zap,
  Menu,
  Tag,
  Twitter,
  Instagram,
  Music,
  ExternalLink,
  Heart,
  Mail,
} from "lucide-react"
import { TagBadge } from "@/components/ui/tag-badge"
import { Separator } from "@/components/ui/separator"

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

// Most viewed videos data
const mostViewedVideos = [
  {
    id: 4,
    title: "CRISTINA: HOY FALLA LA CORTE y PUEDE IR PRESA con NOE BARRAL y NATALIA VOLOSIN | ESCUCHO OFERTAS",
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
]

// Updated tags based on user request
const allTags = ["Justicia", "Política", "Corrupción", "Reformas", "Transparencia", "Análisis", "Sociedad"]

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

export default function VideosPage() {
  const router = useRouter()
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [isScrolled, setIsScrolled] = useState(false)

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

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const clearFilters = () => {
    setSelectedTags([])
  }

  const hasActiveFilters = selectedTags.length > 0

  const filteredVideos = videos.filter((video) => {
    // A video matches if it has at least one of the selected tags, or if no tags are selected.
    return selectedTags.length === 0 || selectedTags.some((tag) => video.tags.includes(tag))
  })

  const handleVideoClick = (video: (typeof videos)[0]) => {
    const slug = generateSlug(video.title)
    router.push(`/videos/${slug}`)
  }

  // Updated tag colors to match newsletter page
  const tagColors = [
    { bg: "bg-red-100", text: "text-red-700" },
    { bg: "bg-green-100", text: "text-green-700" },
    { bg: "bg-blue-100", text: "text-blue-700" },
    { bg: "bg-yellow-100", text: "text-yellow-700" },
    { bg: "bg-purple-100", text: "text-purple-700" },
  ]

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
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {/* Tags Navigation - Styled like newsletter */}
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-4">
                <Tag className="w-5 h-5 text-brand-gray" />
                <h3 className="text-lg font-arimo font-bold text-brand-black">Filtrar por tema:</h3>
              </div>
              <div className="flex items-center space-x-1 overflow-x-auto pb-2">
                {allTags.map((tag, index) => (
                  <Button
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleTag(tag)}
                    className={`text-xs rounded-full font-arimo font-medium transition-all duration-200 ${
                      selectedTags.includes(tag)
                        ? tagColors[index % tagColors.length].bg + " " + tagColors[index % tagColors.length].text
                        : "border-brand-gray/30 hover:bg-brand-purple/20 hover:border-brand-purple/50"
                    }`}
                  >
                    {tag}
                  </Button>
                ))}
              </div>
              {hasActiveFilters && (
                <div className="mt-4">
                  <Button variant="outline" onClick={clearFilters} className="w-full bg-transparent">
                    Limpiar filtros
                  </Button>
                </div>
              )}
            </div>

            {/* Results Summary */}
            <div className="mb-8">
              <p className="text-brand-gray font-arimo font-medium">
                {filteredVideos.length === videos.length
                  ? `Mostrando todos los ${videos.length} videos`
                  : `Mostrando ${filteredVideos.length} de ${videos.length} videos`}
              </p>
            </div>

            {/* Videos Grid */}
            <section className="mb-16">
              {filteredVideos.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-8">
                  {filteredVideos.map((video, index) => (
                    <>
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
                              className="w-full h-64 object-cover rounded-t-2xl"
                            />
                            {/* Play button overlay */}
                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/40 transition-all duration-300">
                              <div className="bg-white/90 hover:bg-white rounded-full p-4 transform group-hover:scale-110 transition-all duration-300 shadow-lg">
                                <Play className="w-8 h-8 text-brand-black ml-1" fill="currentColor" />
                              </div>
                            </div>
                            {/* Duration badge */}
                            <div className="absolute bottom-4 right-4">
                              <Badge className="bg-black/70 text-white px-2 py-1 text-xs font-arimo">
                                <Clock className="w-3 h-3 mr-1" />
                                {video.duration}
                              </Badge>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-2">
                              <Eye className="w-4 h-4 text-brand-gray" />
                              <span className="text-sm text-brand-gray font-arimo font-medium">
                                {video.views} visualizaciones
                              </span>
                            </div>
                            <span className="text-sm text-brand-gray font-arimo font-medium">
                              {new Date(video.date).toLocaleDateString("es-AR")}
                            </span>
                          </div>
                          <CardTitle className="text-xl font-garamond font-medium text-brand-black mb-3 line-clamp-2 group-hover:text-brand-purple transition-colors">
                            {video.title}
                          </CardTitle>
                          <CardDescription className="text-brand-gray text-base font-arimo leading-relaxed mb-4 line-clamp-3">
                            {video.description}
                          </CardDescription>
                          <div className="flex flex-wrap gap-2">
                            {video.tags.slice(0, 3).map((tag, tagIndex) => (
                              <TagBadge key={tag} index={tagIndex} className="text-xs font-arimo font-medium">
                                {tag}
                              </TagBadge>
                            ))}
                            {video.tags.length > 3 && (
                              <Badge className="bg-brand-gray/20 text-brand-gray text-xs font-arimo font-medium">
                                +{video.tags.length - 3}
                              </Badge>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                      {(index + 1) % 4 === 0 && (
                        <div className="col-span-full mb-8">
                          <div className="bg-gradient-to-br from-brand-purple/5 to-brand-teal/5 border-2 border-dashed border-brand-purple/20 rounded-lg p-8 text-center commercial-shadow">
                            <p className="text-brand-purple text-lg font-arimo font-bold mb-2">Publicidad</p>
                            <p className="text-brand-gray text-sm font-arimo">Banner Intermedio</p>
                          </div>
                        </div>
                      )}
                    </>
                  ))}
                </div>
              ) : (
                <Card className="bg-brand-white commercial-shadow border-2 border-brand-gray/20 rounded-2xl">
                  <CardContent className="p-12 text-center">
                    <div className="w-16 h-16 bg-brand-gray/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Search className="w-8 h-8 text-brand-gray" />
                    </div>
                    <h3 className="text-lg font-garamond font-bold text-brand-black mb-2">No se encontraron videos</h3>
                    <p className="text-brand-gray font-arimo mb-4">
                      Intenta ajustar los filtros o buscar con otros términos
                    </p>
                    <Button variant="outline" onClick={clearFilters}>
                      Limpiar filtros
                    </Button>
                  </CardContent>
                </Card>
              )}
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

            {/* Advertising Banner - Bottom Content */}
            <section className="mb-16">
              <div className="bg-gradient-to-r from-brand-green/10 to-brand-teal/10 border-2 border-dashed border-brand-green/30 rounded-2xl p-8 text-center commercial-shadow">
                <p className="text-brand-green text-lg font-arimo font-bold mb-2">Espacio Comercial</p>
                <p className="text-brand-gray text-xs font-arimo">728x90 - Banner Inferior</p>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
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
                  {mostViewedVideos.map((video, index) => (
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

            {/* Sidebar Ad Space (Moved from main content) */}
            <div className="mb-8 bg-gradient-to-r from-brand-gray/10 to-brand-light-gray border-2 border-dashed border-brand-gray/30 rounded-2xl p-8 text-center commercial-shadow">
              <p className="text-brand-gray text-sm font-arimo font-bold mb-2">Espacio Publicitario</p>
              <p className="text-brand-gray text-xs font-arimo">300x250 - Banner Lateral</p>
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
