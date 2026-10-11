/**
 * DISSONANT GAMBIT (ROGE_CHEST) - OFFICIAL LANDING PAGE LOGIC
 * High-performance vanilla JS engine for particles, soundboard, 
 * interactive tactical chessboard simulator & bestiary lore codex.
 */

// --- 1. SOULS CODEX DATA (Extracted directly from BESTIARIO_DE_ALMAS.md & MANUAL) ---
const SOULS_DATA = [
  {
    id: 'ancient_dragon',
    name: 'Dragón Ancestral',
    humanName: 'Pyroth el Devorador de Éter',
    year: 'Era Primordial',
    rarity: 'legendary',
    role: 'Especialista',
    classIcon: '🔮',
    portrait: 'assets/portraits/ancient_dragon.webp',
    sprite: 'assets/pieces/ancient_dragon_golden_white.webp',
    voice: 'assets/audio/ancient_dragon.mp3',
    t3Skill: 'Aliento Dracónico',
    t3Desc: 'Incinera 3 casillas consecutivas con fuego eterno que destruye cualquier tropa que intente cruzarlas.',
    lore: 'Una entidad cósmica primordial atrapada en la grieta de basalto. No obedece a reyes ni dioses; solo a la promesa de reducir a cenizas la simetría del tablero.'
  },
  {
    id: 'valkyrie',
    name: 'Valquiria Celestial',
    humanName: 'Hildr de las Nubes Frías',
    year: '982 d.C.',
    rarity: 'epic',
    role: 'Asalto',
    classIcon: '⚡',
    portrait: 'assets/portraits/valkyrie.webp',
    sprite: 'assets/pieces/valkyrie_golden_white.webp',
    voice: 'assets/audio/valkyrie.mp3',
    t3Skill: 'Vuelo de Valquiria',
    t3Desc: 'Salto de asalto devastador de hasta 5 casillas en cualquier dirección, ignorando piezas intermedias.',
    lore: 'Doncella alada de armadura de plata bendecida. Fue arrancada de los cielos nórdicos mientras recogía el alma de un guerrero caído sobre un tablero helado.'
  },
  {
    id: 'titan',
    name: 'Titán de Hierro',
    humanName: 'General Máximo Valerio',
    year: '238 d.C.',
    rarity: 'epic',
    role: 'Vanguardia',
    classIcon: '🛡️',
    portrait: 'assets/portraits/sentinel.webp',
    sprite: 'assets/pieces/rook_golden_white.webp',
    voice: 'assets/audio/iron_titan.mp3',
    t3Skill: 'Avalancha de Hierro',
    t3Desc: 'Cuenta con 2 Vidas (Armadura pesada) y proyecta un Aura de Gravedad Pesada que anula por completo los saltos enemigos en 2 casillas.',
    lore: 'Legionario romano que defendió una calzada con su búnker de escudos hasta el último aliento. El Vacío fusionó su carne con el plomo y el hierro negro.'
  },
  {
    id: 'necromancer',
    name: 'Nigromante de la Cripta',
    humanName: 'Malik Al-Mawt',
    year: '1348 d.C.',
    rarity: 'rare',
    role: 'Especialista',
    classIcon: '🔮',
    portrait: 'assets/portraits/necromancer.webp',
    sprite: 'assets/pieces/necromancer_golden_white.webp',
    voice: 'assets/audio/necromancer.mp3',
    t3Skill: 'Resurrección de Espectros',
    t3Desc: 'Al capturar una pieza enemiga, engendra Peones Espectrales en las casillas colindantes y puede reanimar a un aliado caído.',
    lore: 'Alquimista condenado durante la peste negra por intentar resucitar a su estirpe mediante sellos arcanos. Atrapado en el purgatorio por el Soberano del Vacío.'
  },
  {
    id: 'rogue',
    name: 'El Pícaro',
    humanName: 'Renzo Malatesta «Gato Callejero»',
    year: '1684 d.C.',
    rarity: 'common',
    role: 'Asalto',
    classIcon: '⚡',
    portrait: 'assets/portraits/rogue.webp',
    sprite: 'assets/pieces/rogue_white.webp',
    voice: 'assets/audio/rogue.mp3',
    t3Skill: 'Golpe Doble en Sombra',
    t3Desc: 'Permite capturar 2 piezas adyacentes en el mismo turno o ejecutar un salto de 2 casillas en punto ciego.',
    lore: 'Ratero de los muelles de Venecia que jugaba con piezas marcadas. Tocó un estuche de basalto en una góndola bajo la niebla y fue succionado al abismo.'
  },
  {
    id: 'archer',
    name: 'Arquero de Élite',
    humanName: 'Robin de Locksley II',
    year: '1415 d.C.',
    rarity: 'rare',
    role: 'Artillería',
    classIcon: '🏹',
    portrait: 'assets/portraits/archer.webp',
    sprite: 'assets/pieces/bishop_white.webp',
    voice: 'assets/audio/archer.mp3',
    t3Skill: 'Barrera de Flechas de Fuego',
    t3Desc: 'Disparo certero a 2-3 casillas de distancia sin necesidad de moverse, aniquilando piezas sin exponerse al contraataque.',
    lore: 'Tirador legendario de Agincourt. Incapaz de defenderse cuerpo a cuerpo (punto ciego <= 1 casilla), pero implacable aniquilador de vanguardias a distancia.'
  },
  {
    id: 'sapper',
    name: 'El Zapador',
    humanName: 'Sargento Grigori Voronin',
    year: '1915 d.C.',
    rarity: 'common',
    role: 'Asalto',
    classIcon: '⚡',
    portrait: 'assets/portraits/sapper.webp',
    sprite: 'assets/pieces/sapper_white.webp',
    voice: 'assets/audio/sapper.mp3',
    t3Skill: 'Gran Detonación 5x5',
    t3Desc: 'Al ser sacrificado o capturar, detona su carga de pólvora arcanizada destruyendo todas las fichas en un cuadrante de 3x3 (o 5x5 en T3).',
    lore: 'Zapador de trincheras en los Cárpatos de la Gran Guerra. Voló una cámara subterránea con dinamita y abrió una grieta cósmica en lugar de una brecha en la colina.'
  },
  {
    id: 'chronos',
    name: 'Cronoterapeuta',
    humanName: 'Prof. Alistair Finch',
    year: '1952 d.C.',
    rarity: 'legendary',
    role: 'Especialista',
    classIcon: '🔮',
    portrait: 'assets/portraits/chronos.webp',
    sprite: 'assets/pieces/void_wizard_astral_white.webp',
    voice: 'assets/audio/chronotherapist.mp3',
    t3Skill: 'Áncora Temporal',
    t3Desc: 'Rebobina el tablero 1 turno completo si tu Rey sufre una amenaza de Jaque Mate inminente.',
    lore: 'Físico cuántico obsesionado con la inversión de la entropía. Conectó un péndulo de cesio a un reloj de ajedrez y fracturó el continuo espaciotemporal.'
  },
  {
    id: 'void_wizard',
    name: 'Hechicero del Vacío',
    humanName: 'Maestro Kaelen Voss',
    year: '1180 d.C.',
    rarity: 'rare',
    role: 'Especialista',
    classIcon: '🔮',
    portrait: 'assets/portraits/void_wizard.webp',
    sprite: 'assets/pieces/void_wizard_white.webp',
    voice: 'assets/audio/void_wizard.mp3',
    t3Skill: 'Desplazamiento Cuántico',
    t3Desc: 'Intercambia instantáneamente su posición con cualquier pieza aliada en un radio de 3 casillas.',
    lore: 'Mago estelar que descifró las inscripciones del Enroque Muerto en Anatolia Oriental antes de la expedición de Arthur Vance.'
  },
  {
    id: 'ballista',
    name: 'Balista de Asedio',
    humanName: 'Ingeniero Arquitas de Tarento',
    year: '370 a.C.',
    rarity: 'epic',
    role: 'Artillería',
    classIcon: '🏹',
    portrait: 'assets/portraits/ballista.webp',
    sprite: 'assets/pieces/rook_white.webp',
    voice: 'assets/audio/ballista.mp3',
    t3Skill: 'Bombardeo Total',
    t3Desc: 'Disparo ortogonal de 2 a 4 casillas de distancia que atraviesa escudos y demuele defensas fortificadas.',
    lore: 'Maquinaria de guerra helénica diseñada para quebrar murallas ciclópeas. Resucitada en el purgatorio con virotes forjados en magma frío.'
  },
  {
    id: 'paladin',
    name: 'Paladín del Alba',
    humanName: 'Sir Geoffrey de Saint-Omer',
    year: '1219 d.C.',
    rarity: 'common',
    role: 'Vanguardia',
    classIcon: '🛡️',
    portrait: 'assets/portraits/paladin.webp',
    sprite: 'assets/pieces/paladin_white.webp',
    voice: 'assets/audio/paladin.mp3',
    t3Skill: 'Golpe Sagrado',
    t3Desc: 'Combina salto en L de caballo con avance frontal inamovible. Desata un rayo de fe que erradica una pieza enemiga a 2 casillas.',
    lore: 'Caballero templario juramentado a la custodia del Santo Sepulcro. Desapareció en una cripta sellada de Antioquía mientras rezaba sobre un tablero de Shatranj.'
  },
  {
    id: 'sentinel',
    name: 'Centinela de Piedra',
    humanName: 'Bran O\'Callaghan «Ojos de Piedra»',
    year: '1746 d.C.',
    rarity: 'common',
    role: 'Vanguardia',
    classIcon: '🛡️',
    portrait: 'assets/portraits/sentinel.webp',
    sprite: 'assets/pieces/sentinel_white.webp',
    voice: 'assets/audio/sentinel.mp3',
    t3Skill: 'Guardia de Hierro',
    t3Desc: 'Inmune por completo al fuego a distancia de Artillería. Bloquea todo avance en sus casillas adyacentes.',
    lore: 'Vigía escocés leal a Culloden. Sus ojos fueron reemplazados por cuarzo que nunca parpadea; permanece clavado en el tablero sin retroceder jamás.'
  }
];

// --- 2. AUDIO & SOUNDBOARD MANAGER ---
class SoundManager {
  constructor() {
    this.bgm = new Audio('assets/audio/bgm_roadmap.ogg');
    this.bgm.loop = true;
    this.bgm.volume = 0.35;
    this.isPlayingBgm = false;

    this.sfxPool = {
      move: new Audio('assets/audio/sfx_move.ogg'),
      destroy: new Audio('assets/audio/sfx_destroy.ogg'),
      destroyHeavy: new Audio('assets/audio/sfx_destroy_heavy.ogg'),
      victory: new Audio('assets/audio/sfx_victory.ogg'),
      gold: new Audio('assets/audio/sfx_gold_gain.ogg'),
      chest: new Audio('assets/audio/sfx_chest_open.ogg')
    };

    // Set SFX volumes
    Object.values(this.sfxPool).forEach(snd => snd.volume = 0.55);

    this.currentVoice = null;
  }

  toggleBgm() {
    if (this.isPlayingBgm) {
      this.bgm.pause();
      this.isPlayingBgm = false;
    } else {
      this.bgm.play().then(() => {
        this.isPlayingBgm = true;
      }).catch(err => console.log('Audio autoplay blocked, click to play:', err));
    }
    this.updateBgmUi();
  }

  playSfx(name) {
    const sfx = this.sfxPool[name];
    if (sfx) {
      sfx.currentTime = 0;
      sfx.play().catch(() => {});
    }
  }

  playVoice(src) {
    if (this.currentVoice) {
      this.currentVoice.pause();
      this.currentVoice.currentTime = 0;
    }
    this.currentVoice = new Audio(src);
    this.currentVoice.volume = 0.85;
    this.currentVoice.play().catch(e => console.log('Voice audio err:', e));
  }

  updateBgmUi() {
    const btn = document.getElementById('btn-toggle-bgm');
    const vinyl = document.getElementById('vinyl-disc');
    const dockSoundBtn = document.getElementById('dock-sound-btn');
    
    if (btn) {
      btn.innerHTML = this.isPlayingBgm ? '⏸' : '▶';
    }
    if (vinyl) {
      if (this.isPlayingBgm) vinyl.classList.add('spinning');
      else vinyl.classList.remove('spinning');
    }
    if (dockSoundBtn) {
      dockSoundBtn.classList.toggle('active', this.isPlayingBgm);
      dockSoundBtn.innerHTML = this.isPlayingBgm ? '🔊' : '🔇';
    }
  }
}

const sounds = new SoundManager();

// --- 3. AMBIENT PARTICLES (EMBERS & COSMIC DUST) ---
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = 45;
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.8,
      speedY: Math.random() * 0.7 + 0.2,
      speedX: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.6 + 0.2,
      color: Math.random() > 0.4 ? 'rgba(245, 158, 11,' : 'rgba(56, 189, 248,'
    });
  }

  function loop() {
    ctx.clearRect(0, 0, width, height);
    for (let p of particles) {
      p.y -= p.speedY;
      p.x += p.speedX;
      if (p.y < 0) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `${p.color} ${p.opacity})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = p.color === 'rgba(245, 158, 11,' ? '#f59e0b' : '#38bdf8';
      ctx.fill();
    }
    requestAnimationFrame(loop);
  }
  loop();
}

// --- 4. POPULATE BESTIARY CODEX ---
function renderBestiary(filter = 'all') {
  const grid = document.getElementById('bestiary-grid');
  if (!grid) return;
  grid.innerHTML = '';

  const filtered = filter === 'all' 
    ? SOULS_DATA 
    : SOULS_DATA.filter(s => s.role.toLowerCase() === filter.toLowerCase() || s.rarity.toLowerCase() === filter.toLowerCase());

  filtered.forEach(soul => {
    const card = document.createElement('div');
    card.className = `soul-card ${soul.rarity}`;
    card.dataset.id = soul.id;

    card.innerHTML = `
      <div class="soul-card-badge-row">
        <span class="soul-rarity-badge">${soul.rarity}</span>
        <span class="soul-class-icon" title="Clase ${soul.role}">${soul.classIcon}</span>
      </div>
      <div class="soul-portrait-wrap">
        <img class="soul-portrait-img" src="${soul.portrait}" alt="${soul.name}" loading="lazy">
        <button class="soul-play-voice-btn" data-voice="${soul.voice}" title="Escuchar voz de ${soul.name}">
          🔊
        </button>
      </div>
      <h3 class="soul-card-title">${soul.name}</h3>
      <p class="soul-card-human">${soul.humanName} (${soul.year})</p>
      <div class="soul-card-t3-skill">
        <strong>★ TIER 3: ${soul.t3Skill}</strong>
        ${soul.t3Desc}
      </div>
    `;

    // Click card to open full lore modal
    card.addEventListener('click', (e) => {
      if (e.target.closest('.soul-play-voice-btn')) {
        e.stopPropagation();
        sounds.playVoice(soul.voice);
        sounds.playSfx('move');
        return;
      }
      openSoulModal(soul);
    });

    grid.appendChild(card);
  });
}

function openSoulModal(soul) {
  const modal = document.getElementById('soul-modal');
  const body = document.getElementById('soul-modal-body');
  if (!modal || !body) return;

  sounds.playSfx('chest');

  body.innerHTML = `
    <div style="display: flex; gap: 24px; align-items: flex-start; flex-wrap: wrap;">
      <div style="flex-shrink: 0; width: 140px; text-align: center;">
        <img src="${soul.portrait}" style="width: 140px; height: 140px; object-fit: cover; border-radius: 12px; border: 2px solid var(--gold-primary); box-shadow: 0 0 20px var(--gold-glow); image-rendering: pixelated; margin-bottom: 12px;">
        <button id="modal-voice-btn" class="btn-pre-register" style="width: 100%; font-size: 0.78rem; padding: 8px 12px;">
          🔊 Oír Voz
        </button>
      </div>
      <div style="flex-grow: 1; min-width: 260px;">
        <div style="display: flex; gap: 8px; margin-bottom: 8px;">
          <span class="soul-rarity-badge" style="font-size: 0.7rem;">${soul.rarity.toUpperCase()}</span>
          <span style="font-size: 0.75rem; color: var(--arcane-cyan); font-weight: 700;">${soul.classIcon} ${soul.role.toUpperCase()}</span>
        </div>
        <h2 style="font-family: var(--font-display); font-size: 1.8rem; color: var(--gold-light); margin-bottom: 4px;">${soul.name}</h2>
        <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 16px; font-style: italic;">
          Identidad humana: <strong>${soul.humanName}</strong> • Abducido: <strong>${soul.year}</strong>
        </p>
        <div style="background: rgba(5, 8, 17, 0.7); border: 1px solid var(--border-gold); border-radius: 8px; padding: 14px; margin-bottom: 16px;">
          <h4 style="color: var(--text-gold); font-size: 0.88rem; margin-bottom: 4px;">★★★ Habilidad Tier 3: ${soul.t3Skill}</h4>
          <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">${soul.t3Desc}</p>
        </div>
        <p style="font-size: 0.9rem; color: var(--text-primary); line-height: 1.7; border-left: 3px solid var(--void-purple); padding-left: 12px;">
          "${soul.lore}"
        </p>
      </div>
    </div>
  `;

  const voiceBtn = document.getElementById('modal-voice-btn');
  if (voiceBtn) {
    voiceBtn.addEventListener('click', () => {
      sounds.playVoice(soul.voice);
    });
  }

  modal.classList.add('active');
}

// --- 5. INTERACTIVE LIVE CHESSBOARD TACTICAL SIMULATOR ---
const PIECE_CONFIGS = {
  knight: {
    name: 'Caballo (⚡ Asalto)',
    role: 'Asalto • Base',
    desc: 'Salto en L. Elude obstáculos y flanquea en el punto ciego de la Artillería enemiga. Frena su avance ante Vanguardias.',
    img: 'assets/pieces/knight_white.webp',
    pos: [4, 3], // row, col
    moves: [
      [2, 2], [2, 4], [3, 1], [3, 5],
      [5, 1], [5, 5], [6, 2], [6, 4]
    ]
  },
  rogue: {
    name: 'El Pícaro (⚡ Asalto)',
    role: 'Asalto • Común',
    desc: 'Salto frontal y lateral de 2 casillas. Ignora piezas y ataca por la espalda. Habilidad T3: Doble captura encadenada.',
    img: 'assets/pieces/rogue_white.webp',
    pos: [4, 3],
    moves: [
      [2, 3], [6, 3], [4, 1], [4, 5],
      [3, 3], [5, 3], [4, 2], [4, 4]
    ]
  },
  archer: {
    name: 'Arquero de Élite (🏹 Artillería)',
    role: 'Artillería • Rara',
    desc: 'Disparo a 2-3 casillas de distancia sin moverse. No puede contraatacar cuerpo a cuerpo (punto ciego <= 1 casilla).',
    img: 'assets/pieces/archer_white.webp',
    pos: [4, 3],
    moves: [
      [2, 3], [1, 3], [6, 3], [7, 3],
      [4, 1], [4, 0], [4, 5], [4, 6]
    ]
  },
  rook: {
    name: 'Torre de Asedio (🛡️ Vanguardia)',
    role: 'Vanguardia • Base',
    desc: 'Control ortogonal de línea completa. Muro infranqueable que anula saltos de Asalto en casillas adyacentes.',
    img: 'assets/pieces/rook_white.webp',
    pos: [4, 3],
    moves: [
      [0, 3], [1, 3], [2, 3], [3, 3], [5, 3], [6, 3], [7, 3],
      [4, 0], [4, 1], [4, 2], [4, 4], [4, 5], [4, 6], [4, 7]
    ]
  },
  void_wizard: {
    name: 'Hechicero del Vacío (🔮 Especialista)',
    role: 'Especialista • Rara',
    desc: 'Movimiento ortogonal de 2 casillas y salto cuántico de transmutación para intercambiarse con aliados.',
    img: 'assets/pieces/void_wizard_white.webp',
    pos: [4, 3],
    moves: [
      [2, 3], [3, 3], [5, 3], [6, 3],
      [4, 1], [4, 2], [4, 4], [4, 5],
      [2, 1], [2, 5], [6, 1], [6, 5]
    ]
  }
};

let currentPieceKey = 'knight';

function initSimulator() {
  const boardEl = document.getElementById('chessboard-grid');
  if (!boardEl) return;

  renderBoardCells(boardEl);
  updatePieceDemo(currentPieceKey);

  // Piece button listeners
  const pieceBtns = document.querySelectorAll('.piece-select-btn');
  pieceBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sounds.playSfx('move');
      pieceBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentPieceKey = btn.dataset.piece;
      updatePieceDemo(currentPieceKey);
    });
  });
}

function renderBoardCells(boardEl) {
  boardEl.innerHTML = '';
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const cell = document.createElement('div');
      cell.className = `chess-cell ${(r + c) % 2 === 0 ? 'light' : 'dark'}`;
      cell.dataset.row = r;
      cell.dataset.col = c;

      cell.addEventListener('click', () => {
        handleCellClick(r, c);
      });

      boardEl.appendChild(cell);
    }
  }
}

function updatePieceDemo(pieceKey) {
  const config = PIECE_CONFIGS[pieceKey];
  if (!config) return;

  // Clear previous highlights and pieces
  const cells = document.querySelectorAll('.chess-cell');
  cells.forEach(cell => {
    cell.innerHTML = '';
    cell.classList.remove('selected', 'highlight-move', 'highlight-attack');
  });

  // Put piece on board
  const [pr, pc] = config.pos;
  const targetCell = document.querySelector(`.chess-cell[data-row="${pr}"][data-col="${pc}"]`);
  if (targetCell) {
    targetCell.classList.add('selected');
    const img = document.createElement('img');
    img.className = 'chess-piece-img';
    img.src = config.img;
    img.alt = config.name;
    targetCell.appendChild(img);
  }

  // Highlight moves
  config.moves.forEach(([mr, mc]) => {
    if (mr >= 0 && mr < 8 && mc >= 0 && mc < 8) {
      const moveCell = document.querySelector(`.chess-cell[data-row="${mr}"][data-col="${mc}"]`);
      if (moveCell) {
        if (Math.abs(mr - pr) > 2 || Math.abs(mc - pc) > 2) {
          moveCell.classList.add('highlight-attack');
        } else {
          moveCell.classList.add('highlight-move');
        }
      }
    }
  });

  // Update info panel
  const nameEl = document.getElementById('piece-demo-name');
  const roleEl = document.getElementById('piece-demo-role');
  const descEl = document.getElementById('piece-demo-desc');

  if (nameEl) nameEl.textContent = config.name;
  if (roleEl) roleEl.textContent = config.role;
  if (descEl) descEl.textContent = config.desc;
}

function handleCellClick(r, c) {
  const config = PIECE_CONFIGS[currentPieceKey];
  const isMove = config.moves.some(([mr, mc]) => mr === r && mc === c);

  if (isMove) {
    sounds.playSfx('destroyHeavy');
    config.pos = [r, c];
    // Recalculate relative moves
    if (currentPieceKey === 'knight') {
      config.moves = [
        [r - 2, c - 1], [r - 2, c + 1], [r - 1, c - 2], [r - 1, c + 2],
        [r + 1, c - 2], [r + 1, c + 2], [r + 2, c - 1], [r + 2, c + 1]
      ];
    } else if (currentPieceKey === 'rogue') {
      config.moves = [
        [r - 2, c], [r + 2, c], [r, c - 2], [r, c + 2],
        [r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]
      ];
    } else if (currentPieceKey === 'archer') {
      config.moves = [
        [r - 2, c], [r - 3, c], [r + 2, c], [r + 3, c],
        [r, c - 2], [r, c - 3], [r, c + 2], [r, c + 3]
      ];
    } else if (currentPieceKey === 'rook') {
      config.moves = [];
      for (let i = 0; i < 8; i++) {
        if (i !== r) config.moves.push([i, c]);
        if (i !== c) config.moves.push([r, i]);
      }
    } else if (currentPieceKey === 'void_wizard') {
      config.moves = [
        [r - 2, c], [r - 1, c], [r + 1, c], [r + 2, c],
        [r, c - 2], [r, c - 1], [r, c + 1], [r, c + 2],
        [r - 2, c - 2], [r - 2, c + 2], [r + 2, c - 2], [r + 2, c + 2]
      ];
    }
    updatePieceDemo(currentPieceKey);
  } else {
    sounds.playSfx('move');
  }
}

// --- 6. FORGE SHOWCASE TABS ---
const FORGE_DATA = {
  pawn: {
    t1: { name: 'Peón (Recluta)', desc: 'Avanza 1 casilla (2 en salida). 1 Vida.', img: 'assets/pieces/pawn_white.webp' },
    t2: { name: 'Peón (Veterano)', desc: 'Movilidad mejorada: permite avanzar 2 casillas en turnos posteriores si el camino está despejado.', img: 'assets/pieces/pawn_white.webp' },
    t3: { name: 'Peón (Coronación)', desc: '★ Habilidad: «Coronación Inmediata». Si alcanza las dos últimas filas enemigas, se transforma al instante en Dama, Torre o Caballo.', img: 'assets/pieces/queen_white.webp' }
  },
  rook: {
    t1: { name: 'Torre (Recluta)', desc: 'Movimiento ortogonal limitado a 4 casillas base.', img: 'assets/pieces/rook_white.webp' },
    t2: { name: 'Torre (Veterana)', desc: 'Control ortogonal total del tablero completo.', img: 'assets/pieces/rook_white.webp' },
    t3: { name: 'Torre (Cañonazo)', desc: '★ Habilidad: «Cañonazo de Asedio». Destruye en línea recta cualquier pieza sin desplazarse.', img: 'assets/pieces/rook_golden_white.webp' }
  },
  titan: {
    t1: { name: 'Titán (Recluta)', desc: 'Muro pesado de 1 casilla de avance.', img: 'assets/pieces/sentinel_white.webp' },
    t2: { name: 'Titán (Veterano)', desc: 'Giro lateral y empuje de piezas enemigas adyacentes.', img: 'assets/pieces/sentinel_white.webp' },
    t3: { name: 'Titán (Colosal)', desc: '★ 2 Vidas completas (Armadura impenetrable) + Aura de Gravedad Pesada que paraliza saltos.', img: 'assets/pieces/rook_golden_black.webp' }
  }
};

function initForgeTabs() {
  const tabBtns = document.querySelectorAll('.forge-tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sounds.playSfx('move');
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const pieceKey = btn.dataset.piece;
      updateForgeDisplay(pieceKey);
    });
  });
}

function updateForgeDisplay(pieceKey) {
  const data = FORGE_DATA[pieceKey];
  if (!data) return;

  const t1 = document.getElementById('forge-t1');
  const t2 = document.getElementById('forge-t2');
  const t3 = document.getElementById('forge-t3');

  if (t1) {
    t1.querySelector('.forge-step-name').textContent = data.t1.name;
    t1.querySelector('.forge-step-desc').textContent = data.t1.desc;
    t1.querySelector('.forge-step-img').src = data.t1.img;
  }
  if (t2) {
    t2.querySelector('.forge-step-name').textContent = data.t2.name;
    t2.querySelector('.forge-step-desc').textContent = data.t2.desc;
    t2.querySelector('.forge-step-img').src = data.t2.img;
  }
  if (t3) {
    t3.querySelector('.forge-step-name').textContent = data.t3.name;
    t3.querySelector('.forge-step-desc').textContent = data.t3.desc;
    t3.querySelector('.forge-step-img').src = data.t3.img;
  }
}

// --- 7. SCREENSHOT LIGHTBOX MODAL ---
function initGalleryModal() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const modal = document.getElementById('screenshot-modal');
  const modalImg = document.getElementById('modal-screenshot-img');
  const modalCaption = document.getElementById('modal-screenshot-caption');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      sounds.playSfx('move');
      const src = item.dataset.full;
      const title = item.dataset.title;
      const desc = item.dataset.desc;
      if (modal && modalImg) {
        modalImg.src = src;
        modalCaption.innerHTML = `<h3 style="color: var(--gold-light);">${title}</h3><p style="color: var(--text-secondary);">${desc}</p>`;
        modal.classList.add('active');
      }
    });
  });
}

// --- 8. CRT SCANLINE TOGGLE & FLOATING CONTROLS ---
function initCrtToggle() {
  const crt = document.getElementById('crt-overlay');
  const crtBtn = document.getElementById('dock-crt-btn');
  const navCrtBtn = document.getElementById('nav-crt-btn');

  let enabled = true;

  function setCrt(state) {
    enabled = state;
    if (crt) crt.classList.toggle('disabled', !enabled);
    if (crtBtn) crtBtn.classList.toggle('active', enabled);
    if (navCrtBtn) navCrtBtn.classList.toggle('active', enabled);
    sounds.playSfx('move');
  }

  if (crtBtn) crtBtn.addEventListener('click', () => setCrt(!enabled));
  if (navCrtBtn) navCrtBtn.addEventListener('click', () => setCrt(!enabled));
}

// --- 9. EARLY ACCESS PROMO CODE CLAIM FORM ---
function initClaimEarlyAccessForm() {
  const form = document.getElementById('claim-form');
  const emailInput = document.getElementById('claim-email-input');
  const submitBtn = document.getElementById('btn-claim-submit');
  const counterEl = document.getElementById('keys-counter');
  const resultBox = document.getElementById('claim-result-box');
  const errorBox = document.getElementById('claim-error-box');
  const displayCode = document.getElementById('display-promo-code');
  const directLink = document.getElementById('direct-playstore-link');
  const directAppLink = document.getElementById('direct-app-link');
  const copyBtn = document.getElementById('btn-copy-code');
  const retryBtn = document.getElementById('btn-request-another-code');

  // Fallback for static GitHub Pages hosting
  async function claimCodeStatic(payload, discardCurrent) {
    let pool = window.__LOCAL_PROMO_POOL__;
    if (!pool || pool.length === 0) {
      try {
        const resp = await fetch('access_codes.json');
        const json = await resp.json();
        pool = json.available || [];
        window.__LOCAL_PROMO_POOL__ = pool;
      } catch (e) {
        pool = [
          "BE3HZ9665F85TQ9ERQ0CNYK", "8MP1ASMWSG7A013271S2YCB", "M29C94QHA9S1D5YWNNHFRHM",
          "A2JLKA63BE1L6WAU1FBPTGD", "J891JSY5C5C0DUT8ET8Z70A", "FCYP7LUWRWXNUHNDYZ3WVQT",
          "ZTR1DD7101T3DF5CM0ZAM3M", "W5DVZBN32F7803GCY2Z9AAG", "C6FWNXKHRMRDY63B0WYUA9J",
          "6AEU0XECQKVRHV2UX92DV07", "8JMWLX8GKFM9N2F5R3UG8XK", "AMX5MWK3Z6SJN8FK8QN69UN"
        ];
        window.__LOCAL_PROMO_POOL__ = pool;
      }
    }

    let burned = JSON.parse(localStorage.getItem('dg_burned_codes') || '[]');
    if (payload.discard_code && !burned.includes(payload.discard_code)) {
      burned.push(payload.discard_code);
      localStorage.setItem('dg_burned_codes', JSON.stringify(burned));
    }

    const available = pool.filter(c => !burned.includes(c));
    if (available.length === 0) {
      return {
        success: false,
        error: '¡Todas las claves de acceso anticipado gratuito han sido entregadas!',
        remaining: 0
      };
    }

    let claimedCode = localStorage.getItem('dg_user_code');
    if (!claimedCode || discardCurrent || burned.includes(claimedCode)) {
      claimedCode = available[0];
      localStorage.setItem('dg_user_code', claimedCode);
    }

    const packageId = 'com.nhcoders.roge_chest';
    return {
      success: true,
      code: claimedCode,
      redeemUrl: `https://play.google.com/redeem?code=${claimedCode}`,
      appDirectUrl: `https://play.google.com/store/apps/details?id=${packageId}&code=${claimedCode}`,
      remaining: Math.max(0, available.length - 1)
    };
  }

  // Fetch initial status from server (falls back to static on GitHub Pages)
  fetch('/api/status')
    .then(r => {
      if (!r.ok) throw new Error('Static host');
      return r.json();
    })
    .then(data => {
      if (counterEl && data.available !== undefined) {
        counterEl.textContent = data.available;
      }
    })
    .catch(() => {
      fetch('access_codes.json')
        .then(r => r.json())
        .then(data => {
          window.__LOCAL_PROMO_POOL__ = data.available || [];
          const burned = JSON.parse(localStorage.getItem('dg_burned_codes') || '[]');
          const remaining = (data.available || []).filter(c => !burned.includes(c)).length;
          if (counterEl) counterEl.textContent = remaining;
        })
        .catch(() => {});
    });

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const code = displayCode.textContent;
      if (code && code !== '-----------------------') {
        navigator.clipboard.writeText(code).then(() => {
          sounds.playSfx('gold');
          copyBtn.textContent = '✅ ¡Copiado!';
          setTimeout(() => { copyBtn.textContent = '📋 Copiar'; }, 2000);
        });
      }
    });
  }

  async function executeClaim(discardCurrent = false) {
    const email = emailInput ? emailInput.value.trim() : '';
    if (!email || !email.includes('@')) {
      if (errorBox) {
        errorBox.style.display = 'block';
        errorBox.textContent = 'Por favor, introduce un correo electrónico válido.';
      }
      return;
    }

    const currentCode = displayCode ? displayCode.textContent.trim() : '';
    const payload = { email };
    if (discardCurrent && currentCode && currentCode !== '-----------------------') {
      payload.discard_code = currentCode;
    }

    if (errorBox) errorBox.style.display = 'none';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = discardCurrent ? 'Buscando Clave Nueva...' : 'Forjando Clave...';
    }
    if (retryBtn) {
      retryBtn.disabled = true;
      retryBtn.textContent = 'Descartando y forjando...';
    }

    try {
      let data;
      try {
        const res = await fetch('/api/claim-code', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error('Not static API');
        data = await res.json();
      } catch (backendErr) {
        // Fallback for GitHub Pages static execution
        data = await claimCodeStatic(payload, discardCurrent);
      }

      if (data.success) {
        sounds.playSfx('victory');
        if (counterEl && data.remaining !== undefined) {
          counterEl.textContent = data.remaining;
        }

        if (displayCode) displayCode.textContent = data.code;
        if (directLink) directLink.href = data.redeemUrl;
        if (directAppLink && data.appDirectUrl) directAppLink.href = data.appDirectUrl;

        if (resultBox) {
          resultBox.style.display = 'block';
          resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      } else {
        sounds.playSfx('destroy');
        if (errorBox) {
          errorBox.style.display = 'block';
          errorBox.textContent = data.error || 'No fue posible reclamar la clave.';
        }
      }
    } catch (err) {
      sounds.playSfx('destroy');
      if (errorBox) {
        errorBox.style.display = 'block';
        errorBox.textContent = 'Error al procesar la entrega de clave.';
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Obtener Mi Clave Gratuita';
      }
      if (retryBtn) {
        retryBtn.disabled = false;
        retryBtn.textContent = '⚡ DESCARTAR Y ENTREGAR OTRA CLAVE NUEVA';
      }
    }
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      executeClaim(false);
    });
  }

  if (submitBtn) {
    submitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      executeClaim(false);
    });
  }

  if (retryBtn) {
    retryBtn.addEventListener('click', (e) => {
      e.preventDefault();
      executeClaim(true);
    });
  }
}

// --- 10. VOICE SOUNDBOARD BUTTONS IN JUKEBOX ---
function initVoiceButtons() {
  const voiceBtns = document.querySelectorAll('.voice-btn-card');
  voiceBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sounds.playSfx('move');
      voiceBtns.forEach(b => b.classList.remove('playing'));
      btn.classList.add('playing');
      const src = btn.dataset.voice;
      if (src) {
        sounds.playVoice(src);
      }
    });
  });

  const bgmBtn = document.getElementById('btn-toggle-bgm');
  if (bgmBtn) {
    bgmBtn.addEventListener('click', () => sounds.toggleBgm());
  }

  const dockSoundBtn = document.getElementById('dock-sound-btn');
  if (dockSoundBtn) {
    dockSoundBtn.addEventListener('click', () => sounds.toggleBgm());
  }
}

// --- 11. MODAL CLOSE LISTENERS ---
function initModals() {
  const modals = document.querySelectorAll('.modal-backdrop');
  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.closest('.modal-close-btn')) {
        sounds.playSfx('move');
        modal.classList.remove('active');
      }
    });
  });
}

// --- 12. MOBILE NAVIGATION DRAWER ---
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const closeBtn = document.getElementById('mobile-drawer-close');
  const drawer = document.getElementById('mobile-nav-drawer');
  const backdrop = document.getElementById('mobile-drawer-backdrop');
  const drawerLinks = document.querySelectorAll('.mobile-drawer-link, .mobile-drawer-cta');

  function openDrawer() {
    sounds.playSfx('move');
    if (drawer) drawer.classList.add('open');
    if (backdrop) backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (drawer) drawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (toggleBtn) toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });
}

// --- DOM CONTENT LOADED INITIALIZER ---
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  renderBestiary('all');
  initSimulator();
  initForgeTabs();
  initGalleryModal();
  initCrtToggle();
  initClaimEarlyAccessForm();
  initVoiceButtons();
  initModals();
  initMobileDrawer();

  // Filter Pills listener
  const filterPills = document.querySelectorAll('.filter-pill');
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      sounds.playSfx('move');
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      renderBestiary(pill.dataset.filter);
    });
  });

  console.log('⚔️ DISSONANT GAMBIT engine loaded successfully.');
});

