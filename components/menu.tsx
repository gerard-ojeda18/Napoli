"use client";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";

const pizzas = [
  {
    name: "Margherita",
    description: "Salsa de tomate San Marzano, mozzarella di bufala, albahaca fresca y aceite de oliva",
    image: "/images/pizza-margherita.jpg",
  },
  {
    name: "Diavola",
    description: "Salsa de tomate, mozzarella, salame picante, nduja calabresa y escamas de chili",
    image: "/images/pizza-diavola.jpg",
  },
  {
    name: "Quattro Formaggi",
    description: "Mozzarella, gorgonzola, parmesano reggiano y fontina con un toque de miel",
    image: "/images/pizza-quattro-formaggi.jpg",
  },
  {
    name: "Prosciutto e Rucola",
    description: "Prosciutto crudo de Parma, rúcula fresca, lascas de parmesano y aceite de oliva",
    image: "/images/pizza-prosciutto.jpg",
  },
  {
    name: "Capricciosa",
    description: "Alcachofas, champiñones, jamón cocido, aceitunas negras y mozzarella",
    image: "/images/pizza-capricciosa.jpg",
  },
  {
    name: "Vegetariana",
    description: "Zucchini grillado, berenjenas, morrones asados, tomates cherry y mozzarella",
    image: "/images/pizza-vegetariana.jpg",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function handleReservar() {
  setTimeout(() => {
    document.getElementById("reservas")?.scrollIntoView({ behavior: "smooth" });
  }, 300);
}

export function Menu() {
  const { ref: headerRef, inView: headerInView } = useInView();
  const { ref: gridRef, inView: gridInView } = useInView();

  return (
    <section id="menu" className="py-24 sm:py-32 bg-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div
          ref={headerRef}
          className="text-center mb-16"
          style={{
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <span className="text-primary text-sm font-medium tracking-[0.2em] uppercase">
            Nuestra Carta
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-4 text-balance">
            Pizzas Destacadas
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground leading-relaxed">
            Cada pizza es elaborada al momento con masa madre de 72 horas de fermentación
            y cocida en nuestro horno de leña a más de 450 grados.
          </p>
        </div>

        {/* Pizza Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {pizzas.map((pizza, i) => (
            <div
              key={pizza.name}
              style={{
                opacity: gridInView ? 1 : 0,
                transform: gridInView ? "translateY(0)" : "translateY(40px)",
                transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`,
              }}
            >
              <Card className="group overflow-hidden bg-card border-0 shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={pizza.image}
                    alt={pizza.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <CardContent className="p-6 flex flex-col flex-1">
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                    {pizza.name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {pizza.description}
                  </p>
                  <button
                    onClick={handleReservar}
                    className="mt-4 w-full text-sm font-semibold text-primary border border-primary/40 px-4 py-2 rounded-full hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer"
                  >
                    Reservar mesa
                  </button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className="text-center mt-12"
          style={{
            opacity: gridInView ? 1 : 0,
            transition: "opacity 0.6s ease 0.7s",
          }}
        >
          <p className="text-muted-foreground">
            Ver carta completa con pastas, antipastos y postres en el restaurante
          </p>
        </div>
      </div>
    </section>
  );
}