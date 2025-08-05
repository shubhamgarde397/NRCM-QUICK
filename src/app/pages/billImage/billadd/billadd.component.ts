import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { HandleDataService } from 'src/app/common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';

@Component({
  selector: 'app-billadd',
  templateUrl: './billadd.component.html',
  styleUrls: ['./billadd.component.css']
})
export class BilladdComponent implements OnInit {
public truckVar=''
public unique11turnbooklist=[];
public byTruckName=false;
public wala11=false;
public selectedFile: File;
public trucknoid11=''
public turnbooklist=[];
public turn11=[];


  constructor(public router:Router,public apiCallservice: ApiCallsService,
    public securityCheck: SecurityCheckService,public handleF:handleFunction) { }

  ngOnInit() {
  }

    find = function () {
    let tempObj = {};

    tempObj['method'] = 'PochGivenPDF';
    tempObj['tablename'] = '';
    tempObj['givenDate'] = this.generateDatefromBillno(this.truckVar);
    this.apiCallservice.handleData_New_python
      ('turnbook', 1, tempObj, true)
      .subscribe((res:any) => {
        if(res.Data.length>0){
        this.unique11turnbooklist = [];
        this.unique11turnbooklist = this.removeDuplicates(res.Data);
        console.log(this.unique11turnbooklist);
        
        this.turnbooklist=[];
        this.turnbooklist=res.Data;
        this.wala11=true;
        }else{
          this.showPDFButton=false;
          alert('No Data Present')
        }
      });
  };

    generateDatefromBillno(data){
        // 'F020724'
        let monthNo=data.slice(1,3)//02
        let day = data.slice(3,5)//04
        let year = data.slice(5)
        return '20'+year+'-'+monthNo+'-'+day;
    }

    removeDuplicates(arr){
        let unique=[]
        arr.map(r=>{
        unique.filter(a=>a.party == r.party).length>0?null:unique.push(r)});
        return unique;
    }

     find11UniqueTruck(){
      if(this.trucknoid11!=='Default'){
      this.turn11=this.turnbooklist.filter(r=>{return r.party==this.trucknoid11});    
      this.byTruckName=true;
      }
    }

        image(type){
    (<HTMLInputElement>document.getElementById('file1'+type)).click();
  }

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

   sendToServer(base64String: string,position) {
    // Implement the logic to send the Base64 string to the server
    const str='pod/'+this.trucknoid11.replace(/ /g, "")+'/';

    for(let i=0;i<this.turn11.length;i++){

    this.turn11[i]['fileName']=str+this.turn11[i]['truckno'].replace(/ /g, "")+'/'+this.turn11[i]['nrlrno'].replace(/ /g, "")+'/'+this.fileType(position)+'.'+this.selectedFile.name.split('.').pop()
    
}

   let temp={
        'method':'billImageAll',
        'tablename':'',
        'base64':base64String,
        'fileType':this.selectedFile.name.split('.').pop(),
        'dataAll':this.turn11,
      }
            this.apiCallservice.handleData_New_python
        ('commoninformation', 1, temp, true,'2025-07-12','nrcm_q')
        .subscribe((res: any) => {
          alert(res.Status)
        })
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
