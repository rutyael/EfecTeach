import { UserAnswer } from '../Answer/user-answer.model';
import { answerOpinion } from '../Answer/answerOpinion.model';

export class AnswerAndOpinionToUser{
    constructor(
        public userAnswers:UserAnswer[],
        public opinionAnswers:answerOpinion[]
    ){}
}