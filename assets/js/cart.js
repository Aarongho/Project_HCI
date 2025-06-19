
const STORE_PRODUCTS = {
  "Pokemon Store": [
    {
      title: "Pokemon Mega Charizard X",
      variant: "L",
      price: 191920,
      oldPrice: 210000,
      img: "charizard.png",
      qty: 2
    },
    {
      title: "Baju Bola Adidas",
      variant: "M",
      price: 109900,
      oldPrice: 129000,
      img: "adidas.png",
      qty: 2
    }
  ],
  "Board Game Store": [
    {
      title: "Here to Slay Board Game",
      variant: "Standar",
      price: 150000,
      oldPrice: 189000,
      img: "HTS.png",
      qty: 1
    }
  ]
};
const STORE_LOC = {
  "Pokemon Store": "Jakarta",
  "Board Game Store": "Surabaya"
};
const STORE_VOUCHERS = {
  "Pokemon Store": ["Voucher Pokemon 10%", "Voucher Ongkir"],
  "Board Game Store": ["Voucher BoardGame 15%"]
};

let currentStore = "Pokemon Store";
let qtyVals = [];
let checkedVals = [];


function $(sel) { return document.querySelector(sel); }
function $all(sel) { return document.querySelectorAll(sel); }


function renderCart(storeName) {
  const cartBox = $('#cart-items');
  cartBox.innerHTML = ""; 
  const products = STORE_PRODUCTS[storeName];
  qtyVals = [];
  checkedVals = [];
  products.forEach((prod, i) => {
    qtyVals.push(prod.qty);
    checkedVals.push(false);
    cartBox.innerHTML += `
      <div class="cart-card">
        <input type="checkbox" class="cart-check" id="cart-check${i}">
        <img src="../../src/images/${prod.img}" class="cart-img">
        <div class="cart-info">
          <div class="cart-title">${prod.title}</div>
          <div class="cart-variant">Varian: ${prod.variant}</div>
          <div class="cart-prices">
            <span class="cart-price">Rp${prod.price.toLocaleString('id-ID')}</span>
            <span class="cart-old-price">Rp${prod.oldPrice.toLocaleString('id-ID')}</span>
          </div>
          <div class="cart-qty">
            <button class="cart-qty-btn" data-idx="${i}" data-delta="-1">-</button>
            <span id="qty${i}">${prod.qty}</span>
            <button class="cart-qty-btn" data-idx="${i}" data-delta="1">+</button>
          </div>
        </div>
      </div>
    `;
  });
  $all('.cart-qty-btn').forEach(btn => {
    btn.onclick = function() {
      const idx = +this.dataset.idx;
      const delta = +this.dataset.delta;
      updateQty(idx, delta);
    };
  });
  $all('.cart-check').forEach((cb, i) => {
    cb.onchange = function() {
      checkedVals[i] = this.checked;
      updateTotal();
    };
  });
  $('#check-all').checked = false;
  $('#check-all').onchange = function() {
    $all('.cart-check').forEach(cb => cb.checked = this.checked);
    checkedVals = checkedVals.map(() => this.checked);
    updateTotal();
  };
  updateTotal();
}


function renderVoucher(storeName) {
  const vouchers = STORE_VOUCHERS[storeName] || [];
  const voucherSelect = $('#voucher-select');
  voucherSelect.innerHTML = `<option>Pilih voucher</option>`;
  vouchers.forEach(v => {
    voucherSelect.innerHTML += `<option value="${v}">${v}</option>`;
  });
}


function updateQty(idx, delta) {
  qtyVals[idx] = Math.max(1, qtyVals[idx] + delta);
  $('#qty'+idx).textContent = qtyVals[idx];
  updateTotal();
}
function updateTotal() {
  let total = 0;
  let checkedCount = 0;
  const products = STORE_PRODUCTS[currentStore];
  checkedVals.forEach((checked, i) => {
    if (checked) {
      total += products[i].price * qtyVals[i];
      checkedCount++;
    }
  });
  $('#cart-total').textContent = "Rp" + total.toLocaleString('id-ID');
  $('#checkout-count').textContent = checkedCount;
}


$all('.cart-voucher-tab').forEach(tab => {
  tab.addEventListener('click', function() {
    $all('.cart-voucher-tab').forEach(t => t.classList.remove('active'));
    this.classList.add('active');
  });
});


$('#store-select').addEventListener('change', function() {
  const store = this.value;
  currentStore = store;
  $('#location-text').textContent = STORE_LOC[store];
  renderCart(store);
  renderVoucher(store);
});


document.addEventListener('DOMContentLoaded', function() {
  currentStore = $('#store-select').value;
  $('#location-text').textContent = STORE_LOC[currentStore];
  renderCart(currentStore);
  renderVoucher(currentStore);
});
