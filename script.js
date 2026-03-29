document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // USERNAME SYSTEM
  // =========================
 // =========================
// RANDOM AVATAR + USERNAME SETUP
// =========================
const avatars = [
  'images/1.jpg','images/2.jpg','images/3.jpg','images/4.jpg',
  'images/5.jpg','images/6.jpg','images/6.webp','images/7.webp',
  'images/8.webp','images/11.jpg'
];

const adjectives = ["Silent","Crazy","Happy","Blue","Electric"];
const nouns = ["Penguin","Tiger","Banana","Rocket","Wizard"];

// Get or generate username
let username = localStorage.getItem("spillUsername");
if (!username) {
  const randomNumber = Math.floor(Math.random() * 100);
  username =
    adjectives[Math.floor(Math.random() * adjectives.length)] +
    nouns[Math.floor(Math.random() * nouns.length)] +
    randomNumber;

  localStorage.setItem("spillUsername", username);
}

// Set username in header
const usernameElem = document.getElementById("username");
if (usernameElem) usernameElem.textContent = username;

// Pick random avatar for this user
const avatarElem = document.getElementById("user-avatar");
if (avatarElem) {
  // Optionally, store in localStorage so avatar persists per user
  let userAvatar = localStorage.getItem("spillAvatar");
  if (!userAvatar) {
    userAvatar = avatars[Math.floor(Math.random() * avatars.length)];
    localStorage.setItem("spillAvatar", userAvatar);
  }
  avatarElem.src = userAvatar;
}

  // =========================
  // DOM ELEMENTS
  // =========================
  const feed = document.getElementById("feed");
  const modal = document.getElementById("spill-modal");

  const openBtn = document.getElementById("spill-button");
  const closeBtn = document.getElementById("close-btn");

  const postBtn = document.getElementById("post-btn");
  const textInput = document.getElementById("spill-text");
  const mediaInput = document.getElementById("media-input");


  // =========================
  // AVATARS
  // =========================
  function randomAvatar() {
    return avatars[Math.floor(Math.random() * avatars.length)];
  }


  // =========================
  // CREATE POST
  // =========================
  function createPost(user, text, file) {
    const post = document.createElement("div");
    post.className = "post";

    let mediaHTML = "";

    if (file) {
      const fileURL = URL.createObjectURL(file);

      if (file.type.startsWith("image")) {
        mediaHTML = `<img src="${fileURL}" width="100%">`;
      } else if (file.type.startsWith("video")) {
        mediaHTML = `<video src="${fileURL}" controls width="100%"></video>`;
      }
    }

    post.innerHTML = `
      <div class="post-header">
        <img src="${randomAvatar()}" style="width:30px;height:30px;border-radius:50%;margin-right:8px;">
        <strong>${user}</strong>
      </div>

      <div class="post-content">
        <p>${text}</p>
        ${mediaHTML}
      </div>

      <div class="post-actions">
        <button>❤️ 4.5K</button>
        <button>💬 2.4K</button>
        <button>❌ Unspills in 48hrs</button>
      </div>
    `;

    feed.prepend(post);
  }


  // =========================
  // MODAL CONTROL (CLEAN)
  // =========================
  openBtn.addEventListener("click", () => {
    modal.classList.add("active");
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modal.classList.remove("active");
    }
  });


  // =========================
  // POST BUTTON
  // =========================
  postBtn.addEventListener("click", () => {
    const text = textInput.value.trim();
    const file = mediaInput.files[0];

    if (!text && !file) return;

    createPost(username, text, file);

    textInput.value = "";
    mediaInput.value = "";
    modal.classList.remove("active");
  });


  // =========================
  // DEMO POSTS
  // =========================
  const demoPosts = [
    ["BlueRocket12", "I'm saying Subaru should just forget about sorry ahh emilia and go for rem ❤️❤️💕💕<img src='images/rem.jpeg' width='100%'>"],
    ["BlueRocket12", "I saw... <img src='images/nooooo.jpeg' width='100%'>"],
    ["SilentPenguin42", "Fuck this, heeeheee suck ma dihhhh"],
    ["CrazyTiger56", "Mr. World Wide <img src='images/queen.jpeg' width='100%'>"],
    ["BlueRocket12", "Dayummm 💕<img src='images/emilia.jpeg' width='100%'>"],
    ["BlueRocket12", "I cleaned em all... <img src='images/12.jpg' width='100%'>"],
    ["HappyBanana99", "When your headache starts attacking your eye so youre stood up like the Uchihas <video width='100%' controls><source src='images/head.mp4' type='video/mp4'></video>"],
    ["ElectricWizard77", "Where dey Aunty Shakira now err "],
    ["HappyBanana99", "Hacker d'Uchiha <video width='100%' controls><source src='images/obito.mp4' type='video/mp4'></video>"],
    ["ElectricWizard77", "Im boredddd ahhh who wants to play UNO with me "],
    ["HappyBanana99", "Island boyyyy <video width='100%' controls><source src='images/v2.mp4' type='video/mp4'></video>"],
    ["CrazyTiger56", "Purplee <img src='images/jjk-meme.jpeg' width='100%'>"],
    ["HappyBanana99", "Goat?! <video width='100%' controls><source src='images/naruto.mp4' type='video/mp4'></video>"],
    ["BlueRocket12", "Faaaaaah😂 <img src='images/10.jpeg' width='100%'>"],
    ["ElectricWizard77", "OOGAH BOOGAH"]
  ];

  demoPosts.forEach(p => createPost(p[0], p[1], null));

});