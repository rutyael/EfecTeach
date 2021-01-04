import { Component, OnInit } from '@angular/core';
import { StudentProffestionLevel } from 'src/app/Proffestion/StudentProffestionLevel.model';
import { User } from 'src/app/User/user.model';
import { PersonalAreaServiceService } from '../personal-area-service.service';

@Component({
  selector: 'app-student-marks',
  templateUrl: './student-marks.component.html',
  styleUrls: ['./student-marks.component.css']
})
export class StudentMarksComponent implements OnInit {

  constructor(private PersonalAreaService: PersonalAreaServiceService) { }
  marks: StudentProffestionLevel[] = [];
  userEnter: User;
  dataSource = null;
  displayedColumns: string[];

  // if current property is two long
  IfNaN(mark: any) {
    if (mark == "NaN")
      return "______";
    else return mark
  }


  ngOnInit(): void {
    this.userEnter = JSON.parse(sessionStorage.getItem("CurrentUser"));
    this.displayedColumns = ['ProffestionName', 'mark'];
    this.PersonalAreaService.GetMarksToStudent(this.userEnter.UserId).subscribe(x => {
      this.dataSource = x;
    })
  }

}
