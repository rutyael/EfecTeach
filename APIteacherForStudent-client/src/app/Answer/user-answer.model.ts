import { User } from '../User/user.model';
import {Answer} from '../Answer/answer.model';

export class UserAnswer {
    constructor(
        public Reply:User,
        public Answer:Answer,
        public ProffestionName:string,
        public className:string,
        public idClass:number
    ){}
}
