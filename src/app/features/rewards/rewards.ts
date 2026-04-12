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
import { AuthService } from '../../services/auth.service';
import { TranslatePipe } from '../../pipes/translate-pipe';

@Component({
  selector: 'app-rewards',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, FlexLayoutModule],
  templateUrl: './rewards.html',
  styleUrl: './rewards.scss'
})
export class Rewards implements OnInit {

  private authService = inject(AuthService);
  private ngZone = inject(NgZone);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);

  totalTickets = '00/06';
  totalRewardsClaimedAmount = '00';
  validInvites = 0;
  claimedRideLevel2 = false;

  rewardsList = [
    {
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
      header: 'Ticket To Ride 4',
      paragraph: 'Successfully inviting 50 direct subordinates to recharge 30 USDT to get a 100 USDT reward.',
      requiredInvites: 50,
      currentInvites: 0,
      rewardAmount: 100,
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
      const userId = localStorage.getItem('userId');
      if (userId) {
        this.getRewardsData(userId);
      } else {
        console.error('❌ No userId found in localStorage');
      }
    }
  }

  getRewardsData(userId: string) {
    const payload = {
      screen: 'rewards',
      userId: userId,
    };

    this.authService.avengers(payload).subscribe({
      next: (res) => {
        if (res.statusCode === 200 && res.data) {
          const data = res.data;
          this.ngZone.run(() => {
            this.totalTickets = data.totalTickets || '00/06';
            this.totalRewardsClaimedAmount = data.totalRewardsClaimedAmount || '00';
            this.validInvites = data.validInvites || 0;
            this.claimedRideLevel2 = data.claimedRideLevel2 || false;

            // Map and update rewardsList based on validInvites and claim status from API if available
            // For now, updating based on local validInvites
            this.updateRewardsList(data);
            this.cdr.detectChanges();
          });
        }
      },
      error: (err) => {
        console.error('❌ Failed to fetch rewards data:', err);
      }
    });
  }

  updateRewardsList(data: any) {
    this.rewardsList = this.rewardsList.map((reward, index) => {
      // Assuming API might return an array of claimed rewards or individual status
      // For demonstration, we'll use validInvites to determine if "Claim Now" is available
      const isClaimedFromApi = data.claimedRewards ? data.claimedRewards.includes(reward.header) : false;

      const current = data.validInvites || 0;
      const isValidToClaim = current >= reward.requiredInvites && !isClaimedFromApi;

      return {
        ...reward,
        currentInvites: current > reward.requiredInvites ? reward.requiredInvites : current,
        isClaimed: isClaimedFromApi,
        isValid: isValidToClaim,
        buttonName: isClaimedFromApi ? 'Claimed' : (isValidToClaim ? 'Claim Now' : 'Claim Now')
      };
    });
  }

  claimReward(reward: any) {
    if (!reward.isValid || reward.isClaimed) return;

    const userId = localStorage.getItem('userId');
    const payload = {
      screen: 'claimReward',
      userId: userId,
      rewardId: reward.header // or some other ID
    };

    this.authService.avengers(payload).subscribe({
      next: (res) => {
        if (res.statusCode === 200) {
          reward.isClaimed = true;
          reward.isValid = false;
          reward.buttonName = 'Claimed';
          this.totalRewardsClaimedAmount = (Number(this.totalRewardsClaimedAmount) + reward.rewardAmount).toString();
          this.cdr.detectChanges();
        }
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
