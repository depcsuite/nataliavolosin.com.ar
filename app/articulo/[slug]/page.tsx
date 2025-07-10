"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ArrowRight, Calendar, Clock, Eye, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { notFound } from "next/navigation"
import { findArticleBySlug } from "@/lib/article-data"

interface PageProps {
  params: {
    slug: string
  }
}

// Most read articles for sidebar
const mostReadArticles = [
  {
    id: 101,
    title: "Fiscal pide prisión preventiva para ex funcionario",
    slug: "fiscal-pide-prision-preventiva",
    date: "2025-01-10",
  },
  {
    id: 102,
    title: "Diputados aprueban proyecto de transparencia",
    slug: "diputados-aprueban-proyecto-transparencia",
    date: "2025-01-08",
  },
  {
    id: 103,
    title: "Nuevo escándalo en contrataciones públicas",
    slug: "nuevo-escandalo-contrataciones-publicas",
    date: "2025-01-05",
  },
]

export default function ArticlePage({ params }: PageProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Find the article by slug
  const article = findArticleBySlug(params.slug)

  // Scroll listener
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

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Minimalist Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-black">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <Link href="/" className="text-black hover:text-gray-700">
            <h1 className="text-2xl font-bold tracking-tight">NATALIA VOLOSIN</h1>
          </Link>
          <nav className="hidden md:flex space-x-12">
            <Link href="/" className="text-black hover:text-gray-700 font-medium uppercase">
              Inicio
            </Link>
            <Link href="/sobre-mi" className="text-black hover:text-gray-700 font-medium uppercase">
              Quién
            </Link>
            <Link href="/newsletter" className="text-black hover:text-gray-700 font-medium uppercase">
              La Justa
            </Link>
            <Link href="/por-que" className="text-black hover:text-gray-700 font-medium uppercase">
              Por qué
            </Link>
            <Link href="/videos" className="text-black hover:text-gray-700 font-medium uppercase">
              Videos
            </Link>
          </nav>
          <Link href="https://substack.com/@nataliavolosin" target="_blank">
            <Button className="bg-black text-white hover:bg-gray-800 rounded-none px-6 py-3">Suscribirse</Button>
          </Link>
        </div>
      </header>

      {/* Article Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="sticky top-28">
                <h2 className="text-large mb-6">Buscar</h2>

                <div className="mb-8">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                    <Input
                      type="text"
                      placeholder="Buscar..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 py-3 border-black rounded-none w-full"
                    />
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-medium mb-4">Lo más leído</h3>
                  <div className="space-y-6">
                    {mostReadArticles.map((article) => (
                      <div key={article.id} className="border-t border-black pt-4">
                        <Link href={`/articulo/${article.slug}`} className="block hover:underline">
                          <h4 className="text-regular font-medium mb-2">{article.title}</h4>
                          <span className="text-small text-gray-600">
                            {new Date(article.date).toLocaleDateString("es-AR")}
                          </span>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <Link href="https://substack.com/@nataliavolosin" target="_blank">
                    <Button className="w-full bg-black text-white hover:bg-gray-800 rounded-none py-6">
                      Suscribirse al Newsletter
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="md:col-span-3">
              <span className="text-small uppercase border border-black px-3 py-1 inline-block mb-6">
                {article.category}
              </span>

              <h1 className="text-xlarge mb-6">{article.title}</h1>

              <div className="flex items-center space-x-6 text-small text-gray-600 mb-8">
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
                  {article.views} lecturas
                </div>
              </div>

              <div className="mb-12">
                <div className="w-full h-[2px] bg-black mb-12"></div>
                <p className="text-medium font-medium mb-8">{article.excerpt}</p>
                <div className="prose prose-lg max-w-none">
                  <div className="text-regular font-arimo leading-relaxed text-black whitespace-pre-line">
                    {article.content}
                  </div>
                </div>
              </div>

              <div className="border-t border-black pt-8 mt-12">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
                  <div>
                    <h3 className="text-medium mb-2">Compartir artículo</h3>
                    <div className="flex space-x-4">
                      <Button
                        variant="outline"
                        className="border-black rounded-none hover:bg-black hover:text-white bg-transparent"
                      >
                        Twitter
                      </Button>
                      <Button
                        variant="outline"
                        className="border-black rounded-none hover:bg-black hover:text-white bg-transparent"
                      >
                        Facebook
                      </Button>
                      <Button
                        variant="outline"
                        className="border-black rounded-none hover:bg-black hover:text-white bg-transparent"
                      >
                        LinkedIn
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Link href="/newsletter">
                      <Button className="bg-black text-white hover:bg-gray-800 rounded-none px-6 py-3">
                        Más artículos
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="block-large bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-xlarge mb-6">Suscríbete a La Justa</h2>
            <p className="text-medium mb-8">Recibe análisis semanales directamente en tu correo. Sin compromisos.</p>
            <Link href="https://substack.com/@nataliavolosin" target="_blank">
              <Button className="bg-white text-black hover:bg-gray-200 rounded-none px-8 py-6 text-lg">
                Suscribirse Gratis
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white text-black py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-medium mb-6">Natalia Volosin</h3>
              <p className="text-regular mb-4">
                Abogada, consultora, académica y comunicadora. Doctora en Derecho por Yale Law School.
              </p>
            </div>
            <div>
              <h3 className="text-medium mb-6">Contacto</h3>
              <p className="text-regular mb-2">lajusta@nataliavolosin.com</p>
              <p className="text-regular mb-2">comercial@nataliavolosin.com</p>
            </div>
            <div>
              <h3 className="text-medium mb-6">Redes sociales</h3>
              <div className="flex space-x-4">
                <Link href="https://x.com/nataliavolosin" target="_blank" className="text-black hover:text-gray-700">
                  Twitter
                </Link>
                <Link
                  href="https://www.instagram.com/nataliavolosin"
                  target="_blank"
                  className="text-black hover:text-gray-700"
                >
                  Instagram
                </Link>
                <Link
                  href="https://www.tiktok.com/@nataliaavolosin"
                  target="_blank"
                  className="text-black hover:text-gray-700"
                >
                  TikTok
                </Link>
              </div>
            </div>
          </div>
          <Separator className="border-t border-black my-12" />
          <div className="text-center">
            <p className="text-small">© 2025 Natalia Volosin. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
