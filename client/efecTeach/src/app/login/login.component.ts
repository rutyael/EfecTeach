import {  OnInit ,Input, Component, Output, EventEmitter} from '@angular/core';
import { FormControl, Validators, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
    constructor() { }

  submit() {
    // if (this.form.valid) {
    //   this.submitEM.emit(this.form.value);
    // }
  }

  getErrorMessage() {
    if (this.form['email'].hasError('required')) {
      return 'You must enter a value';
    }

    return this.form['email'].hasError('email') ? 'Not a valid email' : '';
  }
  getErrorMessageUserName(){
    if(this.form['userName'].hasError('required'))
      return 'חובה להחזיר ערך';
    return this.form['userName'].hasError('userName')?'מקסימום 10 תווים':'';
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''), 
       email: new FormControl('', [Validators.required, Validators.email])
    });
  }


}








