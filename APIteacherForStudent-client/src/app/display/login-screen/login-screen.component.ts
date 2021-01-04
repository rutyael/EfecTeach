import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css'],

})
export class LoginScreenComponent implements OnInit {

  constructor(private router: Router) { }
  changeOver1: boolean;
  changeOver2: boolean;
  changeOver3: boolean;
  changeOver4: boolean;
  loadAPI: Promise<any>;

  // go to the login
  GetLogin(){
    this.router.navigate(["signIn"]);
  }
  // go to the register
  GetRegister(){
    this.router.navigate(["signUp"]);
  }

  ngOnInit(): void {
    this.changeOver1 = false;
    this.changeOver2 = false;
    this.changeOver3 = false;
    this.changeOver4 = false;
  }

}
