# Co.Property Wiki

[![Built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)

This is the internal wiki and documentation hub for Co.Property, built with Astro and Starlight. It serves as the central repository for strategy, marketing, product, and technical documentation.

## 🚀 Project Structure

```
.
├── public/           # Static assets (favicons, etc.)
├── src/
│   ├── assets/       # Images and media
│   ├── content/
│   │   └── docs/     # Documentation files (MD/MDX)
│   └── styles/       # Custom CSS and theming
├── astro.config.mjs  # Astro configuration
└── package.json      # Dependencies and scripts
```

## 🎨 Style Guide & Design Specifications

### Color Scheme Update
The project has transitioned from the previous **Accent Yellow** (`#d97706`) to the new **Logo Red** (`#fe385c`) to align with the Co.Property brand identity.

| Role | Color Name | Hex Code | Usage |
|------|------------|----------|-------|
| **Primary Brand** | **Logo Red** | `#fe385c` | Main buttons, active states, key highlights |
| **Accent High** | Red 800 | `#9f1239` | High contrast text, hover states (Light Mode) |
| **Accent Low** | Red 50 | `#fff1f2` | Background highlights, subtle accents (Light Mode) |
| **Neutral** | Slate | `Variable` | Text, borders, backgrounds (Slate 50-900) |

### Design Tokens
- **Primary Color**: `#fe385c` (Extracted from official logo)
- **Typography**: Inter (System default fallback)
- **Dark Mode**: Fully supported with high-contrast text and muted red backgrounds (`#4c0519`).
- **Logo**: Updated homepage hero to use `logo.jpg` with a branded border.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command | Action |
| :--- | :--- |
| `npm install` | Installs dependencies |
| `npm run dev` | Starts local dev server at `localhost:4321` |
| `npm run build` | Build your production site to `./dist/` |
| `npm run preview` | Preview your build locally, before deploying |

## 📚 Documentation Sections

- **Strategy**: Buyer personas, competitor intelligence, positioning.
- **Marketing**: Messaging, campaigns, email sequences.
- **Product**: Detailed descriptions, builders, scripts.
- **Technical**: System status, orchestrator details.
