import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { SecurityCheckService } from '../../../common/services/Data/security-check.service';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';
import { Router } from 'node_modules/@angular/router';  
import * as  jsPDF from 'jspdf';
import 'jspdf-autotable';
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
    public securityCheck: SecurityCheckService,public hF:handleFunction) { if(!this.securityCheck.login){
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
  download(){
    let a=prompt('Enter Date in YYYY-MM-DD format');
    if(a){
      let pwd=prompt('Enter Password');
      if(pwd==='LEO'){
        let tempObj={}

        tempObj['method']='downloadContact'; 
        tempObj['date']=a;
        this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
        .subscribe((res: any) => {
          this.downloadFile(res.Data,a);
        });
      }
    }
  }

  downloadFile(data, date){

    let dataC=[]
for(let i = 0;i<data.length;i++){
    let temp=[]
    temp.push(String(i+1))
    temp.push(data[i]['tno'])
    temp.push(data[i]['place'])
    temp.push(data[i]['contact'])
    dataC.push(temp)
}


    var doc = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a6',
        putOnlyUsedFonts:true
       })
     doc.setFontSize('25');
     doc.setFontType('bold');
     doc.setTextColor(215, 6, 9);
     doc.text('NITIN ROADWAYS', 15, 12)//partyname
     doc.setTextColor(0,0,0);
     doc.setFontSize('10');
    //headers
     doc.text('Loading Date: ' + String(this.hF.getDateddmmyy(date)), 15, 18)//pageno
     doc.setLineWidth(0.5);
     doc.line(0, 20, 210, 20);//line after main header
     doc.text('List of Vehicle loaded from Pune to Tamil Nadu', 15, 25)//pageno
     //headers
     doc.setFontSize('10');

      doc.autoTable({
      head: [['Sr','TruckNo','Place','Contact']],
      body: dataC,
      style:[],
      theme: 'grid',
      startY: 30,
      margin: {  left: 6 },
      headStyles :{lineWidth: 1,fillColor: [215, 6, 9],textColor: [255,255,255],
      },
      tableWidth: 'wrap'
  });


     doc.save(String(this.hF.getDateddmmyy(date))+'.pdf')
   }
}


