import { Component, OnInit } from '@angular/core';
import { UserService } from '../../User/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/User/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  log:string;
  userEnter:User;
  constructor(private userService:UserService,private router: Router) { }
  
  IfDisplayMenu():Boolean{
    if (this.router.url == "/signIn"||this.router.url == "/signUp"||this.router.url == "/")
    return false;
    else
    return true;
  }
  IsUserSecretary():Boolean{
    if(this.router.url=="/DetailsSecretary")
    return true;
    else return false;
  }
  IsUserTeacher():Boolean{
    if(this.router.url=="/questions")
    return true;
    else return false;
  }
  Exit(){
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    this.userService.userEnter.subscribe(x=>{
      console.log(x);
      this.userEnter=x;
    });
  }

}
