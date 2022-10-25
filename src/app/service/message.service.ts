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
  public count = new Subject<string>()
  public text = new BehaviorSubject<any>({})

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
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
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

}
