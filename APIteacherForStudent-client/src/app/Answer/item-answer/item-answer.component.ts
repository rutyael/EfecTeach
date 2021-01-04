import { Component, OnInit, Input } from '@angular/core';
import { UserAnswer } from '../user-answer.model';
import { FullUserAnswer } from '../FullUserAnswer.model';

@Component({
  selector: 'app-item-answer',
  templateUrl: './item-answer.component.html',
  styleUrls: ['./item-answer.component.css']
})
export class ItemAnswerComponent implements OnInit {

  constructor() { }

  @Input() answer: FullUserAnswer;
  ifTwoLong: string;


 

    // if content question is two long
    Content(content: string) {
      var element = document.createElement('span');
      element.innerHTML = content;
      var element_content = element.innerText;
      element_content = element_content.slice(0, 100);
      element_content=element_content.concat('...');
      element.innerText = element_content;
      return element.innerHTML;
    }

  ngOnInit(): void {
  }

}
