let numberButtons = document.querySelectorAll("[data-number]");
let operatorButtons = document.querySelectorAll("[data-operator]");
let operatorAC = document.querySelector("[data-all-clear]");
let operatorDEL = document.querySelector("[data-delete]");
let operatorResult = document.querySelector("[data-result]");
let operatorPreviousTextElement = document.querySelector("[data-previous]");
let operatorCurrentTextElement = document.querySelector("[data-current]");

class Calculator {
  constructor(operatorPreviousTextElement, operatorCurrentTextElement) {
    this.operatorPreviousTextElement = operatorPreviousTextElement;
    this.operatorCurrentTextElement = operatorCurrentTextElement;
  }

  FormatDisplayNumber(number) {
    const StringNumber = number.toString();
    const integerDigits = parseFloat(StringNumber.split('.')[0])
    const decimalDigits = StringNumber.split('.')[1]

    let integerDisplay;

    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay
    }
  }
  delete() {
    this.operatorCurrent = this.operatorCurrent.toString().slice(0, -1);
  }
  calculate() {
    let result;

    let operatorPreviousFloat = parseFloat(this.operatorPrevious);
    let operatorCurrentFloat = parseFloat(this.operatorCurrent);

    if (isNaN(operatorPreviousFloat) || isNaN(operatorCurrentFloat)) return;
    switch (this.operatorButtons) {
      case "+":
        result = operatorPreviousFloat + operatorCurrentFloat;
        break;
      case "-":
        result = operatorPreviousFloat - operatorCurrentFloat;
        break;
      case "/":
        result = operatorPreviousFloat / operatorCurrentFloat;
        break;
      case "*":
        result = operatorPreviousFloat * operatorCurrentFloat;
        break;
      default:
        return;
    }
    this.operatorCurrent = result;
    this.operatorButtons = undefined;
    this.operatorPrevious = "";
  }
  chooseoperatorButtons(operatorButtons) {
    if (this.operatorCurrent === "") return;
    if (this.operatorPrevious === operatorButtons) return this.operatorCurrent = ""
    if (this.operatorPrevious !== "") {
      this.calculate();
    }

    this.operatorButtons = operatorButtons;

    this.operatorPrevious = this.operatorCurrent;
    this.operatorCurrent = "";
  }
  appendNumber(number) {
    if (this.operatorCurrent.includes(".") && number === ".") return;
    this.operatorCurrent = `${this.operatorCurrent}${number.toString()}`;
  }

  clear() {
    this.operatorPrevious = "";
    this.operatorCurrent = "";
    this.operatorButtons = undefined;
  }
  updateDisplay() {
    this.operatorPreviousTextElement.innerText = `${this.operatorPrevious} ${
      this.operatorButtons || ""
    }`;
    this.operatorCurrentTextElement.innerText = this.FormatDisplayNumber(this.operatorCurrent);
  }
}

let calculator = new Calculator(
  operatorPreviousTextElement,
  operatorCurrentTextElement
);

for (let numberButton of numberButtons) {
  numberButton.addEventListener("click", () => {
    calculator.appendNumber(numberButton.innerText);
    calculator.updateDisplay();
  });
}

for (let operatorButton of operatorButtons) {
  operatorButton.addEventListener("click", () => {
    calculator.chooseoperatorButtons(operatorButton.innerText);
    calculator.updateDisplay();
  });
}

operatorAC.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});
setTimeout(function () {
  calculator.clear();
  calculator.updateDisplay(), 1000;
});
operatorResult.addEventListener("click", () => {
  calculator.calculate();
  calculator.updateDisplay();
});
operatorDEL.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});
