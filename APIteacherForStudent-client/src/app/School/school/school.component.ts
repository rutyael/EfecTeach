import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/User/user.service';
import { Secretary } from 'src/app/User/Secretary.model';
import { SchoolService } from '../school.service';
import { School } from '../School.model';

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.css']
})
export class SchoolComponent implements OnInit {

  constructor(private UserService: UserService, private SchoolService: SchoolService) { }
  Secretary: Secretary;
  school: School;
  Loading = true;
  ngOnInit(): void {
    
    this.Secretary = JSON.parse(sessionStorage.getItem("CurrentUser"));
    console.log(this.Secretary);
    this.SchoolService.GetSchoolByIdSecretary(this.Secretary.SecretaryId).subscribe(s => {
        sessionStorage.setItem("CurrentSchool",JSON.stringify(s));
        this.Loading=false;
    })
  }

}
