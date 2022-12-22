const previusOperationText = document.querySelector('#previus-operation')
const currentOperationText = document.querySelector('#current-operation')
const buttons = document.querySelectorAll('#buttons-container button')

// Cria um objeto usando o constructor

class Calculator {
    constructor(previusOperationText, currentOperationText){
        this.previusOperationText = previusOperationText
        this.currentOperationText = currentOperationText
        this.currentOperation = ""

    }
 // Adiciona os digitos ao display da calculadora 

    addDigit(digit) {
        
//  Verifica os digitos
        if (digit === "." && this.currentOperationText.innerText.includes("."))
        return;
        this.currentOperation = digit
        this.updateScreen()
    }

//  Processa os numeros e operações

processOperation(operation){
    // Verifica se o valor atual é 0
    if (this.currentOperationText.innerText === "" && operation !== "C") {
    //  Se for 0 segue pra ca
        if (this.previusOperationText.innerText !== "") {
            this.changeOperation(operation);
        }
        return;
    }

    // Busca os valores atuais e anteriores

    let operationValue 
    let previus = +this.previusOperationText.innerText.split(" ")[0];
    let current = +this.currentOperationText.innerText;

    switch(operation) {
        case "+":
            operationValue = previus + current
            this.updateScreen(operationValue, operation, current, previus)
        break;
        case "-":
            operationValue = previus - current
            this.updateScreen(operationValue, operation, current, previus)
        break;
        case "/":
            operationValue = previus / current
            this.updateScreen(operationValue, operation, current, previus)
        break;
        case "*":
            operationValue = previus * current
            this.updateScreen(operationValue, operation, current, previus)
        break;
        case "DEL":
            this.processDelOperator()
            break;
        case "CE":
            this.processClearCurrentOperation()
            break;
        case "C":
            this.processClearOperation()
            break;
        case "=":
            this.processEqualOperator()
            break;
        default:
            return;
    }
}



//  Atualiza a tela sempre que um numero ou operação foi feita
    
    updateScreen(
        operationValue = null, 
        operation = null, 
        current = null, 
        previus = null
        ){  
            if (operationValue === null){
                this.currentOperationText.innerText += this.currentOperation;
            } else {
                //  Verifica se o valor é 0
                if (previus === 0) {
                    operationValue = current
                }
                // Adiciona o valor ao display
            this.previusOperationText.innerText = `${operationValue} ${operation}`
            this.currentOperationText.innerText = "";
        }
    }

 // Muda a operação
  changeOperation(operation) {
    const mathOperations = ["*", "/", "+", "-"]
    if (!mathOperations.includes(operation)){
        return
    }

    this.previusOperationText.innerText = this.previusOperationText.innerText.slice(0, -1) + operation;
  }

  // Deleta um digito
processDelOperator(){
    this.currentOperationText.innerText = 
    this.currentOperationText.innerText.slice(0, -1);
    }

 // Limpa a soma atual, mantendo a soma anterior
processClearCurrentOperation() {
    this.currentOperationText.innerText = "";
    }

 // Limpa toda a soma na calculadora
processClearOperation() {
    this.currentOperationText.innerText = ""; 
    this.previusOperationText.innerText = "";
   }

 // Soma o calculo ao clicar em igual =
processEqualOperator(){
    const operation = previusOperationText.innerHTML.split(" ")[1]
    this.processOperation(operation);
   }
} 

const calc = new Calculator(previusOperationText, currentOperationText);

// Cria um evento para saber qual botão foi clicado

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if(+value >= 0 || value === ".") {
            calc.addDigit(value);
        } else {
            calc.processOperation(value);
        }
    })
})

// Oculta uma div definida pelo onclick

function mudar(el) {
    var display = document.getElementById(el).style.display;

    if(display === "none") {
        document.getElementById(el).style.display = 'block';
    }
    else {
        document.getElementById(el).style.display = 'none';
    }
}