
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

const PROJECTS = [
  {
    name: "PhoenixCore",
    status: "forever",
    desc: "The suite's coremod - shared systems most other Phoenix mods build on.",
    githubUrl: "https://github.com/Omicron-Industries/PhoenixCore",
    cfUrl: null,
  },
  {
    name: "Phoenix Forge Technologies",
    status: "forever",
    desc: "The flagship modpack built around the suite.",
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
  forever: "Forever",
  active: "Active",
  maintenance: "Maintenance",
  limbo: "Limbo",
};

function projectCard(p) {
  const github = p.githubUrl
    ? `<a href="${p.githubUrl}" target="_blank" rel="noopener">GitHub</a>`
    : `<span class="link-disabled">GitHub</span>`;
  const cf = p.cfUrl
    ? `<a href="${p.cfUrl}" target="_blank" rel="noopener">CurseForge</a>`
    : `<span class="link-disabled">CurseForge</span>`;

  return `
    <div class="project-card" data-status="${p.status}">
      <div class="project-card-head">
        <span class="project-name">${p.name}</span>
        <span class="status-badge status-${p.status}">${STATUS_LABEL[p.status]}</span>
      </div>
      <p class="project-desc">${p.desc}</p>
      <div class="project-links">${cf}${github}</div>
    </div>`;
}

function renderProjects(filter) {
  const grid = document.getElementById("projectGrid");
  const items =
    filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.status === filter);
  grid.innerHTML = items.map(projectCard).join("");
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

renderProjects("all");
