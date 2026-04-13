import { Component, OnInit, OnDestroy, inject, PLATFORM_ID, Inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
// import { TranslatePipe } from '../../pipes/translate-pipe';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';

@Component({
  selector: 'app-quantify',
  standalone: true,
  imports: [CommonModule, MatSnackBarModule, FlexLayoutModule],
  templateUrl: './quantify.html',
  styleUrl: './quantify.scss'
})
export class Quantify implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);
  private cdr = inject(ChangeDetectorRef);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  userBalance = 0;
  isQuantified = false;
  selectedTabIndex = 0;
  remainingTime: string = '24:00:00';
  private timerInterval: any;

  tabs = [
    {
      label: 'AGS 0',
      id: 'AGS0',
      minAmount: 0,
      maxAmount: 0,
      image: '/AGS0.svg',
      title: 'Intern AGS 0',
      details: ['2 Days Internship Bonus', 'Daily Income - 2%'],
      expiryTime: 'Active Until - 2 Days',
      isDefault: true
    },
    {
      label: 'AGS 1',
      id: 'AGS1',
      minAmount: 30,
      maxAmount: 1500,
      image: '/AGS1.svg',
      title: 'Junior AGS 1',
      details: ['90 Days Period', 'Daily Income - 2.5%', 'Min Deposit - 30 USDT'],
      expiryTime: 'Active Until - 2 Days',
      isDefault: false
    },
    {
      label: 'AGS 2',
      id: 'AGS2',
      minAmount: 1501,
      maxAmount: 3500,
      image: '/AGS2.svg',
      title: 'Senior AGS 2',
      details: ['90 Days Period', 'Daily Income - 3%', 'Min Deposit - 1501 USDT'],
      expiryTime: '',
      isDefault: false
    },
    {
      label: 'AGS 3',
      id: 'AGS3',
      minAmount: 3501,
      maxAmount: 6000,
      image: '/AGS3.svg',
      title: 'Expert AGS 3',
      details: ['90 Days Period', 'Daily Income - 3.5%', 'Min Deposit - 3501 USDT'],
      expiryTime: '',
      isDefault: false
    },
    {
      label: 'AGS 4',
      id: 'AGS4',
      minAmount: 6001,
      maxAmount: 9000,
      image: '/AGS4.svg',
      title: 'Master AGS 4',
      details: ['90 Days Period', 'Daily Income - 4%', 'Min Deposit - 6001 USDT'],
      expiryTime: '',
      isDefault: false
    }
  ];

  taskGuide = [
    'The advanced Comet AGS Trial Robot provides a beginner-friendly experience by simulating real-time strategy execution with limited monitoring of selected transaction pairs.',
    'When the user starts, quantitative trading pairs are executed automatically.',
    'Get a welcome trial bonus with an internal experience for 2 days (free access).',
    'Daily yield income up to 2% from trial quantification.',
    'Total income: 4 USDT during the trial period.',
    'No minimum investment required (trial access only).'
  ];

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.getUserBalance();
      this.startCountdown();

      const lastQuantified = localStorage.getItem('lastQuantifiedDate');
      const today = new Date().toDateString();
      if (lastQuantified === today) {
        this.isQuantified = true;
      }
    }
  }

  ngOnDestroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  startCountdown() {
    // Simulated: Reset countdown for 24 hours from "now" for demo purposes
    // In real app, this would use a timestamp from the API
    const endTime = new Date();
    endTime.setHours(endTime.getHours() + 24);

    this.timerInterval = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime.getTime() - now;

      if (distance < 0) {
        clearInterval(this.timerInterval);
        this.remainingTime = "00:00:00";
        return;
      }

      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      this.remainingTime =
        (hours < 10 ? "0" + hours : hours) + ":" +
        (minutes < 10 ? "0" + minutes : minutes) + ":" +
        (seconds < 10 ? "0" + seconds : seconds);

      this.cdr.detectChanges();
    }, 1000);
  }

  getUserBalance() {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    this.authService.avengers({ screen: 'profile', userId }).subscribe({
      next: (res) => {
        if (res.statusCode === 200) {
          this.userBalance = Number(res.data.totalDeposits || 0);
          this.cdr.detectChanges();
        }
      },
      error: (err) => console.error('Error fetching balance:', err)
    });
  }

  selectTab(index: number) {
    this.selectedTabIndex = index;
  }

  get currentTab() {
    return this.tabs[this.selectedTabIndex];
  }

  get isButtonEnabled() {
    if (this.currentTab.isDefault) return true;
    return this.userBalance >= this.currentTab.minAmount;
  }

  startQuantization() {
    if (!this.isButtonEnabled || this.isQuantified) return;

    // Simulate API call to start quantization
    const userId = localStorage.getItem('userId');
    const payload = {
      screen: 'startQuantification',
      userId: userId,
      tabId: this.currentTab.id
    };

    this.authService.avengers(payload).subscribe({
      next: (res) => {
        this.isQuantified = true;
        localStorage.setItem('lastQuantifiedDate', new Date().toDateString());

        this.snackBar.open('Quantification Started Successfully!', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['success-snackbar']
        });
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.snackBar.open('Failed to start quantification. Please try again.', 'Close', {
          duration: 3000
        });
      }
    });
  }
}
