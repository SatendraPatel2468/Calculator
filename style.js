class Calculator {
    constructor(previousOperationTextElement, currentOperationTextElement) {
        this.previousOperationTextElement = previousOperationTextElement;
        this.currentOperationTextElement = currentOperationTextElement;
        this.clear()
    }
    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    getDisplayNumber(number) {
        const floatNumber = parseFloat(number)
        if (isNaN(floatNumber)) return ''
        return floatNumber.toLocaleString('en')
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break

            case '-':
                computation = prev - current
                break

            case '*':
                computation = prev * current
                break

            case '/':
                computation = prev / current
                break

            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    updateDisplay() {
        this.currentOperationTextElement.innerText = this.currentOperand;
        this.previousOperationTextElement.innerText = this.previousOperand;
        if (this.operation != null) {
            this.previousOperationTextElement.innerText = `${this.previousOperand} ${this.operation}`
        }

    }

}

const numberButton = document.querySelectorAll('[data-number]');
const operationButton = document.querySelectorAll('[data-operation]');
const equalButton = document.querySelector('[ data-equal]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[ data-all-clear]')
const previousOperationTextElement = document.querySelector('[datda-previous-operan]')
const currentOperationTextElement = document.querySelector('[ data-current-operand]')

const calculator = new Calculator(previousOperationTextElement,
    currentOperationTextElement)

numberButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})


equalButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})


deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})