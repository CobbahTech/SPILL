document.addEventListener("DOMContentLoaded", () => {

  const intro = document.getElementById("intro-screen");
  const enterBtn = document.getElementById("enter-btn");
  const leaveBtn = document.getElementById("leave-btn");

  if (enterBtn) {
    enterBtn.addEventListener("click", () => {
      intro.classList.add("fade-out");

      setTimeout(() => {
        window.location.href = "spill.html";
      }, 500); // matches CSS duration
    });
  }

  if (leaveBtn) {
    leaveBtn.addEventListener("click", () => {
      intro.classList.add("fade-out");

      setTimeout(() => {
        window.location.href = "https://google.com";
      }, 500);
    });
  }

});