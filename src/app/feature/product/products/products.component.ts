import { Component, effect, inject, OnInit } from '@angular/core';
import { CardProductSharedComponent } from '../../../shared/card-product-shared/card-product-shared.component';
import { SpinnerComponent } from '../../../shared/spinner/spinner.component';
import { ProductService } from '../../../core/service/product.service';

@Component({
  selector: 'app-products',
  imports: [CardProductSharedComponent, SpinnerComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  _ProductService = inject(ProductService)
  constructor() {
    effect(() => {
      this._ProductService.products();
    });
  }
  ngOnInit(): void {

  }
}
