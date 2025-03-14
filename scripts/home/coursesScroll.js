document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".courses-scroll");
  const nextBtn = document.getElementById("next-btn");
  const prevBtn = document.getElementById("prev-btn");

  const scrollAmount = container.offsetWidth * 0.3; // Scroll by 50% of container width

  nextBtn.addEventListener("click", function () {
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });

  prevBtn.addEventListener("click", function () {
    container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });
});
