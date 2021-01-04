export class ClassesJoinUser{
    constructor(
        public  SchoolId:number,
        public  SchoolName:string,
        public  ClassId:number,
        public  ClassName:string,
        public  UserId:number,
        public  UserName:string,
        public SchoolComment:string,
        public ClassComment:string,
        public approved:number,
    ){}
}