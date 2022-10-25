import { Component, OnInit ,Input, ViewChild} from '@angular/core';
import {io} from 'socket.io-client'
import { MessageService } from 'src/app/service/message.service';
@Component({
  selector: 'app-chat-container',
  templateUrl: './chat-container.component.html',
  styleUrls: ['./chat-container.component.css']
})
export class ChatContainerComponent implements OnInit {
  @ViewChild('mydiv')mydiv:any;

  constructor(private MessageService:MessageService) { }
  public selectedUser={
    message:<any>[],
    User:{
      _id: String, 
      name: String, 
      phone: String, 
      image: String, 
      showScreen:null
    }
  }
  currentUser:any
  roomId:any
  public messageText:String=''
  time=new Date(Date.now()).getHours() +":"+new Date(Date.now()).getMinutes()
  public server = io('http://localhost:8080')
  ngOnInit(): void {
    this.MessageService.text.subscribe((data:any)=>{
      if (Object.keys(data).length !== 0) {
       this.selectedUser = data
        this.roomId = this.selectedUser.User._id
      }
    })
    const getAll = this.MessageService.getAll()
    getAll.subscribe((data:any)=>{
      const stoget =this.MessageService.getStorage()
      if (stoget) {
        this.currentUser = data.data.find((user:any) => user._id === stoget.id)
      }
    })

    this.MessageService.onMessage().subscribe((data: { sender: string;message: string })=>{
      const stoget =this.MessageService.getStorage()
        if (data.sender == this.roomId) {          
          this.selectedUser.message.push({
              fromSelf: false, 
              message: data.message,
              sender:data.sender,
              time_send:this.time
            })
        }
    })
  }
  sendMsg = ()=>{
    this.MessageService.sendMessage({
      user: this.currentUser.name,
      room: this.selectedUser.User._id,
      sender:this.currentUser._id,
      message: this.messageText,
      time_send:this.time
    })
    const a =  this.MessageService.sendMessageDB({
      "to":this.selectedUser.User._id,
      "from":this.currentUser._id,
      "message":this.messageText
    })
    a.subscribe(data=>{
      console.log(data);
    })
    this.selectedUser.message.push({ fromSelf: true, message:this.messageText,sender:this.currentUser._id,time_send:this.time})
    this.messageText = ''
    // this.mydiv.nativeElement.scrollTop=this.mydiv.nativeElement.scrollHeight  
    setTimeout(()=>{ this.mydiv.nativeElement.scrollTop=this.mydiv.nativeElement.scrollHeight   },1)
  }
}
