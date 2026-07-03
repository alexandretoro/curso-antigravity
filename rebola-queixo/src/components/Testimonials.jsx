import React from 'react';
import { motion } from 'motion/react';
import { Star } from '@phosphor-icons/react';

export default function Testimonials() {
  const testimonials = [
    {
      name: "Mariana Silva",
      role: "Noiva",
      text: "A Rebola Queixo fez os doces do meu casamento e foi a melhor escolha! Todos os convidados elogiaram a apresentação e o sabor.",
    },
    {
      name: "João Pedro",
      role: "Cliente fiel",
      text: "O bolo de pistache com framboesa é simplesmente de outro mundo. Ingredientes super frescos e um capricho que a gente sente no primeiro pedaço.",
    },
    {
      name: "Luiza Mendes",
      role: "Eventos Corporativos",
      text: "Sempre encomendamos as trufas para os eventos da empresa. Além de deliciosas, as caixas são de uma sofisticação ímpar.",
    }
  ];

  return (
    <section id="depoimentos" className="px-6 py-24 max-w-[1400px] mx-auto bg-off-black text-off-white rounded-[3rem] my-12">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-6">A palavra de quem já provou</h2>
        <p className="text-off-white/70 text-lg">Nosso maior orgulho é adoçar os melhores momentos da sua vida.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
        {testimonials.map((t, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="flex flex-col items-center text-center p-6"
          >
            <div className="flex gap-1 mb-6 text-rosa-cereja">
              {[...Array(5)].map((_, j) => <Star key={j} weight="fill" className="w-5 h-5" />)}
            </div>
            <p className="text-lg leading-relaxed mb-8 text-off-white/90">"{t.text}"</p>
            <div>
              <div className="font-bold text-lg">{t.name}</div>
              <div className="text-off-white/50 text-sm">{t.role}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
