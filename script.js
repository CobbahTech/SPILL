document.addEventListener("DOMContentLoaded", () => {

  const avatars = [
    'images/1.jpg','images/2.jpg','images/3.jpg','images/4.jpg',
    'images/5.jpg','images/6.jpg','images/6.webp','images/7.webp',
    'images/8.webp','images/11.jpg'
  ];

  const adjectives = ["Silent","Crazy","Happy","Blue","Electric"];
  const nouns = ["Penguin","Tiger","Banana","Rocket","Wizard"];

  let username = localStorage.getItem("spillUsername");
  if (!username) {
    const randomNumber = Math.floor(Math.random() * 100);
    username =
      adjectives[Math.floor(Math.random() * adjectives.length)] +
      nouns[Math.floor(Math.random() * nouns.length)] +
      randomNumber;
    localStorage.setItem("spillUsername", username);
  }

  const usernameElem = document.getElementById("username");
  if (usernameElem) usernameElem.textContent = username;

  const avatarElem = document.getElementById("user-avatar");
  if (avatarElem) {
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
  // BUTTON HIGHLIGHT (All)
  // =========================
  const allBtn = document.getElementById("all-btn");
  if (allBtn) {
    allBtn.style.backgroundColor = "#0d6efd"; // blue
    allBtn.style.color = "#fff";
  }

  // =========================
  // AVATAR HELPER
  // =========================
  function randomAvatar() {
    return avatars[Math.floor(Math.random() * avatars.length)];
  }

  // =========================
  // CREATE POST FUNCTION (with like, comment, countdown)
  // =========================
  function createPost(user, text, file, useHeaderAvatar = true) {
    const post = document.createElement("div");
    post.className = "post";

    let mediaHTML = "";
    if (file) {
      const fileURL = URL.createObjectURL(file);
      if (file.type.startsWith("image")) mediaHTML = `<img src="${fileURL}" width="100%">`;
      else if (file.type.startsWith("video")) mediaHTML = `<video src="${fileURL}" controls width="100%"></video>`;
    }

    const avatarSrc = useHeaderAvatar ? localStorage.getItem("spillAvatar") : randomAvatar();

    // Set countdown timestamp 48 hrs from now
    const expireTime = Date.now() + 48 * 60 * 60 * 1000;

    post.innerHTML = `
      <div class="post-header">
        <img src="${avatarSrc}" style="width:30px;height:30px;border-radius:50%;margin-right:8px;">
        <strong>${user}</strong>
        <span class="post-timestamp" style="margin-left:auto;color:#666;font-size:0.8em;">48h remaining</span>
      </div>

      <div class="post-content">
        <p>${text}</p>
        ${mediaHTML}
      </div>

      <div class="post-actions">
        <button class="like-btn">❤️ 0</button>
        <button class="comment-btn">💬 0</button>
      </div>

      <div class="comment-section" style="display:none;margin-top:10px;">
        <div class="comments-list"></div>
        <input type="text" class="comment-input" placeholder="Write a comment...">
        <button class="submit-comment">Post</button>
      </div>
    `;

    feed.prepend(post);

    // =========================
    // LIKE SYSTEM
    // =========================
const likeBtn = post.querySelector(".like-btn");
let likes = 0;
let liked = false; // NEW FLAG
likeBtn.addEventListener("click", () => {
  if (!liked) {          // Only increment if not liked yet
    likes++;
    likeBtn.textContent = `❤️ ${likes}`;
    liked = true;        // Mark as liked
  }
});

    // =========================
    // COMMENT SYSTEM
    // =========================
    const commentBtn = post.querySelector(".comment-btn");
    const commentSection = post.querySelector(".comment-section");
    const commentInput = post.querySelector(".comment-input");
    const commentsList = post.querySelector(".comments-list");
    const submitComment = post.querySelector(".submit-comment");
    let comments = 0;

    commentBtn.addEventListener("click", () => {
      commentSection.style.display = commentSection.style.display === "none" ? "block" : "none";
    });

    submitComment.addEventListener("click", () => {
      const text = commentInput.value.trim();
      if (!text) return;
      const commentEl = document.createElement("div");
      commentEl.textContent = `${username}: ${text}`;
      commentsList.appendChild(commentEl);
      comments++;
      commentBtn.textContent = `💬 ${comments}`;
      commentInput.value = "";
    });

    // =========================
    // 48H COUNTDOWN
    // =========================
    const timestampElem = post.querySelector(".post-timestamp");
    const interval = setInterval(() => {
      const remaining = expireTime - Date.now();
      if (remaining <= 0) {
        post.remove();
        clearInterval(interval);
      } else {
        const hrs = Math.floor(remaining / (1000 * 60 * 60));
        const mins = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((remaining % (1000 * 60)) / 1000);
        timestampElem.textContent = `${hrs}h ${mins}m ${secs}s remaining`;
      }
    }, 1000);
  }

  // =========================
  // MODAL CONTROL
  // =========================
  openBtn.addEventListener("click", () => modal.classList.add("active"));
  closeBtn.addEventListener("click", () => modal.classList.remove("active"));
  window.addEventListener("click", e => { if (e.target === modal) modal.classList.remove("active"); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") modal.classList.remove("active"); });

  // =========================
  // POST BUTTON
  // =========================
  postBtn.addEventListener("click", () => {
    const text = textInput.value.trim();
    const file = mediaInput.files[0];
    if (!text && !file) return;
    createPost(username, text, file, true);
    textInput.value = "";
    mediaInput.value = "";
    modal.classList.remove("active");
  });

  // =========================
  // DEMO POSTS (UNCHANGED)
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

  demoPosts.forEach(p => createPost(p[0], p[1], null, false));

});