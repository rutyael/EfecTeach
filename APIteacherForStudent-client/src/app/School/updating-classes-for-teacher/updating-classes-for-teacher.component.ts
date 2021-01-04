import { Component, OnInit, Input } from '@angular/core';
import { SchoolService } from '../school.service';
import { ActivatedRoute } from '@angular/router';
import { UserJoinClassesToSet } from '../UserJoinClassesToSet.model';
import { User } from 'src/app/User/user.model';
import { classToSchool } from '../classToSchool.model';
import { UserToClass } from 'src/app/School/user-to-class.model';
import { School } from '../School.model';
import { KeyValuePipe } from '@angular/common';
import { retryWhen } from 'rxjs/operators';
import { strict } from 'assert';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-updating-classes-for-teacher',
  templateUrl: './updating-classes-for-teacher.component.html',
  styleUrls: ['./updating-classes-for-teacher.component.css']
})
export class UpdatingClassesForUserComponent implements OnInit {
  teachers = {};
  displayedColumns: string[];
  school: School;
  Loading: boolean = true;
  clickOn: boolean;
  constructor(private _snackBar: MatSnackBar, private SchoolServise: SchoolService, private router: ActivatedRoute) { }

  // get status action
  GetStatus(status: number) {
    return status == 1 || status == 2 ? 'הוסף' : 'הסר';
  }
  // group list by classes
  GroupBy(list, key) {
    return list.reduce(function (groupTeachers, item) {
      (
        groupTeachers[item.UserClass[key]] = groupTeachers[item.UserClass[key]] || []).push(item);
      return groupTeachers;
    }, {});
  }
  // set checking class
  SetClass(t_c: UserToClass) {
    debugger
    switch (t_c.approved) {
      case 1: t_c.approved = 2; return;
      case 2: t_c.approved = 1; return;
      case 3: t_c.approved = 4; return;
      case 4: t_c.approved = 3; return;
    }
  }
  // get length of teacher list
  getLength() {
    return Object.keys(this.teachers).length
  }

  // update teacher classes
  UpdateClasses() {
    debugger
    var classesForSet: UserToClass[] = [];
    var classesForSetSend: UserToClass[] = [];
    Object.keys(this.teachers).forEach(c => {
      var classesForSet_ = this.teachers[c].map(t_c => {
        debugger
        if (t_c.UserClass.approved == 2 || t_c.UserClass.approved == 3) {
          t_c.UserClass.idUser = t_c.user.UserId;
          return t_c.UserClass;
        }
      });
      Array.prototype.push.apply(classesForSet, classesForSet_);
    });

    classesForSet.forEach(c => {
      if (c != undefined)
        classesForSetSend.push(c);
    })
    this.SchoolServise.PutClassesToTeacher(classesForSetSend).subscribe(x => {
      debugger
      if (x == true) {
        this._snackBar.open("הפעולה התבצעה בהצלחה", "", {
          duration: 4000,
        });
        this.clickOn=true;
      }

      else {
        this._snackBar.open("הפעולה נכשלה, אנא נסה שוב", "", {
          duration: 4000,
        });
      }
    });
  }
  ngOnInit(): void {
    this.school = JSON.parse(sessionStorage.getItem("CurrentSchool"));
    this.displayedColumns = ['name', 'mail', 'date', 'status', 'ok']
    this.SchoolServise.GetTeachersJoinClassesToSet(this.school.id).subscribe(list => {
      this.Loading = false;
      this.teachers = this.GroupBy(list, 'className');
    });
    this.clickOn = false;
  }
}
