import { Component, OnInit, ViewChild } from '@angular/core';
import { PersonalAreaServiceService } from '../personal-area-service.service';
import { TeachersAndSecretaryToSchool } from '../TeachersAndSecretaryToSchool.model';
import { MatAccordion } from '@angular/material/expansion';
import { UserService } from 'src/app/User/user.service';
import { User } from 'src/app/User/user.model';
import { Secretary } from 'src/app/User/Secretary.model';
import {Location} from '@angular/common';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  constructor(private _location: Location,private PersonalAreaService: PersonalAreaServiceService, private userService: UserService) { }
  schoolsDetails: TeachersAndSecretaryToSchool[] = [];
  @ViewChild(MatAccordion) accordion: MatAccordion;
  schoolsDetailsGroup = {};
  userEnter: User = null;
  secretaryEnter: Secretary = null;
  whoami: string;
  panelOpenState: boolean;
  displayedColumns: string[];
  schoolName: string;
  cityName: string;
  Loading = true;

  // back
  backClicked() {
    this._location.back();
  }
  
  // group by current list
  GroupBy(list, key) {
    debugger
    this.panelOpenState = false;
    return list.reduce(function (groupclasses, item) {
      (
        groupclasses[item[key]] = groupclasses[item[key]] || []).push(item);
      return groupclasses;
    }, {});
  }

  // if current user is teacher
  ifITeacher() {
    if (this.whoami == 'teacher')
      return true;
    else return false;
  }

  ngOnInit(): void {
    if (sessionStorage.getItem("stat") == 'SE') {
      this.secretaryEnter = JSON.parse(sessionStorage.getItem("CurrentUser"));
      this.whoami = "secretary";
    }
    else {
      this.userEnter = JSON.parse(sessionStorage.getItem("CurrentUser"));
      this.whoami = sessionStorage.getItem("stat") == 'T' ? "teacher" : sessionStorage.getItem("stat") == 'S' ? "student" : "another";
    }
    this.displayedColumns = ['UserName', 'UserMail'];
    this.PersonalAreaService.GetTeachersAndSecretaryToSchool().subscribe(y => {
      this.Loading = false;
      this.schoolsDetails = y;
      this.schoolsDetailsGroup = this.GroupBy(this.schoolsDetails, 'idSchool');
    })
  }
}

