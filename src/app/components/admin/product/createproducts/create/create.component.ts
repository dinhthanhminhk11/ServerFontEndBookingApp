import { HttpservicesService } from 'src/app/myservice/httpservices.service';
import { Component, OnInit} from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import {FormGroup,FormControl,Validators} from '@angular/forms'
import {NgToastService} from 'ng-angular-popup'
import { from } from 'rxjs';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  constructor(private httpRequest:HttpservicesService,private toastr:NgToastService,private spiner:NgxSpinnerService) { }
  isApiLoaded = false;
  options: any = {
    componentRestrictions: { country: 'IN' }
  }
  touching:boolean=false
  checkSleeping:boolean=true
  checkSupplement:boolean=true
  checkBathroom:boolean=true
  // proAddress: string = ''
  // proLatitude: string = ''
  // proLongitude: string = ''
  supplements!:any
  sleepingPlaces!:any
  bathRooms:any
  yte:boolean=false
  subSupplements:any[]=[]
  subSleepPlaces:any[]=[]
  subBathrooms:any[]=[]
  categorys!:any
  listAvatars:any[]=[]
  reactiveForm!:FormGroup
  ngOnInit(): void {
      this.reactiveForm = new FormGroup({
        name: new FormControl('',[Validators.required,Validators.minLength(5)]),
        price: new FormControl(null,Validators.required),
        avatar: new FormControl(null,[Validators.required,this.checkFormatImage]),
        category: new FormControl(null,Validators.required),
        houropening: new FormControl(null,Validators.required),
        hourending: new FormControl(null,Validators.required),
        place: new FormControl(null,Validators.required),
        Longitude: new FormControl(null,Validators.required),
        Latitude: new FormControl(null,Validators.required),
        limitPerson: new FormControl(null,Validators.required),
        content: new FormControl(null,Validators.required),
        legal: new FormControl(null,Validators.required),

    })
    this.httpRequest.getSleepingPlaces().subscribe((data:any)=>{
      this.sleepingPlaces = data.dataSleeping
    })

    this.httpRequest.getSupplement().subscribe((data:any)=>{
      this.supplements = data.dataSupplements
    })
    this.httpRequest.getCategorys().subscribe((data:any)=>{
      this.categorys = data
    })
    this.httpRequest.getBathrooms().subscribe((data:any)=>{
      this.bathRooms = data.databaths
    })
  }
  onsubmit(){
    this.touching=true
    let totalSupplements = 0
    let totalSleepings = 0
    let totalBathrooms = 0
    const sleepingPlaces = document.querySelectorAll('.sleepingPlaces')
    const supplements = document.querySelectorAll('.supplements')
    const bathrooms = document.querySelectorAll('.bathrooms')
    const yte = document.querySelectorAll('.yte')
    const avatars:any = document.querySelector('#avatarInput')
    let idHost:any = localStorage.getItem('host')
        idHost = JSON.parse(idHost).id
    sleepingPlaces.forEach((items:any)=>{
      if(items.checked){
        totalSleepings+=1
      }
    })
    supplements.forEach((items:any)=>{
      if(items.checked){
        totalSupplements+=1
      }
    })
    bathrooms.forEach((items:any)=>{
      if(items.checked){
        totalBathrooms+=1
      }
    })
    yte.forEach((items:any)=>{
      if(items.checked){
        this.yte = items.value
      }
    })

    if(totalSleepings==0 && totalSupplements==0){
      this.checkSleeping=true
      this.checkSupplement=true
    }if (totalSleepings>0 && totalSupplements>0) {
      this.checkSleeping=false
      this.checkSupplement=false
    } 
    else{
      if(totalSupplements==0){
        this.checkSupplement=true
      }else{
        this.checkSleeping=true
      }
    }
    if(!this.reactiveForm.valid || avatars.files.length==0 || totalSleepings==0 || totalSupplements==0 || totalBathrooms==0){
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
          sleepingPlaces.forEach((item:any)=>{
            if(item.checked){
            this.httpRequest.getSleepById({id:item.value}).subscribe((data:any)=>{
              this.subSleepPlaces.push(data.dataSleeping)
            })
            }
          })
          supplements.forEach((item:any)=>{
            if(item.checked){
            this.httpRequest.getSupplements({id:item.value}).subscribe((data:any)=>{
                this.subSupplements.push(data.dataSupplements)
            })
            }
          })
          bathrooms.forEach((item:any)=>{
            if(item.checked){
            this.httpRequest.getBathroomById({id:item.value}).subscribe((data:any)=>{
                this.subBathrooms.push(data.dataBaths)
            })
            }
          })
          setTimeout(()=>{
            const dataAddForm = {
              name:this.reactiveForm.get('name')?.value,
              images:this.listAvatars,
              price:this.reactiveForm.get('price')?.value,
              supplement:this.subSupplements,
              nameLocation:this.reactiveForm.get('place')?.value,
              longitude:this.reactiveForm.get('Longitude')?.value,
              latitude:this.reactiveForm.get('Latitude')?.value,
              category:this.reactiveForm.get('category')?.value,
              opening:this.reactiveForm.get('houropening')?.value,
              ending:this.reactiveForm.get('hourending')?.value,
              limitPerson:this.reactiveForm.get('limitPerson')?.value,
              content:this.reactiveForm.get('content')?.value,
              legal:this.reactiveForm.get('legal')?.value,
              bathroom:this.subBathrooms,
              yte:this.yte,
              user:idHost,
              sleepingPlaces:this.subSleepPlaces
            }
            this.httpRequest.createPro(dataAddForm).subscribe((data:any)=>{
              this.reactiveForm.reset()
              sleepingPlaces.forEach((items:any)=>{
                  items.checked = false
              })
              supplements.forEach((items:any)=>{
                items.checked = false
              })
              bathrooms.forEach((items:any)=>{
                items.checked = false
              })
              yte.forEach((items:any)=>{
                items.checked = false
              })
              this.spiner.hide()
              this.toastr.success({detail:"Success",summary:"thêm sản phẩm thành công!.",duration:5000,})
            })
          },7000)
        }
  }
  checkFormatImage(control:FormControl){
    const imageFomater =/(\.jpg|\.jpeg|\.png)$/i;
    if(!imageFomater.test(control.value)){
      return {
       formatimage:true
      }
    }
    return null
  }
  sleepingCheckbox(checkBox:any){
    if(checkBox.target.checked){
      this.checkSleeping=false
    }
  }
  supplementCheckbox(checkBox:any){
    if(checkBox.target.checked){
      this.checkSupplement=false
    }
  }
}