import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { SecurityCheckService } from '../../../common/services/Data/security-check.service';
import { PassDataService } from 'src/app/pass-data.service';
import { HandleDataService } from 'src/app/common/services/Data/handle-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ApiCallsService]
})
export class LoginComponent implements OnInit {
  public username: any;
  public password: any;
  public show = true;
  public myFormGroup: FormGroup;
  public response: any;
  public logindetailslist;
  public financialYear;
  public dbName = 'NRCM_Information';
  public isLoginSuccess = false;
  public userTypeHTML;
  public userTypeTS;
  public modalUser = false;
  public loginButton = false;
  public header='';
  public isLoginSuccesss = false;
  public arr=[];
  constructor(
    public router: Router,
    public apiCallservice: ApiCallsService,
    public formBuilder: FormBuilder,
    public spinnerService: Ng4LoadingSpinnerService,
    public security: SecurityCheckService,
    public obs:PassDataService,
    public handledata:HandleDataService
  ) {
    // if(!this.security.login){
    //   this.router.navigate([''])
    // }
  }

  ngOnInit() {
    this.myFormGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  setUser() {
    this.userTypeTS = this.userTypeHTML;
      this.loginButton = false;
      this.myFormGroup.controls['username'].enable();
      this.myFormGroup.controls['password'].enable();
  }

  login() {
let value = this.myFormGroup.value;
      this.security.setUsername(value['username']);

      value['method'] = 'login';
      value['username']=value.username
      value['password']=value.password
      value['tablename']=''
      
      this.apiCallservice.handleData_New_python
        ('commoninformation', 1, value, true)
        .subscribe((res: any) => {
          if(res['Login']){
            this.security.setDisplayname(res['Data'][0]['displayName']);
            this.security.setUserid(res['Data'][0]['_id']);
            this.security.setUserName(res['Data'][0]['name']);
            this.security.setNRCMid(res['Data'][0]['nrcmid']);
            this.isLoginSuccess=true;
            this.security.setLoginTrue();
            this.router.navigate(['Navigation']);
          }
          else{
            alert('Contact Admin for registration!')
          }
        });
  }
}