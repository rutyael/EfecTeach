import { Pipe, PipeTransform } from '@angular/core';
import { Proffestion } from './proffestion.model';

@Pipe({
  name: 'languages'
})
export class LanguagesPipe implements PipeTransform {

  transform(value: Proffestion[], lang:string): unknown {
    return value.filter(l=>l.ProffestionName.includes(lang));
  }

}
