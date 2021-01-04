
export class answerOpinion{
    constructor(
        public id:number,
        public teacherId:number,
        public AnswerId:number,
        public scoring:string,
        public comment:string,
        public feedback:string,
        public teacherName:string

    ){}
}