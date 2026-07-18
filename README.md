# Marcomathematics

Interactive 3D cube net folding visualizer — explore all 11 distinct nets of a cube and watch them fold into a 3D shape in the browser.

## Live demo

Open `index.html` in a modern browser, or serve the folder locally:

```bash
python3 -m http.server 8080
```

Then visit [http://localhost:8080](http://localhost:8080).

## Features

- All **11 distinct cube nets** with labeled, color-coded faces
- Smooth **fold / unfold** animation with manual slider control
- **Orbit controls** — drag to rotate, scroll to zoom, right-click to pan
- No build step required — plain HTML, CSS, and ES modules with Three.js via CDN

## Files

| File | Description |
|------|-------------|
| `index.html` | Page structure and UI |
| `styles.css` | Layout and styling |
| `app.js` | Three.js scene, hinge-based folding logic |
| `nets.js` | Definitions for all 11 cube nets |

## How folding works

Each net is a tree of hinge groups. The root face stays fixed; child faces are attached to pivot groups positioned at shared edges. Rotating a pivot by 90° folds the attached face, and nested hinges compose multi-step folds (e.g. right → back).

## Tech

- [Three.js](https://threejs.org/) (r170) via jsDelivr CDN
- ES modules with import maps — no bundler needed

## License

MIT
