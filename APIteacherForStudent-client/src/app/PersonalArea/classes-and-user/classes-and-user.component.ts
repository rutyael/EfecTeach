import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PersonalAreaServiceService } from '../personal-area-service.service';
import { User } from 'src/app/User/user.model';
import { Secretary } from 'src/app/User/Secretary.model';
import { GetSchoolToStudent } from '../GetSchoolToStudent.model';

@Component({
  selector: 'app-classes-and-user',
  templateUrl: './classes-and-user.component.html',
  styleUrls: ['./classes-and-user.component.css']
})
export class ClassesAndUserComponent implements OnInit {

  constructor(private PersonalAreaService: PersonalAreaServiceService) { }
  panelOpenState: boolean;
  userEnter: User = null;
  secretaryEnter: Secretary = null;
  whoami: string;
  displayedColumns: string[];
  displayedColumns2: string[];
  classesAndUsers = {};
  schoolToStudent: GetSchoolToStudent;
  arrGroup = {};
  Loading = true;
  className: string;
  @Output() schoolStudent = new EventEmitter();
  @Output() classStudent = new EventEmitter();


  // group by current list
  GroupBy(list, key) {
    return list.reduce(function (groupclasses, item) {
      (
        groupclasses[item[key]] = groupclasses[item[key]] || []).push(item);
      return groupclasses;
    }, {});
  }

  // is current property is NaN
  ifNaN(level: any) {
    if (isNaN(level))
      return "אין מידע";
    else return level;
  }

  // get user id
  GetUserId() {
    if (this.userEnter != null)
      return this.userEnter.UserId;
    else return this.secretaryEnter.SecretaryId;
  }

  // group by classes
  GroupByClasses(key: number) {
    this.arrGroup = this.GroupBy(this.classesAndUsers[key], 'idClass');
  }

  // return current school name
  ReturnSchoolName(school) {
    return (school.value[Object.keys(school.value)[0]])[0].SchoolName;
  }

  // return current class name
  ReturnClassName(ClassName: string) {
    console.log(ClassName);
    this.className = ClassName;
    return ClassName;
  }

  ngOnInit(): void {
    this.panelOpenState = false;
    this.displayedColumns = ['studentName', 'studentNail', 'studentLevel'];
    this.displayedColumns2 = ['studentName'];
    if (sessionStorage.getItem("stat") == 'SE') {
      this.secretaryEnter = JSON.parse(sessionStorage.getItem("CurrentUser"));
      this.whoami = "secretary";
    }
    else {
      this.userEnter = JSON.parse(sessionStorage.getItem("CurrentUser"));
      this.whoami = sessionStorage.getItem("stat") == 'T' ? "teacher" : sessionStorage.getItem("stat") == 'S' ? "student" : "other";
    }
    if (this.userEnter != null && sessionStorage.getItem("stat") == 'T') {
      this.PersonalAreaService.ClassesAndUsersToUser(this.GetUserId()).subscribe(x => {
        this.classesAndUsers = this.GroupBy(x, 'idSchool');
        Object.keys(this.classesAndUsers).forEach(k => {
          var x = this.classesAndUsers[k];
          this.classesAndUsers[k] = {};
          this.classesAndUsers[k] = Object.assign(this.classesAndUsers[k], this.GroupBy(x, 'idClass'));
        });
        console.log(this.classesAndUsers);
      })
    }
    if (this.userEnter != null && sessionStorage.getItem("stat") == 'S') {
      this.PersonalAreaService.GetSchoolToStudent(this.userEnter.UserId).subscribe(x => {
        console.log(x);
        this.schoolToStudent = x;
        this.schoolStudent.emit(this.schoolToStudent.SchoolName)
        this.classStudent.emit(this.schoolToStudent.className)
        this.Loading = false;
      })
    }


  }

}
