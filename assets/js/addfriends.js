const baseFriends = [
  {name:"Alya", avatar:"../../src/images/icon3.svg"},
  {name:"Dimas", avatar:"../../src/images/icon4.svg"},
  {name:"Sinta", avatar:"../../src/images/icon5.svg"},
  {name:"Rama", avatar:"../../src/images/icon6.svg"}
];

function getAddedFriends() {
  try {
    return JSON.parse(localStorage.getItem("myFriends") || "[]");
  } catch { return []; }
}
function saveAddedFriends(arr) {
  localStorage.setItem("myFriends", JSON.stringify(arr));
  window.dispatchEvent(new Event("storage"));
}
function showPopup(text) {
  const notif = document.getElementById('popup-notif');
  notif.textContent = text;
  notif.classList.add('show');
  setTimeout(() => notif.classList.remove('show'), 1500);
}
function nextFriendName(base, added) {
  let count = 0;
  added.forEach(f => {
    if (f.name === base.name || f.name.startsWith(base.name)) {
      const rest = f.name.slice(base.name.length);
      if (rest === "" || /^\d+$/.test(rest)) {
        count++;
      }
    }
  });
  return count === 0
    ? {name: base.name, avatar: base.avatar}
    : {name: base.name + count, avatar: base.avatar};
}
function renderFriendsList() {
  const added = getAddedFriends();
  const list = document.getElementById('addfriends-list');
  list.innerHTML = "";
  baseFriends.forEach(base => {
    const next = nextFriendName(base, added);
    if (!added.find(f => f.name === next.name)) {
      const el = document.createElement('div');
      el.className = "addfriends-item";
      el.innerHTML = `
        <div class="addfriends-avatar"><img src="${base.avatar}" style="width:90%;height:90%;"></div>
        <span class="addfriends-name">${next.name}</span>
        <button class="addfriends-addbtn">Add</button>
      `;
      el.querySelector('.addfriends-addbtn').onclick = () => {
        added.push({name: next.name, avatar: next.avatar});
        saveAddedFriends(added);
        renderFriendsList();
        showPopup("Added to the friend list");
      };
      list.appendChild(el);
    }
  });
}
document.addEventListener('DOMContentLoaded', renderFriendsList);
