import { UserAnswer } from './user-answer.model';
import { CommentAnswer } from './CommentAnswer.model';

export class FullUserAnswer{
    public userAnswer:UserAnswer;
    public commentsAnswer:CommentAnswer[];
    public PopularAnswer:number;
    public EfectiveAnswer:number;
}