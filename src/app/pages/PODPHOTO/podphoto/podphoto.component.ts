import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import 'jspdf-autotable';
import { HandleDataService } from 'src/app/common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';

@Component({
  selector: 'app-podphoto',
  templateUrl: './podphoto.component.html',
  styleUrls: ['./podphoto.component.css']
})
export class PODPhotoComponent implements OnInit {

  public truckVar=''
  public trucknoid11='';
  public turnbooklist=[];
  public pop='';
  public temp={};
  public bigII={'podImage': [
{setter:0,fileType:''},
{setter:0,fileType:''},
{setter:0,fileType:''},
{setter:0,fileType:''},
{setter:0,fileType:''},
{setter:0,fileType:''}
]};
  public bigJJ;
  public imgSrc='';
public unique11turnbooklist=[];
public byTruckName=false;
public turn11=[];
public selectedFile: File;
public wala11=false;
constructor(
    public apiCallservice: ApiCallsService,
    public router: Router,
    public handledata: HandleDataService,
    public sec: SecurityCheckService,
    public handleF:handleFunction,
  ) { }

  ngOnInit() {
  }

  find11UniqueTruck(){
      if(this.trucknoid11!=='Default'){
      this.turn11=this.turnbooklist.filter(r=>{return r.truckName==this.trucknoid11});    
      this.byTruckName=true;
      }
    }

  find(){

    this.wala11=false;
        this.unique11turnbooklist=[];
        this.turn11=[];
        this.byTruckName=false;
this.trucknoid11=''

        let tempObj1={};
    tempObj1['tablename'] = ''
    tempObj1['method'] = 'singleTruckpod'
    tempObj1['truckno'] = this.truckVar;
      this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj1, true)
      .subscribe((res: any) => {
        if(res.Data.length>0){
          this.wala11=true;
        this.unique11turnbooklist=res.Data;
        this.turnbooklist = res.Data;
        this.byTruckName=true;
        this.unique11turnbooklist= res.Data.map(r=>r.truckName).filter(function(item, pos) {return res.Data.map(r=>r.truckName).indexOf(item) == pos;})
        }
      else{
        this.wala11=false;
        this.unique11turnbooklist=[];
        this.turn11=[];
        this.byTruckName=false;
      }
      });
    
}

  savePayment(i,j){
    this.bigII=i;
    this.bigJJ=j;
    (<HTMLInputElement>document.getElementById('file1c')).value='';
    (<HTMLInputElement>document.getElementById('file2c')).value='';
    (<HTMLInputElement>document.getElementById('file3c')).value='';
    (<HTMLInputElement>document.getElementById('file4c')).value='';
    (<HTMLInputElement>document.getElementById('file5c')).value='';
    (<HTMLInputElement>document.getElementById('file6c')).value='';

    (<HTMLInputElement>document.getElementById('file1g')).value='';
    (<HTMLInputElement>document.getElementById('file2g')).value='';
    (<HTMLInputElement>document.getElementById('file3g')).value='';
    (<HTMLInputElement>document.getElementById('file4g')).value='';
    (<HTMLInputElement>document.getElementById('file5g')).value='';
    (<HTMLInputElement>document.getElementById('file6g')).value='';
  }
 //type of doc : [rawLR,stampLR,courierOfPOD,nrcmBill] 


   onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }

 uploadFile(position) {
  
      this.handleF.fileToBase64(this.selectedFile).then((base64String) => {
        // Send the Base64 string to the server
        this.sendToServer(base64String,position);
      }).catch((error) => {
        console.error(error);
      });
  }

  showFile(position){
    this.imgSrc='https://truckdriverdocuments.s3.ap-south-1.amazonaws.com/pod/'+this.bigII['partyName'].replace(/ /g, "")+'/'+this.bigII['truckName'].replace(/ /g, "")+'/'+this.bigII['nrlrno'].replace(/ /g, "")+'/'+this.fileType(position)+'.'+this.bigII['podImage'][parseInt(position)]['fileType'];
  }

    sendToServer(base64String: string,position) {
      if(this.bigII['nrlrno']===''){alert('LRNO is Missing!')}else{
    // Implement the logic to send the Base64 string to the server
    this.pop=this.selectedFile.name.split('.').pop()
   this.temp={
        'method':'podImage',
        'tablename':'',
        'base64':base64String,
        'position':position,
        'fileType':this.selectedFile.name.split('.').pop(),
        'id':this.bigII['_id'],
        'name':'pod/'+this.bigII['partyName'].replace(/ /g, "")+'/'+this.bigII['truckName'].replace(/ /g, "")+'/'+this.bigII['nrlrno'].replace(/ /g, "")+'/'+this.fileType(position)+'.'+this.selectedFile.name.split('.').pop()
      }
            this.apiCallservice.handleData_New_python
        ('commoninformation', 1, this.temp, true,'2025-07-12','nrcm_q')
        .subscribe((res: any) => {
          alert(res.Status)
        })
      }
  }

    image(type,data){
    (<HTMLInputElement>document.getElementById('file'+data+type)).click();
  }


  setLRNO(i,j,nrlrno){ 
    if(nrlrno === ''){
    const a = String(prompt('Enter LRNO of vehicle '+i.truckName));
   this.temp={
        'method':'setLRNO',
        'tablename':'',
        'nrlrno':a,
        'id':i._id
      }
      console.log(a);
      
      if([null].indexOf(a)!=0){
            this.apiCallservice.handleData_New_python
        ('commoninformation', 1, this.temp, true)
        .subscribe((res: any) => {
          alert(res.Status)
        })
      }else{alert('Enter valid value!')}
      }else{
        const aa = prompt('LRNO exists Cannot Change! Enter Password to change')
        if(aa=='LEO'){
          this.setLRNO(i,j,'')
        }
      }
  }

fileType(position){
  switch (position) {
    case 0: return 'raw_F';
    case 1: return 'stamp_F'
    case 2: return 'stamp_B'
    case 3: return 'courier_D2T'  
    case 4: return 'courier_T2B'  
    case 5: return 'bill_F'
  }
}

}
