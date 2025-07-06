"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Twitter,
  Instagram,
  Heart,
  Menu,
  Search,
  TrendingUp,
  Zap,
  ShoppingCart,
  ExternalLink,
  Music,
  Mail,
} from "lucide-react"

const breakingNews = [
  "🔥 Escándalo y suspensión del Juicio por la muerte de Diego Maradona",
  "⚡ Procuración General anuncia reformas en investigaciones económicas",
  "🚨 Debate sobre transparencia en contrataciones públicas gana impulso",
]

export default function AboutPage() {
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
              {/* Enhanced Search */}
              <div className="relative hidden md:block">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-gray w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Buscar noticias..."
                    className="pl-12 pr-4 py-3 w-72 bg-brand-light-gray border-2 border-brand-gray/30 focus:bg-brand-white focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 transition-all duration-300 rounded-xl font-arimo"
                  />
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
              className="text-brand-purple font-arimo font-bold text-base transition-colors tracking-wide"
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
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {/* Unified Hero and About Section */}
            <section className="mb-16">
              <Card className="commercial-shadow border-2 border-brand-gray/20 rounded-3xl overflow-hidden">
                {/* Top part with image, name, title, badges */}
                <div className="bg-gradient-to-br from-brand-purple/10 via-brand-green/20 to-brand-teal/10 p-12">
                  <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
                    {/* Profile Image */}
                    <div className="flex-shrink-0">
                      <Image
                        src="/natalia-volosin.jpg"
                        alt="Natalia Volosin"
                        width={280}
                        height={280}
                        className="rounded-full border-6 border-brand-white commercial-shadow"
                      />
                    </div>

                    {/* Content (Name, Title, Badges) */}
                    <div className="flex-1 text-center lg:text-left">
                      <div className="mb-8">
                        <h1 className="text-5xl lg:text-6xl font-garamond font-medium text-brand-black mb-4">
                          Natalia{" "}
                          <span className="font-script script-enhanced text-6xl lg:text-7xl text-brand-purple">
                            Volosin
                          </span>
                        </h1>
                        <p className="text-xl font-arimo font-medium text-brand-black mb-4 tracking-wide">
                          ABOGADA • CONSULTORA • ACADÉMICA • COMUNICADORA
                        </p>
                        <p className="text-lg font-arimo font-medium text-brand-gray tracking-wide mb-6">
                          LL.M. y J.S.D. por Yale Law School
                        </p>

                        {/* Professional badges */}
                        <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8">
                          <Badge className="bg-brand-purple/20 text-brand-purple border-brand-purple/30 px-4 py-2 text-sm font-arimo font-bold">
                            Yale Law School
                          </Badge>
                          <Badge className="bg-brand-teal/20 text-brand-teal border-brand-teal/30 px-4 py-2 text-sm font-arimo font-bold">
                            Procuración General
                          </Badge>
                          <Badge className="bg-brand-green/20 text-brand-green border-brand-green/30 px-4 py-2 text-sm font-arimo font-bold">
                            Autora
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* "Sobre mí" content block, now full width within the Card */}
                <div className="bg-brand-white/80 backdrop-blur-sm p-8 commercial-shadow -mt-8 rounded-b-3xl">
                  <h2 className="text-3xl font-garamond font-black text-brand-black tracking-wide mb-6 text-center lg:text-left">
                    Sobre mí
                  </h2>

                  <div className="prose prose-lg max-w-none text-left">
                    <p className="text-brand-black font-arimo leading-relaxed mb-6 text-lg">
                      Natalia Volosin es abogada (2004), consultora, académica y comunicadora. Es diploma de honor magna
                      cum laude y class valedictorian, LL.M. (Master of Laws) por Yale Law School en 2009 y J.S.D.
                      (Doctor of the Science of Law) por la misma institución en 2018.
                    </p>
                    <p className="text-brand-black font-arimo leading-relaxed mb-6 text-lg">
                      Se formó como penalista en el estudio Arslanian, Beraldi, Kaminker & Asociados, fue consultora de
                      entidades académicas, organismos públicos, ONGs y organizaciones internacionales y durante 10 años
                      lideró investigaciones complejas de criminalidad económica en la Procuración General de la Nación.
                    </p>
                    <p className="text-brand-black font-arimo leading-relaxed mb-6 text-lg">
                      Fue profesora en la Universidad de Buenos Aires, Universidad Di Tella, Universidad de Palermo,
                      Universidad de San Andrés, Universidad Nacional de La Plata y Universidad Nacional de San Martín.
                    </p>
                    <p className="text-brand-black font-arimo leading-relaxed text-lg">
                      Es autora de numerosos artículos, capítulos de libros e informes sobre corrupción, criminalidad
                      económica y recupero de activos en la Argentina y en el extranjero. Natalia comunica temas
                      jurídicos complejos en formatos accesibles, dirigió un ciclo propio para Infobae bajo el concepto
                      de "Justicia Abierta" y es consultada por medios de comunicación nacionales e internacionales.
                    </p>
                  </div>
                </div>
              </Card>
            </section>

            {/* Advertising Banner - Mid Content */}
            <section className="mb-16">
              <div className="bg-gradient-to-br from-brand-purple/5 to-brand-teal/5 border-2 border-dashed border-brand-purple/20 rounded-2xl p-12 text-center commercial-shadow">
                <p className="text-brand-purple text-lg font-arimo font-bold mb-2">Publicidad</p>
                <p className="text-brand-gray text-sm font-arimo">468x60 - Banner Medio</p>
              </div>
            </section>

            {/* Books Section - Rediseñada como bloques comerciales independientes */}
            <section className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-garamond font-black text-brand-black tracking-wide mb-4">Mis libros</h2>
                <p className="text-xl text-brand-gray font-arimo">
                  En 2019 publicó dos obras fundamentales sobre corrupción en Argentina
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Libro en inglés - Bloque comercial */}
                <div className="bg-gradient-to-br from-brand-purple/10 to-brand-purple/20 border-3 border-brand-purple/30 rounded-3xl p-8 commercial-shadow hover:scale-105 transition-all duration-300 group">
                  <div className="text-center">
                    {/* Imagen del libro - Clickeable */}
                    <div className="mb-6">
                      <Link href="https://www.amazon.com/-/es/Natalia-Volosin-ebook/dp/B07WRMQMKP" target="_blank">
                        <Image
                          src="/corruption-in-argentina.jpg"
                          alt="Corruption in Argentina: Towards an Institutional Approach"
                          width={200}
                          height={267}
                          className="mx-auto rounded-lg commercial-shadow border-4 border-brand-white group-hover:scale-110 transition-transform duration-300 cursor-pointer"
                        />
                      </Link>
                    </div>

                    {/* Título y descripción */}
                    <h3 className="text-2xl font-arimo font-bold text-brand-black mb-3 leading-tight">
                      "Corruption in Argentina: Towards an Institutional Approach"
                    </h3>

                    <div className="bg-brand-white/80 rounded-xl p-4 mb-6">
                      <p className="text-brand-purple font-arimo font-bold text-lg mb-2">ROUTLEDGE • 2019</p>
                      <p className="text-brand-gray font-arimo text-sm leading-relaxed">
                        Una investigación histórica, institucional y sectorial sobre la corrupción estructural en la
                        Argentina. Análisis académico riguroso basado en años de investigación en Yale Law School.
                      </p>
                    </div>

                    {/* Call to action */}
                    <Button
                      className="w-full bg-brand-purple hover:bg-brand-purple/80 text-brand-white font-arimo font-bold py-4 text-lg rounded-xl commercial-shadow hover:scale-105 transition-all duration-300"
                      asChild
                    >
                      <Link href="https://www.amazon.com/-/es/Natalia-Volosin-ebook/dp/B07WRMQMKP" target="_blank">
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        COMPRAR EN AMAZON
                        <ExternalLink className="w-5 h-5 ml-2" />
                      </Link>
                    </Button>

                    {/* Detalles adicionales */}
                    <div className="mt-4 text-xs text-brand-gray font-arimo">⭐ Disponible en formato digital</div>
                  </div>
                </div>

                {/* Libro en español - Bloque comercial */}
                <div className="bg-gradient-to-br from-brand-teal/10 to-brand-teal/20 border-3 border-brand-teal/30 rounded-3xl p-8 commercial-shadow hover:scale-105 transition-all duration-300 group">
                  <div className="text-center">
                    {/* Imagen del libro - Clickeable */}
                    <div className="mb-6">
                      <Link
                        href="https://listado.mercadolibre.com.ar/la-maquina-de-la-corrupcion-natalia-volosin"
                        target="_blank"
                      >
                        <Image
                          src="/libro-maquina-de-corrupcion.webp"
                          alt="La Máquina de la Corrupción"
                          width={200}
                          height={267}
                          className="mx-auto rounded-lg commercial-shadow border-4 border-brand-white group-hover:scale-110 transition-transform duration-300 cursor-pointer"
                        />
                      </Link>
                    </div>

                    {/* Título y descripción */}
                    <h3 className="text-2xl font-arimo font-bold text-brand-black mb-3 leading-tight">
                      "La Máquina de la Corrupción"
                    </h3>

                    <div className="bg-brand-white/80 rounded-xl p-4 mb-6">
                      <p className="text-brand-teal font-arimo font-bold text-lg mb-2">SUDAMERICANA • 2019</p>
                      <p className="text-brand-gray font-arimo text-sm leading-relaxed">
                        Una versión de divulgación en español sobre los mecanismos de corrupción y las herramientas para
                        combatirla. Accesible para el público general argentino.
                      </p>
                    </div>

                    {/* Call to action */}
                    <Button
                      className="w-full bg-brand-teal hover:bg-brand-teal/80 text-brand-white font-arimo font-bold py-4 text-lg rounded-xl commercial-shadow hover:scale-105 transition-all duration-300"
                      asChild
                    >
                      <Link
                        href="https://listado.mercadolibre.com.ar/la-maquina-de-la-corrupcion-natalia-volosin"
                        target="_blank"
                      >
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        COMPRAR EN MERCADOLIBRE
                        <ExternalLink className="w-5 h-5 ml-2" />
                      </Link>
                    </Button>

                    {/* Detalles adicionales */}
                    <div className="mt-4 text-xs text-brand-gray font-arimo">
                      📚 Formato físico • Envío a todo el país
                    </div>
                  </div>
                </div>
              </div>
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

            {/* Mission Statement */}
            <section className="mb-16">
              <Card className="bg-gradient-to-br from-brand-green/20 to-brand-teal/20 border-2 border-brand-green/30 commercial-shadow rounded-2xl">
                <CardHeader className="p-8">
                  <CardTitle className="text-3xl font-garamond font-black text-brand-black tracking-wide mb-4">
                    Mi misión
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <p className="text-brand-black font-arimo leading-relaxed text-lg mb-6">
                    "La Justa" nace de la necesidad de decir lo que, en un sistema estructuralmente injusto y corrupto,
                    pocos tienen incentivos para decir. Mi objetivo es generar contenido independiente, riguroso y
                    accesible sobre los temas que realmente importan.
                  </p>
                  <p className="text-brand-black font-arimo leading-relaxed text-lg">
                    No somos neutrales. No nos da lo mismo la democracia que la dictadura, la libertad que el
                    autoritarismo, la igualdad que la crueldad. Pero nunca te va a manipular, porque sí somos
                    independientes.
                  </p>
                </CardContent>
              </Card>
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
          <div className="lg:col-span-1 space-y-8">
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

            {/* Social Media */}
            <Card className="commercial-shadow rounded-2xl">
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

            {/* Additional Sidebar Ad Space */}
            <div className="bg-gradient-to-br from-brand-teal/10 to-brand-green/10 border-2 border-dashed border-brand-teal/30 rounded-2xl p-8 text-center commercial-shadow">
              <p className="text-brand-teal text-sm font-arimo font-bold mb-2">Publicidad</p>
              <p className="text-brand-gray text-xs font-arimo">300x600 - Rascacielos</p>
            </div>

            {/* Sponsor Banner Sidebar */}
            <div className="bg-gradient-to-br from-brand-purple/10 to-brand-teal/10 border-2 border-dashed border-brand-gray rounded-2xl p-8 text-center commercial-shadow">
              <p className="text-brand-gray text-lg font-arimo font-bold mb-2">Publicidad</p>
              <p className="text-brand-gray text-lg font-arimo font-bold">Aquí va la publicidad</p>
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
