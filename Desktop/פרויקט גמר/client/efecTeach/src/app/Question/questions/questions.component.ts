import { Component, OnInit } from '@angular/core';
import { Question } from '../question.model';
import { UserQuestion } from '../user-question.model';
import { QuestionServiceService } from '../question-service.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  constructor(private QuestionService:QuestionServiceService,) { }

  arrUserQuestion:UserQuestion[]=[];
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  // @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  

  ngOnInit(): void {
    this.QuestionService.GetAllUserQuestions().subscribe(res=>{
      this.arrUserQuestion=res;
      console.log(this.arrUserQuestion)
    });

  }

}
