import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client';



@Injectable({
  providedIn: 'root'
})

export class MessageService {
  API = 'http://localhost:8080/api/Message'
  public url = 'http://localhost:8080/';
  private socket: Socket;
  constructor(private httpRequests:HttpClient) {
    this.socket = io(this.url, {transports: ['websocket', 'polling', 'flashsocket']})
  }
  public text = new BehaviorSubject<any>({})
  public nameUser = new BehaviorSubject<String>('')
  public Notifications =new BehaviorSubject<any>({})
  public ListUser:any = [{}]
  public content:any
  public idUserSlected = new BehaviorSubject<String>('') 
  public a =new BehaviorSubject<any>({})
  getAll(){
    return this.httpRequests.get<any>(`${this.API}/getUser`)
  }
  getStorage() {
    const storage = localStorage.getItem('host');
    return storage ? JSON.parse(storage) : [];
  }
  getMessage():Observable<any>{
    return this.httpRequests.get<any>(`${this.API}/getmsg`)
  }
  onMessage(): Observable<any>{
    return new Observable<{user: string, message: string}>(observer => {
      this.socket.on('new message', (data) => {
        this.content = data
        observer.next(data);  
      });

      return () => {
      }
    });
  }
  sendMessage(data:any){
    this.socket.emit('message',data)
  }
  sendMessageDB(data:any):Observable<any>{
    return this.httpRequests.post<any>('http://localhost:8080/api/Message/addmsg',data)
  }
  joinRoom(id:any){
    this.socket.emit('join', id);
  }
  show(data?:any){
    return data
  }
  onStatusMessage(): Observable<any>{
    return new Observable<any>(observer => {
      this.socket.on('statusMsg', (data) => {
        observer.next(data);
      });
    });
  }
  sendStatus(data:any){
    const [{sendTo}] = data
    let idMessage:any =[]
    data.forEach((item:any) => {
      idMessage.push(item._id)
    });
    const datas = {
      sendTo:sendTo,
      idMessage:idMessage
    }
    this.socket.emit('statusMessage',datas)
  }
  statusMessage(data:any):Observable<any>{
   return this.httpRequests.post<any>('http://localhost:8080/api/Message/statusMessage',data)
  }
  sendNotification(data:any){
    this.socket.emit('sendNotification',data)
  }
  Notification(): Observable<any>{
    return new Observable<any>(observer => {
      this.socket.on('Notification', (data) => {
        console.log('this.a',this.a); 
        observer.next(data);
      });
    });
  }
  //status User
  statusUser(id:String):Observable<any>{
    const data = {
      _id:id,
      status:"true"
    } 
    this.socket.emit('statusUser',data)
    return this.httpRequests.put<any>(`http://localhost:8080/api/statusUser/${id}`,data)
  }
  lougout(id:String):Observable<any>{
    const data = {
      _id:id,
      status:"false"
    } 
    this.socket.emit('disconnectUser',data)
    return this.httpRequests.put<any>(`http://localhost:8080/api/statusUser/${id}`,data)
  }
  onStatusUser(): Observable<any>{
    return new Observable<any>(observer => {
      this.socket.on('activeStatus', (data) => {
        observer.next(data);
      });
    });
  }
}

