import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TopNav } from '../top-nav/top-nav'

import { TranslatePipe } from '../../pipes/translate-pipe';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-signin',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatIconModule,
    MatSnackBarModule,
    CommonModule,
    RouterModule,
    TopNav,
    TranslatePipe
  ],
  templateUrl: './signin.html',
  styleUrl: './signin.scss'
})
export class Signin implements OnInit {
  loginForm: FormGroup;
  hidePassword = true;

  selectedLanguage = 'en'; // Default selection

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private meta: Meta,
    private title: Title,
    private authService: AuthService
  ) {

    sessionStorage.clear();

    if ('caches' in window) {
      caches.keys().then(names => {
        names.forEach(name => caches.delete(name));
      });
    }


    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rememberMe: [false],
      captcha: [false, Validators.requiredTrue]
    });
  }
  ngOnInit(): void {
    this.title.setTitle('Sign in | Comet AGS');
    this.meta.updateTag({
      name: 'robots',
      content: 'noindex,nofollow'
    });

  }

  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      // ================================
      // ⭐ USER & ADMIN LOGIN (API)
      // ================================
      const payload = {
        user: email,
        password: password
      };


      this.authService.login(payload).subscribe({
        next: (res) => {

          if (res.statusCode === 200 && res.data?.isActiveUser) {
            this.snackBar.open('Login Successful! Welcome back!', 'Close', {
              duration: 3000,
              panelClass: ['success-snackbar']
            });

            this.safeSetLocalStorage('userId', res.data.userId);
            this.safeSetLocalStorage('email', email);
            this.safeSetLocalStorage('isHumanVerified', 'true');
            this.safeSetLocalStorage('token', res.data.token);
            this.safeSetLocalStorage('role', res.data.role);

            if (res.data.role === 'admin') {
              this.router.navigate(['/admin/dashboard']);
            } else {
              this.router.navigate(['/home']);
            }
          } else {
            this.snackBar.open(res.message || 'Invalid credentials', 'Close', {
              duration: 3000,
              panelClass: ['error-snackbar']
            });
          }
        },
        error: (err) => {
          console.error('Login error:', err.error.message);
          let msg = err.error.message;
          if (msg == 'Invalid email or password') msg = 'Invalid password';
          this.snackBar.open(msg || 'Invalid Credentials', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      });
    } else {
      this.snackBar.open('Please fill in all required fields correctly', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    }
  }


  get passwordControl() { return this.loginForm.get('password'); }

  private performLogin() {
    // Simulate API call delay
    setTimeout(() => {
      // Show success message
      this.snackBar.open('Login Successful! Welcome back!', 'Close', {
        duration: 3000,
        panelClass: ['success-snackbar']
      });

      // Navigate to home page after a short delay
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 1000);
    }, 100);
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
  private safeGetLocalStorage(key: string): string | null {
    if (isPlatformBrowser(this.platformId)) {
      try {
        return sessionStorage.getItem(key);
      } catch {
        return null;
      }
    }
    return null;
  }

  private safeSetLocalStorage(key: string, value: string): void {
    if (isPlatformBrowser(this.platformId)) {
      try {
        sessionStorage.setItem(key, value);
      } catch {
        console.warn('Unable to access sessionStorage');
      }
    }
  }

  // forgetPassword() {
  //   this.router.navigate(['/forget']);
  // }

}

