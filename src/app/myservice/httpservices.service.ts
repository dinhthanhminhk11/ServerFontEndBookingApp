import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpservicesService {

  constructor(private httpRequests:HttpClient) { }
  API = 'http://localhost:8080/api'
  createHost(dataHost:any):Observable<any[]>{
    return this.httpRequests.post<any[]>(`${this.API}/host/signup`,dataHost)
  }
  signinHost(dataHost:any):Observable<any[]>{
    return this.httpRequests.post<any[]>(`${this.API}/host/signin`,dataHost)
  }
  sendImage(file:any):Observable<any[]>{
    const CLOUDINARY_NAME = "dl4lo9r1y"
    const CLOUDINARY_API = `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`
    const CLOUDINARY_PRESET = "u5cbpgjr"
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", CLOUDINARY_PRESET)
    return this.httpRequests.post<any[]>(CLOUDINARY_API,formData)
  }
  
  getSupplement():Observable<any[]>{
    return this.httpRequests.get<any[]>(`${this.API}/suplements`)
  }
  getSleepingPlaces():Observable<any[]>{
    return this.httpRequests.get<any[]>(`${this.API}/sleeping`)
  }
  getCategorys():Observable<any[]>{
    return this.httpRequests.get<any[]>(`${this.API}/listCategory`)
  }
  getSupplements(listIdSupplements:any):Observable<any[]>{
    return this.httpRequests.post<any[]>(`${this.API}/getsupplements`,listIdSupplements)
  }
  getSleepById(listIdSleeping:any):Observable<any[]>{
    return this.httpRequests.post<any[]>(`${this.API}/sleepingplaces`,listIdSleeping)
  }
  getBathrooms():Observable<any[]>{
    return this.httpRequests.get<any[]>(`${this.API}/bathrooms`)
  }
  getBathroomById(listIdBath:any):Observable<any[]>{
    return this.httpRequests.post<any[]>(`${this.API}/bathrooms`,listIdBath)
  }
  createPro(dataPro:any):Observable<any[]>{
    return this.httpRequests.post<any[]>(`${this.API}/addProduct`,dataPro)
  }
}