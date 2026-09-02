const menuButton = document.querySelector("[data-menu-button]");
const menu = document.querySelector("[data-menu]");
const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const closeMenu = () => {
  if (!menuButton || !menu) return;
  menuButton.setAttribute("aria-expanded", "false");
  menu.classList.remove("is-open");
  document.body.classList.remove("menu-open");
};

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menu?.classList.toggle("is-open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
});

navLinks.forEach((link) => link.addEventListener("click", closeMenu));

window.addEventListener("resize", () => {
  if (window.innerWidth > 820) closeMenu();
});

if ("IntersectionObserver" in window && sections.length) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;

      navLinks.forEach((link) => {
        const isCurrent = link.getAttribute("href") === `#${visible.target.id}`;
        if (isCurrent) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });
    },
    { rootMargin: "-20% 0px -64%", threshold: [0.05, 0.25, 0.5] },
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

const projectRevealItems = [...document.querySelectorAll("[data-project-reveal]")];
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (!prefersReducedMotion.matches && "IntersectionObserver" in window) {
  document.documentElement.classList.add("motion-enabled");

  const projectRevealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        projectRevealObserver.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -12%", threshold: 0.18 },
  );

  projectRevealItems.forEach((item) => projectRevealObserver.observe(item));
} else {
  projectRevealItems.forEach((item) => item.classList.add("is-visible"));
}

const projectDetails = {
  newstart: {
    title: "NewStart NZ",
    lead: "An interactive rental analytics platform for exploring Auckland housing costs, rental supply, and neighbourhood safety in one place.",
    problem: "Newcomers choosing where to live in Auckland need to compare rental cost, housing availability, and safety, but the relevant government data is fragmented across different geographic systems.",
    engineering: "A Python data pipeline reconciles 548 MBIE rent areas and 412 Police areas against 172 LINZ suburbs. The standalone dashboard turns the result into a map, rankings, distributions, regional comparisons, and a rent-versus-safety view.",
    evidence: ["Rent and crime aligned to July 2025–June 2026", "Map, rankings, distributions, and regional comparisons", "Source areas and missing data remain visible"],
    stack: "Python · MBIE Market Rent API v2 · NZ Police data · LINZ · Leaflet · HTML",
    visual: {
      src: "assets/newstart-nz-preview.webp?v=wide-dashboard",
      srcset: "assets/newstart-nz-preview.webp?v=wide-dashboard 560w, assets/newstart-nz-preview@2x.webp?v=wide-dashboard 1120w",
      sizes: "(max-width: 680px) calc(100vw - 72px), 700px",
      alt: "NewStart NZ dashboard showing Auckland filters, map, rent and safety rankings, and comparison charts",
      width: 1120,
      height: 603,
    },
  },
  skillpath: {
    title: "SkillPath",
    lead: "A full-stack learning platform that gives beginners and aspiring IT professionals a clear path from first concepts to guided practice.",
    problem: "People starting in IT often do not know which skills to learn first, how different topics connect, or what to study next. Existing resources are scattered and frequently assume prior knowledge.",
    engineering: "The React client connects to an ASP.NET Core API backed by EF Core and SQLite. A shared curriculum and progress model supports multiple learning paths, the API grades answers, and each module remembers where the learner stopped.",
    evidence: ["Structured learning paths and ordered modules", "Lessons, knowledge checks, and practice modes", "Persistent progress and per-module resume position", "Role-protected content administration"],
    stack: "React 19 · TypeScript 6 · ASP.NET Core (.NET 10) · EF Core 10 · SQLite",
    visual: {
      src: "assets/skillpath-dashboard-wide.webp?v=latest-home",
      srcset: "assets/skillpath-dashboard-wide.webp?v=latest-home 560w, assets/skillpath-dashboard-wide@2x.webp?v=latest-home 1120w",
      sizes: "(max-width: 680px) calc(100vw - 72px), 680px",
      alt: "SkillPath homepage presenting structured learning areas for people starting in IT",
      width: 1120,
      height: 630,
    },
  },
  movies: {
    title: "Movies Management App",
    lead: "A complete management workflow spanning a React interface, ASP.NET Core API, SQL persistence, and Azure configuration.",
    problem: "Movie and theatre records require different permissions, media handling, locations, and useful browse controls.",
    engineering: "JWT authentication and role checks protect API behaviour; EF Core models persistence while the UI handles uploads, maps, pagination, and filters.",
    evidence: ["Role-based access", "Image and map inputs", "Pagination and filtering"],
    stack: ".NET 9 · React 19 · EF Core · SQL Server · Azure",
    visual: {
      src: "assets/movies-management-interface-wide.webp?v=frame-authentic",
      srcset: "assets/movies-management-interface-wide.webp?v=frame-authentic 560w, assets/movies-management-interface-wide@2x.webp?v=frame-authentic 1120w",
      sizes: "(max-width: 680px) calc(100vw - 72px), 620px",
      alt: "FRAME CINEMAS homepage showing Past Lives in the In Theaters section",
      width: 1120,
      height: 630,
    },
  },
};

const projectDialog = document.querySelector("[data-project-dialog]");
const projectOpeners = [...document.querySelectorAll("[data-project-open]")];
const projectClose = document.querySelector("[data-project-close]");
const projectDialogTitle = document.querySelector("[data-project-dialog-title]");
const projectDialogLead = document.querySelector("[data-project-dialog-lead]");
const projectDialogVisual = document.querySelector("[data-project-dialog-visual]");
const projectDialogImage = document.querySelector("[data-project-dialog-image]");
const projectDialogProblem = document.querySelector("[data-project-dialog-problem]");
const projectDialogEngineering = document.querySelector("[data-project-dialog-engineering]");
const projectDialogEvidence = document.querySelector("[data-project-dialog-evidence]");
const projectDialogStack = document.querySelector("[data-project-dialog-stack]");
let lastProjectOpener = null;

projectOpeners.forEach((button) => {
  button.addEventListener("click", () => {
    const project = projectDetails[button.dataset.projectOpen];
    if (!project || !projectDialog) return;

    lastProjectOpener = button;
    projectDialogTitle.textContent = project.title;
    projectDialogLead.textContent = project.lead;
    projectDialogProblem.textContent = project.problem;
    projectDialogEngineering.textContent = project.engineering;
    projectDialogStack.textContent = project.stack;
    projectDialogVisual.hidden = false;
    projectDialogImage.src = project.visual.src;
    projectDialogImage.srcset = project.visual.srcset;
    projectDialogImage.sizes = project.visual.sizes;
    projectDialogImage.alt = project.visual.alt;
    projectDialogImage.width = project.visual.width;
    projectDialogImage.height = project.visual.height;

    projectDialogEvidence.replaceChildren(
      ...project.evidence.map((entry) => {
        const item = document.createElement("li");
        item.textContent = entry;
        return item;
      }),
    );

    projectDialog.showModal();
  });
});

projectClose?.addEventListener("click", () => projectDialog?.close());

projectDialog?.addEventListener("click", (event) => {
  if (event.target === projectDialog) projectDialog.close();
});

projectDialog?.addEventListener("close", () => {
  lastProjectOpener?.focus();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuButton?.getAttribute("aria-expanded") === "true") {
    closeMenu();
    menuButton.focus();
  }
});

const year = document.querySelector("[data-year]");
if (year) year.textContent = String(new Date().getFullYear());
