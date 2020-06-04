import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    // if (this.form.valid) {
    //   this.submitEM.emit(this.form.value);
    // }
  }
  
  getErrorMessageUserName(){
    if(this.form['userName'].hasError('required'))
      return 'חובה להחזיר ערך';
    return this.form['userName'].hasError('userName')?'מקסימום 10 תווים':'';
  }
  constructor() { }

  ngOnInit(): void {
    
  }

}
