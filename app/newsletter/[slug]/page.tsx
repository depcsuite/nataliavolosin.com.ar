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
  Zap,
  ChevronRight,
  Flame,
  Heart,
  Twitter,
  Instagram,
  Music,
  ArrowLeft,
  Clock,
  User,
  Calendar,
  ThumbsUp,
  ThumbsDown,
  Facebook,
  Linkedin,
  Copy,
  CheckCircle,
} from "lucide-react"

// Datos de ejemplo para newsletters (mismo que en la página principal)
const newsletters = [
  {
    id: 1,
    slug: "exclusivo-peligra-decomiso-cristina-kirchner",
    title: "EXCLUSIVO: Peligra el decomiso de $5.000 millones contra Cristina Kirchner",
    subtitle: "Error procesal podría anular la medida judicial más importante contra la expresidenta",
    excerpt:
      "La Cámara Federal de Casación Penal evalúa un recurso que podría cambiar el rumbo de uno de los casos más emblemáticos. Fuentes judiciales confirman irregularidades en las notificaciones.",
    content: `
      <p>En una revelación exclusiva que podría cambiar el rumbo de uno de los casos judiciales más importantes de la Argentina reciente, fuentes cercanas a la Cámara Federal de Casación Penal confirmaron que existe un serio riesgo de que se anule el decomiso de más de $5.000 millones ordenado contra Cristina Fernández de Kirchner.</p>

      <p>El problema radica en un error procesal que habría ocurrido durante las notificaciones iniciales del caso, lo que podría invalidar toda la medida cautelar dispuesta por el tribunal de primera instancia.</p>

      <h2>Los detalles del error procesal</h2>

      <p>Según pudo confirmar este medio, el error se produjo cuando los funcionarios judiciales no siguieron el protocolo establecido para las notificaciones en casos de esta magnitud. Específicamente, no se cumplió con el requisito de notificación personal que exige la ley para medidas cautelares que superen cierto monto.</p>

      <blockquote>
        "Es un error técnico, pero con consecuencias devastadoras para el caso. Si la Casación acepta el recurso, toda la medida cautelar podría caer", explicó una fuente judicial que pidió reserva de identidad.
      </blockquote>

      <p>La defensa de la expresidenta ya presentó el recurso correspondiente, argumentando que la falta de notificación personal viola el debido proceso y los derechos de defensa en juicio.</p>

      <h2>Implicaciones políticas y judiciales</h2>

      <p>Este desarrollo tiene implicaciones que van más allá del aspecto puramente legal. El decomiso de $5.000 millones representa una de las medidas más significativas tomadas contra la expresidenta en el marco de las causas por corrupción.</p>

      <p>Si efectivamente se anula la medida, no solo se liberarían los fondos, sino que se generaría un precedente preocupante sobre la capacidad del sistema judicial para manejar casos de alta complejidad y relevancia política.</p>

      <h2>La reacción del oficialismo</h2>

      <p>Fuentes del oficialismo expresaron su preocupación por esta situación, aunque prefirieron no hacer declaraciones públicas hasta conocer la resolución definitiva de la Cámara de Casación.</p>

      <p>Un funcionario de alto rango comentó off the record: "Esto demuestra la importancia de que los procedimientos judiciales se cumplan al pie de la letra, especialmente en casos de esta envergadura".</p>

      <h2>¿Qué viene ahora?</h2>

      <p>La Cámara Federal de Casación Penal tiene ahora en sus manos una decisión que podría marcar un antes y un después en la historia judicial argentina reciente. Los magistrados deberán evaluar si el error procesal es suficiente para anular la medida o si existen elementos que permitan subsanarlo.</p>

      <p>La resolución se espera para las próximas semanas, y su impacto se sentirá no solo en este caso particular, sino en la confianza general del sistema judicial argentino.</p>

      <p>Este medio continuará siguiendo de cerca los desarrollos de este caso y informará sobre cualquier novedad que surja en las próximas horas.</p>
    `,
    date: "2025-01-16",
    time: "14:30",
    readTime: "8 min",
    tags: ["Justicia", "Política", "Corrupción"],
    views: "12.3K",
    comments: 89,
    featured: true,
    urgent: true,
    image: "/placeholder.svg?height=400&width=600",
    author: "Natalia Volosin",
    publishedAt: "16 de enero de 2025",
  },
  // Otros artículos para relacionados...
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
]

const breakingNews = [
  "🔥 Escándalo y suspensión del Juicio por la muerte de Diego Maradona",
  "⚡ Procuración General anuncia reformas en investigaciones económicas",
  "🚨 Debate sobre transparencia en contrataciones públicas gana impulso",
]

// Noticias relacionadas para sidebar
const relatedNews = [
  {
    id: 201,
    title: "Cristina Kirchner apela fallo en causa Vialidad",
    tags: ["Justicia"],
    time: "Hace 1 hora",
    views: "5.2K",
    readTime: "4 min",
    thumbnail: "/news-article-thumbnail.png",
  },
  {
    id: 202,
    title: "Nuevas medidas cautelares en casos de corrupción",
    tags: ["Política"],
    time: "Hace 3 horas",
    views: "3.8K",
    readTime: "6 min",
    thumbnail: "/news-article-thumbnail.png",
  },
  {
    id: 203,
    title: "Reforma del sistema judicial: avances y obstáculos",
    tags: ["Análisis"],
    time: "Hace 5 horas",
    views: "4.1K",
    readTime: "7 min",
    thumbnail: "/news-article-thumbnail.png",
  },
]

interface Props {
  params: {
    slug: string
  }
}

export default function NewsletterArticlePage({ params }: Props) {
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [copied, setCopied] = useState(false)

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
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

  // Buscar el artículo por slug
  const article = newsletters.find((newsletter) => newsletter.slug === params.slug)

  // Si no se encuentra el artículo, mostrar 404
  if (!article) {
    return (
      <div className="min-h-screen bg-brand-light-gray font-arimo flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-garamond font-bold text-brand-black mb-4">Artículo no encontrado</h1>
          <p className="text-brand-gray mb-6">El artículo que buscas no existe o ha sido movido.</p>
          <Link href="/newsletter">
            <Button className="bg-brand-purple hover:bg-brand-purple/80 text-white">Volver al Newsletter</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleShare = (platform: string) => {
    const url = window.location.href
    const title = article.title

    switch (platform) {
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
          "_blank",
        )
        break
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank")
        break
      case "linkedin":
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank")
        break
      case "copy":
        navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
        break
    }
    setShowShareMenu(false)
  }

  const relatedArticles = newsletters.filter((n) => n.id !== article.id).slice(0, 3)

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

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center space-x-2 text-sm text-brand-gray font-arimo">
          <Link href="/" className="hover:text-brand-purple transition-colors">
            Inicio
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/newsletter" className="hover:text-brand-purple transition-colors">
            La Justa
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-brand-black font-medium">Artículo</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Article Content */}
          <div className="lg:col-span-3">
            {/* Back Button */}
            <div className="mb-6">
              <Link href="/newsletter">
                <Button variant="outline" className="font-arimo font-medium bg-transparent">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver al Newsletter
                </Button>
              </Link>
            </div>

            {/* Article Header */}
            <article className="bg-brand-white rounded-2xl commercial-shadow overflow-hidden">
              {/* Featured Image */}
              <div className="relative">
                <Image
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  width={800}
                  height={400}
                  className="w-full h-64 md:h-80 object-cover"
                />
                {article.urgent && (
                  <div className="absolute top-6 left-6">
                    <Badge className="bg-red-600 text-white px-4 py-2 text-sm font-arimo font-bold animate-pulse">
                      <AlertCircle className="w-4 h-4 mr-2" />
                      URGENTE
                    </Badge>
                  </div>
                )}
                <div className="absolute bottom-6 left-6">
                  <div className="flex items-center space-x-2">
                    {article.tags.slice(0, 3).map((tag, tagIndex) => (
                      <TagBadge key={tag} index={tagIndex} className="text-sm">
                        {tag}
                      </TagBadge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Article Meta and Title */}
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-6 text-sm text-brand-gray font-arimo">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span className="font-medium">{article.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{article.publishedAt}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{article.readTime}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Eye className="w-4 h-4" />
                      <span>{article.views} vistas</span>
                    </div>
                  </div>
                </div>

                <h1 className="text-3xl md:text-4xl font-garamond font-bold text-brand-black mb-4 leading-tight">
                  {article.title}
                </h1>

                <h2 className="text-xl font-garamond font-medium text-brand-gray mb-6 leading-relaxed">
                  {article.subtitle}
                </h2>

                {/* Social Actions */}
                <div className="flex items-center justify-between py-6 border-y border-brand-gray/20 mb-8">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setLiked(!liked)}
                      className={`${liked ? "text-green-600 bg-green-50" : "text-brand-gray"} hover:text-green-600 hover:bg-green-50`}
                    >
                      <ThumbsUp className="w-4 h-4 mr-2" />
                      Me gusta
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDisliked(!disliked)}
                      className={`${disliked ? "text-red-600 bg-red-50" : "text-brand-gray"} hover:text-red-600 hover:bg-red-50`}
                    >
                      <ThumbsDown className="w-4 h-4 mr-2" />
                      No me gusta
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setBookmarked(!bookmarked)}
                      className={`${bookmarked ? "text-yellow-600 bg-yellow-50" : "text-brand-gray"} hover:text-yellow-600 hover:bg-yellow-50`}
                    >
                      <Bookmark className="w-4 h-4 mr-2" />
                      Guardar
                    </Button>
                  </div>
                  <div className="relative">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowShareMenu(!showShareMenu)}
                      className="text-brand-gray hover:text-brand-purple"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Compartir
                    </Button>
                    {showShareMenu && (
                      <div className="absolute right-0 top-full mt-2 bg-white border border-brand-gray/20 rounded-lg shadow-lg p-2 z-10">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleShare("twitter")}
                          className="w-full justify-start text-blue-500 hover:bg-blue-50"
                        >
                          <Twitter className="w-4 h-4 mr-2" />
                          Twitter
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleShare("facebook")}
                          className="w-full justify-start text-blue-600 hover:bg-blue-50"
                        >
                          <Facebook className="w-4 h-4 mr-2" />
                          Facebook
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleShare("linkedin")}
                          className="w-full justify-start text-blue-700 hover:bg-blue-50"
                        >
                          <Linkedin className="w-4 h-4 mr-2" />
                          LinkedIn
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleShare("copy")}
                          className="w-full justify-start text-brand-gray hover:bg-gray-50"
                        >
                          {copied ? <CheckCircle className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                          {copied ? "Copiado!" : "Copiar enlace"}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Article Content */}
                <div className="prose prose-lg max-w-none font-arimo">
                  <div dangerouslySetInnerHTML={{ __html: article.content }} />
                </div>

                {/* Article Footer */}
                <div className="mt-12 pt-8 border-t border-brand-gray/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2 text-sm text-brand-gray font-arimo">
                        <MessageCircle className="w-4 h-4" />
                        <span>{article.comments} comentarios</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {article.tags.map((tag, index) => (
                        <TagBadge key={tag} index={index} className="text-xs">
                          {tag}
                        </TagBadge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* Advertising Banner */}
            <section className="my-12">
              <div className="bg-gradient-to-br from-brand-purple/5 to-brand-teal/5 border-2 border-dashed border-brand-purple/20 rounded-lg p-8 text-center commercial-shadow">
                <p className="text-brand-purple text-lg font-arimo font-bold mb-2">Publicidad</p>
                <p className="text-brand-gray text-sm font-arimo">728x90 - Banner Artículo</p>
              </div>
            </section>

            {/* Related Articles */}
            <section className="mt-12">
              <h3 className="text-2xl font-arimo font-black text-brand-black mb-6 tracking-wide">
                ARTÍCULOS RELACIONADOS
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedArticles.map((related) => (
                  <Card
                    key={related.id}
                    className="overflow-hidden commercial-shadow border border-brand-gray/20 rounded-lg cursor-pointer hover:shadow-lg transition-all duration-300 group"
                    onClick={() => router.push(`/newsletter/${related.slug}`)}
                  >
                    <div className="relative">
                      <Image
                        src={related.image || "/placeholder.svg"}
                        alt={related.title}
                        width={300}
                        height={200}
                        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-brand-purple text-white text-xs font-arimo font-bold">
                          {related.tags[0]}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h4 className="text-base font-garamond font-bold text-brand-black mb-2 leading-tight hover:text-brand-purple transition-colors line-clamp-2 group-hover:text-brand-purple">
                        {related.title}
                      </h4>
                      <p className="text-sm text-brand-gray font-arimo line-clamp-2 mb-3 leading-relaxed">
                        {related.subtitle}
                      </p>
                      <div className="flex items-center justify-between text-xs text-brand-gray font-arimo">
                        <span className="flex items-center">
                          <Eye className="w-3 h-3 mr-1" />
                          {related.views}
                        </span>
                        <span>{related.readTime}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Related News */}
            <Card className="commercial-shadow rounded-lg">
              <CardHeader className="p-6">
                <CardTitle className="text-xl font-arimo font-black text-brand-black tracking-wide flex items-center">
                  <Flame className="w-5 h-5 mr-2 text-red-500" />
                  RELACIONADAS
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="grid grid-cols-1 gap-4">
                  {relatedNews.map((news) => (
                    <Link key={news.id} href="/newsletter" className="block">
                      <div className="cursor-pointer hover:bg-brand-gray/5 p-3 rounded-lg transition-all duration-200 group">
                        <div className="relative mb-3">
                          <Image
                            src={news.thumbnail || "/placeholder.svg"}
                            alt={news.title}
                            width={160}
                            height={90}
                            className="w-full aspect-video rounded-lg object-cover"
                          />
                        </div>
                        <div className="space-y-2">
                          <h4 className="text-sm font-arimo font-bold text-brand-black line-clamp-2 group-hover:text-brand-purple transition-colors">
                            {news.title}
                          </h4>
                          <div className="flex items-center justify-between text-xs text-brand-gray font-arimo">
                            <span>{news.views} vistas</span>
                            <span>{news.readTime}</span>
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

            {/* Sidebar Ad Space */}
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
