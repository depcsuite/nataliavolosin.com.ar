"use client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Clock, Eye, Twitter, Facebook, Linkedin } from "lucide-react"
import { notFound } from "next/navigation"

// This would typically come from a database or CMS
const articles = {
  "crisis-institucional-reformas-estructurales-argentina": {
    title: "Crisis institucional: El momento decisivo para las reformas estructurales en Argentina",
    excerpt:
      "Un análisis exhaustivo sobre la coyuntura política actual y las oportunidades únicas que se presentan para implementar cambios profundos en el sistema institucional argentino.",
    content: `La Argentina atraviesa una crisis institucional profunda que, paradójicamente, abre una ventana de oportunidad única para implementar reformas estructurales que durante décadas fueron postergadas.

En este contexto, se hace evidente la necesidad de repensar no solo las instituciones políticas, sino también los mecanismos de control y transparencia que permitan sostener un sistema democrático sólido y confiable.

La convergencia de múltiples crisis - económica, social y política - genera un escenario donde el statu quo se vuelve insostenible, creando las condiciones necesarias para que reformas antes impensables se vuelvan no solo posibles, sino urgentes.

## Los pilares de la reforma institucional

1. **Transparencia y acceso a la información**: La implementación de sistemas robustos de transparencia no es solo una demanda ciudadana, sino una necesidad sistémica para restaurar la confianza en las instituciones.

2. **Modernización del sistema judicial**: La independencia judicial y la eficiencia en los procesos son elementos fundamentales para cualquier proyecto de país serio.

3. **Reforma del sistema electoral**: Las reglas de juego democráticas deben evolucionar para garantizar una representación más efectiva y legítima.

## Oportunidades y desafíos

La crisis actual presenta tanto oportunidades como desafíos significativos. Por un lado, existe una mayor conciencia ciudadana sobre la necesidad de cambio; por otro, los intereses creados y las resistencias corporativas representan obstáculos considerables.

La experiencia internacional demuestra que las reformas más exitosas son aquellas que logran articular un consenso amplio y sostenido en el tiempo, más allá de los cambios de gobierno.

## Conclusiones

El momento actual representa una oportunidad histórica para sentar las bases de un sistema institucional más sólido y transparente. Sin embargo, esta oportunidad requiere de liderazgo político, consenso social y una visión de largo plazo que trascienda los ciclos electorales.

La implementación exitosa de estas reformas determinará en gran medida el futuro institucional del país y la calidad de su democracia en las próximas décadas.`,
    date: "2025-01-16",
    readTime: "15 min",
    category: "Análisis Político",
    image: "/placeholder.svg?height=400&width=600",
    views: "2.3K",
    author: {
      name: "Natalia Volosin",
      avatar: "/natalia-volosin.jpg",
      bio: "Abogada, consultora, académica y comunicadora. LL.M. y J.S.D. por Yale Law School.",
    },
  },
}

interface PageProps {
  params: {
    slug: string
  }
}

export default function ArticlePage({ params }: PageProps) {
  const article = articles[params.slug as keyof typeof articles]

  if (!article) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-brand-light-gray">
      {/* Header - Simplified */}
      <header className="bg-brand-white border-b border-brand-gray/20 commercial-shadow">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <h1 className="text-2xl font-garamond font-medium text-brand-black hover:text-brand-purple transition-colors">
                Natalia <span className="font-script script-enhanced text-brand-purple text-3xl">Volosin</span>
              </h1>
            </Link>
            <Link href="/">
              <Button variant="outline" className="bg-transparent">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <div className="mb-8">
            <Badge className="mb-4">{article.category}</Badge>
            <h1 className="text-3xl md:text-4xl font-garamond font-medium text-brand-black mb-4 leading-tight">
              {article.title}
            </h1>
            <p className="text-xl text-brand-gray font-arimo leading-relaxed mb-6">{article.excerpt}</p>

            {/* Article Meta */}
            <div className="flex items-center justify-between border-b border-brand-gray/20 pb-6 mb-8">
              <div className="flex items-center space-x-4">
                <Image
                  src={article.author.avatar || "/placeholder.svg"}
                  alt={article.author.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <h3 className="font-garamond font-medium text-brand-black">{article.author.name}</h3>
                  <p className="text-sm text-brand-gray font-arimo">{article.author.bio}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm text-brand-gray">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(article.date).toLocaleDateString("es-AR")}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {article.readTime}
                </div>
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  {article.views}
                </div>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="grid lg:grid-cols-4 gap-8">
            <article className="lg:col-span-3">
              <div className="prose prose-lg max-w-none">
                <Image
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  width={800}
                  height={400}
                  className="w-full h-64 object-cover rounded-2xl mb-8"
                />

                <div className="font-arimo leading-relaxed text-brand-black whitespace-pre-line">{article.content}</div>
              </div>

              {/* Share Section */}
              <div className="mt-12 pt-8 border-t border-brand-gray/20">
                <h3 className="font-garamond font-medium text-brand-black mb-4">Compartir artículo</h3>
                <div className="flex space-x-4">
                  <Button variant="outline" size="sm" className="bg-transparent">
                    <Twitter className="w-4 h-4 mr-2" />
                    Twitter
                  </Button>
                  <Button variant="outline" size="sm" className="bg-transparent">
                    <Facebook className="w-4 h-4 mr-2" />
                    Facebook
                  </Button>
                  <Button variant="outline" size="sm" className="bg-transparent">
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </Button>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-6">
              {/* Author Card */}
              <Card className="commercial-shadow rounded-2xl">
                <CardHeader className="text-center">
                  <Image
                    src={article.author.avatar || "/placeholder.svg"}
                    alt={article.author.name}
                    width={80}
                    height={80}
                    className="rounded-full mx-auto mb-4"
                  />
                  <CardTitle className="font-garamond">{article.author.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-brand-gray font-arimo text-sm mb-4">{article.author.bio}</p>
                  <Button className="w-full" asChild>
                    <Link href="/sobre-mi">Ver perfil completo</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Newsletter Signup */}
              <Card className="bg-gradient-to-br from-brand-green/40 to-brand-green/60 border-2 border-brand-green commercial-shadow rounded-2xl">
                <CardHeader className="text-center">
                  <h3 className="font-garamond text-brand-black mb-2">
                    Suscríbete a <span className="font-script script-enhanced text-brand-purple">La Justa</span>
                  </h3>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-brand-black font-arimo mb-4">Recibe análisis semanales en tu correo</p>
                  <Button className="w-full bg-brand-black hover:bg-brand-gray text-brand-white">
                    Suscribirse Gratis
                  </Button>
                </CardContent>
              </Card>

              {/* Ad Space */}
              <div className="bg-gradient-to-br from-brand-gray/10 to-brand-light-gray border-2 border-dashed border-brand-gray/30 rounded-2xl p-6 text-center commercial-shadow">
                <p className="text-brand-gray text-sm font-arimo font-bold mb-2">Publicidad</p>
                <p className="text-brand-gray text-xs font-arimo serif-elegant">300x250</p>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  )
}
