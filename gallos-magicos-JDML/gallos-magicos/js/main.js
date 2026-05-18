/**
 * main.js
 * Punto de entrada del juego. Inicializa el canvas, el estado global,
 * los sistemas de partículas y mensajes, el ciclo principal (game loop)
 * y los controles de entrada.
 *
 * Este archivo debe cargarse ÚLTIMO en el HTML porque todos los demás
 * módulos exponen sus símbolos al ámbito global antes de que este
 * script los utilice.
 *
 * Módulos coordinados:
 *   · js/characters.js  → TRANSFORMS, PARTICLE_COLORS, drawPlayer, drawEnemy
 *   · js/scenes.js      → STAGES, drawBackground, drawSceneDecor
 *   · js/mechanics.js   → BALANCE, useSkill, enemyAttack, resolveVictory,
 *                          advanceStage, startGame, restartToTitle
 *   · js/hud.js         → drawHUD, buildSkillButtons, refreshSkillButtons,
 *                          drawTitleScreen, drawStageWinScreen,
 *                          drawDefeatScreen, drawFinalWinScreen
 */

/* ================================================================
   CANVAS Y ELEMENTOS DOM
   ================================================================ */

/** Canvas principal del juego */
const canvas  = document.getElementById('gameCanvas');
/** Contexto 2D (accedido por todos los módulos) */
const ctx     = canvas.getContext('2d');
/** Panel DOM donde se generan los botones de habilidades */
const panel   = document.getElementById('skills-panel');
/** Barra DOM de mensajes flotantes */
const msgBar  = document.getElementById('msg-bar');

/** Ancho del canvas en píxeles (800) */
const W = canvas.width;
/** Alto del canvas en píxeles (490) */
const H = canvas.height;

/* ================================================================
   ESTADO GLOBAL DEL JUEGO
   Todos los módulos leen y modifican este objeto directamente.
   ================================================================ */
const STATE = {
  /** Pantalla activa: 'title' | 'battle' | 'stageWin' | 'defeat' | 'finalWin' */
  screen       : 'title',
  /** Índice en STAGES (0–4): etapa del torneo actual */
  stage        : 0,
  /** Índice en STAGES de la etapa recién vencida; usado por drawStageWinScreen */
  defeatedStage: 0,
  /** Índice en TRANSFORMS (0–5): forma actual del jugador */
  transform    : 0,
  /** Puntos de energía del jugador (barra de vida) */
  playerHP     : 100,
  /** Puntos de energía del enemigo */
  enemyHP      : 100,
  /** Puntos de humor acumulados (influyen en multiplicador de espectáculo) */
  humor        : 0,
  /** Puntos de estilo acumulados (influyen en multiplicador de espectáculo) */
  style        : 0,
  /** Milisegundos de cooldown restante para cada habilidad del jugador */
  cooldowns    : [],
  /** Array de partículas de efectos visuales activas */
  particles    : [],
  /** Array de proyectiles viajeros de ataque activos */
  projectiles  : [],
  /** Array de premios en caída activos */
  prizes       : [],
  /** Milisegundos hasta el próximo premio */
  prizeTimer   : 3000,
  /** Array de cuervos ladrones activos (etapas 3 y 4) */
  thiefBirds   : [],
  /** Milisegundos hasta el próximo cuervo ladrón */
  thiefBirdTimer: 0,
  /** Bonus acumulado en la sesión de entrenamiento (se aplica al reiniciar batalla) */
  trainingBonus: { humor: 0, style: 0 },
  /** Índice de la última habilidad usada (detección de spam/repetición) */
  lastSkill    : -1,
  /** Últimas 3 habilidades usadas (detección de combo x3) */
  lastThree    : [],
  /** Estado de animación del jugador: 'idle' | 'attack' | 'hit' */
  playerAnim   : 'idle',
  /** Estado de animación del enemigo: 'idle' | 'attack' | 'hit' */
  enemyAnim    : 'idle',
  /** Milisegundos restantes de shake de cámara (activado por golpes) */
  shake        : 0,
  /** Milisegundos hasta el próximo ataque autónomo del enemigo */
  enemyTimer   : 0,
  /** Cola de mensajes flotantes para renderizar sobre el canvas */
  messages     : [],
};

/* ================================================================
   SISTEMA DE PARTÍCULAS
   ================================================================ */

/**
 * Genera un burst de partículas de color en la posición (cx, cy).
 * Los colores se seleccionan de PARTICLE_COLORS según el emoji de la habilidad.
 *
 * @param {string} emoji  Emoji de la habilidad (clave en PARTICLE_COLORS)
 * @param {number} cx     Coordenada X del centro del burst
 * @param {number} cy     Coordenada Y del centro del burst
 * @param {number} count  Cantidad de partículas a generar
 */
function spawnParticles(emoji, cx, cy, count) {
  const colors = PARTICLE_COLORS[emoji] || ['#FFD700', '#FFF'];
  for (let i = 0; i < count; i++) {
    STATE.particles.push({
      x    : cx + (Math.random() - 0.5) * 50,
      y    : cy + (Math.random() - 0.5) * 50,
      vx   : (Math.random() - 0.5) * 9,
      vy   : -Math.random() * 9 - 1,
      life : 1.0,                             // 1.0 = viva, 0.0 = muerta
      decay: 0.025 + Math.random() * 0.025,   // ritmo de desvanecimiento
      r    : 3 + Math.random() * 7,           // radio inicial
      color: colors[Math.floor(Math.random() * colors.length)],
    });
  }
}

/**
 * Actualiza la física de todas las partículas activas (movimiento + gravedad).
 * Elimina las partículas cuya vida llegó a cero.
 *
 * @param {number} dt Milisegundos transcurridos desde el frame anterior
 */
function updateParticles(dt) {
  const norm = dt / 16;
  STATE.particles.forEach(p => {
    p.x    += p.vx   * norm;
    p.y    += p.vy   * norm;
    p.vy   += 0.25   * norm; // gravedad constante
    p.life -= p.decay * norm;
  });
  STATE.particles = STATE.particles.filter(p => p.life > 0);
}

/** Dibuja todas las partículas activas sobre el canvas */
function drawParticles() {
  STATE.particles.forEach(p => {
    ctx.globalAlpha = p.life;
    ctx.fillStyle   = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.globalAlpha = 1;
}

/* ================================================================
   SISTEMA DE PROYECTILES VIAJEROS  (Prompt 21)
   Cada habilidad genera un proyectil que viaja del atacante al objetivo.
   Al llegar produce un burst de impacto. Estilo visual varía por elemento.
   ================================================================ */

/** Configuración visual por tipo de habilidad (radio, colores, longitud de estela) */
const PROJ_CFG = {
  '🐔': { r: 7,  colors: ['#F5F5DC', '#DAA520', '#8B6914'],                   trail: 5  },
  '🔥': { r: 13, colors: ['#FF4500', '#FF8C00', '#FFD700'],                   trail: 9  },
  '💨': { r: 11, colors: ['#87CEEB', '#B0E0E6', '#FFFFFF'],                   trail: 7  },
  '⚡': { r: 10, colors: ['#FFD700', '#FFFF00', '#FFFFFF'],                   trail: 11 },
  '🌽': { r: 11, colors: ['#388E3C', '#F9A825', '#8B6914'],                   trail: 7  },
  '🎉': { r: 15, colors: ['#E91E63', '#00BCD4', '#FFD700', '#9C27B0'],        trail: 13 },
  '💥': { r: 12, colors: ['#FF1744', '#FF6B6B', '#8B0000'],                   trail: 8  },
};

/**
 * Crea un proyectil que viaja de (fromX, fromY) a (toX, toY).
 * Genera un pequeño puff de partículas en el origen al disparar.
 *
 * @param {string} emoji  Tipo de habilidad (determina estilo visual)
 * @param {number} fromX  X del atacante
 * @param {number} fromY  Y del atacante
 * @param {number} toX    X del objetivo
 * @param {number} toY    Y del objetivo
 */
function spawnProjectile(emoji, fromX, fromY, toX, toY) {
  spawnParticles(emoji, fromX, fromY, 5);   // puff de salida
  const duration = 320 + Math.random() * 80;
  const dx = toX - fromX;
  const dy = toY - fromY;
  STATE.projectiles.push({
    x: fromX, y: fromY,
    tx: toX,  ty: toY,
    vx: dx / duration,
    vy: dy / duration,
    emoji,
    age: 0,
    duration,
    trail: [],
  });
}

/**
 * Avanza la física de todos los proyectiles activos.
 * Cuando un proyectil llega al objetivo, detona un burst de impacto.
 *
 * @param {number} dt Milisegundos desde el frame anterior
 */
function updateProjectiles(dt) {
  const alive = [];
  STATE.projectiles.forEach(p => {
    p.age += dt;
    p.x   += p.vx * dt;
    p.y   += p.vy * dt;
    p.trail.push({ x: p.x, y: p.y });
    const maxTrail = (PROJ_CFG[p.emoji] || PROJ_CFG['💥']).trail;
    if (p.trail.length > maxTrail) p.trail.shift();

    if (p.age >= p.duration) {
      spawnParticles(p.emoji, p.tx, p.ty, 20);  // burst de impacto
    } else {
      alive.push(p);
    }
  });
  STATE.projectiles = alive;
}

/**
 * Dibuja todos los proyectiles activos:
 *   · Estela de puntos desvanecientes
 *   · Orbe pulsante con gradiente radial y glow
 *   · Zigzag eléctrico adicional para ⚡
 */
function drawProjectiles() {
  STATE.projectiles.forEach(p => {
    const cfg = PROJ_CFG[p.emoji] || PROJ_CFG['💥'];

    // Estela
    p.trail.forEach((pt, i) => {
      const frac  = i / p.trail.length;
      ctx.globalAlpha = frac * 0.55;
      ctx.fillStyle   = cfg.colors[i % cfg.colors.length];
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, Math.max(1, cfg.r * frac * 0.75), 0, Math.PI * 2);
      ctx.fill();
    });

    // Trazo zigzag para rayo eléctrico
    if (p.emoji === '⚡' && p.trail.length > 1) {
      ctx.save();
      ctx.strokeStyle  = '#FFD700';
      ctx.lineWidth    = 2;
      ctx.globalAlpha  = 0.8;
      ctx.shadowColor  = '#FFFF00';
      ctx.shadowBlur   = 10;
      ctx.beginPath();
      ctx.moveTo(p.trail[0].x, p.trail[0].y);
      for (let i = 1; i < p.trail.length; i++) {
        ctx.lineTo(
          p.trail[i].x + (Math.random() - 0.5) * 14,
          p.trail[i].y + (Math.random() - 0.5) * 14
        );
      }
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
      ctx.restore();
    }

    // Orbe principal con gradiente y glow
    ctx.globalAlpha = 1;
    const pulse = 1 + Math.sin(p.age * 0.025) * 0.18;
    const r     = cfg.r * pulse;
    ctx.shadowColor = cfg.colors[0];
    ctx.shadowBlur  = 20;
    const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
    grad.addColorStop(0,   '#FFFFFF');
    grad.addColorStop(0.35, cfg.colors[0]);
    grad.addColorStop(1,   'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur  = 0;
    ctx.globalAlpha = 1;
  });
}

/* ================================================================
   SISTEMA DE PREMIOS  (Prompt 22)
   Premios cómicos que caen desde arriba durante el combate.
   El jugador hace clic para recogerlos y recuperar energía.
   ================================================================ */

/** Tipos de premio: emoji, nombre, curación, bonus humor, color y radio */
const PRIZE_TYPES = [
  { emoji: '🌽', name: 'Maíz pequeño',      heal: 10,  hbonus: 0,  color: '#F9A825', r: 14 },
  { emoji: '🍿', name: 'Palomitas mágicas',  heal: 20,  hbonus: 0,  color: '#FF8F00', r: 16 },
  { emoji: '🥚', name: 'Huevo Dorado',       heal: 40,  hbonus: 0,  color: '#FFD700', r: 18 },
  { emoji: '🎉', name: '¡Confeti Arcoíris!', heal: 100, hbonus: 20, color: '#E91E63', r: 22 },
];

/**
 * Crea un premio que cae desde la parte superior del canvas.
 * Distribución ponderada: 50% maíz, 30% palomitas, 15% huevo, 5% confeti.
 */
function spawnPrize() {
  const roll = Math.random();
  const type = roll < 0.50 ? PRIZE_TYPES[0]
             : roll < 0.80 ? PRIZE_TYPES[1]
             : roll < 0.95 ? PRIZE_TYPES[2]
             : PRIZE_TYPES[3];
  STATE.prizes.push({
    x      : 80 + Math.random() * 640,
    y      : -type.r,
    vy     : 0.8 + Math.random() * 1.2,
    type,
    age    : 0,
    maxAge : 5000 + Math.random() * 5000,
    bounced: false,
  });
}

/**
 * Actualiza la física y el temporizador de aparición de premios.
 * Aplica gravedad, rebote en el suelo y elimina premios expirados.
 *
 * @param {number} dt Milisegundos desde el frame anterior
 */
function updatePrizes(dt) {
  const norm = dt / 16;

  STATE.prizeTimer -= dt;
  if (STATE.prizeTimer <= 0) {
    spawnPrize();
    STATE.prizeTimer = 5000 + Math.random() * 5000;
  }

  STATE.prizes.forEach(p => {
    p.age += dt;
    if (p.y < 345) {
      p.vy += 0.18 * norm;
      p.y  += p.vy * norm;
    } else if (!p.bounced) {
      p.y      = 345;
      p.vy     = -Math.abs(p.vy) * 0.4;
      p.bounced = true;
    } else {
      p.y  = Math.min(p.y + p.vy * norm, 345);
      p.vy = Math.max(0, p.vy + 0.08 * norm);
    }
  });

  STATE.prizes = STATE.prizes.filter(p => p.age < p.maxAge);
}

/** Dibuja todos los premios activos con animación de rebote, giro y desvanecimiento */
function drawPrizes() {
  STATE.prizes.forEach(p => {
    const lifeRatio = p.age / p.maxAge;
    const alpha  = lifeRatio > 0.7 ? 1 - (lifeRatio - 0.7) / 0.3 : 1;
    const wobble = Math.sin(p.age * 0.006) * 4;
    const scale  = 1 + Math.sin(p.age * 0.004) * 0.08;

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(p.x + wobble, p.y);
    ctx.scale(scale, scale);

    // Círculo de fondo con glow
    ctx.shadowColor = p.type.color;
    ctx.shadowBlur  = 14 + Math.sin(p.age * 0.008) * 5;
    ctx.fillStyle   = p.type.color;
    ctx.beginPath();
    ctx.arc(0, 0, p.type.r, 0, Math.PI * 2);
    ctx.fill();

    // Emoji centrado
    ctx.shadowBlur      = 0;
    ctx.font            = `${p.type.r}px Arial`;
    ctx.textAlign       = 'center';
    ctx.textBaseline    = 'middle';
    ctx.fillText(p.type.emoji, 0, 1);

    // Etiqueta de curación
    ctx.font        = 'bold 9px Arial';
    ctx.fillStyle   = '#FFF';
    ctx.shadowColor = '#000';
    ctx.shadowBlur  = 3;
    ctx.fillText(`+${p.type.heal}`, 0, p.type.r + 10);

    ctx.restore();
    ctx.globalAlpha = 1;
    ctx.shadowBlur  = 0;
  });
}

/**
 * Detecta si el clic del jugador toca algún premio activo.
 * Si hay colisión, aplica la curación y genera el burst de impacto.
 *
 * @param {number} cx  X del clic en coordenadas del canvas
 * @param {number} cy  Y del clic en coordenadas del canvas
 */
function _checkPrizeClick(cx, cy) {
  for (let i = STATE.prizes.length - 1; i >= 0; i--) {
    const p  = STATE.prizes[i];
    const dx = cx - p.x;
    const dy = cy - p.y;
    if (Math.sqrt(dx * dx + dy * dy) <= p.type.r + 8) {
      STATE.playerHP = Math.min(BALANCE.maxEnergy, STATE.playerHP + p.type.heal);
      if (p.type.hbonus) STATE.humor = Math.min(250, STATE.humor + p.type.hbonus);
      const _PRIZE_SFX = { '🌽': 'prize_maiz', '🍿': 'prize_palomitas', '🥚': 'prize_huevo', '🎉': 'prize_confeti' };
      if (_PRIZE_SFX[p.type.emoji]) SFX[_PRIZE_SFX[p.type.emoji]]();
      spawnParticles(p.type.emoji, p.x, p.y, 18);
      addMsg(
        `${p.type.emoji} ${p.type.name}: +${p.type.heal} Energía` +
        (p.type.hbonus ? ` +${p.type.hbonus} Humor` : '') + '!',
        p.type.color
      );
      STATE.prizes.splice(i, 1);
      break;
    }
  }
}

/* ================================================================
   SISTEMA DE AVE LADRONA  (Prompt 29)
   En etapas 3 y 4 un cuervo entra desde el borde y roba premios
   que el jugador no recoge con suficiente rapidez.
   ================================================================ */

/** Velocidad y cadencia del cuervo por etapa (null = sin cuervo) */
const _THIEF_CFG = [null, null, null,
  { speed: 3.5, timerMin: 5000, timerMax: 9000 },
  { speed: 5.0, timerMin: 3000, timerMax: 6000 },
];

/**
 * Crea un cuervo ladrón que se dirige al premio más antiguo en pantalla.
 */
function spawnThiefBird() {
  if (!STATE.prizes.length) return;
  const target   = STATE.prizes.reduce((best, p) => p.age > best.age ? p : best, STATE.prizes[0]);
  const fromLeft = Math.random() < 0.5;
  STATE.thiefBirds.push({
    x     : fromLeft ? -30 : W + 30,
    y     : target.y - 30 + (Math.random() - 0.5) * 30,
    vx    : 0,
    vy    : 0,
    target,           // referencia directa al objeto premio
    phase : 'approach',
    age   : 0,
    stolen: null,
  });
}

/**
 * Mueve los cuervos, detecta el robo y elimina cuervos fuera de pantalla.
 * @param {number} dt
 */
function updateThiefBirds(dt) {
  const norm = dt / 16;
  const cfg  = _THIEF_CFG[STATE.stage];
  if (!cfg) return;

  STATE.thiefBirdTimer -= dt;
  if (STATE.thiefBirdTimer <= 0 && STATE.prizes.length) {
    spawnThiefBird();
    STATE.thiefBirdTimer = cfg.timerMin + Math.random() * (cfg.timerMax - cfg.timerMin);
  }

  const alive = [];
  STATE.thiefBirds.forEach(bird => {
    bird.age += dt;
    const speed = cfg.speed;

    if (bird.phase === 'approach') {
      // Si el premio fue recogido por el jugador, re-apuntar o huir
      if (!STATE.prizes.includes(bird.target)) {
        if (STATE.prizes.length) {
          bird.target = STATE.prizes.reduce((best, p) =>
            p.age > best.age ? p : best, STATE.prizes[0]);
        } else {
          bird.phase = 'flee';
          bird.vx = bird.x < W / 2 ? -speed * 1.5 : speed * 1.5;
          bird.vy = -speed;
        }
      }

      if (bird.phase === 'approach' && bird.target) {
        const dx   = bird.target.x - bird.x;
        const dy   = bird.target.y - bird.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        if (dist < 22) {
          // Robar el premio
          bird.stolen = bird.target.type.emoji;
          const idx   = STATE.prizes.indexOf(bird.target);
          if (idx !== -1) STATE.prizes.splice(idx, 1);
          bird.target = null;
          bird.phase  = 'flee';
          bird.vx     = bird.x < W / 2 ? -speed * 1.5 : speed * 1.5;
          bird.vy     = -speed * 0.6;
          SFX.tomatazo();
          addMsg(`🐦 ¡El cuervo robó ${bird.stolen}!`, '#FF6B6B');
        } else {
          bird.vx = (dx / dist) * speed;
          bird.vy = (dy / dist) * speed;
          bird.x += bird.vx * norm;
          bird.y += bird.vy * norm;
        }
      }
    } else {
      bird.x += bird.vx * norm;
      bird.y += bird.vy * norm;
    }

    if (bird.x > -80 && bird.x < W + 80 && bird.y > -80 && bird.y < H + 80) alive.push(bird);
  });
  STATE.thiefBirds = alive;
}

/**
 * Dibuja todos los cuervos ladrones activos.
 * Cuerpo oscuro, ojos naranjas, pico ganchudo, alas animadas.
 * Durante la huida lleva el emoji robado en las garras.
 */
function drawThiefBirds() {
  STATE.thiefBirds.forEach(bird => {
    // Indicador ⚠️ parpadeante sobre el premio objetivo
    if (bird.phase === 'approach' && bird.target && STATE.prizes.includes(bird.target)) {
      const tp = bird.target;
      ctx.save();
      ctx.font         = '16px Arial';
      ctx.textAlign    = 'center';
      ctx.textBaseline = 'middle';
      if (Math.floor(Date.now() / 280) % 2 === 0) {
        ctx.fillText('⚠️', tp.x, tp.y - tp.type.r - 18);
      }
      ctx.restore();
      ctx.textBaseline = 'alphabetic';
    }

    const movingRight = bird.vx >= 0;
    const flapAngle   = Math.sin(bird.age * 0.022) * 0.65;

    ctx.save();
    ctx.translate(bird.x, bird.y);
    if (!movingRight) ctx.scale(-1, 1);  // espejo según dirección de vuelo

    // Ala superior batiendo
    ctx.fillStyle = '#1C2951';
    ctx.save();
    ctx.rotate(flapAngle);
    ctx.beginPath();
    ctx.ellipse(-4, -4, 20, 7, -0.25, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Ala inferior
    ctx.fillStyle = '#12213A';
    ctx.save();
    ctx.rotate(flapAngle * 0.4);
    ctx.beginPath();
    ctx.ellipse(2, 6, 15, 5, 0.25, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Cuerpo con aura morada
    ctx.fillStyle   = '#0A0E1F';
    ctx.shadowColor = '#6600CC';
    ctx.shadowBlur  = 9;
    ctx.beginPath();
    ctx.ellipse(0, 0, 13, 9, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Cabeza
    ctx.fillStyle = '#0A0E1F';
    ctx.beginPath();
    ctx.arc(11, -5, 8, 0, Math.PI * 2);
    ctx.fill();

    // Ojo naranja brillante
    ctx.fillStyle   = '#FF6D00';
    ctx.shadowColor = '#FF6D00';
    ctx.shadowBlur  = 7;
    ctx.beginPath();
    ctx.arc(14, -6, 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.fillStyle  = '#000';
    ctx.beginPath();
    ctx.arc(14.5, -6, 1.8, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#FFF';
    ctx.beginPath();
    ctx.arc(15, -7, 0.7, 0, Math.PI * 2);
    ctx.fill();

    // Pico ganchudo
    ctx.fillStyle = '#6D4C41';
    ctx.beginPath();
    ctx.moveTo(18, -5);
    ctx.lineTo(26, -2);
    ctx.quadraticCurveTo(24, 0, 19, -1);
    ctx.closePath();
    ctx.fill();

    // Cola en abanico
    ctx.fillStyle = '#1C2951';
    ctx.beginPath();
    ctx.moveTo(-11, -1);
    ctx.lineTo(-23, -6);
    ctx.lineTo(-21,  1);
    ctx.lineTo(-23,  6);
    ctx.lineTo(-11,  3);
    ctx.closePath();
    ctx.fill();

    // Premio robado en las garras (emoji siempre legible, sin flip)
    if (bird.phase === 'flee' && bird.stolen) {
      ctx.save();
      if (!movingRight) ctx.scale(-1, 1);  // deshacer flip para el emoji
      ctx.font         = '14px Arial';
      ctx.textAlign    = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(bird.stolen, 0, 18);
      ctx.restore();
    }

    ctx.restore();
    ctx.textBaseline = 'alphabetic';
  });
}

/* ================================================================
   MENSAJES FLOTANTES
   ================================================================ */

/**
 * Muestra un mensaje en la barra DOM y lo añade a la cola de canvas.
 * La cola tiene un máximo de 3 entradas (elimina los más antiguos).
 *
 * @param {string} text  Texto del mensaje
 * @param {string} color Color CSS del mensaje
 */
function addMsg(text, color) {
  msgBar.style.color = color;
  msgBar.textContent = text;
  STATE.messages.push({ text, color, y: 430, life: 2.0 });
  if (STATE.messages.length > 3) STATE.messages.shift();
}

/**
 * Mueve los mensajes flotantes hacia arriba y reduce su vida.
 * @param {number} dt Milisegundos transcurridos desde el frame anterior
 */
function updateMessages(dt) {
  const norm = dt / 16;
  STATE.messages.forEach(m => { m.y -= 0.4 * norm; m.life -= 0.015 * norm; });
  STATE.messages = STATE.messages.filter(m => m.life > 0);
}

/* ================================================================
   INICIALIZACIÓN DE COMBATE
   ================================================================ */

/**
 * Reinicia todas las variables de estado de combate para una nueva batalla.
 * Llamado al iniciar el juego y al avanzar de etapa.
 * Delega la construcción del panel de habilidades a buildSkillButtons (hud.js).
 */
function initBattle() {
  const stage      = STAGES[STATE.stage];
  STATE.playerHP   = BALANCE.maxEnergy;
  STATE.enemyHP    = BALANCE.maxEnergy;
  STATE.humor = STATE.trainingBonus.humor;
  STATE.style = STATE.trainingBonus.style;
  STATE.trainingBonus = { humor: 0, style: 0 };
  STATE.particles   = [];
  STATE.projectiles = [];
  STATE.prizes      = [];
  STATE.prizeTimer  = 3000 + Math.floor(Math.random() * 2000);
  STATE.thiefBirds  = [];
  const _tc = _THIEF_CFG[STATE.stage];
  STATE.thiefBirdTimer = _tc
    ? _tc.timerMin + Math.random() * (_tc.timerMax - _tc.timerMin)
    : 0;
  STATE.messages    = [];
  STATE.lastSkill  = -1;
  STATE.lastThree  = [];
  STATE.playerAnim = 'idle';
  STATE.enemyAnim  = 'idle';
  STATE.shake      = 0;
  STATE.enemyTimer = stage.enemy.cd;
  STATE.cooldowns  = TRANSFORMS[STATE.transform].skills.map(() => 0);
  buildSkillButtons();
}

/* ================================================================
   SISTEMA DE ENTRENAMIENTO  (Prompt 24)
   Mini-sesión jugable post-derrota: el jugador hace clic en objetivos
   para ganar bonuses de Humor y Estilo antes de reintentar la batalla.
   ================================================================ */

/** Frases cómicas del Gallo Maestro que rotan cada 4 s */
const TRAINING_TIPS = [
  '¡Golpea con ritmo de salsa, no de tristeza!',
  '¡Un gallo sin estilo es solo pollo asado!',
  '¡El confeti no se ve… se SIENTE!',
  '¡Variar ataques es el secreto del campeón!',
  '¡Los tomates son del público, no del menú!',
];

/** Estado interno de la sesión de entrenamiento (se reinicia en startTraining) */
const _TR = {
  timer     : 30000,
  score     : 0,
  targets   : [],
  spawnTimer: 0,
  tipIndex  : 0,
  tipTimer  : 0,
};

/** Inicia la sesión de entrenamiento desde la pantalla de derrota */
function startTraining() {
  SFX.init();
  STATE.screen   = 'training';
  _TR.timer      = 30000;
  _TR.score      = 0;
  _TR.targets    = [];
  _TR.spawnTimer = 0;
  _TR.tipIndex   = Math.floor(Math.random() * TRAINING_TIPS.length);
  _TR.tipTimer   = 4000;
  STATE.particles = [];
}

/**
 * Calcula el bonus según la puntuación y reinicia la batalla en la misma etapa.
 *   0–3 aciertos → +10 humor / +5 estilo
 *   4–6 aciertos → +20 humor / +10 estilo
 *   7+  aciertos → +30 humor / +20 estilo
 */
function finishTraining() {
  SFX.training_done();
  const s = _TR.score;
  STATE.trainingBonus = s >= 7 ? { humor: 30, style: 20 }
                      : s >= 4 ? { humor: 20, style: 10 }
                      :          { humor: 10, style: 5  };
  const bonusTxt = s >= 7 ? '¡PERFECTO! +30 humor +20 estilo'
                 : s >= 4 ? '¡Bien hecho! +20 humor +10 estilo'
                 :          '¡Sigue practicando! +10 humor +5 estilo';
  STATE.screen    = 'battle';
  STATE.transform = Math.min(STATE.stage, TRANSFORMS.length - 2);
  initBattle();
  addMsg(`🥊 Entrenamiento completado — ${bonusTxt}`, '#00FF88');
}

/**
 * Actualiza la lógica del entrenamiento:
 * spawn de objetivos, envejecimiento, rotación de tips y countdown.
 */
function _updateTraining(dt) {
  _TR.timer -= dt;

  _TR.spawnTimer -= dt;
  if (_TR.spawnTimer <= 0) {
    _TR.targets.push({
      x     : 220 + Math.random() * 450,
      y     : 90  + Math.random() * 270,
      r     : 18  + Math.random() * 14,
      age   : 0,
      maxAge: 2500 + Math.random() * 1000,
    });
    _TR.spawnTimer = 650 + Math.random() * 500;
  }

  _TR.targets.forEach(t => { t.age += dt; });
  _TR.targets = _TR.targets.filter(t => t.age < t.maxAge);

  _TR.tipTimer -= dt;
  if (_TR.tipTimer <= 0) {
    _TR.tipIndex = (_TR.tipIndex + 1) % TRAINING_TIPS.length;
    _TR.tipTimer = 4000;
  }

  updateParticles(dt);

  if (_TR.timer <= 0) finishTraining();
}

/**
 * Comprueba si el clic del jugador impactó algún objetivo de entrenamiento.
 * @param {number} cx  X del clic en coordenadas del canvas
 * @param {number} cy  Y del clic en coordenadas del canvas
 */
function _checkTrainingClick(cx, cy) {
  for (let i = _TR.targets.length - 1; i >= 0; i--) {
    const t  = _TR.targets[i];
    const dx = cx - t.x;
    const dy = cy - t.y;
    if (Math.sqrt(dx * dx + dy * dy) <= t.r + 6) {
      _TR.score++;
      SFX.training_hit();
      spawnParticles('🎉', t.x, t.y, 12);
      _TR.targets.splice(i, 1);
      break;
    }
  }
}

/** Dibuja la pantalla completa de entrenamiento */
function drawTrainingScreen() {
  // Fondo degradado oscuro
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, '#1a0533');
  bg.addColorStop(1, '#0d2b1a');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Estrellas parpadeantes
  for (let i = 0; i < 40; i++) {
    const br = (Math.sin(Date.now() * 0.002 + i * 1.3) + 1) / 2;
    ctx.globalAlpha = br * 0.55;
    ctx.fillStyle   = '#FFD700';
    ctx.beginPath();
    ctx.arc((i * 131 + 20) % W, (i * 67 + 10) % H, 1.5, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  // Título
  ctx.textAlign   = 'center';
  ctx.shadowColor = '#00FF88'; ctx.shadowBlur = 16;
  ctx.fillStyle   = '#00FF88'; ctx.font = 'bold 28px Arial Black, Arial';
  ctx.fillText('🥊 ENTRENAMIENTO MÁGICO', W / 2, 44);
  ctx.shadowBlur  = 0;
  ctx.fillStyle   = '#BDBDBD'; ctx.font = '12px Arial';
  ctx.fillText('Corral Mágico del Gallo Maestro — ¡haz clic en los objetivos!', W / 2, 66);

  // Gallo Maestro (izquierda)
  drawRooster(110, 320, '#FFD700', '#FF8C00', true, 'idle', null);

  // Bocadillo con tip del maestro
  ctx.strokeStyle = '#FFD700'; ctx.lineWidth = 1.5;
  ctx.fillStyle   = 'rgba(255,215,0,0.12)';
  ctx.beginPath();
  ctx.rect(136, 210, 230, 52);
  ctx.fill(); ctx.stroke();
  ctx.fillStyle   = '#FFD700'; ctx.font = '10px Arial';
  ctx.textAlign   = 'left';
  const tip   = TRAINING_TIPS[_TR.tipIndex];
  const half  = Math.floor(tip.length / 2);
  const split = tip.lastIndexOf(' ', half);
  ctx.fillText(tip.slice(0, split),       142, 230);
  ctx.fillText(tip.slice(split + 1),      142, 248);

  // Objetivos interactivos
  _TR.targets.forEach(t => {
    const lifeR = t.age / t.maxAge;
    const alpha = lifeR > 0.7 ? 1 - (lifeR - 0.7) / 0.3 : 1;
    const pulse = 1 + Math.sin(t.age * 0.006) * 0.12;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(t.x, t.y);
    ctx.scale(pulse, pulse);
    ctx.shadowColor = '#FF69B4'; ctx.shadowBlur = 14;
    ctx.fillStyle   = '#FF69B4';
    ctx.beginPath();
    ctx.arc(0, 0, t.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur      = 0;
    ctx.font            = `${t.r}px Arial`;
    ctx.textAlign       = 'center';
    ctx.textBaseline    = 'middle';
    ctx.fillText('🎯', 0, 1);
    ctx.restore();
    ctx.globalAlpha  = 1;
    ctx.textBaseline = 'alphabetic';
  });

  // Partículas de impacto
  drawParticles();

  // Barra de tiempo (pie del canvas)
  const tRatio = Math.max(0, _TR.timer / 30000);
  ctx.fillStyle = 'rgba(0,0,0,0.5)';
  ctx.fillRect(10, H - 50, W - 20, 14);
  ctx.fillStyle = tRatio > 0.4 ? '#00FF88' : tRatio > 0.2 ? '#FFD700' : '#F44336';
  ctx.fillRect(10, H - 50, (W - 20) * tRatio, 14);
  ctx.strokeStyle = 'rgba(255,255,255,0.3)'; ctx.lineWidth = 1;
  ctx.strokeRect(10, H - 50, W - 20, 14);
  ctx.fillStyle = '#FFF'; ctx.font = '10px Arial'; ctx.textAlign = 'left';
  ctx.fillText(`⏱️ ${Math.ceil(_TR.timer / 1000)} s`, 14, H - 39);

  // Marcador y preview de bonus
  ctx.textAlign = 'center';
  ctx.fillStyle = '#FFD700'; ctx.font = 'bold 14px Arial Black, Arial';
  ctx.fillText(`🎯 Aciertos: ${_TR.score}`, W / 2, H - 34);

  const s = _TR.score;
  const bonusTxt = s >= 7 ? '+30 Humor · +20 Estilo  ★★★'
                 : s >= 4 ? '+20 Humor · +10 Estilo  ★★'
                 :          '+10 Humor · +5 Estilo   ★';
  ctx.fillStyle = '#9E9E9E'; ctx.font = '11px Arial';
  ctx.fillText(`Bonus al reincorporarte: ${bonusTxt}`, W / 2, H - 18);
}

/* ================================================================
   GAME LOOP PRINCIPAL
   ================================================================ */

/** Timestamp del frame anterior para calcular dt */
let _lastTs = 0;

/**
 * Bucle principal del juego. Invocado una vez por frame vía requestAnimationFrame.
 * Calcula el delta de tiempo y despacha actualización + renderizado según la pantalla activa.
 *
 * @param {number} ts Timestamp del frame actual en milisegundos
 */
function gameLoop(ts) {
  // Limitar dt máximo a 80 ms para evitar saltos grandes al cambiar de pestaña
  const dt = Math.min(ts - _lastTs, 80);
  _lastTs = ts;

  ctx.clearRect(0, 0, W, H);

  switch (STATE.screen) {
    case 'title':
      drawTitleScreen();
      break;

    case 'battle':
      _updateBattle(dt);
      _renderBattle();
      break;

    case 'stageWin':
      _renderBattle();      // fondo del último combate detrás de la UI
      drawStageWinScreen();
      break;

    case 'defeat':
      _renderBattle();
      drawDefeatScreen();
      break;

    case 'training':
      _updateTraining(dt);
      drawTrainingScreen();
      break;

    case 'finalWin':
      drawFinalWinScreen();
      break;
  }

  requestAnimationFrame(gameLoop);
}

/**
 * Actualiza toda la lógica de un frame de combate.
 * Solo se llama cuando STATE.screen === 'battle'.
 *
 * @param {number} dt Milisegundos desde el frame anterior
 */
function _updateBattle(dt) {
  // Reducir cooldowns de habilidades
  STATE.cooldowns = STATE.cooldowns.map(cd => Math.max(0, cd - dt));
  refreshSkillButtons();

  // IA del enemigo: ataca a intervalos con variación aleatoria
  STATE.enemyTimer -= dt;
  if (STATE.enemyTimer <= 0 && STATE.playerHP > 0 && STATE.enemyHP > 0) {
    STATE.enemyTimer = STAGES[STATE.stage].enemy.cd + Math.random() * (900 - STATE.stage * 120);
    enemyAttack();
  }

  updateParticles(dt);
  updateProjectiles(dt);
  updatePrizes(dt);
  if (STATE.stage >= 3) updateThiefBirds(dt);
  updateMessages(dt);
}

/**
 * Renderiza la escena de combate completa:
 * fondo del escenario, decoración, gallos, partículas y HUD.
 * Aplica shake de cámara cuando STATE.shake > 0.
 */
function _renderBattle() {
  const stage = STAGES[STATE.stage];

  // Shake de cámara al recibir daño
  let sx = 0, sy = 0;
  if (STATE.shake > 0) {
    sx = (Math.random() - 0.5) * 5;
    sy = (Math.random() - 0.5) * 3;
    STATE.shake -= 16;
  }

  ctx.save();
  ctx.translate(sx, sy);
  drawBackground(stage);
  drawSceneDecor(stage.id);
  drawPlayer();
  drawEnemy();
  drawPrizes();
  drawThiefBirds();
  drawProjectiles();
  drawParticles();
  drawHUD();
  ctx.restore();
}

/* ================================================================
   CONTROLES DE ENTRADA
   ================================================================ */

/** Mapeo tecla → índice de habilidad del jugador */
const KEY_MAP = { q:0, w:1, e:2, r:3, t:4, y:5 };

document.addEventListener('keydown', (ev) => {
  const k = ev.key.toLowerCase();
  switch (STATE.screen) {
    case 'title':
      startGame();
      break;
    case 'battle':
      if (k in KEY_MAP) {
        const idx = KEY_MAP[k];
        if (idx < TRANSFORMS[STATE.transform].skills.length) useSkill(idx);
      }
      break;
    case 'stageWin':
      advanceStage();
      break;
    case 'defeat':
      if (k === 'escape') restartToTitle(); else startTraining();
      break;
    case 'training':
      break; // solo clic activa los objetivos
    case 'finalWin':
      restartToTitle();
      break;
  }
});

canvas.addEventListener('click', (ev) => {
  const rect = canvas.getBoundingClientRect();
  const cx   = (ev.clientX - rect.left) * (canvas.width  / rect.width);
  const cy   = (ev.clientY - rect.top)  * (canvas.height / rect.height);

  if (STATE.screen === 'battle') {
    _checkPrizeClick(cx, cy);
    return;
  }
  if (STATE.screen === 'training') {
    _checkTrainingClick(cx, cy);
    return;
  }
  switch (STATE.screen) {
    case 'title':    startGame();      break;
    case 'stageWin': advanceStage();   break;
    case 'defeat':   startTraining();  break;
    case 'finalWin': restartToTitle(); break;
  }
});

/* ================================================================
   ARRANQUE DEL JUEGO
   ================================================================ */
requestAnimationFrame(gameLoop);
