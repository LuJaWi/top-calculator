// Variable that will be displayed on screen as numbers are typed. Number is stored as string.
let activeNumber = '0'
// Variable that will be operated on. Overwritten as value for activeNumber whenever equals or an operator is pressed.
let memoryNumber = ''
// Variable to hold a string indicating the type of operation to be performed
let operationType = ''
// Query selector for display element
displaySelector = document.querySelector(".display-text");
// Writes intial value for the caculator screen
displaySelector.innerText = '0';
// Variable to determine last button type pressed; helps determine behavior for sequential presses
let lastPress = '';

// Updates the active array by updating the index with the new value at the end, returns the complete value
let updateActiveNumber = function (newValue) {
    activeNumber += '' + newValue;
    return activeNumber;
};

// Build numbers in active holder array index based on button presses
numberButtonSelector = document.querySelectorAll(".number");
numberButtonSelector.forEach(numberButton => {
    numberButton.addEventListener('click', () => {
        if (lastPress == 'equals') {
            clearMemory()
            
        }; // If user enters a number after pressing 'equals', they start with fresh memory
        if (activeNumber.length > 10 ) {return} // Prevents overflow
        if (activeNumber == '0') {activeNumber = ''}; // Clears zero before new number is added to prevent leading zeroes
        if (activeNumber == '-0') {activeNumber = '-'}; // Allows minus symbol to be appended before numbers are typed.
        displaySelector.innerText = updateActiveNumber(numberButton.innerText); // updates display to reflect value at active array index
        lastPress = 'number'
    });
});

// Function to reset active and memory number & operation type. Does not change display
let clearMemory = function () {
    activeNumber = '0'
    memoryNumber = ''
    operationType = ''
}

// Execute previously selected operator on activeNumber and memoryNumber.
document.getElementById('equals').addEventListener('click', () => {
    lastPress='equals';
    memoryNumber = calculate(operationType)
    activeNumber = '';
    displaySelector.innerText = trim(memoryNumber);
});

document.getElementById('clear').addEventListener('click', () => {
    clearMemory();
    displaySelector.innerText = '0'
});

// Select operation to be performed
operatorButtonSelector = document.querySelectorAll(".operator");
operatorButtonSelector.forEach(operatorButton => {
    operatorButton.addEventListener('click', () => {
        if (lastPress == 'equals') {
            lastPress = 'operator'
            return
        };
        if (memoryNumber == '') {
                memoryNumber = activeNumber;
                activeNumber = '';
            } else {
                memoryNumber = calculate(operationType)
                displaySelector.innerText = trim(memoryNumber);
                activeNumber = '';
            }
        operationType = operatorButton.id;
        lastPress = 'operator'
    });
});

// Performs operation between activeNumber and memoryNumber depending on operation type.
let calculate = function (calcType) {
    if (calcType == 'add') {
        result = String(Number(memoryNumber) + Number(activeNumber));
    } else if (calcType == 'subtract') {
        result = String(Number(memoryNumber) - Number(activeNumber));
    } else if (calcType == 'multiply') {
        result = String(Number(memoryNumber) * Number(activeNumber));
    } else if (calcType == 'divide') {
        if (Number(activeNumber) == '0') { // divide by zero handling
            result = "uhhhh..."
            clearMemory();
        }
        else {result = String(Number(memoryNumber) / Number(activeNumber));};
    }
    return result;
}

// Change whether activeNumber is positive or negative
document.getElementById('positive-negative').addEventListener('click', () => {
    if (activeNumber == '0') {
        activeNumber = "-0"
    } else {
        if (lastPress == 'equals') { // Move number to active and swap plus/minus
            activeNumber = memoryNumber; 
        }
        activeNumber = String(Number(activeNumber)*-1);
    }
    displaySelector.innerText = activeNumber;
});

// Divides number on screen by 100 when % button is pressed
document.getElementById('percent').addEventListener('click', () => {
    if (lastPress == 'equals') {
        activeNumber = memoryNumber;

    }
    activeNumber = String(Number(activeNumber)/100);
    displaySelector.innerText = activeNumber;
});

// Trims numbers to make sure they fit on display
let trim = function(input) {
    if (input.length < 11) {
        return input
    } // Returns input unchanged if it already fits
    if (!input.includes('.')) { // throws overflow error if number is not a decimal
        clearMemory();
        return "OverflowErr"
    } else {
        decimalLocation = input.search('.')
        if (decimalLocation > 12) { // Throws overflow error if rounded number is greater than 11 digits.
            clearMemory();
            return "OverflowErr"
        }
        wholeNumber = input.slice(0, decimalLocation);
        decimalNumber = inputSlice(decimalLocation+1)
        roundedDecimal = (Math.round(Number(input*10000000000))/10000000000);
        return roundedDecimal
    }
}

// Function to be called in the console to help with troubleshooting
let logInfo = function () {
    console.log('activeNumber: ' + activeNumber);
    console.log('memoryNumber: ' + memoryNumber);
    console.log('operationType: ' + operationType);
    console.log('lastPress: ' + lastPress);
}