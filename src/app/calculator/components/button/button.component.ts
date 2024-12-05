import { ChangeDetectionStrategy, Component, ElementRef, input, output, signal, viewChild } from '@angular/core';

/**
 * * Para más información sobre los host behaviours leer aquí
 * ? https://angular.dev/guide/components/host-elements
 */

@Component({
  selector: 'button-calculator',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'border-r border-b border-indigo-400',
    '[class.w-2/4]': 'isDoubleSize()',
    '[class.w-1/4]': '!isDoubleSize()',
    // attribute: 'attribute',
    // 'data-size': 'XL',
  },
})
export class ButtonComponent {
  public contentValue = viewChild<ElementRef<HTMLButtonElement>>('button');
  public onClick = output<string>();
  public isCommand = input<boolean>(false);
  public isDoubleSize = input<boolean>(false);
  public isPressed = signal<boolean>(false);

  /**
   * * Los HostBinding ahora se hacen así '[property]': 'funciones o variables'
   */
  // @HostBinding('class.w-2/4') get commandStyle() {
  //   return this.isDoubleSize();
  // }

  public handleClick() {
    const value = this.contentValue()?.nativeElement;
    if (value) {
      this.onClick.emit(value.innerText.trim());
    }
  }

  public keyboardPressedStyle(key: string) {
    const value = this.contentValue()?.nativeElement.innerText.trim();
    if (value === key) {
      this.isPressed.set(true);
    }
    setTimeout(() => {
      this.isPressed.set(false);
    }, 150);
  }
}
