import {
  Component,
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
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
// import { TranslatePipe } from '../../pipes/translate-pipe';

@Component({
  selector: 'app-rewards',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, FlexLayoutModule, MatSnackBarModule],
  templateUrl: './rewards.html',
  styleUrl: './rewards.scss'
})
export class Rewards implements OnInit {

  private authService = inject(AuthService);
  private ngZone = inject(NgZone);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  totalTickets = '00/06';
  totalRewardsClaimedAmount = '00';
  validInvites = 0;
  claimedRideLevel2 = false;

  rewardsList: any = [
    {
      id: 1,
      header: 'Ticket To Ride 1',
      paragraph: 'Successfully inviting 5 direct subordinates to recharge 30 USDT to get a 20 USDT reward.',
      requiredInvites: 5,
      currentInvites: 0,
      rewardAmount: 20,
      buttonName: 'Claim Now',
      isClaimed: false,
      isValid: false
    },
    {
      id: 2,
      header: 'Ticket To Ride 2',
      paragraph: 'Successfully inviting 15 direct subordinates to recharge 30 USDT to get a 30 USDT reward.',
      requiredInvites: 15,
      currentInvites: 0,
      rewardAmount: 30,
      buttonName: 'Claim Now',
      isClaimed: false,
      isValid: false
    },
    {
      id: 3,
      header: 'Ticket To Ride 3',
      paragraph: 'Successfully inviting 30 direct subordinates to recharge 30 USDT to get a 50 USDT reward.',
      requiredInvites: 30,
      currentInvites: 0,
      rewardAmount: 50,
      buttonName: 'Claim Now',
      isClaimed: false,
      isValid: false
    },
    {
      id: 4,
      header: 'Ticket To Ride 4',
      paragraph: 'Successfully inviting 50 direct subordinates to recharge 30 USDT to get a 100 USDT reward.',
      requiredInvites: 40,
      currentInvites: 0,
      rewardAmount: 100,
      buttonName: 'Claim Now',
      isClaimed: false,
      isValid: false
    },
    {
      id: 5,
      header: 'Ticket To Ride 5',
      paragraph: 'Successfully inviting 100 direct subordinates to recharge 30 USDT or more to get a 250 USDT reward.',
      requiredInvites: 60,
      currentInvites: 0,
      rewardAmount: 250,
      buttonName: 'Claim Now',
      isClaimed: false,
      isValid: false
    },
    {
      id: 6,
      header: 'Ticket To Ride 6',
      paragraph: 'Successfully inviting 100 direct subordinates to recharge 30 USDT or more to get a 250 USDT reward.',
      requiredInvites: 80,
      currentInvites: 0,
      rewardAmount: 250,
      buttonName: 'Claim Now',
      isClaimed: false,
      isValid: false
    }
  ];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.getRewardsData();
    }
  }

  getRewardsData() {
    const userId = localStorage.getItem('userId');
    const payload = {
      screen: 'taskmanager',
      userId: userId
    };

    this.authService.avengers(payload).subscribe({
      next: (res) => {
        if (res.statusCode === 200 && res.data) {
          const data = res.data;
          // Format tickets as '0/05' or similar based on count
          const valid = data.valid || 0;
          this.totalTickets = (valid < 10 ? '0' + valid : valid) + '/06';
          this.totalRewardsClaimedAmount = data.taskMoney || '0';

          this.updateRewardsList(data);
          this.cdr.detectChanges();
        }
      },
      error: (err) => {
        console.error('Error fetching rewards:', err);
      }
    });
  }

  updateRewardsList(data: any) {
    const claimedCount = Number(data.claimedTasks) || 0;
    const currentInvites = Number(data.valid) || 0;

    this.rewardsList = this.rewardsList.map((reward: any, index: any) => {
      // If the index of the task is less than the number of claimed tasks, it's claimed
      const isClaimed = index < claimedCount;
      const isValidToClaim = currentInvites >= reward.requiredInvites && !isClaimed;

      return {
        ...reward,
        currentInvites: currentInvites > reward.requiredInvites ? reward.requiredInvites : currentInvites,
        isClaimed: isClaimed,
        isValid: isValidToClaim,
        buttonName: isClaimed ? 'Claimed' : (isValidToClaim ? 'Claim Now' : 'Claim Now')
      };
    });
  }

  claimReward(reward: any) {
    if (!reward.isValid || reward.isClaimed) return;

    const userId = localStorage.getItem('userId');
    const payload = {
      screen: 'claimReward',
      userId: userId,
      task: reward.id?.toString()
    };

    this.authService.avengers(payload).subscribe({
      next: (res: any) => {
        if (res.statusCode === 200) {
          this.snackBar.open(res.message || 'Reward claimed successfully', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.getRewardsData();
        } else {
          this.snackBar.open(res.message || 'Failed to claim reward', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      },
      error: (err) => {
        const errorMsg = err.error?.message || 'Failed to claim reward';
        this.snackBar.open(errorMsg, 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  getFormattedParagraph(text: string): string {
    // Make numbers and USDT bold
    return text.replace(/(\d+ USDT|\d+)/g, '<b>$1</b>');
  }

  getProgressWidth(reward: any): string {
    const percentage = (reward.currentInvites / reward.requiredInvites) * 100;
    return percentage + '%';
  }
}
