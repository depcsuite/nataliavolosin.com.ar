"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Calendar,
  Clock,
  Eye,
  Twitter,
  Facebook,
  Linkedin,
  Instagram,
  Star,
  Menu,
  Search,
  TrendingUp,
  Music,
  Zap,
} from "lucide-react"
import { notFound } from "next/navigation"
import { findArticleBySlug } from "@/lib/article-data"

interface PageProps {
  params: {
    slug: string
  }
}

const breakingNews = [
  "🔥 Escándalo y suspensión del Juicio por la muerte de Diego Maradona",
  "⚡ Procuración General anuncia reformas en investigaciones económicas",
  "🚨 Debate sobre transparencia en contrataciones públicas gana impulso",
]

export default function ArticlePage({ params }: PageProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)

  // Find the article by slug (supports accents)
  const article = findArticleBySlug(params.slug)

  // Scroll listener para ocultar el top bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!article) {
    notFound()
  }

  const shareOnTwitter = () => {
    const text = encodeURIComponent(`${article.title} por @nataliavolosin`)
    const url = encodeURIComponent(`${window.location.origin}/articulo/${article.slug}`)
    const twitterUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`
    window.open(twitterUrl, "_blank", "width=550,height=420")
  }

  const shareOnFacebook = () => {
    const url = encodeURIComponent(`${window.location.origin}/articulo/${article.slug}`)
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`
    window.open(facebookUrl, "_blank", "width=550,height=420")
  }

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(`${window.location.origin}/articulo/${article.slug}`)
    const title = encodeURIComponent(article.title)
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}`
    window.open(linkedinUrl, "_blank", "width=550,height=420")
  }

  return (
    <div className="min-h-screen bg-brand-light-gray font-arimo">
      {/* Header - Same as homepage */}
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
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <div className="mb-8">
            <Badge className="mb-4 bg-brand-purple text-brand-white">{article.category}</Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-garamond font-medium text-brand-black mb-6 leading-tight">
              {article.title}
            </h1>
            <p className="text-xl text-brand-gray font-arimo leading-relaxed mb-8">{article.excerpt}</p>

            {/* Article Meta */}
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-brand-gray/20 pb-6 mb-8 gap-4">
              <div className="flex items-center space-x-4">
                <Image
                  src={article.author.avatar || "/placeholder.svg"}
                  alt={article.author.name}
                  width={56}
                  height={56}
                  className="rounded-full border-2 border-brand-gray/20"
                />
                <div>
                  <h3 className="font-garamond font-medium text-brand-black text-lg">{article.author.name}</h3>
                  <p className="text-sm text-brand-gray font-arimo">{article.author.bio}</p>
                </div>
              </div>
              <div className="flex items-center space-x-6 text-sm text-brand-gray">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(article.date).toLocaleDateString("es-AR")}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  {article.readTime}
                </div>
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-2" />
                  {article.views}
                </div>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="grid lg:grid-cols-4 gap-6">
            <article className="lg:col-span-3">
              <div className="prose prose-lg max-w-none">
                <Image
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  width={800}
                  height={400}
                  className="w-full h-64 md:h-80 object-cover rounded-2xl mb-8 commercial-shadow"
                />

                <div className="font-arimo leading-relaxed text-brand-black text-lg whitespace-pre-line">
                  {article.content}
                </div>
              </div>

              {/* Share Section */}
              <div className="mt-12 pt-8 border-t border-brand-gray/20">
                <h3 className="font-garamond font-medium text-brand-black mb-6 text-xl">Compartir artículo</h3>
                <div className="flex flex-wrap gap-4">
                  <Button
                    variant="outline"
                    size="lg"
                    className="bg-transparent border-2 border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-brand-white"
                    onClick={shareOnTwitter}
                  >
                    <Twitter className="w-5 h-5 mr-2" />
                    Twitter
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                    onClick={shareOnFacebook}
                  >
                    <Facebook className="w-5 h-5 mr-2" />
                    Facebook
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="bg-transparent border-2 border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white"
                    onClick={shareOnLinkedIn}
                  >
                    <Linkedin className="w-5 h-5 mr-2" />
                    LinkedIn
                  </Button>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-6">
              {/* Trending News */}
              <Card className="commercial-shadow rounded-lg">
                <CardHeader className="p-6">
                  <CardTitle className="text-xl font-arimo font-black text-brand-black tracking-wide flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-red-500" />
                    LO MÁS LEÍDO
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="grid grid-cols-1 gap-3">
                    {[
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
                    ].map((news) => (
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
                                className="w-6 h-6 text-white"
                              >
                                <polygon points="6,3 20,12 6,21" />
                              </svg>
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
            </aside>
          </div>
        </div>
      </main>

      {/* Footer - Same as homepage */}
      <footer className="bg-brand-black text-brand-white py-16 mt-20">
        <div className="container mx-auto px-4">
          {/* Logo y tagline centrados */}
          <div className="text-center mb-12">
            <h4 className="text-3xl font-garamond font-medium mb-2">
              Natalia <span className="font-script script-enhanced text-4xl text-brand-purple">Volosin</span>
            </h4>
            <h5 className="text-2xl font-arimo font-black mb-4 tracking-wider">LA JUSTA</h5>
            <p className="text-brand-gray text-lg font-arimo">Portal de análisis independiente</p>
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

              <div className="space-y-4 mb-6">
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

          {/* Copyright centrado */}
          <div className="text-center text-sm text-brand-gray font-arimo font-medium">
            © 2025 Natalia Volosin. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  )
}
