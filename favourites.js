document.addEventListener("DOMContentLoaded", async () => {
  const list = document.getElementById("favouritesList");
  const filter = document.getElementById("categoryFilter");

  const res = await fetch("data/index.json");
  const allNuggets = await res.json();

  const getFavouriteIds = () =>
    Object.keys(localStorage)
      .filter(k => k.startsWith("favourite-") && localStorage.getItem(k) === "true")
      .map(k => k.replace("favourite-", ""));

  const render = (category = "all") => {
    list.innerHTML = "";
    const favouriteIds = getFavouriteIds();

    const favNuggets = allNuggets.filter(n =>
      favouriteIds.includes(n.id) &&
      (category === "all" || n.category === category)
    );

    if (favNuggets.length === 0) {
      list.innerHTML = "<li>You haven’t favourited any nuggets yet in this category.</li>";
      return;
    }

    favNuggets.forEach(async nugget => {
      const response = await fetch(nugget.file);
      const content = await response.text();

      const li = document.createElement("li");
      li.className = "nugget-list-item";

      // Render content (Markdown or HTML)
      const contentBox = document.createElement("div");
      contentBox.className = "nugget-content";

      if (nugget.file.endsWith(".md")) {
        contentBox.innerHTML = marked.parse(content);
      } else {
        contentBox.innerHTML = content;
      }

      li.appendChild(contentBox);

      // Bottom-right actions block
      const actions = document.createElement("div");
      actions.className = "actions";

      const favBtn = document.createElement("button");
      favBtn.className = "fav-btn";
      favBtn.title = "Favourited";
      favBtn.textContent = "★";
      favBtn.disabled = true;

      const tipId = document.createElement("span");
      tipId.className = "tip-id";
      tipId.textContent = `#${nugget.id}`;

      actions.appendChild(favBtn);
      actions.appendChild(tipId);
      li.appendChild(actions);

      list.appendChild(li);
    });
  };

  // Populate filter options
  const categories = [...new Set(allNuggets.map(n => n.category))];
  filter.innerHTML = '<option value="all">All</option>' +
    categories.map(cat => `<option value="${cat}">${cat}</option>`).join("");
  filter.onchange = () => render(filter.value);

  render(); // Initial load
});
