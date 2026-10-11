import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { SecurityCheckService } from '../../../common/services/Data/security-check.service';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';
import { Router } from 'node_modules/@angular/router';  
@Component({
  selector: 'app-truck-entry',
  templateUrl: './truck-entry.component.html',
  styleUrls: ['./truck-entry.component.css'],
  providers: [ApiCallsService]
})
export class TruckEntryComponent implements OnInit {
public myFormGroup: FormGroup;
  public submitted = false;
  public list=[];
  public todaysDate;
  public date=new Date();
public uitodayDate=''
  public showdiv='0';
  public parties=[];
  public parties2=[];
  public partyid='';
  public toc = '';
  public partyType='';
 public pts=[
    {value:'NRCM',viewValue:'NRCM'},
    {value:'NR',viewValue:'NR'},
    {value:'SNL',viewValue:'SNL'}
  ]

  constructor(public router:Router,public handleF:handleFunction,public apiCallservice: ApiCallsService, public formBuilder: FormBuilder,
    public securityCheck: SecurityCheckService) { if(!this.securityCheck.login){
      this.router.navigate([''])
    }}



  ngOnInit() {
    this.uitodayDate = this.handleF.getDate(this.handleF.generate2DigitNumber(this.date.getDate()), (this.date.getMonth() + 1), this.date.getFullYear());
    this.myFormGroup = this.formBuilder.group({
      truck: ['', Validators.required],
      partyName: ['',Validators.required]
    });
  }

   getparties(data){
    let value={}
    value['method'] = 'displayp';
    this.apiCallservice.handleData_New_python
      ('commoninformation', 1, value, true)
      .subscribe((res: any) => {
        this.parties=res.Data;
        this.showdiv=data;
      });
  }


  setParty(index){
      let data=this.partyType;
      switch (data) {
        case 'NRCM':
          this.parties2=this.parties.filter(r=>{return r.partyType=='NRCM'});
          break;
          case 'NR':
            this.parties2=this.parties.filter(r=>{return r.partyType=='NR'})
          break;
          case 'SNL':
            this.parties2=this.parties.filter(r=>{return r.partyType=='SNL'})
          break;
      
      }
    }

      leftRight(LR) {
    let tempArray;
    let date;
    
    switch (LR) {
      case 'back':
        tempArray=this.uitodayDate.split('-');
        date=new Date(tempArray[0],parseInt(tempArray[1])-1,parseInt(tempArray[2])-1)
        this.uitodayDate = this.handleF.createDate(date);
        break;
      case 'ahead':
        tempArray=this.uitodayDate.split('-');
        date=new Date(tempArray[0],parseInt(tempArray[1])-1,parseInt(tempArray[2])+1)
        this.uitodayDate = this.handleF.createDate(date);
        break;
    }
  }

  store() {
    let value={}
    this.submitted = true;
    value['method'] = 'quickturn';
    value['date'] = this.uitodayDate;
    value['truckno'] =this.formatTruckNo(this.myFormGroup.value.truck);
    value['partytype'] = this.partyType;
    value['partyName'] = this.parties.filter(p => p.name === this.myFormGroup.value.partyName)[0]['_id'];
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
     this.myFormGroup.patchValue({truck: '',partyName: ''});
  }

   changeDiv(data){
        
        if(data=='1'){
          this.getparties(data);
        }
        else{
          this.showdiv=data;
        }
   }

}
