import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallsService } from '../../common/services/ApiCalls/ApiCalls.service';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  providers: [ApiCallsService]
})
export class MainPageComponent implements OnInit {
  public loginV = false;
  constructor(
    public router: Router,) {
    }


 

  login() {    
    this.router.navigate(['Login']);
    this.loginV = true;
    
  }



  ngOnInit() {
  }

}
