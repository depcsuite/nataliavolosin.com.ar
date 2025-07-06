"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Check,
  Heart,
  Shield,
  Zap,
  TrendingUp,
  Search,
  Menu,
  Twitter,
  Instagram,
  Music,
  Mail,
  ArrowRight,
  BookOpen,
  Award,
  Globe,
} from "lucide-react"

const breakingNews = [
  "🔥 Escándalo y suspensión del Juicio por la muerte de Diego Maradona",
  "⚡ Procuración General anuncia reformas en investigaciones económicas",
  "🚨 Debate sobre transparencia en contrataciones públicas gana impulso",
]

const testimonials = [
  {
    name: "María González",
    role: "Abogada",
    content: "El análisis de Natalia es fundamental para entender la complejidad del sistema judicial argentino.",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Carlos Rodríguez",
    role: "Periodista",
    content: "La Justa es una fuente confiable de información independiente. Su trabajo es imprescindible.",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Ana Martínez",
    role: "Ciudadana",
    content: "Gracias a La Justa puedo entender mejor lo que pasa en nuestro país. Vale la pena apoyarla.",
    avatar: "/placeholder.svg?height=60&width=60",
  },
]

const supportAmounts = [
  {
    amount: "$5.000",
    period: "/mes",
    url: "https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=2c9380849763dae001976bb14ba2031d",
    popular: false,
  },
  {
    amount: "$8.000",
    period: "/mes",
    url: "https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=2c9380849764e81a01976bb1a6e402c6",
    popular: true,
  },
  {
    amount: "$12.000",
    period: "/mes",
    url: "https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=2c9380849763dae001976ec4495d0412",
    popular: false,
  },
  {
    amount: "Otro monto",
    period: "",
    url: "https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=2c938084976a0ea101976bb1fdc400be",
    popular: false,
  },
  {
    amount: "Por año",
    period: "",
    url: "https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=2c9380849764e81a01976bb4934202c7",
    popular: false,
  },
]

export default function SuscripcionPage() {
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

  const scrollToPlans = () => {
    const plansSection = document.getElementById("plans-section")
    if (plansSection) {
      plansSection.scrollIntoView({ behavior: "smooth" })
    }
  }

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
              <Button
                className={`bg-gradient-to-r from-brand-green to-brand-teal hover:from-brand-green/80 hover:to-brand-teal/80 text-brand-black font-arimo font-bold rounded-xl neon-glow transition-all duration-300 ${
                  isScrolled ? "px-4 py-2 text-sm" : "px-6 py-3"
                }`}
                size="lg"
                onClick={scrollToPlans}
              >
                <Heart className="w-5 h-5 mr-2" />
                {isScrolled ? "Bancar a La Justa" : "Quiero bancar a La Justa"}
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
              className="text-brand-purple font-arimo font-bold text-base transition-colors tracking-wide"
            >
              POR QUÉ
            </Link>
            <Link
              href="/videos"
              className="text-brand-black hover:text-brand-teal font-arimo font-bold text-base transition-colors tracking-wide"
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
              <div className="animate-marquee whitespace-nowrap text-lg font-serif serif-elegant font-medium text-brand-black">
                {breakingNews.join(" • ")}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-purple/10 via-brand-white to-brand-teal/10 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <Badge className="bg-brand-green text-brand-black font-arimo font-bold px-4 py-2 text-sm mb-6">
                PERIODISMO INDEPENDIENTE
              </Badge>
              <h1 className="text-4xl md:text-6xl font-garamond font-medium text-brand-black mb-6">
                Sumate a{" "}
                <span className="font-script script-enhanced text-brand-purple text-5xl md:text-7xl">La Justa</span>
              </h1>
              <p className="text-xl md:text-2xl text-brand-gray font-serif serif-elegant mb-8 leading-relaxed font-arimo">
                Tu apoyo hace posible el periodismo independiente que Argentina necesita. Convertite en{" "}
                <span className="font-arimo font-bold text-brand-black">Justiciero</span> y bancá el análisis sin
                compromisos.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                onClick={scrollToPlans}
                className="bg-gradient-to-r from-brand-green to-brand-teal hover:from-brand-green/80 hover:to-brand-teal/80 text-brand-black font-arimo font-bold px-8 py-4 text-lg rounded-xl neon-glow transition-all duration-300 hover:scale-105"
              >
                <Heart className="w-6 h-6 mr-2" />
                Elegir mi aporte
              </Button>
              <Link href="/newsletter">
                <Button
                  variant="outline"
                  className="border-2 border-brand-gray/30 text-brand-black hover:bg-brand-purple/10 font-arimo font-bold px-8 py-4 text-lg rounded-xl bg-transparent"
                >
                  <Mail className="w-6 h-6 mr-2" />
                  Newsletter gratuito
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section
        id="plans-section"
        className="py-16 bg-gradient-to-br from-brand-black via-gray-900 to-brand-black relative overflow-hidden"
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-24 h-24 bg-yellow-400 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-violet-500 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-brand-teal rounded-full blur-2xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="bg-yellow-400 text-black font-arimo font-bold px-4 py-2 text-sm mb-6 rounded-full">
                PLANES DE SUSCRIPCIÓN
              </Badge>
              <h2 className="text-3xl md:text-4xl font-garamond font-medium text-white mb-4">
                Elegí cómo apoyar a{" "}
                <span className="font-script script-enhanced text-yellow-400 text-4xl md:text-5xl">La Justa</span>
              </h2>
              <p className="text-lg text-gray-300 font-serif serif-elegant max-w-2xl mx-auto font-arimo">
                Dos opciones para acompañar el periodismo independiente que Argentina necesita
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* Plan Gratuito */}
              <Card className="relative overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 text-white border-2 border-gray-600 rounded-2xl hover:scale-[1.02] transition-all duration-500 flex flex-col group hover:border-violet-400">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <CardHeader className="text-center p-6 relative z-10">
                  <div className="mb-4">
                    <div className="bg-gradient-to-br from-violet-500/30 to-violet-600/30 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Mail className="w-8 h-8 text-violet-400" />
                    </div>
                    <CardTitle className="text-2xl font-garamond font-medium text-white mb-2">
                      Newsletter Gratuito
                    </CardTitle>
                    <CardDescription className="text-gray-400 font-serif serif-elegant font-arimo">
                      Recibe análisis semanales sin costo
                    </CardDescription>
                  </div>
                  <div className="text-center">
                    <div className="relative">
                      <span className="text-4xl font-arimo font-black text-yellow-400 drop-shadow-lg">GRATIS</span>
                      <div className="absolute -inset-2 bg-yellow-400/20 rounded-lg blur-xl opacity-50"></div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-6 flex-grow flex flex-col relative z-10">
                  <ul className="space-y-3 mb-6 font-arimo flex-grow">
                    <li className="flex items-center group/item">
                      <div className="bg-yellow-400/20 p-1 rounded-full mr-3">
                        <Check className="w-4 h-4 text-yellow-400" />
                      </div>
                      <span className="font-arimo text-gray-300 group-hover/item:text-white transition-colors">
                        Newsletter semanal los viernes
                      </span>
                    </li>
                    <li className="flex items-center group/item">
                      <div className="bg-yellow-400/20 p-1 rounded-full mr-3">
                        <Check className="w-4 h-4 text-yellow-400" />
                      </div>
                      <span className="font-arimo text-gray-300 group-hover/item:text-white transition-colors">
                        Análisis de coyuntura política
                      </span>
                    </li>
                    <li className="flex items-center group/item">
                      <div className="bg-yellow-400/20 p-1 rounded-full mr-3">
                        <Check className="w-4 h-4 text-yellow-400" />
                      </div>
                      <span className="font-arimo text-gray-300 group-hover/item:text-white transition-colors">
                        Acceso a todos los artículos web
                      </span>
                    </li>
                    <li className="flex items-center group/item">
                      <div className="bg-yellow-400/20 p-1 rounded-full mr-3">
                        <Check className="w-4 h-4 text-yellow-400" />
                      </div>
                      <span className="font-arimo text-gray-300 group-hover/item:text-white transition-colors">
                        Sin compromisos
                      </span>
                    </li>
                  </ul>
                  <Link href="https://substack.com/@nataliavolosin" target="_blank" className="block mt-auto">
                    <Button className="w-full bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 text-white font-arimo font-bold py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-violet-500/25">
                      Suscribirse Gratis
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Plan Justiciero */}
              <Card className="relative overflow-hidden bg-gradient-to-br from-black to-gray-900 text-white border-2 border-yellow-400 rounded-2xl hover:scale-[1.02] transition-all duration-500 shadow-[0_0_30px_rgba(250,204,21,0.3)] flex flex-col group hover:shadow-[0_0_50px_rgba(250,204,21,0.5)]">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-transparent"></div>

                {/* Recommended Badge */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
                  <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-arimo font-bold px-4 py-1 text-xs rounded-full shadow-lg">
                    ⭐ RECOMENDADO
                  </Badge>
                </div>

                <CardHeader className="text-center p-6 pt-8 relative z-10">
                  <div className="mb-4">
                    <div className="bg-gradient-to-br from-yellow-400/30 to-yellow-500/30 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Award className="w-8 h-8 text-yellow-400" />
                    </div>
                    <CardTitle className="text-2xl font-garamond font-medium text-white mb-2">Justiciero</CardTitle>
                    <CardDescription className="text-gray-400 font-serif serif-elegant font-arimo">
                      Tu aporte hace posible el periodismo independiente
                    </CardDescription>
                  </div>
                  <div className="text-center">
                    <span className="text-sm font-arimo font-medium text-gray-300 block mb-1">Desde</span>
                    <div className="relative">
                      <div className="text-4xl font-arimo font-black text-white drop-shadow-lg">$5.000</div>
                      <div className="absolute -inset-3 bg-yellow-400/20 rounded-lg blur-xl opacity-50"></div>
                    </div>
                    <span className="text-sm font-arimo font-medium text-gray-400">/mes</span>
                  </div>
                </CardHeader>

                <CardContent className="p-6 flex-grow flex flex-col relative z-10">
                  <ul className="space-y-3 mb-6 font-arimo flex-grow">
                    <li className="flex items-center group/item">
                      <div className="bg-yellow-400/20 p-1 rounded-full mr-3">
                        <Check className="w-4 h-4 text-yellow-400" />
                      </div>
                      <span className="font-arimo text-gray-300 group-hover/item:text-white transition-colors">
                        Todo lo del plan gratuito
                      </span>
                    </li>
                    <li className="flex items-center group/item">
                      <div className="bg-yellow-400/20 p-1 rounded-full mr-3">
                        <Check className="w-4 h-4 text-yellow-400" />
                      </div>
                      <span className="font-arimo text-gray-300 group-hover/item:text-white transition-colors">
                        Apoyas el periodismo independiente
                      </span>
                    </li>
                    <li className="flex items-center group/item">
                      <div className="bg-yellow-400/20 p-1 rounded-full mr-3">
                        <Check className="w-4 h-4 text-yellow-400" />
                      </div>
                      <span className="font-arimo text-gray-300 group-hover/item:text-white transition-colors">
                        Contribuis a la transparencia democrática
                      </span>
                    </li>
                    <li className="flex items-center group/item">
                      <div className="bg-yellow-400/20 p-1 rounded-full mr-3">
                        <Check className="w-4 h-4 text-yellow-400" />
                      </div>
                      <span className="font-arimo text-gray-300 group-hover/item:text-white transition-colors">
                        Formas parte de la comunidad Justiciera
                      </span>
                    </li>
                  </ul>

                  {/* Support Amount Options */}
                  <div className="space-y-2 mt-auto">
                    <div className="text-center mb-3">
                      <span className="text-yellow-400 font-arimo font-bold">Elegí tu aporte:</span>
                    </div>
                    {supportAmounts.map((option, index) => (
                      <Link key={index} href={option.url} target="_blank" className="block">
                        <Button
                          className={`w-full justify-between font-arimo font-bold py-3 rounded-xl transition-all duration-300 hover:scale-[1.02] ${
                            option.popular
                              ? "bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black shadow-[0_0_15px_rgba(250,204,21,0.4)] hover:shadow-[0_0_25px_rgba(250,204,21,0.6)]"
                              : "bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white border border-gray-600 hover:border-gray-500"
                          }`}
                        >
                          <span className="flex items-center text-sm">
                            {option.popular && <span className="mr-2">🔥</span>}
                            {option.amount}
                            {option.period}
                          </span>
                          {option.popular && (
                            <Badge className="bg-black text-yellow-400 text-xs px-2 py-1">POPULAR</Badge>
                          )}
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-12 font-arimo">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 max-w-2xl mx-auto border border-gray-700">
                <p className="text-gray-300 font-serif serif-elegant mb-3">
                  ¿Tenés dudas? Escribinos a{" "}
                  <Link
                    href="mailto:lajusta@nataliavolosin.com"
                    className="text-yellow-400 hover:text-yellow-300 transition-colors font-bold"
                  >
                    lajusta@nataliavolosin.com
                  </Link>
                </p>
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
                  <Shield className="w-4 h-4" />
                  <span className="font-arimo">Todos los pagos son procesados de forma segura por MercadoPago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Support Section */}
      <section className="py-20 bg-brand-light-gray relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-garamond font-medium text-brand-black mb-6">
                ¿Por qué bancar a{" "}
                <span className="font-script script-enhanced text-brand-purple text-4xl md:text-5xl">La Justa</span>?
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div className="relative h-full min-h-[450px]">
                <Image
                  src="https://s3.us-east-1.amazonaws.com/nataliavolosin.com.ar/natalia-volosin.jpg"
                  alt="Natalia Volosin"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-2xl commercial-shadow"
                />
              </div>
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-brand-purple/20 p-3 rounded-full flex-shrink-0 mt-1">
                    <BookOpen className="w-6 h-6 text-brand-purple" />
                  </div>
                  <div>
                    <h3 className="font-garamond font-bold text-brand-black text-xl mb-2">
                      Experiencia y Credibilidad
                    </h3>
                    <p className="text-brand-gray font-arimo text-lg">
                      Doctora en Derecho por Yale, ex Procuradora General Adjunta, con más de 15 años de experiencia en
                      el sistema judicial argentino.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-brand-teal/20 p-3 rounded-full flex-shrink-0 mt-1">
                    <Globe className="w-6 h-6 text-brand-teal" />
                  </div>
                  <div>
                    <h3 className="font-garamond font-bold text-brand-black text-xl mb-2">Perspectiva Internacional</h3>
                    <p className="text-brand-gray font-arimo text-lg">
                      Formación académica internacional que permite analizar los problemas argentinos con una mirada
                      comparada y global.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-brand-green/20 p-3 rounded-full flex-shrink-0 mt-1">
                    <Shield className="w-6 h-6 text-brand-green" />
                  </div>
                  <div>
                    <h3 className="font-garamond font-bold text-brand-black text-xl mb-2">Independencia Total</h3>
                    <p className="text-brand-gray font-arimo text-lg">
                      Sin compromisos políticos ni económicos. Financiado únicamente por lectores que valoran el
                      periodismo independiente.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-brand-white rounded-2xl p-10 commercial-shadow font-arimo relative">
              <div className="absolute -top-6 -left-6 text-brand-purple/10">
                <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9.983 3v7.391A3.285 3.285 0 0 0 7.393 13a3.285 3.285 0 0 0-3.286-3.286A3.285 3.285 0 0 0 .821 13a3.285 3.285 0 0 0 3.286 3.286 3.285 3.285 0 0 0 3.286-3.286V3H9.983zM21.983 3v7.391A3.285 3.285 0 0 0 19.393 13a3.285 3.285 0 0 0-3.286-3.286A3.285 3.285 0 0 0 12.821 13a3.285 3.285 0 0 0 3.286 3.286 3.285 3.285 0 0 0 3.286-3.286V3h2.586z" />
                </svg>
              </div>
              <blockquote className="text-center">
                <p className="text-xl md:text-2xl font-serif serif-elegant text-brand-black mb-6 italic leading-relaxed">
                  "El periodismo independiente es fundamental para la democracia. Tu apoyo hace posible que podamos
                  seguir investigando, analizando y contando la verdad sin compromisos."
                </p>
                <footer className="flex items-center justify-center space-x-4 mt-8">
                  <Image
                    src="https://s3.us-east-1.amazonaws.com/nataliavolosin.com.ar/natalia-volosin.jpg"
                    alt="Natalia Volosin"
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div className="text-left">
                    <div className="font-arimo font-bold text-brand-black">Natalia Volosin</div>
                    <div className="text-brand-gray font-serif serif-elegant">Fundadora de La Justa</div>
                  </div>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-brand-black via-gray-900 to-brand-black relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-40 h-40 bg-brand-purple rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-brand-teal rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-10 w-24 h-24 bg-yellow-400 rounded-full blur-2xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="bg-gradient-to-r from-brand-purple to-brand-teal text-white font-arimo font-bold px-6 py-3 text-sm mb-8 rounded-full shadow-lg">
                TESTIMONIOS
              </Badge>
              <h2 className="text-3xl md:text-4xl font-garamond font-medium text-white mb-6">
                Lo que dicen los{" "}
                <span className="font-script script-enhanced text-yellow-400 text-4xl md:text-5xl">Justicieros</span>
              </h2>
              <p className="text-gray-400 font-serif serif-elegant text-lg max-w-2xl mx-auto font-arimo">
                Testimonios reales de quienes apoyan el periodismo independiente
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card
                  key={index}
                  className="relative overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-700 rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 group hover:border-yellow-400/50 hover:shadow-[0_0_20px_rgba(250,204,21,0.2)]"
                >
                  {/* Background glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Quote decoration */}
                  <div className="absolute -top-2 -right-2 text-yellow-400/20 group-hover:text-yellow-400/40 transition-colors duration-300">
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9.983 3v7.391A3.285 3.285 0 0 0 7.393 13a3.285 3.285 0 0 0-3.286-3.286A3.285 3.285 0 0 0 .821 13a3.285 3.285 0 0 0 3.286 3.286 3.285 3.285 0 0 0 3.286-3.286V3H9.983zM21.983 3v7.391A3.285 3.285 0 0 0 19.393 13a3.285 3.285 0 0 0-3.286-3.286A3.285 3.285 0 0 0 12.821 13a3.285 3.285 0 0 0 3.286 3.286 3.285 3.285 0 0 0 3.286-3.286V3h2.586z" />
                    </svg>
                  </div>

                  <CardContent className="p-0 font-arimo relative z-10">
                    <p className="text-gray-300 font-serif serif-elegant mb-6 italic text-lg leading-relaxed group-hover:text-white transition-colors duration-300">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <Image
                          src={testimonial.avatar || "/placeholder.svg"}
                          alt={testimonial.name}
                          width={50}
                          height={50}
                          className="rounded-full border-2 border-gray-600 group-hover:border-yellow-400/50 transition-colors duration-300"
                        />
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <div>
                        <div className="font-arimo font-bold text-white text-sm group-hover:text-yellow-400 transition-colors duration-300">
                          {testimonial.name}
                        </div>
                        <div className="text-gray-400 font-serif serif-elegant text-xs group-hover:text-gray-300 transition-colors duration-300">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Call to action at bottom of testimonials */}
            <div className="text-center mt-12">
              <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
                <p className="text-white font-serif serif-elegant text-lg mb-4">
                  Sumate a los <span className="font-script script-enhanced text-yellow-400 text-xl">Justicieros</span>{" "}
                  que ya apoyan el periodismo independiente
                </p>
                <Button
                  onClick={scrollToPlans}
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-arimo font-bold px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Convertirme en Justiciero
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-brand-purple/10 via-brand-white to-brand-teal/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-garamond font-medium text-brand-black mb-6">
              Convertite en{" "}
              <span className="font-script script-enhanced text-brand-purple text-4xl md:text-5xl">Justiciero</span> hoy
            </h2>
            <p className="text-xl text-brand-gray font-serif serif-elegant mb-8 font-arimo">
              Sumate a quienes creen que el periodismo independiente es fundamental para la democracia argentina.
            </p>
            <Button
              onClick={scrollToPlans}
              className="bg-gradient-to-r from-brand-green to-brand-teal hover:from-brand-green/80 hover:to-brand-teal/80 text-brand-black font-arimo font-bold px-10 py-4 text-xl rounded-xl neon-glow transition-all duration-300 hover:scale-105"
            >
              <Heart className="w-7 h-7 mr-3" />
              Elegir mi aporte
            </Button>
          </div>
        </div>
      </section>

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
