"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Clock,
  Search,
  Play,
  Eye,
  TrendingUp,
  Zap,
  Star,
  Menu,
  Filter,
  ChevronDown,
  ChevronUp,
  Tag,
  Twitter,
  Instagram,
  Music,
  ExternalLink,
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

// Most viewed videos data
const mostViewedVideos = [
  {
    id: 4,
    title: "CRISTINA: HOY FALLA LA CORTE y PUEDE IR PRESA con NOE BARRAL y NATALIA VOLOSIN | ESCUCHO OFERTAS",
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
]

const allTags = [
  "Política",
  "Seguridad",
  "Análisis",
  "Bullrich",
  "Justicia",
  "Derecho",
  "Corrupción",
  "Foro",
  "Academia",
  "Cristina Kirchner",
  "Corte Suprema",
  "Buenos Aires",
  "Elecciones",
  "Debate",
  "Políticas Públicas",
  "Jubilados",
  "Represión",
  "Derechos Humanos",
  "Protesta",
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

export default function VideosPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedYear, setSelectedYear] = useState("all-years")
  const [selectedMonth, setSelectedMonth] = useState("all-months")
  const [isScrolled, setIsScrolled] = useState(false)
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

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

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedTags([])
    setSelectedYear("all-years")
    setSelectedMonth("all-months")
  }

  const hasActiveFilters =
    searchQuery || selectedTags.length > 0 || selectedYear !== "all-years" || selectedMonth !== "all-months"

  const filteredVideos = videos.filter((video) => {
    const matchesSearch =
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => video.tags.includes(tag))

    const videoDate = new Date(video.date)
    const matchesYear = selectedYear === "all-years" || videoDate.getFullYear().toString() === selectedYear
    const matchesMonth =
      selectedMonth === "all-months" || (videoDate.getMonth() + 1).toString().padStart(2, "0") === selectedMonth

    return matchesSearch && matchesTags && matchesYear && matchesMonth
  })

  const handleVideoClick = (video: (typeof videos)[0]) => {
    const slug = generateSlug(video.title)
    router.push(`/videos/${slug}`)
  }

  const tagColors = [
    { bg: "bg-brand-purple", text: "text-brand-white" },
    { bg: "bg-brand-teal", text: "text-brand-black" },
    { bg: "bg-brand-green", text: "text-brand-black" },
    { bg: "bg-brand-yellow", text: "text-brand-black" },
    { bg: "bg-brand-orange", text: "text-brand-black" },
  ]

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
                    placeholder="Buscar videos..."
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
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-sans sans-modern font-black text-brand-black mb-4">VIDEOS</h1>
              <p className="text-brand-gray font-arimo">
                Conferencias, entrevistas y análisis en video sobre temas jurídicos, políticos y sociales.
              </p>
            </div>

            {/* Advertising Banner - After Header */}
            <section className="mb-8">
              <div className="bg-gradient-to-r from-brand-gray/10 to-brand-light-gray border-2 border-dashed border-brand-gray/30 rounded-2xl p-8 text-center commercial-shadow">
                <p className="text-brand-gray text-sm font-sans sans-modern font-bold mb-2">Espacio Publicitario</p>
                <p className="text-brand-gray text-xs font-arimo">728x90 - Banner Superior</p>
              </div>
            </section>

            {/* Collapsible Search and Filters */}
            <div className="bg-brand-white rounded-2xl commercial-shadow mb-8">
              <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full flex items-center justify-between p-6 hover:bg-brand-gray/5"
                  >
                    <div className="flex items-center space-x-3">
                      <Filter className="w-5 h-5 text-brand-gray" />
                      <span className="font-sans sans-modern font-bold text-brand-black">Filtros y búsqueda</span>
                      {hasActiveFilters && (
                        <Badge className="bg-brand-purple text-brand-white text-xs">
                          {[
                            searchQuery && "búsqueda",
                            selectedTags.length > 0 && `${selectedTags.length} tags`,
                            selectedYear !== "all-years" && "año",
                            selectedMonth !== "all-months" && "mes",
                          ]
                            .filter(Boolean)
                            .join(", ")}
                        </Badge>
                      )}
                    </div>
                    {isFiltersOpen ? (
                      <ChevronUp className="w-5 h-5 text-brand-gray" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-brand-gray" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="px-6 pb-6">
                  <div className="space-y-6">
                    {/* Search */}
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-gray w-4 h-4" />
                      <Input
                        type="text"
                        placeholder="Buscar videos..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-brand-light-gray border-2 border-brand-gray/30 focus:border-brand-green rounded-xl font-sans sans-modern"
                      />
                    </div>

                    {/* Date Filters */}
                    <div className="grid md:grid-cols-3 gap-4">
                      <Select value={selectedYear} onValueChange={setSelectedYear}>
                        <SelectTrigger className="bg-brand-light-gray border-2 border-brand-gray/30 focus:border-brand-green rounded-xl font-sans sans-modern">
                          <SelectValue placeholder="Año" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all-years">Todos los años</SelectItem>
                          {years.map((year) => (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                        <SelectTrigger className="bg-brand-light-gray border-2 border-brand-gray/30 focus:border-brand-green rounded-xl font-sans sans-modern">
                          <SelectValue placeholder="Mes" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all-months">Todos los meses</SelectItem>
                          {months.map((month) => (
                            <SelectItem key={month.value} value={month.value}>
                              {month.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      {hasActiveFilters && (
                        <Button
                          variant="outline"
                          onClick={clearFilters}
                          className="border-2 border-brand-gray/30 hover:bg-brand-green/20 rounded-xl font-sans sans-modern bg-transparent"
                        >
                          Limpiar filtros
                        </Button>
                      )}
                    </div>

                    {/* Tags Filter */}
                    <div>
                      <p className="text-sm font-sans sans-modern font-medium text-brand-black mb-3 flex items-center">
                        <Tag className="w-4 h-4 mr-2" />
                        Filtrar por temas:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {allTags.map((tag, index) => (
                          <Button
                            key={tag}
                            variant={selectedTags.includes(tag) ? "default" : "outline"}
                            size="sm"
                            onClick={() => toggleTag(tag)}
                            className={`text-xs rounded-full font-arimo font-medium transition-all duration-200 ${
                              selectedTags.includes(tag)
                                ? tagColors[index % tagColors.length].bg +
                                  " " +
                                  tagColors[index % tagColors.length].text
                                : "border-brand-gray/30 hover:bg-brand-purple/20 hover:border-brand-purple/50"
                            }`}
                          >
                            {tag}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>

            {/* Advertising Banner - After Filters */}
            <section className="mb-8">
              <div className="bg-gradient-to-br from-brand-purple/5 to-brand-teal/5 border-2 border-dashed border-brand-purple/20 rounded-2xl p-10 text-center commercial-shadow">
                <p className="text-brand-purple text-lg font-sans sans-modern font-bold mb-2">Publicidad</p>
                <p className="text-brand-gray text-sm font-arimo">300x250 - Rectángulo Medio</p>
              </div>
            </section>

            {/* Videos Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {filteredVideos.map((video) => (
                <Card
                  key={video.id}
                  className="overflow-hidden hover:scale-[1.02] transition-all duration-300 cursor-pointer commercial-shadow rounded-2xl"
                  onClick={() => handleVideoClick(video)}
                >
                  <div className="relative">
                    <Image
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      width={350}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <Play className="w-12 h-12 text-white" />
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
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg hover:text-brand-purple transition-colors line-clamp-2 font-serif serif-elegant">
                      {video.title}
                    </CardTitle>
                    <CardDescription className="text-sm line-clamp-2 font-arimo">{video.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex items-center justify-between text-xs text-brand-gray mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="flex items-center">
                          <Eye className="w-3 h-3 mr-1" />
                          {video.views}
                        </span>
                        <span>{new Date(video.date).toLocaleDateString("es-AR")}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {video.duration}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {video.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {video.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{video.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Advertising Banner - After Videos Grid */}
            {filteredVideos.length > 0 && (
              <section className="mt-12 mb-8">
                <div className="bg-gradient-to-r from-brand-green/10 to-brand-teal/10 border-2 border-dashed border-brand-green/30 rounded-2xl p-8 text-center commercial-shadow">
                  <p className="text-brand-green text-lg font-sans sans-modern font-bold mb-2">Espacio Comercial</p>
                  <p className="text-brand-gray text-xs font-arimo">728x90 - Banner Inferior</p>
                </div>
              </section>
            )}

            {filteredVideos.length === 0 && (
              <div className="text-center py-12">
                <p className="text-brand-gray font-arimo">No se encontraron videos con los criterios seleccionados.</p>
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="mt-4 border-2 border-brand-gray/30 hover:bg-brand-green/20 rounded-xl font-sans sans-modern bg-transparent"
                >
                  Limpiar filtros
                </Button>
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

            {/* Most Viewed Videos */}
            <Card className="commercial-shadow rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg font-serif serif-elegant flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-brand-purple" />
                  Videos más vistos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mostViewedVideos.map((video, index) => {
                    const fullVideo = videos.find((v) => v.id === video.id)
                    return (
                      <div
                        key={video.id}
                        className="flex items-start space-x-3 cursor-pointer hover:bg-brand-gray/10 p-2 rounded-lg transition-colors"
                        onClick={() => fullVideo && handleVideoClick(fullVideo)}
                      >
                        <div className="relative flex-shrink-0">
                          <Image
                            src={video.thumbnail || "/placeholder.svg"}
                            alt={video.title}
                            width={80}
                            height={60}
                            className="rounded-lg object-cover"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-lg">
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
                          <h4 className="text-sm font-serif serif-elegant font-medium text-brand-black line-clamp-2 hover:text-brand-purple transition-colors">
                            {video.title}
                          </h4>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Sidebar Ad Space 1 */}
            <div className="bg-gradient-to-br from-brand-teal/10 to-brand-green/10 border-2 border-dashed border-brand-teal/30 rounded-2xl p-6 text-center commercial-shadow">
              <p className="text-brand-teal text-sm font-sans sans-modern font-bold mb-2">Publicidad</p>
              <p className="text-brand-gray text-xs font-arimo">300x250</p>
            </div>

            {/* Sidebar Ad Space 2 */}
            <div className="bg-gradient-to-br from-brand-purple/10 to-brand-gray/10 border-2 border-dashed border-brand-purple/30 rounded-2xl p-4 text-center commercial-shadow">
              <p className="text-brand-purple text-sm font-sans sans-modern font-bold mb-2">Banner</p>
              <p className="text-brand-gray text-xs font-arimo">300x100</p>
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
                <h3 className="text-2xl font-sans sans-modern font-black text-brand-white mb-2 tracking-wide">
                  SERVICIOS PROFESIONALES
                </h3>
                <p className="text-brand-green font-sans sans-modern font-bold text-lg">
                  Charlas • Eventos • Consultoría • Capacitaciones
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-brand-green rounded-full"></div>
                  <span className="text-brand-white font-arimo">Conferencias magistrales</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-brand-green rounded-full"></div>
                  <span className="text-brand-white font-arimo">Asesoramiento jurídico especializado</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-brand-green rounded-full"></div>
                  <span className="text-brand-white font-arimo">Capacitaciones institucionales</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-brand-green rounded-full"></div>
                  <span className="text-brand-white font-arimo">Análisis de políticas públicas</span>
                </div>
              </div>

              <div className="text-center">
                <Link
                  href="mailto:lajusta@nataliavolosin.com"
                  className="inline-flex items-center space-x-2 bg-brand-green hover:bg-brand-green/80 text-brand-black font-sans sans-modern font-bold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105"
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
                <h3 className="text-2xl font-sans sans-modern font-black text-brand-white mb-2 tracking-wide">
                  CONSULTAS COMERCIALES
                </h3>
                <p className="text-brand-purple font-sans sans-modern font-bold text-lg">
                  Publicidad • Patrocinios • Colaboraciones
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-brand-purple rounded-full"></div>
                  <span className="text-brand-white font-arimo">Espacios publicitarios premium</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-brand-purple rounded-full"></div>
                  <span className="text-brand-white font-arimo">Patrocinios de contenido</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-brand-purple rounded-full"></div>
                  <span className="text-brand-white font-arimo">Colaboraciones estratégicas</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-brand-purple rounded-full"></div>
                  <span className="text-brand-white font-arimo">Branded content</span>
                </div>
              </div>

              <div className="text-center">
                <Link
                  href="mailto:comercial@nataliavolosin.com"
                  className="inline-flex items-center space-x-2 bg-brand-purple hover:bg-brand-purple/80 text-brand-white font-sans sans-modern font-bold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105"
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
