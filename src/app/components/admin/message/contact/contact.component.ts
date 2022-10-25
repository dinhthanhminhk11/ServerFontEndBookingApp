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
  a:string = '0'
  public nameUser = ''
  public showScreen = false;
  public phone: string=''; //số điện thoại
  public currentUser:any; // người dùng hiện tại
  selectedUser:any; //chọn người dùng
  constructor(private MessageService:MessageService) { }
  listUser:any = [{}]
  content: string = '';
  ngOnInit(): void {
    const getAll = this.MessageService.getAll()
    getAll.subscribe((data:any)=>{
      const stoget =this.MessageService.getStorage()
      if (stoget) {
        this.currentUser = data.data.find((user:any) => user._id === stoget.id)
        this.listUser = data.data.filter((user:any) => user._id !== stoget.id)
        this.nameUser = this.currentUser.name
      }
    })

  }
  selectUserHandler=(id:any)=>{
    this.selectedUser = this.listUser.find((user:any) => user._id == id);
    if (this.selectedUser) {
      this.a = this.selectedUser._id
      const message = this.MessageService.getMessage().subscribe(data=>{
        const responsevice = data.data
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
            console.log('this.message',this.messageArray);
            
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
