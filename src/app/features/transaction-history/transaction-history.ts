import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

interface Transaction {
  type: 'withdraw' | 'deposit' | 'bonus' | 'income';
  title: string;
  amount: number;
  currency: string;
  timestamp: string;
  status: string;
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
  
  allTransactions: Transaction[] = [
    { type: 'withdraw', title: 'Withdraw', amount: 899, currency: 'USDT', timestamp: '10-01-2024 - 07:01:12', status: 'Completed' },
    { type: 'withdraw', title: 'Withdraw', amount: 899, currency: 'USDT', timestamp: '10-01-2024 - 07:01:12', status: 'Completed' },
    { type: 'withdraw', title: 'Withdraw', amount: 899, currency: 'USDT', timestamp: '10-01-2024 - 07:01:12', status: 'Completed' },
    { type: 'withdraw', title: 'Withdraw', amount: 899, currency: 'USDT', timestamp: '10-01-2024 - 07:01:12', status: 'Completed' },
    { type: 'deposit', title: 'Deposit', amount: 1500, currency: 'USDT', timestamp: '11-01-2024 - 10:15:45', status: 'Completed' },
    { type: 'bonus', title: 'Reward Bonus', amount: 50, currency: 'USDT', timestamp: '12-01-2024 - 14:20:10', status: 'Completed' },
    { type: 'income', title: 'Daily Income', amount: 120, currency: 'USDT', timestamp: '13-01-2024 - 09:05:30', status: 'Completed' },
  ];

  filteredTransactions: Transaction[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.filterTransactions();
  }

  setActiveTab(tab: 'withdraw' | 'deposit' | 'bonus' | 'income') {
    this.activeTab = tab;
    this.filterTransactions();
  }

  filterTransactions() {
    this.filteredTransactions = this.allTransactions.filter(t => t.type === this.activeTab);
  }

  goBack() {
    this.router.navigate(['/profile']);
  }
}
