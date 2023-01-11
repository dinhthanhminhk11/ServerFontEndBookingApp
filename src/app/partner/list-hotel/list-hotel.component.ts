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
  listDoiTac: any
  getCount: any

  ngOnInit(): void {
    if (this.MessageService.getStorage()) {
      this.nameUser = this.MessageService.getStorage().name
      this.load = false
    }
  }

  logout() {
    localStorage.clear();
  }
}
