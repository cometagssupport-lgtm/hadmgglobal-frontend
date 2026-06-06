import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-terms-conditions',
  imports: [],
  templateUrl: './terms-conditions.html',
  styleUrl: './terms-conditions.scss',
})
export class TermsConditions implements OnInit {

  constructor(
    private meta: Meta,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Terms & Conditions - Comet AGS');

    this.meta.updateTag({
      name: 'robots',
      content: 'index,follow'
    });

    this.meta.updateTag({
      name: 'description',
      content: 'Terms and Conditions for using Comet AGS.'
    });
  }
}