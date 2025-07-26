
import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LogInService } from '../service/log-in.service';
import { ToastService } from '../service/toast.service';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {

  const logInService = inject(LogInService);
  const toastService = inject(ToastService);
  const authToken = logInService.authToken();

  let authReq = req;

  if (authToken) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });
  }

  return next(authReq).pipe(
    tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse && event.status >= 200 && event.status < 300) {
        if (req.method !== 'GET') {
          let message = 'تمت العملية بنجاح!';
          if (req.method === 'POST') {
            if (req.url.includes('/login')) {
              message = 'تم تسجيل الدخول بنجاح!';
            } else {
              message = 'تم الإنشاء بنجاح!';
            }
          } else if (req.method === 'PUT' || req.method === 'PATCH') {
            message = 'تم التحديث بنجاح!';
          } else if (req.method === 'DELETE') {
            message = 'تم الحذف بنجاح!';
          }

          toastService.showToast('success', message);
        }
      }
    }),
    catchError((error: HttpErrorResponse) => {
      console.error('HTTP Error Interceptor:', error);

      let errorMessage = 'حدث خطأ غير متوقع. الرجاء المحاولة مرة أخرى.';

      if (error.status === 401) {
        errorMessage = 'غير مصرح لك بالوصول. قد تكون جلسة العمل قد انتهت.';
      } else if (error.status === 404) {
        errorMessage = 'المورد المطلوب غير موجود.';
      } else if (error.status === 400) {
        errorMessage = error.error?.message || 'بيانات الطلب غير صالحة.';
      } else if (error.status >= 500) {
        errorMessage = 'حدث خطأ في الخادم. الرجاء إبلاغ الدعم الفني.';
      }

      toastService.showToast('error', errorMessage);

      return throwError(() => error);
    })
  );
};
