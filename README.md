# Inversoft

Sistema de gestión integral para inventario, ventas, proveedores y usuarios, desarrollado con tecnologías modernas y una arquitectura escalable.

## Tecnologías principales

- **React 18**: Librería principal para la construcción de interfaces de usuario.
- **Vite**: Herramienta de desarrollo y build ultrarrápida.
- **Redux Toolkit**: Manejo de estado global eficiente.
- **React Router DOM**: Enrutamiento SPA.
- **Tailwind CSS**: Utilidades CSS para estilos rápidos y consistentes.
- **D3, Recharts**: Visualización de datos y gráficos.
- **Framer Motion**: Animaciones fluidas.
- **Axios**: Cliente HTTP para APIs.
- **Date-fns**: Manipulación de fechas.
- **Radix UI, Lucide React**: Componentes y iconografía accesibles.

## Estructura del proyecto

- `/src/pages`: Vistas principales (dashboard, login, gestión de productos, proveedores, usuarios, ventas).
- `/src/components`: Componentes reutilizables y UI.
- `/src/styles`: Archivos de estilos globales y configuración de Tailwind.
- `/public`: Recursos estáticos (imágenes, favicon, manifest).

## Estilos y diseño

- **Tailwind CSS**: Configuración personalizada en `tailwind.config.js` y variables CSS en `src/styles/tailwind.css`.
- **Modo oscuro**: Soporte mediante la clase `dark`.
- **Animaciones**: Definidas en Tailwind y Framer Motion.
- **Fuentes**: Inter y JetBrains Mono desde Google Fonts.

## Scripts disponibles

- `npm start` — Inicia el servidor de desarrollo en `http://localhost:4028`
- `npm run build` — Genera la build de producción en la carpeta `/build`
- `npm run serve` — Previsualiza la build de producción localmente

## Instalación y ejecución

1. Clona el repositorio:
	```bash
	git clone https://github.com/LEONARDOARAGON/inversoft.git
	cd inversoft
	```

2. Instala las dependencias:
	```bash
	npm install
	```

3. Inicia el servidor de desarrollo:
	```bash
	npm start
	```

4. Abre tu navegador en [http://localhost:4028](http://localhost:4028)

## Personalización

- Modifica los colores y variables en `src/styles/tailwind.css` y `tailwind.config.js`.
- Agrega o edita páginas en `src/pages/`.
- Los componentes reutilizables están en `src/components/`.

## Despliegue

La build de producción se genera en la carpeta `/build` usando Vite. Puedes desplegarla en cualquier hosting estático (Vercel, Netlify, GitHub Pages, etc).

## Licencia

MIT
