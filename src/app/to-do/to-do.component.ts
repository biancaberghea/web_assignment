import { Component } from '@angular/core';
import { Task } from '../Models/task';
import { TaskService } from '../Services/task.service';
import { Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent {

  tasks:Task[]=[];
  newT:Task=new Task();
  images: string[] = [
    'https://i0.wp.com/post.healthline.com/wp-content/uploads/2020/07/running_at_sunset-1296x728-header.jpg?w=1155&h=1528',
    'https://www.sbs.com.au/topics/sites/sbs.com.au.topics/files/styles/full/public/gettyimages-1136194757.jpg?itok=apLw4B7V&mtime=1592271942',
    'https://shrm-res.cloudinary.com/image/upload/c_crop,h_705,w_1254,x_0,y_35/w_auto:100,w_1200,q_35,f_auto/v1/News/deciding_who_WFH_pfotmd.jpg'
  ];

  currentIndex = 0;
  subscription: Subscription | undefined;

  constructor(private taskService:TaskService){}

 
  async ngOnInit():Promise<void>{
    this.subscription = interval(3000).subscribe(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    });
    (await this.taskService.getTasks()).subscribe(result=>
      {
        console.log(result);
        this.tasks=result.sort((a:any,b:any)=>a.done-b.done);
      });
  }

  addTask(){
    let newTask= {id:this.newT.id,description:this.newT.description, done:this.newT.done}
    this.newT.description="";
    this.taskService.addTask(newTask);
  }

  changeState(id:string, newState:boolean){
    this.taskService.changeState(id,newState);
  }

  deleteTask(id:string){
    this.taskService.deleteTask(id);
  }

  logOutUser(){
    this.taskService.logOutUser();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  
}
