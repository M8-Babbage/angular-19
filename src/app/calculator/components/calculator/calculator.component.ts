import { CalculatorService } from '@/calculator/services/calculator.service';
import { ChangeDetectionStrategy, Component, computed, inject, viewChildren } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'calculator',
  imports: [ButtonComponent],
  templateUrl: './calculator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keyup)': 'handleKeyboardEvent($event)',
  },
})
export class CalculatorComponent {
  /**
   * Inyección de dependencias
   */
  private _calculatorService = inject(CalculatorService);

  /**
   * Miembros de clase
   */
  public calculatorButtons = viewChildren(ButtonComponent);

  public resultText = computed(() => {
    return this._calculatorService.resultText();
  });

  public subResultText = computed(() => {
    return this._calculatorService.subResultText();
  });

  public lastOperator = computed(() => {
    return this._calculatorService.lastOperator();
  });

  public handleClick(key: string) {
    const keyEquivalent = this.handleEquivalents(key);
    this._calculatorService.construcNumber(keyEquivalent);
    this.modifyBackgroundWhenKeyIsLaunched(keyEquivalent);
  }

  /**
   * * Antigua forma de usar los HostListener y HostBinding,
   * * HostBinding: sirve para setear información en el host
   * * HostListener: permite detectar eventos
   * ? @HostListener('document:keyup', ['$event'])
   */
  public handleKeyboardEvent(event: KeyboardEvent) {
    const key = event.key;
    const keyValueEquivalent = this.handleEquivalents(key);
    console.log('handleClick.key: ', keyValueEquivalent);
    this.handleClick(keyValueEquivalent);
  }

  public modifyBackgroundWhenKeyIsLaunched(key: string) {
    this.calculatorButtons().forEach((button) => {
      button.keyboardPressedStyle(key);
    });
  }

  public handleEquivalents(key: string): string {
    const keyEquivalents: Record<string, string> = {
      Escape: 'C',
      Clear: 'C',
      Delete: 'C',
      Enter: '=',
      x: '*',
    };
    return keyEquivalents[key] ?? key;
  }
}
