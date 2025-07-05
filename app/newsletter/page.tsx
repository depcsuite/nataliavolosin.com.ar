"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TagBadge } from "@/components/ui/tag-badge"
import { Separator } from "@/components/ui/separator"
import {
  Eye,
  TrendingUp,
  Menu,
  MessageCircle,
  Share2,
  Bookmark,
  AlertCircle,
  Tag,
  Zap,
  ChevronRight,
  Flame,
  Heart,
  Mail,
  Twitter,
  Instagram,
  Music,
  ExternalLink,
  Play,
} from "lucide-react"

// Datos de ejemplo para newsletters con más contenido tipo portal de noticias
const newsletters = [
  {
    id: 1,
    slug: "exclusivo-peligra-decomiso-cristina-kirchner",
    title: "EXCLUSIVO: Peligra el decomiso de $5.000 millones contra Cristina Kirchner",
    subtitle: "Error procesal podría anular la medida judicial más importante contra la expresidenta",
    excerpt:
      "La Cámara Federal de Casación Penal evalúa un recurso que podría cambiar el rumbo de uno de los casos más emblemáticos. Fuentes judiciales confirman irregularidades en las notificaciones.",
    content: `...`,
    date: "2025-01-16",
    time: "14:30",
    readTime: "8 min",
    tags: ["Justicia", "Política", "Corrupción"],
    views: "12.3K",
    comments: 89,
    featured: true,
    urgent: true,
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 2,
    slug: "procuracion-general-reformas-investigaciones-economicas",
    title: "Procuración General anuncia reformas estructurales en investigaciones económicas",
    subtitle: "Nuevas directivas buscan acelerar los tiempos procesales en casos de corrupción",
    excerpt:
      "El Procurador General presentó un plan integral que incluye equipos especializados y nuevas tecnologías de investigación para delitos complejos.",
    date: "2025-01-15",
    time: "11:45",
    readTime: "6 min",
    tags: ["Justicia", "Reformas"],
    views: "8.7K",
    comments: 45,
    featured: false,
    urgent: false,
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 3,
    slug: "congreso-debate-transparencia-contrataciones-publicas",
    title: "Congreso debate nuevas medidas de transparencia en contrataciones públicas",
    subtitle: "Proyecto incluye publicación en tiempo real y sistema de alertas ciudadanas",
    excerpt:
      "La Comisión de Asuntos Constitucionales del Senado analiza modificaciones sustanciales al régimen de contrataciones del Estado.",
    date: "2025-01-14",
    time: "16:20",
    readTime: "5 min",
    tags: ["Transparencia", "Política"],
    views: "6.2K",
    comments: 32,
    featured: false,
    urgent: false,
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 4,
    slug: "crisis-institucional-reformas-estructurales",
    title: "Crisis institucional abre ventana de oportunidad para reformas estructurales",
    subtitle: "Análisis: Cómo la coyuntura actual puede catalizar cambios profundos",
    excerpt:
      "La convergencia de múltiples crisis genera un escenario único para implementar reformas que durante décadas fueron postergadas.",
    date: "2025-01-13",
    time: "09:15",
    readTime: "7 min",
    tags: ["Política", "Análisis"],
    views: "9.1K",
    comments: 67,
    featured: false,
    urgent: false,
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 5,
    slug: "sociedad-civil-mecanismos-control-ciudadano",
    title: "Sociedad civil impulsa nuevos mecanismos de control ciudadano",
    subtitle: "ONGs presentan propuesta para fortalecer la transparencia gubernamental",
    excerpt:
      "Organizaciones de la sociedad civil logran avances significativos en materia de acceso a la información pública.",
    date: "2025-01-12",
    time: "13:40",
    readTime: "4 min",
    tags: ["Sociedad", "Transparencia"],
    views: "4.8K",
    comments: 28,
    featured: false,
    urgent: false,
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 6,
    slug: "criminalidad-economica-herramientas-innovadoras",
    title: "Nuevos desafíos en criminalidad económica requieren herramientas innovadoras",
    subtitle: "La digitalización transforma los métodos de investigación judicial",
    excerpt:
      "Los delitos económicos evolucionan constantemente, presentando nuevos retos para el sistema de justicia argentino.",
    date: "2025-01-11",
    time: "10:25",
    readTime: "6 min",
    tags: ["Justicia", "Análisis"],
    views: "7.3K",
    comments: 41,
    featured: false,
    urgent: false,
    image: "/placeholder.svg?height=300&width=400",
  },
]

const breakingNews = [
  "🔥 Escándalo y suspensión del Juicio por la muerte de Diego Maradona",
  "⚡ Procuración General anuncia reformas en investigaciones económicas",
  "🚨 Debate sobre transparencia en contrataciones públicas gana impulso",
]

// Todos los tags disponibles
const allTags = ["Justicia", "Política", "Corrupción", "Reformas", "Transparencia", "Análisis", "Sociedad"]

// Noticias trending para sidebar (adaptado para el nuevo diseño)
const trendingNews = [
  {
    id: 101,
    title: "Fiscal pide prisión preventiva para ex funcionario",
    tags: ["Justicia"],
    time: "Hace 2 horas",
    views: "3.2K",
    readTime: "3 min",
    thumbnail: "/news-article-thumbnail.png",
  },
  {
    id: 102,
    title: "Diputados aprueban proyecto de transparencia",
    tags: ["Política"],
    time: "Hace 4 horas",
    views: "2.8K",
    readTime: "5 min",
    thumbnail: "/news-article-thumbnail.png",
  },
  {
    id: 103,
    title: "Nuevo escándalo en contrataciones públicas",
    tags: ["Corrupción"],
    time: "Hace 6 horas",
    views: "4.1K",
    readTime: "7 min",
    thumbnail: "/news-article-thumbnail.png",
  },
  {
    id: 104,
    title: "Reforma judicial: qué dice el proyecto",
    tags: ["Análisis"],
    time: "Hace 8 horas",
    views: "1.9K",
    readTime: "4 min",
    thumbnail: "/news-article-thumbnail.png",
  },
]

export default function NewsletterPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedMainTag, setSelectedMainTag] = useState("Todos")
  const [selectedYear, setSelectedYear] = useState("all-years")
  const [selectedMonth, setSelectedMonth] = useState("all-months")
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

  const currentYear = new Date().getFullYear()
  const years = [currentYear, currentYear - 1, currentYear - 2]
  const months = [
    { value: "01", label: "Enero" },
    { value: "02", label: "Febrero" },
    { value: "03", label: "Marzo" },
    { value: "04", label: "Abril" },
    { value: "05", label: "Mayo" },
    { value: "06", label: "Junio" },
    { value: "07", label: "Julio" },
    { value: "08", label: "Agosto" },
    { value: "09", label: "Septiembre" },
    { value: "10", label: "Octubre" },
    { value: "11", label: "Noviembre" },
    { value: "12", label: "Diciembre" },
  ]

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const handleMainTagClick = (tag: string) => {
    setSelectedMainTag(tag)
    if (tag === "Todos") {
      setSelectedTags([])
    } else {
      setSelectedTags([tag])
    }
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedTags([])
    setSelectedMainTag("Todos")
    setSelectedYear("all-years")
    setSelectedMonth("all-months")
  }

  const hasActiveFilters =
    searchQuery ||
    selectedTags.length > 0 ||
    selectedMainTag !== "Todos" ||
    selectedYear !== "all-years" ||
    selectedMonth !== "all-months"

  const filteredNewsletters = newsletters.filter((newsletter) => {
    const matchesSearch =
      newsletter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      newsletter.excerpt.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => newsletter.tags.includes(tag))

    const newsletterDate = new Date(newsletter.date)
    const matchesYear = selectedYear === "all-years" || newsletterDate.getFullYear().toString() === selectedYear
    const matchesMonth =
      selectedMonth === "all-months" || (newsletterDate.getMonth() + 1).toString().padStart(2, "0") === selectedMonth

    return matchesSearch && matchesTags && matchesYear && matchesMonth
  })

  const featuredNewsletter = newsletters.find((n) => n.featured)
  const regularNewsletters = filteredNewsletters.filter((n) => !n.featured)

  const handleNewsletterClick = (slug: string) => {
    router.push(`/newsletter/${slug}`)
  }

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
            <div className="flex items-center justify-between text-sm font-arimo font-bold">
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
        <div className={`container mx-auto px-4 transition-all duration-300 ${isScrolled ? "py-3" : "py-4"}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-4">
                <Link href="/">
                  <h1
                    className={`font-garamond font-medium text-brand-black transition-all duration-300 ${
                      isScrolled ? "text-2xl" : "text-3xl"
                    }`}
                  >
                    Natalia{" "}
                    <span
                      className={`font-script script-enhanced text-brand-purple transition-all duration-300 ${
                        isScrolled ? "text-3xl" : "text-4xl"
                      }`}
                    >
                      Volosin
                    </span>
                  </h1>
                </Link>
                <span
                  className={`font-arimo font-black text-brand-black transition-all duration-300 ${
                    isScrolled ? "text-lg" : "text-xl"
                  }`}
                >
                  →
                </span>
                <h2
                  className={`font-arimo font-black text-brand-black tracking-wider transition-all duration-300 ${
                    isScrolled ? "text-xl" : "text-2xl"
                  }`}
                >
                  LA JUSTA
                </h2>
              </div>
              {!isScrolled && (
                <div className="hidden lg:block text-sm text-brand-gray font-arimo font-medium">
                  Portal de análisis independiente
                </div>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/suscripcion">
                <Button
                  className={`bg-gradient-to-r from-brand-green to-brand-teal hover:from-brand-green/80 hover:to-brand-teal/80 text-brand-black font-arimo font-bold rounded-xl neon-glow transition-all duration-300 ${
                    isScrolled ? "px-4 py-2 text-sm" : "px-6 py-3"
                  }`}
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
              className="text-brand-purple font-arimo font-bold text-base transition-colors tracking-wide"
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
      <main className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {/* Tags Navigation */}
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
            </div>

            {/* Advertising Banner - After Tags */}
            <section className="mb-8">
              <div className="bg-gradient-to-r from-brand-gray/10 to-brand-light-gray border-2 border-dashed border-brand-gray/30 rounded-lg p-6 text-center commercial-shadow">
                <p className="text-brand-gray text-sm font-arimo font-bold mb-2">Espacio Publicitario</p>
                <p className="text-brand-gray text-xs font-arimo">728x90 - Banner Superior</p>
              </div>
            </section>

            {/* Featured Newsletter - Hero Style */}
            {featuredNewsletter && (
              <section className="mb-8">
                <Card
                  className="overflow-hidden commercial-shadow border-2 border-red-200 rounded-lg cursor-pointer hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-red-50 to-orange-50"
                  onClick={() => handleNewsletterClick(featuredNewsletter.slug)}
                >
                  <div className="relative">
                    {featuredNewsletter.urgent && (
                      <div className="absolute top-4 left-4 z-10">
                        <Badge className="bg-red-600 text-white px-3 py-1 text-xs font-arimo font-bold animate-pulse">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          URGENTE
                        </Badge>
                      </div>
                    )}
                    <div className="md:flex">
                      <div className="md:w-1/2">
                        <Image
                          src={featuredNewsletter.image || "/placeholder.svg"}
                          alt={featuredNewsletter.title}
                          width={600}
                          height={400}
                          className="w-full h-64 md:h-80 object-cover"
                        />
                      </div>
                      <div className="md:w-1/2 p-6 md:p-8">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            {featuredNewsletter.tags.slice(0, 3).map((tag, tagIndex) => (
                              <TagBadge key={tag} index={tagIndex} className="text-xs">
                                {tag}
                              </TagBadge>
                            ))}
                          </div>
                          <div className="flex items-center space-x-4 text-xs text-brand-gray font-arimo">
                            <span>{featuredNewsletter.time}</span>
                            <span className="flex items-center">
                              <Eye className="w-3 h-3 mr-1" />
                              {featuredNewsletter.views}
                            </span>
                          </div>
                        </div>

                        <h2 className="text-2xl md:text-3xl font-garamond font-bold text-brand-black mb-3 leading-tight hover:text-brand-purple transition-colors">
                          {featuredNewsletter.title}
                        </h2>

                        <h3 className="text-lg font-garamond font-medium text-brand-gray mb-4 leading-relaxed">
                          {featuredNewsletter.subtitle}
                        </h3>

                        <p className="text-brand-gray font-arimo leading-relaxed mb-4">{featuredNewsletter.excerpt}</p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-brand-gray font-arimo">
                            <span>{new Date(featuredNewsletter.date).toLocaleDateString("es-AR")}</span>
                            <span>{featuredNewsletter.readTime}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Button variant="ghost" size="sm" className="text-brand-gray hover:text-brand-purple">
                              <MessageCircle className="w-4 h-4 mr-1" />
                              {featuredNewsletter.comments}
                            </Button>
                            <Button variant="ghost" size="sm" className="text-brand-gray hover:text-brand-teal">
                              <Share2 className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-brand-gray hover:text-brand-green">
                              <Bookmark className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </section>
            )}

            {/* Advertising Banner - Mid Content */}
            <section className="mb-8">
              <div className="bg-gradient-to-br from-brand-purple/5 to-brand-teal/5 border-2 border-dashed border-brand-purple/20 rounded-lg p-8 text-center commercial-shadow">
                <p className="text-brand-purple text-lg font-arimo font-bold mb-2">Publicidad</p>
                <p className="text-brand-gray text-sm font-arimo">300x250 - Rectángulo Medio</p>
              </div>
            </section>

            {/* Secondary News Grid */}
            <section className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-arimo font-black text-brand-black tracking-wide">ÚLTIMAS NOTICIAS</h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularNewsletters.slice(0, 6).map((newsletter) => (
                  <Card
                    key={newsletter.id}
                    className="overflow-hidden commercial-shadow border border-brand-gray/20 rounded-lg cursor-pointer hover:shadow-lg transition-all duration-300 group"
                    onClick={() => handleNewsletterClick(newsletter.slug)}
                  >
                    <div className="relative">
                      <Image
                        src={newsletter.image || "/placeholder.svg"}
                        alt={newsletter.title}
                        width={400}
                        height={250}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-brand-purple text-white text-xs font-arimo font-bold">
                          {newsletter.tags[0]}
                        </Badge>
                      </div>
                      <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs font-arimo">
                        {newsletter.time}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="text-lg font-garamond font-bold text-brand-black mb-2 leading-tight hover:text-brand-purple transition-colors line-clamp-2 group-hover:text-brand-purple">
                        {newsletter.title}
                      </h3>
                      <p className="text-sm text-brand-gray font-arimo line-clamp-2 mb-3 leading-relaxed">
                        {newsletter.subtitle}
                      </p>
                      <div className="flex items-center justify-between text-xs text-brand-gray font-arimo">
                        <div className="flex items-center space-x-3">
                          <span className="flex items-center">
                            <Eye className="w-3 h-3 mr-1" />
                            {newsletter.views}
                          </span>
                          <span className="flex items-center">
                            <MessageCircle className="w-3 h-3 mr-1" />
                            {newsletter.comments}
                          </span>
                        </div>
                        <span>{newsletter.readTime}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* New Black Section - Newsletter Impact */}
            <section className="mb-8">
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
            <section className="mb-8">
              <div className="bg-gradient-to-r from-brand-green/10 to-brand-teal/10 border-2 border-dashed border-brand-green/30 rounded-lg p-6 text-center commercial-shadow">
                <p className="text-brand-green text-lg font-arimo font-bold mb-2">Espacio Comercial</p>
                <p className="text-brand-gray text-xs font-arimo">468x60 - Banner Medio</p>
              </div>
            </section>

            {/* Load More */}
            <div className="text-center">
              <Button
                variant="outline"
                className="border-2 border-brand-gray/30 hover:bg-brand-purple/10 text-brand-black font-arimo font-bold px-8 py-3 rounded-lg bg-transparent"
              >
                Ver más noticias
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Trending News */}
            <Card className="commercial-shadow rounded-lg">
              <CardHeader className="p-6">
                <CardTitle className="text-xl font-arimo font-black text-brand-black tracking-wide flex items-center">
                  <Flame className="w-5 h-5 mr-2 text-red-500" />
                  LO MÁS LEÍDO
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="grid grid-cols-1 gap-3">
                  {trendingNews.map((news) => (
                    <Link key={news.id} href="/newsletter" className="block">
                      <div className="cursor-pointer hover:bg-brand-gray/5 p-2 rounded-lg transition-all duration-200 group">
                        {/* Thumbnail - Arriba */}
                        <div className="relative mb-2">
                          <Image
                            src={news.thumbnail || "/placeholder.svg"}
                            alt={news.title}
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
                            {news.title}
                          </h4>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-brand-gray font-arimo">{news.views} visualizaciones</span>
                            <span className="text-xs text-brand-gray font-arimo">{news.readTime}</span>
                          </div>
                          <span className="text-xs text-brand-gray font-arimo">{news.time}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
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

            {/* Sidebar Ad Space 1 */}
            <div className="bg-gradient-to-br from-brand-teal/10 to-brand-green/10 border-2 border-dashed border-brand-teal/30 rounded-lg p-6 text-center commercial-shadow">
              <p className="text-brand-teal text-sm font-arimo font-bold mb-2">Publicidad</p>
              <p className="text-brand-gray text-xs font-arimo">300x250</p>
            </div>

            {/* Newsletter Signup */}
            <Card className="bg-gradient-to-br from-brand-green/40 to-brand-green/60 border-2 border-brand-green commercial-shadow rounded-lg">
              <div className="text-center p-6">
                <div className="mb-4">
                  <h3 className="text-2xl font-garamond font-medium text-brand-black mb-2">
                    LA INVITACIÓN A{" "}
                    <span className="font-script script-enhanced text-3xl text-brand-purple">pensar</span>
                  </h3>
                  <h4 className="text-2xl font-arimo font-black text-brand-black">
                    ES <span className="bg-brand-gray text-brand-white px-3 py-1 rounded">URGENTE</span>
                  </h4>
                </div>
                <p className="text-sm font-arimo text-brand-black font-medium mb-4">
                  Recibe análisis semanales los viernes
                </p>
                <p className="text-sm text-brand-black font-arimo mb-6">
                  Suscríbete al newsletter gratuito de los viernes haciendo clic en el enlace:
                </p>
                <Link href="https://substack.com/@nataliavolosin" target="_blank">
                  <Button className="w-full bg-brand-black hover:bg-brand-gray text-brand-white font-arimo font-bold py-3 rounded-xl transition-all duration-300">
                    Suscribirse Gratis
                  </Button>
                </Link>
                <p className="text-sm text-brand-black font-arimo font-medium mt-4">
                  Newsletter gratuito • Análisis semanales • Sin compromisos
                </p>
              </div>
            </Card>

            {/* Sidebar Ad Space 2 */}
            <div className="bg-gradient-to-br from-brand-purple/10 to-brand-gray/10 border-2 border-dashed border-brand-purple/30 rounded-lg p-4 text-center commercial-shadow">
              <p className="text-brand-purple text-sm font-arimo font-bold mb-2">Banner</p>
              <p className="text-brand-gray text-xs font-arimo">300x100</p>
            </div>
          </div>
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
