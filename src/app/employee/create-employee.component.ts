import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { validateConfig } from '@angular/router/src/config';
import { CustomValidators } from '../shared/custom.validators';



@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  constructor(private fb: FormBuilder) { }
  fullNameLength = 0;


  validationMessages = {
    'fullName': {
      'required': 'Full Name is required.',
      'minlength': 'Full name must be greater than 2 characters.',
      'maxlength': 'Full name should not be exceed 10 characters.'
    },
    'email': {
      'required': 'Email is required.',
      'emailDomain': 'Email domain should be dell.com'
    },
    'phone': {
      'required': 'Phone number is required.'
    },
    'skillName': {
      'required': 'Skill Name is required.'
    },
    'experienceInYears': {
      'required': 'Experience is required.'
    },
    'proficiency': {
      'required': 'Proficiency is required.'
    }

  };

  formErrors = {
    'fullName': '',
    'email': '',
    'phone': '',
    'skillName': '',
    'experienceInYears': '',
    'proficiency': ''
  };


  ngOnInit() {
    /*  this.employeeForm = new FormGroup({
       fullName: new FormControl(),
       email: new FormControl(),
       skills: new FormGroup({
         skillName: new FormControl(),
         experienceInYears: new FormControl(),
         proficiency: new FormControl()
       })
     }) */

    this.employeeForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      contactPreference: ['email'],
      email: ['', [Validators.required, CustomValidators.emailDomain('dell.com')]],
      phone: [''],
      skills: this.fb.group({
        skillName: ['', Validators.required],
        experienceInYears: ['', Validators.required],
        proficiency: ['', Validators.required]
      })
    })

    //valueChages property: for form control
    /*  this.employeeForm.get('fullName').valueChanges.subscribe((value: string) => {
       this.fullNameLength = value.length;
     }); */
    //valueChages property: for form group
    /* this.employeeForm.valueChanges.subscribe((value: any) => {
     console.log(JSON.stringify(value));
   }); */
    this.employeeForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.employeeForm);
    });

    this.employeeForm.get('contactPreference').valueChanges.subscribe((data: string) => {
      this.oncontactPreferenceChange(data);
    });
  }

  logValidationErrors(group: FormGroup = this.employeeForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      } else {
        this.formErrors[key] = ' ';
        if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
          const messages = this.validationMessages[key];
          /*  console.log(messages);
           console.log(abstractControl.errors); */

          for (const errorKey in abstractControl.errors) {
            if (errorKey) {
              this.formErrors[key] += messages[errorKey] + ' ';
            }
          }
        }
      }
    });

    /*  logKeyValuePairs(group: FormGroup): void {
       Object.keys(group.controls).forEach((key: string) => {
         const abstractControl = group.get(key);
         if (abstractControl instanceof FormGroup) {
           this.logKeyValuePairs(abstractControl);
           //if we want to make form controls disabled/dirty in nested property skills
           /* abstractControl.disable();
           abstractControl.markAsDirty(); 
         } else {
           console.log('Key = ' + key + 'Value = ' + abstractControl.value);
           //if we want to make all the  form controls disabled/ dirty
           /* abstractControl.disable();
           abstractControl.markAsDirty(); 
         }
       });
     } */


  }

  onLoadDataClick(): void {
    /*  this.employeeForm.setValue({
       fullName: 'Sangeetha',
       email: 'deepasan92@gmail.com',
       skills: {
         skillName: 'HTML&CSS',
         experienceInYears: 3,
         proficiency: 'beginner'
       }
     }) */
    /*  this.employeeForm.patchValue({
       fullName: 'Sangeetha',
       email: 'deepasan92@gmail.com',
         skills: {
          skillName: 'HTML&CSS',
          experienceInYears: 3,
          proficiency: 'beginner'
        }
     }) */

    /*     this.logValidationErrors(this.employeeForm);
        console.log(this.formErrors); */
  }

  onSubmit(): void {
    console.log(this.employeeForm.value);
    console.log(this.employeeForm);

    console.log(this.employeeForm.controls.fullName.value);
    console.log(this.employeeForm.controls.fullName.value);

    console.log(this.employeeForm.value);
    console.log(this.employeeForm);

  }

  oncontactPreferenceChange(selectedValue: string) {
    const phoneControl = this.employeeForm.get('phone');
    if (selectedValue === 'phone') {
      phoneControl.setValidators(Validators.required);
    } else {
      phoneControl.clearValidators();
    }

    phoneControl.updateValueAndValidity();
  }

}



