// create map for checkbox values to regex
const rgxMap = new Map()
    .set('lowercase', 'a-z')
    .set('uppercase', 'A-Z')
    .set('numbers', '0-9')
    .set('special-characters', '!"#$%&\'()*+,\\-.\\/:;<=>?@\\[\\]^_`{|}~'); 

function generatePassword() {
    // grab error message element
    const errorMsg = document.getElementsByClassName('error')[0];

    // check if user has at least one checkbox selected
    // code snippet adapted from https://stackoverflow.com/questions/11787665/making-sure-at-least-one-checkbox-is-checked
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    if (!Array.prototype.slice.call(checkboxes).some(item => item.checked)) {
        errorMsg.textContent = 'You must select at least one character type.';
        return;
    } else {
        // reset error if user resubmits with at least one item selected
        document.getElementsByClassName('error')[0].textContent = ''; 
    }

    // get minimum and maximum length values
    const minLength = parseInt(document.getElementById('min-length').value) || 8;
    const maxLength = parseInt(document.getElementById('max-length').value) || 16; 

    // check if length values are valid
    if (minLength < 8) {
        errorMsg.textContent = "Minimum length is too short.";
        return;
    } else if (maxLength > 128) {
        errorMsg.textContent = "Maximum length is too long.";
        return;
    } else if (minLength > maxLength) { 
        errorMsg.textContent = "Minimum length must be shorter than maximum length.";
        return;
    }
    
    let passRgx = '';
    // use map to add values from checkboxes to regex string
    checkboxes.forEach((item, i) => {
        if (item.checked) {
            passRgx += rgxMap.get(item.value);
        }
    });
   
    // concat all values of regex string
    passRgx = `^[${passRgx}]{${minLength},${maxLength}}$`;
    console.log(passRgx);

    // display generated password in output display
    document.getElementById('generated').textContent = new RandExp(passRgx, 'gi').gen();
    /* defaultregexp with all criteria: 
        /^[a-zA-Z0-9!"#$%&'()*+,\-.\/:;<=>?@\[\]^_`{|}~]{8,16}$/gi
    */
}

// copy to clipboard & modal display functions
function copy(text) {
    navigator.clipboard.writeText(text);
    const modal = document.getElementsByClassName('modal')[0];
    modal.classList.add('show');
}

window.onclick = function(event) {
    if (event.target == document.getElementById('generated')) {
        return;
    }
    let modal = document.getElementsByClassName('modal')[0];
    if (event.target != modal && modal.classList.contains('show')) {
        modal.classList.remove('show');
    }
}
