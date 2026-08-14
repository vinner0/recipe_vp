const filterButtons = document.querySelectorAll(".filter-btn");
const recipeCards = document.querySelectorAll(".recipe-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((b) => {
      b.classList.remove("active");
      b.setAttribute("aria-selected", "false");
    });
    button.classList.add("active");
    button.setAttribute("aria-selected", "true");

    const filter = button.dataset.filter;
    recipeCards.forEach((card) => {
      const matches = filter === "all" || card.dataset.cuisine === filter;
      card.classList.toggle("hidden", !matches);
    });
  });
});

const newsletterForm = document.getElementById("newsletter-form");
const formNote = document.getElementById("form-note");

newsletterForm.addEventListener("submit", (e) => {
  e.preventDefault();
  newsletterForm.reset();
  formNote.hidden = false;
});
