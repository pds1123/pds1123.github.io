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
    lead: "An interactive rental analytics platform for comparing housing costs, rental supply, and neighbourhood safety across New Zealand.",
    problem: "Rental listings rarely show the full trade-off between weekly cost, housing availability, and neighbourhood safety. People moving to a new area need a faster way to compare places using trustworthy public data.",
    engineering: "A reproducible Python pipeline collects MBIE rent data, normalises NZ Police exports, and reconciles both sources against 172 LINZ suburbs. The zero-build Leaflet dashboard supports regional drill-down, rankings, distributions, source-area inspection, and touch-friendly controls.",
    evidence: ["Rent and crime aligned to the same 12-month period", "Regional drill-down, rankings, distributions, and comparisons", "Source areas and missing data remain visible", "Responsive layout and touch interactions"],
    stack: "Python · MBIE Market Rent API v2 · NZ Police data · LINZ · Leaflet · HTML",
    visuals: [{
      src: "assets/newstart-nz-preview.webp?v=oct-2026",
      srcset: "assets/newstart-nz-preview.webp?v=oct-2026 560w, assets/newstart-nz-preview@2x.webp?v=oct-2026 1120w",
      sizes: "(max-width: 680px) calc(100vw - 72px), 700px",
      alt: "NewStart NZ dashboard showing Auckland filters, map, rent and safety rankings, and comparison charts",
      caption: "Rental and safety dashboard",
      width: 1120,
      height: 630,
    }],
  },
  skillpath: {
    title: "SkillPath",
    lead: "A full-stack learning platform that helps beginners and people entering IT move from broad learning areas into guided lessons, practice, and assessment.",
    problem: "People starting in IT often do not know which skills to learn first, how different topics connect, or what to study next. Existing resources are scattered and frequently assume prior knowledge.",
    engineering: "The React client consumes published curriculum and question APIs from ASP.NET Core, with EF Core and PostgreSQL for persistence. Cookie-based accounts keep learner progress in sync, the API grades eight interaction formats, and the role-protected admin area manages lessons, modules, questions, publishing states, and revision history.",
    evidence: ["Structured learning paths with persistent progress", "Server-graded practice and assessment engine", "Optional AI explanations for reviewed questions", "Role-protected publishing workflow and content history"],
    stack: "React 19 · TypeScript 6 · ASP.NET Core (.NET 10) · EF Core 10 · PostgreSQL 17",
    visuals: [{
      src: "assets/skillpath-dashboard-wide.webp?v=learning-areas",
      srcset: "assets/skillpath-dashboard-wide.webp?v=learning-areas 560w, assets/skillpath-dashboard-wide@2x.webp?v=learning-areas 1120w",
      sizes: "(max-width: 680px) calc(100vw - 72px), 680px",
      alt: "SkillPath homepage presenting structured learning areas for people starting in IT",
      caption: "Learning areas",
      width: 1120,
      height: 630,
    }, {
      src: "assets/skillpath-learning-path.webp?v=current-ui",
      sizes: "(max-width: 680px) calc(100vw - 72px), 680px",
      alt: "SkillPath learning dashboard showing an Azure path, module progress, and the next lesson",
      caption: "Learning path and progress",
      width: 1120,
      height: 630,
    }, {
      src: "assets/skillpath-module-interface.webp?v=current-ui",
      sizes: "(max-width: 680px) calc(100vw - 72px), 680px",
      alt: "SkillPath module page showing lesson navigation and cloud service model learning content",
      caption: "Lesson and knowledge-check structure",
      width: 1120,
      height: 630,
    }],
  },
  movies: {
    title: "Movies Management App",
    lead: "A complete management workflow spanning a React interface, ASP.NET Core API, SQL persistence, and Azure configuration.",
    problem: "Movie and theatre records require different permissions, media handling, locations, and useful browse controls.",
    engineering: "JWT authentication and role checks protect API behaviour; EF Core models persistence while the UI handles uploads, maps, pagination, and filters.",
    evidence: ["Role-based access", "Image and map inputs", "Pagination and filtering"],
    stack: ".NET 9 · React 19 · EF Core · SQL Server · Azure",
    visuals: [{
      src: "assets/movies-management-interface-wide.webp?v=current-ui",
      srcset: "assets/movies-management-interface-wide.webp?v=current-ui 560w, assets/movies-management-interface-wide@2x.webp?v=current-ui 1120w",
      sizes: "(max-width: 680px) calc(100vw - 72px), 620px",
      alt: "FRAME CINEMAS homepage showing the current In Theaters programme",
      caption: "Current cinema programme",
      width: 1120,
      height: 630,
    }, {
      src: "assets/movies-browse-interface.webp?v=current-ui",
      sizes: "(max-width: 680px) calc(100vw - 72px), 620px",
      alt: "FRAME CINEMAS movie filtering interface with title, genre, status, and pagination controls",
      caption: "Browse and filter movies",
      width: 1120,
      height: 630,
    }, {
      src: "assets/movies-detail-interface.webp?v=current-ui",
      sizes: "(max-width: 680px) calc(100vw - 72px), 620px",
      alt: "FRAME CINEMAS movie detail page with poster, genres, trailer area, and cinema information",
      caption: "Movie details and screening information",
      width: 1120,
      height: 630,
    }],
  },
};

const projectDialog = document.querySelector("[data-project-dialog]");
const projectOpeners = [...document.querySelectorAll("[data-project-open]")];
const projectClose = document.querySelector("[data-project-close]");
const projectDialogTitle = document.querySelector("[data-project-dialog-title]");
const projectDialogLead = document.querySelector("[data-project-dialog-lead]");
const projectDialogGallery = document.querySelector("[data-project-dialog-gallery]");
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
    projectDialogGallery.hidden = false;
    projectDialogGallery.dataset.count = String(project.visuals.length);
    projectDialogGallery.replaceChildren(
      ...project.visuals.map((visual) => {
        const figure = document.createElement("figure");
        const image = document.createElement("img");
        image.src = visual.src;
        if (visual.srcset) image.srcset = visual.srcset;
        image.sizes = visual.sizes;
        image.alt = visual.alt;
        image.width = visual.width;
        image.height = visual.height;
        image.loading = "lazy";

        const caption = document.createElement("figcaption");
        caption.textContent = visual.caption;
        figure.append(image, caption);
        return figure;
      }),
    );

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
