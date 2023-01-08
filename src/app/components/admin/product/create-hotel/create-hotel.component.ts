import { HttpservicesService } from 'src/app/myservice/httpservices.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { NgToastService } from 'ng-angular-popup'
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-hotel',
  templateUrl: './create-hotel.component.html',
  styleUrls: ['./create-hotel.component.css']
})
export class CreateHotelComponent implements OnInit {

  constructor(public router: Router,private httpRequest: HttpservicesService, private toastr: NgToastService, private spiner: NgxSpinnerService) { }

  reactiveForm!: FormGroup
  listAvatars: any[] = []
  listAvatarsXT: any[] = []
  subSupplements:any[]=[]
  yte: boolean = false
  chinhsachhuy: boolean =false
  tiennghi!: any
  checkSupplement: boolean = true
  touching: boolean = false
  checkChinhSachHuy : boolean = true

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      avatar: new FormControl(null, [Validators.required, this.checkFormatImage]),
      avatarXT: new FormControl(null, [Validators.required, this.checkFormatImage]),
      timeDat: new FormControl(null, Validators.required),
      timeTra: new FormControl(null, Validators.required),
      Longitude: new FormControl(null, Validators.required),
      Latitude: new FormControl(null, Validators.required),
      tinh: new FormControl(null, Validators.required),
      huyen: new FormControl(null, Validators.required),
      xa: new FormControl(null, Validators.required),
      sonha: new FormControl(null, Validators.required),
      content: new FormControl(null, Validators.required),
      dienTich: new FormControl(null, Validators.required),
      chinhsach: new FormControl(null, Validators.required),
      treEm : new FormControl(null, Validators.required),
      giaDaoDong: new FormControl(null, Validators.required),
    })
    this.httpRequest.getAllTienNghiKs().subscribe((data: any) => {
      this.tiennghi = data.dataSupplements
    })
  }

  onsubmit() {
    this.touching = true
    let totalTienNghi = 0
    const tiennghi = document.querySelectorAll('.tiennghi')
    const yte = document.querySelectorAll('.yte')
    const cshuy = document.querySelectorAll('.chinhsachhuy')
    const avatars: any = document.querySelector('#avatarInput')
    const avatarsXT: any = document.querySelector('#avatarInputXT')
    let idHost: any = JSON.parse(localStorage.getItem('host')!).id;
    tiennghi.forEach((items: any) => {
      if (items.checked) {
        totalTienNghi += 1
      }
    })

    yte.forEach((items: any) => {
      if (items.checked) {
        this.yte = items.value
      }
    })
    cshuy.forEach((item: any) => {
      if(item.checked) {
        this.chinhsachhuy = item.value
      }
    })
    if(!this.reactiveForm.valid || avatars.files.length==0 || totalTienNghi==0 || avatarsXT.files.length ==0){
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
          for(let initialIndex=0;initialIndex<avatarsXT.files.length;initialIndex++){
            this.httpRequest.sendImage(avatarsXT.files[initialIndex]).subscribe((data:any)=>{
               this.listAvatarsXT.push(data.url)
            })
          } 
          tiennghi.forEach((item:any)=>{
            if(item.checked){
            this.httpRequest.getTienNghiKs({id:item.value}).subscribe((data:any)=>{
                this.subSupplements.push(data.dataSupplements)
            })
            }
          })
          setTimeout(()=>{
            const dataAddForm = {
              idUser:idHost,
              name:this.reactiveForm.get('name')?.value,
              images:this.listAvatars,
              imageConfirm: this.listAvatarsXT,
              TienNghiKS:this.subSupplements,
              dienTich:this.reactiveForm.get('dienTich')?.value,
              tinh:this.reactiveForm.get('tinh')?.value,
              huyen:this.reactiveForm.get('huyen')?.value,
              xa:this.reactiveForm.get('xa')?.value,
              sonha:this.reactiveForm.get('sonha')?.value,
              longitude:this.reactiveForm.get('Longitude')?.value,
              latitude:this.reactiveForm.get('Latitude')?.value,
              timeDat:this.reactiveForm.get('timeDat')?.value,
              timeTra:this.reactiveForm.get('timeTra')?.value,
              mota:this.reactiveForm.get('content')?.value,
              chinhsach:this.reactiveForm.get('chinhsach')?.value,
              yte:this.yte,
              chinhSachHuy: this.chinhsachhuy,
              treEm : this.reactiveForm.get('treEm')?.value,
              giaDaoDong : this.reactiveForm.get('giaDaoDong')?.value,
            }
            this.httpRequest.createHotel(dataAddForm).subscribe((data:any)=>{
              this.reactiveForm.reset()
              tiennghi.forEach((items:any)=>{
                items.checked = false
              })
              yte.forEach((items:any)=>{
                items.checked = false
              })
              this.spiner.hide()
              this.toastr.success({detail:"Success",summary:"thêm thành công!.",duration:5000,})
              
            })
            this.router.navigate(['admin/products'])
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

  checkHuy(checkHuy: boolean){
    this.checkChinhSachHuy = checkHuy
  }
}
