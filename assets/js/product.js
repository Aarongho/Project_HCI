
function openOngkirPopup() {
  document.getElementById('popup-ongkir').classList.add('active');
  document.getElementById('popup-ongkir-overlay').classList.add('active');
}
function closeOngkirPopup() {
  document.getElementById('popup-ongkir').classList.remove('active');
  document.getElementById('popup-ongkir-overlay').classList.remove('active');
}
document.getElementById('popup-ongkir-overlay').onclick = closeOngkirPopup;


let selectedVariant = null;
let jumlah = 1;
const variantBtns = document.querySelectorAll('.variant-btn');
const popup = document.getElementById('variant-popup');
const popupOverlay = document.getElementById('variant-popup-overlay');
const popupVariantBtns = document.querySelectorAll('.popup-variant-btn');
const jumlahVal = document.getElementById('jumlah-val');

variantBtns.forEach(btn => {
  btn.onclick = () => {
    openVariantPopup(btn.dataset.variant);
  };
});
function openVariantPopup(variant) {
  popup.classList.add('active');
  popupOverlay.classList.add('active');
  selectPopupVariant(variant);
  jumlah = 1;
  jumlahVal.textContent = jumlah;
}
function closeVariantPopup() {
  popup.classList.remove('active');
  popupOverlay.classList.remove('active');
}

function selectPopupVariant(variant) {
  popupVariantBtns.forEach(btn => {
    if (btn.dataset.variant === variant) {
      btn.classList.add('selected');
      selectedVariant = variant;
    } else {
      btn.classList.remove('selected');
    }
  });
}
popupVariantBtns.forEach(btn => {
  btn.onclick = () => {
    selectPopupVariant(btn.dataset.variant);
  };
});
document.getElementById('minus-btn').onclick = function() {
  if (jumlah > 1) {
    jumlah--;
    jumlahVal.textContent = jumlah;
  }
};
document.getElementById('plus-btn').onclick = function() {
  if (jumlah < 99) {
    jumlah++;
    jumlahVal.textContent = jumlah;
  }
};
popupOverlay.onclick = closeVariantPopup;

function addToCart() {
  if (!selectedVariant) return;
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let found = cart.find(item => item.id === "charizard1" && item.variant === selectedVariant);
  if (found) {
    found.jumlah = Math.min(99, found.jumlah + jumlah);
  } else {
    cart.push({
      id: "charizard1",
      name: "Pokemon Mega Charizard X",
      price: 191920,
      old_price: 210000,
      img: "../../src/images/charizard.png",
      variant: selectedVariant,
      jumlah: jumlah
    });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  closeVariantPopup();
  alert("Berhasil ditambahkan ke keranjang!");
}
function goToBuy() {
  if (!selectedVariant) return;
  localStorage.setItem('buy_now', JSON.stringify({
    id: "charizard1",
    name: "Pokemon Mega Charizard X",
    price: 191920,
    old_price: 210000,
    img: "../../src/images/charizard.png",
    variant: selectedVariant,
    jumlah: jumlah
  }));
  window.location.href = "buy.html";
}


function showSpecDesc(tab) {
  document.getElementById("specdesc-deskripsi").style.display = tab === 'deskripsi' ? "block" : "none";
  document.getElementById("specdesc-spesifikasi").style.display = tab === 'spesifikasi' ? "block" : "none";
  document.querySelectorAll('.specdesc-tab').forEach((el, idx) => {
    if (tab === 'deskripsi' && idx === 0) el.classList.add("active");
    else if (tab === 'spesifikasi' && idx === 1) el.classList.add("active");
    else el.classList.remove("active");
  });
}
window.showSpecDesc = showSpecDesc;
function toggleDesc() {
  const full = document.getElementById('descFull');
  const btn = document.querySelector('.desc-expand-btn');
  if (full.style.display === "none") {
    full.style.display = "block";
    btn.innerText = "Tutup ▲";
  } else {
    full.style.display = "none";
    btn.innerText = "Selengkapnya ▼";
  }
}

const mapBtns = document.querySelectorAll('.map-btn');
const mappingSections = [
  document.getElementById('variant-label'),
  document.getElementById('ratings-section'),
  document.getElementById('desc-main'),
  document.getElementById('rekomendasi-section')
];

let scrolling = false;
let lastActive = 0;

mapBtns.forEach((btn, idx) => {
  btn.onclick = () => {
    mapBtns.forEach((b, i) => b.classList.toggle('active', i === idx));
    lastActive = idx;
    scrolling = true;
    const target = mappingSections[idx];
    if (target) {
      const y = target.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    setTimeout(() => { scrolling = false; }, 500); // 0.5s sesuai smooth scroll
  };
});

window.addEventListener('scroll', () => {
  if (scrolling) return; // Kalau sedang scroll smooth, jangan update underline
  let scrollPos = window.scrollY + 110;
  let activeIdx = 0;
  mappingSections.forEach((sec, i) => {
    const top = sec.getBoundingClientRect().top + window.scrollY - 120;
    const bottom = top + sec.offsetHeight;
    if (scrollPos >= top && scrollPos < bottom) activeIdx = i;
    else if (scrollPos >= bottom) activeIdx = i;
  });
  mapBtns.forEach((btn, i) => btn.classList.toggle('active', i === activeIdx));
  lastActive = activeIdx;
});

