import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../../common/services/ApiCalls/ApiCalls.service';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { SecurityCheckService } from '../../../../common/services/Data/security-check.service';
import { Router } from 'node_modules/@angular/router';  
@Component({
  selector: 'app-truck-data',
  templateUrl: './truck-data.component.html',
  styleUrls: ['./truck-data.component.css'],
  providers: [ApiCallsService]
})
export class TruckDataComponent implements OnInit {
public myFormGroup: FormGroup;
  public submitted = false;
  public list=[];
  public showdiv=true;
  public toc = '';

  constructor(public router:Router,public apiCallservice: ApiCallsService, public formBuilder: FormBuilder,
    public securityCheck: SecurityCheckService) { if(!this.securityCheck.login){
      this.router.navigate([''])
    }}



  ngOnInit() {
    this.myFormGroup = this.formBuilder.group({
      truck: ['', Validators.required],
      type: ['',Validators.required]
    });
  }

  store() {
    let value={}
    this.submitted = true;
    value['method'] = 'truckAdd';
    value['truckno'] =this.formatTruckNo(this.myFormGroup.value.truck);
    value['type'] = this.myFormGroup.value.type; 
    this.apiCallservice.handleData_New_python
      ('commoninformation', 1, value, true)
      .subscribe((res: any) => {
        alert(res['Status']);
      });
  }

   formatTruckNo(a){
  a=a.toUpperCase();
	let newtruck=[]
	let raw=a.replace(/ /g, "");
	newtruck.push(raw.slice(0,2))
	newtruck.push(raw.slice(2,4))
	
	if(raw.length==10){
			newtruck.push(' ')
			newtruck.push(raw.slice(4,6))	
			newtruck.push(' ')
			newtruck.push(raw.slice(6,10))	
	}
	if(raw.length==9){

			newtruck.push(' ')
			newtruck.push(raw.slice(4,5))	
			newtruck.push(' ')
			newtruck.push(raw.slice(5,9))	
	}
	if(raw.length==8){
			newtruck.push(' ')
			newtruck.push(raw.slice(4,8))	
	}
	return newtruck.join('')
}

  changeData(i,j){
    let value={}
    this.submitted = true;
    value['method'] = 'truckEdit';
    value['type'] = (<HTMLInputElement>document.getElementById('toc_' + j)).value;
    value['pan'] = (<HTMLInputElement>document.getElementById('pan_' + j)).value;
    value['name'] = (<HTMLInputElement>document.getElementById('name_' + j)).value;
    value['_id'] =  i._id;
    value['ownerid'] =  i.ownerid;
    this.apiCallservice.handleData_New_python
      ('commoninformation', 1, value, true)
      .subscribe((res: any) => {
        alert(res['Status']);
      });
  }

  onChangeContact(j){
    (<HTMLInputElement>document.getElementById('contact_' + j)).value=(<HTMLInputElement>document.getElementById('contact_' + j)).value.slice(0,10)
  }

  changeContact(i,j){
    let value={}
    this.submitted = true;
    value['method'] = 'contactEdit';
    value['contact'] = (<HTMLInputElement>document.getElementById('contact_' + j)).value;
    value['_id'] =  i._id;
    value['truckno'] =  i.truckno;
    this.apiCallservice.handleData_New_python
      ('commoninformation', 1, value, true)
      .subscribe((res: any) => {
        alert(res['Status']);
      });
  }

  

  delete(i,j){
    if(confirm('Confirm Delete '+i.truckno)){
    let value={}
    this.submitted = true;
    value['method'] = 'truckDelete';
    value['id'] = i._id;
    this.apiCallservice.handleData_New_python
      ('commoninformation', 1, value, true)
      .subscribe((res: any) => {
        alert(res['Status']);
        this.list.splice(j,1)
      });
    }
  }

  refresh(){
      let value={}
    value['method'] = 'truckDisplay';
    this.apiCallservice.handleData_New_python
      ('commoninformation', 1, value, true)
      .subscribe((res: any) => {
        this.list=res.Data;
      });
  }

   changeDiv(data){
    switch (data) {
      case 1:
        this.showdiv=true;
        break;

    case 2:
        this.showdiv=false;
        break;
    }
   }

}
