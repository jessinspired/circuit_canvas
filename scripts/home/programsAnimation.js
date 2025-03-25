function initProgramsAnimation() {
  const buttons = document.querySelectorAll(".program-btns-container button");
  const progressBar = document.querySelector(".program-progress-bar");
  let index = 0;
  const duration = 8000; // 8 seconds
  let interval;
  let startTime;
  let elapsedTime = 0;
  let isPaused = false;

  function activateButtonAtIndex(newIndex) {
    // Remove 'active' class from current button and slide
    document
      .querySelector(".program-btns-container button.active")
      ?.classList.remove("active");
    document.querySelector(".program-slide.active")?.classList.remove("active");

    // Update index and set new active button
    index = newIndex;
    buttons[index].classList.add("active");

    // Get corresponding slide
    let currentProgram = buttons[index].getAttribute("data-program");
    document
      .querySelector(`.program-slide[data-program="${currentProgram}"]`)
      ?.classList.add("active");

    // Reset timing
    startTime = performance.now();
    elapsedTime = 0;
    startAutoCycle();
    resetProgressBar();
  }

  function activateNextButton() {
    let newIndex = (index + 1) % buttons.length;
    activateButtonAtIndex(newIndex);
  }

  function startAutoCycle() {
    stopAutoCycle();
    interval = setTimeout(activateNextButton, duration);
    startTime = performance.now();
    progressBar.style.animation = `fillUp ${duration / 1000}s linear`;
  }

  function stopAutoCycle() {
    clearTimeout(interval);
  }

  function resetProgressBar() {
    progressBar.style.animation = "none";
    void progressBar.offsetWidth; // Force reflow
    progressBar.style.animation = `fillUp ${duration / 1000}s linear`;
  }

  function pauseProgramsAnimation() {
    if (!isPaused) {
      isPaused = true;
      clearTimeout(interval);
      elapsedTime += performance.now() - startTime;
      let remainingTime = duration - elapsedTime;

      // Pause progress bar
      progressBar.style.animationPlayState = "paused";

      console.log(`Paused at: ${(elapsedTime / 1000).toFixed(2)}s`);
      console.log(`Remaining time: ${(remainingTime / 1000).toFixed(2)}s`);
    }
  }

  function playProgramsAnimation() {
    isPaused = false;
    progressBar.style.animationPlayState = "running";
    let remainingTime = duration - elapsedTime;

    interval = setTimeout(activateNextButton, remainingTime);
    startTime = performance.now();
    console.log(
      `Resuming at: ${elapsedTime / 1000}s, Remaining: ${remainingTime / 1000}s`
    );
  }

  // Start first cycle
  activateButtonAtIndex(0);

  // Add event listeners for manual button clicks
  buttons.forEach((button, btnIndex) => {
    button.addEventListener("click", () => {
      activateButtonAtIndex(btnIndex);
    });
  });

  let learnMoreBtns = document.querySelectorAll(
    ".program-info-container > :nth-child(2) > :nth-child(2)"
  );

  learnMoreBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      btn.nextElementSibling.showModal();
      pauseProgramsAnimation();
    });
  });

  let closeProgramModalBtns = document.querySelectorAll(
    ".program-info-container .card-modal > .close-item-modal-btn"
  );
  closeProgramModalBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      btn.parentElement.close();
      playProgramsAnimation();
    });
  });

  // Expose function globally
  window.pauseProgramsAnimation = pauseProgramsAnimation;
  window.playProgramsAnimation = playProgramsAnimation;
}

document.addEventListener("DOMContentLoaded", initProgramsAnimation);
