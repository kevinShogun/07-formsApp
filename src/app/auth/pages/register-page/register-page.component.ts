import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from '../../../shared/services/validators.service';
import { EmailValidatorService } from '../../../shared/validators/email-validator.service';

@Component({
  templateUrl: './register-page.component.html',
  styles: ``,
})
export class RegisterPageComponent {
  public myForm: FormGroup = this.fb.group({
    name: [
      '',
      [
        Validators.required,
        Validators.pattern(this.validatorServices.firstNameAndLastnamePattern),
      ],
    ],
    userName: ['', [Validators.required, this.validatorServices.cantBeStrider]],
    email: [
      '',
      [
        Validators.required,
        Validators.pattern(this.validatorServices.emailPattern),
      ],
      [this.emailValidator],
    ],
    pass: ['', [Validators.required, Validators.minLength(6)]],
    pass2: ['', [Validators.required]],
  },{
    validators: [
      this.validatorServices.isFieldOneEqualFieldTwo('pass', 'pass2')
    ]
  });

  constructor(
    private fb: FormBuilder,
    private validatorServices: ValidatorService,
    private emailValidator: EmailValidatorService
  ) {}

  isValidField(field: string) {
    return this.validatorServices.isValidField(this.myForm, field);
  }

  onSubmit(): void {
    this.myForm.markAllAsTouched();
  }
}
