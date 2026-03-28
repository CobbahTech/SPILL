document.addEventListener("DOMContentLoaded", () => {
  const intro = document.getElementById("intro-screen");
  const enterBtn = document.getElementById("enter-btn");
  const leaveBtn = document.getElementById("leave-btn");

  // Prevent scroll
  document.body.classList.add("intro-active");

  if (enterBtn) {
    enterBtn.addEventListener("click", () => {
      intro.classList.add("fade-out");
      setTimeout(() => {
        document.body.classList.remove("intro-active"); // optional, just in case
        window.location.href = "spill.html";
      }, 500);
    });
  }

  if (leaveBtn) {
    leaveBtn.addEventListener("click", () => {
      intro.classList.add("fade-out");
      setTimeout(() => {
        document.body.classList.remove("intro-active");
        window.location.href = "https://google.com";
      }, 500);
    });
  }
});