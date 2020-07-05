import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserQuestion } from '../user-question.model';
import { QuestionServiceService } from '../question-service.service';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css']
})
export class EditQuestionComponent implements OnInit {

  question:UserQuestion=null;

  constructor(private router:ActivatedRoute,private QuestionService:QuestionServiceService) { }

  ngOnInit(): void {
    //עושה שגיאה לפני ההעלאה
    this.router.paramMap.subscribe(res=>
    this.QuestionService.GetQuestionById(Number((res.get("id")))).subscribe(res=>
      {
        this.question=res;
        console.log(res)
      }));
  }

}