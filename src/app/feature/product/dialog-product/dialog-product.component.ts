import { Component, computed, EventEmitter, inject, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ProductService } from '../../../core/service/product.service';
import { ButtonSharedComponent } from '../../../shared/button-shared/button-shared.component';
import { InputFiledComponent } from '../../../shared/input-filed/input-filed.component';
import { TextAreaSharedComponent } from '../../../shared/text-area-shared/text-area-shared.component';

@Component({
  selector: 'app-dialog-product',
  imports: [DialogModule,
    InputFiledComponent, ButtonSharedComponent, TextAreaSharedComponent, ReactiveFormsModule, ButtonSharedComponent],
  templateUrl: './dialog-product.component.html',
  styleUrl: './dialog-product.component.scss'
})
export class DialogProductComponent {
  @Input() visible: boolean = false;
  @Input() itemToEdit: any;

  @Output() save = new EventEmitter<any>();
  @Output() visibleChange = new EventEmitter<boolean>();
  get isEditMode(): boolean {
    return !!this.itemToEdit;
  }
  private _ProductService = inject(ProductService)
  private _fb = inject(FormBuilder);
  productForm!: FormGroup
  constructor() {
    this.productForm = this._fb.group({
      id: [null],
      title: ['', Validators.required],
      price: ['', Validators.required],
      description: [''],
      categoryId: [1],
      images: [['https://placehold.co/600x400']]
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['itemToEdit'] && this.itemToEdit) {
      console.log('Edit mode: Patching form with', this.itemToEdit);
      this.productForm.patchValue({ ...this.itemToEdit })
    } else {
      console.log('Add mode: Resetting form');
      this.productForm.reset({
        id: null,
        title: 'rayan',
        price: 55,
        description: 'ajsdbkajdkajbs',
        categoryId: 1,
        images: [['https://placehold.co/600x400']]
      });
    }
  }


  onSave() {
    if (this.productForm.invalid) {
      return
    }
    const formData = this.productForm.getRawValue()
    if (this.itemToEdit) {
      console.log('Saving (Update):', formData);
      this._ProductService.updateProduct(formData).subscribe()
      this.productForm.reset();

    } else {
      console.log('Saving (Add):', this.productForm?.value);
      this._ProductService.saveProduct({ ...this.productForm?.value }).subscribe();
      this.productForm.reset();
    }
  }

  onClose(): void {
    this.visibleChange.emit(false);
    this.productForm.reset();
    this.itemToEdit = null

  }

}
