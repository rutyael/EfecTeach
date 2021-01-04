export class Question {
    constructor(
        public QuestionId: number,
        public OuestionTitle: string,
        public QuestionContent: string,
        public UserId: number,
        public ProffestionId: number,
        public QuestionDate: Date,
        public QuestionView: number,
        public NumQuestioners: number
    ) { }
}



