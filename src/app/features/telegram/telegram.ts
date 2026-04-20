import { Component, OnInit, inject, PLATFORM_ID, Inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TopNav } from '../top-nav/top-nav';

@Component({
  selector: 'app-telegram',
  standalone: true,
  imports: [CommonModule, RouterModule, TopNav],
  templateUrl: './telegram.html',
  styleUrl: './telegram.scss'
})
export class Telegram implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  totalDeposits: number = 0;
  telegramLink: string = '';
  isLocked: boolean = true;
  isLoading: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadData();
    }
  }

  loadData() {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    this.isLoading = true;
    this.authService.avengers({ screen: 'home', userId }).subscribe({
      next: (res: any) => {
        if (res.statusCode === 200) {
          this.totalDeposits = Number(res.data.totalDeposits) || 0;
          this.telegramLink = res.data.telegramLinkOne;
          this.isLocked = this.totalDeposits < 30;
          this.cdr.detectChanges();
        }
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Error fetching data:', err);
        this.isLoading = false;
      }
    });
  }

  joinTelegram() {
    if (this.telegramLink) {
      window.open(this.telegramLink, '_blank');
    }
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}
