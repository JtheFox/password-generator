// create map for checkbox values to regex
const rgxMap = new Map()
    .set('lowercase', '[a-z]')
    .set('uppercase', '[A-Z]')
    .set('numbers', '[0-9]')
    .set('special-characters', '[!"#$%&\'()*+,-./:;<=>?@[\\]^ _`{|}~]'); 

function generatePassword() {
    // input validation to check if user has at least one checkbox selected
    // code snippet adapted from https://stackoverflow.com/questions/11787665/making-sure-at-least-one-checkbox-is-checked
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    if (!Array.prototype.slice.call(checkboxes).some(item => item.checked)) {
        document.getElementsByClassName('error')[0].textContent = 'You must select at least one item.';
        return;
    } else {
        // reset error if user resubmits with at least one item selected
        document.getElementsByClassName('error')[0].textContent = ''; 
    }
    
    let passRgx = '';
    // use map to add values from checkboxes to regex string
    for (let item of checkboxes) {
        if (item.checked) {
            passRgx += rgxMap.get(item.value);
        }
    }

    document.getElementById('generated').textContent = new RandExp(passRgx).gen();;
}