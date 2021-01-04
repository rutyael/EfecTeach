import { TeacherClassProffestion } from '../Proffestion/TeacherClassProffestion';

export class UserToClass {
    constructor(
        public id: number,
        public idUser: number,
        public idClass: number,
        public approved: number,
        public className: string,
        public TCProffestions:TeacherClassProffestion[],
        public LastDateOfStatusChange:Date,
        public factor:string
        
    ) { }
}
