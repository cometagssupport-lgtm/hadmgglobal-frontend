import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { TopNav } from '../top-nav/top-nav';
import { TranslatePipe } from '../../pipes/translate-pipe';

@Component({
  selector: 'app-tandc',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule, TopNav, TranslatePipe],
  templateUrl: './tandc.html',
  styleUrl: './tandc.scss'
})
export class Tandc implements OnInit {
  lastUpdated = '01-03-2026';

  constructor(private router: Router) { }

  ngOnInit() {
    console.log('Terms and Conditions Page Loaded');
  }

  goBack() {
    this.router.navigate(['/profile']);
  }
}
