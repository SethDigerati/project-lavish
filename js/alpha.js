let subcategories = document.querySelectorAll(".subcategories li");

subcategories.forEach((subcategory) => {
  subcategory.addEventListener("click", function (e) {
    e.preventDefault();
    console.log(subcategory.innerText);
  });
});
// Select all checkboxes
const checkboxes = document.querySelectorAll('input[type="checkbox"]');

// Loop through each checkbox
checkboxes.forEach(checkbox => {
    // Add event listener for click event
    checkbox.addEventListener('click', function() {
        // Check if the checkbox is checked
        if (this.checked) {
            // Perform your action when checkbox is checked
            console.log(`Checkbox ${this.id} is checked.`);
        } else {
            // Perform your action when checkbox is unchecked
            console.log(`Checkbox ${this.id} is unchecked.`);
        }
    });
});

// Select all checkboxes
const checkboxes = document.querySelectorAll('input[type="checkbox"]');

// Loop through each checkbox
checkboxes.forEach(checkbox => {
    // Add event listener for click event
    checkbox.addEventListener('click', function() {
        // Check if the checkbox is checked
        if (this.checked) {
            // Add class to change background color
            this.parentNode.classList.add('checked');
            // Perform your action when checkbox is checked
            console.log(`Checkbox ${this.id} is checked.`);
        } else {
            // Remove class to revert background color
            this.parentNode.classList.remove('checked');
            // Perform your action when checkbox is unchecked
            console.log(`Checkbox ${this.id} is unchecked.`);
        }
    });
});
