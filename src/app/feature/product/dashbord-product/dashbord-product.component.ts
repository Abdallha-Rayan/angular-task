import { Component, effect, inject, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { InputFiledComponent } from '../../../shared/input-filed/input-filed.component';
import { ButtonSharedComponent } from '../../../shared/button-shared/button-shared.component';
import { ExportService } from '../../../core/service/export.service';
import { ProductService } from '../../../core/service/product.service';
import { CommonModule } from '@angular/common';
import { Product } from '../../../shared/Module/product-module';
import { DialogProductComponent } from '../dialog-product/dialog-product.component';
@Component({
  selector: 'app-dashbord-product',
  standalone: true,
  imports: [TableModule,
    DialogProductComponent, InputFiledComponent, ButtonSharedComponent, CommonModule],
  templateUrl: './dashbord-product.component.html',
  styleUrl: './dashbord-product.component.scss'
})
export class DashbordProductComponent {
  private _ExportService = inject(ExportService)
  _ProductService = inject(ProductService)
  products = this._ProductService.products()

  selectedProductForEdit = signal<any | null>(null);
  isproductDialogVisible = signal(false);

  constructor() {
    effect(() => {
      this.products = this._ProductService.products();
    });
  }

  exportToExcel(): void {
    this._ExportService.exportToCsv(this.products, 'productExcel')
  }
  onDelete(product: Product): void {
    console.log('id', product.id);

    if (!confirm(`Are you sure you want to delete "${product.title}"?`)) {
      return;
    }

    this._ProductService.deleteProduct(product.id).subscribe({
      next: () => {
        console.log('Delete command sent successfully.');
      },
      error: (err) => {
        console.error('Delete command failed:', err);
      }
    });
  }

  onAddProduct(): void {
    this.isproductDialogVisible.set(true);
    this.selectedProductForEdit.set(null);
    console.log('isproductDialogVisible', this.isproductDialogVisible());

  }
  handlecourseSave(formData: any): void {

    if (this.selectedProductForEdit()) {
      this._ProductService.updateProduct({ ...formData, id: this.selectedProductForEdit().id });
    } else {
      this._ProductService.saveProduct(formData);
    }
    this.isproductDialogVisible.set(false);
  }
  openEditProductDialog(product: any) {
    console.log('Request to edit product:', product);
    this.selectedProductForEdit.set(product);
    this.isproductDialogVisible.set(true);
  }
  handleDialogVisibilityChange(isVisible: boolean) {
    this.isproductDialogVisible.set(isVisible);
    if (!isVisible) {
      console.log('Dialog closed, resetting selected product.');
      this.selectedProductForEdit.set(null);
    }
  }




}
