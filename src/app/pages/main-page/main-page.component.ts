import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallsService } from '../../common/services/ApiCalls/ApiCalls.service';
import { HandleDataService } from 'src/app/common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';
import * as  jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Observable } from 'rxjs/internal/Observable';
import { Http, Headers, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  providers: [ApiCallsService]
})
export class MainPageComponent implements OnInit {
  public loginV = false;
fileToUpload: File | null = null;
public pop='';
public temp={};
public imgSrc='https://truckdriverdocuments.s3.ap-south-1.amazonaws.com/docs/TN25CD6705/RC/TN25CD6705_RC_F.jpg';
  constructor(
    public router: Router,
    public apiCallservice: ApiCallsService,
    public security: SecurityCheckService,
    public handledata:HandleDataService,
    public hf:handleFunction,
    public http: HttpClient,
  ) {
    // if(!this.security.login){
    //   this.router.navigate([''])
    // }
  }


  login() {    
    this.router.navigate(['Login']);
    this.loginV = true;
    
  }



  ngOnInit() {
    // this.bankRec();
    // this.generatePdfWithImageFromS3();
  }




    bankRec() {
var doc = new jsPDF()

    doc.setFontSize('28');
    doc.setFontType('bold');
    doc.setTextColor(234, 1, 0);

      doc.text('NITIN ROADWAYS AND CARGO MOVERS', 7, 15)  
    doc.setFontSize('16');
    doc.setFontType('bold');
    doc.setFontType('italic');
    doc.setTextColor(0, 0, 0);
    // doc.text('(TRANSPORT CONTRACTOR & COMMISSION AGENT)', 30, 35)

    doc.setDrawColor(153, 29, 39);
    doc.setLineWidth(0.5);
    doc.line(15, 33, 195, 33);

    doc.setFontSize('15');
    doc.setFontType('bold');
    doc.setTextColor(215, 6, 9);
    doc.text('DAILY SERVICE TAMILNADU, KERALA, KARNATAKA & PONDICHERY', 15,38)

    doc.setDrawColor(153, 29, 29);
    doc.setLineWidth(0.5);
    doc.line(15, 39, 195, 39);

    doc.setFontType('normal');
    doc.setFontSize('15');
    doc.setTextColor(0, 0, 0);
    doc.text('Cell :- 9822288257, 8459729293, 9423580221, 9766707061', 25, 51)
    doc.setFontSize('12');
    doc.text('Email : punenitinroadways@gmail.com    Website : www.nitinroadways.in', 25, 58)

    doc.setDrawColor(153, 29, 29);
    doc.setLineWidth(0.8);
    doc.line(15, 67, 195, 67);

    doc.setDrawColor(153, 29, 29);
    doc.setLineWidth(0.2);
    doc.line(15, 68, 195, 68);


            
        // doc.addImage(base64data, 'JPG', 25, 6, 160, 20);//add if else
        doc.save('example.pdf');
  }

}
