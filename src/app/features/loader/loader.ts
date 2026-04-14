import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Loader } from '../../services/loader';

@Component({
  selector: 'app-loader',
  imports: [CommonModule],
  template: `
    <div class="loader-overlay" *ngIf="loading$ | async">
      <img src="loadercoms.svg" alt="Loading..." class="brand-loader">
    </div>
  `,
  styleUrl: './loader.scss'
})
export class Loaders {

  loading$: any;
  constructor(public loader: Loader) {
    this.loading$ = this.loader.loading$;
  }



}
