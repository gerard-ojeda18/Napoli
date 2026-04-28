"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
   {
    src: "/images/pizza-margherita.jpg",
    alt: "Margherita clásica",
  },
  {
    src: "/images/pizza-quattro-formaggi.jpg",
    alt: "Quattro Formaggi",
  },
  {
    src: "/images/pizza-diavola.jpg",
    alt: "Diavola picante",
  },
  {
    src: "/images/pizza-prosciutto.jpg",
    alt: "Prosciutto e Rúcula",
  },
];

export function Hero() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = (index: number) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 400);
  };

  const next = () => goTo((current + 1) % slides.length);
  const prev = () => goTo((current - 1 + slides.length) % slides.length);

  // Auto-play cada 4 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      next();
    }, 4000);
    return () => clearInterval(timer);
  }, [current]);

  // Swipe en mobile
  useEffect(() => {
    let startX = 0;
    const onTouchStart = (e: TouchEvent) => { startX = e.touches[0].clientX; };
    const onTouchEnd = (e: TouchEvent) => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
    };
    window.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchend", onTouchEnd);
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [current]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Carrusel de fondo */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 z-0"
          style={{
            opacity: i === current ? (animating ? 0 : 1) : 0,
            transition: "opacity 0.8s ease",
          }}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            className="object-cover"
            priority={i === 0}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      ))}

      {/* Flechas */}
      <button
        onClick={prev}
        className="absolute left-4 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 border border-white/20 transition-all duration-200 cursor-pointer"
        aria-label="Anterior"
      >
        <ChevronLeft className="text-white w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 border border-white/20 transition-all duration-200 cursor-pointer"
        aria-label="Siguiente"
      >
        <ChevronRight className="text-white w-5 h-5" />
      </button>

      {/* Contenido */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          <span className="inline-block text-primary-foreground/80 text-sm font-medium tracking-[0.3em] uppercase mb-4">
            Desde 1985
          </span>
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 text-balance">
            Napoli
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-white/90 font-light tracking-wide mb-8">
            Auténtica Pizza Italiana
          </p>
          <p className="max-w-xl mx-auto text-white/70 text-base sm:text-lg mb-10 leading-relaxed">
            Horneada en horno de leña con los mejores ingredientes importados de Italia
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-base px-8 py-6"
            >
              <Link href="#menu">Ver Menú</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white bg-transparent hover:bg-white hover:text-foreground text-base px-8 py-6"
            >
              <Link href="#reservas">Reservar Mesa</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Puntos indicadores */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="cursor-pointer transition-all duration-300"
            style={{
              width: i === current ? 24 : 8,
              height: 8,
              borderRadius: 4,
              background: i === current ? "white" : "rgba(255,255,255,0.4)",
              border: "none",
              padding: 0,
            }}
            aria-label={`Ir a slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
}