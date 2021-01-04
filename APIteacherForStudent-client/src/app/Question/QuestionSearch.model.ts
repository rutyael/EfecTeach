import { User } from '../User/user.model';
import { UserQuestion } from './user-question.model';

export class QuestionSearch {
    public question: UserQuestion
    public level: Float32Array
    public userAsk: User
}