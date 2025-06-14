"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, Twitter, Instagram, Mail, Star, TrendingUp, Eye, Share2, Menu, Search } from "lucide-react"

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
  "Escándalo y suspensión del Juicio por la muerte de Diego Maradona",
  "Procuración General anuncia reformas en investigaciones económicas",
  "Debate sobre transparencia en contrataciones públicas gana impulso",
]

const socialPosts = [
  {
    platform: "twitter",
    content:
      "La transparencia no es solo una aspiración, es una herramienta concreta de gobernanza. Nuevos mecanismos de control están demostrando su efectividad.",
    date: "2025-01-16",
    engagement: "156 retweets, 423 likes",
  },
  {
    platform: "instagram",
    content:
      "Preparando el análisis semanal desde mi oficina. Esta semana: reformas institucionales que no pueden esperar más.",
    date: "2025-01-15",
    engagement: "289 likes, 34 comentarios",
  },
]

export default function HomePage() {
  const [freeArticlesRead, setFreeArticlesRead] = useState(0)
  const [showPaywall, setShowPaywall] = useState(false)
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const stored = localStorage.getItem("freeArticlesRead")
    if (stored) {
      setFreeArticlesRead(Number.parseInt(stored))
    }
  }, [])

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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-50">
        {/* Top Bar */}
        <div className="bg-red-600 text-white py-1">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <span className="font-semibold">ÚLTIMO MOMENTO:</span>
                <div className="hidden md:block">
                  <span className="animate-pulse">{breakingNews[0]}</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span>
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

        {/* Main Header */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-3xl font-bold text-gray-900">Natalia Volosin</h1>
              <div className="hidden md:block text-sm text-gray-600">Portal de Análisis Jurídico y Político</div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Enhanced Search */}
              <div className="relative hidden md:block">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Buscar noticias..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 w-64 bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  />
                  {searchQuery && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                      onClick={() => setSearchQuery("")}
                    >
                      ×
                    </Button>
                  )}
                </div>
              </div>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Search className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => setIsSubscriptionOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
                size="sm"
              >
                <Star className="w-4 h-4 mr-1" />
                Suscribirse
              </Button>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8 mt-4 pt-4 border-t">
            <Link href="#" className="text-gray-700 hover:text-red-600 font-medium">
              INICIO
            </Link>
            <Link href="#politica" className="text-gray-700 hover:text-red-600 font-medium">
              POLÍTICA
            </Link>
            <Link href="#justicia" className="text-gray-700 hover:text-red-600 font-medium">
              JUSTICIA
            </Link>
            <Link href="#economia" className="text-gray-700 hover:text-red-600 font-medium">
              ECONOMÍA
            </Link>
            <Link href="#analisis" className="text-gray-700 hover:text-red-600 font-medium">
              ANÁLISIS
            </Link>
            <Link href="#opinion" className="text-gray-700 hover:text-red-600 font-medium">
              OPINIÓN
            </Link>
          </nav>
        </div>
      </header>

      {/* Breaking News Ticker */}
      <div className="bg-yellow-100 border-b border-yellow-200 py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center">
            <span className="bg-red-600 text-white px-2 py-1 text-xs font-bold mr-4">BREAKING</span>
            <div className="flex-1 overflow-hidden">
              <div className="animate-marquee whitespace-nowrap text-sm">{breakingNews.join(" • ")}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {/* Featured Article */}
            <section className="mb-12">
              <Card
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleArticleClick(featuredArticle)}
              >
                <div className="relative">
                  <Image
                    src={featuredArticle.image || "/placeholder.svg"}
                    alt={featuredArticle.title}
                    width={600}
                    height={400}
                    className="w-full h-64 md:h-80 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-red-600 hover:bg-red-700">{featuredArticle.category}</Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl md:text-3xl font-bold hover:text-blue-600 transition-colors cursor-pointer">
                    {featuredArticle.title}
                  </CardTitle>
                  <CardDescription className="text-base text-gray-600">{featuredArticle.excerpt}</CardDescription>
                  <div className="flex items-center justify-between text-sm text-gray-500 pt-2">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(featuredArticle.date).toLocaleDateString("es-AR")}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {featuredArticle.readTime}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {featuredArticle.views}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          shareOnTwitter(featuredArticle)
                        }}
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </section>

            {/* Latest Articles Grid */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">ÚLTIMAS NOTICIAS</h2>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-red-600" />
                  <span className="text-sm text-gray-600">Actualizándose</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {articles.map((article) => (
                  <Card
                    key={article.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => handleArticleClick(article)}
                  >
                    <div className="relative">
                      <Image
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 left-2">
                        <Badge variant="secondary" className="text-xs">
                          {article.category}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg font-bold hover:text-blue-600 transition-colors cursor-pointer line-clamp-2">
                        {article.title}
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-600 line-clamp-2">
                        {article.excerpt}
                      </CardDescription>
                      <div className="flex items-center justify-between text-xs text-gray-500 pt-2">
                        <div className="flex items-center space-x-2">
                          <span>{new Date(article.date).toLocaleDateString("es-AR")}</span>
                          <span>•</span>
                          <span>{article.readTime}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="flex items-center">
                            <Eye className="w-3 h-3 mr-1" />
                            {article.views}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              shareOnTwitter(article)
                            }}
                          >
                            <Share2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Subscription Box */}
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200">
              <CardHeader className="text-center">
                <CardTitle className="text-lg text-blue-900">Acceso Premium</CardTitle>
                <CardDescription className="text-blue-700">Análisis exclusivos y contenido sin límites</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="mb-4">
                  <div className="text-2xl font-bold text-blue-900">$2.500</div>
                  <div className="text-sm text-blue-700">por mes</div>
                </div>
                <Button onClick={() => setIsSubscriptionOpen(true)} className="w-full bg-blue-600 hover:bg-blue-700">
                  Suscribirse Ahora
                </Button>
                <p className="text-xs text-blue-600 mt-2">
                  {freeArticlesRead < 3
                    ? `${3 - freeArticlesRead} artículos gratuitos restantes`
                    : "Límite alcanzado - Suscríbete para continuar"}
                </p>
              </CardContent>
            </Card>

            {/* Author Info */}
            <Card>
              <CardHeader className="text-center">
                <Image
                  src="https://s3.us-east-1.amazonaws.com/nataliavolosin.com.ar/natalia-volosin.jpg"
                  alt="Natalia Volosin"
                  width={80}
                  height={80}
                  className="rounded-full mx-auto border-2 border-gray-200"
                />
                <CardTitle className="text-lg">Natalia Volosin</CardTitle>
                <CardDescription className="text-sm">
                  Doctora en Derecho (Yale) • Especialista en Derecho Público
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Profesora en la UBA y especialista en Derecho Público. Experta en corrupción y reformas
                  institucionales.
                </p>
                <div className="flex justify-center space-x-3">
                  <Button variant="outline" size="sm" asChild>
                    <Link href="https://x.com/nataliavolosin" target="_blank">
                      <Twitter className="w-4 h-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="https://www.instagram.com/nataliavolosin" target="_blank">
                      <Instagram className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Social Media Feed */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Redes Sociales</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {socialPosts.map((post, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-3">
                    <div className="flex items-center mb-2">
                      {post.platform === "twitter" ? (
                        <Twitter className="w-4 h-4 text-blue-500 mr-2" />
                      ) : (
                        <Instagram className="w-4 h-4 text-pink-500 mr-2" />
                      )}
                      <span className="text-xs text-gray-500">{post.date}</span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{post.content}</p>
                    <p className="text-xs text-gray-500">{post.engagement}</p>
                  </div>
                ))}
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" asChild className="flex-1">
                    <Link href="https://x.com/nataliavolosin" target="_blank">
                      Ver X
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild className="flex-1">
                    <Link href="https://www.instagram.com/nataliavolosin" target="_blank">
                      Ver Instagram
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Newsletter Signup */}
            <Card className="bg-gray-900 text-white">
              <CardHeader>
                <CardTitle className="text-lg">Newsletter Semanal</CardTitle>
                <CardDescription className="text-gray-300">Recibe análisis exclusivos en tu email</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Input
                    placeholder="Tu email"
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                  />
                  <Button className="w-full bg-red-600 hover:bg-red-700">Suscribirse</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-bold mb-4">Natalia Volosin</h4>
              <p className="text-gray-300 text-sm mb-4">Portal de análisis jurídico y político independiente</p>
              <div className="flex space-x-3">
                <Link href="https://x.com/nataliavolosin" target="_blank" className="text-gray-300 hover:text-white">
                  <Twitter className="w-5 h-5" />
                </Link>
                <Link
                  href="https://www.instagram.com/nataliavolosin"
                  target="_blank"
                  className="text-gray-300 hover:text-white"
                >
                  <Instagram className="w-5 h-5" />
                </Link>
                <Link href="mailto:contacto@nataliavolosin.com" className="text-gray-300 hover:text-white">
                  <Mail className="w-5 h-5" />
                </Link>
              </div>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Secciones</h5>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <Link href="#" className="hover:text-white">
                    Política
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Justicia
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Economía
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Análisis
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Información</h5>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <Link href="#" className="hover:text-white">
                    Sobre Natalia
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Contacto
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Suscripción
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Términos
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Contacto</h5>
              <p className="text-sm text-gray-300 mb-2">contacto@nataliavolosin.com</p>
              <p className="text-sm text-gray-300">Buenos Aires, Argentina</p>
            </div>
          </div>
          <Separator className="bg-gray-700 my-8" />
          <div className="text-center text-sm text-gray-400">
            © 2025 Natalia Volosin. Todos los derechos reservados.
          </div>
        </div>
      </footer>

      {/* Paywall Dialog */}
      <Dialog open={showPaywall} onOpenChange={setShowPaywall}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Límite de artículos alcanzado</DialogTitle>
            <DialogDescription className="text-center">
              Has leído tus 3 artículos gratuitos. Suscríbete para acceso ilimitado a todo el contenido.
            </DialogDescription>
          </DialogHeader>
          <div className="text-center space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Suscripción Premium</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Acceso ilimitado a todos los artículos</li>
                <li>• Análisis exclusivos para suscriptores</li>
                <li>• Newsletter semanal</li>
                <li>• Archivo completo de publicaciones</li>
              </ul>
            </div>
            <Button onClick={handleSubscribe} className="w-full bg-blue-600 hover:bg-blue-700">
              Suscribirse Ahora
            </Button>
            <Button variant="outline" onClick={() => setShowPaywall(false)} className="w-full">
              Cerrar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Subscription Dialog */}
      <Dialog open={isSubscriptionOpen} onOpenChange={setIsSubscriptionOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Suscripción Premium</DialogTitle>
            <DialogDescription className="text-center">
              Accede a análisis exclusivos y contenido sin límites
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Plan Premium - $2.500/mes</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>✓ Acceso ilimitado a todos los artículos</li>
                <li>✓ Análisis exclusivos para suscriptores</li>
                <li>✓ Newsletter semanal con contenido adicional</li>
                <li>✓ Archivo completo de publicaciones</li>
                <li>✓ Sin publicidad</li>
              </ul>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="tu@email.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Nombre completo</Label>
              <Input id="name" type="text" placeholder="Tu nombre" />
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">Suscribirse - $2.500/mes</Button>
            <p className="text-xs text-gray-500 text-center">Puedes cancelar tu suscripción en cualquier momento</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
