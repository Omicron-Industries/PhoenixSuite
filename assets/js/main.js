(function () {
  const root = document.documentElement;
  const btn = document.getElementById("themeToggle");
  const stored = localStorage.getItem("phoenix-suite-theme");
  if (stored) root.setAttribute("data-theme", stored);

  btn.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") === "light" ? "light" : "dark";
    const next = current === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    localStorage.setItem("phoenix-suite-theme", next);
  });
})();

(function () {
  const root = document.documentElement;
  const swatches = document.querySelectorAll(".palette-swatch");
  const stored = localStorage.getItem("phoenix-suite-palette");
  const applied = stored || "sakura";
  root.setAttribute("data-palette", applied);
  swatches.forEach((s) => s.classList.toggle("is-active", s.dataset.palette === applied));

  swatches.forEach((swatch) => {
    swatch.addEventListener("click", () => {
      const palette = swatch.dataset.palette;
      root.setAttribute("data-palette", palette);
      localStorage.setItem("phoenix-suite-palette", palette);
      swatches.forEach((s) => s.classList.toggle("is-active", s === swatch));
    });
  });
})();

// Source of truth for the project list. Edit this array directly to
// add, remove, or update a mod.
let PROJECTS = [
  {
    name: "PhoenixCore",
    status: "active",
    desc: "The Core-mod for the pack Phoenix Forge Technologies",
    githubUrl: "https://github.com/Omicron-Industries/PhoenixCore",
    cfUrl: null,
  },
  {
    name: "Phoenix Forge Technologies",
    status: "active",
    desc: "The main Forge modpack built using the PhoenixSuite.",
    githubUrl: "https://github.com/P-H-O-E-N-I-X-PackForge/Phoenix-Forge-Technologies",
    cfUrl: null,
  },
  {
    name: "Phoenix Chronicles",
    status: "active",
    desc: "A modern quest/progression system with FTB Quests import support. Bug fixes.",
    githubUrl: "https://github.com/Omicron-Industries/PhoenixChronicles",
    cfUrl: null,
  },
  {
    name: "Phoenix's Fission",
    status: "active",
    desc: "API is stable - bug fixes land as MoniLabs adopts it.",
    githubUrl: "https://github.com/Omicron-Industries/Phoenix_Fission",
    cfUrl: null,
  },
  {
    name: "Phoenix Tesla Network",
    status: "active",
    desc: "Small bugs outstanding, needs recipes.",
    githubUrl: "https://github.com/P-H-O-E-N-I-X-PackForge/Phoenix-Tesla-Network",
    cfUrl: null,
  },
  {
    name: "Phoenix Guilds",
    status: "maintenance",
    desc: "Maintenance mode.",
    githubUrl: "https://github.com/Omicron-Industries/Phoenix-Guilds",
    cfUrl: null,
  },
  {
    name: "Phoenix Domains",
    status: "maintenance",
    desc: "Maintenance mode.",
    githubUrl: "https://github.com/Omicron-Industries/Phoenix-Domains",
    cfUrl: null,
  },
  {
    name: "Solaris",
    status: "maintenance",
    desc: "Maintenance mode.",
    githubUrl: "https://github.com/Omicron-Industries/Solaris",
    cfUrl: null,
  },
  {
    name: "Phoenix Ultimine",
    status: "maintenance",
    desc: "Maintenance mode.",
    githubUrl: null,
    cfUrl: null,
  },
  {
    name: "Phoenix Essentials",
    status: "maintenance",
    desc: "Maintenance mode.",
    githubUrl: "https://github.com/Phoenixvine32908/PhoenixEssentials",
    cfUrl: null,
  },
  {
    name: "Phoenix Archive",
    status: "maintenance",
    desc: "Maintenance mode.",
    githubUrl: "https://github.com/Phoenixvine32908/Phoenix-Archive",
    cfUrl: null,
  },
  {
    name: "Phoenix Chromatic Codes",
    status: "maintenance",
    desc: "Maintenance mode.",
    githubUrl: "https://github.com/Omicron-Industries/PhoenixChromaticCodes",
    cfUrl: null,
  },
  {
    name: "Phantasia",
    status: "maintenance",
    desc: "Maintenance mode.",
    githubUrl: "https://github.com/P-H-O-E-N-I-X-PackForge/Phantasia",
    cfUrl: null,
  },
  {
    name: "Phoenix Gregic Additions",
    status: "limbo",
    desc: "Mostly abandoned - updated on request (Sky of Grind).",
    githubUrl: null,
    cfUrl: null,
  },
  {
    name: "Oculus Unofficial",
    status: "limbo",
    desc: "In limbo, no current plans to work on it.",
    githubUrl: null,
    cfUrl: null,
  },
];

const STATUS_LABEL = {
  active: "Active",
  maintenance: "Maintenance",
  limbo: "Limbo",
};

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}

function assignCatalogIds(list) {
  list.forEach((p, i) => {
    p.catalogId = `PHX-${String(i + 1).padStart(3, "0")}`;
  });
}
assignCatalogIds(PROJECTS);

// Parses "owner/repo" out of a GitHub URL so we can hit the public REST API.
function parseGithubRepo(url) {
  if (!url) return null;
  const m = url.match(/github\.com\/([^\/]+)\/([^\/#?]+)/i);
  return m ? `${m[1]}/${m[2]}` : null;
}

function timeAgo(isoDate) {
  const diffMs = Date.now() - new Date(isoDate).getTime();
  const days = Math.floor(diffMs / 86400000);
  if (days < 1) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

function projectCard(p) {
  const github = p.githubUrl
      ? `<a href="${escapeHtml(p.githubUrl)}" target="_blank" rel="noopener" tabindex="-1">GitHub</a>`
      : `<span class="link-disabled">GitHub</span>`;
  const cf = p.cfUrl
      ? `<a href="${escapeHtml(p.cfUrl)}" target="_blank" rel="noopener" tabindex="-1">CurseForge</a>`
      : `<span class="link-disabled">CurseForge</span>`;
  const repo = parseGithubRepo(p.githubUrl);
  const statsMarkup = repo
      ? `<p class="project-stats" data-loaded="false"></p>`
      : `<p class="project-stats is-error">no GitHub repo linked</p>`;

  return `
    <div class="project-card-flip" data-status="${escapeHtml(p.status)}" ${repo ? `data-repo="${escapeHtml(repo)}"` : ""}>
      <div class="project-card-inner">
        <div class="project-card-face is-front">
          <div class="project-card-head">
            <span class="project-name">${escapeHtml(p.name)}</span>
            <span class="status-tag"><span class="status-dot status-${escapeHtml(p.status)}"></span>${escapeHtml(STATUS_LABEL[p.status] || p.status)}</span>
          </div>
          <p class="project-desc">${escapeHtml(p.desc)}</p>
          <button class="flip-btn front" type="button" aria-label="Show links and GitHub stats for ${escapeHtml(p.name)}">details &rarr;</button>
        </div>
        <div class="project-card-face is-back" aria-hidden="true">
          <div class="project-card-head">
            <span class="project-name">${escapeHtml(p.name)}</span>
            <span class="card-id">${escapeHtml(p.catalogId || "")}</span>
          </div>
          <div class="project-links">${cf}${github}</div>
          ${statsMarkup}
          <button class="flip-btn back" type="button" tabindex="-1" aria-label="Back to ${escapeHtml(p.name)} overview">&larr; back</button>
        </div>
      </div>
    </div>`;
}

let activeFilter = "all";

function renderProjects(filter) {
  activeFilter = filter;
  const grid = document.getElementById("projectGrid");
  if (!grid) return;
  const items =
      filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.status === filter);
  grid.innerHTML = items.map(projectCard).join("");
}

function updateProjectCount() {
  const el = document.getElementById("projectCount");
  if (el) el.textContent = PROJECTS.length;
}

document.querySelectorAll(".filter-chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    document
        .querySelectorAll(".filter-chip")
        .forEach((c) => c.classList.remove("is-active"));
    chip.classList.add("is-active");
    renderProjects(chip.dataset.filter);
  });
});

// ---------- Flip cards + lazy GitHub stats ----------
// One shared cache so re-flipping a card (or switching filters and coming
// back) doesn't re-hit the GitHub API. Stats only fetch the first time a
// given card is actually flipped open, so idle browsing never spends any
// of the 60/hr unauthenticated rate limit.
const githubStatsCache = new Map();

function setFaceA11y(wrapper, flipped) {
  const front = wrapper.querySelector(".is-front");
  const back = wrapper.querySelector(".is-back");
  if (!front || !back) return;
  front.setAttribute("aria-hidden", flipped ? "true" : "false");
  back.setAttribute("aria-hidden", flipped ? "false" : "true");
  front.querySelectorAll("button, a").forEach((el) => {
    el.tabIndex = flipped ? -1 : 0;
  });
  back.querySelectorAll("button, a").forEach((el) => {
    el.tabIndex = flipped ? 0 : -1;
  });
}

function loadGithubStats(wrapper) {
  const repo = wrapper.dataset.repo;
  const statsEl = wrapper.querySelector(".project-stats");
  if (!repo || !statsEl || statsEl.dataset.loaded === "true") return;

  if (githubStatsCache.has(repo)) {
    renderStats(statsEl, githubStatsCache.get(repo));
    return;
  }

  statsEl.textContent = "loading GitHub stats…";
  statsEl.classList.add("is-loading");

  fetch(`https://api.github.com/repos/${repo}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data) => {
        const info = { stars: data.stargazers_count, updated: data.pushed_at };
        githubStatsCache.set(repo, info);
        renderStats(statsEl, info);
      })
      .catch(() => {
        statsEl.textContent = "GitHub stats unavailable right now";
        statsEl.classList.remove("is-loading");
        statsEl.classList.add("is-error");
      });
}

function renderStats(el, info) {
  el.classList.remove("is-loading", "is-error");
  el.dataset.loaded = "true";
  el.innerHTML =
      `<span class="stat-stars">★ ${info.stars}</span>` +
      `<span class="stat-updated">updated ${timeAgo(info.updated)}</span>`;
}

const projectGridEl = document.getElementById("projectGrid");
if (projectGridEl) {
  projectGridEl.addEventListener("click", (e) => {
    const frontBtn = e.target.closest(".flip-btn.front");
    const backBtn = e.target.closest(".flip-btn.back");

    if (frontBtn) {
      const wrapper = frontBtn.closest(".project-card-flip");
      if (!wrapper) return;
      wrapper.classList.add("is-flipped");
      setFaceA11y(wrapper, true);
      loadGithubStats(wrapper);
    } else if (backBtn) {
      const wrapper = backBtn.closest(".project-card-flip");
      if (!wrapper) return;
      wrapper.classList.remove("is-flipped");
      setFaceA11y(wrapper, false);
    }
  });
}

renderProjects("all");
updateProjectCount();