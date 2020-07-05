import { Component, OnInit } from '@angular/core';
import { UserService } from '../../User/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  log:string;
  user:string=null;
  constructor(private userService:UserService) { }

  ngOnInit(): void {
// if(this.userSer.user!=null)
// this.user=this.userSer.user
  }

}
