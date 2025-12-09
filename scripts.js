import { renderMarkdown } from "./marky.js";

// load all sections and nav items
async function loadSections() {
  const index = await fetch("content-index.json").then((r) => r.json());
  const container = document.querySelector(".my-wide-container");
  const navList = document.querySelector("#mainNav ul");

  for (const file of index.sections) {
    const sectionLabel = file.replace(".md", "");
    const sectionId = sectionLabel
      .replace(".md", "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const section = document.createElement("section");
    section.id = sectionId;
    section.classList.add("dynamic-section");
    container.appendChild(section);

    const li = document.createElement("li");
    li.classList.add("nav-item");
    li.innerHTML = `<a class="nav-link" href="#${sectionId}">${sectionLabel}</a>`;
    navList.appendChild(li);

    // this does not return until the section HTML is inserted
    await renderMarkdown(sectionId, file);
  }
}

// add target blank to external links now that all content exists
function markExternalLinks() {
  document.querySelectorAll("a[href]").forEach((a) => {
    const href = a.getAttribute("href");
    if (!href) return;

    // internal anchors
    if (href.startsWith("#")) return;
    // mail links
    if (href.startsWith("mailto:")) return;
    // js links
    if (href.startsWith("javascript:")) return;

    // treat absolute http or https as external
    if (href.startsWith("http") || href.startsWith("docs")) {
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener noreferrer");
    }
  });
}

// keep spacer equal to nav height
function updateNavbarSpacer() {
  const nav = document.getElementById("mainNav");
  const spacer = document.getElementById("navbar-spacer");
  if (!nav || !spacer) return;
  spacer.style.height = nav.offsetHeight + "px";
}

// set up or refresh scroll spy
function setupScrollSpy() {
  const existing = bootstrap.ScrollSpy.getInstance(document.body);
  const nav = document.getElementById("mainNav");
  const offset = nav ? nav.offsetHeight : 80;

  const spy =
    existing ||
    new bootstrap.ScrollSpy(document.body, {
      target: "#mainNav",
      offset: offset,
    });

  spy.refresh();
}

function setupResponsiveNavCollapse() {
  const navbarToggler = document.querySelector(".navbar-toggler");
  if (!navbarToggler) return;

  const responsiveNavItems = document.querySelectorAll("#navbarResponsive .nav-link");

  responsiveNavItems.forEach((item) => {
    item.addEventListener("click", () => {
      if (window.getComputedStyle(navbarToggler).display !== "none") {
        navbarToggler.click();
      }
    });
  });
}

// single entry point that waits for DOM and sections
async function init() {
  // wait for DOM if needed
  if (document.readyState === "loading") {
    await new Promise((resolve) => document.addEventListener("DOMContentLoaded", resolve, { once: true }));
  }

  // now DOM exists, build sections
  await loadSections();

  // now that all dynamic DOM is there, do the post work
  markExternalLinks();
  setupResponsiveNavCollapse();

  setTimeout(() => {
    updateNavbarSpacer();
    setupScrollSpy();
  }, 0);

  // keep spacer correct on resize
  window.addEventListener("resize", updateNavbarSpacer);
}

// start
document.addEventListener("DOMContentLoaded", function () {
  init();
});
