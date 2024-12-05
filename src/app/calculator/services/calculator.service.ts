import { Injectable, signal } from '@angular/core';

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operators = ['+', '-', '*', '/', '%'];
const specialOperators = ['+/-', '.', '=', 'C', 'Backspace'];

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  /**
   * Miembros de clase
   */
  public resultText = signal('0');
  public subResultText = signal('0');
  public lastOperator = signal('+');

  public construcNumber(value: string): void {
    if (![...numbers, ...operators, ...specialOperators].includes(value)) {
      console.log('Input inválido: ', value);
      return;
    }

    if (value === '=') {
      console.log('Calcular resultado');
      this.calculateResult();
      return;
    }

    if (value === 'C') {
      this.resultText.set('0');
      this.subResultText.set('0');
      this.lastOperator.set('+');
      return;
    }

    if (value === 'Backspace') {
      if (this.resultText() === '0') return;

      if (this.resultText().includes('-') && this.resultText().length === 2) {
        this.resultText.set('0');
        return;
      }

      if (this.resultText().length === 1) {
        this.resultText.set('0');
        return;
      }

      this.resultText.update((currentValue) => {
        return currentValue.slice(0, -1);
      });

      return;
    }

    // Aplicar el operador
    if (operators.includes(value)) {
      console.log('El operador si existe');
      this.calculateResult();
      this.lastOperator.set(value);
      this.subResultText.set(this.resultText());
      this.resultText.set('0');
      return;
    }

    // Limitar el número de caracteres
    if (this.resultText().length >= 10) {
      console.log('Límite máximo alcanzado: ');
      return;
    }

    // Validar el punto decimal
    if (value === '.' && !this.resultText().includes('.')) {
      if (this.resultText() === '0' || this.resultText() === '') {
        this.resultText.set('0.');
        return;
      }
      this.resultText.update((text) => text + '.');
      return;
    }

    // Manejo de el cero inicial
    if (value === '0' && (this.resultText() === '0' || this.subResultText() === '-0')) {
      return;
    }

    // Cambiar signo
    if (value === '+/-') {
      if (this.resultText().includes('-')) {
        this.resultText.update((currentValue) => {
          return currentValue.slice(1);
        });
        return;
      } else {
        this.resultText.update((currentValue) => {
          return `-${currentValue}`;
        });
        return;
      }
    }

    // Números
    if (numbers.includes(value)) {
      if (this.resultText() === '0') {
        this.resultText.set(value);
        return;
      }

      if (this.resultText().includes('-')) {
        this.resultText.set('-' + value);
        return;
      }

      this.resultText.update((text) => text + value);
      return;
    }
  }

  public calculateResult() {
    const numberOne = parseFloat(this.subResultText());
    const numberTwo = parseFloat(this.resultText());

    let result = 0;

    switch (this.lastOperator()) {
      case '+':
        result = numberOne + numberTwo;
        break;
      case '-':
        result = numberOne - numberTwo;
        break;
      case '*':
        result = numberOne * numberTwo;
        break;
      case '/':
        result = numberOne / numberTwo;
        break;
      case '%':
        result = numberOne % numberTwo;
        break;
    }

    this.resultText.set(result.toString());
    this.subResultText.set('0');
  }
}
