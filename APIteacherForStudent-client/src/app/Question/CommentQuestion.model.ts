

export class CommentQuestion{
    constructor(
        public UserId:number,
        public CommentContant:string,
        public IdQuestion:number,
        public date:Date,
        public QuestionDate:Date,
        public OuestionTitle:string,
        public UserName:string
    ){}
}