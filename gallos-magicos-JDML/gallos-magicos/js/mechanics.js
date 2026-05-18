/**
 * mechanics.js
 * Lógica de combate, puntuación y balance numérico del juego.
 * Implementa todas las mecánicas del GDD (Prompts 12 y 13).
 *
 * Depende de (globals en otros archivos):
 *   STATE, ctx, panel, msgBar      → main.js
 *   TRANSFORMS, PARTICLE_COLORS   → characters.js
 *   STAGES                         → scenes.js
 *   spawnParticles, addMsg,
 *   initBattle                     → main.js
 */

/* ----------------------------------------------------------------
   CONSTANTES DE BALANCE (Prompts 12–13)
   ---------------------------------------------------------------- */
const BALANCE = {
  maxEnergy: 100, // Puntos de energía iniciales de cada combatiente
  spectacleX15: 100, // Humor+Estilo > 100 → multiplicador de daño ×1.5
  spectacleX2: 150, // Humor+Estilo > 150 → multiplicador de daño ×2.0
  spectacleVictory: 200, // Humor+Estilo ≥ 200 → victoria automática por espectáculo
  humorOvacion: 6, // Bonus de humor por ataque variado (ovación del público)
  humorTomatazo: -5, // Penalización de humor por ataque repetido (tomatazo)
  styleCombo3: 10, // Bonus de estilo por usar 3 habilidades distintas seguidas
  styleRepeat: -10, // Penalización de estilo por repetir el mismo ataque
  styleNewTransform: 15, // Bonus de estilo al obtener una nueva transformación
};

/* ----------------------------------------------------------------
   SISTEMA DE ESPECTÁCULO
   ---------------------------------------------------------------- */

/**
 * Calcula el multiplicador de daño basado en los puntos de espectáculo
 * acumulados (Humor + Estilo).
 * Gallo Arcoíris Supremo (transform 5) alcanza ×2.5 en lugar de ×2.0
 * cuando supera el umbral de espectáculo alto (Prompt 9).
 *
 * @returns {number} 1.0 (normal) | 1.5 (>100 pts) | 2.0 / 2.5 (>150 pts)
 */
function spectacleMultiplier() {
  const total = STATE.humor + STATE.style;
  if (total > BALANCE.spectacleX2) {
    return STATE.transform === TRANSFORMS.length - 1 ? 2.5 : 2.0;
  }
  if (total > BALANCE.spectacleX15) return 1.5;
  return 1.0;
}

/* ----------------------------------------------------------------
   COMBATE: ATAQUE DEL JUGADOR
   ---------------------------------------------------------------- */

/**
 * Ejecuta el ataque del jugador con la habilidad en la posición skillIdx.
 *
 * Flujo:
 *  1. Calcula daño con multiplicador de espectáculo.
 *  2. Aplica penalización/bonus según variedad de ataques.
 *  3. Detecta combo x3 (3 habilidades distintas seguidas).
 *  4. Activa cooldown y animaciones.
 *  5. Comprueba condiciones de victoria.
 *
 * @param {number} skillIdx Índice de la habilidad en TRANSFORMS[STATE.transform].skills
 */
/** Mapeo emoji de habilidad → método de SFX */
const _SKILL_SFX = {
  "🐔": "attack_picotazo",
  "🔥": "attack_llamarada",
  "💨": "attack_soplido",
  "⚡": "attack_rayo",
  "🌽": "attack_espigas",
  "🎉": "attack_confeti",
};

function useSkill(skillIdx) {
  if (STATE.screen !== "battle") return;
  if (STATE.cooldowns[skillIdx] > 0) return;

  const sk = TRANSFORMS[STATE.transform].skills[skillIdx];
  const mult = spectacleMultiplier();
  const dmg = Math.floor(sk.dmg * mult);

  if (_SKILL_SFX[sk.emoji]) SFX[_SKILL_SFX[sk.emoji]]();

  // Reducir energía del enemigo
  STATE.enemyHP = Math.max(0, STATE.enemyHP - dmg);

  // Calcular ganancias de humor y estilo
  let humorDelta = sk.humor;
  let styleDelta = sk.style;

  if (STATE.lastSkill === skillIdx) {
    // Ataque repetido: tomates del público
    styleDelta = BALANCE.styleRepeat;
    humorDelta += BALANCE.humorTomatazo;
    addMsg("🍅 ¡El público lanza tomates!", "#FF6B6B");
    SFX.tomatazo();
  } else {
    // Ataque variado: ovación del público
    humorDelta += BALANCE.humorOvacion;
    addMsg("👏 ¡Ovación del público!", "#FFD700");
    SFX.ovacion();
  }

  STATE.humor = Math.min(250, Math.max(0, STATE.humor + humorDelta));
  STATE.style = Math.min(250, Math.max(0, STATE.style + styleDelta));

  // Detección de combo x3: 3 habilidades distintas usadas consecutivamente
  STATE.lastThree = [...STATE.lastThree, skillIdx].slice(-3);
  if (new Set(STATE.lastThree).size === 3) {
    STATE.style = Math.min(250, STATE.style + BALANCE.styleCombo3);
    addMsg(`🌟 ¡COMBO x3! +${BALANCE.styleCombo3} estilo`, "#FF69B4");
    SFX.combo();
  }

  STATE.lastSkill = skillIdx;

  // Activar cooldown de la habilidad usada
  STATE.cooldowns[skillIdx] = sk.cd;

  // Iniciar animaciones y efecto de cámara
  STATE.playerAnim = "attack";
  STATE.enemyAnim = "hit";
  STATE.shake = 280;
  spawnProjectile(sk.emoji, 180, 240, 580, 240);
  addMsg(
    `${sk.emoji} ${sk.name} ×${mult.toFixed(1)} → −${dmg} Energía`,
    "#FFF",
  );

  // Resetear animaciones tras la duración del golpe
  setTimeout(() => {
    STATE.playerAnim = "idle";
    STATE.enemyAnim = "idle";
  }, 420);

  // Comprobar victoria por espectáculo (Humor+Estilo ≥ 200)
  if (STATE.humor + STATE.style >= BALANCE.spectacleVictory) {
    addMsg("🏆 ¡VICTORIA POR ESPECTÁCULO!", "#FFD700");
    setTimeout(() => { if (STATE.screen === 'battle') resolveVictory(); }, 600);
    return;
  }

  // Comprobar victoria por energía (energía del rival ≤ 0)
  if (STATE.enemyHP <= 0) {
    setTimeout(() => { if (STATE.screen === 'battle') resolveVictory(); }, 600);
  }
}

/* ----------------------------------------------------------------
   COMBATE: ATAQUE AUTÓNOMO DEL ENEMIGO
   ---------------------------------------------------------------- */

/**
 * El enemigo autónomo ataca al jugador.
 * El daño base escala con el índice de escenario para aumentar la dificultad.
 * Es llamado periódicamente por el game loop (timer en STATE.enemyTimer).
 */
function enemyAttack() {
  if (STATE.screen !== "battle") return;

  // Escalado cuadrático para que los niveles 3 y 4 sean notablemente más duros
  const DMG_BASE = [8, 12, 18, 28, 36];
  const DMG_RANGE = [7, 8, 10, 13, 14];
  const baseDmg = DMG_BASE[STATE.stage] ?? 8;
  const dmg =
    baseDmg + Math.floor(Math.random() * (DMG_RANGE[STATE.stage] ?? 7));

  STATE.playerHP = Math.max(0, STATE.playerHP - dmg);
  STATE.enemyAnim = "attack";
  STATE.playerAnim = "hit";
  STATE.shake = 280;

  SFX.impact();
  spawnProjectile("💥", 580, 240, 180, 240);
  addMsg(
    `💀 ${STAGES[STATE.stage].enemy.name}: "${STAGES[STATE.stage].enemy.phrase}"`,
    "#FF6B6B",
  );

  setTimeout(() => {
    STATE.enemyAnim = "idle";
    STATE.playerAnim = "idle";
  }, 500);

  // Comprobar derrota del jugador
  if (STATE.playerHP <= 0) {
    setTimeout(() => {
      if (STATE.screen === 'battle') STATE.screen = "defeat";
    }, 600);
  }
}

/* ----------------------------------------------------------------
   TRANSICIONES DE ESCENARIO
   ---------------------------------------------------------------- */

/**
 * Resuelve la victoria del jugador:
 *   · Guarda el índice de la etapa recién vencida (para la pantalla de victoria).
 *   · Si quedan etapas, muestra la pantalla intermedia de victoria.
 *   · En la última etapa, otorga la forma final y muestra la victoria total.
 *
 * BUG FIX: STATE.defeatedStage guarda la etapa antes de que STATE.stage cambie,
 * evitando el crash por índice -1 en drawStageWinScreen cuando se vence la etapa 0.
 */
function resolveVictory() {
  STATE.defeatedStage = STATE.stage; // guardar etapa vencida para la UI

  if (STATE.stage < STAGES.length - 1) {
    SFX.stage_win();
    STATE.screen = "stageWin";
  } else {
    // Última batalla: el jugador obtiene la forma suprema
    SFX.victory();
    STATE.transform = TRANSFORMS.length - 1;
    STATE.screen = "finalWin";
  }
}

/**
 * Avanza al siguiente escenario al confirmar la pantalla de victoria.
 * Aplica la transformación ganada y los bonuses de progresión (Prompt 9).
 */
function advanceStage() {
  STATE.stage += 1;
  STATE.transform = Math.min(STATE.stage, TRANSFORMS.length - 2);

  const tr = TRANSFORMS[STATE.transform];

  STATE.screen = "battle";
  initBattle();

  // Aplicar bonus de humor/estilo de la nueva transformación (Prompt 9)
  STATE.humor = Math.min(250, STATE.humor + tr.bonus.humor);
  STATE.style = Math.min(
    250,
    STATE.style + tr.bonus.style + BALANCE.styleNewTransform,
  );

  SFX.new_transform();
  addMsg(`✨ ¡Nueva forma: ${tr.name}!`, "#FFD700");
}

/* ----------------------------------------------------------------
   CICLO DE VIDA DE LA PARTIDA
   ---------------------------------------------------------------- */

/**
 * Inicia una nueva partida desde el principio (etapa 0, transformación básica).
 */
function startGame() {
  SFX.init();
  STATE.screen = "battle";
  STATE.stage = 0;
  STATE.transform = 0;
  STATE.humor = 0;
  STATE.style = 0;
  initBattle();
}

/**
 * Regresa a la pantalla de título y limpia el panel de habilidades.
 */
function restartToTitle() {
  STATE.screen = "title";
  panel.innerHTML = "";
  msgBar.textContent = "";
}
