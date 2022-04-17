// Create a script that writes each number key press to the first index in an array

// Multiple number key presses should concatenate that key with previous entries to build larger numbers

// When an operation key is pressed, 
// iterate to the next index position and save the operation type

// When "=" is pressed, perform the operation on the two sets of numbers, display the results
// and clear the holder array

// If a number, an operator, and a number are followed by another operator, write the output
// of the first operation set to the display and write the
// output to the first array position and repeat the previous steps until "=" is pressed.

// Create holder array where [0],[1] are values to be operated on
// stored as strings so new integers can be concatenated easily
let holderArray = ['0','0'];
// variable to dictate which array location is being written to; default to first position
let activeArrayIndex = 0;

displaySelector = document.querySelector(".display-text");

let displayActive = function () {
    displaySelector.innerText = holderArray[activeArrayIndex];
}

displayActive();

// Create Event Listeners

// Updates the active array by updating the index with the new value at the end, returns the complete value
let updateActiveArrayIndex = function (newValue) {
    holderArray[activeArrayIndex] = holderArray[activeArrayIndex] + '' + newValue;
    return holderArray[activeArrayIndex];
};

numberButtonSelector = document.querySelectorAll(".number");


// Build numbers in active holder array index based on button presses
numberButtonSelector.forEach(numberButton => {
    numberButton.addEventListener('click', () => {
        if (holderArray[activeArrayIndex].length > 10 ) {return} // Prevents overflow
        if (holderArray[activeArrayIndex] == '0') {holderArray[activeArrayIndex] = ''}; // Prevents leading zeroes
        displaySelector.innerText = updateActiveArrayIndex(numberButton.innerText); // updates display to reflect active array index
        console.log('Current Holder Array Index: ' +  activeArrayIndex)
    });
});

// clear the holder array index and display
document.getElementById('clear').addEventListener('click', () => {
    holderArray[activeArrayIndex] = '0';
    displaySelector.innerText = holderArray[activeArrayIndex];
})