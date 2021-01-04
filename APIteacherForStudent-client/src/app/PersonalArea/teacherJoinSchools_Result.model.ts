
export class teacherJoinSchools_Result{
    constructor(
        public idSchool:number,
        public SchoolName:string,
        public idClass:number,
        public className:string,
        public UserId:number,
        public UserName:string,
        public UserMail:string
    ){}
}