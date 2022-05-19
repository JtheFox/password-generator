function generatePassword() {
    // Code snippet adapted from https://stackoverflow.com/questions/11787665/making-sure-at-least-one-checkbox-is-checked
    let checkboxes = document.querySelectorAll('input[type="checkbox"]');
    if (!Array.prototype.slice.call(checkboxes).some(item => item.checked)) {
        document.getElementsByClassName('error')[0].textContent = "You must select at least one item.";
    }
}