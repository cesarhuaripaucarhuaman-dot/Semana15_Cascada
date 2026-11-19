# Sesión 15 — Tailwind CSS (UTP)

Práctica completa de la guía: ejercicios resueltos 1-3 y propuestos 1-4.
Todo en español, sin frameworks extra, con las utilidades de Tailwind.

## 1. Qué hay en el ZIP

```
sesion15/
├─ index.html            ← abre esto primero: índice con enlaces
├─ LEEME.md              ← este archivo
├─ CUESTIONARIO.md       ← respuestas de la sección 4 de la guía
├─ ej1/index.html        Ejercicio resuelto 1 — botón + tarjeta (Play CDN)
├─ ej2/index.html        Ejercicio resuelto 2 — catálogo responsivo + dark (Play CDN)
├─ ej3/                  Ejercicio resuelto 3 — Tailwind CLI con color propio
│  ├─ index.html
│  ├─ package.json
│  ├─ tailwind.config.js
│  ├─ src/input.css
│  └─ dist/output.css    ← YA compilado: la página funciona sin npm
├─ propuesto1/index.html Landing page (Play CDN)
├─ propuesto2/index.html Formulario de contacto (Play CDN)
├─ propuesto3/           Tarjeta Bootstrap 5 vs Tailwind + tabla comparativa
│  ├─ index.html         (página con la comparación e iframes)
│  ├─ bootstrap.html
│  └─ tailwind.html
└─ propuesto4/           Sistema de diseño propio (Tailwind CLI)
   ├─ index.html
   ├─ package.json
   ├─ tailwind.config.js
   ├─ src/input.css
   └─ dist/output.css    ← YA compilado
```

## 2. Qué tienes que hacer para que funcione

### 2.1 Ejercicios con Play CDN (ej1, ej2, propuesto1, propuesto2, propuesto3)

No hay nada que instalar ni compilar.

1. Descomprime el ZIP, por ejemplo en `C:\css-avanzado\`.
2. Abre `sesion15\index.html` con doble clic (se abre en tu navegador).
3. Entra a cada ejercicio desde el índice.

> Requisito: conexión a internet, porque el `<script src="https://cdn.tailwindcss.com">` descarga el framework cada vez.
> Si abres el archivo sin internet, verás la página sin estilos.

### 2.2 Ejercicios compilados (ej3 y propuesto4)

Funcionan de inmediato: el `dist/output.css` ya viene generado. Solo abre `ej3\index.html`
o `propuesto4\index.html` y compara con el CSS que sí usa CDN.

Para recompilar tú mismo (cuando cambies clases o colores):

```cmd
cd C:\css-avanzado\sesion15\ej3
npm install
npx tailwindcss -i ./src/input.css -o ./dist/output.css
```

```cmd
cd C:\css-avanzado\sesion15\propuesto4
npm install
npx tailwindcss -i ./src/input.css -o ./dist/output.css
```

Modo vigilancia (recompila al guardar; se detiene con `Ctrl + C`):

```cmd
npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch
```

Atajos equivalentes ya configurados en cada `package.json`:

```cmd
npm run build
npm run dev
```

Requisitos: **Node.js 18 o superior** (`node -v` y `npm -v` deben responder).
La guía usa `tailwindcss@3`; el ZIP trae `^3.4.19` en `devDependencies`.

### 2.3 Comprobar que el CSS compilado es el correcto

Abre `ej3\dist\output.css` y busca `.bg-marca-500` o `.text-marca-600`: existen porque
las declaraste en `tailwind.config.js` y las usaste en el HTML.
Luego agrega una clase nueva en `ej3\index.html` (por ejemplo `text-4xl` en el `h1`),
recarga: **no cambia nada** hasta que vuelvas a compilar. Eso demuestra el paso 6 de la guía.

## 3. Tamaño del CSS generado (Propuesto 4)

| Archivo | Sin comprimir | Gzip |
|---|---|---|
| `propuesto4/dist/output.css` (CLI, solo clases usadas) | 19 146 bytes (18,7 KB) | 4 632 bytes |
| `ej3/dist/output.css` (CLI, solo clases usadas) | 12 829 bytes (12,5 KB) | 3 576 bytes |
| `bootstrap.min.css` 5.3.3 (todo el framework) | 232 803 bytes (227 KB) | 31 068 bytes |

Conclusión: el CSS del sistema de diseño pesa **12 veces menos** que Bootstrap
(unas 7 veces menos comprimido) porque la CLI genera solo las clases que la página usa.
Con el Play CDN, en cambio, el navegador descarga el compilador completo de Tailwind
y genera el CSS en tiempo real: sirve para aprender, no para producción.

## 4. Problemas frecuentes

| Síntoma | Causa | Solución |
|---|---|---|
| Se ve sin estilos en ej1/ej2/propuestos | Sin internet o CDN bloqueado | Conéctate y recarga; o sustituye el `<script>` por el CSS del ejercicio 3 |
| `'npx' no se reconoce como comando` | Node.js no instalado o PATH viejo | Instala Node LTS y **cierra y abre de nuevo** la terminal/VS Code |
| `npm : la ejecución de scripts está deshabilitada` (PowerShell) | Política de ejecución | Usa CMD, o ejecuta una vez `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` y confirma con `S` |
| Una clase no tiene efecto | Archivo fuera de `content` o falta recompilar | Revisa `content: ["./*.html"]` en `tailwind.config.js` y vuelve a compilar |
| Al abrir `ej3/index.html` no cambia el color | Estás viendo `dist/output.css` antiguo | Recompila con `npm run build` y recarga con `Ctrl + F5` |
| `Cannot find module 'tailwindcss'` | No ejecutaste `npm install` en esa carpeta | Ejecuta `npm install` dentro de `ej3` o `propuesto4` |

## 5. Cómo probar el diseño responsivo

1. Abre la página y pulsa **F12**.
2. Activa el ícono de dispositivo (Ctrl + Shift + M) y cambia entre móvil (375 px),
   tableta (768 px) y laptop (1280 px).
3. Verifica: 1 columna en móvil, 2 desde `md:`, 3 desde `lg:`; el enlace «Contacto»
   desaparece por debajo de 640 px (`hidden sm:block`).
4. Para el modo oscuro: F12 → menú ⋮ → More tools → Rendering →
   *Emulate CSS media feature prefers-color-scheme* → `dark`.
