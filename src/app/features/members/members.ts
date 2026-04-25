import {
  Component,
  OnInit,
  Inject,
  PLATFORM_ID,
  NgZone,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TopNav } from '../top-nav/top-nav';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TranslatePipe } from '../../pipes/translate-pipe';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

interface Member {
  userName?: string;
  name?: string;
  email: string;
  timestamp: string;
  balance: number;
  UID: string; // Used as UID
  profilePic?: number;
}

@Component({
  selector: 'app-members',
  imports: [CommonModule, RouterModule, FormsModule, TopNav, TranslatePipe, MatSnackBarModule],
  templateUrl: './members.html',
  styleUrl: './members.scss'
})
export class Members implements OnInit {
  members: Member[] = [];
  filteredMembers: Member[] = [];
  level = 1;

  get totalCommission(): number {
    return this.filteredMembers.reduce((sum, member) => sum + (Number(member.balance) || 0), 0);
  }

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private ngZone = inject(NgZone);
  private cdr = inject(ChangeDetectorRef);
  private snackBar = inject(MatSnackBar);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    // 🔹 Extract level from query params
    this.route.queryParams.subscribe((params) => {
      this.level = params['level'] ? Number(params['level']) : 1;
      console.log('📘 Selected Level:', this.level);
      this.loadData();
    });
  }

  switchLevel(newLevel: number) {
    this.level = newLevel;
    this.loadData();
  }

  loadData() {
    if (isPlatformBrowser(this.platformId)) {
      const userId = localStorage.getItem('userId');
      if (userId) {
        this.fetchMembers(userId, this.level);
      } else {
        console.error('❌ No userId found in localStorage');
        this.members = [];
        this.filteredMembers = [];
      }
    }
  }



  // 🔹 Fetch Members via Avengers API
  fetchMembers(userId: string, level: number) {
    let screen = '';
    switch (level) {
      case 1: screen = 'genOne'; break;
      case 2: screen = 'genTwo'; break;
      case 3: screen = 'genThree'; break;
      case 4: screen = 'genFour'; break;
      case 5: screen = 'genFive'; break;
      default: screen = 'genOne';
    }

    const payload = { screen, userId: userId };

    this.authService.avengers(payload).subscribe({
      next: (res) => {
        if (res.statusCode === 200 && res.data?.memberDetails) {
          this.ngZone.run(() => {
            this.members = res.data.memberDetails;
            this.filteredMembers = [...this.members];
            this.cdr.detectChanges();
          });
        } else {
          this.members = [];
          this.filteredMembers = [];
        }
      },
      error: (err) => {
        console.error('❌ Failed to fetch members:', err);
        this.members = [];
        this.filteredMembers = [];
      }
    });
  }

  filterMembers() {
    // Search removed as per requirements; passing through all members
    this.filteredMembers = [...this.members];
  }

  maskEmail(email: string): string {
    const parts = email.split('@');
    if (parts.length < 2) return email;
    const user = parts[0];
    const domain = parts[1];
    return user.slice(0, 3) + '*'.repeat(Math.max(3, user.length - 3)) + '@' + domain;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  goBack() {
    this.router.navigate(['/team']);
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
