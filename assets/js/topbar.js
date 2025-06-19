

document.addEventListener("DOMContentLoaded", async () => {
  const placeholder = document.querySelector(".topbar-placeholder");
  if (!placeholder) return;
  const res = await fetch("topbar.html");
  if (!res.ok) return;
  const html = await res.text();
  placeholder.innerHTML = html;

  const searchInput = document.querySelector(".search-input");
  if (searchInput) {
    const phrases = [
      "Pokemon R.t.",
      "Baju bola adidas",
      "Here to Slay Board Game"
    ];
    let i = 0;
    function updatePlaceholder() {
      searchInput.value = phrases[i];
      i = (i + 1) % phrases.length;
    }
    updatePlaceholder();
    setInterval(updatePlaceholder, 3000);


    searchInput.addEventListener('focus', () => {
      window.location.href = 'search.html';
    });

    const parent = searchInput.closest('.searchbar-inline');
    if (parent) {
      parent.addEventListener('click', () => {
        window.location.href = 'search.html';
      });
    }
  }


  const cartCount = document.getElementById("cart-badge");
  if (cartCount) cartCount.innerText = 2;
  const chatBadge = document.querySelector(".chat-badge");
  if (chatBadge) chatBadge.innerText = 7;

  const searchContainer = document.querySelector(".search-container");
  if (searchContainer && searchInput) {
    searchContainer.addEventListener("click", () => {
      if (document.activeElement !== searchInput) searchInput.focus();
    });
    searchInput.addEventListener("keydown", function(e) {
      if (e.key === "Enter") alert("Searching: " + this.value);
    });
  }
});

