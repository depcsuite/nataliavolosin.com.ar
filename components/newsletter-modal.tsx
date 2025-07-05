"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Mail, Star, ArrowRight, Clock, Eye, TrendingUp, Zap } from "lucide-react"

interface NewsletterModalProps {
  isOpen: boolean
  onClose: () => void
}

const featuredContent = [
  {
    title: "EXCLUSIVO: Peligra el decomiso de $5.000 millones contra Cristina Kirchner",
    excerpt: "Error procesal podría anular la medida judicial más importante contra la expresidenta",
    readTime: "8 min",
    views: "12.3K",
    urgent: true,
  },
  {
    title: "Procuración General anuncia reformas estructurales en investigaciones económicas",
    excerpt: "Nuevas directivas buscan acelerar los tiempos procesales en casos de corrupción",
    readTime: "6 min",
    views: "8.7K",
    urgent: false,
  },
  {
    title: "Crisis institucional abre ventana de oportunidad para reformas estructurales",
    excerpt: "Análisis: Cómo la coyuntura actual puede catalizar cambios profundos",
    readTime: "7 min",
    views: "9.1K",
    urgent: false,
  },
]

export function NewsletterModal({ isOpen, onClose }: NewsletterModalProps) {
  const [currentContentIndex, setCurrentContentIndex] = useState(0)

  useEffect(() => {
    if (isOpen) {
      const interval = setInterval(() => {
        setCurrentContentIndex((prev) => (prev + 1) % featuredContent.length)
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [isOpen])

  if (!isOpen) return null

  const currentContent = featuredContent[currentContentIndex]

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <Card className="bg-gradient-to-br from-brand-white via-brand-light-gray to-brand-white border-2 border-brand-green/30 commercial-shadow rounded-3xl overflow-hidden">
          {/* Close Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-brand-white/80 hover:bg-brand-white rounded-full w-10 h-10 p-0"
          >
            <X className="w-5 h-5 text-brand-black" />
          </Button>

          {/* Header with animated background */}
          <div className="relative bg-gradient-to-r from-brand-purple via-brand-teal to-brand-green p-8 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-purple/20 via-brand-teal/20 to-brand-green/20 animate-pulse"></div>
            <div className="relative z-10">
              <Badge className="bg-brand-white text-brand-purple font-sans sans-modern font-black px-4 py-2 text-sm mb-4 animate-bounce">
                <Zap className="w-4 h-4 mr-2" />
                CONTENIDO EXCLUSIVO
              </Badge>
              <h2 className="text-3xl md:text-4xl font-serif serif-elegant font-medium text-brand-white mb-4">
                Descubrí{" "}
                <span className="font-script script-enhanced text-4xl md:text-5xl text-brand-green">La Justa</span>
              </h2>
              <p className="text-xl text-brand-white/90 font-sans sans-modern font-medium">
                El análisis independiente que Argentina necesita
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-0">
            {/* Left Column - Featured Content */}
            <div className="p-8 bg-brand-white">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge className="bg-brand-purple text-brand-white font-sans sans-modern font-bold text-xs">
                    DESTACADO #{currentContentIndex + 1}
                  </Badge>
                  {currentContent.urgent && (
                    <Badge className="bg-red-600 text-white font-sans sans-modern font-bold text-xs animate-pulse">
                      URGENTE
                    </Badge>
                  )}
                </div>

                <h3 className="text-xl font-serif serif-elegant font-bold text-brand-black mb-3 leading-tight">
                  {currentContent.title}
                </h3>

                <p className="text-brand-gray font-serif serif-elegant mb-4 leading-relaxed">
                  {currentContent.excerpt}
                </p>

                <div className="flex items-center space-x-4 text-sm text-brand-gray font-sans sans-modern">
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {currentContent.readTime}
                  </span>
                  <span className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    {currentContent.views}
                  </span>
                  <span className="flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1 text-brand-green" />
                    Trending
                  </span>
                </div>
              </div>

              {/* Content Preview Dots */}
              <div className="flex justify-center space-x-2 mb-6">
                {featuredContent.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentContentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentContentIndex ? "bg-brand-purple scale-125" : "bg-brand-gray/30"
                    }`}
                  />
                ))}
              </div>

              {/* Stats */}
              <div className="bg-gradient-to-r from-brand-green/10 to-brand-teal/10 rounded-2xl p-4 mb-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-sans sans-modern font-black text-brand-purple">47</div>
                    <div className="text-xs text-brand-gray font-sans sans-modern">Newsletters</div>
                  </div>
                  <div>
                    <div className="text-2xl font-sans sans-modern font-black text-brand-teal">15K+</div>
                    <div className="text-xs text-brand-gray font-sans sans-modern">Lectores</div>
                  </div>
                  <div>
                    <div className="text-2xl font-sans sans-modern font-black text-brand-green">98%</div>
                    <div className="text-xs text-brand-gray font-sans sans-modern">Satisfacción</div>
                  </div>
                </div>
              </div>

              <Link href="/newsletter" onClick={onClose}>
                <Button className="w-full bg-gradient-to-r from-brand-purple to-brand-teal hover:from-brand-purple/80 hover:to-brand-teal/80 text-brand-white font-sans sans-modern font-bold py-4 rounded-xl text-lg neon-glow transition-all duration-300 hover:scale-105">
                  <Mail className="w-5 h-5 mr-2" />
                  Ver Todo el Contenido
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>

            {/* Right Column - Newsletter Signup */}
            <div className="p-8 bg-gradient-to-br from-brand-green/20 via-brand-teal/10 to-brand-purple/20">
              <div className="text-center mb-6">
                <Image
                  src="https://s3.us-east-1.amazonaws.com/nataliavolosin.com.ar/natalia-volosin.jpg"
                  alt="Natalia Volosin"
                  width={100}
                  height={100}
                  className="rounded-full mx-auto border-4 border-brand-white commercial-shadow mb-4"
                />
                <h3 className="text-2xl font-serif serif-elegant font-medium text-brand-black mb-2">
                  LA INVITACIÓN A <span className="font-script script-enhanced text-3xl text-brand-purple">pensar</span>
                </h3>
                <h4 className="text-2xl font-sans sans-modern font-black text-brand-black mb-4">
                  ES <span className="bg-brand-gray text-brand-white px-3 py-1 rounded-full">URGENTE</span>
                </h4>
              </div>

              <div className="space-y-4 mb-6">
                <div className="bg-brand-white/80 rounded-xl p-4">
                  <h4 className="font-sans sans-modern font-bold text-brand-black mb-2">¿Qué vas a encontrar?</h4>
                  <ul className="text-sm text-brand-black font-serif serif-elegant space-y-2">
                    <li className="flex items-start">
                      <Star className="w-4 h-4 text-brand-green mr-2 mt-0.5 flex-shrink-0" />
                      Análisis jurídicos exclusivos cada viernes
                    </li>
                    <li className="flex items-start">
                      <Star className="w-4 h-4 text-brand-teal mr-2 mt-0.5 flex-shrink-0" />
                      Investigaciones sobre corrupción y transparencia
                    </li>
                    <li className="flex items-start">
                      <Star className="w-4 h-4 text-brand-purple mr-2 mt-0.5 flex-shrink-0" />
                      Perspectiva independiente sin compromisos
                    </li>
                    <li className="flex items-start">
                      <Star className="w-4 h-4 text-brand-green mr-2 mt-0.5 flex-shrink-0" />
                      Contenido basado en experiencia internacional
                    </li>
                  </ul>
                </div>

                <div className="bg-brand-white/60 rounded-xl p-4 text-center">
                  <p className="text-sm text-brand-black font-serif serif-elegant mb-2">
                    <strong>Newsletter gratuito</strong> todos los viernes
                  </p>
                  <p className="text-xs text-brand-gray font-sans sans-modern">
                    Sin spam • Sin compromisos • Cancela cuando quieras
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <Link href="https://substack.com/@nataliavolosin" target="_blank" onClick={onClose}>
                  <Button className="w-full bg-brand-black hover:bg-brand-gray text-brand-white font-sans sans-modern font-bold py-4 rounded-xl text-lg transition-all duration-300 hover:scale-105">
                    <Mail className="w-5 h-5 mr-2" />
                    Suscribirse GRATIS
                  </Button>
                </Link>

                <Link href="/newsletter" onClick={onClose}>
                  <Button
                    variant="outline"
                    className="w-full border-2 border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-brand-white font-sans sans-modern font-bold py-4 rounded-xl text-lg bg-transparent transition-all duration-300"
                  >
                    Ver Contenido Completo
                  </Button>
                </Link>
              </div>

              <p className="text-center text-xs text-brand-gray font-sans sans-modern mt-4">
                Únete a más de 15,000 lectores que confían en La Justa
              </p>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="bg-gradient-to-r from-brand-black via-brand-gray to-brand-black p-6 text-center">
            <p className="text-brand-white font-serif serif-elegant text-lg mb-4">
              "No somos neutrales, pero sí somos independientes"
            </p>
            <div className="flex justify-center space-x-4">
              <Link href="/newsletter" onClick={onClose}>
                <Button
                  variant="outline"
                  className="border-brand-white text-brand-white hover:bg-brand-white hover:text-brand-black font-sans sans-modern font-bold px-6 py-2 rounded-xl bg-transparent"
                >
                  Explorar Contenido
                </Button>
              </Link>
              <Link href="/suscripcion" onClick={onClose}>
                <Button className="bg-brand-green hover:bg-brand-green/80 text-brand-black font-sans sans-modern font-bold px-6 py-2 rounded-xl">
                  Bancar a La Justa
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
