let stack = [0];

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

setSize();

function operate(stack) {
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
                    case '−':
                        total -= stack[i];
                        break;
                    case '*':
                    case '×':
                        total *= stack[i];
                        break;
                    case '/':
                    case '÷':
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

function numberClick(e) {
    if (stack.length > 0 && typeof stack[stack.length - 1] === 'number') {
        stack[stack.length - 1] = +(stack[stack.length - 1].toString() + e.target.id);
    } else {
        stack.push(+e.target.id);
    }
    updateScreen();
}

function operatorClick(e) {
    if (e.target.id === 'equals') {
        calculate();
    } else {
        if (stack.length > 0 && typeof stack[stack.length - 1] === 'number') {
            stack.push(e.target.textContent);
            updateScreen();
        }
    }
}

function updateScreen() {
    screen.textContent = stack.toString().replaceAll(',', ' ');
}

function clearScreen() {
    stack = [0];
    updateScreen();
}

function calculate() {
    if (stack.length >= 3 && typeof stack[stack.length - 1] === 'number')
    stack = [operate(stack)];
    updateScreen();
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