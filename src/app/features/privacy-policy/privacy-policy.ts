import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-privacy-policy',
  imports: [],
  templateUrl: './privacy-policy.html',
  styleUrl: './privacy-policy.scss',
})
export class PrivacyPolicy implements OnInit {

  constructor(
    private meta: Meta,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Privacy Policy - Comet AGS');

    this.meta.updateTag({
      name: 'robots',
      content: 'index,follow'
    });

    this.meta.updateTag({
      name: 'description',
      content: 'Privacy Policy for Comet AGS platform.'
    });
  }
}