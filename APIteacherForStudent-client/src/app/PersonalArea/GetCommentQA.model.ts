import { CommentQuestion } from '../Question/CommentQuestion.model';
import { CommentAnswer } from '../Answer/CommentAnswer.model';
import { User } from '../User/user.model';

export class GetCommentQA {
    constructor(
        public CommentQuestions: CommentQuestion[],
        public CommentAnswers : CommentAnswer[],
        public CommentQuestionsUser:User[],
        public CommentAnswersUser:User[]
    ) { }
}