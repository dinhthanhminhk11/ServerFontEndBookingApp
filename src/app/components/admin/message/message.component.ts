import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/service/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  constructor(private MessageService:MessageService) { }
  currentUser:any
  ngOnInit(): void {
    const getAll = this.MessageService.getAll()
    getAll.subscribe((data:any)=>{
      const stoget =this.MessageService.getStorage()
      if (stoget) {
        this.currentUser = data.data.find((user:any) => user._id === stoget.id)
        if (this.currentUser) {
          this.MessageService.joinRoom(this.currentUser._id)
        }
      }
    })
  }

}
