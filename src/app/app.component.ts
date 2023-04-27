import { Component } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { getAuth } from "firebase/auth";
import { ToDoComponent } from './to-do/to-do.component';
import { Firestore, addDoc, collection, doc, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-fire';
  emailLog:string="";
  psswdLog:string="";
  emailSign:string="";
  psswdSign:string="";
  isLoggedIn:boolean=false;

  constructor(public auth: Auth, private fs:Firestore, private r:Router) {
    this.auth=getAuth();
  }

  
  logInUser() {

      signInWithEmailAndPassword(this.auth, this.emailLog, this.psswdLog)
        .then((userCredential) => {
          const user = userCredential.user;  
          alert('user loged in!');
          this.isLoggedIn=true;
                    
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
  
          alert(errorMessage)
        });
    }
  
    signUpUser(){
      createUserWithEmailAndPassword(this.auth, this.emailSign, this.psswdSign)
        .then((userCredential) => {
          const user = userCredential.user;
          alert('user created!');
          this.isLoggedIn=true;
          const userDocRef = doc(this.fs, 'users', user.uid);
          setDoc(userDocRef, { email: this.emailSign, psswd: this.psswdSign });
          const tasksCollRef = collection(userDocRef, 'tasks');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
  
          alert(errorMessage)
        });
    }
    
    
    signOutUser() {
        signOut(this.auth).then(() => 
        {
          this.isLoggedIn=false;
          window.location.href = '/';
        })
        .catch((error) => {});
        
    }
}