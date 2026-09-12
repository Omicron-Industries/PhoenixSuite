
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

// Fallback data — used only if content.md can't be fetched (e.g. the page
// was opened directly as a file:// URL rather than served over http).
// Otherwise this is overwritten by loadContent() below.
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

function projectCard(p) {
  const github = p.githubUrl
    ? `<a href="${escapeHtml(p.githubUrl)}" target="_blank" rel="noopener">GitHub</a>`
    : `<span class="link-disabled">GitHub</span>`;
  const cf = p.cfUrl
    ? `<a href="${escapeHtml(p.cfUrl)}" target="_blank" rel="noopener">CurseForge</a>`
    : `<span class="link-disabled">CurseForge</span>`;

  return `
    <div class="project-card" data-status="${escapeHtml(p.status)}">
      <div class="project-card-head">
        <span class="project-name">${escapeHtml(p.name)}</span>
        <span class="status-tag"><span class="status-dot status-${escapeHtml(p.status)}"></span>${escapeHtml(STATUS_LABEL[p.status] || p.status)}</span>
      </div>
      <p class="project-desc">${escapeHtml(p.desc)}</p>
      <div class="project-links">${cf}${github}</div>
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

renderProjects("all");
updateProjectCount();

// ---------- content.md loader ----------
// Parses a small subset of markdown: "## Section" headers, "key: value"
// fields, "### Item" sub-headers with a one-line description below them
// (used for the "How the pieces fit" list), and "| a | b |" table rows
// (used for the Project List). Anything it doesn't recognize is ignored,
// so the instructional comments at the top of content.md are safely skipped.
function parseContent(text) {
  const lines = text.split(/\r?\n/);
  const sections = {};
  let currentSection = null;
  let currentItem = null;
  let inComment = false;

  for (const raw of lines) {
    const line = raw.trim();

    if (inComment) {
      if (line.includes("-->")) inComment = false;
      continue;
    }
    if (line.startsWith("<!--") && !line.includes("-->")) {
      inComment = true;
      continue;
    }
    if (line.startsWith("<!--")) continue; // single-line comment

    if (!line) { currentItem = null; continue; }

    const h2 = line.match(/^##\s+(.+)$/);
    if (h2) {
      currentSection = h2[1].trim();
      sections[currentSection] = { fields: {}, items: [], table: [] };
      currentItem = null;
      continue;
    }

    if (!currentSection) continue; // ignore anything before the first "## Section"

    const h3 = line.match(/^###\s+(.+)$/);
    if (h3) {
      currentItem = { name: h3[1].trim(), body: "" };
      sections[currentSection].items.push(currentItem);
      continue;
    }

    if (line.startsWith("|")) {
      if (/^\|[\s:|-]+\|$/.test(line)) continue; // markdown table separator row
      const cells = line.split("|").slice(1, -1).map((c) => c.trim());
      sections[currentSection].table.push(cells);
      continue;
    }

    const kv = line.match(/^([a-zA-Z0-9_]+):\s*(.*)$/);
    if (kv) {
      if (currentItem) {
        currentItem.body = kv[0];
      } else {
        sections[currentSection].fields[kv[1]] = kv[2];
      }
      continue;
    }

    if (currentItem) {
      currentItem.body = currentItem.body ? `${currentItem.body} ${line}` : line;
    }
  }

  return sections;
}

function applyContent(sections) {
  const setText = (id, val) => {
    if (val == null) return;
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  const meta = sections["Meta"];
  if (meta) {
    if (meta.fields.title) document.title = meta.fields.title;
    if (meta.fields.description) {
      const m = document.querySelector('meta[name="description"]');
      if (m) m.setAttribute("content", meta.fields.description);
    }
  }

  const header = sections["Header"];
  if (header) {
    setText("brandText", header.fields.brand);
    setText("navProjects", header.fields.nav_projects);
    setText("navShowcase", header.fields.nav_showcase);
    setText("navWiki", header.fields.nav_wiki);
  }

  const hero = sections["Hero"];
  if (hero) {
    setText("heroHeading", hero.fields.heading);
    setText("heroLede", hero.fields.lede);
    setText("btnPrimary", hero.fields.button_primary);
    setText("btnSecondary", hero.fields.button_secondary);
    setText("heroMetaSuffix", hero.fields.meta_suffix);
  }

  const foundation = sections["Foundation"];
  if (foundation) {
    setText("foundationHeading", foundation.fields.heading);
    setText("foundationLede", foundation.fields.lede);
    if (foundation.items.length) {
      const list = document.getElementById("treeList");
      if (list) {
        list.innerHTML = foundation.items
          .map(
            (item) => `
          <li>
            <span class="tree-path">${escapeHtml(item.name)}</span>
            <span class="tree-desc">${escapeHtml(item.body)}</span>
          </li>`
          )
          .join("");
      }
    }
  }

  const projectsSection = sections["Projects"];
  if (projectsSection) {
    setText("projectsHeading", projectsSection.fields.heading);
    setText("filterAll", projectsSection.fields.filter_all);
    setText("filterActive", projectsSection.fields.filter_active);
    setText("filterMaintenance", projectsSection.fields.filter_maintenance);
    setText("filterLimbo", projectsSection.fields.filter_limbo);
  }

  const footer = sections["Footer"];
  if (footer) {
    setText("footerText", footer.fields.text);
    setText("footerWikiText", footer.fields.wiki_link);
  }

  const projectList = sections["Project List"];
  if (projectList && projectList.table.length > 1) {
    const headerRow = projectList.table[0].map((h) => h.toLowerCase());
    const idx = (name) => headerRow.indexOf(name);
    const nameIdx = idx("name");
    const statusIdx = idx("status");
    const descIdx = idx("description");
    const ghIdx = idx("github");
    const cfIdx = idx("curseforge");

    if (nameIdx !== -1 && statusIdx !== -1) {
      PROJECTS = projectList.table.slice(1).map((row) => ({
        name: row[nameIdx] || "",
        status: (row[statusIdx] || "").toLowerCase(),
        desc: descIdx !== -1 ? row[descIdx] || "" : "",
        githubUrl: ghIdx !== -1 && row[ghIdx] ? row[ghIdx] : null,
        cfUrl: cfIdx !== -1 && row[cfIdx] ? row[cfIdx] : null,
      }));
    }
  }

  renderProjects(activeFilter);
  updateProjectCount();
}

fetch("content.md")
  .then((res) => (res.ok ? res.text() : Promise.reject(res.status)))
  .then((text) => applyContent(parseContent(text)))
  .catch(() => {
    // content.md missing or unreachable (often means the page was opened as
    // file:// rather than served over http) — the static fallback text
    // already in index.html and PROJECTS above stays as-is.
    console.info("content.md not loaded — showing built-in fallback text.");
  });
