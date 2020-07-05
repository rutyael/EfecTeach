import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserQuestion } from '../user-question.model';


@Component({
  selector: 'app-item-question',
  templateUrl: './item-question.component.html',
  styleUrls: ['./item-question.component.css']
})
export class ItemQuestionComponent implements OnInit {

  
  @Input() question : UserQuestion;

  constructor(private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
  }

}
