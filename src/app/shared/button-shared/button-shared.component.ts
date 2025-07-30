import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { SpinnerComponent } from '../spinner/spinner.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button-shared',
  standalone: true,
  imports: [SpinnerComponent, CommonModule],
  templateUrl: './button-shared.component.html',
  styleUrl: './button-shared.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ButtonSharedComponent {
  @Input() cssClass: string = 'btn btn-primary btn-lg';
  @Input() type: 'submit' | 'button' | 'reset' = 'button';
  @Input() label: string = 'buttom';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() iconClass: string | null = null;


  @Output() buttonClick = new EventEmitter<void>();

  onClick(event: MouseEvent): void {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.buttonClick.emit();
  }
}
