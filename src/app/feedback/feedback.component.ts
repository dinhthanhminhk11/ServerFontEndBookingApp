import { Component, OnInit } from '@angular/core';
import { HttpservicesService } from 'src/app/myservice/httpservices.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})

export class FeedbackComponent implements OnInit{

  constructor(private http: HttpservicesService) { }

  idHost: any
  product : any
  load: boolean = true
  isCollapse: any = {}
  showFeedBAck : any

  ngOnInit(): void {
    
    this.idHost = JSON.parse(localStorage.getItem('host')!).id;
    this.http.getHotelByHost({ id: this.idHost }).subscribe((data: any) => {
      this.product = data.datapros
      this.load = false
    })
  }

  onClickHidden(item: any) {
    Object.keys(this.isCollapse).forEach(h => {
      this.isCollapse[h] = false;
    });
    this.isCollapse[item._id] = true;
    this.isCollapse != this.isCollapse
    this.http.getFeedbackId({idHouse: item._id}).subscribe((data: any)=>{
      this.showFeedBAck = data.data
    })
    
  }

}
