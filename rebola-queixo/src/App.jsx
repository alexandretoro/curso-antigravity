import React from 'react'
import Hero from './components/Hero'
import BentoGrid from './components/BentoGrid'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'

function App() {
  return (
    <main className="min-h-screen bg-off-white text-off-black selection:bg-rosa-cereja selection:text-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="font-display font-bold text-2xl tracking-tight">Rebola Queixo</div>
        <div className="hidden md:flex gap-8 text-sm font-medium">
          <a href="#produtos" className="hover:text-rosa-cereja transition-colors">Produtos</a>
          <a href="#sobre" className="hover:text-rosa-cereja transition-colors">Sobre</a>
          <a href="#depoimentos" className="hover:text-rosa-cereja transition-colors">Depoimentos</a>
        </div>
        <button className="bg-off-black text-off-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-rosa-cereja hover:text-white transition-colors">
          Encomendar
        </button>
      </nav>

      <Hero />
      <BentoGrid />
      <Testimonials />
      <Footer />
    </main>
  )
}

export default App
