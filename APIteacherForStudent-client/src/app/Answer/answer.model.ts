export class Answer {
    constructor(
        public AnswerId:number,
        public QuestionId:number,
        public UserId:number,
        public AnswerContant:string,
        public AnswerScoring:string, 
        public AnswerDate:Date
    ){}

    
}
