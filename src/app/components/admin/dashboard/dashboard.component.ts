import { JsonPipe, NgFor } from '@angular/common';
import { Component, ElementRef, OnInit,ViewChild } from '@angular/core';
import { HttpservicesService } from 'src/app/myservice/httpservices.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('startDate') startDate:ElementRef | undefined; 
  @ViewChild('endDate') endDate:ElementRef | undefined; 
  constructor(private http: HttpservicesService) { }
  idHost: any
  count: any
  countFinish: any
  countProcess: any
  countFail: any
  getTimeOrder: any
  sumPriceWaiting: any
  priceLastDay: any
  priceDay: any
  priceWeek: any
  priceMonth: any
  priceYear: any
  price = ""
  checkDay = ""
  priceSearch: any

  ngOnInit(): void {
    this.priceSearch = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(0)
    this.idHost = JSON.parse(localStorage.getItem('host')!).id;
    console.log(this.idHost);
    
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
      var sumPrice = 0
      array = data.data
      for (let i = 0; i < array.length; i++) {
        sumPrice += parseInt(array[i].priceEnterprise)
      }
      this.sumPriceWaiting = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(sumPrice)
    })

    this.http.getPriceDay({ IdHost: this.idHost }).subscribe((data: any) => {
      var array = []
      var sumPrice = 0
      array = data.data
      if (array.length != 0) {
        for (let i = 0; i < array.length; i++) {
          sumPrice += parseInt(array[i].priceEnterprise)
        }
      }
      this.priceDay = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(sumPrice)
      this.price = this.priceDay
      this.checkDay = "Hôm nay"
    })

    this.http.getPriceLastDay({ IdHost: this.idHost }).subscribe((data: any) => {
      var array = []
      var sumPrice = 0
      array = data.data
      if (array.length != 0) {
        for (let i = 0; i < array.length; i++) {
          sumPrice += parseInt(array[i].priceEnterprise)
        }
      }
      this.priceLastDay = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(sumPrice)

    })

    this.http.getPriceWeek({ IdHost: this.idHost }).subscribe((data: any) => {
      var array = []
      var sumPrice = 0
      array = data.data
      if (array.length != 0) {
        for (let i = 0; i < array.length; i++) {
          sumPrice += parseInt(array[i].priceEnterprise)
        }
      }
      this.priceWeek = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(sumPrice)

    })

    this.http.getPriceMonth({ IdHost: this.idHost }).subscribe((data: any) => {
      var array = []
      var sumPrice = 0
      array = data.data
      if (array.length != 0) {
        for (let i = 0; i < array.length; i++) {
          sumPrice += parseInt(array[i].priceEnterprise)
        }
      }
      this.priceMonth = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(sumPrice)
    })

    this.http.getPriceYear({ IdHost: this.idHost }).subscribe((data: any) => {
      var array = []
      var sumPrice = 0
      array = data.data
      if (array.length != 0) {
        for (let i = 0; i < array.length; i++) {
          sumPrice += parseInt(array[i].priceEnterprise)
        }
      }
      this.priceYear = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(sumPrice)
    })



  }

  getValue(data: string, value: string): void {
    this.price = data
    this.checkDay = value
  }

  getStartDate(): void {
    this.idHost = JSON.parse(localStorage.getItem('host')!).id;
    this.http.getPriceSearch(this.idHost,this.startDate?.nativeElement.value,this.endDate?.nativeElement.value).subscribe((data: any)=>{
      var array = []
      var sumPrice = 0
      array = data.data
      if (array.length != 0) {
        for (let i = 0; i < array.length; i++) {
          sumPrice += parseInt(array[i].priceEnterprise)
        }
      }
      this.priceSearch = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(sumPrice)
    })
  }
}
