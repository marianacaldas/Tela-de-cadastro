// 3 - Classe que vai dar origem às validações
class Validator {
    constructor() {
        this.validation = [
            'data-min-length',
            'data-max-length',
            'data-only-letters',
            'data-email-validate',
            'data-required',
            'data-equal',
            'data-password-validate',
        ]
    }

    // 6 - iniciar a validação de todos os campos
    validate(form) {

        // limpa todas as validações antigas
        let currentValidations = document.querySelectorAll('form .error-validation');

        if(currentValidations.length) {
        this.cleanValidations(currentValidations);
        }

        // 7 - pegar todos os inputs
        let inputs = form.getElementsByTagName('input');
      

        // 8 - passar de HTMLCollection para array
        let inputsArray = [...inputs];

        // 9 - loop nos inputs e validação mediante ao que for encontrado
        inputsArray.forEach(function(input, obj) {
            
            // 10- loop em todas as validações existentes
            for(let i = 0; this.validations.length > i; i++) {
                // 11 - verifica se a validação atual existe no input
                if(input.getAttribute(this.validations[i]) != null) {
                    
                    // 13 - limpando a string para virar um método
                    let method = this.validations[i].replace('data-', '').replace('-','');

                    // 14 - valor do input
                    let value = input.getAttribute(this.validations[i]);
                
                    // 15 - invocar o método
                    this[method](input, value);
                }
            }

        }, this);
       
    }
    // 12 - verifica se o input tem um número mínimo de caracteres
    minlength(input, minValue) {

        let inputLength = input.value.length;

        let errorMessage = `O campo precisa ter pelo menos ${minValue} caracteres`

        if(inputLength < minValue) {
            this.printMessage(input, errorMessage);
        }

    }
    // 16 - método para imprimir mensagens de erros na tela
    printMessage(input, msg) {
        let template = document.querySelector('.erro_validacao').cloneNode(true);

        template.textContent = msg;

        let inputParent = input.inputParent;

        template.classList.remove('template');

        inputParent.appendChild(template);

    }

    // 17 - método para validar se passou do máximo de caracteres
    maxlength(input, maxValue) {

    let inputLength = input.value.length;

    let errorMessage = `O campo precisa ter menos que ${maxValue} caracteres`;

    if(inputLength > maxValue) {
      this.printMessage(input, errorMessage);
    }

  }

  // 18 - método para validar strings que só contem letras
  onlyletters(input) {

    let re = /^[A-Za-z]+$/;;

    let inputValue = input.value;

    let errorMessage = `Este campo não aceita números nem caracteres especiais`;

    if(!re.test(inputValue)) {
      this.printMessage(input, errorMessage);
    }

  }

  // 19 - método para validar e-mail
  emailvalidate(input) {
    let re = /\S+@\S+\.\S+/;

    let email = input.value;

    let errorMessage = `Insira um e-mail no padrão matheus@email.com`;

    if(!re.test(email)) {
      this.printMessage(input, errorMessage);
    }

  }


  // 20 - verificar se um campo está igual o outro
  equal(input, inputName) {

    let inputToCompare = document.getElementsByName(inputName)[0];

    let errorMessage = `Este campo precisa estar igual ao ${inputName}`;

    if(input.value != inputToCompare.value) {
      this.printMessage(input, errorMessage);
    }
  }
  
  // 21 - método para exibir inputs que são necessários
  required(input) {

    let inputValue = input.value;

    if(inputValue === '') {
      let errorMessage = `Este campo é obrigatório`;

      this.printMessage(input, errorMessage);
    }

  }


  // 22 - validando o campo de senha
  passwordvalidate(input) {

    // 22.1 - explodir string em array
    let charArr = input.value.split("");

    let uppercases = 0;
    let numbers = 0;

    for(let i = 0; charArr.length > i; i++) {
      if(charArr[i] === charArr[i].toUpperCase() && isNaN(parseInt(charArr[i]))) {
        uppercases++;
      } else if(!isNaN(parseInt(charArr[i]))) {
        numbers++;
      }
    }

    if(uppercases === 0 || numbers === 0) {
      let errorMessage = `A senha precisa um caractere maiúsculo e um número`;

      this.printMessage(input, errorMessage);
    }

  }

  // 23 - método para imprimir mensagens de erro
  printMessage(input, msg) {
  
    // 23.1 - checa os erros presentes no input
    let errorsQty = input.parentNode.querySelector('.error-validation');

    // 23.2 - imprimir erro só se não tiver erros
    if(errorsQty === null) {
      let template = document.querySelector('.error-validation').cloneNode(true);

      template.textContent = msg;
  
      let inputParent = input.parentNode;
  
      template.classList.remove('template');
  
      inputParent.appendChild(template);
    }

  }

  // 24 - remove todas as validações para fazer a checagem novamente
  cleanValidations(validations) {
    validations.forEach(el => el.remove());
  }

}


// 1 - Selecionar Id's
let form = document.getElementById('register-form');
let submit = document.getElementById('btn-submit');
// 4 - criar seleção para a classe de validação
let validator = new Validator();


// 2 - evento  que dispara as validações
submit.addEventListener('click', function(e) {
    e.preventDefault();

    // 5 - mandar pra validar o formulário
    validator.validate(form);
});