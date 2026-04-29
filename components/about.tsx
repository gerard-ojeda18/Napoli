"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView(0.3);
  useEffect(() => {
    if (!inView) return;
    const steps = 50;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) { setCount(value); clearInterval(timer); }
      else { setCount(parseFloat(current.toFixed(0))); }
    }, 1500 / steps);
    return () => clearInterval(timer);
  }, [inView, value]);
  return <span ref={ref}>{count}{suffix}</span>;
}

export function About() {
  const { ref: imgRef, inView: imgInView } = useInView();
  const { ref: textRef, inView: textInView } = useInView();
  const { ref: statsRef, inView: statsInView } = useInView();

  return (
    <section id="nosotros" className="py-24 sm:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div
            ref={imgRef}
            className="relative aspect-[4/3] lg:aspect-square overflow-hidden rounded-lg"
            style={{
              opacity: imgInView ? 1 : 0,
              transform: imgInView ? "translateX(0)" : "translateX(-40px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
            }}
          >
            <Image
              src="/images/wood-oven.jpg"
              alt="Horno de leña tradicional"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          <div
            ref={textRef}
            className="lg:pl-8"
            style={{
              opacity: textInView ? 1 : 0,
              transform: textInView ? "translateX(0)" : "translateX(40px)",
              transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
            }}
          >
            <span className="text-primary text-sm font-medium tracking-[0.2em] uppercase">
              Nuestra Historia
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6 text-balance">
              Tradición Italiana en Cada Bocado
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Desde 1985, Napoli ha sido el hogar de la auténtica pizza napolitana en Buenos Aires.
                Fundado por Don Giuseppe, un pizzaiolo de tercera generación llegado de Nápoles,
                nuestro restaurante mantiene viva la tradición italiana.
              </p>
              <p>
                Cada pizza es elaborada artesanalmente en nuestro horno de leña importado de Italia,
                alcanzando temperaturas de hasta 450 grados para lograr esa corteza perfectamente
                crujiente y aireada que caracteriza a la verdadera pizza napolitana.
              </p>
              <p>
                Utilizamos únicamente ingredientes de primera calidad: mozzarella di bufala,
                tomates San Marzano DOP, aceite de oliva extra virgen y harina tipo 00,
                todos importados directamente de Italia.
              </p>
            </div>

            <div ref={statsRef} className="grid grid-cols-3 gap-8 mt-10 pt-10 border-t border-border">
              {[
                { value: 40, suffix: "+", label: "Años de tradición" },
                { value: 100, suffix: "%", label: "Ingredientes italianos" },
                { value: 450, suffix: "°", label: "Horno de leña" },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  style={{
                    opacity: statsInView ? 1 : 0,
                    transform: statsInView ? "translateY(0)" : "translateY(20px)",
                    transition: `opacity 0.6s ease ${i * 0.15}s, transform 0.6s ease ${i * 0.15}s`,
                  }}
                >
                  <span className="font-serif text-3xl sm:text-4xl font-bold text-primary">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </span>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}