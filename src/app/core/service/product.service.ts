
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, EMPTY, Observable, tap, throwError } from 'rxjs';
import { Product } from '../../shared/Module/product-module';

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  deleting: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;


  private state = signal<ProductState>({
    products: [],
    loading: true,
    error: null,
    deleting: false
  });


  public products = computed(() => this.state().products);
  public loading = computed(() => this.state().loading);
  public error = computed(() => this.state().error);
  public deleting = computed(() => this.state().deleting);



  constructor() {
    this.http.get<Product[]>(`${this.apiUrl}products`).pipe(
      tap(products => {
        this.state.update(s => ({
          ...s,
          products: products,
          loading: false
        }));
        console.log('products', products);

      }),
      catchError(err => {
        this.state.update(s => ({
          ...s,
          products: [],
          loading: false,
          error: 'فشل تحميل المنتجات. الرجاء المحاولة مرة أخرى.'
        }));
        return EMPTY;
      })
    ).subscribe();
  }


  saveProduct(body: any) {

    this.state.update(s => ({
      ...s, loading: true,
      error: null
    }))

    return this.http.post(this.apiUrl + 'products', body).pipe(
      tap((newProduct) => {

        console.log('body For save new Product', newProduct);

        this.state.update((currentState: any) => {

          const updatedProducts = [newProduct, ...currentState.products];

          return {

            ...currentState,
            products: updatedProducts,
            loading: false

          };

        });
      }),
      catchError((err: HttpErrorResponse) => {

        return throwError(() => err);
      }),

    )
  }

  updateProduct(prodcut: any) {

    if (!prodcut.id) {
      const error = new Error('Product ID is missing. Cannot perform update.')
      console.error(error.message);
      return throwError(() => error);
    }

    this.state.update(s => ({ ...s, loading: true }));

    return this.http.put(`${this.apiUrl}products/${prodcut.id}`, prodcut).pipe(

      tap((updateProduct: any) => {

        console.log('Product updated successfully on server:', updateProduct);

        this.state.update((currentState: any) => {

          const index = currentState.products.findIndex((p: any) => p.id === updateProduct.id);

          const updatedProducts = [...currentState.products];

          if (index !== -1) {
            updatedProducts[index] = updateProduct;
          }

          return {
            ...currentState,
            products: updatedProducts,
            loading: false,
            error: null
          };
        }),
          catchError((error: HttpErrorResponse) => {
            console.error(`Failed to update product with ID ${prodcut.id}:`, error);
            this.state.update(s => ({
              ...s,
              loading: false,
              error: `Failed to update product. Status: ${error.status}`
            }));
            return throwError(() => error);
          })

      })
    )


  }


  deleteProduct(id: number): Observable<void> {

    this.state.update(s => ({ ...s, deleting: true }));

    return this.http.delete<void>(`${this.apiUrl}products/${id}`).pipe(
      tap(() => {
        this.state.update(s => ({
          ...s,
          products: s.products.filter(p => p.id !== id),
          deleting: false
        }));
      }),
      catchError((err: HttpErrorResponse) => {
        this.state.update(s => ({
          ...s,
          deleting: false,
          error: `فشل حذف المنتج رقم ${id}`
        }));
        return throwError(() => err);
      })
    );
  }

}
