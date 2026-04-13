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
      label: 'Comet AGS 0',
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
      label: 'Comet AGS 1',
      id: 'AGS1',
      minAmount: 30,
      maxAmount: 1500,
      image: '/AGS1.svg',
      title: 'Junior AGS 1',
      details: ['90 Days Period', 'Daily Income - 1.2%', 'Min Deposit - 30 USDT'],
      expiryTime: 'Active Until - 2 Days',
      isDefault: false,
      isButtonEnable: false,
      taskGuide: [
        'The advanced Comet AGS.0 robot will formulate and improve the Comet AGS strategy in real time and form instructions based on the deep learning and monitoring of hundreds of CEX/DEX transaction pairs every day.',
        'When the user starts, quantitative trading pairs are executed automatically.',
        'Daily Yield income upto 1.2% From Single start Quantification.',
        'Minimum Quantifiable Amount starts from 30 USDT to maximum of 1500 USDT in Algorithmic Grid Strategy-1.',
        'Team Daily Commission - 7%|5%|4%|3%|2%'
      ]
    },
    {
      label: 'Comet AGS 2',
      id: 'AGS2',
      minAmount: 1501,
      maxAmount: 3500,
      image: '/AGS2.svg',
      title: 'Senior AGS 2',
      details: ['90 Days Period', 'Daily Income - 1.5%', 'Min Deposit - 1501 USDT'],
      expiryTime: 'Active Until - 2 Days',
      isDefault: false,
      isButtonEnable: false,
      targetMembers: 3,
      currentMembers: 0,
      taskGuide: [
        'The advanced Comet AGS 2.0 robot will formulate and improve the Comet AGS strategy in real time and form instructions based on the deep learning and monitoring of hundreds of X-Chain/X-Chain transaction pairs every day.',
        'When the user starts, quantitative trading pairs are executed automatically.',
        'Daily Yield income upto 1.5% From Single start Quantification.',
        'Minimum Quantifiable Amount starts from 1501 USDT to maximum of 3500 USDT in Algorithmic Grid Strategy-2.',
        'Team Daily Commission - 7%|5%|4%|3%|2%',
        'Need 3 effective members can upgrade AGS2'
      ]
    },
    {
      label: 'Comet AGS 3',
      id: 'AGS3',
      minAmount: 3501,
      maxAmount: 6000,
      image: '/AGS3.svg',
      title: 'Expert AGS 3',
      details: ['90 Days Period', 'Daily Income - 1.8%', 'Min Deposit - 3501 USDT'],
      expiryTime: 'Active Until - 2 Days',
      isDefault: false,
      isButtonEnable: false,
      targetMembers: 10,
      currentMembers: 0,
      taskGuide: [
        'The advanced Comet AGS 3.0 robot will formulate and improve the Comet AGS strategy in real time and form instructions based on the deep learning and monitoring of hundreds of OTC/AMM transaction pairs every day.',
        'When the user starts, quantitative trading pairs are executed automatically.',
        'Daily Yield income upto 1.8% From Single start Quantification.',
        'Minimum Quantifiable Amount starts from 3501 USDT to maximum of 6000 USDT in Algorithmic Grid Strategy-3.',
        'Team Daily Commission - 7%|5%|4%|3%|2%',
        'Need 10 effective members can upgrade AGS3'
      ]
    },
    {
      label: 'Comet AGS 4',
      id: 'AGS4',
      minAmount: 6001,
      maxAmount: 9000,
      image: '/AGS4.svg',
      title: 'Master AGS 4',
      details: ['90 Days Period', 'Daily Income - 2.4%', 'Min Deposit - 6001 USDT'],
      expiryTime: 'Active Until - 2 Days',
      isDefault: false,
      isButtonEnable: false,
      targetMembers: 20,
      currentMembers: 0,
      taskGuide: [
        'The advanced Comet AGS 4.0 robot will formulate and improve the Comet AGS strategy in real time and form instructions based on the deep learning and monitoring of hundreds of Agg/Arb transaction pairs every day.',
        'When the user starts, quantitative trading pairs are executed automatically.',
        'Daily Yield income upto 2.4% From Single start Quantification.',
        'Minimum Quantifiable Amount starts from 6001 USDT to maximum of 9000 USDT in Algorithmic Grid Strategy-4.',
        'Team Daily Commission - 7%|5%|4%|3%|2%',
        'Need 20 effective members can upgrade AGS4'
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
