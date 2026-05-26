import { Component, inject } from '@angular/core';
import { TranslatePipe } from '../../pipes/translate-pipe';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TopNav } from '../top-nav/top-nav';

@Component({
  selector: 'app-rewards-success',
  standalone: true,
  imports: [CommonModule, TopNav, TranslatePipe],
  templateUrl: './rewards-success.html',
  styleUrl: './rewards-success.scss'
})
export class RewardsSuccess {
  private router = inject(Router);

  goBack() {
    this.router.navigate(['/rewards']);
  }
}
