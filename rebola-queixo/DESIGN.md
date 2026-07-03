---
name: Rebola Queixo Doceria
description: Landing page para doceria de luxo, unindo elegância com toques divertidos (Vibrant Luxury).
aesthetic: Vibrant Luxury / Premium Consumer
variance: 7
motion: 7
density: 4
theme_default: light
---

# Design System: Rebola Queixo

## 1. Tokens

### Cores
*   **Off-White (`--color-surface-base` / `bg-off-white`):** `#FAF9F6` - Fundo predominante.
*   **Off-Black (`--color-text-primary` / `text-off-black`):** `#1A1A1A` - Textos e fundos invertidos (como a seção de depoimentos).
*   **Rosa Cereja (`--color-brand-rosa` / `text-rosa-cereja`):** `#E0245E` - Cor de destaque principal usada para botões, ícones e chamadas de ação.

### Tipografia
*   **Display:** `Cabinet Grotesk` ou fallback para `sans-serif`. Usado em títulos (`font-display`).
*   **Body:** `Inter` ou sistema padrão. Usado no restante da página (`font-sans`).

### Espaçamento & Layout
*   O layout é centralizado com `max-w-[1400px]` e margens generosas (`py-24`, `px-6`).
*   **Bento Grid** é utilizado para mostrar o catálogo de produtos com cantos arredondados (`rounded-3xl`).

## 2. Princípios de Componentes
*   **Hero:** Usa layout de tela dividida (conteúdo à esquerda, imagem grande à direita). Botão primário colorido.
*   **Bento Grid:** Mistura de tamanhos (cartão grande para o carro-chefe, cartões menores para complementos) com animação sutil no *hover* e ícones de navegação.
*   **Depoimentos:** Fundo invertido (Off-black) para gerar contraste de ritmo na página.

## 3. Animações
*   Uso de `framer-motion` para reveals sutis (`y: 24` para `0`) e hover *scale*.
*   Crachá flutuante ("100% Artesanal") no Hero usando `y: [0, -10, 0]` repetido infinitamente.
