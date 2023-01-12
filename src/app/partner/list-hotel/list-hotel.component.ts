import { HttpservicesService } from 'src/app/myservice/httpservices.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'src/app/service/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-hotel',
  templateUrl: './list-hotel.component.html',
  styleUrls: ['./list-hotel.component.css']
})
export class ListHotelComponent implements OnInit {

  public nameUser: String = ''
  constructor(private MessageService: MessageService, private http: HttpservicesService, private router: Router) { }
  load: boolean = true
  listHotel: any
  getCount: any
  idHost: any
  checkConfirm: Boolean = false

  ngOnInit(): void {
    if (this.MessageService.getStorage()) {
      this.nameUser = this.MessageService.getStorage().name
    }
    this.idHost = JSON.parse(localStorage.getItem('idUserHost')!)._id
    this.http.getHotelByHost({ id: this.idHost }).subscribe((data: any) => {
      this.listHotel = data.datapros
      this.load = false
    })
  }

  logout() {
    localStorage.clear();
  }

  conFirmHotle(data: any) {
    const argree = confirm('Khi xác nhận khách sạn này sẽ được hiện thị cho khách hàng')
    if (argree) {
      this.http.confirmHotel({id: data, check:true}).subscribe(data => {
        alert("Xác nhận thành công")
        this.refresh()
      })
      
    }
  }
  disConFirmHotel(data: any) {
    const argree = confirm('Khi từ chối khách sạn này sẽ không hiển thị cho người dùng')
    if (argree) {
      this.http.confirmHotel({id: data, check:false}).subscribe(data => {
        alert("Khách sạn đã bị từ chối")
        this.refresh()
      })
    }
  }
  refresh(): void {
    window.location.reload();
  }
}
