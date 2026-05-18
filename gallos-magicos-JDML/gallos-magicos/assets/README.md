# assets/

Directorio para recursos estáticos del juego.

## Estructura sugerida

```
assets/
├── img/         ← sprites, fondos e iconos PNG/SVG
├── audio/       ← efectos de sonido y música (MP3/OGG)
└── fonts/       ← fuentes tipográficas personalizadas (WOFF2)
```

## Estado actual

Los gráficos del juego están generados con Canvas 2D (sin imágenes externas).
Los sonidos y la música están pendientes de implementación en una versión futura.

Cuando se añadan recursos, referenciarlos en los módulos correspondientes:
- Imágenes → `js/characters.js` o `js/scenes.js`
- Audio    → `js/mechanics.js` (eventos de combate)
- Fuentes  → `css/style.css`
