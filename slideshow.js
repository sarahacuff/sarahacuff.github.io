export async function renderSlideshow(sectionId, jsonFile) {
  const section = document.getElementById(sectionId);

  // Load the image list
  const data = await fetch(jsonFile).then((r) => r.json());
  const images = data.photos;
  if (!images || images.length === 0) return;

  // Build HTML
  section.innerHTML = `
    <div class="row">
      <div class="col-lg-12">
        <h1>Photography</h1>
        <div class="slideshow-container">
          <div class="slideshow-image-wrapper">
            <img id="${sectionId}-img" src="${images[0]}" class="slideshow-image shadow-depth">
          </div>

          <button class="slide-btn left" id="${sectionId}-prev">&#10094;</button>
          <button class="slide-btn right" id="${sectionId}-next">&#10095;</button>
        </div>
      </div>
    </div>
  `;

  // JS logic
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
}
