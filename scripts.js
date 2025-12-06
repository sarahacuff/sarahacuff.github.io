import { renderMarkdown } from "./marky.js";

async function loadSections() {
  const index = await fetch("content-index.json").then((r) => r.json());
  const container = document.querySelector(".my-wide-container");
  const nav = document.querySelector("#mainNav ul");

  for (const file of index.sections) {
    const sectionId = file.replace(".md", "");

    // Create <section> in DOM
    const section = document.createElement("section");
    section.id = sectionId;
    section.classList.add("dynamic-section");
    container.appendChild(section);

    // Add to navbar
    const li = document.createElement("li");
    li.classList.add("nav-item");
    li.innerHTML = `<a class="nav-link" href="#${sectionId}">${sectionId}</a>`;
    nav.appendChild(li);

    // Render markdown into this section
    await renderMarkdown(sectionId, file);
  }
}

// document.addEventListener("DOMContentLoaded", async () => {
//   await renderSlideshow("slideshow", "photos-index.json");
// });

window.addEventListener("DOMContentLoaded", async () => {
  await loadSections();

  // NOW refresh ScrollSpy
  const scrollSpy = bootstrap.ScrollSpy.getInstance(document.body);
  scrollSpy.refresh();
});

// Make external links open in a new tab
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("a[href]").forEach((a) => {
    const href = a.getAttribute("href");

    // Skip anchors (#about, #fix, etc.)
    if (href.startsWith("#")) return;

    // Skip mailto:
    if (href.startsWith("mailto:")) return;

    // Skip JavaScript links (just in case)
    if (href.startsWith("javascript:")) return;

    // Detect external: begins with http AND not your own domain
    const isExternal = href.startsWith("http");

    if (isExternal) {
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener noreferrer");
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("mainNav");
  const spacer = document.getElementById("navbar-spacer");
  spacer.style.height = nav.offsetHeight + "px";
});

// Update on window resize too
window.addEventListener("resize", () => {
  const nav = document.getElementById("mainNav");
  const spacer = document.getElementById("navbar-spacer");
  spacer.style.height = nav.offsetHeight + "px";
});
