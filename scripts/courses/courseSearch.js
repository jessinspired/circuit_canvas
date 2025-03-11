const searchInput = document.querySelector("#courses-search"); // Ensure your input has this ID
const coursesCategory = document.querySelector(".courses-category");
const courseCards = document.querySelectorAll(".course-card");
const heading = document.querySelector(".courses-category h1");
const noResultDisplay = document.querySelector(".no-result-display");

// Hide the no result display initially
noResultDisplay.style.display = "none";

searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();
  let matchFound = false;

  courseCards.forEach((card) => {
    const keywords = card.dataset.keywords.toLowerCase();
    if (keywords.includes(query)) {
      card.style.display = "block";
      matchFound = true;
    } else {
      card.style.display = "none";
    }
  });

  if (query.length === 0) {
    // Show all courses when input is empty
    heading.textContent = "Showing all courses";
    courseCards.forEach((card) => (card.style.display = "block"));
    coursesCategory.style.display = "grid";
    noResultDisplay.style.display = "none";
  } else if (matchFound) {
    // Show results when matches are found
    heading.textContent = "Search Result";
    coursesCategory.style.display = "grid";
    noResultDisplay.style.display = "none";
  } else {
    // Show "No Results" when nothing matches
    coursesCategory.style.display = "none";
    noResultDisplay.style.display = "block";
  }
});
