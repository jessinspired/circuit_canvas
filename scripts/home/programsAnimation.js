function initProgramsAnimation() {
  const buttons = document.querySelectorAll(".program-btns-container button");
  const progressBar = document.querySelector(".program-progress-bar");

  let index = 0;
  const duration = 8000;

  function activateNextButton() {
    // Remove 'active' class from the current button
    buttons[index].classList.remove("active");

    // Move to the next button, looping back to the start if needed
    index = (index + 1) % buttons.length;

    const newActiveButton = buttons[index];
    newActiveButton.classList.add("active");

    // Get the associated program name from data-program

    document.querySelector(".program-slide.active").classList.remove("active");

    let currentProgram = newActiveButton.getAttribute("data-program");
    // Find the corresponding program slide and add 'active' class
    let updatedSlide = document.querySelector(
      `.program-slide[data-program="${currentProgram}"]`
    );
    if (updatedSlide) {
      updatedSlide.classList.add("active");
    }

    // Restart the animation
    progressBar.style.animation = "none";
    void progressBar.offsetWidth; // Forces reflow to restart animation
    progressBar.style.animation = `fillUp ${duration / 1000}s linear infinite`;
  }

  // Run the function every 4 seconds
  setInterval(activateNextButton, duration);
}

document.addEventListener("DOMContentLoaded", function () {
  initProgramsAnimation();
});
