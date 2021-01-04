import { UserQuestion } from './user-question.model';

export class QuestionsReturnDefalt{
    constructor(
        public QuestionsDefalt:UserQuestion[],
        public NumQuestions:number
    ){}
}