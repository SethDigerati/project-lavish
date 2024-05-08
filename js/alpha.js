let subcategories = document.querySelectorAll(".subcategories li");

subcategories.forEach((subcategory) => {
  subcategory.addEventListener("click", function (e) {
    e.preventDefault();
    console.log(subcategory.innerText);
  });
});
