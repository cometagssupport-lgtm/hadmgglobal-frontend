import { Component, PLATFORM_ID, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, isPlatformBrowser, Location } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TopNav } from '../top-nav/top-nav'
import { AuthService } from '../../services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
// import { TranslatePipe } from '../../pipes/translate-pipe';

@Component({
  selector: 'app-withdrawal',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    RouterModule,
    TopNav
  ],
  templateUrl: './withdrawal.html',
  styleUrl: './withdrawal.scss'
})
export class Withdrawal implements OnInit {
  totalRemainingBalance: number = 0;
  withdrawAddress: string = '';
  showPasskeyPopup: boolean = false;
  isLoading: boolean = false;
  showPassword = false;

  withdrawalForm: FormGroup;
  transactionAccounts: any[] = [
    { id: 'bep20', name: 'USDT - BEP20' },
    { id: 'trc20', name: 'USDT - TRC20' }
  ];
  selectedNetwork: any = null;

  quickAmounts = [10, 50, 200, 500];


  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private location: Location
  ) {
    this.withdrawalForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(10)]],
      walletAddress: ['', Validators.required],
      pin: ['', Validators.required],
    });
  }

  ngOnInit() {
    // Set default selection
    if (this.transactionAccounts.length > 0) {
      this.selectedNetwork = this.transactionAccounts[0];
    }
    if (isPlatformBrowser(this.platformId)) {
      console.log('🔹 Loading withdrawal data for user');
      const userId = localStorage.getItem('userId');
      if (userId) {
        this.loadWithdrawalData(userId);
      } else {
        console.error('No userId found in localStorage');
      }
    }
  }

  loadWithdrawalData(userId: string) {
    const payload = { screen: 'withdrawal', userId };

    this.authService.avengers(payload).subscribe({
      next: (res) => {
        console.log('Withdrawal API response:', res);
        if (res.statusCode === 200 && res.data) {
          this.totalRemainingBalance = res.data.totalRemainingBalance;
          const address = res.data.withdrawAddress || '';
          this.withdrawalForm.patchValue({ walletAddress: address });

          if (res.data.passkey === false) {
            this.showPasskeyPopup = true;
          }

          if (res.data.transactionAccounts) {
            this.transactionAccounts = res.data.transactionAccounts;
          }

          this.cdr.detectChanges();
        }
      },
      error: (err) => {
        console.error('Error fetching withdrawal data:', err);
      }
    });
  }

  setAmount(amt: number) {
    this.withdrawalForm.get('amount')?.setValue(amt);
    this.withdrawalForm.get('amount')?.markAsTouched();
  }

  setNetwork(net: any) {
    this.selectedNetwork = net;
  }

  onSubmit() {
    console.log('🔹 Withdrawal form submitted');
    if (this.withdrawalForm.invalid) {
      this.withdrawalForm.markAllAsTouched();
      return;
    }

    const userId = isPlatformBrowser(this.platformId)
      ? localStorage.getItem('userId')
      : null;

    if (!userId) {
      alert('User not found');
      return;
    }
    console.log('🔹 Withdrawal payload');

    const payload = {
      userId,
      amount: Number(this.withdrawalForm.value.amount),
      passcode: this.withdrawalForm.value.pin,
      withdrawAddress: this.withdrawalForm.value.walletAddress,
      network: this.selectedNetwork?.name
    };

    console.log('🔹 Sending withdrawal request:', payload);

    this.isLoading = true;
    this.authService.withdraw(payload).subscribe({
      next: (res) => {
        this.isLoading = false;
        console.log('✅ Withdrawal API response:', res);

        if (res.statusCode === 200) {
          this.totalRemainingBalance = res.data.remainingBalance || 0;
          this.snackBar.open('Withdraw Successfully', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.router.navigate(['/home']);
        } else {
          this.snackBar.open(res.message || 'Withdrawal failed. Please try again.', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Withdrawal request failed:', err);
        this.snackBar.open(err?.error?.message || 'Something went wrong. Please try again later.', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  goBack() {
    this.location.back();
  }

  configureTransactionPassword() {
    this.showPasskeyPopup = false;
    this.router.navigate(['/set-transaction-password']);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
