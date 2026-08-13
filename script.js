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

const projectDetails = {
  newstart: {
    title: "NewStart NZ",
    lead: "A housing and safety guide that helps newcomers compare Auckland locations through rent, budget, and crime data.",
    problem: "People arriving in Auckland need to judge affordability and safety together, but the official answers live in separate datasets and use incompatible geographic boundaries.",
    engineering: "A reconciliation layer combines 556 rent regions and 416 police regions, then a zero-build Leaflet interface turns the result into one filterable decision view.",
    evidence: ["Official MBIE rent data", "NZ Police safety data", "Missing coverage remains visible"],
    stack: "Python · MBIE Market Rent API v2 · NZ Police data · Leaflet · HTML",
    visual: {
      src: "assets/newstart-nz-preview.webp?v=complete",
      srcset: "assets/newstart-nz-preview.webp?v=complete 560w, assets/newstart-nz-preview@2x.webp?v=complete 1120w",
      sizes: "(max-width: 680px) calc(100vw - 72px), 700px",
      alt: "NewStart NZ interface showing rent and safety filters beside an Auckland map",
      width: 1120,
      height: 700,
    },
  },
  skillpath: {
    title: "SkillPath",
    lead: "A beginner-friendly platform for building foundational skills across Cloud, Data, and Software Development through structured learning paths, guided lessons, practice, and progress tracking.",
    problem: "IT learning resources are often fragmented or assume too much prior knowledge, making it difficult for beginners to know what to learn next.",
    engineering: "A scalable full-stack content model organises learning areas into paths, tutorials, lessons, practice content, and assessments. Admin tools manage each layer as the platform expands into additional IT subjects.",
    evidence: ["Cloud, Data, and Software Development", "Topic-based lessons and knowledge checks", "Progress tracking and optional certification preparation", "Admin content management"],
    stack: "React 19 · TypeScript · Vite · Tailwind CSS · Python",
    visual: {
      src: "assets/skillpath-dashboard-wide.webp?v=learning-areas",
      srcset: "assets/skillpath-dashboard-wide.webp?v=learning-areas 560w, assets/skillpath-dashboard-wide@2x.webp?v=learning-areas 1120w",
      sizes: "(max-width: 680px) calc(100vw - 72px), 680px",
      alt: "SkillPath homepage showing Cloud, Data, Software Development, and QA learning areas",
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
