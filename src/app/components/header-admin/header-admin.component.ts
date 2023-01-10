import { HttpservicesService } from 'src/app/myservice/httpservices.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'src/app/service/message.service';
import { ContactComponent } from '../admin/message/contact/contact.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css']
})
export class HeaderAdminComponent implements OnInit {

  @ViewChild('nav') nav: any;
  constructor(private MessageService: MessageService,private http:HttpservicesService,private router:Router) {}

  public nameUser:String=''
  ngOnInit(): void {    
    if (this.MessageService.getStorage()) {
      this.nameUser =this.MessageService.getStorage().name
  
    }
  }
  logout(){
    localStorage.clear();  
  }
}
