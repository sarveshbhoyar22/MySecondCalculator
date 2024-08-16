class Stack {
  constructor() {
    this.items = [];
  }

  push(item) {
    this.items.push(item);
  }

  pop() {
    if (this.isEmpty()) {
      return "Underflow";
    }
    return this.items.pop();
  }

  peek() {
    if (this.isEmpty()) {
      return "Underflow";
    }
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }
}

////function

function isOperator(char) {
  return ["+", "-", "*", "/", "^"].includes(char);
}
function precedence(char) {
  if (char === "+" || char === "-") {
    return 1;
  } else if (char === "*" || char === "/") {
    return 2;
  } else if (char === "^") {
    return 3;
  } else {
    return -1;
  }
}

function evaluateInfix(expression) {
  const operandStack = new Stack();
  const operatorStack = new Stack();

  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];

    if (!isNaN(char)) {
      let num = "";
      while (i < expression.length && !isNaN(expression[i])) {
        num += expression[i];
        i++;
      }
      i--;
      operandStack.push(parseFloat(num));
    } else if (char === "(") {
      operatorStack.push(char);
    } else if (char === ")") {
      while (operatorStack.peek() !== "(") {
        const operator = operatorStack.pop();
        const b = operandStack.pop();
        const a = operandStack.pop();
        operandStack.push(applyOperator(a, b, operator));
      }
      operatorStack.pop(); // Remove '('
    } else if (isOperator(char)) {
      while (
        !operatorStack.isEmpty() &&
        precedence(char) <= precedence(operatorStack.peek())
      ) {
        const operator = operatorStack.pop();
        const b = operandStack.pop();
        const a = operandStack.pop();
        operandStack.push(applyOperator(a, b, operator));
      }
      operatorStack.push(char);
    }
  }

  while (!operatorStack.isEmpty()) {
    const operator = operatorStack.pop();
    const b = operandStack.pop();
    const a = operandStack.pop();
    operandStack.push(applyOperator(a, b, operator));
  }

  return operandStack.pop();
}
function applyOperator(a, b, operator) {
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return a / b;
    default:
      return NaN;
  }
}
// Example usage

/// main code
const expression = document.getElementById("expression");

const clear = document.getElementById("clear");

const equal = document.getElementById("equal");

let arr = [];
let postfix = "";
equal.addEventListener("click", function (e) {
  let mystring = "";
  e.preventDefault();

  const expression1 = expression.value;

  mystring = mystring + expression1;
  const infixExpression = mystring;
  const result = evaluateInfix(infixExpression);
  console.log(result);
  const FS = document.getElementById("finalSum");
  FS.innerHTML = result.toFixed(2);
  FS.style.backgroundColor = "rgb(235, 251, 255)";
  FS.style.color = "black";
  FS.style.animation = "none";

  expression.style.backgroundColor = "rgb(235, 251, 255)";
});

expression.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    equal.click();
  }
});

clear.addEventListener("click", function (e) {
  e.preventDefault();
  expression.value = "";
  const FS = document.getElementById("finalSum");
  FS.innerHTML = "Answer";
  // window.location.reload();
});
