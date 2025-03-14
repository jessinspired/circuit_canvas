document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".courses-scroll");
  const nextBtn = document.getElementById("next-btn");
  const prevBtn = document.getElementById("prev-btn");

  const scrollAmount = container.offsetWidth * 0.95; // Scroll by 50% of container width

  function checkScroll() {
    prevBtn.disabled = container.scrollLeft <= 0;
    nextBtn.disabled =
      container.scrollLeft + container.clientWidth >= container.scrollWidth;

    prevBtn.style.backgroundColor = prevBtn.disabled ? "#ccc" : "#2E1562";
    nextBtn.style.backgroundColor = nextBtn.disabled ? "#ccc" : "#2E1562";
  }

  nextBtn.addEventListener("click", function () {
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });

  prevBtn.addEventListener("click", function () {
    container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });

  container.addEventListener("scroll", checkScroll);
  checkScroll(); // Initial check
});
