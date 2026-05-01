import { Component, inject, Input, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';

import { Language } from '../../services/language';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-top-nav',
  imports: [MatFormFieldModule,MatInputModule,MatButtonModule,MatSelectModule,MatMenuModule,CommonModule,RouterModule],
  templateUrl: './top-nav.html',
  styleUrl: './top-nav.scss'
})
export class TopNav {
  @Input() isTransparent = false;
  @Input() isWhite = false;

  langService = inject(Language);
  authService = inject(AuthService);

  get languages() {
    return this.langService.languages;
  }

  get selectedLang() {
    return this.langService.currentLanguage();
  }

  onLanguageChange(lang: {label: string, code: string}) {
    this.langService.setLanguage(lang);
  }

  onNativeLangChange(event: any) {
    this.langService.setLanguage(event.target.value);
  }

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  openSupport() {
    this.authService.getMasterData().subscribe({
      next: (res) => {
        if (res.statusCode === 200 && res.data && res.data.length > 0) {
          const adminData = res.data[0];
          if (adminData.telegramLinkTwo) {
            if (isPlatformBrowser(this.platformId)) {
              window.open(adminData.telegramLinkTwo, '_blank');
            }
          }
        }
      },
      error: (err) => {
        console.error('Error fetching admin data:', err);
      }
    });
  }

}
