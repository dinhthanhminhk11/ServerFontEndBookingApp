import { HttpservicesService } from 'src/app/myservice/httpservices.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'src/app/service/message.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-partnet',
  templateUrl: './list-partnet.component.html',
  styleUrls: ['./list-partnet.component.css']
})
export class ListPartnetComponent implements OnInit {
  public nameUser: String = ''
  constructor(private MessageService: MessageService, private http: HttpservicesService, private router: Router) { }
  load: boolean = true
  listDoiTac: any
  getCount: any

  ngOnInit(): void {
    if (this.MessageService.getStorage()) {
      this.nameUser = this.MessageService.getStorage().name
    }
    this.http.getAllHost().subscribe((data: any) => {
      this.listDoiTac = data
      console.log(data);
      this.load = false
    })

  }

  // getCountHotel(idUser: string) {
  //   this.http.getCountHotelById({ idUser: idUser }).subscribe((data: any) => {
  //     this.getCount = data.data
  //   })

  // }

  logout() {
    localStorage.clear();
  }

  getIdUser(data: any){
    localStorage.setItem("idUserHost", JSON.stringify(data))
  }
}
