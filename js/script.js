$(document).ready(function () {
    const homeHeader = $('#home header');
    const name = prompt('Masukkan nama Anda: ');
    if (name) homeHeader.text('Hi, ' + name);
});

// Function to validate the form
function validateForm() {
    // Get the input element by its ID
    const nameInput = document.getElementById('name-input');

    if (nameInput.value === '') {
        // If the input is empty, alert the user
        alert('Please enter your name!');
    } else {
        // If the input is valid, display the name in the result form
        document.getElementById('result-form').innerHTML = nameInput.value;
    }
}