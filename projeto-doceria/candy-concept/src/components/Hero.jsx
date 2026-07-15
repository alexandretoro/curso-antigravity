import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from '@phosphor-icons/react';

export default function Hero() {
  return (
    <section className="relative px-6 py-16 md:py-24 max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      
      {/* Text Content */}
      <div className="max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-rosa-cereja font-bold tracking-widest text-xs uppercase mb-6 block">
            Alta Confeitaria
          </span>
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
            A doçura que falta no seu dia.
          </h1>
          <p className="text-off-black/70 text-lg md:text-xl max-w-[500px] mb-8 leading-relaxed">
            Ingredientes premium, receitas exclusivas e um toque de magia em cada pedaço. Feito artesanalmente para transformar momentos.
          </p>
          
          <div className="flex items-center gap-4">
            <a href="https://api.whatsapp.com/send?phone=5511999999999&text=Seja%20bem-vindo%20a%20Candy%20Concept!%20Em%20que%20podemos%20ajudar%3F" target="_blank" rel="noopener noreferrer" className="bg-rosa-cereja text-white px-8 py-4 rounded-full font-medium flex items-center gap-2 hover:bg-rosa-cereja-dark transition-colors group">
              Fazer Encomenda
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <button className="px-8 py-4 rounded-full font-medium border border-off-black/10 hover:bg-off-black/5 transition-colors">
              Ver Menu
            </button>
          </div>
        </motion.div>
      </div>

      {/* Image Content */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative h-[500px] md:h-[600px] w-full rounded-3xl overflow-hidden shadow-2xl shadow-off-black/5"
      >
        <img 
          src="/hero_candy.png" 
          alt="Doces finos em uma mesa elegante" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Floating badge */}
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-lg"
        >
          <div className="font-bold text-rosa-cereja text-2xl">100%</div>
          <div className="text-sm text-off-black/80 font-medium">Artesanal</div>
        </motion.div>
      </motion.div>

    </section>
  );
}
