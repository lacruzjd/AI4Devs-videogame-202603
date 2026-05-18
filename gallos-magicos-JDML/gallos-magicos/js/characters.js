/**
 * characters.js
 * Define las transformaciones del jugador, los rivales enemigos y todas las
 * funciones de dibujo de gallos caricaturescos con Canvas 2D.
 *
 * Datos de diseño: Prompts 9, 11 y 15 del GDD.
 *
 * Depende de (globals definidos en main.js y scenes.js):
 *   ctx, STATE, STAGES
 */

/* ----------------------------------------------------------------
   PALETA DE PARTÍCULAS
   Mapea el emoji de cada habilidad a sus colores de explosión.
   ---------------------------------------------------------------- */
const PARTICLE_COLORS = {
  "🐔": ["#F5F5DC", "#DAA520", "#8B6914"],
  "🔥": ["#FF4500", "#FF8C00", "#FFD700"],
  "💨": ["#87CEEB", "#B0E0E6", "#FFFFFF"],
  "⚡": ["#FFD700", "#FFFF00", "#FFA500"],
  "🌽": ["#388E3C", "#F9A825", "#8B6914"],
  "🎉": ["#E91E63", "#00BCD4", "#FFD700", "#FF4500", "#9C27B0"],
  "💥": ["#FF1744", "#FF6B6B", "#8B0000"],
};

/* ----------------------------------------------------------------
   TRANSFORMACIONES DEL JUGADOR  (Prompts 9 y 11)
   Cada entrada hereda todas las habilidades anteriores más una nueva.
   Cooldowns en milisegundos; daño base sin multiplicador de espectáculo.
   ---------------------------------------------------------------- */
const TRANSFORMS = [
  /* 0 – Gallo Básico (estado inicial sin poderes) */
  {
    name: "Gallo Básico",
    c1: "#F5F5DC",
    c2: "#DAA520",
    bonus: { humor: 0, style: 0 },
    skills: [
      {
        key: "Q",
        emoji: "🐔",
        name: "Picotazo",
        dmg: 10,
        humor: 3,
        style: 3,
        cd: 3000,
      },
    ],
  },

  /* 1 – Gallo Llamas Disco (poder de fuego, absorbido del Gallo de Fuego) */
  {
    name: "Gallo Llamas Disco",
    c1: "#FF4500",
    c2: "#FF8C00",
    bonus: { humor: 20, style: 10 },
    skills: [
      {
        key: "Q",
        emoji: "🐔",
        name: "Picotazo",
        dmg: 10,
        humor: 3,
        style: 3,
        cd: 3000,
      },
      {
        key: "W",
        emoji: "🔥",
        name: "Llamarada Disco",
        dmg: 15,
        humor: 7,
        style: 5,
        cd: 5000,
      },
    ],
  },

  /* 2 – Gallo Globo (poder de viento, absorbido del Gallo de Viento) */
  {
    name: "Gallo Globo",
    c1: "#4169E1",
    c2: "#87CEEB",
    bonus: { humor: 15, style: 15 },
    skills: [
      {
        key: "Q",
        emoji: "🐔",
        name: "Picotazo",
        dmg: 10,
        humor: 3,
        style: 3,
        cd: 3000,
      },
      {
        key: "W",
        emoji: "🔥",
        name: "Llamarada Disco",
        dmg: 15,
        humor: 7,
        style: 5,
        cd: 5000,
      },
      {
        key: "E",
        emoji: "💨",
        name: "Soplido Inflador",
        dmg: 20,
        humor: 7,
        style: 8,
        cd: 6000,
      },
    ],
  },

  /* 3 – Gallo Punk Eléctrico (poder de trueno, absorbido del Gallo Trueno) */
  {
    name: "Gallo Punk Eléctrico",
    c1: "#FFD700",
    c2: "#7B1FA2",
    bonus: { humor: 25, style: 20 },
    skills: [
      {
        key: "Q",
        emoji: "🐔",
        name: "Picotazo",
        dmg: 10,
        humor: 3,
        style: 3,
        cd: 3000,
      },
      {
        key: "W",
        emoji: "🔥",
        name: "Llamarada Disco",
        dmg: 15,
        humor: 7,
        style: 5,
        cd: 5000,
      },
      {
        key: "E",
        emoji: "💨",
        name: "Soplido Inflador",
        dmg: 20,
        humor: 7,
        style: 8,
        cd: 6000,
      },
      {
        key: "R",
        emoji: "⚡",
        name: "Rayo Guitarra",
        dmg: 20,
        humor: 10,
        style: 10,
        cd: 7000,
      },
    ],
  },

  /* 4 – Gallo Espiga Dorada (poder de tierra, absorbido del Gallo Tierra) */
  {
    name: "Gallo Espiga Dorada",
    c1: "#388E3C",
    c2: "#F9A825",
    bonus: { humor: 30, style: 25 },
    skills: [
      {
        key: "Q",
        emoji: "🐔",
        name: "Picotazo",
        dmg: 10,
        humor: 3,
        style: 3,
        cd: 3000,
      },
      {
        key: "W",
        emoji: "🔥",
        name: "Llamarada Disco",
        dmg: 15,
        humor: 7,
        style: 5,
        cd: 5000,
      },
      {
        key: "E",
        emoji: "💨",
        name: "Soplido Inflador",
        dmg: 20,
        humor: 7,
        style: 8,
        cd: 6000,
      },
      {
        key: "R",
        emoji: "⚡",
        name: "Rayo Guitarra",
        dmg: 20,
        humor: 10,
        style: 10,
        cd: 7000,
      },
      {
        key: "T",
        emoji: "🌽",
        name: "Trampa Espigas",
        dmg: 30,
        humor: 12,
        style: 12,
        cd: 8000,
      },
    ],
  },

  /* 5 – Gallo Arcoíris Supremo (forma final tras vencer al Rival Supremo) */
  {
    name: "Gallo Arcoíris Supremo",
    c1: "#E91E63",
    c2: "#00BCD4",
    bonus: { humor: 50, style: 50 },
    skills: [
      {
        key: "Q",
        emoji: "🐔",
        name: "Picotazo",
        dmg: 10,
        humor: 3,
        style: 3,
        cd: 3000,
      },
      {
        key: "W",
        emoji: "🔥",
        name: "Llamarada Disco",
        dmg: 15,
        humor: 7,
        style: 5,
        cd: 5000,
      },
      {
        key: "E",
        emoji: "💨",
        name: "Soplido Inflador",
        dmg: 20,
        humor: 7,
        style: 8,
        cd: 6000,
      },
      {
        key: "R",
        emoji: "⚡",
        name: "Rayo Guitarra",
        dmg: 20,
        humor: 10,
        style: 10,
        cd: 7000,
      },
      {
        key: "T",
        emoji: "🌽",
        name: "Trampa Espigas",
        dmg: 30,
        humor: 12,
        style: 12,
        cd: 8000,
      },
      {
        key: "Y",
        emoji: "🎉",
        name: "¡ULTRA CONFETI!",
        dmg: 50,
        humor: 15,
        style: 15,
        cd: 10000,
      },
    ],
  },
];

/* ----------------------------------------------------------------
   ACCESORIOS EXTRA DEL JUGADOR (uno por índice de transformación)
   Cada entrada es una función (ctx) que dibuja sobre el gallo ya trazado.
   El ctx ya tiene la transformación de translate/scale aplicada.
   ---------------------------------------------------------------- */
const PLAYER_EXTRAS = [
  /* 0 – Gallo Básico: sin accesorios */
  null,

  /* 1 – Gallo Llamas Disco: gafas disco + llamaradas orbitales */
  (c) => {
    c.fillStyle = "#FF8F00";
    for (let i = 0; i < 5; i++) {
      const a = (Date.now() * 0.005 + i * 1.26) % (Math.PI * 2);
      c.beginPath();
      c.arc(Math.cos(a) * 26, -10 + Math.sin(a) * 18, 6, 0, Math.PI * 2);
      c.fill();
    }
    c.fillStyle = "#212121";
    c.fillRect(10, -33, 24, 7);
    c.fillStyle = "#FF5722";
    c.fillRect(12, -32, 9, 5);
    c.fillRect(24, -32, 9, 5);
  },

  /* 2 – Gallo Globo: burbujas orbitales + bufanda */
  (c) => {
    c.strokeStyle = "#82B1FF";
    c.lineWidth = 2;
    for (let i = 0; i < 4; i++) {
      const a = (Date.now() * 0.002 + i * 1.57) % (Math.PI * 2);
      c.beginPath();
      c.arc(Math.cos(a) * 36, -20 + Math.sin(a) * 28, 11, 0, Math.PI * 2);
      c.stroke();
    }
    c.fillStyle = "#42A5F5";
    c.beginPath();
    c.ellipse(8, -10, 20, 7, 0.3, 0, Math.PI * 2);
    c.fill();
  },

  /* 3 – Gallo Punk Eléctrico: rayos rotativos + mohawk bicolor */
  (c) => {
    c.strokeStyle = "#FFD700";
    c.lineWidth = 2;
    for (let i = 0; i < 3; i++) {
      const a = (Date.now() * 0.007 + i * 2.1) % (Math.PI * 2);
      c.beginPath();
      c.moveTo(0, 0);
      c.lineTo(Math.cos(a) * 42, Math.sin(a) * 30);
      c.stroke();
    }
    c.fillStyle = "#7B1FA2";
    c.beginPath();
    c.moveTo(7, -42);
    c.lineTo(11, -64);
    c.lineTo(15, -42);
    c.closePath();
    c.fill();
    c.fillStyle = "#FFD700";
    c.beginPath();
    c.moveTo(12, -42);
    c.lineTo(15, -59);
    c.lineTo(18, -42);
    c.closePath();
    c.fill();
  },

  /* 4 – Gallo Espiga Dorada: aura pulsante + sombrero de paja */
  (c) => {
    c.strokeStyle = "rgba(249,168,37,0.55)";
    c.lineWidth = 5;
    c.beginPath();
    c.arc(0, -5, 46 + Math.sin(Date.now() * 0.004) * 5, 0, Math.PI * 2);
    c.stroke();
    c.fillStyle = "#F9A825";
    c.beginPath();
    c.ellipse(12, -46, 24, 6, 0, 0, Math.PI * 2);
    c.fill();
    c.fillStyle = "#795548";
    c.beginPath();
    c.moveTo(0, -46);
    c.lineTo(12, -63);
    c.lineTo(24, -46);
    c.closePath();
    c.fill();
  },

  /* 5 – Gallo Arcoíris Supremo: anillos arcoíris + corona de maíz */
  (c) => {
    ["#F44336", "#FF9800", "#FFEB3B", "#4CAF50", "#2196F3", "#9C27B0"].forEach(
      (col, i) => {
        c.strokeStyle = col;
        c.lineWidth = 3;
        c.beginPath();
        c.arc(
          0,
          -5,
          33 + i * 7 + Math.sin(Date.now() * 0.004 + i) * 3,
          0,
          Math.PI * 2,
        );
        c.stroke();
      },
    );
    c.fillStyle = "#FFD700";
    c.beginPath();
    [
      [-12, 0],
      [-6, 15],
      [0, 0],
      [6, 15],
      [12, 0],
    ].forEach(([dx, dy], i) => {
      if (i === 0) c.moveTo(12 + dx, -51 + dy);
      else c.lineTo(12 + dx, -51 + dy);
    });
    c.closePath();
    c.fill();
  },
];

/* ----------------------------------------------------------------
   ACCESORIOS EXTRA DEL ENEMIGO (uno por índice de escenario)
   ---------------------------------------------------------------- */
const ENEMY_EXTRAS = [
  /* 0 – Gallo de Fuego: gafas + llamaradas */
  (c) => {
    c.fillStyle = "#B71C1C";
    c.fillRect(-30, -34, 24, 8);
    c.fillStyle = "#212121";
    c.fillRect(-28, -33, 9, 5);
    c.fillRect(-17, -33, 9, 5);
    for (let i = 0; i < 4; i++) {
      const a = (Date.now() * 0.005 + i) % (Math.PI * 2);
      c.fillStyle = "rgba(255,87,34,0.75)";
      c.beginPath();
      c.arc(-10 + Math.cos(a) * 20, Math.sin(a) * 14, 8, 0, Math.PI * 2);
      c.fill();
    }
  },

  /* 1 – Gallo de Viento: bufanda ondeante */
  (c) => {
    c.fillStyle = "#42A5F5";
    c.beginPath();
    c.moveTo(-15, -15);
    c.quadraticCurveTo(-42, -30 + Math.sin(Date.now() * 0.004) * 10, -56, -8);
    c.lineTo(-51, -3);
    c.quadraticCurveTo(-36, -20, -10, -8);
    c.closePath();
    c.fill();
  },

  /* 2 – Gallo Trueno: mohawk + rayos + guitarra */
  (c) => {
    c.fillStyle = "#6A1B9A";
    c.beginPath();
    c.moveTo(-14, -43);
    c.lineTo(-10, -67);
    c.lineTo(-6, -43);
    c.closePath();
    c.fill();
    c.strokeStyle = "#FFD700";
    c.lineWidth = 2;
    for (let i = 0; i < 3; i++) {
      const a = (Date.now() * 0.006 + i * 2.09) % (Math.PI * 2);
      c.beginPath();
      c.moveTo(-5, 0);
      c.lineTo(-5 + Math.cos(a) * 38, Math.sin(a) * 28);
      c.stroke();
    }
    c.fillStyle = "#4E342E";
    c.fillRect(-36, 6, 13, 28);
    c.fillStyle = "#A1887F";
    c.beginPath();
    c.arc(-30, 20, 11, 0, Math.PI * 2);
    c.fill();
    c.strokeStyle = "#FFD700";
    c.lineWidth = 1;
    for (let s = 0; s < 3; s++) {
      c.beginPath();
      c.moveTo(-36, 10 + s * 5);
      c.lineTo(-22, 10 + s * 5);
      c.stroke();
    }
  },

  /* 3 – Gallo Tierra: sombrero de paja + espigas decorativas */
  (c) => {
    c.fillStyle = "#F9A825";
    c.beginPath();
    c.ellipse(-10, -46, 24, 6, 0, 0, Math.PI * 2);
    c.fill();
    c.fillStyle = "#5D4037";
    c.beginPath();
    c.moveTo(-22, -46);
    c.lineTo(-10, -63);
    c.lineTo(2, -46);
    c.closePath();
    c.fill();
    c.strokeStyle = "#F9A825";
    c.lineWidth = 2;
    [-28, -14, 0, 14, 28].forEach((ox) => {
      c.beginPath();
      c.moveTo(ox, 50);
      c.lineTo(ox, 20);
      c.stroke();
      c.beginPath();
      c.ellipse(ox, 12, 4, 9, 0, 0, Math.PI * 2);
      c.fill();
    });
  },

  /* 4 – Rival Supremo: anillos multicolor + corona */
  (c) => {
    ["#E91E63", "#00BCD4", "#FFD700", "#FF5722", "#9C27B0"].forEach(
      (col, i) => {
        c.strokeStyle = col;
        c.lineWidth = 3;
        c.beginPath();
        c.arc(
          0,
          -6,
          38 + i * 7 + Math.sin(Date.now() * 0.004 + i) * 4,
          0,
          Math.PI * 2,
        );
        c.stroke();
      },
    );
    c.fillStyle = "#FFD700";
    c.beginPath();
    c.moveTo(-22, -46);
    c.lineTo(-18, -60);
    c.lineTo(-12, -47);
    c.lineTo(-7, -63);
    c.lineTo(-2, -47);
    c.closePath();
    c.fill();
    c.strokeStyle = "#FF8F00";
    c.lineWidth = 1.5;
    c.stroke();
  },
];

/* ================================================================
   drawRooster — Función principal de dibujo de gallos
   ================================================================ */

/**
 * Dibuja un gallo caricaturesco centrado en (cx, cy) con Canvas 2D.
 * Estilo basado en la referencia visual del GDD (Prompt 26):
 * cuerpo rechoncho con pecho cremoso, cola en abanico, ojos expresivos,
 * pico abierto, doble barbilla y patas con garras.
 *
 * @param {number}        cx          Centro X
 * @param {number}        cy          Base Y (pie del gallo)
 * @param {string}        c1          Color principal de las plumas
 * @param {string}        c2          Color de acento / borde
 * @param {boolean}       facingRight true = mira a la derecha
 * @param {string}        anim        'idle' | 'attack' | 'hit'
 * @param {Function|null} extras      Función opcional (ctx) para accesorios extra
 */
function drawRooster(cx, cy, c1, c2, facingRight, anim, extras) {
  ctx.save();

  const ox  = anim === 'hit' ? (Math.random() - 0.5) * 7 : 0;
  const oy  = anim === 'hit' ? (Math.random() - 0.5) * 4 : 0;
  const bob = anim === 'idle' ? Math.sin(Date.now() * 0.0035) * 3 : 0;

  ctx.translate(cx + ox, cy + bob + oy);
  if (!facingRight) ctx.scale(-1, 1);

  // ── Sombra ──────────────────────────────────────────────────
  ctx.fillStyle = 'rgba(0,0,0,0.18)';
  ctx.beginPath();
  ctx.ellipse(3, 57, 32, 7, 0, 0, Math.PI * 2);
  ctx.fill();

  // ── Cola en abanico ─────────────────────────────────────────
  // 6 plumas rotadas desde la cadera, barriendo de abajo-izquierda a arriba
  const FAN_BASE = [-20, 10];
  const FAN_ANG  = [Math.PI*2/3, Math.PI*5/6, Math.PI, Math.PI*7/6, Math.PI*4/3, Math.PI*3/2];
  const FAN_LEN  = [36, 40, 43, 43, 40, 36];
  const FAN_COL  = [c2, c1, c2, c1, c2, c1];
  FAN_ANG.forEach((ang, i) => {
    const hl = FAN_LEN[i];
    const hw = 5.5 + i * 0.4;
    ctx.save();
    ctx.translate(FAN_BASE[0], FAN_BASE[1]);
    ctx.rotate(ang + Math.PI / 2);
    ctx.fillStyle   = FAN_COL[i];
    ctx.strokeStyle = 'rgba(0,0,0,0.22)';
    ctx.lineWidth   = 1;
    ctx.beginPath();
    ctx.ellipse(0, -hl / 2, hw, hl / 2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = 'rgba(0,0,0,0.14)';
    ctx.lineWidth   = 0.8;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -hl);
    ctx.stroke();
    ctx.restore();
  });

  // ── Cuerpo ──────────────────────────────────────────────────
  ctx.fillStyle   = c1;
  ctx.beginPath();
  ctx.ellipse(2, 18, 27, 34, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = 'rgba(0,0,0,0.55)';
  ctx.lineWidth   = 2.5;
  ctx.stroke();

  // Pecho cremoso con gradiente radial
  const bellyG = ctx.createRadialGradient(7, 24, 2, 7, 24, 22);
  bellyG.addColorStop(0,    'rgba(255,250,225,0.93)');
  bellyG.addColorStop(0.55, 'rgba(255,250,225,0.42)');
  bellyG.addColorStop(1,    'rgba(255,250,225,0)');
  ctx.fillStyle = bellyG;
  ctx.beginPath();
  ctx.ellipse(7, 24, 16, 20, 0, 0, Math.PI * 2);
  ctx.fill();

  // Arcos de ala sobre el cuerpo
  ctx.strokeStyle = 'rgba(0,0,0,0.12)';
  ctx.lineWidth   = 1.5;
  [0, 7].forEach(dy => {
    ctx.beginPath();
    ctx.arc(-1, 20 + dy, 18, Math.PI * 0.1, Math.PI * 0.9);
    ctx.stroke();
  });

  // ── Cuello ──────────────────────────────────────────────────
  ctx.fillStyle = c1;
  ctx.beginPath();
  ctx.moveTo(-1, -8);
  ctx.lineTo(17, -8);
  ctx.lineTo(21, -20);
  ctx.lineTo(5, -20);
  ctx.closePath();
  ctx.fill();

  // ── Cabeza ──────────────────────────────────────────────────
  ctx.fillStyle   = c1;
  ctx.beginPath();
  ctx.arc(13, -28, 21, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = 'rgba(0,0,0,0.55)';
  ctx.lineWidth   = 2.5;
  ctx.stroke();

  // ── Cresta (3 lóbulos prominentes) ──────────────────────────
  ctx.fillStyle   = '#E53935';
  ctx.strokeStyle = '#B71C1C';
  ctx.lineWidth   = 1.5;
  [[-2, -44, 6.5], [7, -50, 8.5], [16, -45, 6.5]].forEach(([x, y, r]) => {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  });
  ctx.fillStyle = '#E53935';
  ctx.fillRect(-4, -43, 26, 7);

  // ── Barbillas (dos wattles) ──────────────────────────────────
  ctx.strokeStyle = '#B71C1C';
  ctx.lineWidth   = 1;
  [[23, -14, 6], [17, -9, 5]].forEach(([x, y, r]) => {
    ctx.fillStyle = '#E53935';
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  });

  // ── Pico (abierto / sonriente) ──────────────────────────────
  ctx.fillStyle = '#FDD835';
  ctx.beginPath();
  ctx.moveTo(29, -32); ctx.lineTo(46, -26); ctx.lineTo(31, -23);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#F9A825';
  ctx.beginPath();
  ctx.moveTo(31, -23); ctx.lineTo(46, -26); ctx.lineTo(32, -18);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = 'rgba(0,0,0,0.35)';
  ctx.lineWidth   = 1;
  ctx.beginPath();
  ctx.moveTo(29, -32); ctx.lineTo(46, -26); ctx.lineTo(32, -18);
  ctx.stroke();

  // ── Ojo ─────────────────────────────────────────────────────
  ctx.fillStyle   = '#FFFFFF';
  ctx.beginPath();
  ctx.arc(20, -31, 9, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = 'rgba(0,0,0,0.32)';
  ctx.lineWidth   = 1.5;
  ctx.stroke();
  ctx.fillStyle = anim === 'hit' ? '#F44336' : '#1A1A1A';
  ctx.beginPath();
  ctx.arc(22, -31, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.arc(24, -33, 2.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.55)';
  ctx.beginPath();
  ctx.arc(20, -30, 1.2, 0, Math.PI * 2);
  ctx.fill();

  // ── Patas ───────────────────────────────────────────────────
  ctx.strokeStyle = '#FF8F00';
  ctx.lineCap     = 'round';
  ctx.lineWidth   = 5;
  [[-4, 50, -5, 64], [10, 50, 11, 64]].forEach(([x1, y1, x2, y2]) => {
    ctx.beginPath();
    ctx.moveTo(x1, y1); ctx.lineTo(x2, y2);
    ctx.stroke();
  });

  // Dedos con garras (3 adelante + 1 atrás por pie)
  ctx.lineWidth = 3;
  [[-19,71],[-5,74],[5,70]].forEach(([tx,ty]) => {
    ctx.beginPath(); ctx.moveTo(-5,64); ctx.lineTo(tx,ty); ctx.stroke();
  });
  ctx.beginPath(); ctx.moveTo(-5,65); ctx.lineTo(-12,59); ctx.stroke();

  [[-1,71],[11,74],[21,70]].forEach(([tx,ty]) => {
    ctx.beginPath(); ctx.moveTo(11,64); ctx.lineTo(tx,ty); ctx.stroke();
  });
  ctx.beginPath(); ctx.moveTo(11,65); ctx.lineTo(17,59); ctx.stroke();

  // ── Extras de transformación / rival ────────────────────────
  if (extras) extras(ctx);

  ctx.restore();
}

/**
 * Dibuja al gallo del jugador en la posición izquierda del canvas.
 * Lee STATE.transform y STATE.playerAnim del estado global.
 */
function drawPlayer() {
  const tr = TRANSFORMS[STATE.transform];
  drawRooster(
    160,
    295,
    tr.c1,
    tr.c2,
    true,
    STATE.playerAnim,
    PLAYER_EXTRAS[STATE.transform],
  );
}

/**
 * Dibuja al gallo enemigo en la posición derecha del canvas, espejado.
 * Lee STATE.stage y STATE.enemyAnim del estado global.
 */
function drawEnemy() {
  const e = STAGES[STATE.stage].enemy;
  drawRooster(
    640,
    295,
    e.c1,
    e.c2,
    false,
    STATE.enemyAnim,
    ENEMY_EXTRAS[STATE.stage],
  );
}
