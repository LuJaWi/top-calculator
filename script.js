// Create empty array
let holderArray = ['0'];
// Variable to dictate which array location is being written to; default to first position
let activeArrayIndex = 0;
// Variable to hold the type of operation to be performed
let operationType = ''
// Query selector for display element
displaySelector = document.querySelector(".display-text");
// Function for updating display
displaySelector.innerText = '0';

// Updates the active array by updating the index with the new value at the end, returns the complete value
let updateActiveArrayIndex = function (newValue) {
    holderArray[activeArrayIndex] = holderArray[activeArrayIndex] + '' + newValue;
    return holderArray[activeArrayIndex];
};

// Build numbers in active holder array index based on button presses
numberButtonSelector = document.querySelectorAll(".number");
numberButtonSelector.forEach(numberButton => {
    numberButton.addEventListener('click', () => {
        if (holderArray[activeArrayIndex].length > 10 ) {return} // Prevents overflow
        if (holderArray[activeArrayIndex] == '0') {holderArray[activeArrayIndex] = ''}; // Clears zero before new number is added
        displaySelector.innerText = updateActiveArrayIndex(numberButton.innerText); // updates display to reflect value at active array index
        console.log('Current Holder Array Index: ' +  activeArrayIndex)
    });
});

// clear the holder array index and display
document.getElementById('clear').addEventListener('click', () => {
    activeArrayIndex = 0
    holderArray = ['0']
    displaySelector.innerText = holderArray[activeArrayIndex];
});
// Execute previously selected operator on two newest values in holder array
document.getElementById('equals').addEventListener('click', () => {
    if (activeArrayIndex == 0) {return} // Nothing happens if only a single number has been entered
    calculate(operationType);
});

// Select operation to be performed on second number
operatorButtonSelector = document.querySelectorAll(".operator");
operatorButtonSelector.forEach(operatorButton => {
    operatorButton.addEventListener('click', () => {
        operationType = operatorButton.id; // Get operation type from element ID
        if (activeArrayIndex == 0) { // Appends new value to array and returns with no calculation
            holderArray.push('0');
            activeArrayIndex = 1;
            return;
        }
        calculate(operationType);
    });
});

let calculate = function (calcType) {
    if (calcType == 'add') {
        result = String(Number(holderArray[activeArrayIndex-1]) + Number(holderArray[activeArrayIndex]));
    } else if (calcType == 'subtract') {
        result = String(Number(holderArray[activeArrayIndex-1]) - Number(holderArray[activeArrayIndex]));
    } else if (calcType == 'multiply') {
        result = String(Number(holderArray[activeArrayIndex-1]) * Number(holderArray[activeArrayIndex]));
    } else if (calcType == 'divide') {
        result = String(Number(holderArray[activeArrayIndex-1]) / Number(holderArray[activeArrayIndex]));
    }
    holderArray.push(result); // pushes calculated value to array
    activeArrayIndex += 1; // moves acive array position to newly created result position
    displaySelector.innerText = holderArray[activeArrayIndex]; // changes inner text to reflect result
    holderArray.push('0') // Creates new empty slot in array for next number to occupy
    activeArrayIndex += 1; // Changes active array index to latest
}