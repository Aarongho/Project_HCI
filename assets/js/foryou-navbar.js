document.addEventListener("DOMContentLoaded", function() {
  function fixNavbarCarousel() {
    const nav = document.querySelector("nav");
    const carousel = document.querySelector(".carousel");
    const items = document.querySelectorAll(".carousel-item");
    if (nav && carousel && items.length > 0) {
      const navHeight = nav.offsetHeight;
      carousel.style.paddingTop = navHeight + "px";
      items.forEach(item => {
        item.style.height = `calc(100vh - ${navHeight}px)`;
      });
    }
  }

  fixNavbarCarousel();
  window.addEventListener("resize", fixNavbarCarousel);
});
