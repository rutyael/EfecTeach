import { Component, OnInit } from '@angular/core';
import { ProffestionService } from 'src/app/Proffestion/proffestion.service';
import { Proffestion } from 'src/app/Proffestion/proffestion.model';

@Component({
  selector: 'app-apdate-details-teacher',
  templateUrl: './apdate-details-teacher.component.html',
  styleUrls: ['./apdate-details-teacher.component.css']
})
export class ApdateDetailsTeacherComponent implements OnInit {
  Proffestion:Proffestion[]=[];
  constructor(private ProffestionService:ProffestionService) { }
  Update()
  {
    
  }

  ngOnInit(): void {
    this.ProffestionService.GetAll().subscribe(res=>this.Proffestion=res);
  }

}
