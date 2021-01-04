import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common';


@Component({
  selector: 'app-login-guest',
  templateUrl: './login-guest.component.html',
  styleUrls: ['./login-guest.component.css']
})
export class LoginGuestComponent implements OnInit {

  constructor(private _location: Location,private route: Router) { }
  arrivedFrom: string;

  // back
  backClicked() {
    this._location.back();
  }

  ngOnInit(): void {
    if (this.route.url.includes('PersonalArea'))
      this.arrivedFrom = "PersonalArea";
    if (this.route.url.includes('AddQuestion'))
      this.arrivedFrom = "AddQuestion";
    if (this.route.url.includes('addComment'))
      this.arrivedFrom = "addComment";
    if (this.route.url.includes('addAnswer'))
      this.arrivedFrom = "addAnswer";
  }

}
