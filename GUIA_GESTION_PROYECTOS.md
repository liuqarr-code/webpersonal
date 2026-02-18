# Guía de Gestión de Proyectos

Para añadir, eliminar o reordenar proyectos en tu portafolio, solo necesitas editar un archivo. El sistema se encarga automáticamente de la numeración (01, 02, 03...).

## 1. Dónde editar
El archivo que contiene tus datos está en:
`client/src/pages/Home.tsx`

## 2. Cómo añadir un proyecto nuevo al principio (Posición 01)
Busca la lista `const projects = [...]` al principio del archivo y añade tu nuevo bloque de datos **justo después del corchete de apertura `[`**.

**Ejemplo:**

```typescript
const projects = [
  // --- TU NUEVO PROYECTO AQUÍ ---
  {
    id: 5, // Usa un ID único (cualquier número que no se repita)
    title: "NUEVO PROYECTO",
    category: "Categoría",
    year: "2026",
    description: "Descripción breve de tu nuevo trabajo.",
    link: "/nuevo-link"
  },
  // ------------------------------
  {
    id: 1,
    title: "Identidad Visual",
    ...
  },
  ...
];
```

Al guardar, este nuevo proyecto aparecerá automáticamente como **01**, y el que antes era 01 pasará a ser 02, etc.

## 3. Campos del proyecto
*   `id`: Un número único para control interno (no se muestra, usa cualquiera).
*   `title`: El título grande que se ve en la lista.
*   `category`: La etiqueta pequeña (ej. Branding, Web).
*   `year`: El año del proyecto.
*   `description`: El texto que aparece al pasar el ratón por encima.
*   `link`: La dirección a la que lleva el clic (puede ser una página interna `/proyecto` o externa `https://google.com`).
