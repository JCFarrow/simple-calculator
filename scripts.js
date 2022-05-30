let stack = [];

const operate = function(stack) {
    if (stack.length >= 3 && typeof stack[stack.length - 1] === 'number') {
        let total = stack[0];
        let operator = '';
        for (let i = 1; i < stack.length; i++) {
            if (i % 2 === 1) {
                if (typeof stack[i] === 'string') {
                    operator = stack[i];
                } else {
                    console.error("Expected string for operator but found number: " + stack[i]);
                }
            } else {
                switch (operator) {
                    case '+':
                        total += stack[i];
                        break;
                    case '-':
                        total -= stack[i];
                        break;
                    case '*':
                        total *= stack[i];
                        break;
                    case '/':
                        total /= stack[i];
                        break;
                    case '**':
                        total **= stack[i];
                        break;
                    default:
                }

            }
        }
        return total;
    }
}

const testStack = [2, '+', 3, '*', 4, '/', 2, '**', 2, '-', 96];

console.log(operate(testStack));