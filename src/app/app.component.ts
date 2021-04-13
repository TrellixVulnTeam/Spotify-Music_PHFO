
/************************************************************************ *********
* WEB422 – Assignment 06
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part of this
* assignment has been copied manually or electronically from any other source (including web sites) or
* distributed to other students. *
* Name: Okan Atas     Student ID: 130627193      Date: April 13, 2021
* ********************************************************************************/

import { Component } from '@angular/core';
import { Router, NavigationStart, Event } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'WEB422-A6';
  searchString = '';
  public token: any;
  private subscription: any;

  constructor( private router: Router, private auth: AuthService ){}

  ngOnInit(): void {
    this.subscription = this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.token = this.auth.readToken();
      }
    })
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login'], {});
  }

  handleSearch() {
    this.router.navigate(['/search'], { queryParams: { q: this.searchString}});
    this.searchString = '';
  }
}
