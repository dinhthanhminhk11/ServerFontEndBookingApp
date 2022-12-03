import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import {NgToastService} from 'ng-angular-popup'
import {FormGroup,FormControl,Validators} from '@angular/forms'
import { HttpservicesService } from "src/app/myservice/httpservices.service";
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router,private spinnerService:NgxSpinnerService,private spiner:NgxSpinnerService,private toastr:NgToastService,private http:HttpservicesService) { }
  reactiveForm!:FormGroup
  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      password: new FormControl(null,Validators.required),
      email: new FormControl(null,[Validators.required,Validators.email]),
  })
  }
  showSpinner() {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
    }, 5000);
  }
  onSubmit(){
    if(!this.reactiveForm.valid){
      this.toastr.error({detail:"Notice",summary:'Check!, Your Information is missing.',duration:5000,})
    }else{
      this.spiner.show(undefined,{
        type:'ball-scale-multiple',
      })
      const dataHost = {
        email:this.reactiveForm.get('email')?.value,
        password:this.reactiveForm.get('password')?.value
      }
      this.http.signinHost(dataHost).subscribe(data=>{
        setTimeout(()=>{
          this.spiner.hide()
          localStorage.setItem('host', JSON.stringify(data))
          this.router.navigate(['/admin'])
        },1000)
      },error=>{
        setTimeout(()=>{
          this.spiner.hide()
          switch (error.status) {
            case 404:
              this.toastr.error({detail:"Notice",summary:error.error,duration:6000,})
              break;
            case 400:
              this.toastr.error({detail:"Notice",summary:error.error,duration:6000,})
              break;
            default:
              this.toastr.error({detail:"Notice",summary:'đăng nhập thất bại!',duration:6000,})
              break;
          }
        },2000) 
      }
      )
    }
  }
}
