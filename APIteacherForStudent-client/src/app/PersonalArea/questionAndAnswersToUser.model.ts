import { UserAnswer } from '../Answer/user-answer.model';
import { UserQuestion } from '../Question/user-question.model';

export class questionAndAnswersToUser{
    constructor(
        public answersToQuestions:UserAnswer[],
        public questions:UserQuestion[]
    ){}
}