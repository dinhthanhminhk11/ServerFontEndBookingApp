import { HttpservicesService } from 'src/app/myservice/httpservices.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'src/app/service/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.css']
})
export class ListOrderComponent implements OnInit {

  constructor(private MessageService: MessageService, private http: HttpservicesService, private router: Router) { }
  public nameUser: String = ''
  dataOrderList!:any[]
  loading:boolean=true
  ngOnInit(): void {
    this.nameUser = this.MessageService.getStorage().name
    this.http.getAllOrderAdmin().subscribe((Listdata:any)=>{
      this.loading=false
      this.dataOrderList=Listdata    
    })
  }

  logout() {
    localStorage.clear();
  }
}
