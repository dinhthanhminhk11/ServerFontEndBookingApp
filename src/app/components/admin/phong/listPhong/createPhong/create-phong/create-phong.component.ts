import { HttpservicesService } from 'src/app/myservice/httpservices.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { NgToastService } from 'ng-angular-popup'
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-phong',
  templateUrl: './create-phong.component.html',
  styleUrls: ['./create-phong.component.css']
})
export class CreatePhongComponent implements OnInit {

  constructor(public router: Router,private httpRequest: HttpservicesService, private toastr: NgToastService, private spiner: NgxSpinnerService) { }
  reactiveForm!: FormGroup
  listAvatars: any[] = []
  subSupplements:any[]=[]
  tiennghi!: any
  checkSupplement: boolean = true
  touching: boolean = false

  idHotel: any

  ngOnInit(): void {
    this.idHotel= JSON.parse(localStorage.getItem('Hotel')!)._id;
    this.httpRequest.getAllTienNghiPhong().subscribe((data: any) => {
      this.tiennghi = data.dataSupplements
    })
    
    this.reactiveForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      avatar: new FormControl(null, [Validators.required, this.checkFormatImage]),
      price: new FormControl(null, Validators.required),
      sophong: new FormControl(null, Validators.required),
      sogiuong: new FormControl(null, Validators.required),
      content: new FormControl(null, Validators.required),
      dienTich: new FormControl(null, Validators.required),
    })
   
  }

  onsubmit() {
    this.touching = true
    let totalTienNghi = 0
    const tiennghi = document.querySelectorAll('.tiennghi')
    const avatars: any = document.querySelector('#avatarInput')
    tiennghi.forEach((items: any) => {
      if (items.checked) {
        totalTienNghi += 1
      }
    })
    if(!this.reactiveForm.valid || avatars.files.length==0 || totalTienNghi==0){
      this.toastr.error({detail:"Notice",summary:"Check!, Your Information is missing.",duration:6000,})
    }else{
          this.spiner.show(undefined,{
            type:'ball-scale-multiple',
          })
          for(let initialIndex=0;initialIndex<avatars.files.length;initialIndex++){
            this.httpRequest.sendImage(avatars.files[initialIndex]).subscribe((data:any)=>{
               this.listAvatars.push(data.url)
            })
          } 
          tiennghi.forEach((item:any)=>{
            if(item.checked){
            this.httpRequest.getTienNghiPhong({id:item.value}).subscribe((data:any)=>{
                this.subSupplements.push(data.dataSupplements)
            })
            }
          })
          setTimeout(()=>{
            const dataAddForm = {
              idHotel:this.idHotel,
              name:this.reactiveForm.get('name')?.value,
              price:this.reactiveForm.get('price')?.value,
              images:this.listAvatars,
              TienNghiPhong:this.subSupplements,
              dienTich:this.reactiveForm.get('dienTich')?.value,
              SoPhong:this.reactiveForm.get('sophong')?.value,
              SoGiuong:this.reactiveForm.get('sogiuong')?.value,
              mota:this.reactiveForm.get('content')?.value,
            }
            this.httpRequest.createPhong(dataAddForm).subscribe((data:any)=>{
              this.reactiveForm.reset()
              tiennghi.forEach((items:any)=>{
                items.checked = false
              })
              this.spiner.hide()
              this.toastr.success({detail:"Success",summary:"thêm thành công!.",duration:5000,})
              
            })
            this.router.navigate(['admin/listphong'])
            this.router.resetConfig
          },7000)
        }
  }



  checkFormatImage(control: FormControl) {
    const imageFomater = /(\.jpg|\.jpeg|\.png)$/i;
    if (!imageFomater.test(control.value)) {
      return {
        formatimage: true
      }
    }
    return null
  }
  supplementCheckbox(checkBox: any) {
    if (checkBox.target.checked) {
      this.checkSupplement = false
    }
  }

}
