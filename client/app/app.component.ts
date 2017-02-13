import { Component }      from '@angular/core';
import { URLSearchParams } from '@angular/http';

import { SubmitService }  from './submit-service';
import { FormComponent }  from './form-component';

@Component({
  moduleId:     module.id,
  selector:    'my-app',
  templateUrl: 'app.component.html',
  styleUrls:  ['app.component.css'],
  providers:  [ SubmitService ]
})

export class AppComponent {
  title = "Node + Express + Angular + MySql";
  responseText : string;
  records : { firstName: string, lastName: string, background: string, email: string}[] = [];
  hideForm: boolean = true;

  constructor(private subService : SubmitService ) {}

  getRecords() : void {
    // Clean down the records
    this.records = [];
    this.subService.getRecords()
    .subscribe(
      response => { console.log("Response received!");
        for ( let entry of response.json()) {
          this.records.push({ firstName: decodeURI(entry.firstName),
                              lastName:  decodeURI(entry.lastName),
                              background: decodeURI(entry.background),
                              email: decodeURI(entry.email) });
        }
        console.log(this.records);
      })
  }

  delete(email: string) : void {

    let body = { email: email };

    this.subService.deleteRecord(body)
    .subscribe(
      response => { console.log("Response received!");
                    console.log(response._body);
                    if (this.records != []) {
                     this.getRecords();
                    }
                },
      error => console.log(error)
    );
  }

  toggleForm() : void {
    console.log("Toggle");
    this.hideForm = !this.hideForm;
    console.log(this.hideForm);
  }

  setHideStatus(evt: boolean) : void {
    console.log("Event detected!");
    this.hideForm = evt;
  }
}
