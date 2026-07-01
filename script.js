const HERO_SPRITES = {
  normal: [
    { limit: 100, sprite: 'assets/full-100.png' },
    { limit: 80, sprite: 'assets/immobile.png' },
    { limit: 60, sprite: 'assets/tres_gonfler.png' },
    { limit: 40, sprite: 'assets/gonfler.png' },
    { limit: 20, sprite: 'assets/leger_gonfler.png' },
    { limit: 0, sprite: 'assets/normal.png' }
  ],
  max300: [
    { limit: 100, sprite: 'assets/full-100-300.png' },
    { limit: 80, sprite: 'assets/immobile-100-300.png' },
    { limit: 60, sprite: 'assets/tres_gonfler-100-300.png' },
    { limit: 40, sprite: 'assets/gonfler-100-300.png' },
    { limit: 20, sprite: 'assets/leger_gonfler-100-300.png' },
    { limit: 0, sprite: 'assets/normal-100-300.png' }
  ],
  max500: [
    { limit: 100, sprite: 'assets/full-100-500.png' },
    { limit: 80, sprite: 'assets/immobile-500.png' },
    { limit: 60, sprite: 'assets/tres_gonfler-500.png' },
    { limit: 40, sprite: 'assets/gonfler-500.png' },
    { limit: 20, sprite: 'assets/leger_gonfler-500.png' },
    { limit: 0, sprite: 'assets/normal-500.png' }
  ]
};

const CLASS_DATA = {
  Guerrière: {
    emoji: '⚔️',
    bonuses: ['+2 FOR au départ', '+2 CAP au départ', 'Compétence : Punition Frénétique', 'Très résistante quand elle encaisse'],
    baseAdjust: { FOR: 2, CAP: 2, RAP: 0, META: 0 },
    skillName: 'Punition Frénétique',
    skillCost: 8,
  },
  Assassin: {
    emoji: '🗡️',
    bonuses: ['+1 FOR au départ', '+3 RAP au départ', 'Compétence : Assassinat', 'Critiques et esquive élevés'],
    baseAdjust: { FOR: 1, CAP: 0, RAP: 3, META: 0 },
    skillName: 'Assassinat',
    skillCost: 7,
  },
  Gardien: {
    emoji: '🛡️',
    bonuses: ['+3 CAP au départ', '+1 META au départ', "Compétence : Morsure de l'Hydre", 'Très grosse réserve de PS'],
    baseAdjust: { FOR: 0, CAP: 3, RAP: 0, META: 1 },
    skillName: "Morsure de l'Hydre",
    skillCost: 10,
  }
};

const CREATION = {
  points: 10,
  className: 'Guerrière',
  stats: { FOR: 5, CAP: 5, RAP: 5, META: 5 }
};

const SAVE_KEY = 'glouton_donjon_characters';

function makeCharacterId() {
  return `hero-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}


const DOOR_SPRITE = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='256' height='256' viewBox='0 0 256 256'><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='180'>🏰</text></svg>";

const BESTIARY = [
  { name: 'Petit Slime', xp: 34, sprite: 'assets/monster-1.png', archetype: 'Rapide', stats: { FOR: 2, RAP: 4, DEF: 2 } },
  { name: 'Lapin Fluffy', xp: 36, sprite: 'assets/monster-2.png', archetype: 'Rapide', stats: { FOR: 3, RAP: 5, DEF: 1 } },
  { name: 'Gobelin Cuisinier', xp: 52, sprite: 'assets/monster-3.png', archetype: 'Brute', stats: { FOR: 5, RAP: 2, DEF: 3 } },
  { name: 'Sorcière Gourmande', xp: 88, sprite: 'assets/monster-4.png', archetype: 'Gardien', stats: { FOR: 4, RAP: 3, DEF: 6 } },
  { name: 'Pot de Glace Vivant', xp: 120, sprite: 'assets/monster-5.png', archetype: 'Gardien', stats: { FOR: 5, RAP: 3, DEF: 7 } },
  { name: 'Golem de Gâteau', xp: 170, sprite: 'assets/monster-6.png', archetype: 'Brute', stats: { FOR: 8, RAP: 2, DEF: 7 } },
  { name: 'Dragon Gourmand', xp: 550, sprite: 'assets/monster-7.png', archetype: 'Gardien', stats: { FOR: 10, RAP: 5, DEF: 12 }, boss: true }
];

const ACCESSORIES = [
  { name: 'Dague rouillée', type: 'weapon', slot: 'weapon', atk: 2, rarity: 'Commun', icon: '🗡️' },
  { name: 'Épée longue', type: 'weapon', slot: 'weapon', atk: 4, rarity: 'Commun', icon: '⚔️' },
  { name: 'Bâton runique', type: 'weapon', slot: 'weapon', atk: 5, energy: 4, rarity: 'Rare', icon: '🪄' },
  { name: 'Lame de l’ombre', type: 'weapon', slot: 'weapon', atk: 7, crit: 6, rarity: 'Rare', icon: '🗡️' },
  { name: 'Claymore royale', type: 'weapon', slot: 'weapon', atk: 9, def: 2, rarity: 'Épique', icon: '⚔️' }
];

const OUTFITS = [
  { name: 'Tenue souple', type: 'armor', slot: 'armor', def: 2, rarity: 'Commun', icon: '👚' },
  { name: 'Tenue légère', type: 'armor', slot: 'armor', def: 4, evasion: 3, rarity: 'Commun', icon: '🩱' },
  { name: 'Robe digestive', type: 'armor', slot: 'armor', def: 3, energy: 6, rarity: 'Rare', icon: '🥼' },
  { name: 'Armure souple', type: 'armor', slot: 'armor', def: 6, rarity: 'Rare', icon: '🛡️' },
  { name: 'Tenue du gardien', type: 'armor', slot: 'armor', def: 8, hp: 20, rarity: 'Épique', icon: '👘' }
];

const GAME = {
  started: false,
  inCombat: false,
  isBlocking: false,
  awaitingEnemyTurn: false,
  currentEnemy: null,
  roomsCleared: 0,
  gold: 0,
  selectedItemId: null,
  selectedEquipmentId: null,
  hero: null,
  isResting: false,
  restInterval: null,
  pendingLevelUps: 0,
  isGameOver: false,
  isRecovering: false,
  recoveryEndsAt: null,
  pendingModalAction: null,
  lastPlayerAction: '',
  lastEnemyAction: '',
  lastPlayerActionCrit: false,
  lastEnemyActionCrit: false,
  heroBuffs: [],
  heroDebuffs: [],
  heroPoison: null,
  enemyDebuffs: [],
  enemyPoison: null,
  selectedCharacterId: null,
};

const refs = {};
[
  'class-grid','creation-stat-list','creation-points','hero-name','start-btn','preview-emoji','preview-name','preview-class',
  'preview-for','preview-cap','preview-rap','preview-meta','class-bonuses','menu-screen','character-list','menu-empty-text','menu-play-btn','menu-create-btn','menu-delete-btn','creation-screen','creation-back-btn','game-screen','log',
  'player-card','enemy-card','modal','modal-close','modal-title','modal-text','modal-confirm','modal-restart','modal-stat-choices',
  'exploration-controls','recovery-controls','recovery-text','combat-controls','defeat-controls','btn-explore','btn-rest','btn-attack','btn-heavy','btn-block','btn-skill','btn-restart-run',
  'skill-label','equipment-list','inventory-list','btn-use-equipped','btn-equip-equipped','btn-drop-equipped',
  'btn-use-item','btn-equip-item','btn-drop-item'
].forEach(id => refs[id.replace(/-([a-z])/g, (_, c) => c.toUpperCase())] = document.getElementById(id));

let fitViewportRaf = null;

function fitGameToViewport() {
  const wrapper = document.getElementById('game-wrapper');
  if (!wrapper) return;

  wrapper.style.left = '0px';
  wrapper.style.top = '0px';
  wrapper.style.transform = 'none';
  const availableWidth = Math.max(320, window.innerWidth - 24);
  const availableHeight = Math.max(320, window.innerHeight - 24);
  const scale = Math.min(availableWidth / wrapper.offsetWidth, availableHeight / wrapper.offsetHeight, 1);
  const scaledWidth = wrapper.offsetWidth * scale;
  const scaledHeight = wrapper.offsetHeight * scale;
  const offsetX = Math.max(12, Math.floor((window.innerWidth - scaledWidth) / 2));
  const offsetY = Math.max(12, Math.floor((window.innerHeight - scaledHeight) / 2));
  wrapper.style.left = `${offsetX}px`;
  wrapper.style.top = `${offsetY}px`;
  wrapper.style.transform = `scale(${scale})`;
}

function scheduleViewportFit() {
  if (fitViewportRaf) cancelAnimationFrame(fitViewportRaf);
  fitViewportRaf = requestAnimationFrame(() => {
    fitViewportRaf = null;
    fitGameToViewport();
  });
}


function getSavedCharacters() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Impossible de lire les sauvegardes :', error);
    return [];
  }
}

function setSavedCharacters(characters) {
  localStorage.setItem(SAVE_KEY, JSON.stringify(characters));
}

function buildCharacterSummary(hero) {
  return {
    level: hero.level || 1,
    className: hero.className,
    gold: GAME.gold || 0,
    roomsCleared: GAME.roomsCleared || 0,
  };
}

function serializeGameState() {
  if (!GAME.hero) return null;
  return {
    id: GAME.hero.id,
    hero: GAME.hero,
    started: GAME.started,
    inCombat: GAME.inCombat,
    isBlocking: GAME.isBlocking,
    awaitingEnemyTurn: false,
    currentEnemy: GAME.currentEnemy,
    roomsCleared: GAME.roomsCleared,
    gold: GAME.gold,
    selectedItemId: GAME.selectedItemId,
    selectedEquipmentId: GAME.selectedEquipmentId,
    pendingLevelUps: GAME.pendingLevelUps,
    isRecovering: GAME.isRecovering,
    recoveryEndsAt: GAME.recoveryEndsAt,
    lastPlayerAction: GAME.lastPlayerAction,
    lastEnemyAction: GAME.lastEnemyAction,
    heroBuffs: GAME.heroBuffs,
    heroDebuffs: GAME.heroDebuffs,
    heroPoison: GAME.heroPoison,
    enemyDebuffs: GAME.enemyDebuffs,
    enemyPoison: GAME.enemyPoison,
    summary: buildCharacterSummary(GAME.hero),
    updatedAt: Date.now(),
  };
}

function saveGameState() {
  if (!GAME.hero?.id || GAME.isGameOver) return;
  try {
    const characters = getSavedCharacters();
    const state = serializeGameState();
    const index = characters.findIndex((entry) => entry.id === state.id);
    if (index >= 0) characters[index] = state;
    else characters.push(state);
    setSavedCharacters(characters);
  } catch (error) {
    console.error('Impossible de sauvegarder :', error);
  }
}

function selectCharacter(characterId) {
  GAME.selectedCharacterId = characterId;
  renderCharacterMenu();
}

function renderCharacterMenu() {
  const characters = getSavedCharacters().sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
  refs.characterList.innerHTML = '';
  if (!characters.length) {
    GAME.selectedCharacterId = null;
    refs.characterList.innerHTML = '<div class="item-row"><div class="item-name">Aucun personnage</div><div class="item-meta">Crée ton premier personnage pour commencer.</div></div>';
    refs.menuEmptyText.textContent = 'Aucun personnage sauvegardé.';
    refs.menuPlayBtn.disabled = true;
    refs.menuDeleteBtn.disabled = true;
    scheduleViewportFit();
    return;
  }

  if (!characters.find((entry) => entry.id === GAME.selectedCharacterId)) {
    GAME.selectedCharacterId = characters[0].id;
  }

  characters.forEach((entry) => {
    const row = document.createElement('div');
    row.className = `character-row ${entry.id === GAME.selectedCharacterId ? 'selected' : ''}`;
    row.innerHTML = `
      <div class="character-name">${entry.hero.name}</div>
      <div class="character-meta">${entry.hero.className} — Niveau ${entry.hero.level}</div>
      <div class="character-submeta">Salles franchies : ${entry.roomsCleared || 0}</div>
    `;
    row.addEventListener('click', () => selectCharacter(entry.id));
    refs.characterList.appendChild(row);
  });

  refs.menuEmptyText.textContent = 'Sélectionne un personnage puis choisis une action.';
  refs.menuPlayBtn.disabled = false;
  refs.menuDeleteBtn.disabled = false;
  scheduleViewportFit();
}

function showMenuScreen() {
  refs.menuScreen.classList.remove('hidden');
  refs.creationScreen.classList.add('hidden');
  refs.gameScreen.classList.add('hidden');
  renderCharacterMenu();
}

function showCreationScreen() {
  refs.menuScreen.classList.add('hidden');
  refs.creationScreen.classList.remove('hidden');
  refs.gameScreen.classList.add('hidden');
  renderCreation();
}

function showGameScreen() {
  refs.menuScreen.classList.add('hidden');
  refs.creationScreen.classList.add('hidden');
  refs.gameScreen.classList.remove('hidden');
  scheduleViewportFit();
}

function hydrateGameState(state) {
  GAME.started = !!state.started;
  GAME.inCombat = !!state.inCombat;
  GAME.isBlocking = !!state.isBlocking;
  GAME.awaitingEnemyTurn = false;
  GAME.currentEnemy = state.currentEnemy || null;
  GAME.roomsCleared = state.roomsCleared || 0;
  GAME.gold = state.gold || 0;
  GAME.selectedItemId = state.selectedItemId || null;
  GAME.selectedEquipmentId = state.selectedEquipmentId || null;
  GAME.hero = state.hero;
  GAME.pendingLevelUps = state.pendingLevelUps || 0;
  GAME.isRecovering = !!state.isRecovering;
  GAME.recoveryEndsAt = state.recoveryEndsAt || null;
  GAME.lastPlayerAction = state.lastPlayerAction || '';
  GAME.lastEnemyAction = state.lastEnemyAction || '';
  GAME.heroBuffs = state.heroBuffs || [];
  GAME.heroDebuffs = state.heroDebuffs || [];
  GAME.heroPoison = state.heroPoison || null;
  GAME.enemyDebuffs = state.enemyDebuffs || [];
  GAME.enemyPoison = state.enemyPoison || null;
  if (GAME.currentEnemy) refreshEnemyDerived();
}

function loadCharacter(characterId) {
  const state = getSavedCharacters().find((entry) => entry.id === characterId);
  if (!state) return;
  hydrateGameState(state);
  showGameScreen();
  updateLastActions('', '', false, false);
  renderGame();
  if (GAME.isRecovering) resumeDefeatRecovery();
}

function deleteSelectedCharacter() {
  if (!GAME.selectedCharacterId) return;
  const characters = getSavedCharacters().filter((entry) => entry.id !== GAME.selectedCharacterId);
  setSavedCharacters(characters);
  GAME.selectedCharacterId = characters[0]?.id || null;
  renderCharacterMenu();
}

function deleteCharacterById(characterId) {
  if (!characterId) return;
  const characters = getSavedCharacters().filter((entry) => entry.id !== characterId);
  setSavedCharacters(characters);
  if (GAME.selectedCharacterId === characterId) {
    GAME.selectedCharacterId = characters[0]?.id || null;
  }
  renderCharacterMenu();
}

function resetRunState() {
  GAME.started = false;
  GAME.inCombat = false;
  GAME.isBlocking = false;
  GAME.awaitingEnemyTurn = false;
  GAME.currentEnemy = null;
  GAME.roomsCleared = 0;
  GAME.gold = 0;
  GAME.selectedItemId = null;
  GAME.selectedEquipmentId = null;
  GAME.hero = null;
  GAME.isResting = false;
  GAME.pendingLevelUps = 0;
  GAME.isGameOver = false;
  GAME.isRecovering = false;
  GAME.recoveryEndsAt = null;
  GAME.lastPlayerAction = '';
  GAME.lastEnemyAction = '';
  GAME.heroBuffs = [];
  GAME.heroDebuffs = [];
  GAME.heroPoison = null;
  GAME.enemyDebuffs = [];
  GAME.enemyPoison = null;
  updateLastActions('', '', false, false);
}

function roll(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
const LEVEL_UP_MODAL_DELAY = 500;

function addLog(message, type = '') {
  if (!refs.log) return;
  const entry = document.createElement('div');
  entry.className = `log-entry ${type}`.trim();
  entry.innerHTML = message;
  refs.log.appendChild(entry);
  refs.log.scrollTop = refs.log.scrollHeight;
}

function updateLastActions(playerAction, enemyAction, playerCrit = null, enemyCrit = null) {
  if (typeof playerAction === 'string') GAME.lastPlayerAction = playerAction;
  if (typeof enemyAction === 'string') GAME.lastEnemyAction = enemyAction;
  if (typeof playerCrit === 'boolean') GAME.lastPlayerActionCrit = playerCrit;
  if (typeof enemyCrit === 'boolean') GAME.lastEnemyActionCrit = enemyCrit;

  const playerActionEl = document.getElementById('player-last-action');
  const enemyActionEl = document.getElementById('enemy-last-action');
  const renderAction = (text, side, isCrit) => {
    const missValueFirstMatch = String(text || '').match(/^(Raté)\s*:\s*(.+)$/i);
    if (missValueFirstMatch) {
      const [, value, label] = missValueFirstMatch;
      return `<span class="combat-action-content combat-action-content-${side}"><span class="combat-action-label">${label}</span><span class="combat-action-value is-miss">${value}</span></span>`;
    }

    const missValueLastMatch = String(text || '').match(/^(.+?)\s*:\s*(Raté)$/i);
    if (missValueLastMatch) {
      const [, label, value] = missValueLastMatch;
      return `<span class="combat-action-content combat-action-content-${side}"><span class="combat-action-label">${label}</span><span class="combat-action-value is-miss">${value}</span></span>`;
    }

    const valueFirstMatch = String(text || '').match(/^(\d+[%]?)\s*:\s*(.+)$/);
    if (valueFirstMatch) {
      const [, value, label] = valueFirstMatch;
      return `<span class="combat-action-content combat-action-content-${side}"><span class="combat-action-label">${label}</span><span class="combat-action-value${isCrit ? ' is-crit' : ''}">${value}</span></span>`;
    }

    const valueLastMatch = String(text || '').match(/^(.+?)\s*:\s*(\d+[%]?)$/);
    if (valueLastMatch) {
      const [, label, value] = valueLastMatch;
      return `<span class="combat-action-content combat-action-content-${side}"><span class="combat-action-label">${label}</span><span class="combat-action-value${isCrit ? ' is-crit' : ''}">${value}</span></span>`;
    }

    return `<span class="combat-action-content combat-action-content-${side}"><span class="combat-action-label">${String(text || '')}</span></span>`;
  };
  if (playerActionEl) playerActionEl.innerHTML = renderAction(GAME.lastPlayerAction, 'player', GAME.lastPlayerActionCrit);
  if (enemyActionEl) enemyActionEl.innerHTML = renderAction(GAME.lastEnemyAction, 'enemy', GAME.lastEnemyActionCrit);
}

function formatLootEntries(entries) {
  if (!entries || !entries.length) return '<strong>Aucun butin</strong>';
  return entries.map((entry) => {
    const item = entry.item || entry;
    const quantity = entry.quantity || 1;
    const prefix = quantity > 1 ? `${quantity}x ` : '';
    return `${item.icon || '📦'} ${prefix}${item.name}`;
  }).join('<br>');
}

function showPopup(type, data = {}) {
  let title = 'Information';
  let body = '';

  if (type === 'victory') {
    title = 'Victoire';
    body = `<strong>EXP gagnée :</strong> ${data.xpReward}<br><strong>Or gagné :</strong> ${data.goldReward || 0}<br><br><strong>Butin :</strong><br>${formatLootEntries(data.loot)}`;
  } else if (type === 'defeat') {
    title = 'Défaite';
    body = `${data.heroName} a été totalement saturée à la salle ${data.room}, niveau ${data.level}.`;
  } else if (type === 'trap') {
    title = 'Piège';
    body = `<strong>${data.trapName || 'Piège de gavage'}</strong><br><br><strong>Effet :</strong> ${data.effect}`;
  } else if (type === 'chest') {
    title = 'Coffre';
    body = `<strong>Contenu du coffre :</strong><br>${formatLootEntries(data.contents)}`;
  }

  GAME.pendingModalAction = typeof data.onContinue === 'function' ? data.onContinue : null;
  refs.modalTitle.textContent = title;
  refs.modalText.innerHTML = body;
  refs.modalStatChoices.classList.add('hidden');
  refs.modalStatChoices.innerHTML = '';
  refs.modalConfirm.textContent = 'Continuer';
  refs.modalConfirm.classList.remove('hidden');
  refs.modalRestart.classList.add('hidden');
  refs.modalClose.classList.add('hidden');
  refs.modal.style.display = 'block';
}

function formatCountdown(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${minutes}:${seconds}`;
}

function showRecoveryModal(timeLeftSeconds) {
  refs.modal.style.display = 'none';
  refs.modalStatChoices.classList.add('hidden');
  refs.modalStatChoices.innerHTML = '';
  refs.modalConfirm.classList.add('hidden');
  refs.modalRestart.classList.add('hidden');
  refs.modalClose.classList.add('hidden');
  GAME.pendingModalAction = null;
  if (refs.recoveryText) {
    refs.recoveryText.innerHTML = `Vous êtes transportée d'urgence à la salle de remise en forme.<br>Temps d'attente : <strong>${formatCountdown(timeLeftSeconds)}</strong>`;
  }
}

function finishDefeatRecovery() {
  if (GAME.restInterval) clearInterval(GAME.restInterval);
  GAME.restInterval = null;
  GAME.isRecovering = false;
  GAME.recoveryEndsAt = null;
  updateLastActions('', '', false, false);
  GAME.hero.ps = 0;
  GAME.hero.energy = GAME.hero.maxEnergy;
  refs.modal.style.display = 'none';
  refs.modalConfirm.classList.remove('hidden');
  addLog(`Après un passage en salle de remise en forme, <strong>${GAME.hero.name}</strong> repart à l'exploration avec <strong>0 PS</strong> et toute son énergie.`, 'gain');
  renderGame();
}

function resumeDefeatRecovery() {
  if (!GAME.hero || !GAME.isRecovering || !GAME.recoveryEndsAt) return;
  if (GAME.restInterval) clearInterval(GAME.restInterval);

  const tick = () => {
    const timeLeftSeconds = Math.max(0, Math.ceil((GAME.recoveryEndsAt - Date.now()) / 1000));
    if (timeLeftSeconds <= 0) {
      finishDefeatRecovery();
      return;
    }
    showRecoveryModal(timeLeftSeconds);
  };

  tick();
  if (!GAME.isRecovering) return;
  GAME.restInterval = setInterval(tick, 1000);
}
function shakeElement(el) {
  el.classList.remove('shake'); void el.offsetWidth; el.classList.add('shake');
  setTimeout(() => el.classList.remove('shake'), 420);
}
function classAdjustedStats(baseStats, className) {
  const adjusted = { ...baseStats };
  const bonus = CLASS_DATA[className].baseAdjust;
  Object.keys(adjusted).forEach((key) => { adjusted[key] += bonus[key] || 0; });
  return adjusted;
}
function getHeroSprite(hero, fullnessPct) {
  const spriteSet = hero.maxPs >= 500
    ? HERO_SPRITES.max500
    : hero.maxPs >= 300
      ? HERO_SPRITES.max300
      : HERO_SPRITES.normal;
  for (const entry of spriteSet) if (fullnessPct >= entry.limit) return entry.sprite;
  return spriteSet[spriteSet.length - 1].sprite;
}


function getEffectiveHeroStats(hero) {
  const effective = { ...hero.stats };

  GAME.heroDebuffs.forEach((debuff) => {
    const targets = debuff.stats || ['FOR', 'RAP', 'META'];

    targets.forEach((stat) => {
      if (effective[stat] !== undefined) {
        effective[stat] = Math.max(1, effective[stat] - debuff.amount);
      }
    });
  });

  return effective;
}

function getEffectiveEnemyStats(enemy) {
  const effective = { ...(enemy.stats || {}) };
  GAME.enemyDebuffs.forEach((debuff) => {
    if (effective[debuff.stat] !== undefined) {
      effective[debuff.stat] = Math.max(1, effective[debuff.stat] - debuff.amount);
    }
  });
  return effective;
}

function refreshEnemyDerived() {
  if (!GAME.currentEnemy) return null;
  GAME.currentEnemy.derived = getMonsterDerived(GAME.currentEnemy);
  if (!GAME.currentEnemy.maxHp) {
    GAME.currentEnemy.maxHp = GAME.currentEnemy.derived.maxHp;
  }
  GAME.currentEnemy.hp = Math.min(GAME.currentEnemy.hp, GAME.currentEnemy.maxHp);
  GAME.currentEnemy.description = GAME.currentEnemy.boss ? `Boss • ${getEnemyDescription(GAME.currentEnemy)}` : getEnemyDescription(GAME.currentEnemy);
  return GAME.currentEnemy.derived;
}

function redistributeEnemyStatsByArchetype(baseStats, archetype) {
  const total = Math.max(3, (baseStats.FOR || 0) + (baseStats.RAP || 0) + (baseStats.DEF || 0));
  let FOR = 1;
  let RAP = 1;
  let DEF = 1;

  if (archetype === 'Brute') {
    FOR = Math.max(1, Math.floor(total * 0.5));
    DEF = Math.max(1, Math.floor(total * 0.3));
    RAP = Math.max(1, total - FOR - DEF);
  } else if (archetype === 'Rapide') {
    RAP = Math.max(1, Math.floor(total * 0.5));
    FOR = Math.max(1, Math.floor(total * 0.3));
    DEF = Math.max(1, total - RAP - FOR);
  } else if (archetype === 'Gardien') {
    DEF = Math.max(1, Math.floor(total * 0.5));
    FOR = Math.max(1, Math.floor(total * 0.3));
    RAP = Math.max(1, total - DEF - FOR);
  } else {
    FOR = Math.max(1, baseStats.FOR || 1);
    RAP = Math.max(1, baseStats.RAP || 1);
    DEF = Math.max(1, baseStats.DEF || 1);
  }

  return { FOR, RAP, DEF };
}

function scaleEnemyStatsByLevel(template, level) {
  const levelBonus = Math.max(0, level - 1);
  const scaled = {
    FOR: (template.stats.FOR || 1) + Math.floor(levelBonus / 2),
    RAP: (template.stats.RAP || 1) + Math.floor(levelBonus / 2),
    DEF: (template.stats.DEF || 1) + Math.floor(levelBonus / 2),
  };

  if (template.archetype === 'Brute') scaled.FOR += levelBonus;
  else if (template.archetype === 'Rapide') scaled.RAP += levelBonus;
  else if (template.archetype === 'Gardien') scaled.DEF += levelBonus;

  return scaled;
}

function createEnemyFromTemplate(template, level) {
  const enemy = JSON.parse(JSON.stringify(template));
  enemy.level = level;
  enemy.stats = scaleEnemyStatsByLevel(template, level);
  return enemy;
}

function getMonsterDerived(enemy) {
  const effectiveStats = getEffectiveEnemyStats(enemy);
  const stats = redistributeEnemyStatsByArchetype(effectiveStats, enemy.archetype);

  const maxHp = Math.max(1, 52 + stats.DEF * 12 + enemy.level * 10 + GAME.roomsCleared * 3 + GAME.hero.level * 4);
  const atk = Math.max(1, 4 + stats.FOR * 2 + enemy.level);
  const dmgMin = Math.max(1, atk - 4);
  const dmgMax = Math.max(dmgMin, atk + 3);
  const evasion = Math.min(45, 4 + stats.RAP * 2);
  const crit = Math.min(55, 5 + Math.floor(stats.RAP * 1.5));

  return { stats, maxHp, atk, dmgMin, dmgMax, evasion, crit };
}

function getEnemyDescription(enemy) {
  const statsText = `Type : ${enemy.archetype} • FOR ${enemy.derived.stats.FOR} • RAP ${enemy.derived.stats.RAP} • DEF ${enemy.derived.stats.DEF}`;
  if (enemy.archetype === 'Gardien') {
    return `${statsText} • Coca : dégâts + poison 2 tours + malus ${enemy.level + 2} sur 2 tours`;
  }
  return statsText;
}

function tickHeroStatuses() {
  if (!GAME.inCombat || !GAME.currentEnemy) return;

  if (GAME.heroPoison && GAME.heroPoison.turns > 0) {
    GAME.heroPoison.turns -= 1;
    const poisonAmount = GAME.heroPoison.amount;
    updateLastActions(null, `${poisonAmount} : Poison`, null, false);
    applySatietyToHero(poisonAmount, `🥤 Le coca continue d’agir : <strong>+${poisonAmount} PS</strong>.`, 'loss');
    if (GAME.heroPoison.turns <= 0) {
      GAME.heroPoison = null;
      addLog('L’effet de poison du coca se dissipe.', 'info');
    }
  }

  if (!GAME.inCombat) return;

  if (GAME.heroBuffs.length) {
    GAME.heroBuffs = GAME.heroBuffs
      .map((buff) => {
        if (buff.justApplied) return { ...buff, justApplied: false };
        return { ...buff, turns: buff.turns - 1 };
      })
      .filter((buff) => buff.turns > 0);
  }

  if (GAME.heroDebuffs.length) {
    GAME.heroDebuffs = GAME.heroDebuffs
      .map((debuff) => ({ ...debuff, turns: debuff.turns - 1 }))
      .filter((debuff) => debuff.turns > 0);

    if (!GAME.heroDebuffs.length) {
      addLog('Tes stats reviennent à la normale.', 'gain');
    }
  }

  renderGame();
}

function applyTankCoca() {
  const enemy = GAME.currentEnemy;
  const derivedHero = getHeroDerived(GAME.hero);
  const baseSatiety = roll(enemy.derived.dmgMin, enemy.derived.dmgMax);
  const crit = roll(1, 100) <= enemy.derived.crit;
  let satiety = crit ? Math.floor(baseSatiety * 1.5) : baseSatiety;
  satiety = Math.max(1, satiety - Math.floor(derivedHero.def / 3));
  if (GAME.isBlocking) {
    satiety = Math.max(1, Math.floor(satiety * 0.45));
    addLog('Tu encaisses une partie du choc grâce à ta défense.', 'info');
    GAME.isBlocking = false;
  }

  updateLastActions(null, `${satiety} : Coca`, null, crit);
  applySatietyToHero(satiety, `🥤 ${enemy.name} utilise <strong>Coca</strong> et te remplit de <strong>${satiety}</strong> PS !${crit ? ' <span class="critical">CRITIQUE !</span>' : ''}`);
  if (!GAME.inCombat) return;

  const poisonAmount = Math.max(1, Math.floor(enemy.derived.stats.FOR / 2) + Math.floor(enemy.level / 2));
  const statMalus = Math.floor(enemy.level / 2) + 2;
  const statTarget = ['FOR', 'RAP', 'META'][roll(0, 2)];
  GAME.heroPoison = { amount: poisonAmount, turns: 2 };
  GAME.heroDebuffs = [{
    stats: [statTarget],
    amount: statMalus,
    turns: 2
  }];
  addLog(`Le coca t’empoisonne pour <strong>2 tours</strong> et applique un malus de <strong>${statMalus}</strong> à <strong>${statTarget}</strong> pendant <strong>2 tours</strong>.`, 'loss');
  renderGame();
}

function getHeroDerived(hero) {
  const stats = getEffectiveHeroStats(hero);
  const weapon = hero.equipment.weapon;
  const armor = hero.equipment.armor;
  const weaponAtk = weapon?.atk || 0;
  const weaponEnergy = weapon?.energy || 0;
  const weaponCrit = weapon?.crit || 0;
  const weaponDef = weapon?.def || 0;
  const armorDef = armor?.def || 0;
  const armorEnergy = armor?.energy || 0;
  const armorHp = armor?.hp || 0;
  const armorEva = armor?.evasion || 0;

  const maxPs = 52 + stats.CAP * 12 + hero.level * 10 + armorHp;
  const maxEnergy = 18 + stats.META * 8 + hero.level * 4 + weaponEnergy + armorEnergy;
  const atkBuffMultiplier = GAME.heroBuffs.reduce((multiplier, buff) => {
    if (buff.stat === 'ATK_PERCENT') return multiplier * (1 + buff.amount);
    return multiplier;
  }, 1);
  const atk = Math.max(1, Math.floor((4 + stats.FOR * 2 + hero.level + weaponAtk) * atkBuffMultiplier));
  const def = Math.max(0, Math.floor(stats.CAP * 0.8) + armorDef + weaponDef);
  const evasion = Math.min(45, 4 + stats.RAP * 2 + armorEva + (hero.className === 'Assassin' ? 5 : 0));
  const crit = Math.min(55, 5 + Math.floor(stats.RAP * 1.5) + weaponCrit + (hero.className === 'Assassin' ? 8 : 0));
  const digestPower = Math.max(10, 12 + hero.level * 2 + stats.META * 4 + Math.floor(stats.FOR * 1.5));
  return { maxPs, maxEnergy, atk, def, evasion, crit, digestPower };
}

function syncHeroCaps(fillResources = false) {
  const derived = getHeroDerived(GAME.hero);
  GAME.hero.maxPs = derived.maxPs;
  GAME.hero.maxEnergy = derived.maxEnergy;
  if (fillResources) {
    GAME.hero.ps = 0;
    GAME.hero.energy = derived.maxEnergy;
  } else {
    GAME.hero.ps = Math.min(GAME.hero.ps, derived.maxPs);
    GAME.hero.energy = Math.min(GAME.hero.energy, derived.maxEnergy);
  }
  return derived;
}

function itemDescription(item) {
  const bits = [];
  if (item.atk) bits.push(`+${item.atk} ATK`);
  if (item.def) bits.push(`+${item.def} DEF`);
  if (item.hp) bits.push(`+${item.hp} PS max`);
  if (item.energy) bits.push(`+${item.energy} énergie max`);
  if (item.crit) bits.push(`+${item.crit}% crit`);
  if (item.evasion) bits.push(`+${item.evasion}% esquive`);
  if (item.type === 'consumable') bits.push(item.effectText || 'Consommable');
  if (item.itemLevel) bits.push(`Niv. ${item.itemLevel}`);
  return bits.join(' • ');
}
function stackKey(item) { return `${item.type}:${item.name}`; }

function scaleLootItem(item, level = GAME.hero.level) {
  if (!item || item.type === 'consumable') return JSON.parse(JSON.stringify(item));
  const scaled = JSON.parse(JSON.stringify(item));
  const itemLevel = Math.max(1, level || 1);
  const bonus = Math.max(0, itemLevel - 1);
  scaled.itemLevel = itemLevel;

  if (typeof scaled.atk === 'number') scaled.atk += Math.floor(bonus * 0.8);
  if (typeof scaled.def === 'number') scaled.def += Math.floor(bonus * 0.6);
  if (typeof scaled.hp === 'number') scaled.hp += Math.floor(bonus * 3);
  if (typeof scaled.energy === 'number') scaled.energy += Math.floor(bonus * 1.5);
  if (typeof scaled.crit === 'number') scaled.crit += Math.floor(bonus * 0.4);
  if (typeof scaled.evasion === 'number') scaled.evasion += Math.floor(bonus * 0.4);

  return scaled;
}

function renderCombatStats(rows) {
  return rows.map((row) => {
    if (row.type === 'spacer') {
      return '<div class="combat-stat-spacer" aria-hidden="true"></div>';
    }

    const colorClass = {
      ATK: 'is-atk',
      DEF: 'is-def',
      RES: 'is-res',
      ESQ: 'is-esq',
      CRIT: 'is-crit'
    }[row.key] || 'is-base';

    return `<div class="combat-stat-line ${colorClass}"><strong>${row.key} :</strong><span>${row.value}</span></div>`;
  }).join('');
}

function createDigestPotion(amount = 35 + GAME.hero.level * 3) {
  return { name: 'Potion digestive', type: 'consumable', stackable: true, digest: amount, effectText: `Retire ${amount} PS`, icon: '🧪' };
}
function createEnergyPotion(amount = 30 + GAME.hero.level * 2) {
  return { name: 'Potion d’énergie', type: 'consumable', stackable: true, energyRestore: amount, effectText: `Restaure ${amount} énergie`, icon: '🔵' };
}

function addItemToInventory(item, quantity = 1) {
  const hero = GAME.hero; const key = stackKey(item);
  if (item.stackable) {
    const existing = hero.inventory.find((entry) => entry.stackKey === key);
    if (existing) { existing.quantity += quantity; return existing; }
  }
  const inventoryItem = { id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`, stackKey: key, quantity, ...JSON.parse(JSON.stringify(item)) };
  hero.inventory.push(inventoryItem); return inventoryItem;
}
function removeInventoryItem(itemId, quantity = 1) {
  const hero = GAME.hero; const idx = hero.inventory.findIndex((entry) => entry.id === itemId); if (idx === -1) return;
  const item = hero.inventory[idx];
  let removed = false;
  if (item.stackable) {
    item.quantity -= quantity;
    if (item.quantity <= 0) {
      hero.inventory.splice(idx, 1);
      removed = true;
    }
  }
  else {
    hero.inventory.splice(idx, 1);
    removed = true;
  }
  if (GAME.selectedItemId === itemId && removed) GAME.selectedItemId = hero.inventory[0]?.id || null;
}
function getSelectedItem() { return GAME.hero.inventory.find((item) => item.id === GAME.selectedItemId) || null; }
function getSelectedEquipmentItem() {
  const equippedItems = [GAME.hero.equipment.weapon, GAME.hero.equipment.armor].filter(Boolean);
  return equippedItems.find((item) => item.id === GAME.selectedEquipmentId) || null;
}
function isEquipped(item) { return GAME.hero.equipment.weapon?.id === item.id || GAME.hero.equipment.armor?.id === item.id; }

function canStartAdventure() {
  return !!refs.heroName.value.trim() && CREATION.points === 0;
}

function renderCreation() {
  refs.classGrid.innerHTML = '';
  Object.keys(CLASS_DATA).forEach((className) => {
    const btn = document.createElement('button');
    btn.className = `class-btn ${CREATION.className === className ? 'active' : ''}`;
    btn.innerHTML = `<span class="class-emoji">${CLASS_DATA[className].emoji}</span>${className}`;
    btn.onclick = () => { CREATION.className = className; renderCreation(); };
    refs.classGrid.appendChild(btn);
  });

  refs.creationStatList.innerHTML = '';
  ['FOR', 'RAP', 'CAP', 'META'].forEach((stat) => {
    const row = document.createElement('div'); row.className = 'stat-row';
    const desc = { FOR:'augmente les dégâts', CAP:'augmente les PS max', RAP:'augmente esquive et crit', META:'augmente l\'énergie' }[stat];
    row.innerHTML = `<div><div><strong>${stat}</strong></div><div class="stat-desc">${desc}</div></div>
      <button class="adjust-btn minus" ${CREATION.stats[stat] <= 1 ? 'disabled' : ''}>−</button>
      <div class="stat-value">${CREATION.stats[stat]}</div>
      <button class="adjust-btn" ${CREATION.points <= 0 ? 'disabled' : ''}>+</button>`;
    const [minusBtn, plusBtn] = row.querySelectorAll('button');
    minusBtn.onclick = () => { if (CREATION.stats[stat] > 1) { CREATION.stats[stat]--; CREATION.points++; renderCreation(); } };
    plusBtn.onclick = () => { if (CREATION.points > 0) { CREATION.stats[stat]++; CREATION.points--; renderCreation(); } };
    refs.creationStatList.appendChild(row);
  });

  refs.creationPoints.textContent = CREATION.points;
  const previewStats = classAdjustedStats(CREATION.stats, CREATION.className);
  refs.previewEmoji.textContent = CLASS_DATA[CREATION.className].emoji;
  refs.previewName.textContent = refs.heroName.value.trim() || 'Aventurière';
  refs.previewClass.textContent = CREATION.className;
  refs.previewFor.textContent = previewStats.FOR;
  refs.previewCap.textContent = previewStats.CAP;
  refs.previewRap.textContent = previewStats.RAP;
  refs.previewMeta.textContent = previewStats.META;
  refs.classBonuses.innerHTML = CLASS_DATA[CREATION.className].bonuses.map((b) => `<li>${b}</li>`).join('');
  refs.startBtn.disabled = !canStartAdventure();
  scheduleViewportFit();
}

function createStartingInventory(className) {
  const inventory = [];
  const push = (item, q = 1) => {
    if (item.stackable) {
      const existing = inventory.find((i) => i.name === item.name && i.type === item.type);
      if (existing) existing.quantity += q;
      else inventory.push({ ...item, id: `${Date.now()}-${Math.random()}`, stackKey: stackKey(item), quantity: q });
    } else inventory.push({ ...item, id: `${Date.now()}-${Math.random()}`, stackKey: stackKey(item), quantity: q });
  };
  push({ name:'Potion digestive', type:'consumable', stackable:true, quantity:1, digest:35, effectText:'Retire 35 PS', icon:'🧪' }, 3);
  push({ name:'Potion d’énergie', type:'consumable', stackable:true, quantity:1, energyRestore:30, effectText:'Restaure 30 énergie', icon:'🔵' }, 2);
  if (className === 'Guerrière') push({ name:'Épée du recrue', type:'weapon', slot:'weapon', atk:3, rarity:'Départ', icon:'⚔️' });
  if (className === 'Assassin') push({ name:'Dagues jumelles', type:'weapon', slot:'weapon', atk:3, crit:4, rarity:'Départ', icon:'🗡️' });
  if (className === 'Gardien') push({ name:'Épée du recrue', type:'weapon', slot:'weapon', atk:3, rarity:'Départ', icon:'⚔️' });
  push({ name:'Tenue de voyage', type:'armor', slot:'armor', def:1, rarity:'Départ', icon:'👚' });
  return inventory;
}

function startGame() {
  const pseudo = refs.heroName.value.trim(); if (!canStartAdventure()) return;
  const finalStats = classAdjustedStats(CREATION.stats, CREATION.className);
  GAME.gold = 0;
  GAME.hero = { id: makeCharacterId(), name:pseudo, className:CREATION.className, emoji:CLASS_DATA[CREATION.className].emoji, level:1, xp:0, xpNext:100,
    stats:finalStats, ps:0, maxPs:1, energy:1, maxEnergy:1, inventory:createStartingInventory(CREATION.className), equipment:{ weapon:null, armor:null } };
  const startWeapon = GAME.hero.inventory.find((item) => item.slot === 'weapon');
  const startArmor = GAME.hero.inventory.find((item) => item.slot === 'armor');
  GAME.hero.equipment.weapon = startWeapon || null; GAME.hero.equipment.armor = startArmor || null;
  syncHeroCaps(true); GAME.started = true;
  GAME.inCombat = false; GAME.isBlocking = false; GAME.awaitingEnemyTurn = false; GAME.currentEnemy = null; GAME.roomsCleared = 0;
  GAME.pendingLevelUps = 0; GAME.isGameOver = false; GAME.heroBuffs = []; GAME.heroDebuffs = []; GAME.heroPoison = null; GAME.enemyDebuffs = []; GAME.enemyPoison = null;
  GAME.selectedEquipmentId = startWeapon?.id || startArmor?.id || null;
  GAME.selectedItemId = GAME.hero.inventory.find((item) => !isEquipped(item))?.id || null;
  refs.creationScreen.classList.add('hidden'); refs.gameScreen.classList.remove('hidden');
  updateLastActions('', '', false, false);
  renderGame(); saveGameState(); renderCharacterMenu();
}

function renderEnemySection() {
  const enemy = GAME.currentEnemy;
  const hpText = document.getElementById('enemy-hp-text');
  const hpBar = document.getElementById('enemy-hp-bar');
  const hpBarExplore = document.getElementById('enemy-hp-bar-explore');
  const hpInline = document.getElementById('enemy-hp-inline');
  const name = document.getElementById('enemy-name');
  const sprite = document.getElementById('enemy-sprite');
  const sub = document.getElementById('enemy-sub');
  const chip = document.getElementById('enemy-status-chip');
  if (enemy) {
    const hpRatio = `${Math.max(0, enemy.hp) / enemy.maxHp * 100}%`;
    name.textContent = GAME.inCombat ? `${enemy.name} (Niv.${enemy.level})` : enemy.name;
    sprite.src = enemy.sprite; sprite.alt = enemy.name; hpText.textContent = `${Math.max(0, Math.ceil(enemy.hp))} / ${enemy.maxHp}`;
    hpInline.innerHTML = `<span>PV</span><span class="bar-value">${Math.max(0, Math.ceil(enemy.hp))}/${enemy.maxHp}</span>`;
    hpBar.style.width = hpRatio; hpBarExplore.style.width = hpRatio;
    sub.textContent = enemy.description || `Niveau ennemi ${enemy.level}`;
    chip.textContent = GAME.inCombat ? '' : 'Présence hostile';
  } else {
    name.textContent = 'Porte du Donjon'; sprite.src = DOOR_SPRITE; sprite.alt = 'Porte du Donjon'; hpText.textContent = '—';
    hpInline.innerHTML = `<span>PV</span><span class="bar-value">—</span>`;
    hpBar.style.width = '0%'; hpBarExplore.style.width = '0%';
    sub.textContent = 'Une aventure t’attend'; chip.textContent = 'Exploration';
  }
}

function renderInventory() {
  const bagItems = GAME.hero.inventory.filter((item) => !isEquipped(item)); refs.inventoryList.innerHTML = '';
  if (!bagItems.length) {
    refs.inventoryList.innerHTML = '<div class="item-row"><div class="item-name">Sac vide</div><div class="item-meta">Aucun objet non équipé.</div></div>';
    refs.btnUseItem.disabled = refs.btnEquipItem.disabled = refs.btnDropItem.disabled = true; return;
  }
  if (!bagItems.find((item) => item.id === GAME.selectedItemId)) GAME.selectedItemId = bagItems[0]?.id || null;
  bagItems.forEach((item) => {
    const row = document.createElement('div'); row.className = `item-row ${item.id === GAME.selectedItemId ? 'selected' : ''}`;
    const quantity = item.stackable ? ` x${item.quantity}` : '';
    row.innerHTML = `<div class="item-name">${item.icon || '📦'} ${item.name}${quantity}</div><div class="item-meta">${item.rarity || 'Objet'}<br>${itemDescription(item) || 'Aucun bonus affiché'}</div>`;
    row.onclick = () => { GAME.selectedItemId = item.id; renderInventory(); }; refs.inventoryList.appendChild(row);
  });
  const selected = getSelectedItem();
  refs.btnUseItem.disabled = !selected || selected.type !== 'consumable';
  refs.btnEquipItem.disabled = !selected || !['weapon', 'armor'].includes(selected.type);
  refs.btnDropItem.disabled = !selected || GAME.isResting;
}

function renderEquipment() {
  refs.equipmentList.innerHTML = '';
  const equippedItems = [GAME.hero.equipment.weapon, GAME.hero.equipment.armor].filter(Boolean);
  if (!equippedItems.length) {
    refs.equipmentList.innerHTML = '<div class="item-row"><div class="item-name">Aucun équipement</div><div class="item-meta">Tu n’as rien d’équipé.</div></div>';
    refs.btnUseEquipped.disabled = refs.btnEquipEquipped.disabled = refs.btnDropEquipped.disabled = true; return;
  }
  if (!equippedItems.find((item) => item.id === GAME.selectedEquipmentId)) GAME.selectedEquipmentId = equippedItems[0]?.id || null;
  equippedItems.forEach((item) => {
    const row = document.createElement('div'); row.className = `item-row ${item.id === GAME.selectedEquipmentId ? 'selected' : ''}`;
    const slotLabel = item.slot === 'weapon' ? 'Arme équipée' : 'Tenue équipée';
    row.innerHTML = `<div class="item-name">${item.icon || '📦'} ${item.name}</div><div class="item-meta">${slotLabel}<br>${itemDescription(item) || 'Aucun bonus affiché'}</div>`;
    row.onclick = () => { GAME.selectedEquipmentId = item.id; renderEquipment(); }; refs.equipmentList.appendChild(row);
  });
  const selected = getSelectedEquipmentItem();
  refs.btnUseEquipped.disabled = true; refs.btnEquipEquipped.disabled = true; refs.btnDropEquipped.disabled = !selected;
}

function renderGame() {
  const hero = GAME.hero; const derived = syncHeroCaps(false);
  const effectiveStats = getEffectiveHeroStats(hero);
  const fullnessPct = Math.round((hero.ps / hero.maxPs) * 100);
  const heroSprite = getHeroSprite(hero, fullnessPct);
  const psRatio = `${hero.ps / hero.maxPs * 100}%`;
  const energyRatio = `${hero.energy / hero.maxEnergy * 100}%`;
  const battlefield = document.querySelector('.battlefield');
  const playerCard = document.getElementById('player-card');
  const enemyCard = document.getElementById('enemy-card');
  const playerExploreBar = document.querySelector('#player-card .exploration-bar-wrap');
  const playerBattleSub = document.getElementById('player-battle-sub');
  const playerStatusChip = document.getElementById('player-status-chip');
  document.getElementById('player-class-mini').innerHTML = `${hero.className} — Niveau <span id="p-level">${hero.level}</span>`;
  document.getElementById('player-battle-img').src = heroSprite;
  document.getElementById('player-battle-name').textContent = GAME.inCombat ? `${hero.name} (Niv.${hero.level})` : '\u00A0';
  document.getElementById('player-battle-sub').textContent = `${hero.className} prête au combat`;
  document.getElementById('player-status-chip').textContent = GAME.inCombat ? '' : 'En exploration';

  if (battlefield && playerCard && enemyCard) {
    battlefield.style.gridTemplateColumns = GAME.inCombat ? '' : 'minmax(0, 1fr)';
    enemyCard.style.display = GAME.inCombat ? '' : 'none';
    playerCard.style.width = GAME.inCombat ? '' : 'min(100%, 960px)';
    playerCard.style.margin = GAME.inCombat ? '' : '0 auto';
    playerCard.style.minHeight = GAME.inCombat ? '' : '320px';
  }
  if (playerExploreBar) playerExploreBar.style.display = GAME.inCombat ? '' : 'none';
  if (playerBattleSub) playerBattleSub.style.display = GAME.inCombat ? '' : 'none';
  if (playerStatusChip) playerStatusChip.style.display = 'none';

  document.getElementById('p-ps-text').textContent = `${Math.ceil(hero.ps)} / ${hero.maxPs}`;
  document.getElementById('p-ps-bar').style.width = psRatio;
  document.getElementById('player-card-ps').textContent = `${Math.ceil(hero.ps)} / ${hero.maxPs}`;
  document.getElementById('player-card-ps-bar').style.width = psRatio;
  document.getElementById('player-card-ps-bar-explore').style.width = psRatio;
  document.getElementById('player-card-ps-inline').innerHTML = `<span>PS</span><span class="bar-value">${Math.ceil(hero.ps)}/${hero.maxPs}</span>`;
  document.getElementById('p-energy-text').textContent = `${Math.ceil(hero.energy)} / ${hero.maxEnergy}`;
  document.getElementById('p-energy-bar').style.width = energyRatio;
  document.getElementById('player-card-energy-bar').style.width = energyRatio;
  document.getElementById('player-card-energy-inline').innerHTML = `<span>ÉNERGIE</span><span class="bar-value">${Math.ceil(hero.energy)}/${hero.maxEnergy}</span>`;
  document.getElementById('p-xp-text').textContent = `${hero.xp} / ${hero.xpNext}`;
  document.getElementById('p-xp-bar').style.width = `${hero.xp / hero.xpNext * 100}%`;

  document.getElementById('p-for').textContent = effectiveStats.FOR;
  document.getElementById('p-cap').textContent = effectiveStats.CAP;
  document.getElementById('p-rap').textContent = effectiveStats.RAP;
  document.getElementById('p-meta').textContent = effectiveStats.META;
  document.getElementById('p-atk').textContent = derived.atk;
  document.getElementById('p-def').textContent = derived.def;
  document.getElementById('p-evasion').textContent = `${derived.evasion}%`;
  document.getElementById('p-crit').textContent = `${derived.crit}%`;
  document.getElementById('gold-count').textContent = GAME.gold;
  document.getElementById('rooms-count').textContent = GAME.roomsCleared;
  refs.skillLabel.textContent = `${CLASS_DATA[hero.className].skillName} (${CLASS_DATA[hero.className].skillCost} énergie)`;
  updateLastActions(GAME.lastPlayerAction, GAME.lastEnemyAction);

  const heroStatsPanel = document.getElementById('combat-player-stats');
  heroStatsPanel.innerHTML = renderCombatStats([
    { key: 'FOR', value: effectiveStats.FOR },
    { key: 'RAP', value: effectiveStats.RAP },
    { key: 'CAP', value: effectiveStats.CAP },
    { key: 'META', value: effectiveStats.META },
    { type: 'spacer' },
    { key: 'ATK', value: derived.atk },
    { key: 'DEF', value: derived.def },
    { key: 'CRIT', value: `${derived.crit}%` },
    { key: 'ESQ', value: `${derived.evasion}%` }
  ]);

  const playerBonusText = document.getElementById('combat-player-bonus-text');
  const playerEffects = [];
  if (GAME.heroBuffs.length) {
    playerEffects.push(...GAME.heroBuffs.map((buff) => {
      if (buff.stat === 'ATK_PERCENT') return `Bonus : +${Math.round(buff.amount * 100)}% ATK (${buff.turns} tour${buff.turns > 1 ? 's' : ''})`;
      return `Bonus : ${buff.stat} (${buff.turns} tour${buff.turns > 1 ? 's' : ''})`;
    }));
  }
  if (GAME.heroPoison?.turns > 0) {
    playerEffects.push(`Poison : +${GAME.heroPoison.amount} PS (${GAME.heroPoison.turns} tour${GAME.heroPoison.turns > 1 ? 's' : ''})`);
  }
  if (GAME.heroDebuffs.length) {
    playerEffects.push(...GAME.heroDebuffs.map((debuff) => {
      const targets = (debuff.stats || ['FOR', 'RAP', 'META']).join(' / ');
      return `Malus : -${debuff.amount} ${targets} (${debuff.turns} tour${debuff.turns > 1 ? 's' : ''})`;
    }));
  }
  if (playerEffects.length) {
    playerBonusText.innerHTML = playerEffects.join('<br>');
  } else {
    playerBonusText.innerHTML = 'Aucun bonus<br>Aucun malus';
  }

  saveGameState();

  refs.gameScreen.classList.toggle('in-combat', GAME.inCombat);
  refs.explorationControls.classList.toggle('hidden', GAME.inCombat || GAME.isGameOver || GAME.isRecovering);
  refs.recoveryControls.classList.toggle('hidden', !GAME.isRecovering);
  refs.combatControls.classList.toggle('hidden', !GAME.inCombat || GAME.isGameOver || GAME.isRecovering);
  refs.defeatControls.classList.toggle('hidden', !GAME.isGameOver);
  refs.btnRestartRun.textContent = 'Continuer';
  refs.btnRestartRun.title = 'Continuer';
  refs.btnRestartRun.innerHTML = 'Continuer<small>Lancer la récupération</small>';
  toggleActionButtons(false); renderEnemySection(); renderCombatEnemyPanels(); renderEquipment(); renderInventory(); scheduleViewportFit();
}

function renderCombatEnemyPanels() {
  const enemyStatsPanel = document.getElementById('combat-enemy-stats');
  const enemyBonus = document.getElementById('combat-enemy-bonus-text');
  if (!GAME.currentEnemy) {
    enemyStatsPanel.innerHTML = renderCombatStats([
      { key: 'FOR', value: 0 },
      { key: 'RAP', value: 0 },
      { key: 'DEF', value: 0 },
      { type: 'spacer' },
      { key: 'ATK', value: 0 },
      { key: 'RES', value: 0 },
      { key: 'CRIT', value: '0%' },
      { key: 'ESQ', value: '0%' }
    ]);
    enemyBonus.innerHTML = 'Aucun bonus<br>Aucun malus';
    return;
  }
  const enemy = GAME.currentEnemy;
  const d = enemy.derived || getMonsterDerived(enemy);
  const stats = getEffectiveEnemyStats(enemy);
  const defenseStat = stats.DEF ?? 0;
  const resistance = Math.floor((d.stats?.DEF ?? defenseStat) / 3);
  enemyStatsPanel.innerHTML = renderCombatStats([
    { key: 'FOR', value: stats.FOR ?? 0 },
    { key: 'RAP', value: stats.RAP ?? 0 },
    { key: 'DEF', value: defenseStat },
    { type: 'spacer' },
    { key: 'ATK', value: d.atk ?? 0 },
    { key: 'RES', value: resistance },
    { key: 'CRIT', value: `${d.crit ?? 0}%` },
    { key: 'ESQ', value: `${d.evasion ?? 0}%` }
  ]);
  const enemyEffects = [];
  if (GAME.enemyPoison?.turns > 0) {
    enemyEffects.push(`Poison : -${GAME.enemyPoison.amount} PV (${GAME.enemyPoison.turns} tour${GAME.enemyPoison.turns > 1 ? 's' : ''})`);
  }
  if (GAME.enemyDebuffs.length) {
    enemyEffects.push(...GAME.enemyDebuffs.map((debuff) => `Malus : -${debuff.amount} ${debuff.stat} (${debuff.turns} tour${debuff.turns > 1 ? 's' : ''})`));
  }
  if (enemyEffects.length) {
    enemyBonus.innerHTML = enemyEffects.join('<br>');
  } else {
    enemyBonus.innerHTML = 'Aucun bonus<br>Aucun malus';
  }
}

function toggleActionButtons(disabled) {
  [refs.btnExplore, refs.btnRest, refs.btnAttack, refs.btnHeavy, refs.btnBlock, refs.btnSkill].forEach((btn) => {
    if (!btn.classList.contains('hidden')) btn.disabled = disabled;
  });
}

function tickEnemyStatuses() {
  if (!GAME.inCombat || !GAME.currentEnemy) return;

  if (GAME.enemyPoison && GAME.enemyPoison.turns > 0) {
    if (GAME.enemyPoison.justApplied) {
      GAME.enemyPoison.justApplied = false;
    } else {
      GAME.enemyPoison.turns -= 1;
      const poisonAmount = GAME.enemyPoison.amount;
      updateLastActions(`Poison : ${poisonAmount}`, null);
      applyDamageToEnemy(poisonAmount, `☠️ Le poison de <strong>Morsure de l'Hydre</strong> inflige <strong>${poisonAmount}</strong> dégâts à ${GAME.currentEnemy.name}.`, 'loss');
    }
    if (GAME.enemyPoison && GAME.enemyPoison.turns <= 0) {
      GAME.enemyPoison = null;
      addLog(`Le poison de ${GAME.currentEnemy.name} se dissipe.`, 'info');
    }
  }

  if (!GAME.inCombat || !GAME.currentEnemy) return;

  if (GAME.enemyDebuffs.length) {
    GAME.enemyDebuffs = GAME.enemyDebuffs
      .map((debuff) => {
        if (debuff.justApplied) return { ...debuff, justApplied: false };
        return { ...debuff, turns: debuff.turns - 1 };
      })
      .filter((debuff) => debuff.turns > 0);

    refreshEnemyDerived();

    if (!GAME.enemyDebuffs.length) {
      addLog(`Les stats de ${GAME.currentEnemy.name} reviennent à la normale.`, 'gain');
    }
  }

  renderGame();
}

function startCombat() {
  const enemyLevel = roll(GAME.hero.level, GAME.hero.level + 2);
  const normalEnemies = BESTIARY.filter((e) => !e.boss);
  const bossTemplate = BESTIARY.find((e) => e.boss);
  const encounterPool = normalEnemies.length ? normalEnemies : BESTIARY;
  const template = (GAME.roomsCleared > 0 && GAME.roomsCleared % 10 === 0 && bossTemplate)
    ? bossTemplate
    : encounterPool[Math.floor(Math.random() * encounterPool.length)];
  GAME.currentEnemy = createEnemyFromTemplate(template, enemyLevel);
  GAME.currentEnemy.derived = getMonsterDerived(GAME.currentEnemy);
  GAME.currentEnemy.maxHp = GAME.currentEnemy.derived.maxHp;
  GAME.currentEnemy.hp = GAME.currentEnemy.maxHp;
  GAME.currentEnemy.description = GAME.currentEnemy.boss ? `Boss • ${getEnemyDescription(GAME.currentEnemy)}` : getEnemyDescription(GAME.currentEnemy);
  GAME.heroBuffs = [];
  GAME.heroPoison = null;
  GAME.heroDebuffs = [];
  GAME.enemyPoison = null;
  GAME.enemyDebuffs = [];
  GAME.inCombat = true; GAME.isBlocking = false;
  updateLastActions('', '');
  renderGame();
}

function applyDamageToEnemy(amount, logText, type = '') {
  GAME.currentEnemy.hp = Math.max(0, GAME.currentEnemy.hp - amount); addLog(logText, type); shakeElement(refs.enemyCard); renderGame();
  if (GAME.currentEnemy.hp <= 0) victory();
}
function applySatietyToHero(amount, logText, type = 'loss') {
  GAME.hero.ps = Math.max(0, GAME.hero.ps + amount); addLog(logText, type); shakeElement(refs.playerCard); renderGame();
  if (GAME.hero.ps >= GAME.hero.maxPs) gameOver();
}

function playerAttack(kind) {
  if (!GAME.inCombat || !GAME.currentEnemy) return;
  const derived = getHeroDerived(GAME.hero);
  if (kind === 'digest') {
    const digest = derived.digestPower;
    const before = GAME.hero.ps;
    GAME.hero.ps = Math.max(0, GAME.hero.ps - digest);
    const recovered = Math.max(0, before - GAME.hero.ps);
    updateLastActions(`Digérer : ${recovered}`, null, false, null);
    addLog(`🍽️ <strong>Digérer</strong> ! Tu libères <strong>${recovered}</strong> PS.`, 'gain');
    renderGame();
    return finishPlayerTurn();
  }

  let hitChance = 88;
  let baseDamage = roll(Math.max(1, derived.atk - 4), derived.atk + 3);
  let critBonus = false;
  if (roll(1, 100) <= derived.crit) { critBonus = true; baseDamage = Math.floor(baseDamage * 1.5); }
  if (roll(1, 100) > hitChance) { updateLastActions('Attaque : Raté', null, false, null); addLog('Ton attaque rate sa cible !', 'info'); return finishPlayerTurn(); }
  const finalDamage = Math.max(1, baseDamage - Math.floor(GAME.currentEnemy.derived.stats.DEF / 3));
  updateLastActions(`Attaque : ${finalDamage}`, null, critBonus, null);
  applyDamageToEnemy(finalDamage, `Tu lances une attaque sur ${GAME.currentEnemy.name} et infliges <strong>${finalDamage}</strong> dégâts.${critBonus ? ' <span class="critical">CRITIQUE !</span>' : ''}`, critBonus ? 'critical' : '');
  if (GAME.inCombat) finishPlayerTurn();
}

function useClassSkill() {
  if (!GAME.inCombat || !GAME.currentEnemy) return;
  const hero = GAME.hero; const derived = getHeroDerived(hero); const cost = CLASS_DATA[hero.className].skillCost;
  if (hero.energy < cost) { addLog('Pas assez d’énergie pour utiliser cette compétence.', 'loss'); return; }
  hero.energy -= cost;

  if (hero.className === 'Guerrière') {
    let baseDamage = roll(Math.max(1, derived.atk - 4), derived.atk + 3);
    let critBonus = false;
    if (roll(1, 100) <= derived.crit) { critBonus = true; baseDamage = Math.floor(baseDamage * 1.5); }
    const dmg = Math.max(1, Math.floor(baseDamage * 1.4) - Math.floor(GAME.currentEnemy.derived.stats.DEF / 3));
    GAME.heroBuffs = [{ stat: 'ATK_PERCENT', amount: 0.2, turns: 3, justApplied: true }];
    updateLastActions(`Punition Frénétique : ${dmg}`, null, critBonus, null);
    applyDamageToEnemy(dmg, `🛡️ <strong>Punition Frénétique</strong> ! Tu frappes ${GAME.currentEnemy.name} pour <strong>${dmg}</strong> dégâts et tu encaisses mieux le prochain coup.${critBonus ? ' <span class="critical">CRITIQUE !</span>' : ''}`, critBonus ? 'critical' : '');
    GAME.isBlocking = true;
  }
  if (hero.className === 'Gardien') {
    let hitChance = 88;
    let baseDamage = roll(Math.max(1, derived.atk - 4), derived.atk + 3);
    let critBonus = false;

    if (roll(1, 100) <= derived.crit) {
      critBonus = true;
      baseDamage = Math.floor(baseDamage * 1.5);
    }

    if (roll(1, 100) > hitChance) {
      updateLastActions("Morsure de l'Hydre : Raté", null, false, null);
      addLog("<strong>Morsure de l'Hydre</strong> rate sa cible !", 'info');
      renderGame();
      if (GAME.inCombat) finishPlayerTurn();
      return;
    }

    const finalDamage = Math.max(1, Math.floor(baseDamage * 0.6) - Math.floor(GAME.currentEnemy.derived.stats.DEF / 3));
    const malusStat = ['FOR', 'RAP', 'DEF'][roll(0, 2)];
    const statusAmount = hero.level + 2;

    updateLastActions(`Morsure de l'Hydre : ${finalDamage}`, null, critBonus, null);
    applyDamageToEnemy(finalDamage, `🐍 <strong>Morsure de l'Hydre</strong> ! Tu frappes ${GAME.currentEnemy.name} pour <strong>${finalDamage}</strong> dégâts.${critBonus ? ' <span class="critical">CRITIQUE !</span>' : ''}`, critBonus ? 'critical' : '');

    if (GAME.inCombat && GAME.currentEnemy) {
      GAME.enemyPoison = { amount: statusAmount, turns: 3, justApplied: true };
      GAME.enemyDebuffs.push({ stat: malusStat, amount: statusAmount, turns: 3, justApplied: true });
      refreshEnemyDerived();
      addLog(`☠️ ${GAME.currentEnemy.name} est empoisonné pendant <strong>3 tours</strong> : <strong>${statusAmount}</strong> dégâts par tour.`, 'loss');
      addLog(`🌀 ${GAME.currentEnemy.name} subit un malus de <strong>${statusAmount}</strong> en <strong>${malusStat}</strong> pendant <strong>3 tours</strong>.`, 'loss');
    }
  }
  if (hero.className === 'Assassin') {
    let dmg = Math.max(1, Math.floor(roll(derived.atk + 5, derived.atk + 13) * 1.2));
    const realCrit = roll(1, 100) <= derived.crit;
    if (realCrit) dmg = Math.floor(dmg * 1.5);
    updateLastActions(`Assassinat : ${dmg}`, null, realCrit, null);
    applyDamageToEnemy(dmg, `🗡️ <strong>Assassinat</strong> ! Tu frappes ${GAME.currentEnemy.name} pour <strong>${dmg}</strong> dégâts.${realCrit ? ' <span class="critical">Critique réel !</span>' : ''}`, 'critical');
  }

  renderGame(); if (GAME.inCombat) finishPlayerTurn();
}

function blockAction() {
  if (!GAME.inCombat) return;
  GAME.isBlocking = true;
  updateLastActions('Encaisser', null, false, null);
  addLog('Tu te mets en position défensive. La satiété du prochain coup sera réduite.', 'info');
  finishPlayerTurn();
}

function finishPlayerTurn() {
  if (!GAME.inCombat || GAME.awaitingEnemyTurn) return;
  tickHeroStatuses();
  if (!GAME.inCombat) return;
  GAME.awaitingEnemyTurn = true; toggleActionButtons(true);
  setTimeout(() => { GAME.awaitingEnemyTurn = false; enemyTurn(); }, 650);
}

function enemyTurn() {
  if (!GAME.inCombat || !GAME.currentEnemy || GAME.hero.ps >= GAME.hero.maxPs) return;

  tickEnemyStatuses();
  if (!GAME.inCombat || !GAME.currentEnemy || GAME.hero.ps >= GAME.hero.maxPs) return;

  const derived = getHeroDerived(GAME.hero);
  if (roll(1, 100) <= derived.evasion) {
    updateLastActions(null, 'Raté : Attaque', null, false);
    addLog(`Tu esquives l’attaque de ${GAME.currentEnemy.name} !`, 'info'); GAME.isBlocking = false; toggleActionButtons(false); return;
  }

  if (GAME.currentEnemy.archetype === 'Gardien' && roll(1, 100) <= 35) {
    applyTankCoca();
    if (GAME.inCombat) toggleActionButtons(false);
    return;
  }

  let satiety = roll(GAME.currentEnemy.derived.dmgMin, GAME.currentEnemy.derived.dmgMax);
  const crit = roll(1, 100) <= GAME.currentEnemy.derived.crit;
  if (crit) satiety = Math.floor(satiety * 1.5);
  satiety = Math.max(1, satiety - Math.floor(derived.def / 3));
  if (GAME.isBlocking) { satiety = Math.max(1, Math.floor(satiety * 0.45)); addLog('Tu encaisses une partie du choc grâce à ta défense.', 'info'); GAME.isBlocking = false; }
  updateLastActions(null, `${satiety} : Attaque`, null, crit);
  applySatietyToHero(satiety, `${GAME.currentEnemy.name} te remplit de <strong>${satiety}</strong> PS !${crit ? ' <span class="critical">CRITIQUE !</span>' : ''}`);
  if (GAME.inCombat) toggleActionButtons(false);
}

function tryLevelUp() {
  while (GAME.hero.xp >= GAME.hero.xpNext) {
    GAME.hero.xp -= GAME.hero.xpNext; GAME.hero.level += 1; GAME.hero.xpNext = Math.floor(GAME.hero.xpNext * 1.4); syncHeroCaps(false); GAME.hero.energy = GAME.hero.maxEnergy; GAME.pendingLevelUps += 1;
    addLog(`<strong>Montée de niveau !</strong> ${GAME.hero.name} passe niveau ${GAME.hero.level}.`, 'critical');
  }
  if (GAME.pendingLevelUps > 0) openStatChoiceModal();
}

function openStatChoiceModal() {
  if (GAME.pendingLevelUps <= 0) return;
  refs.modalTitle.textContent = 'Montée de niveau'; refs.modalText.textContent = 'Choisis 2 améliorations pour renforcer ton personnage.';
  refs.modalStatChoices.classList.remove('hidden'); refs.modalStatChoices.innerHTML = '';
  refs.modalRestart.classList.add('hidden'); refs.modalConfirm.classList.add('hidden'); refs.modalClose.classList.add('hidden');
  let picksLeft = 2;
  const stats = ['FOR', 'CAP', 'RAP', 'META'];
  stats.forEach((stat) => {
    const btn = document.createElement('button'); btn.className = 'choice-btn'; btn.textContent = `${stat} +1`;
    btn.onclick = () => {
      GAME.hero.stats[stat] += 1; picksLeft -= 1; btn.disabled = true; syncHeroCaps(false); GAME.hero.energy = GAME.hero.maxEnergy; renderGame();
      if (picksLeft <= 0) {
        GAME.pendingLevelUps -= 1;
        closeModal();
        if (GAME.pendingLevelUps > 0) {
          setTimeout(() => {
            if (GAME.pendingLevelUps > 0) openStatChoiceModal();
          }, LEVEL_UP_MODAL_DELAY);
        }
      }
    };
    refs.modalStatChoices.appendChild(btn);
  });
  refs.modal.style.display = 'block';
}

function getEnemyXpReward(enemy) {
  const baseXp = enemy.xp || 0;
  const levelBonus = Math.max(0, enemy.level - 1);
  const scaledXp = Math.floor(baseXp * (1 + levelBonus * 0.18));
  return enemy.boss ? Math.floor(scaledXp * 1.15) : scaledXp;
}

function getEnemyGoldReward(enemy) {
  const baseGold = 8 + (enemy.level || 1) * 4;
  return enemy.boss ? Math.floor(baseGold * 1.5) : baseGold;
}

function resolvePostCombatEvent(onDone) {
  const eventRoll = roll(1, 100);
  if (eventRoll <= 20) {
    findTreasure(onDone);
    return;
  }
  if (eventRoll <= 36) {
    trapEvent(onDone);
    return;
  }
  if (typeof onDone === 'function') onDone();
}

function victory() {
  const enemy = GAME.currentEnemy;
  const xpReward = getEnemyXpReward(enemy);
  const goldReward = getEnemyGoldReward(enemy);
  const drops = lootTable(enemy).map((item) => ({ item, quantity: 1 }));
  showPopup('victory', {
    enemyName: enemy.name,
    xpReward,
    goldReward,
    loot: drops,
    onContinue: () => {
      GAME.inCombat = false;
      GAME.currentEnemy = null;
      GAME.heroBuffs = [];
      GAME.heroPoison = null;
      GAME.heroDebuffs = [];
      GAME.enemyPoison = null;
      GAME.enemyDebuffs = [];
      updateLastActions('', '', false, false);
      GAME.hero.xp += xpReward;
      GAME.gold += goldReward;
      drops.forEach(({ item, quantity }) => addItemToInventory(item, quantity));
      if (!GAME.selectedItemId) GAME.selectedItemId = GAME.hero.inventory[0]?.id || null;
      renderInventory();
      resolvePostCombatEvent(() => {
        tryLevelUp();
        renderGame();
      });
    }
  });
}

function lootTable(enemy) {
  const drops = []; const r = roll(1, 100);
  if (r <= 30) drops.push(createDigestPotion());
  else if (r <= 45) drops.push(createEnergyPotion());
  else if (r <= 68) {
    const pool = ACCESSORIES.filter((item) => (item.atk || 0) <= 3 + GAME.hero.level * 2 + 4);
    const baseItem = pool[Math.floor(Math.random() * pool.length)];
    drops.push(scaleLootItem(baseItem, GAME.hero.level));
  }
  else if (r <= 88) {
    const pool = OUTFITS.filter((item) => (item.def || 0) <= 2 + GAME.hero.level * 2 + 3);
    const baseItem = pool[Math.floor(Math.random() * pool.length)];
    drops.push(scaleLootItem(baseItem, GAME.hero.level));
  }
  else { drops.push(createDigestPotion()); drops.push(createEnergyPotion()); }
  if (enemy.boss) {
    const bossItem = ACCESSORIES[Math.min(ACCESSORIES.length - 1, Math.floor(GAME.hero.level / 2) + 1)];
    drops.push(scaleLootItem(bossItem, GAME.hero.level));
  }
  return drops;
}

function rollLoot(enemy) {
  const drops = lootTable(enemy);
  if (!drops.length) { addLog('Aucun butin intéressant cette fois.', 'info'); return; }
  drops.forEach((item) => addItemToInventory(item, 1));
  const lines = drops.map((item) => `${item.icon || '📦'} ${item.name}`).join('<br>');
  addLog(`<strong>Butin récupéré :</strong><br>${lines}`, 'loot');
  if (!GAME.selectedItemId) GAME.selectedItemId = GAME.hero.inventory[0]?.id || null; renderInventory();
}

function explore() {
  if (GAME.inCombat || GAME.isRecovering || GAME.isGameOver) return;
  GAME.roomsCleared += 1;
  startCombat();
}

function findTreasure(onDone = null) {
  const bonusRoll = roll(1, 100);
  const contents = [];
  if (bonusRoll <= 55) {
    contents.push({ item: createDigestPotion(), quantity: 2 });
    if (roll(1, 100) <= 45) contents.push({ item: createEnergyPotion(), quantity: 1 });
  } else if (bonusRoll <= 80) {
    const item = scaleLootItem(ACCESSORIES[Math.floor(Math.random() * ACCESSORIES.length)], GAME.hero.level);
    contents.push({ item, quantity: 1 });
  } else {
    const item = scaleLootItem(OUTFITS[Math.floor(Math.random() * OUTFITS.length)], GAME.hero.level);
    contents.push({ item, quantity: 1 });
  }
  showPopup('chest', {
    contents,
    onContinue: () => {
      contents.forEach(({ item, quantity }) => addItemToInventory(item, quantity));
      if (!GAME.selectedItemId) GAME.selectedItemId = GAME.hero.inventory[0]?.id || null;
      renderInventory();
      renderGame();
      if (typeof onDone === 'function') onDone();
    }
  });
}

function trapEvent(onDone = null) {
  const satiety = roll(8, 14) + GAME.roomsCleared;
  showPopup('trap', {
    trapName: 'Piège de gavage',
    effect: `<strong>+${satiety} PS</strong> de satiété.`,
    onContinue: () => {
      GAME.hero.ps = Math.max(0, GAME.hero.ps + satiety);
      shakeElement(refs.playerCard);
      if (GAME.hero.ps >= GAME.hero.maxPs) {
        gameOver();
        return;
      }
      renderGame();
      if (typeof onDone === 'function') onDone();
    }
  });
}

function rest() {
  if (GAME.inCombat || GAME.isResting || GAME.isRecovering || GAME.isGameOver) return;
  GAME.isResting = true; toggleActionButtons(true);
  refs.btnUseEquipped.disabled = refs.btnEquipEquipped.disabled = refs.btnDropEquipped.disabled = true;
  refs.btnUseItem.disabled = refs.btnEquipItem.disabled = refs.btnDropItem.disabled = true;

  let timeLeft = 60;
  refs.modalTitle.innerHTML = '🛌';
  refs.modalText.innerHTML = `Vous vous reposez.<br>Temps d'attente : <strong>1:00</strong>`;
  refs.modalStatChoices.classList.add('hidden'); refs.modalStatChoices.innerHTML = '';
  refs.modalConfirm.classList.add('hidden'); refs.modalRestart.classList.add('hidden'); refs.modalClose.classList.add('hidden'); refs.modal.style.display = 'block';
  if (GAME.restInterval) clearInterval(GAME.restInterval);
  GAME.restInterval = setInterval(() => {
    timeLeft -= 1; refs.modalText.innerHTML = `Vous vous reposez.<br>Temps d'attente : <strong>0:${String(timeLeft).padStart(2, '0')}</strong>`;
    if (timeLeft <= 0) {
      clearInterval(GAME.restInterval); GAME.restInterval = null; GAME.isResting = false;
      GAME.hero.ps = 0; GAME.hero.energy = GAME.hero.maxEnergy; refs.modal.style.display = 'none'; refs.modalConfirm.classList.remove('hidden');
      addLog('Tu termines ton repos. Tes PS retombent à 0 et ton énergie est entièrement restaurée.', 'gain'); renderGame();
    }
  }, 1000);
}

function useConsumable(itemId, fromRest = false) {
  if (GAME.isRecovering || GAME.isGameOver) return;

  const item = GAME.hero.inventory.find((entry) => entry.id === itemId); if (!item || item.type !== 'consumable') return;
  const logs = []; let changed = false;
  if (item.digest) {
    const oldPs = GAME.hero.ps; GAME.hero.ps = Math.max(0, GAME.hero.ps - item.digest); const digested = Math.ceil(oldPs - GAME.hero.ps);
    if (digested > 0) { logs.push(`<strong>-${digested} PS</strong>`); changed = true; }
  }
  if (item.energyRestore) {
    const oldEnergy = GAME.hero.energy; GAME.hero.energy = Math.min(GAME.hero.maxEnergy, GAME.hero.energy + item.energyRestore);
    const restored = Math.ceil(GAME.hero.energy - oldEnergy);
    if (restored > 0) { logs.push(`<strong>+${restored} énergie</strong>`); changed = true; }
  }
  removeInventoryItem(item.id, 1);
  if (logs.length === 0) addLog(`${fromRest ? 'Tu te reposes et ' : ''}tu utilises ${item.name}, mais cela n'a aucun effet.`, 'info');
  else addLog(`${fromRest ? 'Tu te reposes et ' : ''}tu utilises ${item.name} : ${logs.join(' et ')}.`, 'gain');
  renderGame(); if (GAME.inCombat && !fromRest && changed) finishPlayerTurn();
}

function equipItem(itemId) {
  if (GAME.isRecovering || GAME.isGameOver) return;

  const item = GAME.hero.inventory.find((entry) => entry.id === itemId); if (!item || !['weapon', 'armor'].includes(item.type)) return;
  if (item.type === 'weapon') GAME.hero.equipment.weapon = item; if (item.type === 'armor') GAME.hero.equipment.armor = item;
  GAME.selectedEquipmentId = item.id; GAME.selectedItemId = GAME.hero.inventory.find((entry) => !isEquipped(entry))?.id || null; syncHeroCaps(false);
  addLog(`Tu équipes <strong>${item.name}</strong>.`, 'gain'); renderGame();
}
function dropItem(itemId) {
  if (GAME.isRecovering || GAME.isGameOver) return;

  const item = GAME.hero.inventory.find((entry) => entry.id === itemId); if (!item) return;
  if (GAME.hero.equipment.weapon?.id === item.id) GAME.hero.equipment.weapon = null;
  if (GAME.hero.equipment.armor?.id === item.id) GAME.hero.equipment.armor = null;
  removeInventoryItem(item.id, item.stackable ? 1 : item.quantity || 1);
  GAME.selectedEquipmentId = [GAME.hero.equipment.weapon, GAME.hero.equipment.armor].filter(Boolean)[0]?.id || null;
  GAME.selectedItemId = GAME.hero.inventory.find((entry) => !isEquipped(entry))?.id || null;
  addLog(`Tu jettes <strong>${item.name}</strong>.`, 'loss'); syncHeroCaps(false); renderGame();
}

function gameOver() {
  GAME.inCombat = true;
  GAME.awaitingEnemyTurn = false;
  GAME.isGameOver = true;
  GAME.isRecovering = false;
  GAME.recoveryEndsAt = null;
  GAME.isBlocking = false;
  GAME.roomsCleared = Math.max(0, GAME.roomsCleared - 1);
  GAME.heroBuffs = [];
  GAME.heroPoison = null;
  GAME.heroDebuffs = [];
  GAME.enemyPoison = null;
  GAME.enemyDebuffs = [];
  showPopup('defeat', {
    heroName: GAME.hero.name,
    room: GAME.roomsCleared,
    level: GAME.hero.level,
    onContinue: () => {
      updateLastActions('', '', false, false);
      renderGame();
      startDefeatRecovery();
    }
  });
}

function startDefeatRecovery() {
  if (!GAME.hero || GAME.isRecovering) return;

  GAME.isGameOver = false;
  GAME.isRecovering = true;
  GAME.recoveryEndsAt = Date.now() + 300000;
  GAME.inCombat = false;
  GAME.awaitingEnemyTurn = false;
  GAME.isBlocking = false;
  GAME.currentEnemy = null;
  GAME.heroBuffs = [];
  GAME.heroPoison = null;
  GAME.heroDebuffs = [];
  GAME.enemyPoison = null;
  GAME.enemyDebuffs = [];
  GAME.pendingModalAction = null;
  refs.modal.style.display = 'none';
  refs.modalStatChoices.classList.add('hidden');
  refs.modalStatChoices.innerHTML = '';
  refs.modalConfirm.classList.add('hidden');
  refs.modalRestart.classList.add('hidden');
  refs.modalClose.classList.add('hidden');

  renderGame();
  resumeDefeatRecovery();
  return;

  refs.modalTitle.innerHTML = '🏥';
  refs.modalText.innerHTML = `Vous êtes transportée d'urgence à la salle de remise en forme.<br>Temps d'attente : <strong>5:00</strong>`;
  refs.modalStatChoices.classList.add('hidden');
  refs.modalStatChoices.innerHTML = '';
  refs.modalConfirm.classList.add('hidden');
  refs.modalRestart.classList.add('hidden');
  refs.modalClose.classList.add('hidden');
  refs.modal.style.display = 'block';

  if (GAME.restInterval) clearInterval(GAME.restInterval);
  let timeLeft = 300;
  GAME.restInterval = setInterval(() => {
    timeLeft -= 1;
    const minutes = Math.floor(timeLeft / 60);
    const seconds = String(timeLeft % 60).padStart(2, '0');
    refs.modalText.innerHTML = `Vous êtes transportée d'urgence à la salle de remise en forme.<br>Temps d'attente : <strong>${minutes}:${seconds}</strong>`;

    if (timeLeft <= 0) {
      clearInterval(GAME.restInterval);
      GAME.restInterval = null;
      GAME.isRecovering = false;
      GAME.hero.ps = 0;
      GAME.hero.energy = GAME.hero.maxEnergy;
      refs.modal.style.display = 'none';
      refs.modalConfirm.classList.remove('hidden');
      addLog(`Après un passage en salle de remise en forme, <strong>${GAME.hero.name}</strong> repart à l'exploration avec <strong>0 PS</strong> et toute son énergie.`, 'gain');
      renderGame();
    }
  }, 1000);
}
function closeModal() {
  if (GAME.isRecovering) return;
  const action = GAME.pendingModalAction;
  GAME.pendingModalAction = null;
  refs.modal.style.display = 'none';
  refs.modalStatChoices.classList.add('hidden');
  refs.modalStatChoices.innerHTML = '';
  refs.modalConfirm.classList.remove('hidden');
  refs.modalClose.classList.add('hidden');
  refs.modalRestart.classList.add('hidden');
  refs.modalConfirm.textContent = 'Continuer';
  if (action) {
    action();
    return;
  }
  renderGame();
}

refs.heroName.addEventListener('input', renderCreation);
refs.menuCreateBtn.addEventListener('click', showCreationScreen);
refs.creationBackBtn.addEventListener('click', showMenuScreen);
refs.menuPlayBtn.addEventListener('click', () => { if (GAME.selectedCharacterId) loadCharacter(GAME.selectedCharacterId); });
refs.menuDeleteBtn.addEventListener('click', deleteSelectedCharacter);
refs.startBtn.addEventListener('click', startGame);
refs.btnExplore.addEventListener('click', explore);
refs.btnRest.addEventListener('click', rest);
refs.btnAttack.addEventListener('click', () => playerAttack('attack'));
refs.btnHeavy.addEventListener('click', () => playerAttack('digest'));
refs.btnBlock.addEventListener('click', blockAction);
refs.btnSkill.addEventListener('click', useClassSkill);
refs.btnUseItem.addEventListener('click', () => { const item = getSelectedItem(); if (item?.type === 'consumable') useConsumable(item.id, false); });
refs.btnEquipItem.addEventListener('click', () => { const item = getSelectedItem(); if (item) equipItem(item.id); });
refs.btnDropItem.addEventListener('click', () => { const item = getSelectedItem(); if (item) dropItem(item.id); });
refs.btnUseEquipped.addEventListener('click', () => { const item = getSelectedEquipmentItem(); if (item?.type === 'consumable') useConsumable(item.id, false); });
refs.btnEquipEquipped.addEventListener('click', () => { const item = getSelectedEquipmentItem(); if (item) equipItem(item.id); });
refs.btnDropEquipped.addEventListener('click', () => { const item = getSelectedEquipmentItem(); if (item) dropItem(item.id); });
refs.modalConfirm.addEventListener('click', closeModal);
refs.modalClose.addEventListener('click', closeModal);
refs.modalRestart.addEventListener('click', () => {
  startDefeatRecovery();
});
refs.btnRestartRun.addEventListener('click', () => {
  startDefeatRecovery();
});
window.addEventListener('resize', scheduleViewportFit);

renderCreation();
showMenuScreen();
scheduleViewportFit();
