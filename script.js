// Ensure this runs only on spill.html
if (document.body) document.body.classList.add('spill-page');

const adjectives = ["Silent","Crazy","Happy","Blue","Electric"];
const nouns = ["Penguin","Tiger","Banana","Rocket","Wizard"];

// Get username from localStorage or create new
let username = localStorage.getItem("spillUsername");
if (!username) {
    const randomNumber = Math.floor(Math.random() * 100);
    username = adjectives[Math.floor(Math.random() * adjectives.length)] + 
               nouns[Math.floor(Math.random() * nouns.length)] +
               randomNumber;
    localStorage.setItem("spillUsername", username);
}

// Set username in header
const usernameElem = document.getElementById("username");
if (usernameElem) usernameElem.textContent = username;

// Get feed container
const feed = document.getElementById("feed");

// Example avatars
const avatars = [
  'images/1.jpg',
  'images/2.jpg',
  'images/3.jpg',
  `images/4.jpg`,
  'images/5.jpg',
  'images/6.jpg',
  'images/7.jpg',
  'images/8.jpg',
  'images/9.jpg',
  'images/10.webp',
  'images/11.webp',
  'images/12.jpg',
  'images/13.jpg',
  'images/14.jpg',
  'images/15.jpg',
  'images/16.jpg',
  'images/17.jpg',
  'images/18.webp',

];

// Function to get random avatar
function randomAvatar() {
    return avatars[Math.floor(Math.random() * avatars.length)];
}

// Function to create a post with avatar
function createPost(user, content) {
    if (!feed) return;
    const post = document.createElement("div");
    post.className = "post";

    post.innerHTML = `
        <div class="post-header">
            <img src="${randomAvatar()}" alt="avatar" style="width:30px; height:30px; border-radius:50%; margin-right:8px; vertical-align:middle;">
            <strong>${user}</strong>
        </div>
        <div class="post-content">${content}</div>
        <div class="post-actions">
            <button>🔥</button>
            <button>💬</button>
            <button>❤️</button>
        </div>
    `;
    feed.appendChild(post);
}

// Example posts
createPost("SilentPenguin42", "Fuck this, heeeheee");
createPost("CrazyTiger56", "Cool shades tho <img src='images/13.jpg' width='100%'>");
createPost("HappyBanana99", "Rare video of ee err girl <video width='100%' controls><source src='images/v3.mp4' type='video/mp4'></video>");
createPost("BlueRocket12", "For sale, contact me on your ass 😂 <img src='images/18.webp' width='100%'>");
createPost("ElectricWizard77", "I just want to advice you sickos, Always stay positive and also IDGAF");
createPost("HappyBanana99", "Must see 😂 <video width='100%' controls><source src='images/v1.mp4' type='video/mp4'></video>");
createPost("ElectricWizard77", "Im boredddd ahhh");
createPost("HappyBanana99", "Pls don't watch, dont say i didnt warn ya <video width='100%' controls><source src='images/v2.mp4' type='video/mp4'></video>");
createPost("CrazyTiger56", "Purplee <img src='images/jjk-meme.jpeg' width='100%'>");
createPost("HappyBanana99", "Goat, Chriastianoooo is this tuff?! <video width='100%' controls><source src='images/v4.mp4' type='video/mp4'></video>");
createPost("ElectricWizard77", "OOGAH BOOGAH");
createPost("SilentPenguin42", "Bankai Haka No Togame ");
createPost("BlueRocket12", "Beautiful or not? <img src='images/6.jpg' width='100%'>");
createPost("SilentPenguin42", "Is chuck Norris still alive? ");
createPost("CrazyTiger56", "Another cheers for myself <img src='images/3.jpg' width='100%'>");
createPost("SilentPenguin42", "Death note or Chainsaw man?");
createPost("HappyBanana99", "Best anime ever naruto <video width='100%' controls><source src='images/naruto.mp4' type='video/mp4'></video>");
createPost("SilentPenguin42", "I heard there's season 2 of Class room of the elite, is it true?  ");
createPost("BlueRocket12", "Look at this funny pic! <img src='images/funnyguy.jpeg' width='100%'>");
createPost("ElectricWizard77", "Where's my mom??");
createPost("HappyBanana99", "Rare video of someone oo 😂 <video width='100%' controls><source src='images/Mee.mp4' type='video/mp4'></video>");
createPost("BlueRocket12", "Fr this time, stupid hat for sale <img src='images/11.webp' width='100%'>");
createPost("SilentPenguin42", "You know what, I just want to say, I love this community, so im lwkyenuinly giving this out for fckn free <img src='images/9.jpg' width='100%'>");
createPost("HappyBanana99", "Wholesome team frr <video width='100%' controls><source src='images/v5.mp4' type='video/mp4'></video>");
createPost("ElectricWizard77", "Who knows how to rap whiles eating tuna flakes....");
