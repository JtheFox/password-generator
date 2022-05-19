// create map for checkbox values to regex
const rgxMap = new Map()
    .set('lowercase', '[a-z]')
    .set('uppercase', '[A-Z]')
    .set('numbers', '[0-9]')
    .set('special-characters', '[!"#$%&\'()*+,-.\\/:;<=>?@[\\]^ _`{|}~]'); 

function generatePassword() {
    // grab error message element
    const errorMsg = document.getElementsByClassName('error')[0];

    // check if user has at least one checkbox selected
    // code snippet adapted from https://stackoverflow.com/questions/11787665/making-sure-at-least-one-checkbox-is-checked
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    if (!Array.prototype.slice.call(checkboxes).some(item => item.checked)) {
        errorMsg.textContent = 'You must select at least one item.';
        return;
    } else {
        // reset error if user resubmits with at least one item selected
        document.getElementsByClassName('error')[0].textContent = ''; 
    }

    // get minimum and maximum length values
    minLength = document.getElementById('min-length').value || '8';
    maxLength = document.getElementById('max-length').value || '16'; 

    // check if length values are valid
    if (minLength < 8) {
        errorMsg.textContent = "Minimum length is too short.";
        return;
    } else if (maxLength > 128) {
        errorMsg.textContent = "Maximum length is too long.";
        return;
    }
    
    let passRgx = '';
    // use map to add values from checkboxes to regex string
    checkboxes.forEach((item, i) => {
        if (item.checked) {
            passRgx += rgxMap.get(item.value);
            if (i+1 < checkboxes.length) {
                passRgx += '|';
            }
        }
    });
   
    // concat all values of regex string
    passRgx = `(${passRgx}){${minLength},${maxLength}}`;

    // display generated password in output display
    document.getElementById('generated').textContent = new RandExp(passRgx).gen();;
}