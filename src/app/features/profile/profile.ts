import {
  Component,
  ViewChild,
  OnInit,
  Inject,
  PLATFORM_ID,
  NgZone,
  ChangeDetectorRef,
  inject
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { Transfer } from '../transfer/transfer';
import { AuthService } from '../../services/auth.service';
import { TranslatePipe } from '../../pipes/translate-pipe';

// import { TopNav } from '../top-nav/top-nav';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, RouterModule, MatIconModule, TranslatePipe, MatSnackBarModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile implements OnInit {

  private authService = inject(AuthService);
  private ngZone = inject(NgZone);
  private cdr = inject(ChangeDetectorRef);
  private snackBar = inject(MatSnackBar);

  @ViewChild('transferModal') transferModal!: Transfer;


  amount = 0;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  user = {
    name: 'Admin',
    email: 'admin@gmail.com',
    uid: '53794',
    level: 'AGS 0',
    workingWallet: 0,
    withdrawalWallet: 0,
    avatar: '/avatar1.svg' // default placeholder
  };
  telegramLinkTwo: string = ''
  telegramLinkThree: string = ''

  walletSummary = [
    { label: "Recharge Amount", value: 0 },
    { label: 'Earnings Balance', value: 0 },
    { label: 'Total Earnings', value: 0 },
    { label: "Today's Task Earnings", value: 0 },
    { label: "Today's Team Income", value: 0 },
    { label: "Total Valid Team Count", value: 0 },
    { label: "Total Withdrawal", value: 0 },
    { label: "Total Balance", value: 0 },
    { label: "Total Revenue", value: 0 },
  ];

  settings = [
    { label: 'Transaction History', icon: '/transh.svg' },
    { label: 'Set Transaction Password', icon: '/transpass.svg' },
    { label: 'Help & support', icon: '/h&su.svg' },
    { label: 'Change password', icon: '/change-password.svg' },
    { label: 'Terms and conditions', icon: '/termsandc.svg' },
  ];
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const userId = localStorage.getItem('userId');
      if (userId) {
        this.user.uid = userId;
        this.getProfileData(userId);
        this.getGameData(userId);
      } else {
        console.error('❌ No userId found in localStorage');
      }
    }
  }
  // ----------------------------------------------------------------------
  // 🔥 PROFILE API CALL (Avengers API)
  // ----------------------------------------------------------------------
  getProfileData(userId: string) {
    const payload = {
      screen: 'profile',
      userId: userId,
    };

    console.log('📌 Calling Avengers Profile API:', payload);

    this.authService.avengers(payload).subscribe({
      next: (res) => {
        console.log('✅ Profile API Response:', res);

        if (res.statusCode !== 200 || !res.data) {
          console.warn('⚠️ No profile data received');
          return;
        }

        const data = res.data;

        this.ngZone.run(() => {
          // Update user wallets
          this.user.name = data.name || 'User';
          this.user.email = data.email || 'Email';
          this.user.workingWallet = Number(data.totalDeposits ?? 0);
          this.user.withdrawalWallet = Number(data.totalEarnings ?? 0);
          this.user.avatar = data.avatar || localStorage.getItem('avatarUrl') || '/avatar1.svg';
          if (Number(this.user.avatar)) {
            this.user.avatar = '/avatar' + this.user.avatar + '.svg';
          }
          this.telegramLinkTwo = data.telegramLinkTwo;
          this.telegramLinkThree = data.telegramLinkThree;

          // Using dummy values of 3.66 for now as placeholders for the 9-item grid mapping as requested
          this.walletSummary = [
            { label: "Recharge Amount", value: data.totalDeposits ?? 0 },
            { label: "Earnings Balance", value: data.totalEarnings ?? 0 },
            { label: "Total Earnings", value: data.grandTotalCommission ?? 0 },
            { label: "Today's Task Earnings", value: data.usersTodaysCommission ?? 0 },
            { label: "Today's Team Income", value: data.teamDailyCommission ?? 0 },
            { label: "Total Valid Team Count", value: data.totalValidTeamCount ?? 0 },
            { label: "Total Withdrawal", value: data.totalWithdrawals ?? 0 },
            { label: "Total Balance", value: data.flexibleDeposite ?? 0 },
            { label: "Total Revenue", value: data.grandTotalCommission ?? 0 },
          ];

          this.cdr.detectChanges();
        });
      },

      error: (err) => {
        console.error('❌ Failed to fetch profile data:', err);
      }
    });
  }

  getGameData(userId: string) {
    const payload = { screen: 'game', userId: userId };
    this.authService.avengers(payload).subscribe({
      next: (res) => {
        if (res.statusCode === 200 && res.data) {
          this.ngZone.run(() => {
            this.user.level = res.data.currectLevel || 'AGS 0';
            if (this.user.level == 'Level1') {
              this.user.level = 'AGS 1';
            } else if (this.user.level == 'Level2') {
              this.user.level = 'AGS 2';
            } else if (this.user.level == 'Level3') {
              this.user.level = 'AGS 3';
            } else if (this.user.level == 'Level4') {
              this.user.level = 'AGS 4';
            }
            this.cdr.detectChanges();
          });
        }
      },
      error: (err) => {
        console.error('❌ Failed to fetch game level:', err);
      }
    });
  }

  openAvatar() {
    this.router.navigate(['/avatar']);
  }


  getInitials(name: string): string {
    const parts = name.trim().split(' ');
    return parts.length > 1 ? parts[0][0] + parts[1][0] : name.slice(0, 2).toUpperCase();
  }

  onWalletAction(label: string) {
    if (label === 'Deposit') {
      this.router.navigate(['/deposit']);
    } else if (label === 'Withdrawal') {
      this.router.navigate(['/withdraw']);
    } else if (label === 'History') {
      this.router.navigate(['/history']);
    } else if (label === 'Group') {
      this.opentelegramLinkTwo();
    } else if (label == 'Transfer') {
      this.transferModal.openModal();
    }
  }


  opentelegramLinkTwo() {
    if (this.telegramLinkTwo) {
      window.open(this.telegramLinkTwo, '_blank');
    }
  }


  onSetting(label: string) {
    console.log('Clicked setting:', label);
    if (label == 'Terms and conditions') {
      this.router.navigate(['/t&c']);
    } else if (label == 'Help & support') {
      this.opentelegramLinkTwo();
    } else if (label == 'Change password') {
      localStorage.setItem("email", this.user.email)
      this.router.navigate(['/change-password']);
    } else if (label == 'Set Transaction Password') {
      this.router.navigate(['/set-transaction-password']);
    } else if (label == 'Transaction History') {
      this.router.navigate(['/transactions']);
    }
  }

  logout() {
    console.log('Logged out');
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    this.router.navigate(['/signin']);
  }



  onTransferClosed() {
    if (isPlatformBrowser(this.platformId)) {
      const userId = localStorage.getItem('userId');
      if (userId) {
        this.getProfileData(userId);
      } else {
        console.error('❌ No userId found in localStorage');
      }
    }
  }

  copyUID(uid: string) {
    if (!uid) return;
    navigator.clipboard.writeText(uid).then(() => {
      this.snackBar.open('UID copied to clipboard!', 'Close', { duration: 3000 });
    }).catch(err => {
      console.error('Failed to copy text: ', err);
      this.snackBar.open('Failed to copy UID.', 'Close', { duration: 3000 });
    });
  }
}
