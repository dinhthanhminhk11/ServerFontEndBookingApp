import { Component, OnInit } from '@angular/core';
import { HttpservicesService } from 'src/app/myservice/httpservices.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private http: HttpservicesService) {
  }
  dataHouseList!: any[]
  load: boolean = true
  idHost: any

  ngOnInit(): void {
    this.idHost = JSON.parse(localStorage.getItem('host')!).id;
    this.http.getHouseByHost({ id: this.idHost }).subscribe((data: any) => {
      this.dataHouseList = data.datapros
      this.load = false
    })

  }
  deleteHouse(idHouse: any) {
    const argree = confirm('bạn có chắc chắn muốn xóa không?')
    if (argree) {
      this.http.deleteHouseId({ id: idHouse }).subscribe((data: any) => {
        this.refresh()
        alert("xóa thành công")
      })
    } else { }
  }

  refresh(): void {
    window.location.reload();
  }

  
}
