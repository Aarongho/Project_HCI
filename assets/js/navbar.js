document.addEventListener("DOMContentLoaded", async () => {
  const placeholder = document.querySelector(".navbar-placeholder");
  if (!placeholder) return;
  const res = await fetch("navbar.html");
  if (!res.ok) return;
  const html = await res.text();
  placeholder.innerHTML = html;

  document.querySelector(".navbar-placeholder nav, .navbar-placeholder .main-navbar, .navbar-placeholder > div")
  navItems.forEach(item => {
    if (location.href.includes(item.getAttribute("href"))) {
      navItems.forEach(i => i.classList.remove("active"));
      item.classList.add("active");
    }
  });

  navItems.forEach(item => {
    item.addEventListener("click", function () {
      navItems.forEach(i => i.classList.remove("active"));
      this.classList.add("active");
    });
  });
});
