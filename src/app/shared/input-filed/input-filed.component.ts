import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Input, input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-filed',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input-filed.component.html',
  styleUrl: './input-filed.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFiledComponent),
      multi: true,
    },
  ],
})
export class InputFiledComponent {
  @Input() Lable!: string
  @Input() placeholder: string = 'placeholder'
  @Input() type: string = 'text';
  @Input() iconClass: string | null = null;
  @Output() valueChange = new EventEmitter<string>();

  value: string = '';
  isDisabled: boolean = false;


  private onChange = (value: string) => { };
  onTouched = () => { };

  writeValue(value: any): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
  onInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.value = inputElement.value;
    this.onChange(this.value);
    this.onTouched();
    this.valueChange.emit(inputElement.value);
  }

}
