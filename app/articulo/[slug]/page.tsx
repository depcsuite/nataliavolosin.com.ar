"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, Twitter, Instagram, Mail, Star, Eye, Share2, Search, Menu } from "lucide-react"
import { TagBadge } from "@/components/ui/tag-badge"

// Datos de ejemplo para los artículos (en una app real vendrían de una API/base de datos)
const articlesData = {
  "crisis-institucional-reformas-estructurales-argentina": {
    id: 1,
    title: "Crisis institucional: El momento decisivo para las reformas estructurales en Argentina",
    excerpt:
      "Un análisis exhaustivo sobre la coyuntura política actual y las oportunidades únicas que se presentan para implementar cambios profundos en el sistema institucional argentino.",
    content: `
      <p>Argentina se encuentra en un momento crucial de su historia institucional. La convergencia de múltiples crisis ha creado una ventana de oportunidad única para implementar reformas estructurales que durante décadas han sido postergadas.</p>
      
      <h2>El contexto actual</h2>
      <p>La crisis económica, política y social que atraviesa el país ha puesto en evidencia las debilidades estructurales de nuestro sistema institucional. Sin embargo, esta misma crisis puede ser el catalizador necesario para generar el consenso político y social requerido para las reformas.</p>
      
      <h2>Las reformas necesarias</h2>
      <p>Basándose en experiencias internacionales exitosas, particularmente aquellas estudiadas durante mi formación en Yale, es posible identificar tres áreas críticas que requieren atención inmediata:</p>
      
      <ul>
        <li><strong>Transparencia en la gestión pública:</strong> Implementación de mecanismos de control ciudadano y acceso a la información.</li>
        <li><strong>Reforma del sistema judicial:</strong> Garantizar la independencia y eficiencia del Poder Judicial.</li>
        <li><strong>Modernización del Estado:</strong> Digitalización y profesionalización de la administración pública.</li>
      </ul>
      
      <h2>El rol de la sociedad civil</h2>
      <p>Las reformas institucionales no pueden ser impuestas desde arriba. Requieren del compromiso activo de la sociedad civil, los medios de comunicación y las organizaciones intermedias. La experiencia comparada demuestra que los cambios más duraderos son aquellos que cuentan con legitimidad social.</p>
      
      <h2>Conclusiones</h2>
      <p>El momento actual presenta una oportunidad histórica para Argentina. Las crisis pueden ser destructivas, pero también pueden ser transformadoras. La clave está en canalizar la energía del cambio hacia reformas institucionales que fortalezcan la democracia y mejoren la calidad de vida de todos los argentinos.</p>
    `,
    date: "2025-01-16",
    readTime: "15 min",
    category: "Análisis Político",
    image: "/placeholder.svg?height=400&width=800",
    views: "2.3K",
    tags: ["reforma institucional", "crisis argentina", "transparencia"],
  },
  "corrupcion-contrataciones-publicas-mecanismos-control": {
    id: 2,
    title: "La corrupción en las contrataciones públicas: Nuevos mecanismos de control",
    excerpt:
      "Propuestas concretas para fortalecer la transparencia en las compras del Estado basadas en experiencias internacionales exitosas.",
    content: `
      <p>Las contrataciones públicas representan uno de los ámbitos más vulnerables a la corrupción en cualquier sistema democrático. En Argentina, esta problemática adquiere dimensiones particulares que requieren soluciones innovadoras y adaptadas a nuestra realidad institucional.</p>
      
      <h2>El diagnóstico actual</h2>
      <p>Los datos disponibles muestran que las irregularidades en las contrataciones públicas representan una pérdida significativa de recursos del Estado.</p>
      
      <h2>Experiencias internacionales exitosas</h2>
      <p>Durante mis estudios en Yale, tuve la oportunidad de analizar sistemas de contratación pública de países como Estonia, Corea del Sur y Chile, que han implementado reformas exitosas en esta materia.</p>
      
      <h3>Digitalización integral</h3>
      <p>La implementación de plataformas digitales que permitan el seguimiento en tiempo real de todo el proceso de contratación ha demostrado ser una herramienta fundamental para reducir la discrecionalidad y aumentar la transparencia.</p>
      
      <h3>Participación ciudadana</h3>
      <p>Los mecanismos de control social, incluyendo la posibilidad de que organizaciones de la sociedad civil actúen como veedores en procesos de contratación, han mostrado resultados prometedores.</p>
      
      <h2>Propuestas para Argentina</h2>
      <p>Basándose en estas experiencias, propongo un conjunto de reformas que podrían implementarse de manera gradual:</p>
      
      <ol>
        <li><strong>Portal único de contrataciones:</strong> Centralización de toda la información en una plataforma accesible al público.</li>
        <li><strong>Algoritmos de detección:</strong> Uso de inteligencia artificial para identificar patrones sospechosos.</li>
        <li><strong>Fortalecimiento de los órganos de control:</strong> Dotación de recursos y herramientas adecuadas.</li>
      </ol>
      
      <p>La lucha contra la corrupción en las contrataciones públicas no es solo una cuestión técnica, sino un imperativo democrático que requiere voluntad política y compromiso social.</p>
    `,
    date: "2025-01-15",
    readTime: "8 min",
    category: "Derecho Público",
    image: "/placeholder.svg?height=400&width=800",
    views: "1.8K",
    tags: ["corrupción", "contrataciones públicas", "transparencia"],
  },
}

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
      "Preparando el análisis semanal desde la biblioteca. Esta semana: reformas institucionales que no pueden esperar más.",
    date: "2025-01-15",
    engagement: "289 likes, 34 comentarios",
  },
]

interface ArticlePageProps {
  params: {
    slug: string
  }
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const [freeArticlesRead, setFreeArticlesRead] = useState(0)
  const [showPaywall, setShowPaywall] = useState(false)
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const article = articlesData[params.slug as keyof typeof articlesData]

  useEffect(() => {
    const stored = localStorage.getItem("freeArticlesRead")
    if (stored) {
      setFreeArticlesRead(Number.parseInt(stored))
    }

    // Verificar si el usuario puede leer el artículo
    if (!article) return

    const currentCount = stored ? Number.parseInt(stored) : 0
    if (currentCount >= 3) {
      setShowPaywall(true)
    }
  }, [article])

  const handleSubscribe = () => {
    setIsSubscriptionOpen(true)
    setShowPaywall(false)
  }

  const shareOnTwitter = () => {
    if (!article) return
    const text = encodeURIComponent(`${article.title} por @nataliavolosin`)
    const url = encodeURIComponent(window.location.href)
    const twitterUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`
    window.open(twitterUrl, "_blank", "width=550,height=420")
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Artículo no encontrado</h1>
          <Link href="/">
            <Button>Volver al inicio</Button>
          </Link>
        </div>
      </div>
    )
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
              <Link href="/">
                <h1 className="text-3xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
                  Natalia Volosin
                </h1>
              </Link>
              <div className="hidden md:block text-sm text-gray-600">
                "Pensar es urgente" - Portal de Análisis Jurídico y Político
              </div>
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
            <Link href="/" className="text-gray-700 hover:text-red-600 font-medium">
              INICIO
            </Link>
            <Link href="/sobre-mi" className="text-gray-700 hover:text-red-600 font-medium">
              QUIÉN
            </Link>
            <Link href="/newsletter" className="text-gray-700 hover:text-red-600 font-medium">
              LA JUSTA
            </Link>
            <Link href="/suscripcion" className="text-gray-700 hover:text-red-600 font-medium">
              POR QUÉ
            </Link>
            <Link href="/videos" className="text-gray-700 hover:text-red-600 font-medium">
              VIDEOS
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
          {/* Article Content */}
          <div className="lg:col-span-3">
            <article className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Article Header */}
              <div className="relative">
                <Image
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  width={800}
                  height={400}
                  className="w-full h-64 md:h-96 object-cover"
                />
                <div className="absolute top-4 left-4">
                  {article.tags.map((tag, index) => (
                    <TagBadge key={tag} index={index} className="text-sm">
                      {tag}
                    </TagBadge>
                  ))}
                </div>
              </div>

              <div className="p-8">
                <header className="mb-8">
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{article.title}</h1>
                  <p className="text-xl text-gray-600 mb-6">{article.excerpt}</p>

                  <div className="flex items-center justify-between text-sm text-gray-500 pb-6 border-b">
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center">
                        <Image
                          src="https://s3.us-east-1.amazonaws.com/nataliavolosin.com.ar/natalia-volosin.jpg"
                          alt="Natalia Volosin"
                          width={40}
                          height={40}
                          className="rounded-full mr-3"
                        />
                        <div>
                          <p className="font-medium text-gray-900">Natalia Volosin</p>
                          <p className="text-gray-500">Doctora en Derecho (Yale) • Especialista en Derecho Público</p>
                        </div>
                      </div>
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(article.date).toLocaleDateString("es-AR")}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {article.readTime}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {article.views}
                      </span>
                      <Button variant="outline" size="sm" onClick={shareOnTwitter}>
                        <Share2 className="w-4 h-4 mr-2" />
                        Compartir en X
                      </Button>
                    </div>
                  </div>
                </header>

                {/* Article Body */}
                {!showPaywall ? (
                  <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: article.content }} />
                ) : (
                  <div className="text-center py-12">
                    <div className="bg-blue-50 p-8 rounded-lg max-w-md mx-auto">
                      <h3 className="text-xl font-bold text-blue-900 mb-4">Contenido Premium</h3>
                      <p className="text-blue-800 mb-6">
                        Has alcanzado el límite de artículos gratuitos. Suscríbete para continuar leyendo este y todos
                        los demás artículos.
                      </p>
                      <Button onClick={handleSubscribe} className="w-full bg-blue-600 hover:bg-blue-700">
                        Suscribirse para continuar
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </article>

            {/* Author Bio */}
            <Card className="mt-8">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Image
                    src="https://s3.us-east-1.amazonaws.com/nataliavolosin.com.ar/natalia-volosin.jpg"
                    alt="Natalia Volosin"
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                  <div>
                    <CardTitle className="text-xl">Natalia Volosin</CardTitle>
                    <p className="text-gray-600">Doctora en Derecho (Yale) • Especialista en Derecho Público</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Profesora en la UBA y especialista en Derecho Público. Experta en corrupción y reformas
                  institucionales. Publica análisis semanales sobre temas jurídicos y políticos.
                </p>
                <div className="flex space-x-3">
                  <Button variant="outline" size="sm" asChild>
                    <Link href="https://x.com/nataliavolosin" target="_blank">
                      <Twitter className="w-4 h-4 mr-2" />
                      Seguir en X
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="https://www.instagram.com/nataliavolosin" target="_blank">
                      <Instagram className="w-4 h-4 mr-2" />
                      Seguir en Instagram
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
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
                  <Button variant="outline" size="sm" asChild className="flex-1 bg-transparent">
                    <Link href="https://x.com/nataliavolosin" target="_blank">
                      Ver X
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild className="flex-1 bg-transparent">
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
              <p className="text-gray-300 text-sm mb-4">"Pensar es urgente" - Portal de análisis independiente</p>
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
                  <Link href="/" className="hover:text-white">
                    La Justa
                  </Link>
                </li>
                <li>
                  <Link href="/newsletter" className="hover:text-white">
                    Newsletter
                  </Link>
                </li>
                <li>
                  <Link href="/sobre-mi" className="hover:text-white">
                    Sobre mí
                  </Link>
                </li>
                <li>
                  <Link href="/suscripcion" className="hover:text-white">
                    Suscripción
                  </Link>
                </li>
                <li>
                  <Link href="/videos" className="hover:text-white">
                    Videos
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
              </ul>
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
