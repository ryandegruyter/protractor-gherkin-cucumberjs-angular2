import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators, ControlGroup} from '@angular/common';

import {EmailValidator} from '../email-validator';

@Component({
  selector: 'register',
  providers: [],
  directives: [],
  pipes: [],
  styles: [require('./register.scss')],
  template: require('./register.html')
})
export class Register implements OnInit {

  form: ControlGroup;
  submitted = false;
  registered = false;

  constructor(private _fb: FormBuilder) {
  }

  ngOnInit() {

    this.form = this._fb.group({
        name: [
          '',
          Validators.required,
        ],
        email: [
          '',
          Validators.compose([
            Validators.required,
            EmailValidator.validEmail,
          ])
        ],
        password: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(7),
          ]),
        ],
        repeatPassword: [
          '',
          Validators.required,
        ]
      },
      {
        validator: this.matchingPasswords('password', 'repeatPassword')
      }
    );

  }

  submit(event: any) {

    this.submitted = true;

    if (this.form.valid) {
      console.log(this.form.value);
      this.registered = true;
    }
    event.preventDefault();

  }

  private matchingPasswords(passwordKey: string, repeatPasswordKey: string) {

    return (group: ControlGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let repeatPassword = group.controls[repeatPasswordKey];
      if (password.value !== repeatPassword.value) {
        return {
          passwordMismatch: true
        };
      }
    };

  }

}
