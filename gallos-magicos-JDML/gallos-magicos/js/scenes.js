/**
 * scenes.js
 * Define los 5 escenarios del torneo (Prompts 5, 7, 8, 16, 27) y sus funciones
 * de renderizado de fondo y decoración animada.
 *
 * Fondos renovados en Prompt 27 para reflejar la referencia visual:
 *   0 – Granero Encantado      (interior cálido, balas de heno, barriles, huevos)
 *   1 – Volcán de Palomitas    (erupción dramática, nube explosiva, palomitas)
 *   2 – Bosque de Huevos Gigantes (claro luminoso, árboles, huevos gigantes)
 *   3 – Arena de Patos Fans    (estadio circular, multitud de patos, confeti)
 *   4 – Templo del Maíz Dorado (templo oscuro, columnas de maíz, altar dorado)
 *
 * Depende de (globals definidos en main.js):
 *   ctx
 */

/* ----------------------------------------------------------------
   ESCENARIOS DEL TORNEO
   ---------------------------------------------------------------- */
const STAGES = [
  /* 0 – Granero Encantado */
  {
    id: 0, name: 'Granero Encantado',
    sky: '#120800', mid: '#5C2A08', ground: '#3D1A00',
    enemy: {
      name: 'Gallo de Fuego', c1: '#FF4500', c2: '#FF8C00',
      phrase: '¡Soy el más flamígero del torneo!', cd: 3000,
    },
  },
  /* 1 – Volcán de Palomitas */
  {
    id: 1, name: 'Volcán de Palomitas',
    sky: '#0A0000', mid: '#9B2800', ground: '#1A0400',
    enemy: {
      name: 'Gallo de Viento', c1: '#4169E1', c2: '#87CEEB',
      phrase: '¡Flooooto sin rumbo, ja ja ja!', cd: 2700,
    },
  },
  /* 2 – Bosque de Huevos Gigantes */
  {
    id: 2, name: 'Bosque de Huevos Gigantes',
    sky: '#6ABCE8', mid: '#5AAA3A', ground: '#2E6A1A',
    enemy: {
      name: 'Gallo Trueno', c1: '#7B1FA2', c2: '#FFD700',
      phrase: '¡RIFF! ¡Descarga punk activada!', cd: 2200,
    },
  },
  /* 3 – Arena de Patos Fans */
  {
    id: 3, name: 'Arena de Patos Fans',
    sky: '#5A9AD0', mid: '#A03018', ground: '#801810',
    enemy: {
      name: 'Gallo Tierra', c1: '#388E3C', c2: '#F9A825',
      phrase: 'Las espigas me hablan… y me dicen que te frían.', cd: 1700,
    },
  },
  /* 4 – Templo del Maíz Dorado */
  {
    id: 4, name: 'Templo del Maíz Dorado',
    sky: '#040200', mid: '#2C1200', ground: '#1A0C00',
    enemy: {
      name: 'Rival Supremo', c1: '#E91E63', c2: '#00BCD4',
      phrase: '¡Yo soy el Teatro Elemental Definitivo!', cd: 1300,
    },
  },
];

/* ================================================================
   RENDERIZADO DE FONDO
   ================================================================ */

/**
 * Dibuja el degradado de fondo completo del escenario (cielo + suelo).
 * Usa gradientes de múltiples paradas específicos por escenario.
 * @param {{ id:number, sky:string, mid:string, ground:string }} stage
 */
function drawBackground(stage) {
  const g = ctx.createLinearGradient(0, 0, 0, 490);
  switch (stage.id) {
    case 0: // Granero: interior cálido, ámbar oscuro
      g.addColorStop(0,    '#120800');
      g.addColorStop(0.45, '#5C2A08');
      g.addColorStop(0.72, '#8B4414');
      g.addColorStop(1,    '#3D1A00');
      break;
    case 1: // Volcán: dramático rojo-naranja
      g.addColorStop(0,    '#0A0000');
      g.addColorStop(0.28, '#3C0800');
      g.addColorStop(0.55, '#9B2800');
      g.addColorStop(0.78, '#C84000');
      g.addColorStop(1,    '#1A0400');
      break;
    case 2: // Bosque: azul cielo brillante, verde
      g.addColorStop(0,    '#6ABCE8');
      g.addColorStop(0.50, '#B8DFF5');
      g.addColorStop(0.62, '#5AAA3A');
      g.addColorStop(0.78, '#3E8A28');
      g.addColorStop(1,    '#2E6A1A');
      break;
    case 3: // Arena: cielo azul, suelo rojo arena
      g.addColorStop(0,    '#5A9AD0');
      g.addColorStop(0.42, '#88C0E8');
      g.addColorStop(0.58, '#A03018');
      g.addColorStop(1,    '#801810');
      break;
    case 4: // Templo: oscuro místico con toque dorado
      g.addColorStop(0,    '#040200');
      g.addColorStop(0.38, '#0D0600');
      g.addColorStop(0.68, '#2C1200');
      g.addColorStop(0.88, '#4A2000');
      g.addColorStop(1,    '#1A0C00');
      break;
    default:
      g.addColorStop(0, stage.sky);
      g.addColorStop(0.7, stage.mid);
      g.addColorStop(1, stage.ground);
  }
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 800, 490);

  ctx.strokeStyle = 'rgba(0,0,0,0.4)';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, 360); ctx.lineTo(800, 360); ctx.stroke();
}

/**
 * Despacha a la función decorativa del escenario según su id.
 * @param {number} stageId Índice del escenario (0–4)
 */
function drawSceneDecor(stageId) {
  ctx.save();
  switch (stageId) {
    case 0: _drawGranero(); break;
    case 1: _drawVolcan();  break;
    case 2: _drawBosque();  break;
    case 3: _drawArena();   break;
    case 4: _drawTemplo();  break;
  }
  ctx.restore();
}

/* ================================================================
   DECORACIÓN POR ESCENARIO
   ================================================================ */

/** 0 – Granero Encantado: interior de madera, heno, barriles, huevos, linternas */
function _drawGranero() {
  const t = Date.now() * 0.001;

  // Pared trasera de tablas de madera
  ctx.fillStyle = '#3D200A';
  ctx.fillRect(90, 50, 620, 310);
  for (let y = 70; y < 360; y += 30) {
    ctx.fillStyle = (Math.floor(y / 30) % 2 === 0) ? '#361808' : '#2E1406';
    ctx.fillRect(90, y, 620, 29);
  }
  ctx.strokeStyle = '#1A0800'; ctx.lineWidth = 1.5;
  for (let y = 70; y < 360; y += 30) {
    ctx.beginPath(); ctx.moveTo(90, y); ctx.lineTo(710, y); ctx.stroke();
  }
  for (let x = 150; x < 710; x += 55) {
    ctx.strokeStyle = 'rgba(0,0,0,0.25)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(x, 50); ctx.lineTo(x, 360); ctx.stroke();
  }

  // Vigas diagonales del techo
  ctx.strokeStyle = '#1A0800'; ctx.lineWidth = 16;
  ctx.beginPath(); ctx.moveTo(90, 50); ctx.lineTo(400, -5); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(710, 50); ctx.lineTo(400, -5); ctx.stroke();
  ctx.lineWidth = 8;
  ctx.beginPath(); ctx.moveTo(90, 185); ctx.lineTo(400, 85); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(710, 185); ctx.lineTo(400, 85); ctx.stroke();

  // Postes verticales
  ctx.fillStyle = '#1A0800';
  ctx.fillRect(188, 50, 16, 310); ctx.fillRect(596, 50, 16, 310);

  // Zonas de sombra laterales (efecto de profundidad)
  const ls = ctx.createLinearGradient(90, 0, 220, 0);
  ls.addColorStop(0, 'rgba(0,0,0,0.6)'); ls.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = ls; ctx.fillRect(90, 50, 130, 310);
  const rs = ctx.createLinearGradient(580, 0, 710, 0);
  rs.addColorStop(0, 'rgba(0,0,0,0)'); rs.addColorStop(1, 'rgba(0,0,0,0.6)');
  ctx.fillStyle = rs; ctx.fillRect(580, 50, 130, 310);

  // Linternas colgantes (3)
  [220, 400, 580].forEach((lx, i) => {
    const fl = 0.78 + Math.sin(t * 2.4 + i * 1.4) * 0.18;
    const lg = ctx.createRadialGradient(lx, 65, 6, lx, 65, 140);
    lg.addColorStop(0, `rgba(255,195,55,${0.42 * fl})`);
    lg.addColorStop(0.45, `rgba(255,130,20,${0.18 * fl})`);
    lg.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = lg; ctx.fillRect(lx - 140, 0, 280, 310);
    ctx.strokeStyle = '#3D1A00'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(lx, 0); ctx.lineTo(lx, 58); ctx.stroke();
    ctx.fillStyle = '#5D3A10';
    ctx.fillRect(lx - 9, 55, 18, 22);
    ctx.fillStyle = `rgba(255,185,45,${fl})`;
    ctx.beginPath(); ctx.arc(lx, 66, 7, 0, Math.PI * 2); ctx.fill();
  });

  // Balas de heno (izquierda y derecha)
  [[138, 300, 92, 56], [95, 338, 72, 44], [660, 298, 92, 56], [702, 336, 72, 44]].forEach(([x, y, w, h]) => {
    ctx.fillStyle = '#B88808';
    ctx.fillRect(x - w/2, y - h/2, w, h);
    ctx.strokeStyle = '#7A5800'; ctx.lineWidth = 2;
    ctx.strokeRect(x - w/2, y - h/2, w, h);
    ctx.strokeStyle = '#D4A820'; ctx.lineWidth = 1.5;
    for (let s = -w/2 + 14; s < w/2; s += 15) {
      ctx.beginPath(); ctx.moveTo(x + s, y - h/2); ctx.lineTo(x + s - 5, y + h/2); ctx.stroke();
    }
    ctx.strokeStyle = '#4A2C00'; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(x - w/2, y); ctx.lineTo(x + w/2, y); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x, y - h/2); ctx.lineTo(x, y + h/2); ctx.stroke();
  });

  // Barriles de madera (2)
  [295, 510].forEach(bx => {
    const by = 345;
    const bg = ctx.createLinearGradient(bx - 22, 0, bx + 22, 0);
    bg.addColorStop(0, '#3A1C08'); bg.addColorStop(0.5, '#6B3A18'); bg.addColorStop(1, '#3A1C08');
    ctx.fillStyle = bg;
    ctx.beginPath(); ctx.ellipse(bx, by - 12, 22, 35, 0, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#505050'; ctx.lineWidth = 3.5;
    [by - 36, by - 14, by + 8].forEach(hy => {
      ctx.beginPath(); ctx.ellipse(bx, hy, 22, 6, 0, 0, Math.PI * 2); ctx.stroke();
    });
    ctx.fillStyle = '#4A2810';
    ctx.beginPath(); ctx.ellipse(bx, by - 47, 22, 7, 0, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#282800'; ctx.lineWidth = 2; ctx.stroke();
  });

  // Huevos en el suelo
  [[372, 358], [428, 362]].forEach(([ex, ey]) => {
    ctx.fillStyle = '#F0ECE0';
    ctx.beginPath(); ctx.ellipse(ex, ey - 18, 17, 22, 0, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#D4CCBA'; ctx.lineWidth = 1; ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,0.45)';
    ctx.beginPath(); ctx.ellipse(ex - 5, ey - 28, 5, 8, -0.4, 0, Math.PI * 2); ctx.fill();
  });

  // Partículas de heno flotando
  for (let i = 0; i < 10; i++) {
    const ph = (t * 22 + i * 62) % 310;
    const al = ph < 280 ? 0.55 : Math.max(0, 0.55 - (ph - 280) / 30);
    ctx.fillStyle = `rgba(200,155,20,${al})`;
    ctx.beginPath();
    ctx.arc(150 + i * 52 + Math.sin(t * 0.8 + i) * 12, ph + 40, 2.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // Resplandor dorado en el suelo
  const fg = ctx.createLinearGradient(0, 340, 0, 420);
  fg.addColorStop(0, 'rgba(255,140,20,0.28)'); fg.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = fg; ctx.fillRect(0, 340, 800, 80);
}

/** 1 – Volcán de Palomitas: montaña oscura, erupción masiva, palomitas, lava */
function _drawVolcan() {
  const t = Date.now() * 0.001;

  // Nubes de humo laterales
  [[140, 195, 80], [650, 175, 75], [90, 270, 65], [695, 260, 60]].forEach(([cx, cy, r]) => {
    const sg = ctx.createRadialGradient(cx, cy, 10, cx, cy, r);
    sg.addColorStop(0, 'rgba(100,35,8,0.60)');
    sg.addColorStop(0.6, 'rgba(70,22,5,0.28)');
    sg.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = sg;
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
  });

  // Cuerpo del volcán
  const mvg = ctx.createLinearGradient(260, 360, 540, 80);
  mvg.addColorStop(0, '#180400'); mvg.addColorStop(0.5, '#380A00'); mvg.addColorStop(1, '#580E00');
  ctx.fillStyle = mvg;
  ctx.beginPath();
  ctx.moveTo(155, 360); ctx.lineTo(280, 205); ctx.lineTo(358, 95);
  ctx.lineTo(400, 78); ctx.lineTo(442, 93); ctx.lineTo(520, 205); ctx.lineTo(645, 360);
  ctx.closePath(); ctx.fill();

  // Flujos de lava (izquierda)
  const lfg = ctx.createLinearGradient(355, 78, 270, 360);
  lfg.addColorStop(0, '#FF6500'); lfg.addColorStop(0.5, '#CC2800'); lfg.addColorStop(1, '#7A0000');
  ctx.fillStyle = lfg;
  ctx.beginPath();
  ctx.moveTo(358, 95); ctx.quadraticCurveTo(325, 205, 292, 308);
  ctx.quadraticCurveTo(278, 345, 282, 360); ctx.lineTo(315, 360);
  ctx.quadraticCurveTo(308, 308, 332, 218); ctx.quadraticCurveTo(362, 142, 376, 97);
  ctx.closePath(); ctx.fill();

  // Flujos de lava (derecha)
  const rfg = ctx.createLinearGradient(442, 78, 520, 360);
  rfg.addColorStop(0, '#FF6500'); rfg.addColorStop(0.5, '#CC2800'); rfg.addColorStop(1, '#7A0000');
  ctx.fillStyle = rfg;
  ctx.beginPath();
  ctx.moveTo(442, 93); ctx.quadraticCurveTo(472, 205, 502, 310);
  ctx.quadraticCurveTo(512, 345, 510, 360); ctx.lineTo(488, 360);
  ctx.quadraticCurveTo(488, 308, 466, 220); ctx.quadraticCurveTo(438, 140, 424, 97);
  ctx.closePath(); ctx.fill();

  // Cráter (apertura oscura)
  ctx.fillStyle = '#0D0000';
  ctx.beginPath(); ctx.ellipse(400, 90, 44, 19, 0, 0, Math.PI * 2); ctx.fill();

  // Resplandor del cráter
  const cg = ctx.createRadialGradient(400, 88, 12, 400, 88, 130);
  cg.addColorStop(0, 'rgba(255,200,50,0.92)');
  cg.addColorStop(0.3, 'rgba(255,90,0,0.55)');
  cg.addColorStop(0.6, 'rgba(180,35,0,0.28)');
  cg.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = cg;
  ctx.beginPath(); ctx.arc(400, 88, 130, 0, Math.PI * 2); ctx.fill();

  // Nube de erupción (capas de abajo arriba)
  const pulse = Math.sin(t * 1.2) * 5;
  [
    { y: 55,  r: 82,  col: 'rgba(215,75,10,0.88)' },
    { y: 15,  r: 76,  col: 'rgba(255,135,18,0.88)' },
    { y: -22, r: 82,  col: 'rgba(255,195,75,0.86)' },
    { y: -58, r: 68,  col: 'rgba(255,230,140,0.82)' },
    { y: -86, r: 52,  col: 'rgba(255,248,225,0.78)' },
  ].forEach(({ y, r, col }, i) => {
    ctx.fillStyle = col;
    [-32, -12, 8, 28].forEach(ox => {
      ctx.beginPath();
      ctx.arc(400 + ox, y + pulse * (i + 1) * 0.3, r - Math.abs(ox) * 0.28, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.beginPath(); ctx.arc(400, y + pulse * (i + 1) * 0.3, r + 10, 0, Math.PI * 2); ctx.fill();
  });

  // Palomitas volando
  for (let i = 0; i < 14; i++) {
    const age = (t * 0.82 + i * 0.72) % 4.0;
    const px  = 360 + Math.sin(i * 2.3 + t * 0.5) * 105;
    const py  = 88  - age * 108;
    if (py > -30 && py < 360) {
      const al = age < 3.2 ? 0.9 : Math.max(0, 0.9 * (1 - (age - 3.2) / 0.8));
      ctx.fillStyle = `rgba(255,252,230,${al})`;
      ctx.beginPath(); ctx.arc(px, py, 7 + Math.sin(i * 1.7) * 3, 0, Math.PI * 2); ctx.fill();
    }
  }

  // Lava en el suelo
  const lpg = ctx.createRadialGradient(400, 390, 25, 400, 390, 210);
  lpg.addColorStop(0, 'rgba(255,110,0,0.55)');
  lpg.addColorStop(0.45, 'rgba(190,42,0,0.28)');
  lpg.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = lpg; ctx.fillRect(0, 360, 800, 130);
}

/** 2 – Bosque de Huevos Gigantes: cielo azul, árboles, huevos gigantes en nidos */
function _drawBosque() {
  const t = Date.now() * 0.001;

  // Nubes en el cielo
  [[180, 65, 55, 32], [360, 50, 65, 36], [600, 70, 50, 28], [700, 45, 40, 22]].forEach(([cx, cy, rx, ry]) => {
    const pulse = 1 + Math.sin(t * 0.4 + cx * 0.01) * 0.04;
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    [-0.5, 0, 0.5].forEach(off => {
      ctx.beginPath();
      ctx.ellipse(cx + off * rx * 0.8, cy, rx * pulse * (1 - Math.abs(off) * 0.22), ry * pulse, 0, 0, Math.PI * 2);
      ctx.fill();
    });
  });

  // Árboles grandes (izquierda: 2, derecha: 2)
  [[88, 310, 58, 105], [195, 295, 52, 95], [610, 300, 54, 100], [715, 310, 58, 105]].forEach(([tx, ty, cr, ch], i) => {
    // Tronco
    ctx.fillStyle = '#3E2306';
    ctx.fillRect(tx - 11, ty - ch * 0.55, 22, ch * 0.55 + 60);
    // Copa (3 elipses superpuestas para profundidad)
    const hue = 105 + i * 12;
    ctx.fillStyle = `hsl(${hue},44%,22%)`;
    ctx.beginPath(); ctx.ellipse(tx, ty - ch * 0.55, cr * 0.9, cr * 0.7, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = `hsl(${hue},46%,28%)`;
    ctx.beginPath(); ctx.ellipse(tx - cr * 0.2, ty - ch * 0.8, cr * 0.85, cr * 0.65, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = `hsl(${hue + 6},50%,32%)`;
    ctx.beginPath(); ctx.ellipse(tx, ty - ch + Math.sin(t * 0.0015 + i) * 8, cr, cr * 0.78, 0, 0, Math.PI * 2); ctx.fill();
    // Toque de brillo en copa
    ctx.fillStyle = `hsla(${hue + 10},55%,42%,0.5)`;
    ctx.beginPath(); ctx.ellipse(tx - cr * 0.25, ty - ch + 8, cr * 0.45, cr * 0.35, -0.3, 0, Math.PI * 2); ctx.fill();
  });

  // Hierba y luz dorada en el suelo central
  const gl = ctx.createRadialGradient(400, 375, 20, 400, 375, 250);
  gl.addColorStop(0, 'rgba(215,200,80,0.38)');
  gl.addColorStop(0.5, 'rgba(100,160,40,0.14)');
  gl.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = gl; ctx.fillRect(0, 290, 800, 200);

  // Nidos de paja (bajo los huevos)
  [[295, 368], [402, 375], [510, 368]].forEach(([nx, ny]) => {
    ctx.strokeStyle = '#8B6914'; ctx.lineWidth = 3;
    for (let a = 0; a < Math.PI; a += 0.28) {
      ctx.beginPath();
      ctx.arc(nx, ny - 5, 38 + Math.sin(a * 5) * 5, a, a + 0.22);
      ctx.stroke();
    }
    ctx.fillStyle = 'rgba(180,130,30,0.22)';
    ctx.beginPath(); ctx.ellipse(nx, ny - 5, 40, 14, 0, 0, Math.PI * 2); ctx.fill();
  });

  // Huevos gigantes
  [
    { x: 295, y: 350, rx: 32, ry: 44 },
    { x: 402, y: 342, rx: 38, ry: 52 },
    { x: 510, y: 348, rx: 34, ry: 46 },
  ].forEach(({ x, y, rx, ry }) => {
    // Gradiente huevo
    const eg = ctx.createRadialGradient(x - rx * 0.25, y - ry * 0.3, 4, x, y, ry);
    eg.addColorStop(0, '#FFFDF5');
    eg.addColorStop(0.4, '#F5F0E2');
    eg.addColorStop(0.8, '#D8CEB8');
    eg.addColorStop(1, '#BEB098');
    ctx.fillStyle = eg;
    ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#C8BCAA'; ctx.lineWidth = 2; ctx.stroke();
    // Manchas de huevo
    ctx.fillStyle = 'rgba(200,180,140,0.35)';
    [[x + rx*0.3, y - ry*0.1, 6, 4], [x - rx*0.2, y + ry*0.2, 8, 5]].forEach(([mx, my, mw, mh]) => {
      ctx.beginPath(); ctx.ellipse(mx, my, mw, mh, 0.5, 0, Math.PI * 2); ctx.fill();
    });
    // Brillo
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.beginPath(); ctx.ellipse(x - rx*0.28, y - ry*0.35, rx*0.22, ry*0.18, -0.4, 0, Math.PI * 2); ctx.fill();
  });
}

/** 3 – Arena de Patos Fans: estadio circular, multitud de patos, linternas, confeti */
function _drawArena() {
  const t = Date.now() * 0.001;

  // Muro de fondo del estadio (arco)
  ctx.fillStyle = '#C8A050';
  ctx.beginPath();
  ctx.moveTo(30, 360); ctx.bezierCurveTo(30, 80, 770, 80, 770, 360);
  ctx.lineTo(770, 230); ctx.bezierCurveTo(770, 110, 30, 110, 30, 230);
  ctx.closePath(); ctx.fill();

  // Capas de gradas
  ['#8B4020', '#A04C28', '#B85830', '#A04C28'].forEach((col, row) => {
    ctx.fillStyle = col;
    const y0 = 115 + row * 32;
    const shrink = row * 28;
    ctx.beginPath();
    ctx.moveTo(30 + shrink, y0 + 32);
    ctx.bezierCurveTo(30 + shrink, y0, 770 - shrink, y0, 770 - shrink, y0 + 32);
    ctx.lineTo(770 - shrink, y0 + 32); ctx.lineTo(30 + shrink, y0 + 32);
    ctx.closePath(); ctx.fill();
  });

  // Arcos decorativos en el muro
  ctx.strokeStyle = '#7A3010'; ctx.lineWidth = 3;
  [130, 270, 400, 530, 665].forEach(ax => {
    ctx.beginPath();
    ctx.arc(ax, 175, 30, Math.PI, 0);
    ctx.stroke();
    ctx.fillStyle = '#1A0808';
    ctx.beginPath(); ctx.arc(ax, 175, 26, Math.PI, 0); ctx.fill();
  });

  // Multitud de patos fans (3 filas)
  for (let row = 0; row < 3; row++) {
    const count = 12 - row;
    const shrink = row * 28;
    for (let col = 0; col < count; col++) {
      const px = 55 + shrink + col * ((690 - shrink * 2) / (count - 1));
      const py = 128 + row * 32;
      _drawDuckFan(px, py, row * count + col);
    }
  }

  // Linternas colgantes
  [80, 200, 320, 480, 600, 720].forEach((lx, i) => {
    const fl = 0.8 + Math.sin(t * 1.8 + i * 1.1) * 0.18;
    // Hilo
    ctx.strokeStyle = '#AA8030'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(lx, 78); ctx.lineTo(lx, 102); ctx.stroke();
    // Cuerpo
    ctx.fillStyle = i % 2 === 0 ? '#FF6B00' : '#E91E63';
    ctx.beginPath(); ctx.ellipse(lx, 110, 10, 14, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = `rgba(255,220,80,${0.55 * fl})`;
    ctx.beginPath(); ctx.arc(lx, 110, 7, 0, Math.PI * 2); ctx.fill();
    // Flecos
    ctx.strokeStyle = i % 2 === 0 ? '#FF8F00' : '#F06292';
    ctx.lineWidth = 1;
    [-4, 0, 4].forEach(fx => {
      ctx.beginPath(); ctx.moveTo(lx + fx, 124); ctx.lineTo(lx + fx, 132); ctx.stroke();
    });
  });

  // Confeti animado
  for (let i = 0; i < 26; i++) {
    const age = (t * 0.9 + i * 0.38) % 5.5;
    ctx.fillStyle = `hsl(${i * 30}, 85%, 58%)`;
    ctx.save();
    ctx.translate((i * 43 + 25) % 760, 78 + age * 60);
    ctx.rotate(age * 3.5 + i);
    ctx.fillRect(-3, -5, 6, 10);
    ctx.restore();
  }

  // Suelo de la arena (rojo)
  const ag = ctx.createLinearGradient(0, 355, 0, 420);
  ag.addColorStop(0, '#C03020'); ag.addColorStop(1, '#8B1A10');
  ctx.fillStyle = ag; ctx.fillRect(0, 355, 800, 135);

  // Línea central de la arena
  ctx.strokeStyle = 'rgba(255,255,255,0.22)'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, 360); ctx.lineTo(800, 360); ctx.stroke();
}

/**
 * Dibuja un pato fan caricaturesco en las gradas.
 * @param {number} x   Posición X
 * @param {number} y   Posición Y
 * @param {number} idx Índice (varía color y animación)
 */
function _drawDuckFan(x, y, idx) {
  const t = Date.now() * 0.003;
  const bob = Math.sin(t + idx * 0.7) * 2.5;
  ctx.fillStyle = '#FFD600';
  ctx.beginPath(); ctx.ellipse(x, y + bob, 10, 8, 0, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(x + 6, y - 7 + bob, 6, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#FF8F00';
  ctx.beginPath(); ctx.moveTo(x + 11, y - 7 + bob); ctx.lineTo(x + 17, y - 5 + bob); ctx.lineTo(x + 11, y - 3 + bob); ctx.closePath(); ctx.fill();
  // Colores variados de ropa/accesorio
  const colors = ['#E91E63', '#2196F3', '#4CAF50', '#FF5722', '#9C27B0'];
  if (idx % 3 === 0) {
    ctx.fillStyle = colors[idx % colors.length];
    ctx.fillRect(x - 12, y - 22 + bob + Math.sin(t * 1.5 + idx) * 3, 9, 7);
  }
}

/** 4 – Templo del Maíz Dorado: pilares de maíz, altar escalonado, ídolo resplandeciente */
function _drawTemplo() {
  const t = Date.now() * 0.001;

  // Arco del techo (sugerido)
  ctx.fillStyle = '#140A00';
  ctx.fillRect(0, 0, 800, 58);
  ctx.fillStyle = '#1E1000';
  ctx.beginPath();
  ctx.moveTo(0, 58); ctx.bezierCurveTo(200, 100, 600, 100, 800, 58);
  ctx.lineTo(800, 0); ctx.lineTo(0, 0);
  ctx.closePath(); ctx.fill();

  // Suelo de piedra
  ctx.fillStyle = '#1A1008';
  ctx.fillRect(0, 360, 800, 130);
  ctx.strokeStyle = '#100A00'; ctx.lineWidth = 1;
  for (let x = 0; x < 800; x += 80) {
    ctx.beginPath(); ctx.moveTo(x, 360); ctx.lineTo(x, 490); ctx.stroke();
  }
  for (let y = 380; y < 490; y += 30) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(800, y); ctx.stroke();
  }

  // Resplandor central del altar
  const ag = ctx.createRadialGradient(400, 320, 20, 400, 320, 300);
  ag.addColorStop(0, 'rgba(255,195,50,0.55)');
  ag.addColorStop(0.35, 'rgba(255,130,20,0.28)');
  ag.addColorStop(0.7, 'rgba(200,90,0,0.12)');
  ag.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = ag; ctx.fillRect(0, 0, 800, 490);

  // Pilares de piedra con maíz (3 en cada lado)
  [60, 165, 270, 530, 635, 740].forEach((px) => {
    // Fuste de piedra
    const pg = ctx.createLinearGradient(px - 20, 0, px + 20, 0);
    pg.addColorStop(0, '#2C1C08'); pg.addColorStop(0.5, '#4A3010'); pg.addColorStop(1, '#2C1C08');
    ctx.fillStyle = pg;
    ctx.fillRect(px - 18, 85, 36, 275);
    // Base y capitel
    ctx.fillStyle = '#3C2810';
    ctx.fillRect(px - 24, 340, 48, 20);
    ctx.fillRect(px - 22, 85, 44, 16);
    // Mazorca de maíz decorativa encima del pilar
    _drawCornCob(px, 65, 14, 36);
    // Hojas decorativas
    ctx.fillStyle = 'rgba(50,130,30,0.55)';
    ctx.beginPath(); ctx.ellipse(px - 20, 75, 18, 8, -0.6, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(px + 20, 80, 16, 7, 0.5, 0, Math.PI * 2); ctx.fill();
    // Reflejo dorado en el pilar
    const lr = ctx.createLinearGradient(0, 85, 0, 360);
    lr.addColorStop(0, 'rgba(255,170,30,0.18)'); lr.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = lr; ctx.fillRect(px - 18, 85, 36, 275);
  });

  // Altar escalonado
  [[130, 40], [100, 28], [72, 16]].forEach(([w, h], step) => {
    const ay = 340 - step * h;
    const ax = 400 - w;
    const sg = ctx.createLinearGradient(ax, ay, ax + w * 2, ay + h);
    sg.addColorStop(0, '#2C1C08'); sg.addColorStop(0.5, '#4A3010'); sg.addColorStop(1, '#2C1C08');
    ctx.fillStyle = sg;
    ctx.fillRect(ax, ay, w * 2, h);
    ctx.strokeStyle = '#1A0E04'; ctx.lineWidth = 1.5;
    ctx.strokeRect(ax, ay, w * 2, h);
    // Franja dorada en borde del escalón
    ctx.fillStyle = 'rgba(255,185,30,0.28)';
    ctx.fillRect(ax, ay, w * 2, 3);
  });

  // Ídolo central de maíz (3 mazorcas grandes)
  const idolBob = Math.sin(t * 1.2) * 4;
  [{ x: 375, y: 272 + idolBob, w: 18, h: 58 },
   { x: 400, y: 258 + idolBob, w: 22, h: 72 },
   { x: 425, y: 272 + idolBob, w: 18, h: 58 }].forEach(({ x, y, w, h }) => {
    _drawCornCob(x, y + h / 2, w, h);
  });

  // Aura del ídolo
  const ia = ctx.createRadialGradient(400, 286 + idolBob, 15, 400, 286 + idolBob, 90);
  ia.addColorStop(0, 'rgba(255,215,50,0.50)');
  ia.addColorStop(0.4, 'rgba(255,160,20,0.22)');
  ia.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = ia;
  ctx.beginPath(); ctx.arc(400, 286 + idolBob, 90, 0, Math.PI * 2); ctx.fill();

  // Destellos animados en el ídolo
  for (let i = 0; i < 6; i++) {
    const sa = (t * 1.4 + i * Math.PI / 3) % (Math.PI * 2);
    const sr = 55 + Math.sin(t * 2 + i) * 10;
    ctx.fillStyle = `rgba(255,230,80,${0.55 + Math.sin(t * 2 + i) * 0.35})`;
    ctx.beginPath();
    ctx.arc(400 + Math.cos(sa) * sr, 286 + Math.sin(sa) * sr + idolBob, 3, 0, Math.PI * 2);
    ctx.fill();
  }
}

/**
 * Dibuja una mazorca de maíz decorativa.
 * @param {number} cx  Centro X
 * @param {number} cy  Centro Y
 * @param {number} rw  Radio horizontal (grosor)
 * @param {number} rh  Radio vertical (largo)
 */
function _drawCornCob(cx, cy, rw, rh) {
  // Cuerpo
  const cg = ctx.createLinearGradient(cx - rw, cy, cx + rw, cy);
  cg.addColorStop(0, '#C87800'); cg.addColorStop(0.4, '#FFD035'); cg.addColorStop(1, '#C87800');
  ctx.fillStyle = cg;
  ctx.beginPath(); ctx.ellipse(cx, cy, rw, rh, 0, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#A06000'; ctx.lineWidth = 1.5; ctx.stroke();
  // Granos (puntos)
  ctx.fillStyle = '#FFE060';
  const rows = Math.floor(rh / 5), cols = 3;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const gx = cx - rw * 0.45 + c * rw * 0.45 + (r % 2) * rw * 0.22;
      const gy = cy - rh * 0.72 + r * 5.5;
      if (Math.abs(gx - cx) < rw * 0.9 * Math.sqrt(1 - Math.pow((gy - cy) / rh, 2)) + 1) {
        ctx.beginPath(); ctx.arc(gx, gy, 1.5, 0, Math.PI * 2); ctx.fill();
      }
    }
  }
  // Hojas verdes
  ctx.fillStyle = '#388E3C';
  ctx.beginPath(); ctx.moveTo(cx, cy - rh); ctx.quadraticCurveTo(cx - rw * 2.2, cy - rh * 1.5, cx - rw * 0.5, cy - rh * 0.3); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(cx, cy - rh); ctx.quadraticCurveTo(cx + rw * 2.2, cy - rh * 1.4, cx + rw * 0.5, cy - rh * 0.3); ctx.closePath(); ctx.fill();
}
