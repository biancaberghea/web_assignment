import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {config} from './config'
import {FirebaseAppModule, initializeApp, provideFirebaseApp} from '@angular/fire/app';
import { ToDoComponent } from './to-do/to-do.component'
import { FormsModule } from '@angular/forms';
import { MatCardModule} from '@angular/material/card';
import { FirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AuthModule } from '@angular/fire/auth';



@NgModule({
  declarations: [
    AppComponent,
    ToDoComponent,
  ],
  imports: [
    provideFirebaseApp(()=>initializeApp(config.firebase)),
    FirebaseAppModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatCardModule,
    FirestoreModule,
    AngularFireAuthModule,
    AuthModule
  ],
  providers: [AuthModule, AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
