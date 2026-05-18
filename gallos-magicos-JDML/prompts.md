# Juego de gallos - JDML

## Asistentes de IA

- Análisis y temática del juego: Copilot de Microsoft
- Desarrollo del juego: Claude Code
- Editor de código: VS Code

## Prompt 1

```Text
Con el rol de experto en juegos, genera una idea de juego de gallos, debe ser caricaturesco y humorístico y en 2d.
```

### Respuesta

#### Idea del juego: _Gallos Mágicos – Torneo del Maíz Dorado_

En un mundo donde el humor y la magia gobiernan, los gallos más extravagantes se reúnen para competir en el **Gran Torneo del Maíz Dorado**. No se trata de simples combates: aquí la victoria depende tanto de la **creatividad y el estilo** como de la fuerza.

Cada gallo posee poderes elementales absurdos —fuego disco, viento globo, trueno punk y tierra maíz— que le permiten transformarse en formas cómicas y espectaculares. Los escenarios son arenas ridículas y mágicas: un granero encantado con cubetas saltarinas, un volcán que expulsa palomitas, un bosque de huevos gigantes y un estadio lleno de patos fans que lanzan confeti y tomates.

El público no es pasivo: ríe, aplaude, lanza objetos y hasta influye en el marcador. El jugador debe conquistar no solo al rival, sino también al público, acumulando **puntos de humor y estilo** para desbloquear transformaciones cada vez más absurdas.

La narrativa culmina en el **Templo del Maíz Dorado**, donde el campeón recibe la corona dorada… que inevitablemente se desarma en una explosión de palomitas compartidas con todos.

## Prompt 2

```text
Dame los pasos para crear el juego
```

### Respuesta

#### Pasos para crear un videojuego

1. **Idea inicial**
   - Define el concepto central: gallos mágicos en un torneo cómico.
   - Establece el tono: humor, caricatura y progresión narrativa.
   - Público objetivo: jugadores casuales que disfrutan de mecánicas absurdas y visuales divertidos.

2. **Documento de Diseño (GDD)**
   - Narrativa: torneo mágico con escenarios cómicos (granero, volcán de palomitas, bosque de huevos).
   - Mecánicas: combate por puntos de humor, estilo y daño cómico.
   - Personajes: gallos transformables con poderes elementales.
   - HUD: barras de humor, estilo y energía + cooldowns.

3. **Prototipo**
   - Construye una versión básica en un motor (Unity, Godot o Unreal).
   - Implementa un escenario inicial y un gallo con ataques cómicos simples.
   - Prueba jugabilidad: ¿es divertido? ¿se entiende el sistema de puntos?

4. **Desarrollo técnico**
   - Programación: lógica de combate, sistema de puntuación, transformaciones.
   - Arte: escenarios cómicos, gallos caricaturescos, HUD colorido.
   - Sonido: efectos absurdos (cacareos, explosiones de palomitas, risas del público).

5. **Mini‑juegos intermedios**
   - Karaoke gallístico, persecución de patos, trivia del maíz.
   - Refuerzan progresión y variedad.

6. **Pruebas y balance**
   - Ajusta cooldowns, puntuación y dificultad.
   - Testea con jugadores para asegurar que el humor funciona y el sistema es justo.

7. **Logros y progresión**
   - Museo del Maíz como galería de medallas cómicas.
   - Títulos absurdos: “Rey del Maíz Dorado”, “Gallina Disco Legendaria”.

8. **Publicación**
   - Prepara tráiler cómico y materiales de marketing.
   - Lanza en plataformas como Steam, itch.io o Google Play.

9. **Mantenimiento y actualizaciones**
   - Escucha feedback de la comunidad.
   - Añade escenarios nuevos, transformaciones y mini‑juegos adicionales.

### Análisis

La respuesta parece consistente, un poco compleja a mi parecer pero continúo, y pido desarrollar cada paso.

## Prompt 3

```text
desarrolla más la idea del juego siguiendo los pasos
```

### Respuesta

#### Idea inicial del juego

1. **Concepto central**
   - Un torneo cómico de **gallos mágicos** que luchan por poderes elementales (fuego, viento, trueno, tierra).
   - El tono es **humorístico y caricaturesco**, evitando cualquier violencia real.
   - Cada combate es un espectáculo donde el público participa activamente.

2. **Tema y atmósfera**
   - Estilo visual: caricatura colorida, exagerada y absurda.
   - Música: ritmos cómicos (disco, funky, mariachi) que acompañan las transformaciones.
   - Humor: ataques ridículos, interacciones con el público, escenarios absurdos.

3. **Público objetivo**
   - Jugadores casuales que buscan diversión rápida y humor.
   - Ideal para todas las edades, con estética amigable y cómica.
   - Fans de juegos party, arcade y peleas ligeras.

4. **Propuesta única**
   - Combates que no se ganan solo por daño, sino por **estilo y humor**.
   - El público influye en el resultado, convirtiéndose en parte de la jugabilidad.
   - Transformaciones cómicas que cambian habilidades y apariencia del gallo.

5. **Narrativa base**
   - El jugador participa en el **Gran Torneo del Maíz Dorado**.
   - Debe derrotar a los gallos elementales para llegar al **Templo del Maíz Dorado**.
   - El premio final es la corona de maíz dorado… que se desarma en palomitas compartidas con el público.

### Análisis

Le indiqué que el jugador lucha por los poderes elementales que tiene el oponente que es autónomo; al ganar el jugador y obtener el poder, cambia de escenario y el oponente autónomo carga el poder siguiente y así sucesivamente hasta llegar al elemento más alto.

## Prompt 4

```text
El jugador lucha por los poderes elementales que tiene el oponente autónomo; al ganar y obtener el poder, cambia de escenario y el oponente autónomo carga el poder siguiente, y así sucesivamente hasta llegar al elemento más alto.
```

### Respuesta

#### Idea del juego: _Gallos Mágicos – Torneo del Maíz Dorado_

El jugador entra en un torneo legendario donde cada combate es contra un **gallo elemental autónomo**. Estos rivales poseen poderes mágicos únicos (fuego, viento, trueno, tierra) y los usan de manera independiente, con ataques cómicos y transformaciones absurdas.

La dinámica central es que el **jugador debe derrotar al oponente para robar su poder elemental**. Al ganar, el gallo del jugador se transforma y obtiene nuevas habilidades cómicas, desbloqueando animaciones y ataques ridículos.

Tras cada victoria:

- El escenario cambia a una nueva arena cómica (granero encantado, volcán de palomitas, bosque de huevos gigantes, estadio de patos fans).
- El siguiente oponente autónomo aparece ya cargado con un poder distinto, más difícil y espectacular.
- El público reacciona con risas, aplausos y objetos lanzados, influyendo en el resultado del combate.

La progresión continúa hasta llegar al **elemento más alto**, donde el jugador enfrenta al rival supremo en el **Templo del Maíz Dorado**. Allí se define quién se convierte en el **Gran Maestro del Desayuno**, con la corona dorada que inevitablemente explota en una lluvia de palomitas compartidas con todos.

---

Esta estructura asegura que el juego tenga un **ciclo claro de progresión**:

1. Enfrentar un gallo autónomo con poder elemental.
2. Ganar y absorber su poder.
3. Cambiar de escenario y enfrentar al siguiente rival.
4. Avanzar hasta el combate final con el poder supremo.

### Análisis

Parece correcta.

## Prompt 5

```text
Genera el GDD del juego
```

### Respuesta

### Documento de Diseño de Juego (GDD)

**Título provisional:** _Gallos Mágicos – Torneo del Maíz Dorado_  
**Género:** Lucha cómica con progresión narrativa.  
**Estilo visual:** caricaturesco, colorido, con humor absurdo.  
**Público objetivo:** jugadores casuales y fans de juegos party/arcade.

---

#### 1. **Narrativa**

- **Premisa:** El jugador participa en un torneo mágico donde cada rival es un gallo elemental autónomo.
- **Progresión:**
  1. Enfrentar al **Gallo de Fuego** en el **Granero Encantado**.
  2. Ganar y absorber su poder → avanzar al **Volcán de Palomitas** contra el **Gallo de Viento**.
  3. Derrotar y obtener el poder → enfrentar al **Gallo Trueno** en el **Bosque de Huevos Gigantes**.
  4. Superar al **Gallo Tierra** en la **Arena de Patos Fans**.
  5. Llegar al **Templo del Maíz Dorado** contra el gallo supremo con todos los poderes.
- **Final:** La corona dorada explota en palomitas compartidas, celebrando el humor y la unión.

---

#### 2. **Mecánicas**

- **Sistema de combate:**
  - Puntos de **humor**: se ganan con ataques cómicos y reacciones del público.
  - Puntos de **estilo**: se acumulan con creatividad y variedad en los movimientos.
  - **Daño cómico**: golpes exagerados que afectan la barra de energía del rival.
- **Transformaciones:** al absorber poderes elementales, el gallo cambia de forma (ej. Gallo Llamas Disco, Gallo Globo).
- **Interacción con el público:** aplausos, risas y objetos lanzados que influyen en el combate.

---

#### 3. **Personajes**

- **Gallos elementales autónomos:**
  - Gallo de Fuego: ataques de llamaradas disco.
  - Gallo de Viento: soplidos que inflan y lanzan rivales.
  - Gallo Trueno: rayos eléctricos con estilo punk.
  - Gallo Tierra: invoca espigas explosivas y trampas cómicas.
- **Jugador:** inicia como gallo básico y absorbe poderes tras cada victoria.
- **NPCs cómicos:** público de patos, gallinas y pavos que reaccionan activamente.

---

#### 4. **HUD**

- **Barra de Humor:** se llena con risas y confeti del público.
- **Barra de Estilo:** mide creatividad y desbloquea transformaciones.
- **Barra de Energía:** se reduce al recibir daño cómico del rival (barra de vida del combate).
- **Cooldowns:** íconos cómicos para cada poder con temporizador visual.
- **Marcador de puntos:** muestra daño cómico, estilo y bonus de humor acumulados.

---

### Análisis

Parece consistente.

## Prompt 6

```text
Defina el estilo visual y sonoro del juego
```

### Respuesta

#### Estilo visual

- **Caricaturesco colorido**
  - Paleta brillante: rojos, amarillos, verdes y azules saturados.
  - Escenarios exagerados: granero encantado, volcán de palomitas, bosque de huevos gigantes.
  - Personajes con proporciones cómicas (plumas erizadas, ojos grandes, gestos ridículos).

- **Animaciones absurdas**
  - Barras del HUD que tiemblan y explotan en confeti.
  - Transformaciones visuales con efectos exagerados (disco ball, rayos punk, globos inflados).
  - Público caricaturesco que lanza tomates, palomitas y aplaude con alas.

- **Escenarios cómicos**
  - Cada arena tiene elementos interactivos absurdos (cubetas saltarinas, huevos rodando, espigas explosivas).
  - Fondos dinámicos con gallinas y patos animados.

---

#### Estilo sonoro

- **Música cómica**
  - Mezcla de géneros: disco, funky, mariachi y rock punk.
  - Cada escenario tiene su propio tema musical ridículo (ej. volcán de palomitas → salsa tropical con explosiones).

- **Efectos de sonido**
  - Cacareos exagerados al atacar.
  - Explosiones de palomitas con sonido “pop-pop-pop”.
  - Risas y aplausos del público sincronizados con las acciones.

- **Narrador cómico**
  - Voz caricaturesca que comenta las jugadas (“¡Ese gallo está más inflado que un globo de feria!”).
  - Reacciones absurdas cuando se activa un logro o transformación.

---

## Prompt 7

```text
 Defina los escenarios en detalle, mapa narrativo con cada arena, sus elementos interactivos y estilo musical asociado
```

### Respuesta

### 🗺️ Escenarios del Torneo del Maíz Dorado

#### 1. **Granero Encantado**

- **Visual:** cubetas saltarinas, heno que brilla, gallinas espectadoras en los balcones.
- **Sonido:** mariachi cómico con trompetas desafinadas.
- **Interacción:** objetos del granero caen y afectan el combate (baldes, huevos).

#### 2. **Volcán de Palomitas**

- **Visual:** lava convertida en palomitas que explotan al ritmo de la música.
- **Sonido:** salsa tropical con percusión de “pop-pop-pop”.
- **Interacción:** explosiones de palomitas que empujan a los personajes.

#### 3. **Bosque de Huevos Gigantes**

- **Visual:** árboles deformes con nidos enormes, huevos rodando como obstáculos.
- **Sonido:** melodías absurdas con xilófonos y sonidos de cascarones rompiéndose.
- **Interacción:** huevos gigantes que ruedan y bloquean ataques.

#### 4. **Arena de Patos Fans**

- **Visual:** graderías llenas de patos y gallinas que lanzan confeti y tomates.
- **Sonido:** cánticos de estadio con aplausos y risas sincronizadas.
- **Interacción:** el público influye directamente en el marcador con ovaciones.

#### 5. **Templo del Maíz Dorado**

- **Visual:** columnas de espigas doradas, altar con corona de maíz.
- **Sonido:** mezcla épica de todos los estilos anteriores, con coros cómicos.
- **Interacción:** el escenario cambia dinámicamente según los poderes absorbidos.

### Análisis

Acepté la sugerencia del mapa narrativo y generé una imagen que usaré como referencia.

¿Quieres que te prepare ahora un **mapa narrativo visual del torneo** (una escalera o diagrama que muestre la progresión de escenarios y rivales hasta el poder supremo)?

## Prompt 8

```text
Sí, prepara el mapa narrativo visual del torneo.
```

### Respuesta

#### Mapa narrativo visual del torneo

##### 🗺️ Escalera del Torneo

1. **Granero Encantado**
   - Rival: _Gallo de Fuego_.
   - Escenario inicial con cubetas saltarinas y mariachi cómico.

2. **Volcán de Palomitas**
   - Rival: _Gallo de Viento_.
   - Arena explosiva con palomitas y música tropical.

3. **Bosque de Huevos Gigantes**
   - Rival: _Gallo Trueno_.
   - Obstáculos con huevos rodando y rayos punk.

4. **Arena de Patos Fans**
   - Rival: _Gallo Tierra_.
   - Público activo que lanza confeti y tomates, influyendo en el marcador.

5. **Templo del Maíz Dorado**
   - Rival supremo con todos los poderes elementales.
   - Escenario épico con columnas de espigas doradas y música que mezcla todos los estilos.

## Prompt 9

Continué aceptando las sugerencias.

### Respuesta

#### ⚡ Sistema de progresión de poderes

##### 1. **Inicio – Gallo Básico**

- **Estado inicial:** sin poderes elementales, ataques simples y humor limitado.
- **Objetivo:** derrotar al primer rival para desbloquear el poder elemental.
- **Estilo visual:** plumaje blanco y dorado, animaciones básicas.

---

##### 2. **Poder de Fuego – Gallo Llamas Disco**

- **Origen:** obtenido al vencer al _Gallo de Fuego_ en el Granero Encantado.
- **Habilidades:** llamaradas disco, explosiones de confeti ardiente.
- **Efecto visual:** plumas rojas y naranjas, luces de discoteca.
- **Bonus:** +20 humor, +10 estilo.

---

##### 3. **Poder de Viento – Gallo Globo**

- **Origen:** absorbido del _Gallo de Viento_ en el Volcán de Palomitas.
- **Habilidades:** soplidos que inflan rivales y los lanzan.
- **Efecto visual:** plumas azules y blancas, animaciones de aire y burbujas.
- **Bonus:** +15 humor, +15 estilo.

---

##### 4. **Poder de Trueno – Gallo Punk Eléctrico**

- **Origen:** obtenido del _Gallo Trueno_ en el Bosque de Huevos Gigantes.
- **Habilidades:** rayos eléctricos, guitarras de energía.
- **Efecto visual:** plumas amarillas y púrpuras, relámpagos y riffs musicales.
- **Bonus:** +25 humor, +20 estilo.

---

##### 5. **Poder de Tierra – Gallo Espiga Dorada**

- **Origen:** absorbido del _Gallo Tierra_ en la Arena de Patos Fans.
- **Habilidades:** trampas de espigas, terremotos cómicos.
- **Efecto visual:** plumas verdes y doradas, aura de maíz brillante.
- **Bonus:** +30 humor, +25 estilo.

---

##### 6. **Forma Final – Gallo Arcoíris Supremo**

- **Origen:** tras vencer al _Rival Supremo_ en el Templo del Maíz Dorado.
- **Habilidades:** combinación de todos los elementos, ataques multicolor.
- **Efecto visual:** plumaje arcoíris, confeti infinito, aura dorada.
- **Bonus:** +50 humor, +50 estilo, multiplicador ×2.5.

---

## Prompt 10

> _Nota: respuesta duplicada de Prompt 9. El sistema de progresión de poderes ya fue documentado en el prompt anterior._

## Prompt 11

### Respuesta

#### ⚔️ Tabla de habilidades y transformaciones

| **Transformación**         | **Habilidad principal** | **Efecto cómico**                                        | **Cooldown** | **Animación visual**                                     |
| -------------------------- | ----------------------- | -------------------------------------------------------- | ------------ | -------------------------------------------------------- |
| **Gallo Básico**           | Picotazo de humor       | Daño leve, genera risas del público.                     | 3 s          | Cacareo exagerado y salto torpe.                         |
| **Gallo Llamas Disco**     | Llamarada disco         | Explosión de confeti ardiente, daño medio.               | 5 s          | Luces de discoteca y plumas rojas brillantes.            |
| **Gallo Globo**            | Soplido inflador        | Infla al rival y lo lanza fuera del escenario.           | 6 s          | Burbuja de aire y sonido de globo inflándose.            |
| **Gallo Punk Eléctrico**   | Rayo de guitarra        | Golpe eléctrico con riff musical.                        | 7 s          | Relámpagos y guitarra eléctrica animada.                 |
| **Gallo Espiga Dorada**    | Trampa de espigas       | Invoca espigas explosivas bajo el rival.                 | 8 s          | Espigas doradas emergen del suelo con sonido “pop”.      |
| **Gallo Arcoíris Supremo** | Confeti cósmico         | Combina todos los elementos, daño masivo y humor máximo. | 10 s         | Explosión multicolor con confeti infinito y aura dorada. |

---

#### 🎭 Efectos adicionales

- **Bonus de humor:** cada habilidad aumenta la barra de humor según su nivel.
- **Bonus de estilo:** ataques variados y transformaciones incrementan el multiplicador de estilo.
- **Reacción del público:** risas, aplausos y objetos lanzados según la espectacularidad del ataque.

---

## Prompt 12

### Respuesta

#### 🎯 Sistema de puntuación

##### 1. **Humor**

- Se gana con ataques absurdos, transformaciones cómicas y reacciones del público.
- Ejemplo: un cacareo ridículo suma +5 puntos, una explosión de palomitas suma +15.
- Bonus adicional si el público ríe o aplaude en sincronía.

##### 2. **Estilo**

- Se acumula al variar movimientos y usar transformaciones creativas.
- Repetir ataques reduce el multiplicador de estilo.
- Ejemplo: usar tres habilidades distintas en un combo suma +25 puntos de estilo.

##### 3. **Daño cómico**

- Representa el impacto físico exagerado en el rival.
- Cada ataque resta energía de la barra del oponente.
- Ejemplo: un rayo punk resta -20 energía, una trampa de espigas resta -30.

---

#### ⚖️ Balance del combate

- **Multiplicador de espectáculo:** combina humor + estilo → aumenta el daño cómico.
- **Interacción del público:**
  - Ovaciones → +10 humor extra.
  - Tomates lanzados → -5 estilo si el ataque fue aburrido.
- **Cooldowns:** evitan spam de habilidades y obligan a variar ataques.
- **Progresión:** cada escenario aumenta la dificultad, con rivales más autónomos y poderes más espectaculares.

---

#### 🏆 Condiciones de victoria

- El combate se gana al vaciar la barra de energía del rival **o** al superar un umbral de puntos de humor + estilo (ej. 200 puntos).
- Esto asegura que el jugador no solo golpee, sino que también entretenga al público.

---

## Prompt 13

### Respuesta

Aquí tienes la **tabla de balance numérico** para el sistema de puntuación de _Gallos Mágicos – Torneo del Maíz Dorado_. Esto define valores concretos de humor, estilo y daño cómico, además de los umbrales de victoria:

---

#### 📊 Tabla de balance numérico

| **Categoría**   | **Acción / Evento**          | **Puntos / Efecto** | **Notas de balance**                          |
| --------------- | ---------------------------- | ------------------- | --------------------------------------------- |
| **Humor**       | Cacareo ridículo             | +5                  | Acción básica, fácil de repetir.              |
|                 | Explosión de palomitas       | +15                 | Evento de escenario, alto impacto visual.     |
|                 | Transformación elemental     | +20                 | Bonus por espectáculo.                        |
|                 | Ovación del público          | +10                 | Se activa si el ataque es variado y creativo. |
|                 | Tomatazo del público         | -5                  | Penalización por ataque aburrido o repetido.  |
| **Estilo**      | Combo de 3 ataques distintos | +25                 | Incentiva variedad.                           |
|                 | Repetir el mismo ataque      | -10                 | Evita spam y fomenta creatividad.             |
|                 | Transformación nueva         | +15                 | Refuerza progresión visual.                   |
| **Daño cómico** | Picotazo básico              | -10 energía         | Ataque inicial.                               |
|                 | Rayo punk                    | -20 energía         | Poder intermedio.                             |
|                 | Trampa de espigas            | -30 energía         | Poder avanzado.                               |
|                 | Confeti cósmico              | -50 energía         | Ataque final supremo.                         |

---

#### ⚖️ Umbrales de victoria

- **Victoria por energía:** vaciar la barra del rival (100 puntos de energía).
- **Victoria por espectáculo:** superar **200 puntos combinados de humor + estilo** antes de que el rival caiga.
- **Multiplicador de espectáculo:**
  - Humor + estilo > 100 → daño cómico ×1.5.
  - Humor + estilo > 150 → daño cómico ×2.
  - Humor + estilo > 200 → victoria automática por espectáculo.

---

## Prompt 14

### Respuesta

---

#### 🎭 Elementos del HUD

- **Barra de Humor**
  - Color verde/amarillo con emojis de risa.
  - Se llena con ataques cómicos y ovaciones del público.

- **Barra de Estilo**
  - Color púrpura/rosa con íconos de disco ball y estrellas.
  - Multiplicador que aumenta con combos variados.

- **Barra de Energía**
  - Color rojo con ícono de huevo roto.
  - Se reduce con daño cómico recibido.

- **Cooldowns absurdos**
  - Íconos circulares: disco ball ardiente, globo inflado, guitarra eléctrica, espiga dorada.
  - Temporizadores visuales con textos cómicos (“¡LISTO!”, “2s”, “4s”).

- **Botón especial**
  - “ULTRA CONFETI” con explosión multicolor.
  - Activación épica que combina todos los poderes.

---

## Prompt 15

### Respuesta

#### 🐔 Fichas de personajes

| **Personaje**       | **Personalidad cómica**                                           | **Estilo visual**                              | **Habilidades destacadas**                                       |
| ------------------- | ----------------------------------------------------------------- | ---------------------------------------------- | ---------------------------------------------------------------- |
| **Gallo de Fuego**  | Vanidoso y dramático, cree que cada ataque es una coreografía.    | Plumas rojas y naranjas, gafas de sol disco.   | Llamarada disco, explosión de confeti ardiente, salto flamígero. |
| **Gallo de Viento** | Ligero y distraído, se ríe de todo y flota sin rumbo.             | Plumas azules y blancas, bufanda que ondea.    | Soplido inflador, tornado de risas, vuelo improvisado.           |
| **Gallo Trueno**    | Rebelde y ruidoso, toca guitarra eléctrica antes de atacar.       | Plumas púrpuras y amarillas, mohawk eléctrico. | Rayo de guitarra, solo de trueno, descarga punk.                 |
| **Gallo Tierra**    | Calmado y sabio, habla con las espigas y hace chistes de maíz.    | Plumas verdes y doradas, sombrero de paja.     | Trampa de espigas, terremoto cómico, defensa natural.            |
| **Rival Supremo**   | Misterioso y teatral, mezcla todos los elementos con humor épico. | Plumaje arcoíris, aura dorada, corona de maíz. | Confeti cósmico, ataque multicolor, transformación total.        |

---

#### 🎭 Dinámica entre personajes

- Cada gallo tiene frases absurdas y burlas únicas durante el combate.
- El público reacciona distinto según el gallo (más risas con el de viento, más aplausos con el de fuego).
- Las transformaciones del jugador reflejan la personalidad del rival derrotado.

---

## Prompt 16

### Respuesta

#### 🗺️ Fichas de escenarios del torneo

| **Escenario**                 | **Elementos interactivos**                                                | **Estilo musical**                                      | **Efectos visuales y sonoros**                                    |
| ----------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------- | ----------------------------------------------------------------- |
| **Granero Encantado**         | Cubetas saltarinas, heno que brilla, huevos rodando.                      | Mariachi cómico con trompetas desafinadas.              | Gallinas que aplauden, risas y sonidos de objetos cayendo.        |
| **Volcán de Palomitas**       | Explosiones de palomitas que empujan a los personajes.                    | Salsa tropical con percusión “pop-pop-pop”.             | Efectos de vapor y chasquidos de palomitas.                       |
| **Bosque de Huevos Gigantes** | Huevos rodantes, ramas que se mueven, nidos saltarines.                   | Xilófonos y sonidos de cascarones rompiéndose.          | Eco cómico y risas de aves ocultas.                               |
| **Arena de Patos Fans**       | Público que lanza confeti y tomates, pancartas animadas.                  | Cánticos de estadio con aplausos y risas sincronizadas. | Voces del público, confeti dinámico y efectos de rebote.          |
| **Templo del Maíz Dorado**    | Columnas de espigas doradas, altar que cambia con los poderes absorbidos. | Mezcla épica de todos los estilos anteriores.           | Coros cómicos, luces doradas y explosiones de palomitas sagradas. |

---

#### 🎶 Dinámica musical

- Cada escenario tiene **transiciones musicales** que reaccionan al combate.
- Al activar una transformación, la música cambia de ritmo y añade efectos absurdos.
- El público marca el compás con aplausos y risas, sincronizados con los ataques.

---

## Prompt 17

Luego de la investigación le indiqué al agente que revisara las respuestas de los prompts del 1 al 16, para corregir inconsistencias.

```text
Revisa las respuestas de los prompts del 1 al 16 para corregir inconsistencias del archivo prompts.
```

### Respuesta

Se corrigieron las siguientes inconsistencias en los prompts 1 al 16:

1. **"Gallo Disco Trueno" → "Gallo Llamas Disco"** (Prompts 5, 9, 11): el nombre original combinaba "Trueno" con el elemento fuego, generando confusión con el rival "Gallo Trueno" del escenario 3.
2. **"Gallo Globo de Viento" → "Gallo Globo"** (Prompt 5): nombre incompleto respecto al resto del documento.
3. **"Arena de los Patos Fans" → "Arena de Patos Fans"** (Prompt 5): el artículo "los" solo aparecía en el GDD; todos los demás prompts usan el nombre sin artículo.
4. **Formato de secciones del GDD** (Prompt 5): las secciones 1 y 2 no tenían el marcador `####` que sí tenían las secciones 3 y 4.
5. **"Gallo Fuego"/"Gallo Viento" → "Gallo de Fuego"/"Gallo de Viento"** (Prompt 5): inconsistencia con la ficha de personajes oficial (Prompt 15).
6. **"Gallo de Tierra" → "Gallo Tierra"** (Prompts 8 y 9): el GDD y la ficha de personajes (Prompt 15) usan "Gallo Tierra" sin preposición.
7. **Barra de Energía** (Prompt 5): la descripción decía "se consume al usar habilidades" cuando en realidad es la barra de vida que se reduce al recibir daño (confirmado en Prompts 13 y 14).
8. **Prompt 8 sin texto**: faltaba el prompt enviado; se reconstruyó a partir del contexto del Prompt 7.
9. **Prompt 10 duplicado**: respuesta idéntica al Prompt 9; se reemplazó por una nota de referencia.

## Prompt 18

Luego de la investigación le indiqué al agente el desarrollo del juego siguiendo los prompts generados.

```text
Como experto en desarrollo de juegos desarrollalo utilizando únicamente HTML, CSS y JavaScript.
Usa buenas prácticas y documenta el código.
Despliega la estructura de directorios en el archivo gallos-magicos.
guiate por las respuestas de los prompts del archivo prompts del 1 al 16.
```

### Respuesta

El juego completo fue implementado en el archivo `gallos-magicos/index.html` (1 338 líneas), sin dependencias externas ni servidor. Se puede abrir directamente en el navegador.

#### Estructura del archivo único

```
gallos-magicos/
└── index.html
    ├── <style>   — Layout, panel de habilidades, botones con cooldown, mensaje flotante
    └── <script>  — Toda la lógica del juego
         ├── Constantes & balance numérico (Prompts 12–13)
         ├── Datos del torneo: STAGES[5] + TRANSFORMS[6] (Prompts 5, 8, 9, 15)
         ├── Estado global: STATE {}
         ├── Lógica de combate: useSkill(), enemyAttack(), resolveVictory(), advanceStage()
         ├── Sistema de partículas
         ├── Renderizado Canvas 2D
         │    ├── drawBackground() + drawSceneDecor() — 5 escenarios únicos
         │    ├── drawRooster() — gallo genérico con proporciones cómicas
         │    ├── PLAYER_EXTRAS[6] / ENEMY_EXTRAS[5] — accesorios por transformación
         │    ├── drawHUD() — barras Energía · Humor · Estilo · multiplicador espectáculo
         │    └── Pantallas: título, victoria etapa, derrota, victoria final
         └── Game loop: requestAnimationFrame()
```

#### Mecánicas implementadas (todos los prompts)

- **5 escenarios** con fondos y decoración animada únicos (Granero, Volcán, Bosque, Arena, Templo).
- **6 transformaciones del jugador**: Gallo Básico → Llamas Disco → Globo → Punk Eléctrico → Espiga Dorada → Arcoíris Supremo; cada una hereda habilidades previas y suma una nueva.
- **5 rivales autónomos** que atacan a intervalos decrecientes (3 000 ms → 1 800 ms).
- **Multiplicador de espectáculo**: >100 pts ×1.5 · >150 pts ×2.0 · ≥200 pts victoria automática.
- **Combo x3**: usar 3 habilidades distintas seguidas otorga +25 estilo.
- **Penalización por spam**: repetir el mismo ataque aplica −10 estilo y tomatazo −5 humor.
- **Bonus de transformación**: al absorber cada poder se suman los valores del Prompt 9.
- **HUD completo**: barras de Energía (roja), Humor (verde), Estilo (púrpura), multiplicador central, nombre del escenario y etapa.
- **Panel de habilidades DOM**: botones con cooldown visual (barra + contador de segundos).
- **Controles**: teclas Q W E R T Y + clic en botones.

### Análisis

Generó el código en un solo archivo HTML, programó los gráficos y las animaciones, pero no pasa de nivel a nivel al ganar el jugador.

## Prompt 19

```text
Separa la lógica usando esta estructura de archivos, debe ser modular, claro y profesional
index.html: contiene el canvas, HUD y carga los scripts.

css/style.css: define estilos visuales, animaciones y layout.

js/main.js: inicializa el juego y coordina módulos.

js/hud.js: gestiona barras de humor, estilo y energía.

js/mechanics.js: lógica de combate, puntuación y balance.

js/characters.js: define gallos, poderes y transformaciones.

js/scenes.js: escenarios, música y progresión narrativa.

assets: centraliza imágenes, sonidos y fuentes para fácil mantenimiento.
```

### Respuesta

El código fue refactorizado en la estructura modular pedida y se corrigió el bug de progresión de nivel.

#### Estructura de archivos

```
gallos-magicos/
├── index.html          (66 líneas)  · canvas, carga de scripts en orden correcto
├── css/
│   └── style.css      (132 líneas)  · layout, botones, barra de mensajes
├── js/
│   ├── characters.js  (374 líneas)  · TRANSFORMS, PLAYER_EXTRAS, ENEMY_EXTRAS, drawRooster
│   ├── scenes.js      (237 líneas)  · STAGES, drawBackground, decoración por escenario
│   ├── mechanics.js   (225 líneas)  · BALANCE, useSkill, enemyAttack, resolveVictory
│   ├── hud.js         (316 líneas)  · drawHUD, drawBar, buildSkillButtons, pantallas
│   └── main.js        (331 líneas)  · STATE, gameLoop, partículas, inputs
└── assets/
    └── README.md                    · guía para añadir imágenes, audio y fuentes
```

#### Bug corregido: no avanzaba de nivel

**Causa raíz:** `drawStageWinScreen()` calculaba `STAGES[STATE.stage - 1]` para mostrar el rival vencido. Al ganar la primera etapa, `STATE.stage` valía `0`, devolviendo `STAGES[-1]` = `undefined` y lanzando un `TypeError` que detenía el game loop.

**Solución aplicada:**

- `resolveVictory()` (mechanics.js) guarda `STATE.defeatedStage = STATE.stage` **antes** de cambiar la pantalla.
- `drawStageWinScreen()` (hud.js) usa `STAGES[STATE.defeatedStage]` en lugar de `STAGES[STATE.stage - 1]`.

#### Orden de carga de scripts

Los módulos comparten el ámbito global del navegador (sin ES Modules) para permitir apertura directa con `file://`. El orden en `index.html` garantiza que cada módulo encuentre sus dependencias ya definidas:

```
characters.js → scenes.js → mechanics.js → hud.js → main.js
```

## Prompt 20

```text
crea un readme con la documentacion del juego
```

### Respuesta

README creado en README.md. Cubre todo lo necesario para entender y usar el proyecto:

Cómo abrir el juego (directo con file://, sin servidor)
Controles completos con la tecla de cada habilidad y desde qué etapa se desbloquea
Mecánicas — las tres barras, el multiplicador de espectáculo, el sistema de combo y el público
Condiciones de victoria (energía o espectáculo ≥ 200)
Tabla de progresión con los 5 escenarios, rivales, transformaciones y bonus
Tabla de habilidades con daño, humor, estilo y cooldown
Estructura de archivos con las responsabilidades de cada módulo y el orden de carga
Tecnologías usadas y referencia al prompts.md como diario de diseño

## Prompt 21

```text
## 📝 Prompt para efectos de ataque

> **Instrucción principal:**
> Cuando el jugador oponente realiza un ataque, debe generarse un **efecto visual dinámico** que se origine en el atacante y viaje hacia el objetivo.

> **Objetivo del efecto:**
> - Representar de forma cómica y mágica el poder elemental del gallo atacante.
> - Reforzar la identidad visual de cada transformación (fuego, viento, trueno, tierra, supremo).
> - Aumentar la espectacularidad del combate y la reacción del público.

> **Criterios específicos:**
> 1. **Dirección**: El efecto debe salir desde la posición del atacante y desplazarse hacia el rival.
> 2. **Estilo visual**: Colores vivos, partículas cómicas (confeti, plumas, rayos caricaturescos).
> 3. **Sincronización**: El efecto debe activarse exactamente al ejecutar la animación de ataque.
> 4. **Variedad elemental**:
>    - Fuego → llamarada disco con confeti ardiente.
>    - Viento → ráfaga que infla globos y los lanza.
>    - Trueno → rayo eléctrico acompañado de riff musical.
>    - Tierra → espigas doradas que emergen del suelo.
>    - Supremo → explosión arcoíris de confeti cósmico.
> 5. **Impacto cómico**: Al llegar al rival, el efecto debe producir una reacción exagerada (sacudida, risas, rebote).

> **Formato de salida esperado:**
> - Animación o descripción visual clara del efecto.
> - Parámetros de color, velocidad y partículas.
> - Indicación de cómo se sincroniza con la animación del gallo atacante.
```

### Respuesta

```text
Se implementó un **sistema de proyectiles viajeros** en `js/main.js` y se actualizó `js/mechanics.js`.

#### Archivos modificados

| Archivo           | Cambio                                                                                             |
| ----------------- | -------------------------------------------------------------------------------------------------- |
| `js/main.js`      | `STATE.projectiles[]`, `PROJ_CFG`, `spawnProjectile()`, `updateProjectiles()`, `drawProjectiles()` |
| `js/mechanics.js` | `useSkill()` y `enemyAttack()` llaman a `spawnProjectile` en lugar de `spawnParticles`             |

#### Cómo funciona

1. **Disparo**: Al atacar, `spawnProjectile(emoji, fromX, fromY, toX, toY)` crea un proyectil y lanza 5 partículas de puff en el origen.
2. **Viaje**: El proyectil se desplaza de atacante (x=180) a objetivo (x=580) o viceversa en ~320–400 ms. Cada frame acumula puntos de estela.
3. **Impacto**: Al llegar, detona un burst de 20 partículas en el objetivo y se destruye.

#### Variedad elemental (PROJ_CFG)

| Emoji | Elemento       | Color principal     | Efecto especial               |
| ----- | -------------- | ------------------- | ----------------------------- |
| 🐔    | Básico         | Crema/dorado        | Orbe pequeño                  |
| 🔥    | Fuego          | Naranja/rojo/dorado | Orbe grande con glow          |
| 💨    | Viento         | Azul cielo/blanco   | Orbe translúcido              |
| ⚡    | Trueno         | Amarillo/blanco     | Orbe + zigzag eléctrico       |
| 🌽    | Tierra         | Verde/dorado        | Orbe con estela terrosa       |
| 🎉    | Supremo        | Multicolor          | Orbe más grande, estela larga |
| 💥    | Ataque enemigo | Rojo                | Orbe rojo amenazante          |

#### Sincronización con la animación

`spawnProjectile` se llama al mismo tiempo que `STATE.playerAnim = 'attack'` / `STATE.enemyAnim = 'attack'`, por lo que el orbe sale exactamente cuando el gallo inicia su pose de ataque.
```

### Análisis

Se cumplio con lo establecido en el prompt de manera correcta.

## Prompt 22

```text
## 🎁 Prompt para premios en el escenario

> **Instrucción principal:**
> Durante el combate, deben aparecer **premios cómicos y mágicos** que caen desde la parte superior del escenario hacia el suelo. El jugador puede seleccionarlos con el ratón para obtener efectos de sanación.

> **Características de los premios:**
> 1. **Aparición aleatoria:** los premios caen en intervalos irregulares, aumentando la sorpresa.
> 2. **Interacción con el ratón:** el jugador debe hacer clic sobre el premio antes de que desaparezca para activarlo.
> 3. **Permanencia limitada:** cada premio permanece en pantalla entre 5 y 10 segundos antes de desvanecerse.
> 4. **Niveles de cura:**
>    - Maíz pequeño → +10 energía.
>    - Palomitas mágicas → +20 energía.
>    - Huevo dorado → +40 energía.
>    - Confeti arcoíris → +100 energía y +20 humor extra.
> 5. **Estilo cómico:** los premios deben tener colores brillantes, animaciones absurdas (rebote, giro, destellos) y sonidos divertidos al ser recogidos.
> 6. **Impacto visual:** al hacer clic, el premio explota en partículas cómicas (confeti, plumas, rayos caricaturescos) y se refleja en la barra de energía del HUD.

> **Formato esperado:**
> - Animación de caída con trayectoria parabólica.
> - Temporizador de desaparición.
> - Evento de clic que activa la cura y el efecto visual.
> - Variación de diseño según el tipo de premio.

```

### Respuesta

Se implementó el **sistema de premios cómicos** en `js/main.js`. No se modificó ningún otro módulo.

#### Archivo modificado: `js/main.js`

Nuevas adiciones:

- `PRIZE_TYPES[4]` — tabla de tipos con emoji, nombre, curación, bonus humor y radio visual.
- `spawnPrize()` — instancia un premio en X aleatoria (80–720 px) con distribución ponderada.
- `updatePrizes(dt)` — gravedad (0.18 px/frame²), rebote en y=345, expiración por tiempo.
- `drawPrizes()` — círculo de fondo con glow pulsante + emoji + etiqueta; fade out en el último 30 % de vida.
- `_checkPrizeClick(cx, cy)` — colisión euclidiana (radio + 8 px); aplica curación y burst de 18 partículas.
- `canvas.addEventListener('click')` modificado para capturar coordenadas relativas al canvas y llamar `_checkPrizeClick` durante la batalla.

#### Tipos de premio y efecto

| Emoji | Nombre             | Curación | Bonus humor | Frecuencia |
| ----- | ------------------ | -------- | ----------- | ---------- |
| 🌽    | Maíz pequeño       | +10      | —           | 50 %       |
| 🍿    | Palomitas mágicas  | +20      | —           | 30 %       |
| 🥚    | Huevo Dorado       | +40      | —           | 15 %       |
| 🎉    | ¡Confeti Arcoíris! | +100     | +20 Humor   | 5 %        |

#### Ciclo de vida de un premio

1. Primer premio aparece entre 3–5 s después de iniciar el combate.
2. Cae con gravedad desde `y = −r` hasta `y = 345`.
3. Rebota una vez (coeficiente 0.4) y se asienta.
4. Se desvanece durante el último 30 % de su vida si no es recogido.
5. Al hacer clic: curación instantánea + burst de 18 partículas + mensaje en `#msg-bar`.

### Análisis

El sistema cumple todos los criterios del prompt: aparición aleatoria, interacción con ratón, permanencia limitada, cuatro niveles de curación, estilo cómico y efecto visual al recoger.

## Prompt 23

```text
Los niveles superiores deben ser un poco más difíciles.
```

### Respuesta

Se rebalancearon tres parámetros en dos archivos para que la curva de dificultad sea cuadrática en lugar de lineal.

#### Archivos modificados

| Archivo           | Cambio                                                             |
| ----------------- | ------------------------------------------------------------------ |
| `js/scenes.js`    | CDs de los enemigos de las etapas 3, 4 y 5                         |
| `js/mechanics.js` | Fórmula de daño del enemigo — tablas `DMG_BASE` y `DMG_RANGE`      |
| `js/main.js`      | Varianza del timer de ataque reducida proporcionalmente a la etapa |

#### Tabla de dificultad antes/después

| Etapa     | CD antes | CD nuevo     | Daño antes | Daño nuevo |
| --------- | -------- | ------------ | ---------- | ---------- |
| 1 Granero | 3 000 ms | 3 000 ms     | 8–15       | 8–15       |
| 2 Volcán  | 2 700 ms | 2 700 ms     | 12–19      | 12–20      |
| 3 Bosque  | 2 400 ms | **2 200 ms** | 16–23      | **18–28**  |
| 4 Arena   | 2 100 ms | **1 700 ms** | 20–27      | **28–41**  |
| 5 Templo  | 1 800 ms | **1 300 ms** | 24–31      | **36–50**  |

#### Cambios adicionales (dt-based physics)

Las funciones `updateParticles(dt)` y `updateMessages(dt)` recibían `dt` como parámetro pero usaban incrementos fijos por frame. Se corrigieron para escalar sus valores por `dt/16`, haciendo la física independiente de la tasa de fotogramas — comportamiento consistente con el resto del sistema de partículas.

### Análisis

Los niveles 3, 4 y 5 ahora presentan un desafío notablemente mayor. La varianza reducida en el timer hace que los ataques en niveles altos sean más constantes y predecibles, añadiendo tensión. El sistema de premios (Prompt 22) compensa parcialmente el mayor daño recibido.

## Prompt 24

```text
## 🧠 Prompt para secciones de entrenamiento post-derrota

> **Instrucción principal:**
> Cuando el jugador pierde un combate, debe activarse una **sección de entrenamiento cómico** donde el gallo protagonista practica sus habilidades mágicas y humorísticas para mejorar antes del siguiente intento.

> **Objetivo del entrenamiento:**
> - Reforzar la progresión del jugador sin romper la narrativa del torneo.
> - Mantener el tono humorístico y visual del juego.
> - Introducir mecánicas de práctica que ayuden a dominar ataques, defensa y estilo.

> **Criterios específicos:**
> 1. **Escenario de entrenamiento**:
>    - Ambientado en un corral mágico con objetos absurdos (espigas flotantes, sacos de maíz parlantes).
>    - Música cómica de fondo con ritmo de práctica.
> 2. **Actividades**:
>    - Golpear objetivos de confeti para mejorar precisión.
>    - Evadir tomates voladores para practicar reflejos.
>    - Imitar movimientos del gallo maestro para ganar puntos de estilo.
> 3. **Progresión**:
>    - Cada sesión otorga bonificaciones temporales (más humor, menos cooldown).
>    - Si el jugador completa el entrenamiento sin fallar, obtiene un premio cómico (maíz dorado o pluma legendaria).
> 4. **Narrativa cómica**:
>    - El gallo maestro da consejos absurdos (“¡Golpea con ritmo de salsa, no de tristeza!”).
>    - El público fantasma aplaude los aciertos y se ríe de los errores.
> 5. **Duración y retorno**:
>    - Duración breve (30–60 segundos).
>    - Al finalizar, el jugador regresa automáticamente al torneo con energía restaurada y mejoras activas.

> **Formato esperado:**
> - Mini-escena jugable con objetivos interactivos.
> - Indicadores visuales de progreso y humor.
> - Transición fluida de “derrota” → “entrenamiento” → “nuevo intento”.

```

### Respuesta

Se implementó la **pantalla de entrenamiento post-derrota** distribuida en dos archivos.

#### Archivos modificados

| Archivo      | Cambio                                                                                                                                                       |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `js/main.js` | `STATE.trainingBonus`, `TRAINING_TIPS`, `_TR`, `startTraining()`, `_updateTraining(dt)`, `drawTrainingScreen()`, `finishTraining()`, `_checkTrainingClick()` |
| `js/hud.js`  | `drawDefeatScreen()` actualizado con instrucción de entrenar/salir                                                                                           |

#### Flujo completo

```
Derrota → drawDefeatScreen()
         ↓ click / tecla (≠ ESC)
     startTraining()  →  STATE.screen = 'training'
         ↓  30 segundos de juego
     finishTraining() →  STATE.trainingBonus = { humor, style }
                      →  initBattle()  aplica el bonus y reinicia la etapa
```

#### Pantalla de entrenamiento

- **Fondo**: degradado oscuro con estrellas parpadeantes.
- **Gallo Maestro** (izquierda): usa `drawRooster()` existente.
- **Bocadillo de tips**: 5 frases cómicas del maestro que rotan cada 4 s.
- **Objetivos** (círculos 🎯 rosas): aparecen cada 0.65–1.15 s, desaparecen en 2.5–3.5 s.
- **Barra de tiempo** (pie del canvas): cambia de verde → amarillo → rojo.
- **Marcador + preview de bonus**: muestra en tiempo real qué bonus se ganará.

#### Bonificaciones según aciertos

| Aciertos | Bonus Humor | Bonus Estilo | Calificación |
| -------- | ----------- | ------------ | ------------ |
| 0–3      | +10         | +5           | ★            |
| 4–6      | +20         | +10          | ★★           |
| 7+       | +30         | +20          | ★★★          |

#### Controles añadidos

| Pantalla | Acción        | Resultado          |
| -------- | ------------- | ------------------ |
| Derrota  | Click / Tecla | Ir a entrenamiento |
| Derrota  | ESC           | Volver al título   |
| Training | Click canvas  | Golpear objetivo   |

### Análisis

La implementación cumple todos los criterios del prompt: escenario cómico, actividades interactivas (clic en objetivos), progresión con bonuses, frases del maestro, duración de 30 s y transición fluida derrota → entrenamiento → batalla.

## Prompt 25

```text

## Prompt para sonidos del juego

> **Instrucción principal:**
> El juego debe contar con un sistema de **sonidos cómicos y mágicos** que acompañen cada acción, reforzando el humor y la espectacularidad de los combates, guardalos en el archivo assets/sounds/.

> **Categorías de sonidos:**
> 1. **Ataques**
>    - Cacareos exagerados al golpear.
>    - Explosiones de confeti o palomitas con “pop-pop-pop”.
>    - Riff de guitarra eléctrica para ataques de trueno.
> 2. **Transformaciones**
>    - Efecto disco con eco cómico.
>    - Viento que infla globos con silbidos.
>    - Coros absurdos al activar poderes supremos.
> 3. **Interacción del público**
>    - Aplausos sincronizados con combos.
>    - Risas y abucheos cuando falla un ataque.
>    - Voces caricaturescas con frases absurdas (“¡Ese gallo está más inflado que un globo de feria!”).
> 4. **Premios y objetos**
>    - Tintineo mágico al caer un huevo dorado.
>    - Chasquido cómico al recoger maíz o palomitas.
>    - Explosión arcoíris de confeti al activar un premio supremo.
> 5. **HUD y feedback**
>    - Sonido de burbuja al llenar la barra de humor.
>    - Campanazo cómico al activar “ULTRA CONFETI”.
>    - Efecto de rebote al perder energía.

> **Formato esperado:**
> - Biblioteca organizada por categorías (ataques, transformaciones, público, premios, HUD).
> - Sonidos cortos, claros y con estilo caricaturesco.
> - Sincronización precisa con animaciones y efectos visuales.

```

### Respuesta

Se implementó un sistema de sonido **completamente procedural** usando **Web Audio API** sin archivos externos.

**Archivo nuevo:** `js/sounds.js`  
IIFE que expone el objeto global `SFX`. Internamente usa tres helpers de síntesis:

- `_tone(freq, type, vol, dur, end?)` — oscilador con envolvente de amplitud y glide de frecuencia opcional.
- `_noise(vol, dur, filterHz)` — burst de ruido blanco filtrado con bandpass.
- `_seq(freqs, type, vol, dur, gap)` — secuencia de tonos escalonados para acordes y fanfarrias.

**Métodos implementados (22 en total):**

| Categoría        | Métodos                                                                                                    |
| ---------------- | ---------------------------------------------------------------------------------------------------------- |
| Ataques          | `attack_picotazo`, `attack_llamarada`, `attack_soplido`, `attack_rayo`, `attack_espigas`, `attack_confeti` |
| Impacto/Público  | `impact`, `ovacion`, `tomatazo`, `combo`                                                                   |
| Premios          | `prize_maiz`, `prize_palomitas`, `prize_huevo`, `prize_confeti`                                            |
| Entrenamiento    | `training_hit`, `training_done`                                                                            |
| Transformaciones | `new_transform`                                                                                            |
| Pantallas        | `victory`, `stage_win`, `defeat`                                                                           |

**Integraciones realizadas:**

- `index.html` — añadido `<script src="js/sounds.js"></script>` entre `scenes.js` y `mechanics.js`.
- `mechanics.js` — `SFX.init()` en `startGame()`; lookup `_SKILL_SFX` para disparar el sonido correcto por emoji de habilidad; `SFX.tomatazo()` / `SFX.ovacion()` según variedad de ataque; `SFX.combo()` al detectar combo x3; `SFX.impact()` en `enemyAttack()`; `SFX.stage_win()` / `SFX.victory()` en `resolveVictory()`; `SFX.new_transform()` en `advanceStage()`.
- `main.js` — `SFX.init()` en `startTraining()`; lookup `_PRIZE_SFX` para sonido al recoger cada tipo de premio; `SFX.training_hit()` al acertar objetivo; `SFX.training_done()` al finalizar sesión.
- `assets/sounds/README.md` — documentación de todos los métodos, helpers internos y guía para añadir nuevos efectos.

**Compatibilidad:** funciona con `file://` en cualquier navegador moderno. El AudioContext se crea de forma diferida en la primera interacción del usuario (política de autoplay de navegadores).

## Prompt 26

```text
> **Tarea:** Rehacer el dibujo base del gallo (`drawRooster` en `characters.js`) para que se parezca a la imagen de referencia proporcionada: cuerpo rechoncho con pecho cremoso, cola en abanico de plumas individuales, ojos grandes y expresivos, pico abierto y sonriente, cresta de tres lóbulos prominentes, dos barbillas redondeadas y patas cortas con garras en cada dedo.
```

### Respuesta

Se rediseñó completamente la función `drawRooster` en `js/characters.js` manteniendo la misma firma y el sistema de colores `c1`/`c2` parametrizado.

**Cambios visuales respecto a la versión anterior:**

| Parte     | Antes                             | Ahora                                                                                  |
| --------- | --------------------------------- | -------------------------------------------------------------------------------------- |
| Cola      | 5 curvas bezier con `c1`/`c2`     | 6 plumas elípticas rotadas en abanico (de abajo-izq a arriba) con nervio central       |
| Cuerpo    | Elipse simple con borde `c2`      | Elipse con borde negro semitransparente + gradiente radial cremoso en el pecho         |
| Ala       | Sin detalle                       | Dos arcos de plumas sobre el cuerpo                                                    |
| Cabeza    | Círculo r=18 en (12,-25)          | Círculo r=21 en (13,-28) con borde oscuro más visible                                  |
| Cresta    | 3 círculos pequeños r=5 sin base  | 3 lóbulos (r=6.5/8.5/6.5) con base rectangular rellena                                 |
| Barbillas | Una sola barbilla r=5             | Dos barbillas redondeadas (r=6 y r=5) superpuestas                                     |
| Pico      | Triángulo cerrado, color uniforme | Dos triángulos (mandíbula sup. amarilla clara + inf. ámbar), aspecto abierto/sonriente |
| Ojo       | Sclera r=6, pupila r=3            | Sclera r=9, pupila r=5, doble brillo                                                   |
| Patas     | Líneas delgadas, 2 dedos por pie  | Piernas gruesas (lw=5), 3 dedos adelante + 1 dedo trasero por pie                      |

El diseño sigue siendo completamente compatible con todos los `PLAYER_EXTRAS` y `ENEMY_EXTRAS` existentes, ya que los accesorios se dibujan en el mismo espacio de coordenadas locales.


## Prompt 27

```text
> **Tarea:** Rediseñar los fondos de los 5 escenarios en `scenes.js` para que coincidan con la imagen de referencia adjunta. Cada escenario tiene un título visible en la imagen.
```

### Respuesta

Se reescribió completamente `js/scenes.js`. Los cambios afectan a `drawBackground` y a cada función `_draw*`.

**`drawBackground`** — pasa de un degradado de 2 paradas a gradientes de 4-5 paradas específicos por escenario, cubriendo todo el canvas (0-490 px).

**Escenarios rediseñados:**

| Escenario                     | Elementos añadidos                                                                                                                                                                                                                                 |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Granero Encantado**         | Pared de tablas con juntas, vigas diagonales, 3 linternas parpadeantes con halo radial, 4 balas de heno con textura, 2 barriles de madera con aros metálicos, 2 huevos con gradiente, partículas de heno flotantes, resplandor dorado en el suelo  |
| **Volcán de Palomitas**       | Nubes de humo laterales, silueta del volcán con textura, 2 flujos de lava curvados, cráter oscuro, resplandor del cráter, nube de erupción de 5 capas pulsante, 14 palomitas animadas en ascenso, charco de lava en el suelo                       |
| **Bosque de Huevos Gigantes** | 4 nubes esponjosas animadas, 4 árboles con 3 elipses de copa superpuestas, nidos de paja bajo los huevos, 3 huevos gigantes con gradiente radial y manchas, luz dorada central en el suelo                                                         |
| **Arena de Patos Fans**       | Muro de estadio en arco, 4 filas de gradas con 5 arcos decorativos, multitud de patos fans animados (3 filas × ~12 figuras), 6 linternas colgantes con flecos y parpadeo, 26 piezas de confeti animadas, suelo rojo con degradado                  |
| **Templo del Maíz Dorado**    | Arco de techo oscuro, suelo de piedra con juntas, resplandor central radial, 6 pilares con fuste degradado + mazorca superior + hojas verdes, altar de 3 escalones con borde dorado, 3 mazorcas del ídolo central con aura y 6 destellos orbitales |

Se añadió la función auxiliar `_drawCornCob(cx, cy, rw, rh)` reutilizada en pilares e ídolo.

---

## Prompt 28

```txt
> **Problema:** Al usar las teclas QWERTY, los valores de Humor (verde) y Estilo (morado) suben demasiado rápido. Las habilidades de las etapas superiores acumulaban 50+ pts por ataque, haciendo que los niveles altos fueran más fáciles en lugar de más difíciles (el multiplicador ×2.0 se alcanzaba en 3-4 ataques).
```

### Respuesta

Se redujo entre el 40 % y el 55 % el valor de humor y estilo de todas las habilidades, y se redujeron también los bonuses de BALANCE que se suman por encima del valor base.

**`js/characters.js`** — valores de todas las habilidades actualizados en los 6 transforms:

| Habilidad        | humor antes→ahora | style antes→ahora |
| ---------------- | ----------------- | ----------------- |
| Picotazo         | 5 → 3             | 5 → 3             |
| Llamarada Disco  | 15 → 7            | 10 → 5            |
| Soplido Inflador | 15 → 7            | 15 → 8            |
| Rayo Guitarra    | 20 → 10           | 20 → 10           |
| Trampa Espigas   | 25 → 12           | 25 → 12           |
| ULTRA CONFETI!   | 30 → 15           | 30 → 15           |

**`js/mechanics.js`** — constantes de BALANCE:

| Constante    | Antes | Ahora | Efecto                   |
| ------------ | ----- | ----- | ------------------------ |
| humorOvacion | 10    | 6     | Bonus por ataque variado |
| styleCombo3  | 25    | 12    | Bonus por combo x3       |

**Resultado por etapa (peor caso: jugador variando siempre):**

- Etapa 1 (solo Picotazo + Llamarada): ~14 pts/ataque → ~14 ataques para 200 pts
- Etapa 5 (todas las habilidades, Confeti): ~36 pts/ataque → ~6 ataques para 200 pts, pero el enemigo ataca cada 1.3 s causando 36-50 de daño, lo que requiere gestionar la salud activamente

---

## Prompt 29 — Cuervo ladrón en etapas 3 y 4

```txt
**Petición:** En los niveles superiores agrega una ave diferente que se robe los premios si no son seleccionados rápidamente. Actualiza el prompts y readme.
```

### Respuesta

Se implementó el **sistema de ave ladrona** en `js/main.js`:

#### Mecánica

- Un cuervo oscuro entra desde el borde de la pantalla (izquierda o derecha aleatoriamente) y apunta al premio con más tiempo en pantalla.
- Si el jugador no recoge el premio antes de que el cuervo llegue, éste lo roba y huye llevándolo en las garras.
- Un indicador **⚠️** parpadea sobre el premio amenazado mientras el cuervo se aproxima.
- Al robar: `SFX.tomatazo()` + mensaje `🐦 ¡El cuervo robó [emoji]!` en rojo.

#### Parámetros por etapa

| Etapa | Escenario              | Velocidad | Cadencia de aparición |
| ----- | ---------------------- | --------- | --------------------- |
| 3     | Arena de Patos Fans    | 3.5 px/fr | cada 10–18 s          |
| 4     | Templo del Maíz Dorado | 5.0 px/fr | cada 6–11 s           |

#### Implementación técnica

- **STATE**: añadidos `thiefBirds: []` y `thiefBirdTimer: 0`.
- **`_THIEF_CFG`**: array con `null` para etapas 0-2 y `{ speed, timerMin, timerMax }` para 3 y 4.
- **`spawnThiefBird()`**: crea el cuervo con referencia directa al objeto premio (no índice, evita problemas al hacer splice).
- **`updateThiefBirds(dt)`**: máquina de estados `approach → flee`. Re-apunta si el jugador recoge el premio antes del robo; si no quedan premios, huye inmediatamente.
- **`drawThiefBirds()`**: dibuja el cuervo con cuerpo oscuro (aura morada), ojos naranjas con destello, pico ganchudo marrón, cola en abanico, dos alas que baten con `Math.sin(age * 0.022)`. El emoji robado se dibuja sin flip horizontal para que sea siempre legible.
- **`initBattle()`**: reinicia `thiefBirds` y calcula `thiefBirdTimer` según la etapa.
- **`_updateBattle(dt)`**: llama `updateThiefBirds(dt)` solo si `STATE.stage >= 3`.
- **`_renderBattle()`**: `drawThiefBirds()` se dibuja entre premios y proyectiles.
- **README.md**: añadida subsección "Cuervo ladrón" bajo "Premios cómicos" y entrada en la tabla de prompts.

## Prompt 30

```txt
Revisa que el juego esté funcionando correctamente: sale una pantalla de derrota y
luego de campeón, y las aves que se roban los premios no salen. Además agrega el
manual del jugador con la temática del juego y demás cuestiones.
```

### Respuesta

Se corrigieron dos bugs y se añadió el manual del jugador integrado en la página.

---

#### Bug 1 — Pantalla de derrota seguida de pantalla de campeón

**Causa raíz:** condición de carrera entre dos `setTimeout` programados casi simultáneamente:

- `enemyAttack()` programa `setTimeout(() => STATE.screen = "defeat", 600)` cuando la energía del jugador llega a 0.
- `useSkill()` programa `setTimeout(resolveVictory, 600)` cuando la energía del rival llega a 0 o se alcanza la victoria por espectáculo.

Si ambas condiciones se cumplen con poca diferencia temporal (por ejemplo, el jugador mata al rival pero el rival también mató al jugador en el mismo intervalo de 600 ms), los dos callbacks se ejecutan en secuencia: el primero muestra "derrota" y el segundo sobrescribe con "campeón" (o viceversa).

**Solución aplicada en `js/mechanics.js`:**

Los tres `setTimeout` que cambian la pantalla ahora verifican `STATE.screen === 'battle'` antes de ejecutarse. Si el primer callback ya cambió la pantalla, el segundo no hace nada.

| Función         | Cambio                                                                                                            |
| --------------- | ----------------------------------------------------------------------------------------------------------------- |
| `useSkill()`    | `setTimeout(resolveVictory, 600)` → `setTimeout(() => { if (STATE.screen === 'battle') resolveVictory(); }, 600)` |
| `useSkill()`    | Victoria por espectáculo: mismo guard añadido                                                                     |
| `enemyAttack()` | `setTimeout(() => { STATE.screen = "defeat"; }, 600)` → guard `if (STATE.screen === 'battle')` añadido            |

---

#### Bug 2 — Cuervos ladrones no aparecen

**Causa raíz:** los temporizadores iniciales eran demasiado largos (10–18 s en etapa 4 y 6–11 s en etapa 5). Si el combate terminaba antes de que el temporizador expirara —lo cual era habitual, especialmente con el bug anterior— el jugador nunca veía a los cuervos.

**Solución aplicada en `js/main.js`:**

Reducción de los valores en `_THIEF_CFG`:

| Etapa | Escenario              | timerMin antes | timerMin ahora | timerMax antes | timerMax ahora |
| ----- | ---------------------- | -------------- | -------------- | -------------- | -------------- |
| 3     | Arena de Patos Fans    | 10 000 ms      | **5 000 ms**   | 18 000 ms      | **9 000 ms**   |
| 4     | Templo del Maíz Dorado | 6 000 ms       | **3 000 ms**   | 11 000 ms      | **6 000 ms**   |

El primer cuervo ahora aparece entre 5 y 9 segundos en la etapa 4, y entre 3 y 6 segundos en la etapa 5. Como `initBattle()` inicializa `thiefBirdTimer` con estos mismos valores, el ajuste es efectivo desde el primer fotograma de cada batalla.

---

#### Manual del jugador

Se añadió un manual interactivo accesible desde un botón **"📖 Manual del Jugador"** situado debajo del canvas. Se despliega con animación CSS y contiene 9 secciones temáticas con la estética dorada/púrpura del juego:

**Archivos modificados:**

| Archivo         | Cambio                                                                                                                                                                      |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `index.html`    | Botón toggle + estructura HTML completa del manual (secciones, tablas, tarjetas)                                                                                            |
| `css/style.css` | ~200 líneas de estilos para el manual; `body` cambiado de `overflow: hidden` a `overflow-x: hidden; overflow-y: auto` para permitir scroll cuando el manual está desplegado |

**Secciones del manual:**

| Sección                       | Contenido                                                                 |
| ----------------------------- | ------------------------------------------------------------------------- |
| 🐔 La Leyenda del Torneo      | Historia y objetivo narrativo del juego                                   |
| 🎮 Controles                  | Tabla de teclas Q–Y con teclas estilizadas + controles de ratón           |
| ⚔️ Sistema de Combate         | Energía, cooldowns y comportamiento del rival autónomo                    |
| 🌟 Sistema de Espectáculo     | Multiplicadores ×1.5 / ×2.0 / victoria automática, bonus y penalizaciones |
| ✨ Transformaciones           | Las 6 formas del jugador con habilidades y colores de acento              |
| 🗺️ Escenarios y Rivales       | Los 5 escenarios con rival, estrategia y nivel de peligro por etapa       |
| 🎁 Premios del Público        | Los 4 tipos de premio con porcentaje de aparición y curación              |
| 🐦 Cuervos Ladrones           | Mecánica de robo, indicador ⚠️ y estrategia para evitarlos                |
| 🥊 Entrenamiento Mágico       | Tabla de bonuses según aciertos (★ / ★★ / ★★★)                            |
| 💡 Consejos del Gallo Maestro | 7 tips estratégicos para dominar el torneo                                |

### Análisis

Los dos bugs quedaron resueltos: ya no aparecen pantallas en secuencia incorrecta y los cuervos ladrones son visibles con regularidad en las etapas 4 y 5. El manual del jugador documenta todas las mecánicas del juego con la estética temática del torneo y es accesible sin abandonar la pantalla de juego.

## Análisis General

En general el juego funciona. Quedaría ajustar algunas métricas para hacerlo más complejo y agregar más niveles.
