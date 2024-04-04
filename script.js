// Variables for number 1, number 2, and operator
let num1 = null;
let num2 = null;
let operator = null;
let isOperatorClicked = false; // Check if operator is clicked or not

let buttons = document.querySelectorAll(".button");

// To get the button clear class
let clearButton = document.querySelector(".button-clear");
clearButton.addEventListener("click", clearDisplay);

// Event listener for each button
buttons.forEach((button) => {
  button.addEventListener("click", function () {
    let insertText = document.getElementById("inserted-text");
    if (this.textContent === "⌫") {
      // If the button is backspace, remove the last character from the display
      insertText.textContent = insertText.textContent.slice(0, -1);
    } else if (
      this.textContent !== "=" &&
      this.textContent !== "+" &&
      this.textContent !== "-" &&
      this.textContent !== "*" &&
      this.textContent !== "/"
    ) {
      // Check if the button is not an operator
      if (this.textContent === "." && insertText.textContent.includes(".")) {
        // If the button is a decimal point and the display already has a decimal point, do nothing
        return;
      }
      // Check if the number of digits is less than or equal to 15 before adding to the display
      if (insertText.textContent.length < 15) {
        insertText.textContent += this.textContent;
      }
    } else if (
      this.textContent === "+" ||
      this.textContent === "-" ||
      this.textContent === "*" ||
      this.textContent === "/"
    ) {
      // If the button is an operator, convert the current display text to an integer
      // and store it in num1 or num2 depending on whether an operator has been clicked
      if (!isOperatorClicked) {
        num1 = parseFloat(insertText.textContent, 10);
        operator = this.textContent;
        isOperatorClicked = true;
      } else {
        num2 = parseFloat(insertText.textContent, 10);
        let result = operate(operator, num1, num2);
        insertText.textContent = result.toString();
        num1 = result;
        operator = this.textContent;
      }
      // You can also clear the display after storing the number
      insertText.textContent = "";
    } else if (this.textContent === "=") {
      // If the button is "=", perform the operation
      num2 = parseFloat(insertText.textContent, 10);
      if (operator === "/" && num2 == 0) {
        alert("You can't divide by zero!");
        clearDisplay();
      }
      let result = operate(operator, num1, num2);
      insertText.textContent = result.toFixed(2).toString();
    }
  });
});

// Function to clear the display
function clearDisplay() {
  num1 = null;
  num2 = null;
  operator = null;
  isOperatorClicked = false;
  document.getElementById("inserted-text").textContent = "";
}

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function operate(operator, num1, num2) {
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
    default:
      return null;
  }
}
