import { HttpservicesService } from 'src/app/myservice/httpservices.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'src/app/service/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css']
})
export class HeaderAdminComponent implements OnInit {
  @ViewChild('startDate') startDate:ElementRef | undefined; 
  @ViewChild('endDate') endDate:ElementRef | undefined; 
  @ViewChild('nav') nav: any;
  constructor(private MessageService: MessageService, private http: HttpservicesService, private router: Router) { }

  totalOrder: any
  finish: any
  waiting: any
  cancel: any
  totalNow: any
  priceTotalAdmin: any
  priceAdminWaiting: any
  priceSearch: any

  public nameUser: String = ''
  ngOnInit(): void {
    this.priceSearch = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(0)
    this.nameUser = this.MessageService.getStorage().name

    this.http.getAllCountOrder().subscribe((data: any) => {
      this.totalOrder = data
    })
    this.http.getCountAllOrderFinish().subscribe((data: any) => {
      this.finish = data
    })
    this.http.getCountAllOrderProcess().subscribe((data: any) => {
      this.waiting = data
    })
    this.http.getCountAllOrderFail().subscribe((data: any) => {
      this.cancel = data
    })
    this.http.getAllTimeOrder().subscribe((data: any) => {
      this.totalNow = data
    })

    this.http.getTotalPriceAdmin().subscribe((data: any) => {
      var array = []
      var sumPrice = 0
      array = data.data
      if (array.length != 0) {
        for (let i = 0; i < array.length; i++) {
          sumPrice += parseInt(array[i].priceAdmin)
        }
      }
      this.priceTotalAdmin = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(sumPrice)
    })
    this.http.getPriceAdminWaiting().subscribe((data: any) => {
      var array = []
      var sumPrice = 0
      array = data.data
      if (array.length != 0) {
        for (let i = 0; i < array.length; i++) {
          sumPrice += parseInt(array[i].priceAdmin)
        }
      }
      this.priceAdminWaiting = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(sumPrice)
    })
  }
  logout() {
    localStorage.clear();
  }
  getStartDate(): void {
    this.http.getPriceSearchAdmin(this.startDate?.nativeElement.value,this.endDate?.nativeElement.value).subscribe((data: any)=>{
      var array = []
      var sumPrice = 0
      array = data.data
      if (array.length != 0) {
        for (let i = 0; i < array.length; i++) {
          sumPrice += parseInt(array[i].priceAdmin)
        }
      }
      this.priceSearch = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(sumPrice)
    })
  }
}
