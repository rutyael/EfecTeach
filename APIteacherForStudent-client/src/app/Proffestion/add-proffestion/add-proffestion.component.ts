import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent, DialogData } from 'src/app/dialog/dialog.component';

@Component({
  selector: 'app-add-proffestion',
  templateUrl: './add-proffestion.component.html',
  styleUrls: ['./add-proffestion.component.css']
})
export class AddProffestionComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }


  new_pro: string = '';

  // to cancel
  Cancel() {
    this.dialogRef.close({ data: false })
  }
  // add proffestion to the table
  AddPro() {
    if (this.new_pro.length > 0) {
      this.dialogRef.close({ data: this.new_pro })
    }
  }
  ngOnInit(): void {
  }

}
