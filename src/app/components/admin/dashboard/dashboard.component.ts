import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpservicesService } from 'src/app/myservice/httpservices.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  idHost: any
  count: any
  countFinish: any
  countProcess: any
  countFail: any
  getTimeOrder : any
  constructor(private http: HttpservicesService) { }


  ngOnInit(): void {
    // var dayCheck=new Date(Date.now()).getDate()+""
    // if(new Date(Date.now()).getDate()<10){
    //   dayCheck = '0'+new Date(Date.now()).getDate()
    // }
    // var time=new Date(Date.now()).getFullYear() +"-"+(new Date(Date.now()).getMonth()+1) +"-"+dayCheck
    // var a = this.date.substring(0, this.date.indexOf('T'))
    

    
    this.idHost = JSON.parse(localStorage.getItem('host')!).id;
    this.http.getCountOrder({ IdHost: this.idHost }).subscribe((data: any) => {
      this.count = data
    })
    this.http.getCountOrderFinish({ IdHost: this.idHost }).subscribe((data: any) => {
      this.countFinish = data
    })
    this.http.getCountOrderProcess({ IdHost: this.idHost }).subscribe((data: any) => {
      this.countProcess = data
    })
    this.http.getCountOrderFail({ IdHost: this.idHost }).subscribe((data: any) => {
      this.countFail = data
    })
    this.http.getTimeOrder({IdHost: this.idHost}).subscribe((data: any)=>{
      this.getTimeOrder = data.data
    })   
  }

}
