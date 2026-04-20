import { Component, OnInit, inject, PLATFORM_ID, Inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { TopNav } from '../top-nav/top-nav';

@Component({
  selector: 'app-referral',
  standalone: true,
  imports: [CommonModule, RouterModule, MatSnackBarModule, TopNav],
  templateUrl: './referral.html',
  styleUrl: './referral.scss'
})
export class Referral implements OnInit {
  private authService = inject(AuthService);
  private clipboard = inject(Clipboard);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  referralLink: string = '';
  isLoading = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadReferralData();
    }
  }

  loadReferralData() {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    this.isLoading = true;
    const payload = { screen: 'home', userId };
    this.authService.avengers(payload).subscribe({
      next: (res: any) => {
        if (res.statusCode === 200) {
          this.referralLink = res.data.refferalLink;
          this.cdr.detectChanges();
        }
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Error fetching referral data:', err);
        this.isLoading = false;
      }
    });
  }

  copyLink() {
    if (this.referralLink) {
      this.clipboard.copy(this.referralLink);
      this.snackBar.open('Referral link copied!', 'Close', {
        duration: 2000,
        panelClass: ['success-snackbar']
      });
    }
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}
