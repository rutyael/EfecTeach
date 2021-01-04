import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { ProffestionService } from 'src/app/Proffestion/proffestion.service';
import { TeacherClassProffestion } from 'src/app/Proffestion/TeacherClassProffestion';
import { User } from 'src/app/User/user.model';

export interface DialogData {
  cl: any
}

@Component({
  selector: 'app-edit-teacher-class',
  templateUrl: './edit-teacher-class.component.html',
  styleUrls: ['./edit-teacher-class.component.css']
})
export class EditTeacherClassComponent implements OnInit {
  proffestions: TeacherClassProffestion[] = [];
  proffestionsOrig: TeacherClassProffestion[] = [];
  Teacher: User;
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private ProffestionServise: ProffestionService
  ) { }

  // set proffestion checked
  SetProChecked(pro) {
    debugger
    var p = this.proffestions.find(p => pro.ProffestionId == p.proffestion.ProffestionId);
    //p.approved = p.approved * (-1) + 1;
    switch (p.approved) {
      case 1: p.approved = -1; break;
      case -1: p.approved = 1; break;
      case 0: p.approved = 2; break;
      case 2: p.approved = 0; break;
    }
  }
  onNoClick() {
    this.proffestions = this.proffestionsOrig;
    this.dialogRef.close({ data: this.proffestionsOrig });
    ////send orig
  }
  Save() {
    //this.dialogRef.close({event:this.action,data:this.local_data});
    this.dialogRef.close({ data: this.proffestions })
  }
  ngOnInit(): void {
    debugger
    this.Teacher = JSON.parse(sessionStorage.getItem("CurrentUser"));
    if (this.data.cl.TCProffestions == null)
      this.ProffestionServise.GetTeacherClassProffestions(this.data.cl.c_id, this.Teacher.UserId).subscribe(res => {
        this.proffestionsOrig = this.proffestions = res;
      });
    else
      this.proffestionsOrig = this.proffestions = this.data.cl.TCProffestions;
  }

}
