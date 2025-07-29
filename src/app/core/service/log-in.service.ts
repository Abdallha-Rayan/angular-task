import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LogInService {
  private _http = inject(HttpClient)
  private router = inject(Router);
  private apiUrl = environment.apiUrl;

  private currentUserToken = signal<string | null>(localStorage.getItem('authToken'));
  public isLoggedIn = computed<boolean>(() => !!this.currentUserToken());
  public authToken = computed<string | null>(() => this.currentUserToken());
  constructor() { }

  login(body: any) {
    return this._http.post<any>(this.apiUrl + 'auth/login', body).pipe(
      tap((response) => {
        console.log('Token', response.access_token);
        const token = response.access_token;
        localStorage.setItem('authToken', token);
        this.currentUserToken.set(token);
        console.log('[AuthService] State updated. Navigating to /system...');
        this.router.navigate(['/system'], { replaceUrl: true });

      })
    );
  }
  logout(): void {
    localStorage.removeItem('authToken');
    this.currentUserToken.set(null);
    this.router.navigateByUrl('/auth/login');
  }

}
