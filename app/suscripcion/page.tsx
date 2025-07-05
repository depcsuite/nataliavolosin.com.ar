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
  Star,
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
                    placeholder="Buscar noticias..."
                    className="pl-12 pr-4 py-3 w-72 bg-brand-light-gray border-2 border-brand-gray/30 focus:bg-brand-white focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 transition-all duration-300 rounded-xl font-sans sans-modern"
                  />
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
                onClick={scrollToPlans}
              >
                <Star className="w-5 h-5 mr-2" />
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
              className="text-brand-purple font-sans sans-modern font-bold text-base transition-colors tracking-wide"
            >
              POR QUÉ
            </Link>
            <Link
              href="/videos"
              className="text-brand-black hover:text-brand-teal font-sans sans-modern font-bold text-base transition-colors tracking-wide"
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

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-purple/10 via-brand-white to-brand-teal/10 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <Badge className="bg-brand-green text-brand-black font-sans sans-modern font-bold px-4 py-2 text-sm mb-6">
                PERIODISMO INDEPENDIENTE
              </Badge>
              <h1 className="text-4xl md:text-6xl font-serif serif-elegant font-medium text-brand-black mb-6">
                Sumate a{" "}
                <span className="font-script script-enhanced text-brand-purple text-5xl md:text-7xl">La Justa</span>
              </h1>
              <p className="text-xl md:text-2xl text-brand-gray font-serif serif-elegant mb-8 leading-relaxed">
                Tu apoyo hace posible el periodismo independiente que Argentina necesita. Convertite en{" "}
                <span className="font-sans sans-modern font-bold text-brand-black">Justiciero</span> y bancá el análisis
                sin compromisos.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                onClick={scrollToPlans}
                className="bg-gradient-to-r from-brand-green to-brand-teal hover:from-brand-green/80 hover:to-brand-teal/80 text-brand-black font-sans sans-modern font-bold px-8 py-4 text-lg rounded-xl neon-glow transition-all duration-300 hover:scale-105"
              >
                <Heart className="w-6 h-6 mr-2" />
                Elegir mi aporte
              </Button>
              <Link href="/newsletter">
                <Button
                  variant="outline"
                  className="border-2 border-brand-gray/30 text-brand-black hover:bg-brand-purple/10 font-sans sans-modern font-bold px-8 py-4 text-lg rounded-xl bg-transparent"
                >
                  <Mail className="w-6 h-6 mr-2" />
                  Newsletter gratuito
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Advertising Banner - After Hero */}
      <section className="py-12 bg-brand-light-gray">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-brand-gray/10 to-brand-light-gray border-2 border-dashed border-brand-gray/30 rounded-2xl p-8 text-center commercial-shadow">
            <p className="text-brand-gray text-sm font-sans sans-modern font-bold mb-2">Espacio Publicitario</p>
            <p className="text-brand-gray text-xs font-serif serif-elegant">728x90 - Banner Superior</p>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section id="plans-section" className="py-20 bg-brand-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif serif-elegant font-medium text-brand-black mb-6">
                Elegí cómo apoyar a{" "}
                <span className="font-script script-enhanced text-brand-purple text-4xl md:text-5xl">La Justa</span>
              </h2>
              <p className="text-xl text-brand-gray font-serif serif-elegant max-w-3xl mx-auto">
                Dos opciones para acompañar el periodismo independiente que Argentina necesita
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Plan Gratuito */}
              <Card className="relative overflow-hidden commercial-shadow border-2 border-brand-gray/20 rounded-2xl hover:scale-[1.02] transition-all duration-300">
                <CardHeader className="text-center p-8 bg-gradient-to-br from-brand-light-gray to-brand-white">
                  <div className="mb-4">
                    <div className="bg-brand-gray/20 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4">
                      <Mail className="w-8 h-8 text-brand-gray" />
                    </div>
                    <CardTitle className="text-2xl font-serif serif-elegant font-medium text-brand-black mb-2">
                      Newsletter Gratuito
                    </CardTitle>
                    <CardDescription className="text-brand-gray font-serif serif-elegant">
                      Recibe análisis semanales sin costo
                    </CardDescription>
                  </div>
                  <div className="text-center">
                    <span className="text-4xl font-sans sans-modern font-black text-brand-black">GRATIS</span>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center">
                      <Check className="w-5 h-5 text-brand-green mr-3 flex-shrink-0" />
                      <span className="font-serif serif-elegant text-brand-black">Newsletter semanal los viernes</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="w-5 h-5 text-brand-green mr-3 flex-shrink-0" />
                      <span className="font-serif serif-elegant text-brand-black">Análisis de coyuntura política</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="w-5 h-5 text-brand-green mr-3 flex-shrink-0" />
                      <span className="font-serif serif-elegant text-brand-black">
                        Acceso a todos los artículos web
                      </span>
                    </li>
                    <li className="flex items-center">
                      <Check className="w-5 h-5 text-brand-green mr-3 flex-shrink-0" />
                      <span className="font-serif serif-elegant text-brand-black">Sin compromisos</span>
                    </li>
                  </ul>
                  <Link href="/newsletter" className="block">
                    <Button className="w-full bg-brand-gray hover:bg-brand-black text-brand-white font-sans sans-modern font-bold py-4 rounded-xl text-lg transition-all duration-300">
                      Suscribirse Gratis
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Plan Justiciero */}
              <Card className="relative overflow-hidden commercial-shadow border-2 border-brand-green rounded-2xl hover:scale-[1.02] transition-all duration-300 neon-glow">
                <div className="absolute top-4 right-4">
                  <Badge className="bg-brand-green text-brand-black font-sans sans-modern font-bold">RECOMENDADO</Badge>
                </div>
                <CardHeader className="text-center p-8 bg-gradient-to-br from-brand-green/20 to-brand-teal/20">
                  <div className="mb-4">
                    <div className="bg-brand-green/30 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4">
                      <Award className="w-8 h-8 text-brand-green" />
                    </div>
                    <CardTitle className="text-2xl font-serif serif-elegant font-medium text-brand-black mb-2">
                      Justiciero
                    </CardTitle>
                    <CardDescription className="text-brand-gray font-serif serif-elegant">
                      Tu aporte hace posible el periodismo independiente
                    </CardDescription>
                  </div>
                  <div className="text-center">
                    <span className="text-lg font-sans sans-modern font-medium text-brand-black">Desde</span>
                    <div className="text-4xl font-sans sans-modern font-black text-brand-black">$5.000</div>
                    <span className="text-lg font-sans sans-modern font-medium text-brand-gray">/mes</span>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center">
                      <Check className="w-5 h-5 text-brand-green mr-3 flex-shrink-0" />
                      <span className="font-serif serif-elegant text-brand-black">Todo lo del plan gratuito</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="w-5 h-5 text-brand-green mr-3 flex-shrink-0" />
                      <span className="font-serif serif-elegant text-brand-black">
                        Apoyas el periodismo independiente
                      </span>
                    </li>
                    <li className="flex items-center">
                      <Check className="w-5 h-5 text-brand-green mr-3 flex-shrink-0" />
                      <span className="font-serif serif-elegant text-brand-black">
                        Contribuis a la transparencia democrática
                      </span>
                    </li>
                    <li className="flex items-center">
                      <Check className="w-5 h-5 text-brand-green mr-3 flex-shrink-0" />
                      <span className="font-serif serif-elegant text-brand-black">
                        Formas parte de la comunidad Justiciera
                      </span>
                    </li>
                  </ul>

                  {/* Support Amount Options */}
                  <div className="space-y-3">
                    {supportAmounts.map((option, index) => (
                      <Link key={index} href={option.url} target="_blank" className="block">
                        <Button
                          className={`w-full justify-between font-sans sans-modern font-bold py-4 rounded-xl text-lg transition-all duration-300 hover:scale-[1.02] ${
                            option.popular
                              ? "bg-gradient-to-r from-brand-green to-brand-teal text-brand-black neon-glow"
                              : "bg-brand-light-gray hover:bg-brand-green/20 text-brand-black border-2 border-brand-gray/30"
                          }`}
                        >
                          <span>
                            {option.amount}
                            {option.period}
                          </span>
                          {option.popular && <Badge className="bg-brand-black text-brand-white text-xs">POPULAR</Badge>}
                          <ArrowRight className="w-5 h-5" />
                        </Button>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-12">
              <p className="text-brand-gray font-serif serif-elegant mb-4">
                ¿Tenés dudas? Escribinos a{" "}
                <Link href="mailto:lajusta@nataliavolosin.com" className="text-brand-purple hover:underline">
                  lajusta@nataliavolosin.com
                </Link>
              </p>
              <p className="text-sm text-brand-gray font-sans sans-modern">
                Todos los pagos son procesados de forma segura por MercadoPago
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Advertising Banner - Between Sections */}
      <section className="py-12 bg-brand-white">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-brand-purple/5 to-brand-teal/5 border-2 border-dashed border-brand-purple/20 rounded-2xl p-12 text-center commercial-shadow max-w-4xl mx-auto">
            <p className="text-brand-purple text-lg font-sans sans-modern font-bold mb-2">Publicidad</p>
            <p className="text-brand-gray text-sm font-serif serif-elegant">468x60 - Banner Medio</p>
          </div>
        </div>
      </section>

      {/* Why Support Section */}
      <section className="py-20 bg-brand-light-gray relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif serif-elegant font-medium text-brand-black mb-6">
                ¿Por qué bancar a{" "}
                <span className="font-script script-enhanced text-brand-purple text-4xl md:text-5xl">La Justa</span>?
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <Image
                  src="https://s3.us-east-1.amazonaws.com/nataliavolosin.com.ar/natalia-volosin.jpg"
                  alt="Natalia Volosin"
                  width={400}
                  height={400}
                  className="rounded-2xl commercial-shadow"
                />
              </div>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-brand-purple/20 p-3 rounded-full flex-shrink-0">
                    <BookOpen className="w-6 h-6 text-brand-purple" />
                  </div>
                  <div>
                    <h3 className="font-sans sans-modern font-bold text-brand-black text-lg mb-2">
                      Experiencia y Credibilidad
                    </h3>
                    <p className="text-brand-gray font-serif serif-elegant">
                      Doctora en Derecho por Yale, ex Procuradora General Adjunta, con más de 15 años de experiencia en
                      el sistema judicial argentino.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-brand-teal/20 p-3 rounded-full flex-shrink-0">
                    <Globe className="w-6 h-6 text-brand-teal" />
                  </div>
                  <div>
                    <h3 className="font-sans sans-modern font-bold text-brand-black text-lg mb-2">
                      Perspectiva Internacional
                    </h3>
                    <p className="text-brand-gray font-serif serif-elegant">
                      Formación académica internacional que permite analizar los problemas argentinos con una mirada
                      comparada y global.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-brand-green/20 p-3 rounded-full flex-shrink-0">
                    <Shield className="w-6 h-6 text-brand-green" />
                  </div>
                  <div>
                    <h3 className="font-sans sans-modern font-bold text-brand-black text-lg mb-2">
                      Independencia Total
                    </h3>
                    <p className="text-brand-gray font-serif serif-elegant">
                      Sin compromisos políticos ni económicos. Financiado únicamente por lectores que valoran el
                      periodismo independiente.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-brand-white rounded-2xl p-8 commercial-shadow">
              <blockquote className="text-center">
                <p className="text-xl md:text-2xl font-serif serif-elegant text-brand-black mb-6 italic">
                  "El periodismo independiente es fundamental para la democracia. Tu apoyo hace posible que podamos
                  seguir investigando, analizando y contando la verdad sin compromisos."
                </p>
                <footer className="flex items-center justify-center space-x-4">
                  <Image
                    src="https://s3.us-east-1.amazonaws.com/nataliavolosin.com.ar/natalia-volosin.jpg"
                    alt="Natalia Volosin"
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div className="text-left">
                    <div className="font-sans sans-modern font-bold text-brand-black">Natalia Volosin</div>
                    <div className="text-brand-gray font-serif serif-elegant">Fundadora de La Justa</div>
                  </div>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>

        {/* Floating Sidebar Ads - Add to the Why Support Section */}
        <div className="hidden lg:block absolute right-4 top-1/2 transform -translate-y-1/2 space-y-4">
          <div className="bg-gradient-to-br from-brand-teal/10 to-brand-green/10 border-2 border-dashed border-brand-teal/30 rounded-xl p-4 text-center commercial-shadow w-32">
            <p className="text-brand-teal text-xs font-sans sans-modern font-bold mb-1">Ad</p>
            <p className="text-brand-gray text-xs font-serif serif-elegant">120x240</p>
          </div>
          <div className="bg-gradient-to-br from-brand-purple/10 to-brand-gray/10 border-2 border-dashed border-brand-purple/30 rounded-xl p-4 text-center commercial-shadow w-32">
            <p className="text-brand-purple text-xs font-sans sans-modern font-bold mb-1">Banner</p>
            <p className="text-brand-gray text-xs font-serif serif-elegant">120x240</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-brand-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif serif-elegant font-medium text-brand-black mb-6">
                Lo que dicen los{" "}
                <span className="font-script script-enhanced text-brand-purple text-4xl md:text-5xl">Justicieros</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="commercial-shadow rounded-2xl border-2 border-brand-gray/20">
                  <CardContent className="p-6">
                    <p className="text-brand-gray font-serif serif-elegant mb-4 italic">"{testimonial.content}"</p>
                    <div className="flex items-center space-x-3">
                      <Image
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div>
                        <div className="font-sans sans-modern font-bold text-brand-black text-sm">
                          {testimonial.name}
                        </div>
                        <div className="text-brand-gray font-serif serif-elegant text-xs">{testimonial.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Advertising Banner - Before CTA */}
      <section className="py-12 bg-brand-light-gray">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-brand-green/10 to-brand-teal/10 border-2 border-dashed border-brand-green/30 rounded-2xl p-8 text-center commercial-shadow max-w-4xl mx-auto">
            <p className="text-brand-green text-lg font-sans sans-modern font-bold mb-2">Espacio Comercial</p>
            <p className="text-brand-gray text-xs font-serif serif-elegant">728x90 - Banner Inferior</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-brand-purple/10 via-brand-white to-brand-teal/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif serif-elegant font-medium text-brand-black mb-6">
              Convertite en{" "}
              <span className="font-script script-enhanced text-brand-purple text-4xl md:text-5xl">Justiciero</span> hoy
            </h2>
            <p className="text-xl text-brand-gray font-serif serif-elegant mb-8">
              Sumate a quienes creen que el periodismo independiente es fundamental para la democracia argentina.
            </p>
            <Button
              onClick={scrollToPlans}
              className="bg-gradient-to-r from-brand-green to-brand-teal hover:from-brand-green/80 hover:to-brand-teal/80 text-brand-black font-sans sans-modern font-bold px-8 py-4 text-lg rounded-xl neon-glow transition-all duration-300 hover:scale-105"
            >
              <Heart className="w-6 h-6 mr-2" />
              Elegir mi aporte
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-black text-brand-white py-16">
        <div className="container mx-auto px-4">
          {/* Logo y tagline centrados */}
          <div className="text-center mb-12">
            <h4 className="text-3xl font-serif serif-elegant font-medium mb-2">
              Natalia <span className="font-script script-enhanced text-4xl text-brand-purple">Volosin</span>
            </h4>
            <h5 className="text-2xl font-sans sans-modern font-black mb-4 tracking-wider">LA JUSTA</h5>
            <p className="text-brand-gray text-lg font-serif serif-elegant">Portal de análisis independiente</p>
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
          <div className="text-center text-sm text-brand-gray font-sans sans-modern font-medium">
            © 2025 Natalia Volosin. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  )
}
