import { Component, OnInit, Input } from '@angular/core';
import{ DatabaseService } from "../../servicios/database.service";
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';  
import { Platform, LoadingController, ToastController, AlertController } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { from } from 'rxjs';
import { UsuarioBD } from "../../clases/usuario-bd";
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule} from '@angular/forms';
import * as firebase from 'firebase/app';
import {AngularFireStorage} from "@angular/fire/storage"
import { ComplementosService } from 'src/app/servicios/complementos.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';
//import { IonicPage, NavController } from 'ionic-angular';

@Component({
  selector: 'app-alta-mesa',
  templateUrl: './alta-mesa.page.html',
  styleUrls: ['./alta-mesa.page.scss'],
})
export class AltaMesaPage implements OnInit {

 
  pickedName : string;
  miFormulario : FormGroup;

  mesaJson = {
    numero : "",
    comensales : "",
    tipo : "",
    foto :  "",
  };


  pathImagen : string;

  listaTipo = [ 
    { tipo : "sector fumador" },
    { tipo : "sector no fumador" },
    
  ]

  constructor(
    private barcodeScanner : BarcodeScanner,
    private camera : Camera,
    private bd : DatabaseService,
    private formBuilder: FormBuilder,
    private st : AngularFireStorage,
    private complemetos : ComplementosService,
    private toastController: ToastController,
    public alertController: AlertController ,
    public router : Router,
    public loadingController: LoadingController
    ) {
      this.miFormulario = this.formBuilder.group({
        comensales: ['', [Validators.required, Validators.pattern('^[0-9]{1}$')]],
        numero: ['', [Validators.required, Validators.pattern('^[0-9]{1}$')]],
     });
   }
   
  ngOnInit() {
  
    this.pickedName = "sector no fumador";

  }

  pickerUser(pickedName){
    this.listaTipo.forEach((mesa) =>{
      if(mesa.tipo == pickedName && pickedName == "sector no fumador")
      {
        this.mesaJson.tipo = pickedName;
      }
      else{
        this.mesaJson.tipo = pickedName;
      }
    })
  }


  async registrar()
  {
    if(this.pathImagen != null){   

      this.st.storage.ref(this.pathImagen).getDownloadURL().then((link) =>
      {

        this.mesaJson.foto = link;
        this.bd.crear('mesas',this.mesaJson);

      });

    }
    else
    {
      this.bd.crear('mesas',this.mesaJson);

    }
   
  
    this.complemetos.presentToastConMensajeYColor("La mesa ha sido registrada","primary");
  }
 
  tomarFotografia()
  {
    const options: CameraOptions =  { 
      quality:100,
      targetHeight:600,
      targetWidth:600,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    }

    this.camera.getPicture(options).then((imageData)=> {

      var base64Str = 'data:image/jpeg;base64,'+imageData;
      
      //Para que la fotografia se muestre apenas se tomo
      this.mesaJson.foto = base64Str;

      var storageRef = firebase.storage().ref();
     
      let obtenerMili = new Date().getTime(); 

      var nombreFoto = "usuarios/"+obtenerMili+"."+this.mesaJson.tipo+".jpg";

      var childRef = storageRef.child(nombreFoto);

      this.pathImagen = nombreFoto;

      childRef.putString(base64Str,'data_url').then(function(snapshot)
      {

      })

    },(Err)=>{
      alert(JSON.stringify(Err));
    })
    
  }


}