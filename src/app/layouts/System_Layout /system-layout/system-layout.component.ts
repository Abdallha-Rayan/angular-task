import { Component, inject, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { CardProductSharedComponent } from '../../../shared/card-product-shared/card-product-shared.component';
import { ProductService } from '../../../core/service/product.service';
import { SpinnerComponent } from '../../../shared/spinner/spinner.component';

@Component({
  selector: 'app-system-layout',
  standalone: true,
  imports: [FooterComponent, NavbarComponent, RouterOutlet,],
  templateUrl: './system-layout.component.html',
  styleUrl: './system-layout.component.scss'
})
export class SystemLayoutComponent implements OnInit {
  ngOnInit(): void {
  }



}
