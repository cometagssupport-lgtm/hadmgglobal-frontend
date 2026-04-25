import { Component, OnInit, inject, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

interface Transaction {
  type: string;
  amount: string;
  timestamp: string;
  senderEmail?: string;
  discription?: string;
  adminReward?: boolean;
}

@Component({
  selector: 'app-transaction-history',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './transaction-history.html',
  styleUrl: './transaction-history.scss'
})
export class TransactionHistory implements OnInit {
  activeTab: 'withdraw' | 'deposit' | 'bonus' | 'income' = 'withdraw';
  private authService = inject(AuthService);
  private platformId = inject(PLATFORM_ID);
  
  allTransactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.fetchHistory();
    }
  }

  fetchHistory() {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    this.authService.avengers({ screen: 'history', userId }).subscribe({
      next: (res) => {
        if (res.statusCode === 200 && res.data?.transactions) {
          this.allTransactions = res.data.transactions;
          this.filterTransactions();
        }
      },
      error: (err) => console.error('Error fetching history:', err)
    });
  }

  setActiveTab(tab: 'withdraw' | 'deposit' | 'bonus' | 'income') {
    this.activeTab = tab;
    this.filterTransactions();
  }

  filterTransactions() {
    this.filteredTransactions = this.allTransactions.filter(t => {
      if (this.activeTab === 'withdraw') return t.type === 'withdraw';
      if (this.activeTab === 'deposit') return t.type === 'deposit';
      if (this.activeTab === 'bonus') return t.type === 'reward' && t.adminReward === true;
      if (this.activeTab === 'income') return t.type === 'reward' && !t.adminReward;
      return false;
    });
  }

  formatDate(dateStr: string) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  getTitle(item: Transaction) {
    if (this.activeTab === 'bonus') return item.discription || 'Bonus Reward';
    if (this.activeTab === 'income') return item.discription || 'Daily Income';
    if (this.activeTab === 'withdraw') return 'Withdraw';
    if (this.activeTab === 'deposit') return 'Deposit';
    return item.type;
  }

  goBack() {
    this.router.navigate(['/profile']);
  }
}
