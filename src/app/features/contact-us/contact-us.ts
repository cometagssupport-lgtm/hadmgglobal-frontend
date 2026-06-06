import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-contact-us',
  imports: [],
  templateUrl: './contact-us.html',
  styleUrl: './contact-us.scss',
})
export class ContactUs implements OnInit {

  constructor(
    private meta: Meta,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Contact Us - Comet AGS');

    this.meta.updateTag({
      name: 'robots',
      content: 'index,follow'
    });

    this.meta.updateTag({
      name: 'description',
      content: 'Contact Comet AGS support team.'
    });
  }
}