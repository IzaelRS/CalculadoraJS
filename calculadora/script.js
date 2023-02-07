const previousOperationText = document.querySelector("#previous-operation");

const currentOperationText = document.querySelector("#current-operation");


const buttons = document.querySelectorAll("#container_buttons button");

console.log(buttons);


//4 tranformando contantes e objetos para trabalahe melhor os valores 
class Calculator {
     constructor(previousOperationText, currentOperationText) {
          this.previousOperationText = previousOperationText // impresso na tela
          this.currentOperationText = currentOperationText // impresso na tela
          this.currentOperation = "" // digitando em tempo real

     }

     //6 adicinando digitos na calculadora (calculator screen)
     addDigit(digit) {
          //8 chegando se a operacao já tem um ponto 
          if (digit === "." && this.currentOperationText.innerText.includes(".")) {
               return;
          }

          this.currentOperation = digit;
          this.updateScreen();
     }

     //9 processos de operadores na calculadora 
     processOperation(operation) {
          //13 chegar o currenty está vazio, serve para fazer uma nova operacao apos a ultima.
          if (this.currentOperationText.innerText === "" && operation !== "C") {
               //14 só comeca uma operacao apos ter um numero selecionado
               if (this.previousOperationText.innerText !== "") {
                    this.changeOperation(operation);
               }
               return;
          }

          //10 pegando os valores current e previous
          let operationValue;
          const previous = + this.previousOperationText.innerText.split(" ")[0];
          const current = + this.currentOperationText.innerText;

          switch (operation) {
               case "+":
                    operationValue = previous + current;
                    this.updateScreen(operationValue, operation, current, previous);
                    break;
               case "-":
                    operationValue = previous - current;
                    this.updateScreen(operationValue, operation, current, previous);
                    break;
               case "*":
                    operationValue = previous * current;
                    this.updateScreen(operationValue, operation, current, previous);
                    break;
               case "/":
                    operationValue = previous / current;
                    this.updateScreen(operationValue, operation, current, previous);
                    break;
               case "DEL":
                    this.processDelOperation();
                    break;
               case "CE":
                    this.process_CE_Operation();
                    break;
               case "C":
                    this.process_C_Operation();
                    break;
               case "=":
                    this.process_Egual_Operation();
                    break;
               default:
                    return;
          }
     }


     //8 upando o update screen (adcao de digitos)
     updateScreen(
          operationValue = null,
          operation = null,
          current = null,
          previous = null
     ) {


          if (operationValue === null) {
               this.currentOperationText.innerText += this.currentOperation;
          } else {
               //11 chegando os valores
               if (previous === 0) {
                    operationValue = current
               }
               //12 add os valores de current em previous
               this.previousOperationText.innerText = `${operationValue} ${operation}`;
               this.currentOperationText.innerText = "";

          }
     }

     //14 trabalhando do com operacoes matematicos
     changeOperation(operation) {

          const mathOperation = ["*", "/", "+", "-"]

          //15 vazendo validacao de operacao/ mudando a aoperacao no meio da divisao 
          if (!mathOperation.includes(operation)) {
               return
          }

          this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
     }

     //16 Deletando um digito
     processDelOperation() {
          this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
     }

     //17 limpando um campo current
     process_CE_Operation() {
          this.currentOperationText.innerText = "";

     }
     //17 limpando todos os campos
     process_C_Operation() {
          this.currentOperationText.innerText = "";
          this.previousOperationText.innerText = "";

     }
     //18 processo Igual
     process_Egual_Operation() {
          const operation = previousOperationText.innerText.split(" ")[1];

          this.processOperation(operation);
     }

}


//5 criando const para validacao
const calc = new Calculator(previousOperationText, currentOperationText);



// 2 pegando os valkores de texto do botoes 
buttons.forEach((btn) => {
     btn.addEventListener('click', (e) => {

          const value = e.target.innerText;
          // 3 validando valores em string para number ou ponto
          if (+value >= 0 || value === ".") {
               calc.addDigit(value);
          } else {
               calc.processOperation(value);
          }

     });
});


