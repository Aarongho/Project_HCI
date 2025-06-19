document.getElementById("searchBackBtn").onclick = function() {
  window.history.back();
};
document.getElementById("searchBtn").onclick = function() {
  alert('Cari: ' + document.getElementById("searchInput").value);
};
document.getElementById("searchInput").addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    document.getElementById("searchBtn").click();
  }
});
document.getElementById("cameraBtn").onclick = function() {
  alert("Fitur kamera coming soon!");
};

const products = [
  {
    title: "Baju Keren",
    img: "../../src/images/bajukeren.jpg",
  },
  {
    title: "Celana Merah Motif",
    img: "../../src/images/celanamerah.jpg",
  },
  {
    title: "Sarung Tangan Unik",
    img: "../../src/images/sarungtangan.jpg",
  },
];
