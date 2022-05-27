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
    let validCriteria = [];
    // use map to add values from checkboxes to regex string
    checkboxes.forEach((item, i) => {
        if (item.checked) {
            criteriaRgx = rgxMap.get(item.value)
            passRgx += criteriaRgx;
            validCriteria.push(criteriaRgx);
        }
    });

    // concat all values of regex string
    passRgx = `^[${passRgx}]{${minLength},${maxLength}}$`;

    // generate password with minimum of 2 of each selected criteria
    let genPass = '';
    let genAttempts = 0;
    do {
        genPass = new RandExp(passRgx, 'g').gen();
        genAttempts++;
    } while (!validatePassword(genPass, validCriteria));
    console.log(`Password successfully generated in ${genAttempts} attempts`);

    // display generated password in output display
    document.getElementById('generated').textContent = genPass;
    /* default regex with all criteria: 
        /^[a-zA-Z0-9!"#$%&'()*+,\-.\/:;<=>?@\[\]^_`{|}~]{8,16}$/gi
    */
}

function validatePassword(password, criteria) {
    let valid = true;

    // mark generated password invalid if character type occurs less than 2 times
    for (const value of criteria) {
        const rgxMatch = password.match(new RegExp(`[${value}]`, 'g')) || [];
        if (rgxMatch.length < 2) {
            valid = false;
            return valid;
        }
    }

    // return if password satisfies criteria
    return valid;
}

// copy to clipboard & modal display functions
function copy(text) {
    navigator.clipboard.writeText(text);
    const modal = document.getElementsByClassName('modal')[0];
    modal.classList.add('show');
}

window.onclick = function(event) {
    if (event.target !== document.getElementById('generated')) {
        document.getElementsByClassName('modal')[0].classList.remove('show');
    }
}

