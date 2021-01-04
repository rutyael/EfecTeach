import { UserAnswer } from './user-answer.model';
import { classToSchool } from '../School/classToSchool.model';
import { FullUserAnswer } from './FullUserAnswer.model';

export class AnswerAndClassesToTeacher{
    constructor(
        public answers:FullUserAnswer[],
        public classes:classToSchool[]
    ){}
}