import { Component, OnInit } from '@angular/core';
import { UserService } from '../../User/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  log:string;
  user:string=null;
  constructor(private userService:UserService,private router: Router) { }
  IfDisplayMenu():Boolean{
    if (this.router.url == "/signIn"||this.router.url == "/signUp"||this.router.url == "/")
    return false;
    else
    return true;
  }
  Exit(){
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
// if(this.userSer.user!=null)
// this.user=this.userSer.user
  }

}
