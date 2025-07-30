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
      // Add a first value in Object 
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
      this.productForm.markAllAsTouched();
      return;
    }

    const formData = this.productForm.getRawValue();

    // نحدد أي دالة في الخدمة سنستدعي
    const saveOrUpdate$ = this.itemToEdit
      ? this._ProductService.updateProduct(formData)
      : this._ProductService.saveProduct(formData);

    // نستدعيها ونشترك في الرد
    saveOrUpdate$.subscribe({
      next: () => {
        console.log('Operation successful inside Dialog.');
        this.productForm.reset(); // 1. الابن يعيد تعيين الفورم بنفسه
        this.save.emit(); // 2. الابن يخبر الأب بأن العملية نجحت
      },
      error: (err) => {
        console.error('Operation failed inside Dialog:', err);
        // هنا يمكنك عرض رسالة خطأ للمستخدم داخل النافذة
      }
    });
  }

  onClose(): void {
    this.visibleChange.emit(false);
    this.productForm.reset();
    this.itemToEdit = null

  }

}
