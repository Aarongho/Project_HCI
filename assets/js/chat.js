document.addEventListener('DOMContentLoaded', function () {
  const tabs = document.querySelectorAll('.chat-tab');
  const chatList = document.querySelector('.chat-list');

  const chatData = {
    Seller: [
      {
        avatar: '../../src/images/icon2.svg',
        sender: 'Photo.shop',
        date: '24/5/2025',
        message: 'Produk sudah terkirim'
      },
      {
        avatar: '../../src/images/icon1.svg',
        sender: 'belanja.id',
        date: '20/5/2025',
        message: 'Apakah jadi beli bulan ini?'
      }
    ]
  };

  function getAddedFriends() {
    try {
      return JSON.parse(localStorage.getItem("myFriends") || "[]");
    } catch { return []; }
  }

  function renderChat(tab) {
    chatList.innerHTML = '';
    let data = [];
    if (tab === 'Friends') {
      data = getAddedFriends().map(friend => ({
        avatar: friend.avatar,
        sender: friend.name,
        date: 'Baru',
        message: 'Hai, chat yuk!'
      }));
      if (data.length === 0) {
        chatList.innerHTML = '<div style="text-align:center;margin-top:3rem;color:#999;font-size:1.2rem;font-family:Satoshi">Belum ada teman, tambahkan di Add Friends</div>';
      }
    } else {
      data = chatData[tab] || [];
    }
    data.forEach(item => {
      const el = document.createElement('div');
      el.className = 'chat-item';
      el.innerHTML = `
        <div class="chat-avatar">
          <img src="${item.avatar}" alt="avatar" style="width:90%;height:90%;">
        </div>
        <div class="chat-info">
          <div class="chat-title-row">
            <span class="chat-sender">${item.sender}</span>
            <span class="chat-date">${item.date}</span>
          </div>
          <div class="chat-message">${item.message}</div>
        </div>
      `;
      chatList.appendChild(el);
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', function () {
      tabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      renderChat(this.textContent.trim());
    });
  });

  window.addEventListener('storage', function (e) {
    const activeTab = document.querySelector('.chat-tab.active');
    if (activeTab && activeTab.textContent.trim() === "Friends") {
      renderChat("Friends");
    }
  });

  renderChat('Seller');
});
