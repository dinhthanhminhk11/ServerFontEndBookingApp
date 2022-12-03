import { JsonPipe, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpservicesService } from 'src/app/myservice/httpservices.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private http: HttpservicesService) { }
  idHost: any
  count: any
  countFinish: any
  countProcess: any
  countFail: any
  getTimeOrder: any
  sumPriceWaiting: any
  priceDay: any
  priceWeek : any
  priceMonth: any
  priceYear : any
  price = ""
  checkDay =""

  ngOnInit(): void {
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
    this.http.getTimeOrder({ IdHost: this.idHost }).subscribe((data: any) => {
      this.getTimeOrder = data
    })

    this.http.getPriceWaiting({ IdHost: this.idHost }).subscribe((data: any) => {
      var array = []
      var sumPrice =0
      array = data.data
      for (let i = 0; i < array.length; i++) {
        sumPrice += parseInt(array[i].price)
      }
      this.sumPriceWaiting = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(sumPrice)
    })

    this.http.getPriceDay({ IdHost: this.idHost }).subscribe((data: any) => {
      var array = []
      var sumPrice =0
      array = data.data
      if(array.length == 0){
        this.priceDay =sumPrice
      }else{
        for (let i = 0; i < array.length; i++) {
          sumPrice += parseInt(array[i].price)
        }
        this.priceDay = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(sumPrice)
      }
      this.price = this.priceDay
      this.checkDay = "Hôm nay"
      
    })

    this.http.getPriceWeek({ IdHost: this.idHost }).subscribe((data: any) => {
      var array = []
      var sumPrice =0
      array = data.data
      if(array.length == 0){
        this.priceWeek =sumPrice
      }else{
        for (let i = 0; i < array.length; i++) {
          sumPrice += parseInt(array[i].price)
        }
        this.priceWeek = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(sumPrice)
      }
    })

    this.http.getPriceMonth({ IdHost: this.idHost }).subscribe((data: any) => {
      var array = []
      var sumPrice =0
      array = data.data
      if(array.length == 0){
        this.priceMonth =sumPrice 
      }else{
        for (let i = 0; i < array.length; i++) {
          sumPrice += parseInt(array[i].price)
        }
        this.priceMonth = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(sumPrice)
      }
      
    })

    this.http.getPriceYear({ IdHost: this.idHost }).subscribe((data: any) => {
      var array = []
      var sumPrice =0
      array = data.data
      if(array.length == 0){
        this.priceYear = sumPrice
      }else{
        for (let i = 0; i < array.length; i++) {
          sumPrice += parseInt(array[i].price)
        }
        this.priceYear = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(sumPrice)
      }
    })



  }

  getValue(data: string, value: string): void{
    this.price= data
    this.checkDay =value
  }

}
