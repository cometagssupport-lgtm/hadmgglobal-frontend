import { Component, OnInit, ChangeDetectorRef, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TranslatePipe } from '../../pipes/translate-pipe';
@Component({
  selector: 'app-team',
  imports: [CommonModule, TranslatePipe, RouterModule],
  templateUrl: './team.html',
  styleUrl: './team.scss'
})
export class Team implements OnInit {
  userName = '';
  data: any = {
    totalTeams: 0,
    totalValidMembers: 0,
    totalPromationComission: 0,
    firstLevelBonus: 0,
    teamRecharge: 0,
    teamWitdrawls: 0
  };
  levels: any[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) { }


  ngOnInit() {
    this.loadMockData(); // Instantly load mock data for UI preview

    // Attempt to fetch real API Response
    if (isPlatformBrowser(this.platformId)) {
      const userId = localStorage.getItem('userId');
      if (userId) this.fetchTeamData(userId);
    }
  }

  loadMockData(response?: any) {
    // 🔹 Injecting TEST DATA explicitly for UI preview as requested
    const data = {
      username: response?.data?.username || "Dev User",
      totalDownlines: response?.data?.totalDownlines || 0,
      totalValidMembers: response?.data?.validMembers || 0,
      totalPromationComission: response?.data?.totalPromationComission || 0,
      firstLevelBonus: response?.data?.genOne?.commission || 0,
      teamRecharge: response?.data?.teamRecharge || 0,
      teamWitdrawls: response?.data?.teamWitdrawls || 0,

      genOne: response?.data?.genOne || { commission: 0, reffered: 0, valid: 0, teamRecharge: 0 },
      genTwo: response?.data?.genTwo || { commission: 0, reffered: 0, valid: 0, teamRecharge: 0 },
      genThree: response?.data?.genThree || { commission: 0, reffered: 0, valid: 0, teamRecharge: 0 },
      genFour: response?.data?.genFour || { commission: 0, reffered: 0, valid: 0, teamRecharge: 0 },
      genFive: response?.data?.genFive || { commission: 0, reffered: 0, valid: 0, teamRecharge: 0 }
    };

    this.data = {
      totalTeams: data.totalDownlines || 0,
      totalValidMembers: data.totalValidMembers || 0,
      totalPromationComission: data.totalPromationComission || 0,
      firstLevelBonus: response?.data?.genOne?.commission || 0,
      teamRecharge: data.teamRecharge || 0,
      teamWitdrawls: data.teamWitdrawls || 0
    };
    this.userName = data.username;

    this.levels = [
      {
        id: 1,
        title: "Layer 1 Team Members",
        commission: data.genOne?.commission || 0,
        register: data.genOne?.reffered || 0,
        valid: data.genOne?.valid || 0,
        revenue: data.genOne?.teamRecharge || 0
      },
      {
        id: 2,
        title: "Layer 2 Team Members",
        commission: data.genTwo?.commission || 0,
        register: data.genTwo?.reffered || 0,
        valid: data.genTwo?.valid || 0,
        revenue: data.genTwo?.teamRecharge || 0
      },
      {
        id: 3,
        title: "Layer 3 Team Members",
        commission: data.genThree?.commission || 0,
        register: data.genThree?.reffered || 0,
        valid: data.genThree?.valid || 0,
        revenue: data.genThree?.teamRecharge || 0
      },
      {
        id: 4,
        title: "Layer 4 Team Members",
        commission: data.genFour?.commission || 0,
        register: data.genFour?.reffered || 0,
        valid: data.genFour?.valid || 0,
        revenue: data.genFour?.teamRecharge || 0
      },
      {
        id: 5,
        title: "Layer 5 Team Members",
        commission: data.genFive?.commission || 0,
        register: data.genFive?.reffered || 0,
        valid: data.genFive?.valid || 0,
        revenue: data.genFive?.teamRecharge || 0
      }
    ];

    // ✅ Force UI update
    this.cdr.detectChanges();
  }

  fetchTeamData(userId: string) {
    this.isLoading = true;
    const payload = {
      screen: 'teams',
      userId: userId
    };

    this.authService.avengers(payload).subscribe({
      next: (response) => {
        console.log('✅ Team API response:', response);
        this.isLoading = false;

        // If response is successful, update with actual data keeping mock fallbacks
        if (response.statusCode === 200 && response.data) {
          this.loadMockData(response);
        }
      },
      error: (err) => {
        console.error('❌ Failed to fetch Team data:', err);
        this.isLoading = false;
        this.errorMessage = 'Failed to load team data.';
        // We already have mock data loaded, no need to overwrite
      }
    });
  }

  openMembers(level: number) {
    console.log('🔹 Navigating to members of level', level);
    this.router.navigate(['/members'], { queryParams: { level } });
  }

}
