import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Validation} from './validation';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient) { }
  title = 'dogsshow';
  validation: Validation;
  configUrl = 'https://dog.ceo/api/breeds/list/all';
  menuList = [];
  ngOnInit() {
    this.showConfig();
  }
  getConfig() {
    return this.http.get(this.configUrl);
  }
  showConfig() {
    this.getConfig()
      .subscribe((data: Validation) => {this.validation = {
        status: data['status'],
        message:  data['message']
      };
     //  this.menuList = this.validation.message.filter(function())
        for (const key in this.validation.message) {
          if (this.validation.message.hasOwnProperty(key)) {
            if (this.validation.message[key].length) {
              this.menuList.push(key);
            }
          }
        }
      console.log('this.validation', this.menuList); } );
  }
}
