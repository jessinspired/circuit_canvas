function initProgramsAnimation() {
  const buttons = document.querySelectorAll(".program-btns-container button");
  const progressBar = document.querySelector(".program-progress-bar");
  let index = 0;
  const duration = 8000; // 8 seconds
  let interval;

  function activateButtonAtIndex(newIndex) {
    // Remove 'active' class from current button and slide
    document
      .querySelector(".program-btns-container button.active")
      ?.classList.remove("active");
    document.querySelector(".program-slide.active")?.classList.remove("active");

    // Update index and set new active button
    index = newIndex;
    const newActiveButton = buttons[index];
    newActiveButton.classList.add("active");

    // Get corresponding slide based on data-program
    let currentProgram = newActiveButton.getAttribute("data-program");
    let updatedSlide = document.querySelector(
      `.program-slide[data-program="${currentProgram}"]`
    );
    if (updatedSlide) {
      updatedSlide.classList.add("active");
    }

    // Reset and restart progress bar animation
    progressBar.style.animation = "none";
    void progressBar.offsetWidth; // Force reflow to restart animation
    progressBar.style.animation = `fillUp ${duration / 1000}s linear infinite`;
  }

  function activateNextButton() {
    let newIndex = (index + 1) % buttons.length;
    activateButtonAtIndex(newIndex);
  }

  function startAutoCycle() {
    interval = setInterval(activateNextButton, duration);
  }

  function stopAutoCycle() {
    clearInterval(interval);
  }

  // Start automatic cycling
  startAutoCycle();

  // Add event listeners for manual button clicks
  buttons.forEach((button, btnIndex) => {
    button.addEventListener("click", () => {
      stopAutoCycle(); // Stop automatic cycling
      activateButtonAtIndex(btnIndex); // Activate the clicked button
      startAutoCycle(); // Continue from clicked button
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  initProgramsAnimation();
});
