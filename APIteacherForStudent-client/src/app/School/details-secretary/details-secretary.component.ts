import { Component, OnInit, Input } from '@angular/core';
import { SchoolService } from '../../School/school.service';
import { User } from '../../User/user.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { classToSchool } from '../classToSchool.model';
import { City } from '../../User/City.model';
import { School } from '../School.model';
import { UserService } from '../../User/user.service'
import { Router } from '@angular/router';
import { Secretary } from '../../User/Secretary.model';
import { ApdateSchool } from '../ApdateSchool.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CssSelector } from '@angular/compiler';
import { JsonPipe } from '@angular/common';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { ProffestionService } from 'src/app/Proffestion/proffestion.service';
import { Proffestion } from 'src/app/Proffestion/proffestion.model';
import { AddProffestionComponent } from 'src/app/Proffestion/add-proffestion/add-proffestion.component';
import { exists } from 'fs';

export class TodoItemNode {
  children: TodoItemNode[];
  item: string;
}

export class TodoItemFlatNode {
  item: string;
  level: number;
  expandable: boolean;
}

@Component({
  selector: 'app-details-secretary',
  templateUrl: './details-secretary.component.html',
  styleUrls: ['./details-secretary.component.css'],

})
export class DetailsSecretaryComponent implements OnInit {
  Profestions = [];
  classesToSchool: classToSchool[] = [];
  newClassArr: any[] = [];
  deleteClasses: any[] = [];
  newUpdateClassesToSchool: any[] = [];
  newClassesToSchool: any[] = [];
  addClasses: any[] = [];
  UpdateClassesToSchool: classToSchool[] = [];
  OriginalClassesToSchool: classToSchool[] = [];
  newSchool: School = new School(0, "", 0, 0, "", 0, []);
  SelectSchool: School = new School(0, "", 0, 0, "", 0, []);
  ifCommentClass: boolean = false;
  ifCommentSchool: boolean = false;
  ClassName: string = null;
  commentValue: string;
  Cities: City[] = [];
  CityId: number;
  NameOfSchool: string = null;
  NumOfSchool: number = null;
  ClassComment: string;
  ClassAdd: classToSchool;
  IfListClass: boolean = false;
  errorSchoolUnique: string = "";
  errorClassUnique: string = "";
  f: boolean;
  fErrorSchool: boolean;
  SecretaryEnter: Secretary;
  SchoolBySecretary: School;
  CurrentComment: string;
  schoolComment: string = "";
  SCHOOLISVALID: boolean = false;
  CLASSISVALID: boolean = false;
  Loading: boolean = true;
  disabled = false;
  CurrentClass: number;
  ifDisabledFinish: boolean;
  ifDisabledFinishPost: boolean;
  Edit = { stat: false, value: null };
  constructor(private schoolService: SchoolService, private http: HttpClient, private UserService: UserService, private router: Router,
    private dialog: MatDialog, private ProffestionService: ProffestionService,
  ) { }

// const deliting button current class was exists in school
  IsConst(cl) {
    var c = this.OriginalClassesToSchool.filter(c => c.id == cl.id).length > 0;
    return c;
  }

  // if school form is valid
  SchoolFormIsValid(field: string) {
    debugger
    switch (field) {
      case 'c_name': return this.CLASSISVALID = !(this.ClassName == null ||
        this.ClassName == "");
      case 'all': return this.SCHOOLISVALID = !(this.NameOfSchool == null ||
        this.NameOfSchool == "" ||
        this.NumOfSchool == null ||
        this.NumOfSchool == undefined ||
        this.CityId == null);
    }
  }

// get msg when teacher dont coent to class
  ProMsg() {
    var template = 'לא ניתן להוסיף כיתה ללא שפות';
    this.dialog.open(DialogComponent, { data: { template: template, actions: [true, false] } });
  }
  // plus class 
  plusClass() {
    if (this.SchoolFormIsValid('c_name') == false) return;
    if (this.Edit.stat == true) {
      var c = this.IsConst(this.Edit.value) ? this.UpdateClassesToSchool.find(c => c.id == this.CurrentClass) : this.classesToSchool.find(c => c.id == this.CurrentClass);
      c.Proffestions = this.Profestions.filter(p => p.checked).map(p => { return { ProffestionName: p.name, ProffestionId: p.id } });
      if (c.Proffestions.length == 0) {
        this.ProMsg();
        return;
      }
      c.className = this.ClassName;
      c.comment = this.ClassComment;
      this.AddNewClass();
      return;
    }
    if (!this.fErrorSchool) {
      this.f = false;
      this.errorClassUnique = "";
      this.IfListClass = true;
      if (this.router.url.includes("/RegistrationDetailsSecretary")) {
        debugger
        var cpros = this.Profestions.filter(p => p.checked).map(p => { return { ProffestionName: p.name, ProffestionId: p.id } });
        if (cpros.length == 0) {
          this.ProMsg();
          return;
        }
        var newClass: classToSchool = new classToSchool(0, this.SelectSchool.id, this.ClassName, this.commentValue, null, cpros);
        this.classesToSchool.forEach(x => {
          if (x.className == newClass.className) {
            this.errorClassUnique = "כיתה זו נמצאת כבר במערכת";
            this.f = true;
          }
        });
        if (!this.f) {
          this.classesToSchool.push(newClass);
          this.AddNewClass();
        }

      }
      if (this.router.url.includes("/UpdateDetailsSecretary")) {
        var cpros = this.Profestions.filter(p => p.checked).map(p => { return { ProffestionName: p.name, ProffestionId: p.id } });
        if (cpros.length == 0) {
          this.ProMsg();
          return;
        }
        var newClass: classToSchool = new classToSchool(0, this.SchoolBySecretary.id, this.ClassName, this.commentValue, null, cpros);
        this.UpdateClassesToSchool.forEach(x => {
          if (x.className == newClass.className) {
            this.errorClassUnique = "כיתה זו נמצאת כבר במערכת";
            this.f = true;
          }
        });
        if (!this.f) {
          this.UpdateClassesToSchool.push(newClass);
          this.OriginalClassesToSchool = this.OriginalClassesToSchool.filter(x => x != newClass);
          this.addClasses.push(newClass);
          this.AddNewClass();
        }
      }
    }
    this.commentValue = "";
    this.ifCommentClass = false;
  }
  IfCommentSchool() {
    this.ifCommentClass = true;
  }
  IfCommentClass() {
    this.ifCommentClass = true;
  }
  // if is apdate using or register 
  UpdateSecretary() {
    return this.router.url.includes("UpdateDetailsSecretary");
  }
  // submit school send to appropriate function
  SubmitSchool() {
    this.UpdateSecretary() ? this.UpdateSchool() : this.postSchool();
  }
  // post school
  postSchool() {
    this.fErrorSchool = false;
    this.errorSchoolUnique = "";
    this.errorClassUnique = "";
    this.ClassComment = "";
    this.ClassName = "";
    this.IfListClass = false;
    this.newSchool.IdCity = this.CityId;
    this.newSchool.SchoolName = this.NameOfSchool;
    this.newSchool.comment = this.schoolComment;
    this.newSchool.idSchool = this.NumOfSchool;
    this.newSchool.IdSecretary = this.SecretaryEnter.SecretaryId;
    this.newSchool.ClassesToSchool = this.classesToSchool;
    console.log(this.newSchool);
    this.schoolService.PostSchool(<School>this.newSchool).subscribe(x => {
      debugger
      if (x != null) {
        this.SelectSchool = x;
        sessionStorage.setItem("CurrentSchool", JSON.stringify(x));
        this.ifDisabledFinishPost = true;
        var template = 'פעולת ההוספה הסתיימה בהצלחה';
        this.ShowSubmitMsg(template);
      }
      if (x == null) {
        this.fErrorSchool = true;
        // this.errorSchoolUnique = err.error.Message;
        var template = 'פעולת ההוספה נכשלה, לפרטים פנה למנהל המערכת';
        this.ShowSubmitMsg(template);
      }
    });
    this.CityId = null;
    this.commentValue = null;
    this.classesToSchool.length = 0;
  }
  // after pro checkingset check field
  SeProtChecked(id) {
    var pro = this.Profestions.find(p => p.id == id);
    pro.checked = !pro.checked;
  }
  // clear of all selected proffestions
  ClearAllPro() {
    debugger
    this.Profestions = this.Profestions.map(p => { p.checked = false; return p });
  }
  // edit details class
  EditClass(cl) {
    debugger
    this.Edit.stat = true;
    this.Edit.value = cl;
    this.CurrentClass = cl.id;
    this.ClassName = cl.className;
    this.commentValue = cl.comment;
    this.disabled = this.IsConst(cl);
    this.Profestions = this.Profestions.map(p => { p.checked = cl.Proffestions.find(pcl => pcl.ProffestionId == p.id) != undefined; return p });
  }
  // add new class
  AddNewClass() {
    this.Edit.stat = false;
    this.disabled = false;
    this.ClassName = null;
    this.ClassComment = null;
  }

  CityIdSelect(id: number) {
    this.CityId = id;
  }
  // delete class added
  deleteItem(ClassSelect: any) {
    debugger
    if (this.router.url.includes("RegistrationDetailsSecretary")) {
      this.newClassArr = this.classesToSchool.filter(x => x != ClassSelect);
      this.classesToSchool = this.newClassArr;
    }
    if (this.router.url.includes("UpdateDetailsSecretary")) {
      this.newClassArr = this.UpdateClassesToSchool.filter(x => x != ClassSelect);
      this.UpdateClassesToSchool = this.newClassArr;
    }
  }
  // add proffestion
  AddPro() {
    const dialogRef = this.dialog.open(AddProffestionComponent);
    dialogRef.afterClosed().subscribe(res => {
      if (res.data != false)
        this.ProffestionService.AddProffestion(new Proffestion(null, res.data)).subscribe(pro => {
          var template = '';
          if (pro == null) {
            template = 'הינך מנסה להוסיף שפה שכבר קיימת במערכת'
          }
          else {
            this.Profestions.push({
              id: pro.ProffestionId,
              name: pro.ProffestionName,
              checked: false
            });
            template = `הפעולה התבצעה בהצלחה, ${pro.ProffestionName} מעתה יהיה חלק משפות המערכת`
          }
          this.dialog.open(DialogComponent, { data: { template: template, actions: [true, false] } })
        });

    })
  }
  // submit school
  Submit() {
    if (!this.UpdateSecretary() && this.SchoolFormIsValid('all') == false) return;
    if (!this.UpdateSecretary() && this.classesToSchool.length <= 0) {
      var template = 'לא ניתן להוסיף ביה"ס ללא כיתות';
      const d = this.dialog.open(DialogComponent, { data: { template: template, actions: [true, false] } });
      return
    }
    var template = this.UpdateSecretary() ? `בלחיצה על אישור הינך מעדכן את פרטי ביה"ס ${JSON.parse(sessionStorage.getItem("CurrentSchool")).SchoolName}, שים לב כי לא תוכל להסיר כיתות שהוספת `
      : `בלחיצה על אישור הינך מוסיף את ביה"ס ${this.NameOfSchool} למערכת, שים לב כי לא תתאפשר הסרה של כיתות מהמערכת`;
    const dialogRef = this.dialog.open(DialogComponent, { data: { template: template, actions: [true, true] }, disableClose: true, width: '400px' });
    dialogRef.afterClosed().subscribe(res => {
      if (res.data == true)
        this.SubmitSchool();
    })
  }
  // edit comment
  EditComment(CurrentClass: any) {
    debugger
    CurrentClass.checked = !CurrentClass.checked;
  }
  // update select comment
  UpdateSelectComment(selectedClass: any) {
    debugger
    // selectedClass.comment=this.CurrentComment;
    selectedClass.checked = false;
  }

  // update school
  UpdateSchool() {
    var newClasseToAdd: classToSchool[] = [];
    var newClasseToRemove: classToSchool[] = [];
    newClasseToAdd = this.addClasses.map(x => {
      return (new classToSchool(
        x.id,
        x.idSchool,
        x.className,
        x.comment,
        null, x.Proffestions
      ))
    });
    // newClasseToRemove = this.deleteClasses.map(x => {
    //   return (new classToSchool(
    //     x.id,
    //     x.idSchool,
    //     x.className,
    //     x.comment
    //   ))
    // });
    var newSchool = new ApdateSchool(this.SchoolBySecretary.id, this.SchoolBySecretary.SchoolName, this.CityId, this.SchoolBySecretary.idSchool, this.commentValue, this.SecretaryEnter.SecretaryId, newClasseToAdd, this.OriginalClassesToSchool);
    this.schoolService.PutSchool(newSchool).subscribe(x => {
      debugger
      this.ifDisabledFinish = true;
      console.log(x);
      var template = 'פעולת העדכון הסתיימה בהצלחה';
      this.ShowSubmitMsg(template);
    }, err => {
      console.log(err);
      var template = 'פעולת העדכון נכשלה, לפרטים פנה למנהל המערכת';
      this.ShowSubmitMsg(template);
    });
  }
  // get msg if school fail or success
  ShowSubmitMsg(tmp) {
    debugger
    this.dialog.open(DialogComponent, { data: { template: tmp, actions: [true, false] } });
  }

  // disabled submit school button
  IfDisabledFinish() {
    if (this.router.url.includes("RegistrationDetailsSecretary")) {
      if (this.ifDisabledFinishPost == true)
        return true;
      else return false;
    }
    if (this.router.url.includes("UpdateDetailsSecretary")) {
      if (this.ifDisabledFinish == true)
        return true;
      else return false;
    }
  }
  ngOnInit(): void {
    debugger
    this.ifDisabledFinishPost = false;
    this.ifDisabledFinish = false;
    this.deleteClasses.length = 0;
    this.addClasses.length = 0;
    this.UserService.GetCities().subscribe(res => this.Cities = res);
    this.ProffestionService.GetAll().subscribe(res => {
      debugger
      this.Profestions = res.map(function (p) {
        return {
          id: p.ProffestionId,
          name: p.ProffestionName,
          checked: false
        }
      })
    });
    this.SecretaryEnter = JSON.parse(sessionStorage.getItem("CurrentUser"));
    if (this.router.url.includes("UpdateDetailsSecretary")) {
      this.Loading = false;
      this.SchoolBySecretary = JSON.parse(sessionStorage.getItem("CurrentSchool"));
      this.UpdateClassesToSchool = this.SchoolBySecretary.ClassesToSchool;
      this.OriginalClassesToSchool = this.SchoolBySecretary.ClassesToSchool;
      this.CityId = this.SchoolBySecretary.IdCity;
      console.log(this.SchoolBySecretary);
    }
    else
      this.Loading = false;
  }

}
