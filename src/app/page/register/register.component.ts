import { MoveDirection, ClickMode, HoverMode, OutMode } from "tsparticles-engine";
import {NgToastService} from 'ng-angular-popup'
import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms'
import type { Engine } from "tsparticles-engine";
import {loadFull} from "tsparticles"
import { HttpservicesService } from "src/app/myservice/httpservices.service";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private toastr:NgToastService, private http:HttpservicesService,private spiner:NgxSpinnerService,private router:Router) { }
  reactiveForm!:FormGroup
  title='spiner'
  spinerType!:string
  spinerName!:string
  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
        name: new FormControl('',[Validators.required,Validators.minLength(5)]),
        phone: new FormControl('',[Validators.required,this.formatPhoneNumber]),
        password: new FormControl(null,Validators.required),
        address: new FormControl(null,Validators.required),
        idcard: new FormControl(null,Validators.required),
        email: new FormControl(null,[Validators.required,Validators.email]),
        avatar: new FormControl(null,[Validators.required,this.checkFormatImage]),
        agree:new FormControl(null,Validators.required)
    })
  }

  id = "tsparticles";
  options = {
    background: {
      color: {
        value: "#0d47a1"
      }
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: ClickMode.push
        },
        onHover: {
          enable: true,
          mode: HoverMode.repulse
        },
        resize: true
      },
      modes: {
        push: {
          quantity: 4
        },
        repulse: {
          distance: 200,
          duration: 5000
        }
      }
    },
    particles: {
      color: {
        value: "#ffffff"
      },
      links: {
        color: "#ffffff",
        distance: 150,
        enable: true,
        opacity: 0.3,
        width: 0.5
      },
      collisions: {
        enable: true
      },
      move: {
        direction: MoveDirection.none,
        enable: true,
        outModes: {
          default: OutMode.bounce
        },
        random: true,
        speed: 3,
        straight: false
      },
      number: {
        density: {
          enable: false,
          area: 800
        },
        value: 80
      },
      opacity: {
        value: 0.5
      },
      shape: {
        type: "circle"
      },
      size: {
        value: {min: 1, max: 5 },
      }
    },
    detectRetina: true
  };
  async particlesInit(engine: Engine): Promise<void> {
    await loadFull(engine);
  }
  onsubmit(){
    if(!this.reactiveForm.valid){
      this.toastr.error({detail:"Notice",summary:'Check!, Your Information is missing.',duration:5000,})
    }else{
      this.spiner.show(undefined,{
        type:'ball-scale-multiple',
      })
      const pic:any = document.querySelector('#avatarInput')
      this.http.sendImage(pic.files[0]).subscribe((data:any)=>{
          const dataHost = {
            name:this.reactiveForm.get('name')?.value,
            phone:this.reactiveForm.get('phone')?.value,
            email:this.reactiveForm.get('email')?.value,
            password:this.reactiveForm.get('password')?.value,
            address:this.reactiveForm.get('address')?.value,
            image:data.url,
            idcard:this.reactiveForm.get('idcard')?.value
            }
           this.http.createHost(dataHost).subscribe(
              result => {
                setTimeout(()=>{
                  this.reactiveForm.reset()
                  this.spiner.hide()
                  this.toastr.success({detail:"Success",summary:'đăng ký tài khoản thành công!',duration:2000})
                  setTimeout(()=>{
                    this.router.navigate(['/'])
                  },3000)
                },1000)
              },
              error => {
                setTimeout(()=>{
                  this.spiner.hide()
                  console.log(error);
                  if(error.status==400){
                    this.toastr.error({detail:"Notice",summary:error.error,duration:6000,})
                  }else{
                    this.toastr.error({detail:"Notice",summary:'đăng ký thất bại',duration:6000,})
                  }
                },3000) 
              }
            )
          },
          error=>{
            this.toastr.error({detail:"Notice",summary:"error upload ảnh!",duration:5000,})
          }
        )
      }
      
  }
  // checknumeric(control:FormControl){
  //   if(isNaN(control.value)==true){
  //     return {
  //       notnumber:true
  //     }
  //   }
  //   return null
  // }
  formatPhoneNumber(control:FormControl){
    const reGex = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/
    if(!reGex.test(control.value)){
      return {
       formatnumber:true
      }
    }
    return null
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
}
