---
name: Dash Finance Dark Tech
colors:
  bg: "#0a0a0c"
  surface: "#121215"
  surface-hover: "#1a1a1f"
  surface-active: "#22222a"
  border: "#1f1f24"
  border-focus: "#3b3b44"
  text-primary: "#f3f4f6"
  text-secondary: "#9ca3af"
  text-muted: "#6b7280"
  income: "#10b981"
  income-hover: "#059669"
  expense: "#f43f5e"
  expense-hover: "#e11d48"
  investment: "#3b82f6"
  investment-hover: "#2563eb"
  warning: "#f97316"
  warning-hover: "#ea580c"
typography:
  headline-lg: { fontFamily: Inter, fontSize: 28px, fontWeight: 700, lineHeight: 1.2 }
  headline-md: { fontFamily: Inter, fontSize: 20px, fontWeight: 600, lineHeight: 1.2 }
  body-md: { fontFamily: Inter, fontSize: 15px, fontWeight: 400, lineHeight: 1.6 }
  body-sm: { fontFamily: Inter, fontSize: 13px, fontWeight: 400, lineHeight: 1.5 }
  mono-md: { fontFamily: JetBrains Mono, fontSize: 14px, fontWeight: 500, lineHeight: 1.5 }
rounded:
  sm: 3px
  md: 6px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
components:
  button-primary:
    backgroundColor: "{colors.income}"
    rounded: "{rounded.sm}"
    padding: 10px
  card-panel:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.sm}"
    padding: 24px
---

# Dash Finance - Dark Tech Design System

## Overview
A high-performance, dark financial dashboard designed with brutalist tech influences. The theme is optimized for visual density, layout clarity, and high-contrast alert states. Renders custom-built, lightweight SVGs for complex charts to guarantee fast render loops.

## Colors
- **Background (#0a0a0c):** A deep charcoal black, avoiding pure black.
- **Surface (#121215):** Lighter gray for panels, dashboard cards, and inputs.
- **Accents:**
  - **Income (#10b981):** Emerald Green used for positive cashflow, login submissions, and successful indicators.
  - **Expense (#f43f5e):** Rose Red for negative cashflow, limits exceeded, and delete warnings.
  - **Investment (#3b82f6):** Electric Blue for tracking investment goals.

## Typography
Uses the **Inter** typeface for readability, paired with **JetBrains Mono** or monospace system fonts for alignment-sensitive numbers and currency calculations.

## Shapes
Sharp and technical geometry with a narrow **3px radius** (`rounded.sm`), giving the dashboard a high-fidelity cockpit or instrument panel appearance.

## Elevation & Depth
Mainly flat, reliant on 1px borders and slight background shifts (`surface-hover` and `surface-active`) instead of blur shadows, maintaining the strict tech motif.

## Do's and Don'ts
- **Do:** Use monospace font formatting for all values (currency, percentages, dates) to avoid layout shifts.
- **Do:** Highlight alert states clearly using the high-contrast Rose Red theme accent when limits are exceeded.
- **Don't:** Introduce generic light-colored buttons or card shapes. All interaction borders must transition smoothly on hover.
