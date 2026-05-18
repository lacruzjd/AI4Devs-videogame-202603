/**
 * sounds.js
 * Sistema de sonido procedural usando Web Audio API.
 * No requiere archivos externos: todos los efectos se sintetizan al vuelo
 * con osciladores, ruido blanco y envolventes de amplitud.
 *
 * Expone el objeto global SFX con métodos por categoría de evento.
 * Debe cargarse antes de mechanics.js e integrarse llamando SFX.init()
 * en la primera interacción del usuario para cumplir la política de
 * autoplay de los navegadores modernos.
 *
 * Categorías:
 *   · Ataques del jugador  (attack_*)
 *   · Impacto recibido     (impact)
 *   · Público              (ovacion, tomatazo, combo)
 *   · Premios              (prize_*)
 *   · Entrenamiento        (training_*)
 *   · Transformaciones     (new_transform)
 *   · Pantallas            (victory, stage_win, defeat)
 */

const SFX = (() => {
  let _ac = null;

  /* ----------------------------------------------------------------
     HELPERS INTERNOS
     ---------------------------------------------------------------- */

  /** Obtiene o crea el AudioContext, resumiéndolo si el navegador lo suspendió */
  function _ctx() {
    if (!_ac) _ac = new (window.AudioContext || window.webkitAudioContext)();
    if (_ac.state === 'suspended') _ac.resume();
    return _ac;
  }

  /**
   * Reproduce un tono con envolvente de amplitud y glide de frecuencia opcional.
   * @param {number}  freq    Frecuencia inicial en Hz
   * @param {string}  type    Forma de onda: 'sine' | 'square' | 'sawtooth' | 'triangle'
   * @param {number}  vol     Volumen pico (0–1)
   * @param {number}  dur     Duración en segundos
   * @param {number}  [end]   Frecuencia final para glide (opcional)
   */
  function _tone(freq, type, vol, dur, end) {
    const a = _ctx();
    const o = a.createOscillator();
    const g = a.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, a.currentTime);
    if (end !== undefined) o.frequency.linearRampToValueAtTime(end, a.currentTime + dur);
    g.gain.setValueAtTime(0, a.currentTime);
    g.gain.linearRampToValueAtTime(vol, a.currentTime + 0.005);
    g.gain.linearRampToValueAtTime(0,   a.currentTime + dur);
    o.connect(g);
    g.connect(a.destination);
    o.start();
    o.stop(a.currentTime + dur + 0.01);
  }

  /**
   * Genera un burst de ruido blanco filtrado (explosiones, golpes percusivos).
   * @param {number} vol      Volumen pico (0–1)
   * @param {number} dur      Duración en segundos
   * @param {number} filterHz Frecuencia central del filtro bandpass
   */
  function _noise(vol, dur, filterHz) {
    const a   = _ctx();
    const len = Math.ceil(a.sampleRate * dur);
    const buf = a.createBuffer(1, len, a.sampleRate);
    const d   = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    const src = a.createBufferSource();
    src.buffer = buf;
    const flt = a.createBiquadFilter();
    flt.type            = 'bandpass';
    flt.frequency.value = filterHz || 1000;
    flt.Q.value         = 1.5;
    const g = a.createGain();
    g.gain.setValueAtTime(vol, a.currentTime);
    g.gain.linearRampToValueAtTime(0, a.currentTime + dur);
    src.connect(flt);
    flt.connect(g);
    g.connect(a.destination);
    src.start();
  }

  /**
   * Reproduce una secuencia de tonos con retraso escalonado (acordes, fanfarrias).
   * @param {number[]} freqs  Array de frecuencias en Hz
   * @param {string}   type   Forma de onda
   * @param {number}   vol    Volumen por nota
   * @param {number}   dur    Duración de cada nota en segundos
   * @param {number}   gap    Separación entre notas en milisegundos
   */
  function _seq(freqs, type, vol, dur, gap) {
    freqs.forEach((freq, i) => setTimeout(() => _tone(freq, type, vol, dur), i * gap));
  }

  /* ----------------------------------------------------------------
     API PÚBLICA
     ---------------------------------------------------------------- */
  return {

    /** Desbloquea el AudioContext en la primera interacción del usuario */
    init() { _ctx(); },

    /* ── ATAQUES DEL JUGADOR ────────────────────────────────── */

    /** 🐔 Picotazo: cacareo corto y descendente */
    attack_picotazo() {
      _tone(720, 'square', 0.28, 0.14, 180);
    },

    /** 🔥 Llamarada Disco: whoosh de ruido + tono ascendente */
    attack_llamarada() {
      _noise(0.18, 0.22, 2200);
      _tone(440, 'sawtooth', 0.14, 0.22, 880);
    },

    /** 💨 Soplido Inflador: ráfaga de viento grave */
    attack_soplido() {
      _noise(0.14, 0.30, 450);
      _tone(280, 'sine', 0.10, 0.30, 180);
    },

    /** ⚡ Rayo Guitarra: riff eléctrico en dos pasos */
    attack_rayo() {
      _tone(220, 'sawtooth', 0.32, 0.18, 440);
      setTimeout(() => _tone(440, 'square', 0.18, 0.14, 660), 80);
    },

    /** 🌽 Trampa Espigas: tres pops rápidos */
    attack_espigas() {
      [0, 55, 110].forEach(ms => setTimeout(() => _noise(0.22, 0.09, 900), ms));
    },

    /** 🎉 ¡ULTRA CONFETI!: acorde ascendente + explosión de ruido */
    attack_confeti() {
      _seq([261, 329, 392, 523], 'sine', 0.22, 0.40, 55);
      _noise(0.30, 0.38, 2800);
    },

    /* ── IMPACTO RECIBIDO ───────────────────────────────────── */

    /** Golpe del enemigo: impacto grave con rebote de ruido */
    impact() {
      _tone(140, 'sawtooth', 0.38, 0.18, 70);
      _noise(0.28, 0.14, 500);
    },

    /* ── REACCIONES DEL PÚBLICO ─────────────────────────────── */

    /** Ovación: aplauso suave + tono corto */
    ovacion() {
      _noise(0.09, 0.28, 1600);
      _tone(523, 'sine', 0.08, 0.18);
    },

    /** Tomatazo: golpe chato descendente */
    tomatazo() {
      _tone(230, 'square', 0.22, 0.10, 90);
      _noise(0.14, 0.10, 280);
    },

    /** Combo ×3: tres notas ascendentes en sucesión */
    combo() {
      _seq([523, 659, 784], 'sine', 0.22, 0.14, 80);
    },

    /* ── PREMIOS ─────────────────────────────────────────────── */

    /** 🌽 Maíz pequeño: ding simple */
    prize_maiz() {
      _tone(880, 'sine', 0.22, 0.14);
    },

    /** 🍿 Palomitas mágicas: dos pops escalonados */
    prize_palomitas() {
      _tone(1046, 'sine', 0.18, 0.10);
      setTimeout(() => _tone(880, 'sine', 0.12, 0.10), 60);
    },

    /** 🥚 Huevo Dorado: carillón mágico de 3 notas */
    prize_huevo() {
      _seq([659, 784, 1047], 'sine', 0.22, 0.18, 60);
    },

    /** 🎉 ¡Confeti Arcoíris!: fanfarria + explosión de ruido */
    prize_confeti() {
      _seq([523, 659, 784, 1047], 'triangle', 0.24, 0.32, 50);
      _noise(0.32, 0.38, 2400);
    },

    /* ── ENTRENAMIENTO ───────────────────────────────────────── */

    /** Objetivo golpeado: ding agudo */
    training_hit() {
      _tone(1046, 'sine', 0.24, 0.12);
    },

    /** Sesión completada: acorde de fanfarria */
    training_done() {
      _seq([523, 659, 784, 1047], 'triangle', 0.22, 0.24, 100);
    },

    /* ── TRANSFORMACIONES ────────────────────────────────────── */

    /** Nueva transformación obtenida: tres tonos ascendentes con gap */
    new_transform() {
      _tone(440,  'sine', 0.28, 0.10);
      setTimeout(() => _tone(880,  'sine', 0.26, 0.18), 110);
      setTimeout(() => _tone(1320, 'sine', 0.22, 0.26), 240);
    },

    /* ── PANTALLAS ───────────────────────────────────────────── */

    /** Victoria final: fanfarria de 5 notas */
    victory() {
      _seq([523, 659, 784, 1047, 1319], 'sine', 0.24, 0.28, 110);
    },

    /** Victoria de etapa: fanfarria corta de 3 notas */
    stage_win() {
      _seq([523, 659, 784], 'sine', 0.22, 0.20, 90);
    },

    /** Derrota: cuatro notas descendentes ("wah wah") */
    defeat() {
      _seq([440, 330, 220, 165], 'sawtooth', 0.20, 0.28, 150);
    },
  };
})();
