import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-area-shared',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './text-area-shared.component.html',
  styleUrl: './text-area-shared.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextAreaSharedComponent),
      multi: true
    }
  ]

})
export class TextAreaSharedComponent {
  @Input() Label!: string
  @Input() rows: number = 3
  @Input() placeholder: string = 'placeholder'
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
