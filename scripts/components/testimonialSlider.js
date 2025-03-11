const articles = document.querySelectorAll(
  ".testimonial-article-container article"
);
const images = document.querySelectorAll(".testimonial-images img");
const progressBar = document.querySelector(".testimonial-progress-bar div");

let currentIndex = 0;
const totalSlides = articles.length;
const intervalTime = 3000; // 3 seconds

// Calculate bar height dynamically
const progressBarContainer = document.querySelector(
  ".testimonial-progress-bar"
);
const progressBarHeight = 100 / totalSlides; // Bar height proportional to slides

progressBar.style.height = `${progressBarHeight}%`; // Set the height dynamically

function changeSlide() {
  // Remove active class from current article and image
  articles[currentIndex].classList.remove("active");
  images[currentIndex].classList.remove("active");

  // Move to the next index
  currentIndex = (currentIndex + 1) % totalSlides;

  // Add active class to new article and image
  articles[currentIndex].classList.add("active");
  images[currentIndex].classList.add("active");

  // Move progress bar down
  const step = currentIndex * progressBarHeight;
  progressBar.style.top = `${step}%`;

  // Reset animation when it reaches the last
  if (currentIndex === 0) {
    setTimeout(() => {
      progressBar.style.transition = "none";
      progressBar.style.top = "0";
      setTimeout(
        () => (progressBar.style.transition = "top 0.7s ease-in-out"),
        50
      );
    }, 700);
  }
}

setInterval(changeSlide, intervalTime);
