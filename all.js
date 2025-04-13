document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("allNuggetsByCategory");
  const filter = document.getElementById("categoryFilter");

  const res = await fetch("data/index.json");
  const nuggets = await res.json();

  const grouped = {};
  nuggets.forEach(n => {
    if (!grouped[n.category]) grouped[n.category] = [];
    grouped[n.category].push(n);
  });

  const categories = Object.keys(grouped);
  filter.innerHTML = '<option value="all">All</option>' +
    categories.map(c => `<option value="${c}">${c}</option>`).join("");

  filter.addEventListener("change", () => render(filter.value));

  function render(selectedCategory = "all") {
    container.innerHTML = "";

    const visibleGroups = selectedCategory === "all"
      ? Object.entries(grouped)
      : [[selectedCategory, grouped[selectedCategory]]];

    visibleGroups.forEach(([category, items]) => {
      const section = document.createElement("section");

      const heading = document.createElement("h2");
      heading.textContent = category.charAt(0).toUpperCase() + category.slice(1);
      section.appendChild(heading);

      const list = document.createElement("ul");
      list.className = "nugget-link-list";

      items.forEach(nugget => {
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
