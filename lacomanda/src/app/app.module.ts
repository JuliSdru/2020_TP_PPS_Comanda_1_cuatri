import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


// ACA IMPORTO LA CONFIGURACION DE MI PROYECTO EN LA CUENTA DE FIREBASE.
import { firebaseConfig } from "../environments/environment";


// IMPORTO MODULOS DE ANGULAR
import { AngularFireModule } from "@angular/fire";
import{MenuComponent} from "./componentes/menu/menu.component";

// IMPORTO EL MODULO DE AUTENTIFICACION

import { AngularFireAuthModule} from "@angular/fire/auth";

//importo lo plugin
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';  
import { Platform } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { from } from 'rxjs';

//IMPORT PARA LA BASE DE DATOS
import {AngularFirestore} from "@angular/fire/firestore";
import {AngularFireStorageModule} from "@angular/fire/storage";


//IMPORTAR MAIL
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';

//import { platform } from 'os';

// IMPORTO LO QUE NECESITO PARA QUE FUNCIONEN LOS SENSORES.

//import { AltaClienteComponent } from './componentes/alta-cliente/alta-cliente.component';
//import { AltaClienteService } from './servicios/alta-cliente.service';
//import { Vibration } from '@ionic-native/vibration/ngx';
@NgModule({
  declarations: [AppComponent,
    MenuComponent],
  entryComponents: [],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    FormsModule,
    ReactiveFormsModule,
    AngularFireStorageModule,
    
   // AltaClienteComponent,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule],
  providers: [
    StatusBar,
    Camera,
    Platform,
    SplashScreen,
    BarcodeScanner,
    AngularFirestore,
    EmailComposer,
    Vibration,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
