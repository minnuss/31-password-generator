const resultEl = document.querySelector('.result');
const clipBoardBtn = document.querySelector('.clipBoardBtn');
const passLength = document.querySelector('.setting input[type="number"]');

const settingsPanel = document.querySelector('.settings');
const uppercase = document.querySelector('.uppercase');
const lowercase = document.querySelector('.lowercase');
const numbers = document.querySelector('.numbers');
const symbols = document.querySelector('.symbols');
const generateBtn = document.querySelector('.btn-large');

generateBtn.addEventListener('click', () => {
    // check password length value
    const lengthVal = +passLength.value;
    // check if checkbox is checked
    const checkUpp = uppercase.checked;
    const checkLow = lowercase.checked;
    const checkNum = numbers.checked;
    const checkSym = symbols.checked;

    resultEl.innerText = generatePass(checkUpp, checkLow, checkNum, checkSym, lengthVal)
})

function generatePass(upp, low, num, sym, len) {
    // set blank variable for generating pass
    let resultPass = ''
    // check for sum number of checked checkboxes
    let checkedNum = upp + low + num + sym;
    // console.log(checkedNum)
    // if there is no checked checkboxes, return blank
    if (checkedNum === 0) {
        return resultEl.innerText = ''
    }

    for (let i = 0; i < len / checkedNum; i++) {
        if (upp) resultPass += getRandomUp()
        if (low) resultPass += getRandomLower()
        if (num) resultPass += getNum()
        if (sym) resultPass += getSymbols()
    }
    // console.log(resultPass)

    // sliced final result by password lenght defined by user
    return resultPass.slice(0, len)
}

// RANDOM LOWERCASE LETTERS
function getRandomLower() {
    // ascii table -lowercase chars from 97 - 122
    max = 123;
    min = 97;
    let random = Math.floor(Math.random() * (max - min) + min);
    return String.fromCharCode(random)
}
// RANDOM UPPERCASE LETTERS
function getRandomUp() {
    // ascii table -uppercase chars from 65 - 90
    max = 91;
    min = 65;
    let random = Math.floor(Math.random() * (max - min) + min);
    return String.fromCharCode(random)
}
// RANDOM NUMBERS
function getNum() {
    // ascii table -number chars from 48 - 57
    max = 58;
    min = 48;
    let random = Math.floor(Math.random() * (max - min) + min);
    return String.fromCharCode(random)
}
// RANDOM SYMBOLS
function getSymbols() {
    // no sorted symbols in ascii table, so string is created
    let symbols = '!@#$%^&*()[]=<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)]
}

// COPY TO CLIPBOARD
clipBoardBtn.addEventListener('click', () => {
    function copytoClipBoard() {
        const newClipBoardEl = document.createElement('textarea');
        const passValue = resultEl.textContent;
        if (!passValue) {
            return
        }
        newClipBoardEl.value = passValue;
        document.body.appendChild(newClipBoardEl)
        newClipBoardEl.select();
        document.execCommand("copy");
        newClipBoardEl.remove();
        alert('Password copied')
    }
    copytoClipBoard()
})