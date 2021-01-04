import { Component, OnInit } from '@angular/core';
import { School } from '../School.model';
import { SchoolService } from '../school.service';
import { UserToClass } from '../user-to-class.model';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-approved-class-for-student',
  templateUrl: './approved-class-for-student.component.html',
  styleUrls: ['./approved-class-for-student.component.css']
})
export class ApprovedClassForStudentComponent implements OnInit {

  constructor(private _snackBar: MatSnackBar, private SchoolServise: SchoolService) { }
  School: School = null;
  Loading: boolean = true;
  Students = {};
  displayedColumns: string[];
  clickOn:boolean;

  /*updates all approveds for students class*/
  UpdateClasses() {
    debugger
    var classesForSet: UserToClass[] = [];
    var classesForSetSend: UserToClass[] = [];
    Object.keys(this.Students).forEach(c => {
      var classesForSet_ = this.Students[c].map(s_c => {
        if (s_c.UserClass.approved == 2) {
          s_c.UserClass.idUser = s_c.user.UserId;
          return s_c.UserClass;
        }
      });
      Array.prototype.push.apply(classesForSet, classesForSet_);
    });
    if (classesForSet.length != 0)

      classesForSet.forEach(c => {
        if (c != undefined)
          classesForSetSend.push(c);
      })

    this.SchoolServise.PutClassesToStudent(classesForSetSend).subscribe(x => {
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

  // get lenght of students list
  getLength() {
    return Object.keys(this.Students).length;
  }
  /*set toggle approv to student class*/
  SetClass(s_c: UserToClass) {
    debugger
    switch (s_c.approved) {
      case 1: s_c.approved = 2; return;
      case 2: s_c.approved = 1; return;
    }
  }

  /*group by classes*/
  GroupBy(list, key) {
    return list.reduce(function (groupStudents, item) {
      (
        groupStudents[item.UserClass[key]] = groupStudents[item.UserClass[key]] || []).push(item);
      return groupStudents;
    }, {});
  }
  ngOnInit(): void {
    debugger
    this.clickOn=false;
    this.School = JSON.parse(sessionStorage.getItem("CurrentSchool"));
    this.displayedColumns = ['name', 'mail', 'date', 'ok']
    this.SchoolServise.GetStudentsJoinClassToSet(this.School.id).subscribe(list => {
      this.Loading = false;
      this.Students = this.GroupBy(list, 'className');
    });
  }
}
