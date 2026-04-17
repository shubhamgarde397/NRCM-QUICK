import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { SecurityCheckService } from '../../../common/services/Data/security-check.service';
import { Router } from 'node_modules/@angular/router';  
@Component({
  selector: 'app-contact-h',
  templateUrl: './contact-h.component.html',
  styleUrls: ['./contact-h.component.css'],
  providers: [ApiCallsService]
})
export class ContactHComponent implements OnInit {
  public list=[];
  public currentLocation=[];
  public bigII;
  public bigJJ;
  public location;
  public date;
  public reference;
  public advbalarray=[];
 
  constructor(public router:Router,public apiCallservice: ApiCallsService, public formBuilder: FormBuilder,
    public securityCheck: SecurityCheckService) { if(!this.securityCheck.login){
      this.router.navigate([''])
    }}



  ngOnInit() {
  }

    refresh1(){
      let value={}
    value['method'] = 'truckContact';
    this.apiCallservice.handleData_New_python
      ('commoninformation', 1, value, true)
      .subscribe((res: any) => {
        this.list=res.Data;
      });
  }

   callMe(data){
    window.open('tel://+91'+data.contact+'','_blank');
   }

     savePayment(i,j,type){
    this.bigII=i;
    this.bigJJ=j;
    this.currentLocation=this.list[j]['currentLocation'];
  }

  del(index){
  if(confirm('Are you sure?')){
  let tempObj={}
  
    tempObj['method']='delLocationArray'; 
  
    tempObj['tablename']='';
    tempObj['_id']=this.bigII['_id']
    tempObj['index']=index;
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
      .subscribe((res: any) => {
        alert(res.Status);
        this.list[this.bigJJ]['currentLocation'].splice(index,1);
      });
    
      
}
}
 add(){
  
  let tempObj={}
  
    tempObj['method']='addLocationArray'; 
    tempObj['_id']=this.bigII['_id']
    tempObj['tablename']='';
    tempObj['date'] = this.date;
    tempObj['location'] = this.location;
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
      .subscribe((res: any) => {
        alert(res.Status);
        this.list[this.bigJJ]['currentLocation'].push({date:this.date,location:this.location});
      });
    
      
}

 complete(){
  
  let tempObj={}
  
    tempObj['method']='completeLocationArray'; 
    tempObj['_id']=this.bigII['_id']
    tempObj['tablename']='';
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
      .subscribe((res: any) => {
        alert(res.Status);
        this.list.splice(this.bigJJ, 1);
      });
    
      
}

}

