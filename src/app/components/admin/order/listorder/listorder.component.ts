import { Component, OnInit } from '@angular/core';
import { HttpservicesService } from 'src/app/myservice/httpservices.service';

@Component({
  selector: 'app-listorder',
  templateUrl: './listorder.component.html',
  styleUrls: ['./listorder.component.css']
})
export class ListorderComponent implements OnInit {

  constructor(private http:HttpservicesService) { 
  }
  dataOrderList!:any[]
  loading:boolean=true
  idHost:any
  ngOnInit(): void {
    this.idHost = JSON.parse(localStorage.getItem('host')!).id;
    this.http.listOrder({idHost:this.idHost}).subscribe((Listdata:any)=>{
      this.loading=false
      this.dataOrderList=Listdata.data
    })
  }
  cancelHandler(id:any){
    const argree = prompt('Xin hãy cho biết lí do huỷ')
    if(argree){
      this.http.updateOrder({id:id,status:'Chủ đã huỷ' ,reasonHost : argree }).subscribe((data:any)=>{
        const resault = this.dataOrderList.find((item)=>item.idOder == id)
        resault.status = data.data.status
        resault.seem = data.data.seem
        resault.reasonHost = data.data.reasonHost
        this.http.ListOrders.next({id:id})
        this.http.sendCancel(resault)
      })
    }
  }
  confirmHandler(id:any){
    const argree = confirm('Trình xử lý nhấp chuột chỉ một lần, Bạn có chắc chắn thực hiện quy trình này không?')
    if(argree){
      this.http.updateOrder({id:id,status:'Đã xác nhận'}).subscribe((data:any)=>{
        const resault = this.dataOrderList.find((item)=>item.idOder == id)
        resault.status = data.data.status
        resault.seem = data.data.seem
        this.http.ListOrders.next({id:id})
        this.http.sendConfirm(resault)
      })
    } 
  }
  createOrder(){
    const data = {
      IdOder:'123order99',
      IdPro:"635e2f5187d050cd577f6629",
      IdHost:"633c05e77bc793d2073ffeac",
      IdUser:"6356ad7a4c139a8cd6fb208c",
      payDay:5,
      price:"1200",
      cashMoney:true,
      banking:false
    }
    this.http.createOrderFake(data).subscribe((dataRes:any)=>{
      return 0
    })
    this.http.sendOrder(data)
  }

  clickMethod() {
    const data = prompt("Are you sure to delete")
    if(data) {
      const data1 = data
      console.log("slkfjlsdkfjklsdfjsdklfjsdfkljsdfkl " + data1 );
    }
  }
}
