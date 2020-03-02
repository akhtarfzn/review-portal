import { ServicesService } from './../services.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private _service: ServicesService, private _router: Router) { }
  firstName: String;
  ngOnInit() {
    this.getUserName();
  }

  myProfile(){
    this._router.navigate(["/user"])
  }

  getUserName(){
    let name = this._service.jsonDecoder(localStorage.getItem("JwtHrms")).data.firstName;
    this.firstName = name;
  }

}
