# Cuestionario — Sesión 15: Tailwind CSS

Respuestas de la sección 4 de la guía, con justificación breve.

## 1. ¿Qué es Tailwind CSS y qué significa que sea *utility-first*? ¿En qué se diferencia de Bootstrap?

Tailwind CSS es un framework CSS de código abierto creado por Adam Wathan (2017) con
enfoque **utility-first**: en lugar de entregar componentes cerrados, ofrece cientos de
clases pequeñas, cada una equivalente a una o dos declaraciones CSS (`p-4` → `padding: 1rem`).
«Utility-first» significa que el diseño se arma **combinando utilidades directamente en el
HTML**, sin escribir reglas CSS propias ni inventar nombres de clase.

Diferencia con Bootstrap: Bootstrap trae componentes con aspecto predefinido
(`btn btn-primary`, `card`, `navbar`); el resultado se reconoce como «hecho con Bootstrap»
y personalizarlo exige sobrescribir su CSS o recompilar SCSS. Tailwind no impone
apariencia: cada proyecto define la suya con las utilidades y el archivo de configuración.
El costo es que el HTML tiene más clases y hay que aprenderlas; la ventaja es control total
y CSS final más pequeño cuando se compila.

## 2. Declaración CSS equivalente a `p-4`, `rounded-lg` y `text-center`. ¿Cómo se relaciona la escala de espaciado con rem?

```css
p-4          { padding: 1rem; }
rounded-lg   { border-radius: 0.5rem; }
text-center  { text-align: center; }
```

La escala de espaciado de Tailwind es un múltiplo de **0,25 rem**: cada unidad equivale a
`0.25rem` (4 px con el tamaño de letra base de 16 px). Por eso `p-4` = 4 × 0,25 rem = **1 rem**,
`p-6` = 1,5 rem, `m-2` = 0,5 rem. Usar rem hace que los espacios crezcan o se reduzcan junto
con el tamaño de letra definido por el usuario, lo que mejora la accesibilidad frente a px fijos.

## 3. ¿Qué hace `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3` y por qué Tailwind es *mobile-first*?

Significa: **1 columna** por defecto (móvil), **2 columnas desde 768 px** (`md:`) y
**3 columnas desde 1024 px** (`lg:`). La rejilla se reorganiza sola al cambiar el ancho,
sin media queries escritas a mano.

Tailwind es *mobile-first* porque una clase sin prefijo se aplica a **todos** los anchos y
los prefijos (`sm:`, `md:`, `lg:`) **agregan** cambios de ese ancho en adelante, nunca hacia
abajo. Así se diseña primero para la pantalla más pequeña (lo más restrictivo) y se mejora
progresivamente en pantallas mayores: menos CSS y un diseño que nunca «rompe» en móvil.

## 4. Tres ventajas y dos limitaciones. ¿Cómo se reduce el problema de repetir muchas clases?

**Ventajas**

1. **Diseño sin salir del HTML**: no hay que alternar entre HTML y hojas de estilo.
2. **CSS final liviano**: el compilador genera solo las clases usadas (en el Propuesto 4,
   19 KB frente a 227 KB de Bootstrap).
3. **Personalización y responsividad simples**: `md:`, `lg:`, `hover:`, `dark:` aplican una
   utilidad solo en ese ancho o estado, y `tailwind.config.js` define la identidad visual.

**Limitaciones**

1. El HTML se vuelve extenso por la cantidad de clases (difícil de leer si no se ordena).
2. Exige herramienta de compilación en proyectos reales; sin ella (Play CDN) el CSS se
   genera en el navegador y no es apto para producción.

**Cómo se reduce la repetición**: extrayendo los bloques que se repiten a un **componente**
(en React/Vue/Angular) o a una **plantilla parcial** del servidor; y para conjuntos de
utilidades frecuentes, usando `@apply` dentro de `input.css` o las clases de componente de un
plugin. Así la tarjeta del catálogo se escribe una vez y se reutiliza.

## 5. ¿Para qué sirven la opción `content` y el comando de compilación en Tailwind CLI? ¿Por qué el Play CDN no se recomienda en producción?

- **`content`** (en `tailwind.config.js`) indica **qué archivos debe examinar** el compilador
  para detectar las clases escritas (por ejemplo `["./*.html"]`). Si un archivo no está en
  `content`, sus clases no se generan y no tienen efecto.
- **El comando de compilación** (`npx tailwindcss -i ./src/input.css -o ./dist/output.css`)
  lee esos archivos, ejecuta las tres directivas `@tailwind` y escribe un CSS que contiene
  **solo** las clases detectadas (y los colores/tipografías de la configuración). Con
  `--watch` se repite al guardar; en cada cambio hay que recompilar o la clase nueva no existe.

**Por qué no usar Play CDN en producción**:

1. Descarga un **compilador de JavaScript** al navegador y genera el CSS en tiempo real
   (trabajo extra y parpadeo de estilos), en lugar de entregar un CSS ya optimizado.
2. El CSS resultante incluye más de lo necesario y no se puede versionar ni cachear de forma
   eficiente; sin JavaScript, la página queda sin estilos.
3. En escritorio de Tailwind, el CDN está declarado **solo para desarrollo y pruebas**; la
   vía recomendada es la CLI o la integración con un empaquetador (Vite, etc.).
