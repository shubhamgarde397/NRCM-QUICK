import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { Location } from '@angular/common';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ObsServiceService } from 'src/app/common/services/Data/obs-service.service';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  styles:['.hide{display:none}'],
  providers: [ApiCallsService, HandleDataService],
})
@Input()
export class NavigationComponent implements OnInit {
  public data;
  public now = new Date();
  public day = this.now.getDate();
  public month = this.now.getMonth();
  public year = this.now.getFullYear();
  public AUTH;
  public tabs=[
      {
      parent:'TruckData',
      link:''
      },
    {
      parent:'Logout',
      link:'F9',
      children:[]
    },
    {
      parent:'Welcome',
      link:'',
      children:[]
    },

  ]
  public date = new Date();
  public nrcmid=0;
  public todayDate;
  public username;
  public nameOfUser = 'Guest';
  public URL = '';
  public showThisMsg = false
  public myFormGroup: FormGroup;
  public from;
  public to;
  public acknowledgement=false;

  constructor(
    public router: Router,
    public apiCallservice: ApiCallsService,
    public location: Location,
    public handledata: HandleDataService,
    public securit: SecurityCheckService,
    public securityCheck: SecurityCheckService,
    public spin: Ng4LoadingSpinnerService,
    public obs: ObsServiceService,
    public hF: handleFunction,
    public formBuilder: FormBuilder,
  ) { if(!this.securit.login){
    this.router.navigate([''])
  }}

  ngOnInit() {
    this.todayDate = this.hF.getDate(this.date.getDate(), this.date.getMonth() + 1, this.date.getFullYear());
    this.URL = window.location.href.split('/')[2];
    this.username = this.securityCheck.dname;
    this.nameOfUser = this.username.slice(0, 1).toLocaleUpperCase() + this.username.slice(1, this.username.length);
    this.AUTH = this.securit.AUTH;
    this.nrcmid=this.securit.nrcmid;
    this.month = this.date.getMonth() + 1
    this.year = this.date.getFullYear();
    // this.tabsetter();
    this.obs.saveDate(this.hF.generate2DigitNumber(String(this.month)) + '_' + this.year)

    this.myFormGroup = this.formBuilder.group({
      amountShow: this.securityCheck.getAmountShow()
    });
  }


  logout() {
    this.router.navigate(['']);
  }

    routeR(data){
    // document.getElementsByClassName('navbar-brand')[0].setAttribute("data-toggle","modal")
    // undefined
    // document.getElementsByClassName('navbar-brand')[0].setAttribute("data-target","#myModalDD")

    if(data==''){}
    else if(data.slice(0,1)==='F'){
      switch(data.slice(1)){
          case '9':
          this.logout();
          break;
      }
    }
    else{
      this.router.navigate(['Navigation/'+data])
    }
  }



 }
