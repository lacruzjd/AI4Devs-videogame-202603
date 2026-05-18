# Sonidos de Gallos Mágicos

Todos los efectos de sonido se sintetizan en tiempo real mediante **Web Audio API** (ver `js/sounds.js`).  
No se requieren archivos de audio externos — el juego funciona completamente con `file://`.

## Objeto global `SFX`

Inicializar en la primera interacción del usuario:

```js
SFX.init();
```

## Métodos disponibles

### Ataques del jugador

| Método                  | Habilidad          | Descripción                             |
| ----------------------- | ------------------ | --------------------------------------- |
| `SFX.attack_picotazo()` | 🐔 Picotazo        | Cacareo corto descendente (square)      |
| `SFX.attack_llamarada()`| 🔥 Llamarada Disco | Whoosh de ruido + tono ascendente       |
| `SFX.attack_soplido()`  | 💨 Soplido Inflador| Ráfaga de viento grave                  |
| `SFX.attack_rayo()`     | ⚡ Rayo Guitarra   | Riff eléctrico en dos pasos (sawtooth)  |
| `SFX.attack_espigas()`  | 🌽 Trampa Espigas  | Tres pops rápidos de ruido              |
| `SFX.attack_confeti()`  | 🎉 ULTRA CONFETI!  | Acorde ascendente + explosión de ruido  |

### Impacto y público

| Método          | Evento                    | Descripción                            |
| --------------- | ------------------------- | -------------------------------------- |
| `SFX.impact()`  | Golpe del enemigo         | Impacto grave + rebote de ruido        |
| `SFX.ovacion()` | Ataque variado (ovación)  | Aplauso suave + tono corto             |
| `SFX.tomatazo()`| Ataque repetido (tomates) | Golpe chato descendente                |
| `SFX.combo()`   | Combo ×3                  | Tres notas ascendentes en sucesión     |

### Premios

| Método                 | Premio              | Descripción                    |
| ---------------------- | ------------------- | ------------------------------ |
| `SFX.prize_maiz()`     | 🌽 Maíz pequeño     | Ding simple agudo              |
| `SFX.prize_palomitas()`| 🍿 Palomitas mágicas| Dos pops escalonados           |
| `SFX.prize_huevo()`    | 🥚 Huevo Dorado     | Carillón mágico de 3 notas     |
| `SFX.prize_confeti()`  | 🎉 Confeti Arcoíris | Fanfarria + explosión de ruido |

### Entrenamiento

| Método                  | Evento              | Descripción                 |
| ----------------------- | ------------------- | --------------------------- |
| `SFX.training_hit()`    | Objetivo golpeado   | Ding agudo                  |
| `SFX.training_done()`   | Sesión completada   | Acorde de fanfarria         |

### Transformaciones y pantallas

| Método                  | Evento                      | Descripción                          |
| ----------------------- | --------------------------- | ------------------------------------ |
| `SFX.new_transform()`   | Nueva transformación        | Tres tonos ascendentes con gap       |
| `SFX.victory()`         | Victoria final (torneo)     | Fanfarria de 5 notas                 |
| `SFX.stage_win()`       | Victoria de etapa           | Fanfarria corta de 3 notas           |
| `SFX.defeat()`          | Derrota del jugador         | Cuatro notas descendentes ("wah wah")|

## Arquitectura interna

`sounds.js` es un IIFE que expone el objeto `SFX`. Los helpers internos son:

- `_ctx()` — obtiene o crea el `AudioContext`, reanudándolo si el navegador lo suspendió.
- `_tone(freq, type, vol, dur, [end])` — oscilador con envolvente de amplitud y glide opcional.
- `_noise(vol, dur, filterHz)` — burst de ruido blanco filtrado (bandpass).
- `_seq(freqs, type, vol, dur, gap)` — secuencia de tonos escalonados (acordes, fanfarrias).

Para añadir un nuevo efecto, crear un método en el bloque `return { … }` de `sounds.js` usando estos helpers.
