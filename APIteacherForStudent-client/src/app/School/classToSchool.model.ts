import { Proffestion } from '../Proffestion/proffestion.model';

export class classToSchool{
    constructor(
        public id:number,
        public idSchool:number,
        public className:string,
        public comment:string,
        public SchoolName:string,
        public Proffestions:Proffestion[]
    ){}
}