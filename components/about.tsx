import Image from "next/image"

export function About() {
  return (
    <section id="nosotros" className="py-24 sm:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative aspect-[4/3] lg:aspect-square overflow-hidden rounded-lg">
            <Image
              src="/images/wood-oven.jpg"
              alt="Horno de leña tradicional"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          {/* Content */}
          <div className="lg:pl-8">
            <span className="text-primary text-sm font-medium tracking-[0.2em] uppercase">
              Nuestra Historia
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6 text-balance">
              Tradición Italiana en Cada Bocado
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Desde 1985, Napoli ha sido el hogar de la auténtica pizza napolitana en Buenos Aires. 
                Fundado por Don Giuseppe, un pizzaiolo de tercera generación llegado de Napoles, 
                nuestro restaurante mantiene viva la tradición italiana que ha pasado de generación en generación.
              </p>
              <p>
                Cada pizza es elaborada artesanalmente en nuestro horno de leña importado de Italia, 
                alcanzando temperaturas de hasta 450 grados para lograr esa corteza perfectamente 
                crujiente y aireada que caracteriza a la verdadera pizza napolitana.
              </p>
              <p>
                Utilizamos unicamente ingredientes de primera calidad: mozzarella di bufala, 
                tomates San Marzano DOP, aceite de oliva extra virgen y harina tipo 00, 
                todos importados directamente de Italia.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-10 pt-10 border-t border-border">
              <div>
                <span className="font-serif text-3xl sm:text-4xl font-bold text-primary">40+</span>
                <p className="text-sm text-muted-foreground mt-1">Años de tradición</p>
              </div>
              <div>
                <span className="font-serif text-3xl sm:text-4xl font-bold text-primary">100%</span>
                <p className="text-sm text-muted-foreground mt-1">Ingredientes italianos</p>
              </div>
              <div>
                <span className="font-serif text-3xl sm:text-4xl font-bold text-primary">450°</span>
                <p className="text-sm text-muted-foreground mt-1">Horno de leña</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
