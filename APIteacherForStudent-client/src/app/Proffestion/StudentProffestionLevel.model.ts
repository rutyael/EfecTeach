import { Proffestion } from './proffestion.model';

export class StudentProffestionLevel {
    constructor(
        public mark: Float32Array,
        public comment:string,
        public proffestion: Proffestion
    ) { }
}