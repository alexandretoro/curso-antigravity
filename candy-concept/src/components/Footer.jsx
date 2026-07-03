import React from 'react';
import { InstagramLogo, WhatsappLogo, MapPin } from '@phosphor-icons/react';

export default function Footer() {
  return (
    <footer className="px-6 py-16 max-w-[1400px] mx-auto border-t border-off-black/10 mt-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="md:col-span-2">
          <div className="font-display font-bold text-3xl tracking-tight mb-4">Candy Concept</div>
          <p className="text-off-black/60 max-w-sm mb-6">Alta confeitaria e doces finos para transformar qualquer ocasião em um momento inesquecível.</p>
          <div className="flex gap-4">
            <a href="#" className="p-3 bg-off-black/5 rounded-full hover:bg-rosa-cereja hover:text-white transition-colors">
              <InstagramLogo className="w-6 h-6" />
            </a>
            <a href="#" className="p-3 bg-off-black/5 rounded-full hover:bg-rosa-cereja hover:text-white transition-colors">
              <WhatsappLogo className="w-6 h-6" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-4">Menu</h4>
          <ul className="space-y-3 text-off-black/70">
            <li><a href="#produtos" className="hover:text-rosa-cereja transition-colors">Nossos Doces</a></li>
            <li><a href="#" className="hover:text-rosa-cereja transition-colors">Kits Presente</a></li>
            <li><a href="#" className="hover:text-rosa-cereja transition-colors">Encomendas</a></li>
            <li><a href="#sobre" className="hover:text-rosa-cereja transition-colors">Sobre a Candy Concept</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4">Contato</h4>
          <ul className="space-y-4 text-off-black/70">
            <li className="flex items-start gap-3">
              <WhatsappLogo className="w-5 h-5 shrink-0 text-rosa-cereja" />
              <span>(11) 99999-9999</span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 shrink-0 text-rosa-cereja" />
              <span>Ateliê (Apenas retirada)<br/>São Paulo, SP</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="pt-8 border-t border-off-black/10 text-center text-sm text-off-black/50">
        &copy; {new Date().getFullYear()} Candy Concept. Todos os direitos reservados.
      </div>
    </footer>
  );
}
