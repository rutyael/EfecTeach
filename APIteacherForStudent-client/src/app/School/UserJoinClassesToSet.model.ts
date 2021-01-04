import { User } from '../User/user.model';
import { UserToClass } from './user-to-class.model';

export class UserJoinClassesToSet{
    constructor(
        public User:User,
        public UserClass:UserToClass
    ){}
}