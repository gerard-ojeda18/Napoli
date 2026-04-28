"use client"

import Image from "next/image"
import { useState } from "react"
import { X } from "lucide-react"

const galleryImages = [
  {
    src: "/images/gallery-1.jpg",
    alt: "Interior del restaurante Napoli",
    span: "lg:col-span-2 lg:row-span-2",
  },
  {
    src: "/images/gallery-2.jpg",
    alt: "Pasta fresca con ragu",
    span: "",
  },
  {
    src: "/images/gallery-3.jpg",
    alt: "Tiramisu casero",
    span: "",
  },
  {
    src: "/images/gallery-4.jpg",
    alt: "Pizzaiolo preparando masa",
    span: "lg:col-span-2",
  },
  {
   src: "/images/pizza-margherita.jpg",
   alt: "Pizza Margherita recién horneada",
   span: "",
  },
  {
    src: "/images/wood-oven.jpg",
    alt: "Horno de leña tradicional",
    span: "",
  },
]

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <section id="galeria" className="py-24 sm:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-medium tracking-[0.2em] uppercase">
            Nuestro Espacio
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-4 text-balance">
            Galeria
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground leading-relaxed">
            Un recorrido visual por nuestra cocina, nuestros platos y el ambiente 
            que te espera en Napoli.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={`relative aspect-square overflow-hidden rounded-lg cursor-pointer group ${image.span}`}
              onClick={() => setSelectedImage(image.src)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-primary transition-colors"
            onClick={() => setSelectedImage(null)}
            aria-label="Cerrar imagen"
          >
            <X className="h-8 w-8" />
          </button>
          <div className="relative max-w-5xl max-h-[90vh] w-full h-full">
            <Image
              src={selectedImage}
              alt="Imagen ampliada"
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </section>
  )
}
