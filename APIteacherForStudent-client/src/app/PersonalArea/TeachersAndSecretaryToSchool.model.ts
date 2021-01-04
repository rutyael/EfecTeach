import { User } from '../User/user.model';
import { Secretary } from '../User/Secretary.model';

export class TeachersAndSecretaryToSchool{
    constructor(
        public teachers:User[],
        public secretary:Secretary,
        public idSchool:number,
        public SchoolName:string,
        public cityName:string
    ){}
}