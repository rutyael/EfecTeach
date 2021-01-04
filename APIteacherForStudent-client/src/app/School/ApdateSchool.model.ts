
import { classToSchool } from './classToSchool.model';

export class ApdateSchool{
    constructor(
        public id:number,
        public SchoolName:string,
        public IdCity:number,
        public idSchool:number,
        public comment:string,
        public IdSecretary:number,
        public ClassesToAdd:classToSchool[],
        public ClassesToApdate:classToSchool[]
    ){}
}