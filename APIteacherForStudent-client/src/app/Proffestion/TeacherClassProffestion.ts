import { Proffestion } from './proffestion.model';

export class TeacherClassProffestion {
    constructor(
        public proffestion: Proffestion,
        public approved:number
    ) {
    }
}