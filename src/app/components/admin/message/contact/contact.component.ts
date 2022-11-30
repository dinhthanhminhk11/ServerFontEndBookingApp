import { Component, OnInit,EventEmitter,Output } from '@angular/core';
import { MessageService } from 'src/app/service/message.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  @Output() onNewEvent = new EventEmitter()
  public roomId: string='';
  public messageText: string=''; //trường lưu  nội dung tin nhắn
  public messageArray: { fromSelf: boolean; message: string,sender:string}[] = []; //mảng lưu dữ liệu tin nhắn
  private storageArray = []; //mảng lưu trữ dữ liệu bên trong localStorage
  public selectedIdUser:string = '0'
  public nameUser = ''
  public showScreen = false;
  public phone: string=''; //số điện thoại
  public currentUser:any; // người dùng hiện tại
  selectedUser:any; //chọn người dùng
  constructor(private MessageService:MessageService) { }
  listUser:any = [{}]
  public filterUser:any
  content: string = '';

  ngOnInit(): void {
    const getAll = this.MessageService.getAll()
    getAll.subscribe((data:any)=>{
      const stoget =this.MessageService.getStorage()
      console.log("data",data);
      
      if (stoget) {
        this.currentUser = data.data.find((user:any) => user._id === stoget.id)
        // this.listUser = data.data.filter((user:any) => user._id !== stoget.id && user.role == 0)
        this.listUser = data.data.filter((user:any) => user._id !== stoget.id)
        this.MessageService.onStatusUser().subscribe((data)=>{
          if (data) {
            this.listUser.find((item:any)=>item._id == data.data._id?item.status =data.data.status:'')
          }
        })
        //status
        this.MessageService.getMessage().subscribe(data=>{
          const listSend = data.data.filter((item:any)=>{
            return item.send === this.currentUser._id ||  item.sendTo === this.currentUser._id&&item.send
          })          
          const s = data.data.filter((item:any)=>{
            return item.sendTo === this.currentUser._id&&item.send
          })
          this.MessageService.Notifications.next(s)
          const list = listSend.map((item:any)=>{
            return item.send
          })
          this.filterUser = this.listUser.filter((item:any)=>list.includes(item._id))       
        })
      }
    })

  }
  selectUserHandler=(id:any)=>{    
    this.selectedUser = this.listUser.find((user:any) => user._id == id);
    if (this.selectedUser) {
      this.selectedIdUser = this.selectedUser._id
      this.MessageService.idUserSlected.next(this.selectedIdUser)
      const message = this.MessageService.getMessage().subscribe(data=>{
        const responsevice = data.data
        //check status
        const status = responsevice.filter((item:any)=>item.status == false&&item.user.includes(this.selectedUser._id)&&item.user.includes(this.currentUser._id))
         if (status.length !== 0) {
          this.MessageService.sendStatus(status)  
          this.MessageService.statusMessage(status).subscribe((data:any)=>{
            console.log(data);
          })
         }        
        //
        const message = responsevice.filter((item:any) => item.user.includes(this.currentUser._id)&&item.user.includes(this.selectedUser._id))
        if (message) {      
          const newMessage = message.map((item:any)=>{
            return {
              fromSelf:item.send === this.currentUser._id,
              message:item.message.text,
              sender:this.currentUser._id,
              time_send:item.time_send
            }
          })
          if (newMessage) {
            this.messageArray = newMessage
            this.MessageService.text.next({
              message:this.messageArray,
              User:{...this.selectedUser,showScreen:true}
            })
          }        
        }
      })
    }
  }
} 
