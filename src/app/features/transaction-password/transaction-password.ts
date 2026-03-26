import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TopNav } from '../top-nav/top-nav';
import { TranslatePipe } from '../../pipes/translate-pipe';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-transaction-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TopNav, TranslatePipe, MatSnackBarModule],
  templateUrl: './transaction-password.html',
  styleUrl: './transaction-password.scss'
})
export class TransactionPassword implements OnInit {
  password = '';
  confirmPassword = '';
  isLoading = false;
  lastUpdated = '01-10-2024';

  private router = inject(Router);
  private authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);

  ngOnInit() {
    console.log('Transaction Password Component Loaded');
  }

  goBack() {
    this.router.navigate(['/profile']);
  }

  updatePassword() {
    if (!this.password || !this.confirmPassword) {
      this.snackBar.open('Please fill in both fields', 'Close', { duration: 3000 });
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.snackBar.open('Passwords do not match', 'Close', { duration: 3000 });
      return;
    }

    const userId = localStorage.getItem('userId');
    if (!userId) {
      this.snackBar.open('User ID not found. Please log in again.', 'Close', { duration: 3000 });
      this.router.navigate(['/signin']);
      return;
    }

    this.isLoading = true;
    const payload = {
      userId: userId,
      password: this.password
    };

    console.log('📌 Calling Set Transaction Password API:', payload);

    this.authService.setTransactionPassword(payload).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        if (res.statusCode === 200) {
          this.snackBar.open('Transaction password updated successfully!', 'Close', { duration: 3000 });
          this.router.navigate(['/profile']);
        } else {
          this.snackBar.open(res.message || 'Failed to update password', 'Close', { duration: 3000 });
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error('❌ Password Update Error:', err);
        this.snackBar.open('An error occurred. Please try again.', 'Close', { duration: 3000 });
      }
    });
  }
}
