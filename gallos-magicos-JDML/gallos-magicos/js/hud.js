/**
 * hud.js
 * Gestiona el HUD de combate (barras de estado, multiplicador, cooldowns)
 * y todas las pantallas especiales del juego (título, victoria, derrota).
 *
 * Depende de (globals en otros archivos):
 *   STATE, ctx, panel, W, H       → main.js
 *   TRANSFORMS, PLAYER_EXTRAS,
 *   ENEMY_EXTRAS, drawRooster     → characters.js
 *   STAGES                         → scenes.js
 *   BALANCE, spectacleMultiplier  → mechanics.js
 *   useSkill                       → mechanics.js
 */

/* ================================================================
   HUD DE COMBATE
   ================================================================ */

/**
 * Renderiza el HUD completo sobre el canvas de combate.
 * Incluye:
 *   · Nombre y barras del jugador (Energía, Humor, Estilo)
 *   · Espectáculo (multiplicador + puntos totales)
 *   · Nombre y barra de energía del enemigo
 */
function drawHUD() {
  const stage = STAGES[STATE.stage];
  const tr    = TRANSFORMS[STATE.transform];
  const mult  = spectacleMultiplier();
  const total = STATE.humor + STATE.style;

  // Fondo semitransparente del HUD superior
  ctx.fillStyle = 'rgba(0,0,0,0.62)';
  ctx.fillRect(0, 0, W, 72);

  /* ---- JUGADOR (izquierda) ---- */
  ctx.fillStyle = '#FFF';
  ctx.font      = 'bold 11px Arial';
  ctx.textAlign = 'left';
  ctx.fillText(`TÚ · ${tr.name}`, 10, 14);

  drawBar(10, 18, 200, 13, STATE.playerHP, BALANCE.maxEnergy, '#F44336', '#B71C1C', '❤️', true);
  drawBar(10, 34, 200, 11, STATE.humor,    200,               '#8BC34A', '#388E3C', '😂', true);
  drawBar(10, 48, 200, 11, STATE.style,    200,               '#CE93D8', '#7B1FA2', '✨', true);

  /* ---- ESPECTÁCULO (centro) ---- */
  ctx.textAlign = 'center';
  ctx.fillStyle = mult > 1.0 ? '#FFD700' : '#9E9E9E';
  ctx.font      = 'bold 13px Arial Black, Arial';
  ctx.fillText(`ESPECTÁCULO ×${mult.toFixed(1)}`, 400, 18);

  ctx.font      = '11px Arial';
  ctx.fillStyle = '#BDBDBD';
  ctx.fillText(`${Math.round(total)} / 200 pts`, 400, 33);

  ctx.fillStyle = '#FFD700';
  ctx.font      = 'bold 11px Arial';
  ctx.fillText(stage.name, 400, 50);

  ctx.fillStyle = '#9E9E9E';
  ctx.font      = '10px Arial';
  ctx.fillText(`Etapa ${STATE.stage + 1} / ${STAGES.length}`, 400, 65);

  /* ---- ENEMIGO (derecha) ---- */
  ctx.fillStyle = '#FFF';
  ctx.font      = 'bold 11px Arial';
  ctx.textAlign = 'right';
  ctx.fillText(`RIVAL · ${stage.enemy.name}`, W - 10, 14);
  drawBar(W - 210, 18, 200, 13, STATE.enemyHP, BALANCE.maxEnergy, '#F44336', '#B71C1C', '❤️', false);
}

/**
 * Dibuja una barra de estado (Energía, Humor o Estilo) con icono y texto.
 *
 * @param {number}  x         Posición X del borde izquierdo
 * @param {number}  y         Posición Y del borde superior
 * @param {number}  w         Ancho total de la barra
 * @param {number}  h         Alto de la barra
 * @param {number}  val       Valor actual
 * @param {number}  max       Valor máximo
 * @param {string}  fill      Color de la parte llena
 * @param {string}  bg        Color de la parte vacía
 * @param {string}  icon      Emoji que acompaña al texto
 * @param {boolean} labelLeft true = texto alineado izquierda, false = derecha
 */
function drawBar(x, y, w, h, val, max, fill, bg, icon, labelLeft) {
  const pct = Math.max(0, Math.min(1, val / max));
  ctx.fillStyle = bg;
  ctx.fillRect(x, y, w, h);
  ctx.fillStyle = fill;
  ctx.fillRect(x, y, w * pct, h);
  ctx.strokeStyle = 'rgba(255,255,255,0.4)';
  ctx.lineWidth = 1;
  ctx.strokeRect(x, y, w, h);
  ctx.fillStyle = '#FFF';
  ctx.font = '9px Arial';
  ctx.textAlign = labelLeft ? 'left' : 'right';
  ctx.fillText(
    `${icon} ${Math.round(val)}/${max}`,
    labelLeft ? x + 3 : x + w - 3,
    y + h - 2
  );
}

/* ================================================================
   PANEL DE HABILIDADES (DOM)
   ================================================================ */

/**
 * Construye (o reconstruye) los botones de habilidades en el panel DOM.
 * Crea un botón por habilidad disponible en la transformación actual.
 */
function buildSkillButtons() {
  panel.innerHTML = '';
  TRANSFORMS[STATE.transform].skills.forEach((sk, i) => {
    const btn = document.createElement('button');
    btn.className = 'skill-btn';
    btn.id = `sk${i}`;
    btn.innerHTML = `
      <span class="sk-emoji">${sk.emoji}</span>
      <span class="sk-info">
        <span class="sk-name">[${sk.key}] ${sk.name}</span>
        <span class="sk-meta">DMG ${sk.dmg} · CD ${sk.cd / 1000}s</span>
      </span>
      <span class="cd-bar"  id="cdb${i}"></span>
      <span class="cd-label" id="cdl${i}"></span>
    `;
    btn.addEventListener('click', () => useSkill(i));
    panel.appendChild(btn);
  });
}

/**
 * Sincroniza el estado visual de los botones con el cooldown actual.
 * Deshabilita botones en cooldown y actualiza la barra de progreso.
 */
function refreshSkillButtons() {
  TRANSFORMS[STATE.transform].skills.forEach((sk, i) => {
    const btn = document.getElementById(`sk${i}`);
    const bar = document.getElementById(`cdb${i}`);
    const lbl = document.getElementById(`cdl${i}`);
    if (!btn) return;
    const cd = STATE.cooldowns[i];
    btn.disabled = cd > 0;
    if (bar) bar.style.width = cd > 0 ? `${(1 - cd / sk.cd) * 100}%` : '100%';
    if (lbl) lbl.textContent  = cd > 0 ? `${(cd / 1000).toFixed(1)}s` : '¡Listo!';
  });
}

/* ================================================================
   PANTALLAS ESPECIALES
   ================================================================ */

/** Pantalla de título con fondo estrellado y vista previa de gallos */
function drawTitleScreen() {
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, '#0d0520'); g.addColorStop(1, '#4a148c');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);

  // Estrellas parpadeantes
  for (let i = 0; i < 55; i++) {
    const br = (Math.sin(Date.now() * 0.002 + i) + 1) / 2;
    ctx.fillStyle = `rgba(255,255,255,${br * 0.75})`;
    ctx.beginPath();
    ctx.arc((i * 139) % W, (i * 71) % H, 1.4, 0, Math.PI * 2); ctx.fill();
  }

  ctx.textAlign = 'center';
  ctx.shadowColor = '#FFD700'; ctx.shadowBlur = 22;
  ctx.fillStyle = '#FFD700'; ctx.font = 'bold 40px Arial Black, Arial';
  ctx.fillText('🐔 GALLOS MÁGICOS', 400, 115);
  ctx.fillStyle = '#FFF'; ctx.font = 'bold 20px Arial';
  ctx.fillText('TORNEO DEL MAÍZ DORADO', 400, 158);
  ctx.shadowBlur = 0;

  ctx.fillStyle = '#BDBDBD'; ctx.font = '13px Arial';
  ctx.fillText('¡Lucha, baila y conquista al público en el torneo más absurdo del mundo!', 400, 196);

  // Vista previa de gallos
  drawRooster(185, 360, '#F5F5DC', '#DAA520', true,  'idle', null);
  drawRooster(615, 360, '#FF4500', '#FF8C00', false, 'idle', ENEMY_EXTRAS[0]);

  ctx.fillStyle = '#E91E63'; ctx.font = 'bold 52px Arial Black, Arial';
  ctx.shadowColor = '#E91E63'; ctx.shadowBlur = 18;
  ctx.fillText('VS', 400, 375);
  ctx.shadowBlur = 0;

  // Texto pulsante para iniciar
  const pulse = (Math.sin(Date.now() * 0.0035) + 1) / 2;
  ctx.globalAlpha = 0.45 + pulse * 0.55;
  ctx.fillStyle = '#FFD700'; ctx.font = 'bold 16px Arial';
  ctx.fillText('— PRESIONA CUALQUIER TECLA O HAZ CLICK —', 400, 445);
  ctx.globalAlpha = 1;

  ctx.fillStyle = '#9E9E9E'; ctx.font = '11px Arial';
  ctx.fillText('Teclas Q W E R T Y para atacar  |  Botones en pantalla también funcionan', 400, 472);
}

/**
 * Pantalla de victoria de etapa.
 * Muestra el rival derrotado, la transformación ganada y el próximo escenario.
 *
 * CORRECCIÓN DE BUG: usa STATE.defeatedStage (guardado por resolveVictory antes
 * de cambiar STATE.stage) en lugar de STATE.stage - 1, que devolvía índice -1
 * cuando se vencía la primera etapa, causando un TypeError en el acceso a STAGES.
 */
function drawStageWinScreen() {
  ctx.fillStyle = 'rgba(0,0,0,0.78)';
  ctx.fillRect(0, 0, W, H);

  // Etapa vencida (guardada en resolveVictory, no modificada aún)
  const defeated = STAGES[STATE.defeatedStage];
  // Transformación que se obtendrá al avanzar
  const nextTrIdx = Math.min(STATE.defeatedStage + 1, TRANSFORMS.length - 2);
  const newTr = TRANSFORMS[nextTrIdx];

  ctx.textAlign = 'center';
  ctx.shadowColor = '#FFD700'; ctx.shadowBlur = 18;
  ctx.fillStyle = '#FFD700'; ctx.font = 'bold 38px Arial Black, Arial';
  ctx.fillText('¡VICTORIA!', 400, 96);
  ctx.shadowBlur = 0;

  ctx.fillStyle = '#FFF'; ctx.font = '18px Arial';
  ctx.fillText(`¡Derrotaste a ${defeated.enemy.name}!`, 400, 145);

  ctx.fillStyle = '#69F0AE'; ctx.font = 'bold 16px Arial';
  ctx.fillText('✨ ¡Absorbiste su poder!', 400, 188);
  ctx.fillText(`Nueva forma: ${newTr.name}`, 400, 215);

  ctx.fillStyle = '#CFD8DC'; ctx.font = '13px Arial';
  ctx.fillText(`Humor: ${Math.round(STATE.humor)} pts  ·  Estilo: ${Math.round(STATE.style)} pts`, 400, 258);
  ctx.fillText(`Espectáculo total: ${Math.round(STATE.humor + STATE.style)} pts`, 400, 280);

  // Información del próximo escenario
  const nextStageIdx = STATE.defeatedStage + 1;
  if (nextStageIdx < STAGES.length) {
    const nextS = STAGES[nextStageIdx];
    ctx.fillStyle = '#80DEEA'; ctx.font = '15px Arial';
    ctx.fillText(`Siguiente arena: ${nextS.name}`, 400, 328);
    ctx.fillText(`Rival: ${nextS.enemy.name}`, 400, 352);
  }

  const pulse = (Math.sin(Date.now() * 0.004) + 1) / 2;
  ctx.globalAlpha = 0.45 + pulse * 0.55;
  ctx.fillStyle = '#FFD700'; ctx.font = 'bold 15px Arial';
  ctx.fillText('— CLICK O TECLA PARA CONTINUAR —', 400, 432);
  ctx.globalAlpha = 1;
}

/** Pantalla de derrota del jugador */
function drawDefeatScreen() {
  ctx.fillStyle = 'rgba(80,0,0,0.84)';
  ctx.fillRect(0, 0, W, H);

  ctx.textAlign = 'center';
  ctx.shadowColor = '#F44336'; ctx.shadowBlur = 22;
  ctx.fillStyle = '#F44336'; ctx.font = 'bold 44px Arial Black, Arial';
  ctx.fillText('¡DERROTA!', 400, 115);
  ctx.shadowBlur = 0;

  ctx.fillStyle = '#FFF'; ctx.font = '18px Arial';
  ctx.fillText('¡El público te lanza tomates y palomitas!', 400, 168);
  ctx.fillText('¡Vuelve al gallinero, entrena y regresa!', 400, 198);

  ctx.fillStyle = '#CFD8DC'; ctx.font = '13px Arial';
  ctx.fillText(`Llegaste hasta: ${STAGES[STATE.stage].name}`, 400, 248);
  ctx.fillText(`Humor: ${Math.round(STATE.humor)}  ·  Estilo: ${Math.round(STATE.style)}`, 400, 272);

  const pulse = (Math.sin(Date.now() * 0.004) + 1) / 2;
  ctx.globalAlpha = 0.45 + pulse * 0.55;
  ctx.fillStyle = '#00FF88'; ctx.font = 'bold 15px Arial';
  ctx.fillText('— CLICK / TECLA → ENTRENAR · ESC → TÍTULO —', 400, 432);
  ctx.globalAlpha = 1;

  ctx.fillStyle = '#757575'; ctx.font = '11px Arial';
  ctx.globalAlpha = 0.7;
  ctx.fillText('El entrenamiento te da bonus de Humor y Estilo para el siguiente intento', 400, 458);
  ctx.globalAlpha = 1;
}

/** Pantalla de victoria final: el jugador es campeón del torneo */
function drawFinalWinScreen() {
  const fg = ctx.createRadialGradient(400, 245, 40, 400, 245, 420);
  fg.addColorStop(0, '#FFD700'); fg.addColorStop(0.4, '#E91E63'); fg.addColorStop(1, '#0d0520');
  ctx.fillStyle = fg; ctx.fillRect(0, 0, W, H);

  // Confeti explosivo
  for (let i = 0; i < 45; i++) {
    const lt = (Date.now() * 0.0004 + i * 0.22) % 1;
    ctx.fillStyle = `hsl(${i * 26}, 85%, 58%)`;
    ctx.save();
    ctx.translate((i * 49 + 35) % 780, lt * 520);
    ctx.rotate(lt * Math.PI * 4 + i);
    ctx.fillRect(-4, -5, 8, 10); ctx.restore();
  }

  ctx.textAlign = 'center';
  ctx.shadowColor = '#FFF'; ctx.shadowBlur = 28;
  ctx.fillStyle = '#FFD700'; ctx.font = 'bold 42px Arial Black, Arial';
  ctx.fillText('¡¡¡CAMPEÓN!!!', 400, 82);
  ctx.fillStyle = '#FFF'; ctx.font = 'bold 20px Arial';
  ctx.fillText('Gran Maestro del Desayuno', 400, 125);
  ctx.shadowBlur = 0;

  ctx.fillStyle = '#FFF'; ctx.font = '15px Arial';
  ctx.fillText('¡Conquistaste el Torneo del Maíz Dorado!', 400, 172);
  ctx.fillText('La corona dorada explota en palomitas…', 400, 196);
  ctx.fillText('¡…compartidas con TODO el público! 🍿', 400, 220);

  ctx.fillStyle = '#69F0AE'; ctx.font = 'bold 15px Arial';
  ctx.fillText(`Espectáculo final: ${Math.round(STATE.humor + STATE.style)} pts`, 400, 264);

  // Gallo Arcoíris Supremo triunfante
  drawRooster(400, 400, '#E91E63', '#00BCD4', true, 'idle', PLAYER_EXTRAS[5]);

  const pulse = (Math.sin(Date.now() * 0.004) + 1) / 2;
  ctx.globalAlpha = 0.45 + pulse * 0.55;
  ctx.fillStyle = '#FFD700'; ctx.font = 'bold 15px Arial';
  ctx.fillText('— CLICK O TECLA PARA JUGAR DE NUEVO —', 400, 468);
  ctx.globalAlpha = 1;
}
