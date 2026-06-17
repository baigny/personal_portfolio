# Nabil Yaseen Baig — Portfolio

A modern, single-page portfolio site built with **React + Vite + Tailwind CSS**.

## Stack

- React 18
- Vite 5
- Tailwind CSS 3
- lucide-react (icons)
- Inter / Space Grotesk / JetBrains Mono (Google Fonts)

## Run locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## Build for production

```bash
npm run build      # outputs to /dist
npm run preview    # preview the production build
```

## Deploy

The `dist/` folder is fully static. Drop it on Vercel, Netlify, GitHub Pages,
or any static host. For Vercel/Netlify, the build command is `npm run build`
and the output directory is `dist`.

## Structure

```
.
├── index.html            # entry + font links + meta
├── tailwind.config.js    # font families (sans / display / mono)
├── vite.config.js
├── postcss.config.js
└── src/
    ├── main.jsx          # React entry
    ├── index.css         # Tailwind directives
    └── App.jsx           # the entire site (edit content here)
```

## Editing content

All resume content lives in the data objects at the top of `src/App.jsx`
(`PROFILE`, `EXPERIENCE`, `SKILLS`, `EDUCATION`, `CERTS`). Edit those and the
UI updates — no need to touch the layout components.
