import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Product } from '../Module/product-module';

@Component({
  selector: 'app-card-product-shared',
  imports: [],
  templateUrl: './card-product-shared.component.html',
  styleUrl: './card-product-shared.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class CardProductSharedComponent {
  @Input() Product!: Product
}
