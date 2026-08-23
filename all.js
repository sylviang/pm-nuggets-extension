function formatCategory(cat) {
  const acronyms = ["ai", "pmf", "gtm"];
  if (acronyms.includes(cat)) return cat.toUpperCase();
  return cat.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("allNuggetsByCategory");
  const filter = document.getElementById("categoryFilter");
  const searchInput = document.getElementById("searchInput");

  const res = await fetch("data/index.json");
  const nuggets = await res.json();

  const grouped = {};
  nuggets.forEach(n => {
    if (!grouped[n.category]) grouped[n.category] = [];
    grouped[n.category].push(n);
  });

  const categories = Object.keys(grouped);
  filter.innerHTML = '<option value="all">All</option>' +
    categories.map(c => `<option value="${c}">${formatCategory(c)}</option>`).join("");

  filter.addEventListener("change", () => render(filter.value, searchInput.value));
  searchInput.addEventListener("input", () => render(filter.value, searchInput.value));

  function render(selectedCategory = "all", searchQuery = "") {
    container.innerHTML = "";
    const query = searchQuery.toLowerCase().trim();

    const visibleGroups = selectedCategory === "all"
      ? Object.entries(grouped)
      : [[selectedCategory, grouped[selectedCategory]]];

    visibleGroups.forEach(([category, items]) => {
      const filtered = query
        ? items.filter(n => n.title.toLowerCase().includes(query))
        : items;

      if (filtered.length === 0) return;
      const section = document.createElement("section");

      const heading = document.createElement("h2");
      heading.textContent = formatCategory(category);
      section.appendChild(heading);

      const list = document.createElement("ul");
      list.className = "nugget-link-list";

      filtered.forEach(nugget => {
        const li = document.createElement("li");
        li.className = "nugget-link-item";

        const link = document.createElement("a");
        //link.href = nugget.file;
        link.href = `newtab.html?nugget=${encodeURIComponent(nugget.file)}`;
        //link.target = "_blank";
        link.textContent = nugget.title;

        const favKey = `favourite-${nugget.id}`;
        const isFaved = localStorage.getItem(favKey) === "true";

        const fav = document.createElement("span");
        fav.className = "fav-star";
        fav.textContent = isFaved ? "★" : "☆";
        fav.title = "Click to toggle favourite";
        fav.onclick = () => {
          const currentlyFaved = localStorage.getItem(favKey) === "true";
          if (currentlyFaved) {
            localStorage.removeItem(favKey);
            fav.textContent = "☆";
          } else {
            localStorage.setItem(favKey, "true");
            fav.textContent = "★";
          }
        };

        li.appendChild(fav);
        li.appendChild(link);
        list.appendChild(li);
      });

      section.appendChild(list);
      container.appendChild(section);
    });
  }

  render(); // initial render
});
