# � Chicken Shoarma Tycoon

**Een webgame gebouwd met Pixi.js** – run je eigen shoarmarestaurant!

## Locaal draaien

```bash
# Dependencies installeren (alleen `serve`)
npm install

# Lokaal ontwikkelen (live preview van huidige map)
npm run dev# → opent op http://localhost:3000

# Bouwen naar /dist
npm run build

# Build lokaal previewen
npm run preview# → opent op http://localhost:3000
```

## Dployen naar GitHub Pages

1. **Zet de repo op GitHub**
   ```bash
   git init
   git add .
   git commit -m "Eerste commit"
   git remote add origin https://github.com/JOUW-GEBRUIKERSNAAM/chicken-shoarma-tycoon.git
   git branch -M main
   git push -u origin main
   ```

2. **Zet GitHub Pages aan** in je repo:
   - Ga naar **Settings** → **Pages**
   - Bij **Source** kies je **"GitHub Actions"**

3. Bij elke `git push` naar de `main`-branch bouwt de Actions-workflow
   de site automatisch en deployet hem naar
   `https://JOUW-GEBRUIKERSNAAM.github.io/chicken-shoarma-tycoon/`

## Bestanden

| Bestand | Doel |
|---------|------|
| `index.html` | Hoofdpagina met Pixi.js CDN |
| `style.css` | Vormgeving (header, gamecontainer, etc.) |
| `game.js` | Het spel – Pixi.js game-logica |
| `build.js` | Node.js build script → kopieert naar /dist |
| `.github/workflows/deploy.yml` | GitHub Actions – automatische deploy |

## Licentie

Vrij te gebruiken voor educatieve en persoonlijke projecten.