import { Component, OnInit } from '@angular/core';
import { HttpservicesService } from 'src/app/myservice/httpservices.service';

@Component({
  selector: 'app-list-phong',
  templateUrl: './list-phong.component.html',
  styleUrls: ['./list-phong.component.css']
})
export class ListPhongComponent implements OnInit {

  constructor(private http: HttpservicesService) {}

  dataPhong!: any[]
  load: boolean = true
  idHotel: any
  ngOnInit(): void {
    this.idHotel= JSON.parse(localStorage.getItem('Hotel')!)._id;
    this.http.getPhongByHotel({ idHotel: this.idHotel }).subscribe((data: any) => {
      this.dataPhong = data.datapros
      this.load = false
    })
  }

  deletePhong(idPhong: any) {
    const argree = confirm('bạn có chắc chắn muốn xóa không?')
    if (argree) {
      this.http.deletePhongId({id: idPhong}).subscribe((data: any) => {
        alert("xóa thành công")
        this.refresh()
      })
    } else { }
  }

  refresh(): void {
    window.location.reload();
  }

  getIdPhong(idPhong: any){
    this.http.getIdPhong(idPhong)
  }
}
