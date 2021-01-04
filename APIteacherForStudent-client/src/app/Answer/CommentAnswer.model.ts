
export class CommentAnswer{
    constructor(
        public UserId:number,
        public CommentContant:string,
        public IdAnswer:number,
        public date:Date,
        public AnswerContant:string,
        public AnswerDate:Date,
        public UserName:string
    ){}
}