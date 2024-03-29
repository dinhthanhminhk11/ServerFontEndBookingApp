import { HttpservicesService } from 'src/app/myservice/httpservices.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { NgToastService } from 'ng-angular-popup'
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-phong',
  templateUrl: './update-phong.component.html',
  styleUrls: ['./update-phong.component.css']
})
export class UpdatePhongComponent implements OnInit {

  constructor(public router: Router, private httpRequest: HttpservicesService, private toastr: NgToastService, private spiner: NgxSpinnerService) { }
  reactiveForm!: FormGroup
  listAvatars: any[] = []
  subSupplements: any[] = []
  bedRoom: any[] = []
  checkBedRoom: boolean = true
  loaigiuong!: any
  tiennghi!: any
  checkSupplement: boolean = true
  touching: boolean = false

  dataPhong: any

  idPhong: any

  ngOnInit(): void {

    this.httpRequest.currentIDPhong.subscribe(data => {
      this.idPhong = data
    })
    this.httpRequest.getAllTienNghiPhong().subscribe((data: any) => {
      this.tiennghi = data.dataSupplements
    })
    this.httpRequest.getPhongById({ id: this.idPhong }).subscribe((data: any) => {
      this.dataPhong = data
    })
    this.httpRequest.getAllLoaiGiuong().subscribe((data: any) => {
      this.loaigiuong = data.dataSleeping
    })

    this.reactiveForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      avatar: new FormControl(null, [Validators.required, this.checkFormatImage]),
      price: new FormControl(null, Validators.required),
      sophong: new FormControl(null, Validators.required),
      content: new FormControl(null, Validators.required),
      dienTich: new FormControl(null, Validators.required),
      maxNguoiLon: new FormControl(null, Validators.required),
      maxTreEm: new FormControl(null, Validators.required),
    })

  }

  onsubmit() {
    let totalTienNghi = 0
    let totalBedroom = 0
    const tiennghi = document.querySelectorAll('.tiennghi')
    const avatars: any = document.querySelector('#avatarInput')
    const bedroom = document.querySelectorAll('.bedroom')
    tiennghi.forEach((items: any) => {
      if (items.checked) {
        totalTienNghi += 1
      }
    })
    bedroom.forEach((items: any) => {
      if (items.checked) {
        totalBedroom += 1
      }
    })
    if (avatars.files.length == 0) {
      if (totalTienNghi == 0 || totalBedroom == 0) {
        this.toastr.error({ detail: "Notice", summary: "Check!, Your Information is missing.", duration: 2000, })
        return
      }
      this.spiner.show(undefined, {
        type: 'ball-scale-multiple',
      })
      tiennghi.forEach((item: any) => {
        if (item.checked) {
          this.httpRequest.getTienNghiPhong({ id: item.value }).subscribe((data: any) => {
            this.subSupplements.push(data.dataSupplements)
          })
        }
      })
      bedroom.forEach((item: any) => {
        if (item.checked) {
          this.httpRequest.getBedroomById({ id: item.value }).subscribe((data: any) => {
            this.bedRoom.push(data.dataSleeping)
          })
        }
      })
      setTimeout(() => {
        this.touching = true
        const dataAddForm = {
          _id: this.idPhong,
          name: this.reactiveForm.get('name')?.value,
          price: this.reactiveForm.get('price')?.value,
          images: this.dataPhong.images,
          TienNghiPhong: this.subSupplements,
          dienTich: this.reactiveForm.get('dienTich')?.value,
          SoPhong: this.reactiveForm.get('sophong')?.value,
          mota: this.reactiveForm.get('content')?.value,
          MaxNguoiLon: this.reactiveForm.get('maxNguoiLon')?.value,
          MaxTreEm: this.reactiveForm.get('maxTreEm')?.value,
          bedroom: this.bedRoom,
        }
        this.httpRequest.updatePhong(dataAddForm).subscribe((data: any) => {
          tiennghi.forEach((items: any) => {
            items.checked = false
          })
          bedroom.forEach((items:any)=>{
            items.checked = false
          })
          this.spiner.hide()
          this.toastr.success({ detail: "Success", summary: "sửa thành công!.", duration: 800 })
          this.router.navigate(['admin/listphong'])
          this.router.resetConfig

        })
      }, 1100)


    } else {
      if (!this.reactiveForm.valid || totalTienNghi == 0 || totalBedroom==0) {
        this.toastr.error({ detail: "Notice", summary: "Check!, Your Information is missing.", duration: 6000, })
      } else {
        this.spiner.show(undefined, {
          type: 'ball-scale-multiple',
        })
        for (let initialIndex = 0; initialIndex < avatars.files.length; initialIndex++) {
          this.httpRequest.sendImage(avatars.files[initialIndex]).subscribe((data: any) => {
            this.listAvatars.push(data.url)
          })
        }
        tiennghi.forEach((item: any) => {
          if (item.checked) {
            this.httpRequest.getTienNghiPhong({ id: item.value }).subscribe((data: any) => {
              this.subSupplements.push(data.dataSupplements)
            })
          }
        })
        bedroom.forEach((item: any) => {
          if (item.checked) {
            this.httpRequest.getBedroomById({ id: item.value }).subscribe((data: any) => {
              this.bedRoom.push(data.dataSleeping)
            })
          }
        })
        setTimeout(() => {
          this.touching = true
          const dataAddForm = {
            _id: this.idPhong,
            name: this.reactiveForm.get('name')?.value,
            price: this.reactiveForm.get('price')?.value,
            images: this.listAvatars,
            TienNghiPhong: this.subSupplements,
            dienTich: this.reactiveForm.get('dienTich')?.value,
            SoPhong: this.reactiveForm.get('sophong')?.value,
            mota: this.reactiveForm.get('content')?.value,
            MaxNguoiLon: this.reactiveForm.get('maxNguoiLon')?.value,
          MaxTreEm: this.reactiveForm.get('maxTreEm')?.value,
          bedroom: this.bedRoom,
          }
          this.httpRequest.updatePhong(dataAddForm).subscribe((data: any) => {
            tiennghi.forEach((items: any) => {
              items.checked = false
            })
            bedroom.forEach((items:any)=>{
              items.checked = false
            })
            this.spiner.hide()
            this.toastr.success({ detail: "Success", summary: "sửa thành công!.", duration: 3000, })
            this.router.navigate(['host/listphong'])
            this.router.resetConfig
          })
        }, 4000)
      }
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


  isCheckTienNghi(data: any): Boolean {
    for (let i = 0; i < (this.dataPhong.TienNghiPhong).length; i++) {
      if (data == this.dataPhong.TienNghiPhong[i].name) {
        return true
      }
    }
    return false
  }

  isCheckBedRoom(data: any): Boolean {
    for (let i = 0; i < (this.dataPhong.bedroom).length; i++) {
      if (data == this.dataPhong.bedroom[i].name) {
        return true
      }
    }
    return false
  }

  bedRoomCheckbox(checkBox: any) {
    if (checkBox.target.checked) {
      this.checkBedRoom = false
    }
  }
}
