document.addEventListener("DOMContentLoaded", function () {
  const slider = document.getElementById("services-slider");
  const indicators = document.querySelectorAll('.services-indicator .dot');
  let slideIdx = 0;
  const itemsPerSlide = 5;

  function updateIndicator() {
    indicators.forEach((dot, i) => {
      dot.classList.toggle('active', i === slideIdx);
    });
  }

  function scrollToSlide(idx) {
    if (!slider) return;
    const slide = slider.children[idx];
    if (slide) {
      slider.scrollTo({ left: slide.offsetLeft, behavior: 'smooth' });
      slideIdx = idx;
      updateIndicator();
    }
  }


  let startX = 0, scrollLeft = 0, isDown = false;
  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });
  slider.addEventListener('mouseleave', () => { isDown = false; });
  slider.addEventListener('mouseup', () => { isDown = false; });
  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    slider.scrollLeft = scrollLeft - (x - startX);
  });


  slider.addEventListener('touchstart', (e) => {
    isDown = true;
    startX = e.touches[0].pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });
  slider.addEventListener('touchend', () => { isDown = false; });
  slider.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    const x = e.touches[0].pageX - slider.offsetLeft;
    slider.scrollLeft = scrollLeft - (x - startX);
  });

  // Auto-update indicator on scroll
  slider.addEventListener('scroll', () => {
    const slideWidth = slider.children[0]?.offsetWidth || 80 * itemsPerSlide;
    const idx = Math.round(slider.scrollLeft / slideWidth);
    if (idx !== slideIdx) {
      slideIdx = idx;
      updateIndicator();
    }
  });


  indicators.forEach((dot, i) => {
    dot.addEventListener('click', () => scrollToSlide(i));
  });

  updateIndicator();

  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    const suggestions = [
      "Pokemon R.t.", "Baju Bola Adidas", "Here to Slay Board Game"
    ];
    let i = 0;
    setInterval(() => {
      i = (i+1)%suggestions.length;
      searchInput.value = suggestions[i];
    }, 3000);

    searchInput.addEventListener('click', () => {
      window.location.href = "search.html";
    });
  }
});
