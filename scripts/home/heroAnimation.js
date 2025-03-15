document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".hero-images img");
  let currentIndex = 0;

  setInterval(() => {
    // Remove 'active' class from the current image
    images[currentIndex].classList.remove("active");

    // Move to the next image (loop back to the first)
    currentIndex = (currentIndex + 1) % images.length;

    // Add 'active' class to the next image
    images[currentIndex].classList.add("active");
  }, 5000); // Change every 3 seconds
});
