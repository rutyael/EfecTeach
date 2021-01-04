import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

export interface DialogData {
  template: string,
  actions: [false, false],
  teacher: string
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private route: Router
  ) { }

  // click on no in the dialog
  onNoClick(): void {
    this.dialogRef.close({ data: false });
  }
  // click on ok in the dialog
  onOkClick() {
    if (this.data.teacher == 'T')
      this.route.navigate(['ApdateDetailsTeacher'])
    this.dialogRef.close({ data: true });
  }

  ngOnInit(): void {
  }

}
