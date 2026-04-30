# Manual de Marca — TonExecutive.ai

## 1. IDENTIDAD VERBAL

- **Nombre oficial:** TonExecutive.ai
- **Tagline principal:** "Your Fractional Chief AI Officer"
- **Tagline secundario:** "IA con impacto. Direccion real."

### Tono de voz

Directo, experto pero cercano. Sin jerga vacia. Como un mentor senior, no un corporativo.

### Vocabulario

- **Palabras SI:** impacto, real, ejecutar, resultado, 90 dias, concreto, estrategia
- **Palabras NO:** sinergias, holistico, disruptivo, innovador (sin contexto), soluciones

---

## 2. PALETA DE COLORES

Colores extraidos de uso real en `src/index.css`, `src/App.tsx` y `src/components/EfficiencyCalculator.tsx`.

### Color primario

- **Token:** Emerald 500
- **HEX:** `#10B981`
- **RGB:** `rgb(16, 185, 129)`
- **HSL:** `hsl(160, 84%, 39%)`
- **Tailwind:** `bg-emerald-500`, `text-emerald-500`, `border-emerald-500`

### Color de fondo

- **Token:** Zinc 950
- **HEX:** `#09090B`
- **RGB:** `rgb(9, 9, 11)`
- **HSL:** `hsl(240, 10%, 4%)`
- **Tailwind:** `bg-zinc-950`

### Color de texto

- **Token:** Zinc 100
- **HEX:** `#F4F4F5`
- **RGB:** `rgb(244, 244, 245)`
- **HSL:** `hsl(240, 5%, 96%)`
- **Tailwind:** `text-zinc-100`

### Color de acento

- **Token:** Cyan 400
- **HEX:** `#22D3EE`
- **RGB:** `rgb(34, 211, 238)`
- **HSL:** `hsl(188, 85%, 53%)`
- **Tailwind:** `text-cyan-400`, `border-cyan-400`, `bg-cyan-500/10`

### Color de error/alerta

- **Token:** Red 400
- **HEX:** `#F87171`
- **RGB:** `rgb(248, 113, 113)`
- **HSL:** `hsl(0, 90%, 71%)`
- **Tailwind:** `text-red-400`, `bg-red-400/10`, `border-red-400/20`

---

## 3. TIPOGRAFIA

- **Fuente principal:** Inter (Google Fonts), definida en `src/index.css` como `--font-sans`.
- **Jerarquia recomendada:**
  - H1: `text-4xl` + `font-bold`
  - H2: `text-3xl` + `font-semibold`
  - H3: `text-2xl` + `font-medium`
  - Body: `text-base` + `font-normal`
- **Interlineado:**
  - Body: `leading-relaxed`
  - Headings: `leading-tight`

---

## 4. COMPONENTES CLAVE

Estilos documentados con clases Tailwind exactas tomadas del codigo actual.

### Boton primario (emerald)

```txt
inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-emerald-900/40 transition-all
```

### Boton secundario (outline)

```txt
inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white font-bold px-8 py-4 rounded-2xl border border-white/40 shadow-lg transition-all
```

### Cards (glassmorphism)

```txt
bg-zinc-900/60 backdrop-blur-3xl border border-zinc-700 rounded-3xl shadow-2xl
```

Variantes usadas:

```txt
bg-zinc-900/40 backdrop-blur-xl border border-white/10 rounded-[2.5rem] shadow-2xl
bg-zinc-900/50 backdrop-blur-2xl border border-white/10 rounded-[3rem] shadow-2xl
```

### Badges / Pills

```txt
px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 text-xs font-bold
```

```txt
inline-flex items-center px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-black tracking-widest uppercase
```

### Input fields

```txt
w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-cyan-500 outline-none transition-all placeholder:text-zinc-600
```

Variante diagnostico:

```txt
w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-700 text-white outline-none focus:border-emerald-500
```

---

## 5. LOGO Y USO

- **Formato texto:** `TonExecutive.ai`
  - "Ton" en blanco
  - ".ai" en `emerald-400`
- **Regla de contraste:** No usar sobre fondo claro sin adaptacion cromatica.
- **Espacio minimo de seguridad:** 24px alrededor del logo.

---

## 6. APLICACIONES

### LinkedIn header

- **Dimensiones:** 1584x396 px
- **Fondo:** `zinc-950` (`#09090B`)
- **Composicion:** logo centrado + tagline principal.

### Email signature

Plantilla base:

```txt
[Nombre Apellido]
Fractional Chief AI Officer | TonExecutive.ai | [Telefono]
```

### Presentaciones

- Fondo principal: `zinc-950`
- Titulos: blanco (`zinc-100`/`white`)
- Highlights y llamadas de accion: `emerald-500`
- Acentos secundarios para datos: `cyan-400`

---

## Notas de consistencia

- Mantener siempre la promesa de valor "impacto real en 90 dias".
- Priorizar verbos de accion en titulares y CTAs ("Agenda", "Recibir", "Ejecutar").
- Evitar mensajes genericos sin resultado medible.
