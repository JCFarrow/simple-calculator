let stack = ['0'];

let screenIsReplaceable = true;

const maxDecimalPlaces = 15;

const screen = document.getElementById('screen');
screen.style.fontSize = '20px';
updateScreen();

for (let i = 0; i <= 9; i++) {
    document.getElementById(`${i}`).addEventListener('click', numberClick);
}
document.getElementById('.').addEventListener('click', numberClick);

document.querySelectorAll('#operators > button').forEach((button) => {
    button.addEventListener('click', operatorClick);
})

document.getElementById('clear').addEventListener('click', clearScreen);
document.getElementById('back-space').addEventListener('click', backSpace);

setSize();

function operate(stack) {
    // If the stack has enough entries to operate and the last entry is a number
    if (isValidStack(1)) {
        let total = parseFloat(stack[0]);
        let operator = '';
        for (let i = 1; i < stack.length; i++) {
            if (i % 2 === 1) {
                if (Number.isNaN(parseFloat(stack[i]))) {
                    operator = stack[i];
                } else {
                    console.error("Expected string for operator but parseFloat found a number: " + stack[i]);
                }
            } else {
                switch (operator) {
                    case '+':
                        total += parseFloat(stack[i]);
                        break;
                    case '-':
                    case '−':
                        total -= parseFloat(stack[i]);
                        break;
                    case '*':
                    case '×':
                        total *= parseFloat(stack[i]);
                        break;
                    case '/':
                    case '÷':
                        total /= parseFloat(stack[i]);
                        break;
                    case '**':
                        total **= parseFloat(stack[i]);
                        break;
                    default:
                }

            }
        }
        return Math.round((total + Number.EPSILON) * (10 ** maxDecimalPlaces)) / (10 ** maxDecimalPlaces);
    }
}

function numberClick(e) {
    if (screenIsReplaceable) {
        stack = e.target.id === '.' ? ['0.'] : [e.target.id];
        screenIsReplaceable = false;
    } else {
        if (isValidStack(1)) {
            if ((e.target.id !== '.' || !stack[stack.length - 1].includes('.'))) {
                stack[stack.length - 1] = stack[stack.length - 1] + e.target.id;
            }
        } else {
            if (e.target.id === '.') {
                stack.push('0.');
            } else {
                stack.push(e.target.id);
            }
            
        }
    }
    
    updateScreen();
}

function operatorClick(e) {
    screenIsReplaceable = false;
    if (e.target.id === 'equals') {
        calculate();
    } else {
        if (isValidStack(1)) {
            stack.push(e.target.textContent);
            updateScreen();
        }
    }
}

function updateScreen() {
    if (stack.length === 0) {
        stack = ['0'];
    }
    screen.textContent = stack.toString().replaceAll(',', ' ');
}

function clearScreen() {
    stack = [0];
    screenIsReplaceable = true;
    updateScreen();
}

function backSpace() {
    if (stack.length > 0) {
        if (stack[stack.length - 1].length > 1) {
            stack[stack.length - 1] = stack[stack.length - 1].slice(0, -1);
        } else {
            stack = stack.slice(0, -1);
        }
    }
    updateScreen();
}

function calculate() {
    if (isValidStack(1)) {
        stack = [operate(stack).toString()];
        screenIsReplaceable = true;
        updateScreen();
    } 
}

function setSize(w=200, h = 0, g = 5, cg = 10) {
    const gap = g / 2;
    let calcGap = gap;
    if (cg != null) {
        calcGap = cg / 2;
    }

    let width = w;
    let height = h;
    if (height === 0) {
        height = width * 1.5;
    }
    const squareW = width / 4;
    const squareH = height / 6;

    width += gap * 8;
    height += gap * 12;

    document.getElementById('calculator').style.padding = `${calcGap}px`;

    document.getElementById('calc-body').style.width = `${width}px`;
    document.getElementById('calc-body').style.height = `${height * (5/6)}px`;
    document.getElementById('numbers').style.width = `${width * (3/4)}px`;
    document.getElementById('numbers').style.height = `${height * (5/6)}px`;
    document.getElementById('operators').style.width = `${width * (1/4)}px`;
    document.getElementById('operators').style.height = `${height * (5/6)}px`;

    screen.style.width = `${width - (gap * 2)}px`;
    screen.style.height = `${squareH}px`;
    screen.style.margin = `${gap}px`;
    document.querySelectorAll('#calc-body button').forEach((b) => {
        b.style.width = `${squareW}px`;
        b.style.height = `${squareH}px`;
        b.style.margin = `${gap}px`;
    })
    document.getElementById('clear').style.width = `${(squareW * 2) + (gap * 2)}px`;
}

function isValidStack(minValidSize) {
    return stack.length >= minValidSize && (!Number.isNaN(parseFloat(stack[stack.length - 1])))
}