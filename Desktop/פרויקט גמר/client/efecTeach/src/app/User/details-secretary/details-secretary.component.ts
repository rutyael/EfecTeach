import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-details-secretary',
  templateUrl: './details-secretary.component.html',
  styleUrls: ['./details-secretary.component.css']
})
export class DetailsSecretaryComponent implements OnInit {
  UserNameEnter:string;
  UserPasswordEnter:string;


  constructor(private userService: UserService,private http:HttpClient) { }

  ngOnInit(): void {

    // this.userService.SignIn(this.UserNameEnter,this.UserPasswordEnter ).subscribe(x=>{
        
    // })
  }

}
