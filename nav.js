/* ═══════════════════════════════════════════════
   nav.js — Bottom-nav + Fiche perso (add-on)
   Load AFTER script.js
   ═══════════════════════════════════════════════ */

(function () {
  "use strict";

  /* ── Neutralize fitGameToViewport (not needed on mobile) ── */
  window.fitGameToViewport = function () {
    const w = document.getElementById("game-wrapper");
    if (w) { w.style.transform = "none"; w.style.left = "0"; w.style.top = "0"; }
  };
  window.scheduleViewportFit = function () {};

  const bottomNav  = document.getElementById("bottom-nav");
  const navBtns    = document.querySelectorAll(".nav-btn[data-nav]");
  const navScreens = document.querySelectorAll(".nav-screen");

  function switchTab(name) {
    navBtns.forEach(b => b.classList.toggle("active", b.dataset.nav === name));
    navScreens.forEach(s => {
      const isTarget = s.id === "nav-" + name;
      s.classList.toggle("active", isTarget);
    });
    if (name === "fiche") renderFiche();
    if (name === "settings") renderSettings();
  }

  navBtns.forEach(btn => btn.addEventListener("click", () => switchTab(btn.dataset.nav)));

  /* ── Back to menu button ──────────────────── */
  const btnBack = document.getElementById("btn-back-menu");
  if (btnBack) {
    btnBack.addEventListener("click", () => {
      document.getElementById("game-screen").classList.add("hidden");
      document.getElementById("menu-screen").classList.remove("hidden");
      bottomNav.classList.add("hidden");
    });
  }

  /* ── Show / hide nav based on screens ─────── */
  const observer = new MutationObserver(() => {
    const gameHidden = document.getElementById("game-screen")?.classList.contains("hidden");
    bottomNav.classList.toggle("hidden", !!gameHidden);
  });

  const gameScreen = document.getElementById("game-screen");
  if (gameScreen) observer.observe(gameScreen, { attributes: true, attributeFilter: ["class"] });

  /* ── Fiche perso ──────────────────────────── */
  function renderFiche() {
    const g = window.GAME;
    if (!g || !g.hero) return;
    const h = g.hero;
    const el = document.getElementById("fiche-content");
    if (!el) return;

    const pct = (v, m) => m ? Math.round((v / m) * 100) : 0;

    el.innerHTML = `
      <div class="fiche-identity">
        <div class="fiche-avatar" style="font-size:48px">${h.emoji || "🍽️"}</div>
        <div class="fiche-name">${h.name || "Aventurière"}</div>
        <div class="fiche-sub">${h.className || "Guerrière"} — Niveau ${h.level || 1}</div>
      </div>

      <div class="fiche-section">
        <h3>Statistiques</h3>
        <div class="stats-grid">
          <div class="mini-stat"><strong>FOR</strong><span>${h.for}</span></div>
          <div class="mini-stat"><strong>RAP</strong><span>${h.rap}</span></div>
          <div class="mini-stat"><strong>CAP</strong><span>${h.cap}</span></div>
          <div class="mini-stat"><strong>META</strong><span>${h.meta}</span></div>
          <div class="mini-stat"><strong>ATK</strong><span>${h.atk || 0}</span></div>
          <div class="mini-stat"><strong>DEF</strong><span>${h.def || 0}</span></div>
          <div class="mini-stat"><strong>Esquive</strong><span>${h.evasion || 0}%</span></div>
          <div class="mini-stat"><strong>Crit</strong><span>${h.crit || 0}%</span></div>
        </div>
      </div>

      <div class="fiche-section">
        <h3>Ressources</h3>
        <div class="bar-label"><span>PS</span><span>${Math.ceil(h.ps)} / ${h.maxPs}</span></div>
        <div class="stat-bar-bg"><div class="stat-bar-fill" style="width:${pct(h.ps, h.maxPs)}%;background:linear-gradient(90deg,#2ecc71,#f1c40f,#e74c3c)"></div></div>
        <div class="bar-label"><span>Énergie</span><span>${Math.ceil(h.energy)} / ${h.maxEnergy}</span></div>
        <div class="stat-bar-bg"><div class="stat-bar-fill" style="width:${pct(h.energy, h.maxEnergy)}%;background:linear-gradient(90deg,#1f4ba5,#3498db)"></div></div>
        <div class="bar-label"><span>XP</span><span>${h.xp} / ${h.xpNext}</span></div>
        <div class="stat-bar-bg"><div class="stat-bar-fill" style="width:${pct(h.xp, h.xpNext)}%;background:linear-gradient(90deg,#1f8f4d,#2ecc71)"></div></div>
        <div class="bar-label"><span>Satiété</span><span>${h.satiety || 0} / 100</span></div>
        <div class="stat-bar-bg"><div class="stat-bar-fill" style="width:${h.satiety || 0}%;background:linear-gradient(90deg,#e67e22,#f39c12)"></div></div>
      </div>

      <div class="fiche-section">
        <h3>Progression</h3>
        <div class="fiche-info-grid">
          <div><strong>Salle :</strong> ${g.room || 0}</div>
          <div><strong>Or :</strong> ${h.gold || 0}</div>
          <div><strong>Étage :</strong> ${h.floor || 1}</div>
          <div><strong>Kills :</strong> ${h.kills || 0}</div>
        </div>
      </div>
    `;
  }

  /* ── Settings / Menu tab ──────────────────── */
  function renderSettings() {
    const g = window.GAME;
    if (!g) return;
    const roomEl = document.getElementById("settings-room");
    const goldEl = document.getElementById("settings-gold");
    if (roomEl) roomEl.textContent = g.room || 0;
    if (goldEl) goldEl.textContent = g.hero?.gold || 0;
  }

  /* Expose for external calls */
  window.switchTab = switchTab;
  window.renderFiche = renderFiche;
})();
