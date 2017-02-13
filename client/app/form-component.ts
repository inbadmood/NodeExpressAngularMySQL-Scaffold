import { Component, OnInit, Input, Output, EventEmitter, Injectable }           from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormControl }                                                          from '@angular/forms';

import { SubmitService }                                                        from './submit-service';

@Injectable()

@Component({
  moduleId:    module.id,
  selector:    'form-component',
  templateUrl: 'form-component.html',
  styleUrls:  ['form-component.css'],
  providers:  [ SubmitService ]
})

export class FormComponent {

  emailForm : FormGroup;
  acknowledgementText: string = "";
  @Input() hidden : boolean;
  showAcknowledgement : boolean = false;
  @Output() didSubmit : EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private submitService : SubmitService, private fBuilder: FormBuilder) {
    this.createForm();
  }

  createForm() : void {
    this.emailForm = this.fBuilder.group({
      firstName:    ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      lastName:     ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      background:   ['', Validators.required],
      emailAddress: ['', Validators.compose([Validators.required, Validators.minLength(5), this.validateEmail])]
    });
  }

  validateEmail(c: FormControl) {

    // This looks a bit of a mouthful, but checks that the email address contains '@' and '.' inside the string (not at the ends)
    // , with a '.' after the '@'
    if  (   c.value.includes('@')
         && c.value.includes('.')) {
           let atIndex = c.value.indexOf('@');
           let dotIndex = c.value.indexOf('.');
           if ((atIndex != 0 && atIndex != c.value.length - 1 ) && (dotIndex != 0 && dotIndex != c.value.length - 1)) {
             let firstComponent : string = c.value.substring(0, atIndex - 1);
             let secondComponent : string = c.value.substring(atIndex + 1, c.value.length)
             if (secondComponent.includes('.')) {
               let dotIndexTwo = secondComponent.indexOf('@');
               if (dotIndexTwo != 0 && dotIndexTwo != secondComponent.length - 1) {
                 return null;
               }
             }
           }
         }
         else {
           return { validateEmail: { message: "Invalid email address" }};
         }
  }


  onSubmit() {
    if (this.emailForm.valid) {
      console.log("Submitting form");
      this.submitService.post(this.emailForm.value)
        .subscribe(
          response => { console.log("Form submitted!");
                        this.didSubmit.emit(true);
                        console.log(response);
                        this.acknowledgementText = response._body;
                        this.showAcknowledgement = true;
                        this.emailForm.reset();
                      },

          error    => { console.log(error); }
        );
      }
      else
      {
        console.log("Form invalid");
      }
    }
  }
