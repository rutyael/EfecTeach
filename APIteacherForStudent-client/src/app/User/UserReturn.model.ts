import { Secretary } from './Secretary.model';
import { User } from './user.model';


export class UserReturn{
    constructor(
        public secretary:Secretary,
        public user:User,
        public ifISecretary:boolean
    ){}
}