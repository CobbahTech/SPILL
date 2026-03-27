document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // USERNAME SETUP
  // =========================
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


  // =========================
  // DOM ELEMENTS
  // =========================
  const feed = document.getElementById("feed");

  const spillBtn = document.getElementById("spill-button");
  const modal = document.getElementById("spill-modal");
  const closeBtn = document.getElementById("close-btn");

  const postBtn = document.getElementById("post-btn");
  const textInput = document.getElementById("spill-text");
  const mediaInput = document.getElementById("media-input");


  // =========================
  // DATA
  // =========================
  const avatars = [
    'images/1.jpg','images/2.jpg','images/3.jpg','images/4.jpg',
    'images/5.jpg','images/6.jpg','images/7.jpg','images/8.jpg',
    'images/9.jpg','images/10.webp','images/11.webp','images/12.jpg',
    'images/13.jpg','images/14.jpg','images/15.jpg','images/16.jpg',
    'images/17.jpg','images/18.webp'
  ];


  // =========================
  // FUNCTIONS
  // =========================
  function randomAvatar() {
    return avatars[Math.floor(Math.random() * avatars.length)];
  }

  function createPost(user, content) {
    if (!feed) return;

    const post = document.createElement("div");
    post.className = "post";

    post.innerHTML = `
      <div class="post-header">
        <img src="${randomAvatar()}" style="width:30px;height:30px;border-radius:50%;margin-right:8px;">
        <strong>${user}</strong>
      </div>
      <div class="post-content">${content}</div>
      <div class="post-actions">
        <button>🔥</button>
        <button>💬</button>
        <button>❤️</button>
      </div>
    `;

    // Show newest at top
    feed.prepend(post);
  }


  // =========================
  // MODAL LOGIC
  // =========================
  if (spillBtn && modal) {
    spillBtn.addEventListener("click", () => {
      modal.style.display = "block";
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

  // Optional: click outside to close
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });


  // =========================
  // POST CREATION
  // =========================
  if (postBtn) {
    postBtn.addEventListener("click", () => {
      const text = textInput.value.trim();
      const file = mediaInput.files[0];

      let content = "";

      // Add text
      if (text) {
        content += `<p>${text}</p>`;
      }

      // Add media
      if (file) {
        const fileURL = URL.createObjectURL(file);

        if (file.type.startsWith("image")) {
          content += `<img src="${fileURL}" width="100%">`;
        } else if (file.type.startsWith("video")) {
          content += `
            <video width="100%" controls>
              <source src="${fileURL}" type="${file.type}">
            </video>
          `;
        }
      }

      // Prevent empty post
      if (!content) return;

      createPost(username, content);

      // Reset inputs
      textInput.value = "";
      mediaInput.value = "";
      modal.style.display = "none";
    });
  }


  // =========================
  // DEMO POSTS
  // =========================
  const demoPosts = [
    ["BlueRocket12", "I came... <img src='images/21.jpeg' width='100%'>"],
    ["BlueRocket12", "I saw... <img src='images/19.jpeg' width='100%'>"],
    ["SilentPenguin42", "Fuck this, heeeheee"],
    ["CrazyTiger56", "Cool shades tho <img src='images/13.jpg' width='100%'>"],
    ["BlueRocket12", "Dayummm 😂 <img src='images/22.jpeg' width='100%'>"],
    ["BlueRocket12", "I conquered... <img src='images/20.jpeg' width='100%'>"],
    ["HappyBanana99", "Rare video <video width='100%' controls><source src='images/v3.mp4' type='video/mp4'></video>"],
    ["ElectricWizard77", "Stay positive"],
    ["HappyBanana99", "Must see 😂 <video width='100%' controls><source src='images/v1.mp4' type='video/mp4'></video>"],
    ["ElectricWizard77", "Im boredddd ahhh"],
    ["HappyBanana99", "Warning ⚠️ <video width='100%' controls><source src='images/v2.mp4' type='video/mp4'></video>"],
    ["CrazyTiger56", "Purplee <img src='images/jjk-meme.jpeg' width='100%'>"],
    ["HappyBanana99", "Goat?! <video width='100%' controls><source src='images/v4.mp4' type='video/mp4'></video>"],
    ["BlueRocket12", "For sale 😂 <img src='images/18.webp' width='100%'>"],
    ["ElectricWizard77", "OOGAH BOOGAH"]
  ];

  demoPosts.forEach(post => createPost(post[0], post[1]));

});