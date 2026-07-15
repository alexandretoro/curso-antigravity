import React from 'react';
import { InstagramLogo, WhatsappLogo, MapPin } from '@phosphor-icons/react';

export default function Footer() {
  return (
    <footer className="px-6 py-16 max-w-[1400px] mx-auto border-t border-off-black/10 mt-12">
      <div className="w-full h-[300px] rounded-3xl overflow-hidden shadow-sm mb-12">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14626.544520556557!2d-46.68744040212726!3d-23.581512497645396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce576fdb46a581%3A0xc638bb39ce2aab64!2sItaim%20Bibi%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1sen!2sbr!4v1717618210134!5m2!1sen!2sbr" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="md:col-span-2">
          <div className="font-display font-bold text-3xl tracking-tight mb-4">Candy Concept</div>
          <p className="text-off-black/60 max-w-sm mb-6">Alta confeitaria e doces finos para transformar qualquer ocasião em um momento inesquecível.</p>
          <div className="flex gap-4">
            <a href="#" className="p-3 bg-off-black/5 rounded-full hover:bg-rosa-cereja hover:text-white transition-colors">
              <InstagramLogo className="w-6 h-6" />
            </a>
            <a href="https://api.whatsapp.com/send?phone=5511999999999&text=Seja%20bem-vindo%20a%20Candy%20Concept!%20Em%20que%20podemos%20ajudar%3F" target="_blank" rel="noopener noreferrer" className="p-3 bg-off-black/5 rounded-full hover:bg-rosa-cereja hover:text-white transition-colors">
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
              <a href="https://api.whatsapp.com/send?phone=5511999999999&text=Seja%20bem-vindo%20a%20Candy%20Concept!%20Em%20que%20podemos%20ajudar%3F" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-rosa-cereja transition-colors w-full">
                <WhatsappLogo className="w-5 h-5 shrink-0 text-rosa-cereja" />
                <span>(11) 99999-9999</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="pt-8 border-t border-off-black/10 text-center text-sm text-off-black/50">
        &copy; {new Date().getFullYear()} Candy Concept. Todos os direitos reservados.<br />
        <span>Desenvolvido por Alexandre Toro</span>
      </div>
    </footer>
  );
}
