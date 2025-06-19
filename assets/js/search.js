
function removeHistory(btn) {
  btn.parentElement.remove();
}


document.getElementById("lihatLainnyaBtn").addEventListener("click", function() {
  alert("Menampilkan riwayat pencarian lainnya...");
});

document.getElementById("main-search-input").addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    alert("Cari: " + this.value);
  }
});
