import React from 'react';
import { motion } from 'motion/react';
import { CaretRight } from '@phosphor-icons/react';

export default function BentoGrid() {
  return (
    <section id="produtos" className="px-6 py-24 max-w-[1400px] mx-auto">
      <div className="mb-16 max-w-2xl">
        <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4">Nossas Especialidades</h2>
        <p className="text-off-black/70 text-lg">Descubra o catálogo de doces que vão surpreender o seu paladar.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
        
        {/* Trufas - Large Cell */}
        <motion.div 
          whileHover={{ scale: 0.98 }}
          className="md:col-span-2 relative rounded-3xl overflow-hidden group cursor-pointer"
        >
          <img src="/bento_truffle.png" alt="Trufas Gourmet" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-off-black/80 via-off-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8 text-white">
            <h3 className="text-3xl font-bold mb-2">Trufas Gourmet</h3>
            <p className="text-white/80 max-w-sm">O cacau mais puro, recheios derretidos e finalização artesanal.</p>
          </div>
          <div className="absolute top-8 right-8 bg-white/20 backdrop-blur-md p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            <CaretRight weight="bold" className="text-white w-6 h-6" />
          </div>
        </motion.div>

        {/* Bolos - Small Cell */}
        <motion.div 
          whileHover={{ scale: 0.98 }}
          className="bg-off-black text-off-white rounded-3xl p-8 flex flex-col justify-between group cursor-pointer"
        >
          <div>
            <h3 className="text-2xl font-bold mb-2">Bolos Festivos</h3>
            <p className="text-off-white/70">Para celebrar com estilo e muito sabor.</p>
          </div>
          <div className="flex justify-end">
            <div className="bg-white/10 p-4 rounded-full group-hover:bg-rosa-cereja transition-colors">
              <CaretRight weight="bold" className="w-6 h-6" />
            </div>
          </div>
        </motion.div>

        {/* Presentes - Small Cell */}
        <motion.div 
          whileHover={{ scale: 0.98 }}
          className="bg-rosa-cereja text-white rounded-3xl p-8 flex flex-col justify-between group cursor-pointer"
        >
          <div>
            <h3 className="text-2xl font-bold mb-2">Kits Presente</h3>
            <p className="text-white/80">Caixas personalizadas para quem você ama.</p>
          </div>
          <div className="flex justify-end">
            <div className="bg-white/20 p-4 rounded-full group-hover:bg-white group-hover:text-rosa-cereja transition-colors">
              <CaretRight weight="bold" className="w-6 h-6" />
            </div>
          </div>
        </motion.div>

        {/* Sobremesas - Medium Cell */}
        <motion.div 
          whileHover={{ scale: 0.98 }}
          className="md:col-span-2 bg-white rounded-3xl p-8 flex items-center justify-between group cursor-pointer border border-off-black/5"
        >
          <div>
            <h3 className="text-3xl font-bold mb-2 text-off-black">Sobremesas de Taça</h3>
            <p className="text-off-black/60 max-w-sm">Perfeitas para o almoço de domingo.</p>
          </div>
          <div className="bg-off-white p-6 rounded-full group-hover:bg-off-black group-hover:text-white transition-colors border border-off-black/5">
            <CaretRight weight="bold" className="w-8 h-8" />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
