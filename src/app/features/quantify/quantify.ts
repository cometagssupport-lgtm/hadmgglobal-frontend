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
  isQuantifying = false;
  quantizationProgress = 0;
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
      isDefault: true,
      isButtonEnable: true,
      taskGuide: [
        'The advanced Comet AGS Trial Robot provides a beginner-friendly experience by simulating real-time strategy execution.',
        'When the user starts, quantitative trading pairs are executed automatically.',
        'Get a welcome trial bonus with an internal experience for 2 days (free access).',
        'Daily yield income up to 2% from trial quantification.'
      ]
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
      isDefault: false,
      isButtonEnable: false,
      taskGuide: [
        'Junior AGS 1 robot monitors selected transaction pairs for steady growth.',
        'Automatic execution of high-liquidity trading pairs.',
        'Stable daily income for fixed 90-day periods.',
        'Requires a minimum deposit of 30 USDT to activate.'
      ]
    },
    {
      label: 'AGS 2',
      id: 'AGS2',
      minAmount: 1501,
      maxAmount: 3500,
      image: '/AGS2.svg',
      title: 'Senior AGS 2',
      isDefault: false,
      isButtonEnable: false,
      targetMembers: 3,
      currentMembers: 0,
      taskGuide: [
        'Senior AGS 2 offers advanced algorithmic monitoring for higher efficiency.',
        'Enhanced quantitative trading patterns for consistent returns.',
        '90 Days active period with daily income up to 3%.',
        'Need 3 effective members to unlock this upgrade.'
      ]
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
      isDefault: false,
      isButtonEnable: false,
      targetMembers: 10,
      currentMembers: 0,
      taskGuide: [
        'Expert AGS 3 utilizes deeper learning to optimize monitoring of 100+ pairs.',
        'Automated real-time strategy adjustments for peak performance.',
        'Professional grade daily yields up to 3.5%.',
        'Requires 10 effective team members for access.'
      ]
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
      isDefault: false,
      isButtonEnable: false,
      targetMembers: 20,
      currentMembers: 0,
      taskGuide: [
        'Master AGS 4 is the ultimate quantitative solution with 24/7 priority execution.',
        'Highest possible yield tier of 4% daily.',
        'Premium monitoring of cross-chain transaction pairs.',
        'Exclusive access for leaders with 20+ effective members.'
      ]
    }
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
    return this.currentTab.isButtonEnable && !this.isQuantified;
  }

  startQuantization() {
    if (!this.isButtonEnabled || this.isQuantified || this.isQuantifying) return;

    this.isQuantifying = true;
    this.quantizationProgress = 0;

    const duration = 15000; // 15 seconds
    const intervalTime = 100; // Update every 100ms
    const step = (intervalTime / duration) * 100;

    const progressTimer = setInterval(() => {
      this.quantizationProgress += step;
      if (this.quantizationProgress >= 100) {
        this.quantizationProgress = 100;
        clearInterval(progressTimer);
        this.completeQuantization();
      }
      this.cdr.detectChanges();
    }, intervalTime);
  }

  completeQuantization() {
    const userId = localStorage.getItem('userId');
    const payload = {
      screen: 'startQuantification',
      userId: userId,
      tabId: this.currentTab.id
    };

    this.authService.avengers(payload).subscribe({
      next: (res) => {
        this.isQuantifying = false;
        this.isQuantified = true;
        this.currentTab.isButtonEnable = false; // Disable button for this tab
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
        this.isQuantifying = false;
        this.snackBar.open('Failed to start quantification. Please try again.', 'Close', {
          duration: 3000
        });
      }
    });
  }
}
