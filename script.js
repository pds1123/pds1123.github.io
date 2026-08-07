const header = document.querySelector("[data-header]");
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

const scrollProgress = document.querySelector("[data-scroll-progress]");
let scrollFrame = 0;

const updateScrollState = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
  const distance = document.documentElement.scrollHeight - window.innerHeight;
  const progress = distance > 0 ? Math.min(window.scrollY / distance, 1) : 0;
  if (scrollProgress) scrollProgress.style.width = `${progress * 100}%`;
  scrollFrame = 0;
};

const requestScrollUpdate = () => {
  if (scrollFrame) return;
  scrollFrame = window.requestAnimationFrame(updateScrollState);
};

updateScrollState();
window.addEventListener("scroll", requestScrollUpdate, { passive: true });
window.addEventListener("resize", requestScrollUpdate);

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
    { rootMargin: "-18% 0px -64%", threshold: [0.05, 0.25, 0.5] },
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

const stackContent = {
  interface: {
    kicker: "Interface evidence",
    copy: "Reusable React flows, responsive layouts, map interactions, and accessible controls.",
    link: "See SkillPath and NewStart NZ",
  },
  services: {
    kicker: "Service evidence",
    copy: "REST endpoints, authentication, validation, error boundaries, and role-aware application behaviour.",
    link: "See Movies Management and User API",
  },
  data: {
    kicker: "Data and cloud evidence",
    copy: "Relational persistence, source reconciliation, encrypted storage, and Azure and AWS integrations.",
    link: "See NewStart NZ and Movies Management",
  },
};

const stackTabs = [...document.querySelectorAll("[data-stack-tab]")];
const stackKicker = document.querySelector("[data-stack-kicker]");
const stackCopy = document.querySelector("[data-stack-copy]");
const stackLink = document.querySelector("[data-stack-link]");

stackTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const key = tab.dataset.stackTab;
    const content = stackContent[key];
    if (!content) return;
    stackTabs.forEach((item) => item.setAttribute("aria-selected", String(item === tab)));
    stackKicker.textContent = content.kicker;
    stackCopy.textContent = content.copy;
    stackLink.textContent = content.link;
  });
});

const filterButtons = [...document.querySelectorAll("[data-project-filter]")];
const projects = [...document.querySelectorAll("[data-project]")];
const filterEmpty = document.querySelector("[data-filter-empty]");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.projectFilter;
    let visibleCount = 0;

    filterButtons.forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
    projects.forEach((project) => {
      const categories = project.dataset.category.split(" ");
      const isVisible = filter === "all" || categories.includes(filter);
      project.classList.toggle("is-filtered", !isVisible);
      if (isVisible) visibleCount += 1;
    });

    if (filterEmpty) filterEmpty.hidden = visibleCount !== 0;
    requestScrollUpdate();
  });
});

const processContent = {
  frame: {
    kicker: "Start with the decision",
    title: "Frame the user, constraint, and useful outcome.",
    copy: "I separate the real user question from the first technical solution. In NewStart NZ, that meant starting with ‘where can I afford to live safely?’ rather than ‘build a map.’",
    evidence: "Evidence: requirements, source audit, explicit scope",
  },
  model: {
    kicker: "Make boundaries explicit",
    title: "Model the data and system edges before the screen.",
    copy: "I identify where names, identifiers, ownership, and lifecycle rules disagree. This exposes the reconciliation layer, persistence model, and API contracts that the interface depends on.",
    evidence: "Evidence: 556 + 416 source regions mapped to 63 suburbs",
  },
  build: {
    kicker: "Deliver a complete path",
    title: "Build the smallest end-to-end flow that proves the model.",
    copy: "I connect interface, service, persistence, and deployment concerns early. That keeps design choices grounded in behaviour rather than isolated component work.",
    evidence: "Evidence: runnable public projects with sample data",
  },
  verify: {
    kicker: "Protect critical behaviour",
    title: "Test the risky paths and expose the gaps.",
    copy: "I test authentication, validation, persistence, cloud boundaries, and edge cases. Missing source coverage stays labelled instead of being silently replaced with a convenient value.",
    evidence: "Evidence: unit and integration tests, explicit coverage reporting",
  },
};

const processTabs = [...document.querySelectorAll("[data-process-tab]")];
const processKicker = document.querySelector("[data-process-kicker]");
const processTitle = document.querySelector("[data-process-title]");
const processCopy = document.querySelector("[data-process-copy]");
const processEvidence = document.querySelector("[data-process-evidence]");

processTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const content = processContent[tab.dataset.processTab];
    if (!content) return;
    processTabs.forEach((item) => item.setAttribute("aria-selected", String(item === tab)));
    processKicker.textContent = content.kicker;
    processTitle.textContent = content.title;
    processCopy.textContent = content.copy;
    processEvidence.textContent = content.evidence;
  });
});

const skillContent = {
  frontend: {
    label: "Frontend",
    title: "Interfaces that make complex workflows understandable.",
    copy: "React, TypeScript, semantic HTML, responsive CSS, and Leaflet.",
    evidence: ["SkillPath multi-format question engine", "NewStart NZ interactive suburb map"],
  },
  backend: {
    label: "Backend",
    title: "Services with clear contracts and lifecycle rules.",
    copy: "ASP.NET Core, Node.js, Express, REST APIs, authentication, and validation.",
    evidence: ["Movies Management role-based API", "User and Terms versioning flows"],
  },
  data: {
    label: "Data",
    title: "Models that preserve meaning across system boundaries.",
    copy: "PostgreSQL, SQL Server, Prisma, EF Core, Pandas, and source reconciliation.",
    evidence: ["NewStart NZ geographic mapping layer", "Soft-delete email reuse constraints"],
  },
  cloud: {
    label: "Cloud",
    title: "Cloud services used as part of a working product path.",
    copy: "Azure deployment configuration, AWS Rekognition, S3, and encrypted metadata storage.",
    evidence: ["Azure-ready movie management application", "AWS service integration and encrypted storage"],
  },
  quality: {
    label: "Quality",
    title: "Tests focused on behaviour that would be costly to break.",
    copy: "Vitest, Supertest, unit testing, integration testing, and explicit error handling.",
    evidence: ["Critical User API integration flows", "Unit-tested Java and cloud behaviour"],
  },
};

const skillButtons = [...document.querySelectorAll("[data-skill]")];
const skillLabel = document.querySelector("[data-skill-label]");
const skillTitle = document.querySelector("[data-skill-title]");
const skillCopy = document.querySelector("[data-skill-copy]");
const skillEvidence = document.querySelector("[data-skill-evidence]");

skillButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const content = skillContent[button.dataset.skill];
    if (!content) return;
    skillButtons.forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
    skillLabel.textContent = content.label;
    skillTitle.textContent = content.title;
    skillCopy.textContent = content.copy;
    skillEvidence.replaceChildren(
      ...content.evidence.map((entry) => {
        const item = document.createElement("li");
        item.textContent = entry;
        return item;
      }),
    );
  });
});

const toolContent = {
  react: {
    group: "Interface",
    name: "React",
    copy: "Reusable interfaces for learning, management, filtering, and review workflows.",
    evidence: ["SkillPath question engine", "Movies Management frontend"],
    icon: "assets/tech/react.svg",
  },
  typescript: {
    group: "Interface",
    name: "TypeScript",
    copy: "Typed application boundaries across reusable client components and REST service code.",
    evidence: ["SkillPath application state", "User & Terms API"],
    icon: "assets/tech/typescript.svg",
  },
  html: {
    group: "Interface",
    name: "HTML5",
    copy: "Semantic, zero-build interfaces that stay portable and easy to deploy.",
    evidence: ["NewStart NZ map", "This portfolio"],
    icon: "assets/tech/html5.svg",
  },
  css: {
    group: "Interface",
    name: "CSS3",
    copy: "Responsive layouts, accessible states, and purposeful interface motion without a heavy UI layer.",
    evidence: ["Responsive project layouts", "Keyboard-visible interaction states"],
    icon: "assets/tech/css3.svg",
  },
  dotnet: {
    group: "Services",
    name: ".NET",
    copy: "A structured API layer for authenticated movie and theatre management workflows.",
    evidence: ["ASP.NET Core API", "Azure-ready service configuration"],
    icon: "assets/tech/dotnet.svg",
  },
  csharp: {
    group: "Services",
    name: "C#",
    copy: "Application logic across web services and real-time Unity gameplay systems.",
    evidence: ["Movies Management backend", "Networked Unity client features"],
    icon: "assets/tech/csharp.svg",
  },
  node: {
    group: "Services",
    name: "Node.js",
    copy: "REST service behaviour with validation, lifecycle rules, persistence, and centralised errors.",
    evidence: ["User & Terms API", "Critical integration flows"],
    icon: "assets/tech/nodejs.svg",
  },
  java: {
    group: "Services",
    name: "Java",
    copy: "Object-oriented service logic with tests around classification and core behaviour.",
    evidence: ["Java service logic", "Unit-tested behaviour"],
    icon: "assets/tech/java.svg",
  },
  python: {
    group: "Data",
    name: "Python",
    copy: "Data extraction and reconciliation pipelines that turn inconsistent sources into usable application data.",
    evidence: ["NewStart NZ mapping layer", "SkillPath source extraction"],
    icon: "assets/tech/python.svg",
  },
  postgresql: {
    group: "Data",
    name: "PostgreSQL",
    copy: "Relational persistence for users, lifecycle state, and versioned terms acceptance.",
    evidence: ["User & Terms data model", "Integration-tested persistence"],
    icon: "assets/tech/postgresql.svg",
  },
  prisma: {
    group: "Data",
    name: "Prisma",
    copy: "Typed persistence boundaries and migrations for explicit user and terms rules.",
    evidence: ["Soft-delete email reuse", "Versioned terms records"],
    icon: "assets/tech/prisma.svg",
  },
  sqlserver: {
    group: "Data",
    name: "SQL Server",
    copy: "Relational storage behind movie, theatre, user, and role-aware management flows.",
    evidence: ["EF Core persistence", "Movies Management data"],
    icon: "assets/tech/sqlserver.svg",
  },
  aws: {
    group: "Cloud + quality",
    name: "AWS",
    copy: "Cloud image analysis and encrypted object storage used as backend building blocks.",
    evidence: ["AWS Certified Cloud Practitioner", "Rekognition and S3"],
    icon: "assets/tech/aws.svg",
  },
  azure: {
    group: "Cloud + quality",
    name: "Azure",
    copy: "Deployment configuration for a full-stack React and ASP.NET Core application.",
    evidence: ["Frontend deployment setup", "API and SQL configuration"],
    icon: "assets/tech/azure.svg",
  },
  git: {
    group: "Cloud + quality",
    name: "Git",
    copy: "Versioned delivery across the public projects, data changes, tests, and deployment configuration.",
    evidence: ["Reviewable project history", "GitHub Pages delivery"],
    icon: "assets/tech/git.svg",
  },
  vitest: {
    group: "Cloud + quality",
    name: "Vitest",
    copy: "Fast integration coverage for the API behaviour most likely to break user lifecycle rules.",
    evidence: ["User creation and deletion", "Terms acceptance flows"],
    icon: "assets/tech/vitest.svg",
  },
};

const toolButtons = [...document.querySelectorAll("[data-tech]")];
const toolPreviewIcon = document.querySelector("[data-tech-preview-icon]");
const toolPreviewLabel = document.querySelector("[data-tech-preview-label]");
const toolPreviewTitle = document.querySelector("[data-tech-preview-title]");
const toolPreviewCopy = document.querySelector("[data-tech-preview-copy]");
const toolPreviewEvidence = document.querySelector("[data-tech-preview-evidence]");

toolButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const content = toolContent[button.dataset.tech];
    if (!content) return;

    toolButtons.forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
    toolPreviewIcon.src = content.icon;
    toolPreviewLabel.textContent = `Active tool · ${content.group}`;
    toolPreviewTitle.textContent = content.name;
    toolPreviewCopy.textContent = content.copy;
    toolPreviewEvidence.replaceChildren(
      ...content.evidence.map((entry) => {
        const item = document.createElement("li");
        item.textContent = entry;
        return item;
      }),
    );
  });
});

const projectDetails = {
  newstart: {
    kicker: "Civic data · Geospatial reconciliation",
    title: "NewStart NZ",
    lead: "A housing and safety guide for people making an unfamiliar Auckland suburb decision.",
    problem: "Official rent and police data answer related questions but use incompatible geographic boundaries and naming systems.",
    engineering: "A reconciliation layer folds 556 rent areas and 416 police areas into 63 suburb names, followed by a zero-build Leaflet interface.",
    evidence: ["59 suburbs with rent data", "61 suburbs with crime data", "Missing coverage remains visible"],
    stack: "Python · MBIE Market Rent API v2 · NZ Police data · Leaflet · HTML",
    href: "https://github.com/pds1123/newstart-nz",
  },
  skillpath: {
    kicker: "Learning product · React application",
    title: "SkillPath",
    lead: "A study product that supports different certification tracks without duplicating the learning engine.",
    problem: "Multiple question structures, review states, and certification progress need to share one consistent interface.",
    engineering: "Reusable renderers handle seven question formats while state stays scoped by certification. A Python pipeline normalises source material.",
    evidence: ["Seven question formats", "Timed exam and review flows", "Runnable sample data"],
    stack: "React 19 · TypeScript · Vite · Tailwind CSS · Python",
    href: "https://github.com/pds1123/skillpath",
  },
  movies: {
    kicker: "Full stack · Role-aware management",
    title: "Movies Management App",
    lead: "A complete management workflow spanning a React interface, ASP.NET Core API, SQL persistence, and Azure configuration.",
    problem: "Movie and theatre records require different permissions, media handling, locations, and useful browse controls.",
    engineering: "JWT authentication and role checks protect API behaviour; EF Core models persistence while the UI handles uploads, maps, pagination, and filters.",
    evidence: ["Role-based access", "Image and map inputs", "Pagination and filtering"],
    stack: ".NET 9 · React 19 · EF Core · SQL Server · Azure",
    href: "https://github.com/pds1123/movies-management-app",
  },
  "user-api": {
    kicker: "Backend · Versioned terms",
    title: "User & Terms API",
    lead: "A TypeScript REST API centred on validation, persistence rules, and tested user lifecycle behaviour.",
    problem: "User deletion, email reuse, and terms acceptance create connected lifecycle and data-integrity rules.",
    engineering: "Zod validates request boundaries, Prisma and PostgreSQL preserve state, and integration tests cover critical flows and centralised errors.",
    evidence: ["Soft-delete email reuse", "Versioned terms acceptance", "Integration tests for critical flows"],
    stack: "Node.js · Express · TypeScript · Prisma · PostgreSQL · Vitest",
    href: "https://github.com/pds1123/User_API",
  },
};

const projectDialog = document.querySelector("[data-project-dialog]");
const projectOpeners = [...document.querySelectorAll("[data-project-open]")];
const projectClose = document.querySelector("[data-project-close]");
const projectDialogKicker = document.querySelector("[data-project-dialog-kicker]");
const projectDialogTitle = document.querySelector("[data-project-dialog-title]");
const projectDialogLead = document.querySelector("[data-project-dialog-lead]");
const projectDialogProblem = document.querySelector("[data-project-dialog-problem]");
const projectDialogEngineering = document.querySelector("[data-project-dialog-engineering]");
const projectDialogEvidence = document.querySelector("[data-project-dialog-evidence]");
const projectDialogStack = document.querySelector("[data-project-dialog-stack]");
const projectDialogLink = document.querySelector("[data-project-dialog-link]");

projectOpeners.forEach((button) => {
  button.addEventListener("click", () => {
    const project = projectDetails[button.dataset.projectOpen];
    if (!project || !projectDialog) return;
    projectDialogKicker.textContent = project.kicker;
    projectDialogTitle.textContent = project.title;
    projectDialogLead.textContent = project.lead;
    projectDialogProblem.textContent = project.problem;
    projectDialogEngineering.textContent = project.engineering;
    projectDialogStack.textContent = project.stack;
    projectDialogLink.href = project.href;
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

const commandDialog = document.querySelector("[data-command-dialog]");
const commandOpeners = [...document.querySelectorAll("[data-command-open]")];
const commandClose = document.querySelector("[data-command-close]");
const commandSearch = document.querySelector("[data-command-search]");
const commandItems = [...document.querySelectorAll("[data-command-item]")];
const commandEmpty = document.querySelector("[data-command-empty]");

const openCommand = () => {
  if (!commandDialog) return;
  closeMenu();
  commandDialog.showModal();
  commandSearch.value = "";
  commandItems.forEach((item) => (item.hidden = false));
  if (commandEmpty) commandEmpty.hidden = true;
  window.requestAnimationFrame(() => commandSearch?.focus());
};

commandOpeners.forEach((button) => button.addEventListener("click", openCommand));
commandClose?.addEventListener("click", () => commandDialog?.close());
commandDialog?.addEventListener("click", (event) => {
  if (event.target === commandDialog) commandDialog.close();
});

commandSearch?.addEventListener("input", () => {
  const query = commandSearch.value.trim().toLowerCase();
  let visibleCount = 0;
  commandItems.forEach((item) => {
    const searchable = `${item.textContent} ${item.dataset.search}`.toLowerCase();
    const isVisible = searchable.includes(query);
    item.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  });
  if (commandEmpty) commandEmpty.hidden = visibleCount !== 0;
});

commandItems.forEach((item) => {
  item.addEventListener("click", () => commandDialog?.close());
});

document.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    if (commandDialog?.open) commandDialog.close();
    else openCommand();
    return;
  }

  if (event.key === "Escape" && menuButton?.getAttribute("aria-expanded") === "true") {
    closeMenu();
    menuButton.focus();
  }
});

const year = document.querySelector("[data-year]");
if (year) year.textContent = String(new Date().getFullYear());
