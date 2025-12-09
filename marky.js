import { marked } from "https://cdn.jsdelivr.net/npm/marked/+esm";
let sectionRenderCount = 0;

// Utility: parse markdown
async function parseMarkdown(url) {
  const md = await fetch(url).then((r) => r.text());

  let title = "";
  let imgToken = null;

  // Find H1 and first image using walkTokens
  marked.walkTokens(marked.lexer(md), (token) => {
    if (!title && token.type === "heading" && token.depth === 1) {
      title = token.text;
    }
    if (!imgToken && token.type === "image") {
      imgToken = token;
    }
  });

  // Remove H1 and image from markdown manually
  let remainingMd = md;

  if (title) {
    remainingMd = remainingMd.replace(`# ${title}`, "");
  }

  if (imgToken) {
    const imgMarkdown = `![${imgToken.text}](${imgToken.href})`;
    remainingMd = remainingMd.replace(imgMarkdown, "");
  }

  return {
    title,
    imgToken,
    html: marked.parse(remainingMd.trim()),
  };
}

export async function renderSlideshow(sectionId) {
  // Load the image list
  const data = await fetch("photos-index.json").then((r) => r.json());
  const images = data.photos;
  if (!images || images.length === 0) return { html_slideshow: "", setup: () => {} };

  // Build HTML string (not applied to DOM)
  const html_slideshow = `
    <div class="slideshow-container">
      <div class="slideshow-image-wrapper">
        <img id="${sectionId}-img" src="${images[0]}" class="slideshow-image shadow-depth">
      </div>

      <button class="slide-btn left" id="${sectionId}-prev">&#10094;</button>
      <button class="slide-btn right" id="${sectionId}-next">&#10095;</button>
    </div>
  `;

  // Return HTML + the setup function needed to attach JS behavior
  const setup = () => {
    let index = 0;
    const imgEl = document.getElementById(`${sectionId}-img`);

    document.getElementById(`${sectionId}-prev`).onclick = () => {
      index = (index - 1 + images.length) % images.length;
      imgEl.src = images[index];
    };

    document.getElementById(`${sectionId}-next`).onclick = () => {
      index = (index + 1) % images.length;
      imgEl.src = images[index];
    };
  };

  return { html_slideshow, setup };
}

//
// =========================================================
// MAIN FUNCTION
// =========================================================
//
export async function renderMarkdown(sectionId, markdownUrl) {
  const section = document.getElementById(sectionId);
  sectionRenderCount++;
  const bgClass = sectionRenderCount % 2 === 1 ? "bg-primary" : "bg-alternate";
  section.classList.add(bgClass);

  const { title, imgToken, html } = await parseMarkdown(markdownUrl);

  if (sectionId == "photography") {
    const { html_slideshow, setup } = await renderSlideshow(sectionId);
    section.innerHTML = `
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <h1>${title}</h1>
            ${html}
            ${html_slideshow}
          </div>
        </div>
      </div>
    `;
    setup();
    return;
  }

  const academicProjects = `
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-10 m-auto">
        <div style="position: relative; width: 100%; height: 0; padding-top: 56.2500%;
 padding-bottom: 0; box-shadow: 0 2px 8px 0 rgba(63,69,81,0.16); margin-top: 1.6em; margin-bottom: 0.9em; overflow: hidden;
 border-radius: 8px; will-change: transform;">
          <iframe
            style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; border: none; padding: 0;margin: 0;"
            src="https://www.canva.com/design/DAG6y0dcI1I/IfPAq5XfWtxWqXYJRMOlCQ/view?embed">
          </iframe>
        </div>
      </div>
    </div>

    <div class="row">

      <div class="col-12 col-md-10 m-auto">
        <div style="position: relative; width: 100%; height: 0; padding-top: 56.2500%;
 padding-bottom: 0; box-shadow: 0 2px 8px 0 rgba(63,69,81,0.16); margin-top: 1.6em; margin-bottom: 0.9em; overflow: hidden;
 border-radius: 8px; will-change: transform;">
          <iframe loading="lazy"
            style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; border: none; padding: 0;margin: 0;"
            src="https://www.canva.com/design/DAGW89Agu_s/sBI5EpC18-DQ8MnR2Fn0Vw/view?embed">
          </iframe>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12 col-md-10 m-auto">
        <div style="position: relative; width: 100%; height: 0; padding-top: 77.2727%;
 padding-bottom: 0; box-shadow: 0 2px 8px 0 rgba(63,69,81,0.16); margin-top: 1.6em; margin-bottom: 0.9em; overflow: hidden;
 border-radius: 8px; will-change: transform;">
          <iframe loading="lazy"
            style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; border: none; padding: 0;margin: 0;"
            src="https://www.canva.com/design/DAGU9mE7i84/90xbLDT8Cn2RJLyARaTDEQ/view?embed">
          </iframe>
        </div>
      </div>
    </div>


    <div class="row">
      <div class="col-12 col-md-10 m-auto">
        <img src="media/poster.jpg" loading="lazy" style="width: 100%; height: auto;">
      </div>
    </div>

    <div class="row">
      <div class="col-12 col-md-6">
        <div style="position: relative; width: 100%; height: 0; padding-top: 250.0000%;
 padding-bottom: 0; box-shadow: 0 2px 8px 0 rgba(63,69,81,0.16); margin-top: 1.6em; margin-bottom: 0.9em; overflow: hidden;
 border-radius: 8px; will-change: transform;">
          <iframe loading="lazy"
            style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; border: none; padding: 0;margin: 0;"
            src="https://www.canva.com/design/DAGce7xSyLk/PFUjDtMa7IncNEQwsr8rGg/watch?embed">
          </iframe>
        </div>
      </div>

      <div class="col-12 col-md-6">
        <div style="position: relative; width: 100%; height: 0; padding-top: 250.0000%;
 padding-bottom: 0; box-shadow: 0 2px 8px 0 rgba(63,69,81,0.16); margin-top: 1.6em; margin-bottom: 0.9em; overflow: hidden;
 border-radius: 8px; will-change: transform;">
          <iframe loading="lazy"
            style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; border: none; padding: 0;margin: 0;"
            src="https://www.canva.com/design/DAGtztOtATo/7CTjLGW9zcoZ4wvx88ubBQ/view?embed">
          </iframe>
        </div>
      </div>
    </div>
  </div>
    `;

  if (sectionId == "academic-projects") {
    section.innerHTML = `
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <h1>${title}</h1>
            ${html}
            ${academicProjects}
          </div>
        </div>
      </div>
    `;
    return;
  }

  // CASE 1: No image → simple layout
  if (!imgToken) {
    section.innerHTML = `
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <h1>${title}</h1>
            ${html}
          </div>
        </div>
      </div>
    `;
    return;
  }

  const alt = imgToken.text.toLowerCase();
  const imageTag = `
    <img src="${imgToken.href}"
         alt="${imgToken.text}"
         class="img-fluid rounded shadow-depth side-img">
  `;

  const isLeft = alt.includes("left");
  const isRight = alt.includes("right");

  //
  // CASE 2: Explicit LEFT
  //
  if (isLeft) {
    section.innerHTML = `
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <h1>${title}</h1>
          </div>
        </div>

        <div class="row my-3 align-items-stretch">
          <div class="col-lg-5 d-flex justify-content-center pe-0 pe-lg-3 image-col order-1 order-lg-1 pb-5 pb-lg-0">
            ${imageTag}
          </div>
          <div class="col-lg-7 order-2 order-lg-2">
            ${html}
          </div>
        </div>
      </div>
    `;
    return;
  }

  //
  // CASE 3: Explicit RIGHT or FALLBACK
  // Fallback occurs when neither "left" nor "right" are found
  //
  if (isRight || (!isLeft && !isRight)) {
    section.innerHTML = `
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <h1>${title}</h1>
          </div>
        </div>
        <div class="row my-3 align-items-stretch">
          <div class="col-lg-7 order-2 order-lg-1">
            ${html}
          </div>

          <div class="col-lg-5 d-flex justify-content-center ps-0 ps-lg-3 image-col order-1 order-lg-2 pb-5 pb-lg-0">
            ${imageTag}
          </div>
        </div>
      </div>
    `;
    return;
  }
}
