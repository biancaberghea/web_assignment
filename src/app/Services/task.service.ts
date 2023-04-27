import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../Models/task';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import { AppComponent } from '../app.component';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private fs:Firestore, private appC:AppComponent) { }

  async getTasks():Promise<Observable<Task[]>>{
    const currentUser = await this.appC.auth.currentUser;
    if (!currentUser) {
      throw new Error('User not authenticated');
    }
    const userId = currentUser.uid;
    const tasksCollection = collection(this.fs, `users/${userId}/tasks`);
    return collectionData(tasksCollection, {idField:'id'}) as Observable<Task[]>;
  }

  async addTask(t:Task){
    const currentUser = await this.appC.auth.currentUser;
    if (!currentUser) {
      throw new Error('User not authenticated');
    }
    const userId = currentUser.uid;
    const tasksCollection = collection(this.fs, `users/${userId}/tasks`);
    addDoc(tasksCollection, t);
  }

  async changeState(id:string, newState:boolean){
    const currentUser = await this.appC.auth.currentUser;
    if (!currentUser) {
      throw new Error('User not authenticated');
    }
    const userId = currentUser.uid;
    const tasksCollection = collection(this.fs, `users/${userId}/tasks`);
    const docRef = doc(tasksCollection, id);
    await updateDoc(docRef, {done:newState});
  }

  async deleteTask(id:string){
    const currentUser = await this.appC.auth.currentUser;
    if (!currentUser) {
      throw new Error('User not authenticated');
    }
    const userId = currentUser.uid;
    const tasksCollection = collection(this.fs, `users/${userId}/tasks`);
    const docRef = doc(tasksCollection, id);
    await deleteDoc(docRef);
  }

  logOutUser(){
    this.appC.signOutUser();
  }
}
