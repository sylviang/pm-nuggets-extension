const tipBox = document.getElementById("tipBox");
const tipIdLabel = document.getElementById("tipIdLabel");
const favBtn = document.getElementById("favBtn");

const urlParams = new URLSearchParams(window.location.search);
const nuggetParam = urlParams.get("nugget");

function getNuggetIdFromPath(path) {
  const parts = path.split("/");
  const fileName = parts[parts.length - 1];
  return fileName.replace(".html", "").replace(".md", "");
}

function renderNugget(filePath, nuggetId) {
  const favKey = `favourite-${nuggetId}`;

  fetch(filePath)
    .then(res => res.text())
    .then(content => {
      // Render markdown or HTML
      if (filePath.endsWith(".md")) {
        tipBox.innerHTML = marked.parse(content);
      } else {
        tipBox.innerHTML = content;
      }

      // Show ID
      tipIdLabel.textContent = `#${nuggetId}`;

      // Update favourite button
      const isFaved = localStorage.getItem(favKey) === "true";
      favBtn.textContent = isFaved ? "★" : "☆";

      favBtn.onclick = () => {
        const currentlyFaved = localStorage.getItem(favKey) === "true";
        if (currentlyFaved) {
          localStorage.removeItem(favKey);
          favBtn.textContent = "☆";
        } else {
          localStorage.setItem(favKey, "true");
          favBtn.textContent = "★";
        }
      };
    });
}

if (nuggetParam) {
  const nuggetId = getNuggetIdFromPath(nuggetParam);
  renderNugget(nuggetParam, nuggetId);
} else {
  fetch("data/index.json")
    .then(res => res.json())
    .then(nuggets => {
      const random = nuggets[Math.floor(Math.random() * nuggets.length)];
      const nuggetId = random.id;
      renderNugget(random.file, nuggetId);
    });
}
