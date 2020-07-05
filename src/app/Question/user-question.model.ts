export class UserQuestion {
    constructor(
                public userName:string,
                public userKind:string,
                public userMail:string,
                public OuestionTitle:string,
                public QuestionContent:string,
                public ProffestionName:string,
                //לא לשכוח להוסיף שדה זה גם ב DTO נראה לי שחייבים צריך לשאול את שרהלה
                public QuestionId:number
                ){}
}
