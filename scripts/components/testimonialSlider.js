const articles = document.querySelectorAll(
  ".testimonial-article-container article"
);
const images = document.querySelectorAll(".testimonial-images > *");
const progressBar = document.querySelector(".testimonial-progress-bar div");
const prevBtn = document.querySelector(
  ".testimonial-toggle-btns-container button:first-child"
);
const nextBtn = document.querySelector(
  ".testimonial-toggle-btns-container button:last-child"
);

let currentIndex = 0;
const totalSlides = articles.length;
const intervalTime = 3000; // 3 seconds
let intervalId;

// Calculate bar height dynamically
const progressBarHeight = 100 / totalSlides;
progressBar.style.height = `${progressBarHeight}%`;

function updateSlide(index) {
  // Remove active class from current article and image
  articles[currentIndex].classList.remove("active");
  images[currentIndex].classList.remove("active");

  // Update index
  currentIndex = index;

  // Add active class to new article and image
  articles[currentIndex].classList.add("active");
  images[currentIndex].classList.add("active");

  // Move progress bar
  const step = currentIndex * progressBarHeight;
  progressBar.style.transition = "top 0.7s ease-in-out";
  progressBar.style.top = `${step}%`;

  // Reset animation when reaching the first slide
  if (currentIndex === 0) {
    setTimeout(() => {
      progressBar.style.transition = "none";
      progressBar.style.top = "0";
      setTimeout(
        () => (progressBar.style.transition = "top 0.7s ease-in-out"),
        100
      );
    }, 700);
  }
}

// Auto-slide function
function changeSlide() {
  updateSlide((currentIndex + 1) % totalSlides);
}

// Start auto-slide
function startSlider() {
  intervalId = setInterval(changeSlide, intervalTime);
}

// Manual controls
nextBtn.addEventListener("click", () => {
  clearInterval(intervalId);
  updateSlide((currentIndex + 1) % totalSlides);
  startSlider();
});

prevBtn.addEventListener("click", () => {
  clearInterval(intervalId);
  updateSlide((currentIndex - 1 + totalSlides) % totalSlides);
  startSlider();
});

// Pause auto-slide on hover
document
  .querySelector(".testimonial-slider-container")
  .addEventListener("mouseenter", () => {
    clearInterval(intervalId);
  });
document
  .querySelector(".testimonial-slider-container")
  .addEventListener("mouseleave", startSlider);

// Initialize slider
startSlider();
