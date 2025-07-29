import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { SystemLayoutComponent } from './layouts/System_Layout /system-layout/system-layout.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth/login',
        pathMatch: 'full'

    },
    {
        path: 'auth',
        children: [
            {
                path: 'login',
                loadComponent: () =>
                    import('./layouts/Auth_Layout /login/login.component').then((m) => m.LoginComponent)
            }
        ]
    },
    {
        path: 'system',
        canActivate: [authGuard],
        component: SystemLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'products',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                loadComponent: () =>
                    import('./feature/product/dashbord-product/dashbord-product.component').then(m => m.DashbordProductComponent)
            },
            {
                path: 'products',
                loadComponent: () =>
                    import('./feature/product/products/products.component').then(m => m.ProductsComponent)
            },

        ]
    },
    {
        path: '**',
        redirectTo: 'auth/login',
    },
];
