import { Component, OnInit, Input } from '@angular/core';
import { SchoolService } from '../../School/school.service';
import { ProffestionService } from 'src/app/Proffestion/proffestion.service';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { ProffestionJoinTeacher } from 'src/app/Proffestion/proffestionJoinTeacher.model';
import { ClassesJoinUser } from '../ClassesJoinUser.model';
import { Router } from '@angular/router';
import { UserToClass } from 'src/app/School/user-to-class.model';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { EditTeacherClassComponent } from 'src/app/School/edit-teacher-class/edit-teacher-class.component';
import { DialogComponent } from 'src/app/dialog/dialog.component';
@Component({
  selector: 'app-apdate-details-teacher',
  templateUrl: './apdate-details-teacher.component.html',
  styleUrls: ['./apdate-details-teacher.component.css']
})
export class ApdateDetailsTeacherComponent implements OnInit {
  proffestions: ProffestionJoinTeacher[] = [];
  schools;
  IsTeacher = false;
  StudentClass = null;
  Loading: boolean = true;
  user: User;
  tabIndex: number = 0;
  firstEntering = false;
  constructor(private ProffestionService: ProffestionService,
    private schoolService: SchoolService,
    private router: Router,
    private dialog: MatDialog) { }

  ////set teacher proffestion checked
  SetpProChecked(pro) {
    debugger
    switch (pro.Checked) {
      case 'T': pro.Checked = 'R'; return;
      case 'R': pro.Checked = 'T'; return;
      case 'A': pro.Checked = 'F'; return
      case 'F': pro.Checked = 'A'; return;
    }
  }
  // edit teacher class
  EditTeachrClass(cl) {
    debugger
    var dialogRef;
    console.log(cl);
    if (this.DisabledEditClass(cl.status)) {
      var template = 'תוכל לערוך רק כיתות שציינת אליהן קשר';
      dialogRef = this.dialog.open(DialogComponent, { data: { template: template, actions: [true, false] }, width: '280px', disableClose: true });
    }
    else {
      dialogRef = this.dialog.open(EditTeacherClassComponent, { data: { cl: cl }, width: '300px', disableClose: true });
      dialogRef.afterClosed().subscribe(res => {
        cl.TCProffestions = res.data;
      })
    }
  }
  // get school name
  GetNameById(school) {
    return this.schools.find(s => s[0] == school)[1][0].s_name;
  }
  // get comment school by id
  GetCommentById(school) {
    var comment = this.schools.find(s => s[0] == school)[1][0].s_comment;
    return comment != undefined && comment.length > 0 ? (' ( ' + comment + ' ) ') : null;
  }
  // put teacher language 
  PutLanguage() {
    debugger
    var updateproffestions = this.proffestions.filter(p => p.Checked == 'A' || p.Checked == 'R');
    if (updateproffestions.length > 0)
      this.ProffestionService.PutProffestionToTeacher(updateproffestions);
    this.GoNextTab();
  }

  // get next tab on submit current tab
  GoNextTab() {
    this.tabIndex = this.tabIndex * -1 + 1
  }
  informChange(tabIndex: number) {
    console.log(tabIndex);
  }
  // check if any proffestion choosen
  NoneProChoosen() {
    if (this.proffestions == undefined)
      return;
    return this.proffestions.filter(p => { return (p.Checked == 'A' || p.Checked == 'R' || p.Checked == 'T') }).length == 0;
  }
  // check if any class choosen
  NoneClassChoosen() {
    if (this.schools == undefined)
      return
    var none = 0;
    this.schools.map(school => {
      return none + school[1].forEach(c => {

        return none += !this.DisabledEditClass(c.status) ? 1 : 0;
      });
    })
    console.log(none);
    return none == 0;
  }
  //////put classes to user on submit
  PutClasses() {
    debugger
    var PutClasses: UserToClass[] = [];
    if (this.user.UserKind == 'תלמיד') {
      var sc = {
        idUser: this.user.UserId,
        idClass: this.StudentClass.c_id,
        approved: 11,
        className: this.StudentClass.c_name,
        LastDateOfStatusChange: new Date,
      }
      PutClasses.push(<UserToClass>sc);
    }
    else {
      this.schools.map(school => {
        school[1].forEach(c => {
          if (c.status == 11 || c.status == 33 || (c.TCProffestions != undefined && (c.TCProffestions = c.TCProffestions.filter(tcp => tcp.approved == 2 || tcp.approved == -1)).length != 0)) {
            var cl: UserToClass = new UserToClass(null, this.user.UserId, c.c_id, c.status, c.c_name, c.TCProffestions, new Date,"u");
            PutClasses.push(cl);
          }
        });
      });
    }
    if (PutClasses.length > 0)
      this.schoolService.PutClassesToUser(PutClasses).subscribe(res => {
        if (!this.IsTeacher) {
          var template = `ברוך הבא ${this.user.UserName}!<br>    אנו מברכים אותך על הצטרפותך למערכת, כרגע אפשרויותיך באתר מצומצמות, לאחר אישור הכניסה לקבוצה תוכל להינות ממגוון אפשרויות לתלמיד`;
          const dialogRef = this.dialog.open(DialogComponent, { data: { actions: [true, false], template: template.toString() }, disableClose: true })
          dialogRef.afterClosed().subscribe(act => {
            this.relativeTo();
          });
        }
        else
          this.GoNextTab();
      });
    else
      this.GoNextTab();
  }
  GetAction() {
    return !this.IsTeacher ? 'סיימתי' : 'החל';
  }

  /////set user classes checked
  SetClassChcked(cl) {
    debugger
    switch (cl.status) {
      ///all status
      ///{1,-1,0,11,2,33,3,22}
      case 1: cl.status = -1; return;
      case -1: cl.status = 1; return;
      case 0: cl.status = 11; return;
      case 11: cl.status = 0; return;
      case 2: cl.status = 33; return;
      case 33: cl.status = 2; return;
      case 3: cl.status = 22; return;
      case 22: cl.status = 3; return;
      default: return;
    }
  }

  ////set student class checked
  SetStudenClass(sl) {
    debugger
    this.StudentClass = { ...sl };
  }

  /////get class checked by class status
  GetChecked(item) {
    var s = item.status;
    return s == 1 || s == 11 || s == 2 || s == 22;
  }
  // disabled edit proffestion class if teacher didnt sign the class
  DisabledEditClass(status) {
    return [0, -1].includes(status);
  }
  // Get Approved stats accordance by approved field
  GetApproved(item) {
    switch (item.status) {
      case 1: return 'הוספה ממתינה לאישור';
      case 11: return 'הוספה ממתינה לאישור';
      case 2: return 'מאושר';
      case 22: return 'מאושר';
      case 3: return 'מחיקה ממתינה לאישור';
      case 33: return 'מחיקה ממתינה לאישור';
      default: return '';
    }
  }
  // get if exist some classes checked
  updateAllComplete(idSchool: number) {

    var school = this.schools.find(s => s[0] == idSchool);
    var allComplete = school[1].every(c => c.status == 2 || c.status == 1);
    if (allComplete == true)
      school[1].forEach(c => c.allComplete = true);
  }
  // sign node if exists some checked classes
  someComplete(idSchool: number): boolean {

    var school = this.schools.find(s => s[0] == idSchool);
    var x = school[1].filter(c => c.status == 2 || c.status == 1).length > 0 && school[1][0].allComplete == false;
    return x;
  }
  // set all classes
  setAll(idSchool: number) {
    debugger
    var school = this.schools.find(s => s[0] == idSchool);
    school[1].forEach(c => {
      debugger
      c.allComplete = !c.allComplete;
      c.allComplete ? c.status == 2 || c.status == 3 ? c.status = 2 : c.status = 1 : c.status == 2 || c.status == 3 ? c.status = 3 : c.status = 0;
    });
  }

  ////show / hide classes for current school
  show(idSchool: number, toggle: string) {
    var school = this.schools.find(s => s[0] == idSchool);
    toggle == 'open' ? school[1].every(c => c.toggle = 'close') : school[1].every(c => c.toggle = 'open');
  }

  ////group classesjoin user by school
  GroupBy(classes: ClassesJoinUser[]) {
    var classesArry = classes.reduce(function (arr, a) {
      arr[a.SchoolId] = arr[a.SchoolId] || [];
      arr[a.SchoolId].push({
        s_name: a.SchoolName,
        s_id: a.SchoolId,
        c_name: a.ClassName,
        c_id: a.ClassId,
        status: a.approved,
        allComplete: false,
        c_comment: a.ClassComment,
        s_comment: a.SchoolComment,
        toggle: 'close',
        TCProffestions: null,
      });
      return arr;
    }, Object.create(null));
    return Object.entries(classesArry);
  }
  ////relative user url on submit[/]
  relativeTo() {

    if (this.IsTeacher && this.firstEntering) {
      var template = ` ברוך הבא ${this.user.UserName}!<br>  אנו מברכים אותך על הצטרפותך למערכת כרגע אפשרויותיך באתר מצומצמות, לאחר אישור הכניסה אל הקבוצות אליהן הצטרפת תוכל להינות ממגוון אפשרויות למורה`;
      const dialogRef = this.dialog.open(DialogComponent, { data: { actions: [true, false], template: template.toString() }, disableClose: true })
      dialogRef.afterClosed().subscribe(act => {
        this.router.navigate(['questions'])
      });
    }
    else
      this.IsTeacher == true ? this.router.navigate(['questions']) : this.router.navigate(['AskQuestion']);
  }
  ////init data component
  Init(callback: () => void) {
    this.schoolService.GetClassesToUser(this.user.UserId).subscribe(classes => {
      this.schools = this.GroupBy(classes);
      this.schools.forEach(s => {
        this.updateAllComplete(s[0]);
      });
    });
    if (sessionStorage.getItem("stat") == 'T') {
      this.ProffestionService.GetProffestionToTeacher(this.user.UserId).subscribe(proffetions => {
        proffetions.sort((p1, p2) => p1.ProffestionName.localeCompare(p2.ProffestionName));
        proffetions.map(p => p.Checked = p.Checked == 'true' ? 'T' : 'F');
        this.proffestions = proffetions;
      });
    }
    callback();
  }
  ngOnInit(): void {
    /////get init component 
    this.firstEntering = sessionStorage.getItem("first") == "1";
    this.user = JSON.parse(sessionStorage.getItem("CurrentUser"));
    this.Init(() => { this.Loading = false });
    this.IsTeacher = sessionStorage.getItem("stat") == 'T';
    debugger
  }
}
