import { Secretary } from '../User/Secretary.model';
import { User } from '../User/user.model';

export class GetSchoolToStudent{
    constructor(
        public idSchool:number,
        public SchoolName:string,
        public secretary:Secretary,
        public users:User[],
        public teachers:User[],
        public className:string
    ){}
}