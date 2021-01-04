export class UserQuestion {
    constructor(
                public UserName:string,
                public ifImportant:boolean,
                public UserKind:string,
                public UserMail:string,
                public OuestionTitle:string,
                public QuestionContent:string,
                public ProffestionName:string,
                //לא לשכוח להוסיף שדה זה גם ב DTO נראה לי שחייבים צריך לשאול את שרהלה
                public QuestionId:number,
                public  QuestionDate:Date,
                public  QuestionView:number,
                public NumQuestioners:number,
                public numAnswers:number
                ){}
}
