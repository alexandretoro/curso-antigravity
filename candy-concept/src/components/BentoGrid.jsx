import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CaretRight } from '@phosphor-icons/react';

function CarouselImages({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="absolute inset-0 w-full h-full">
      <AnimatePresence initial={false}>
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </AnimatePresence>
    </div>
  );
}

export default function BentoGrid() {
  return (
    <section
      id="produtos"
      className="px-6 py-24 max-w-[1400px] mx-auto"
    >
      <div className="mb-16 max-w-2xl">
        <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Nossas Especialidades
        </h2>
        <p className="text-off-black/70 text-lg">
          Descubra o catálogo de doces que vão surpreender o seu paladar.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">

        {/* Trufas */}
        <motion.div
          whileHover={{ scale: 0.98 }}
          className="md:col-span-2 relative rounded-3xl overflow-hidden group cursor-pointer"
        >
          <CarouselImages images={['/trufas_1.png', '/trufas_2.png']} />

          <div className="absolute inset-0 bg-gradient-to-t from-off-black/90 via-off-black/40 to-transparent" />

          <div className="absolute bottom-0 left-0 p-8 text-white">
            <h3 className="text-3xl font-bold mb-2">
              Trufas Gourmet
            </h3>

            <p className="text-white/80 max-w-sm">
              O cacau mais puro, recheios derretidos e finalização artesanal.
            </p>
          </div>

          <div className="absolute top-8 right-8 bg-white/20 backdrop-blur-md p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            <CaretRight weight="bold" className="text-white w-6 h-6" />
          </div>
        </motion.div>

        {/* Bolos */}
        <motion.div
          whileHover={{ scale: 0.98 }}
          className="relative rounded-3xl overflow-hidden group cursor-pointer"
        >
          <CarouselImages images={[
            'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=400',
            'https://images.unsplash.com/photo-1557925923-33b2512ea2aa?auto=format&fit=crop&q=80&w=400'
          ]} />

          <div className="absolute inset-0 bg-gradient-to-t from-off-black/90 via-off-black/40 to-off-black/20" />

          <div className="relative h-full p-8 flex flex-col justify-between text-off-white">
            <div>
              <h3 className="text-2xl font-bold mb-2">
                Bolos Festivos
              </h3>

              <p className="text-off-white/70">
                Para celebrar com estilo e muito sabor.
              </p>
            </div>

            <div className="flex justify-end">
              <div className="bg-white/10 p-4 rounded-full group-hover:bg-rosa-cereja transition-colors">
                <CaretRight weight="bold" className="w-6 h-6" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Kits */}
        <motion.div
          whileHover={{ scale: 0.98 }}
          className="relative rounded-3xl overflow-hidden group cursor-pointer"
        >
          <CarouselImages images={[
            'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=400',
            'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&q=80&w=400'
          ]} />

          <div className="absolute inset-0 bg-gradient-to-t from-rosa-cereja/90 via-rosa-cereja/60 to-rosa-cereja/40" />

          <div className="relative h-full p-8 flex flex-col justify-between text-white">
            <div>
              <h3 className="text-2xl font-bold mb-2">
                Kits Presente
              </h3>

              <p className="text-white/80">
                Caixas personalizadas para quem você ama.
              </p>
            </div>

            <div className="flex justify-end">
              <div className="bg-white/20 p-4 rounded-full group-hover:bg-white group-hover:text-rosa-cereja transition-colors">
                <CaretRight weight="bold" className="w-6 h-6" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Sobremesas */}
        <motion.div
          whileHover={{ scale: 0.98 }}
          className="md:col-span-2 relative rounded-3xl overflow-hidden group cursor-pointer border border-off-black/5"
        >
          <CarouselImages images={[
            'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=400',
            'https://images.unsplash.com/photo-1469533778471-92a68cb3633d?auto=format&fit=crop&q=80&w=400'
          ]} />

          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-white/40" />

          <div className="relative h-full p-8 flex items-center justify-between">
            <div>
              <h3 className="text-3xl font-bold mb-2 text-off-black">
                Sobremesas de Taça
              </h3>

              <p className="text-off-black/60 max-w-sm">
                Perfeitas para o almoço de domingo.
              </p>
            </div>

            <div className="bg-off-white p-6 rounded-full group-hover:bg-off-black group-hover:text-white transition-colors border border-off-black/5">
              <CaretRight weight="bold" className="w-8 h-8" />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}