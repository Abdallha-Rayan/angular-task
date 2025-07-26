import { Component, inject } from '@angular/core';
import { InputFiledComponent } from '../../../shared/input-filed/input-filed.component';
import { ButtonSharedComponent } from '../../../shared/button-shared/button-shared.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LogInService } from '../../../core/service/log-in.service';

@Component({
  selector: 'app-login',
  imports: [InputFiledComponent, ButtonSharedComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private _fb = inject(FormBuilder);
  private route = inject(Router)
  private _logInServies = inject(LogInService)
  formLogin!: FormGroup;
  submitted = false;
  loginError: string | null = null;
  isLoading = false;

  constructor() {
    this.formLogin = this._fb.group({
      email: ['john@mail.com', Validators.required],
      password: ['changeme', Validators.required]
    })
  }


  onLogin() {
    this.isLoading = true;

    if (this.formLogin.invalid) {
      return;
    }

    this.loginError = null;

    this._logInServies.login(this.formLogin.value).subscribe({
      next: () => {
        console.log('[LoginComponent] Service call initiated and is handling the rest.');
      },
      error: (err) => {
        this.loginError = 'البريد الإلكتروني أو كلمة المرور غير صحيحة.';
        console.error('فشل تسجيل الدخول:', err);
        this.isLoading = false;

      }
    });
  }
}


