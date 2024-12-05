import { ChangeDetectionStrategy, Component, viewChildren } from '@angular/core';
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
   * Miembros de clase
   */
  public calculatorButtons = viewChildren(ButtonComponent);

  public handleClick(key: string) {
    console.log('handleClick.key: ', key);
    this.modifyBackgroundWhenKeyIsLaunched(key);
  }

  /**
   * * Antigua forma de usar los HostListener y HostBinding,
   * * HostBinding: sirve para setear información en el host
   * * HostListener: permite detectar eventos
   * ? @HostListener('document:keyup', ['$event'])
   */
  public handleKeyboardEvent(event: KeyboardEvent) {
    const keyEquivalents: Record<string, string> = {
      Escape: 'C',
      Clear: 'C',
      Backspace: 'C',
      Delete: 'C',
      Enter: '=',
      '*': 'x',
      '/': '÷',
    };
    const key = event.key;
    const keyValueEquivalent = keyEquivalents[key] ?? key;
    this.handleClick(keyValueEquivalent);
  }

  public modifyBackgroundWhenKeyIsLaunched(key: string) {
    this.calculatorButtons().forEach((button) => {
      button.keyboardPressedStyle(key);
    });
  }
}
