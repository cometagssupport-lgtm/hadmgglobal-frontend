import { Component, OnInit, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser, Location } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate-pipe';
import { TopNav } from '../top-nav/top-nav';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-deposit',
  imports: [CommonModule, MatButtonModule, FormsModule, TranslatePipe, TopNav],
  templateUrl: './deposit.html',
  styleUrl: './deposit.scss',
  standalone: true,
})
export class Deposit implements OnInit {
  amount: number | null = null;
  selectedToken: any = null;
  quickAmounts = [50, 200, 500, 1500];
  transactionAccounts: any[] = [];

  get minDeposit(): number {
    return environment.minDepositAmount || 30;
  }

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const userId = localStorage.getItem('userId');
      if (userId) this.loadAvengerAccounts(userId);
    }
  }

  loadAvengerAccounts(userId: string) {
    const payload = { screen: 'deposits', userId };
    this.authService.avengers(payload).subscribe({
      next: (res) => {
        if (res.statusCode === 200 && res.data?.transactionAccounts) {
          this.transactionAccounts = res.data.transactionAccounts;
          this.selectedToken = null;
          this.cdr.detectChanges();
        }
      }
    });
  }

  setAmount(value: number) {
    this.amount = value;
  }

  selectNetwork(network: any) {
    this.selectedToken = network;
  }

  goBack() {
    this.location.back();
  }

  cancel() {
    this.router.navigate(['/home']);
  }

  confirmDeposit() {
    if (!this.amount || this.amount < this.minDeposit || !this.selectedToken) return;

    const userId = isPlatformBrowser(this.platformId) ? localStorage.getItem('userId') : null;
    if (!userId) return;

    const payload = { userId, amount: this.amount, transactionAccount: this.selectedToken };

    this.authService.doPayment(payload).subscribe({
      next: (res) => {
        if (res.statusCode === 200 && res.data) {
          let data = res.data;
          data.amount = this.amount;
          localStorage.setItem("pay", JSON.stringify(data));
          this.router.navigate(['/payment']);
        } else {
          console.error('Deposit API returns error:', res.message);
        }
      },
      error: (err) => {
        console.error('Deposit API failed:', err);
      }
    });
  }
}
