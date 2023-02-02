import { HttpservicesService } from 'src/app/myservice/httpservices.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'src/app/service/message.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  public nameUser: String = ''
  listdataUser!:any[]
  loading:boolean=true
  constructor(private MessageService: MessageService, private http: HttpservicesService) { }

  ngOnInit(): void {
    this.nameUser = this.MessageService.getStorage().name
    this.http.getAllUser().subscribe((data: any) => {
      this.listdataUser = data
      console.log(data);
      
      this.loading = false
    })
  }

  unLock(id: any){
    const argree = confirm('Tài khoản sẽ được tiếp tục sử dụng hệ thống')
    if(argree){
      this.http.unLockAccount(id).subscribe()
      this.refresh()
    }
  }

  Lock(id: any){
    const argree = prompt('Lý do khóa tài khoản')
    if(argree){
      this.http.lockAccount(id,argree).subscribe()
      this.refresh()
    }
  }

  logout() {
    localStorage.clear();
  }
  


  refresh(): void {
    window.location.reload();
  }
}
