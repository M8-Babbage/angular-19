import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  input,
} from '@angular/core';

@Component({
  selector: 'button-calculator',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'w-1/4 border-r border-b border-indigo-400',
    // attribute: 'attribute',
    // 'data-size': 'XL',
  },
})
export class ButtonComponent {
  public isCommand = input<boolean>(false);
  public isDoubleSize = input<boolean>(false);

  @HostBinding('class.w-2/4') get commandStyle() {
    return this.isDoubleSize();
  }
}
