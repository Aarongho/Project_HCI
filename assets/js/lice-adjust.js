document.addEventListener("DOMContentLoaded", async () => {
  const placeholder = document.querySelector(".navbar-placeholder");
  if (!placeholder) return;
  const res = await fetch("navbar.html");
  if (!res.ok) return;
  const html = await res.text();
  placeholder.innerHTML = html;
});
