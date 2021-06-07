import { Component, OnInit, Input } from '@angular/core';
import{ DatabaseService } from "../../servicios/database.service";
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';  
import { Platform } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { from } from 'rxjs';
import { UsuarioBD } from "../../clases/usuario-bd";
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule} from '@angular/forms';
import * as firebase from 'firebase/app';
import {AngularFireStorage} from "@angular/fire/storage"
import { ComplementosService } from 'src/app/servicios/complementos.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { HashLocationStrategy } from '@angular/common';
//import { IonicPage, NavController } from 'ionic-angular';


@Component({
  selector: 'app-alta-producto',
  templateUrl: './alta-producto.page.html',
  styleUrls: ['./alta-producto.page.scss'],
})
export class AltaProductoPage implements OnInit {

  qrScan:any;

  pickedName : string;
  miFormulario : FormGroup;
  //pathImagen : string;
  // Transforme al pathImagen en array
  pathImagen : any; 

  productoJson = {
    nombre : "",
    descripcion : "",
    tiempo : "",
    precio : "",
    tipo : "",
    fotos : [],
  };

  listaProductos = [ 
    { tipo : "plato" },
    { tipo : "bebida" },
    {tipo: "postre"}
  ]

  constructor(
    private barcodeScanner : BarcodeScanner,
    private camera : Camera,
    private bd : DatabaseService,
    private formBuilder: FormBuilder,
    private st : AngularFireStorage,
    private complemetos : ComplementosService) {
      this.miFormulario = this.formBuilder.group({
        nombre: ['', [Validators.required, Validators.pattern('^[a-zA-Z_-]{3,10}$')]],
        descripcion: ['', [Validators.required, Validators.pattern('^[a-zA-Z ,]{3,100}$')]],
        tiempo: ['', [Validators.required, Validators.pattern('^[0-9]{2}$')]],
        precio :  ['', [Validators.required, Validators.pattern('^[0-9]{2,4}$')]],
     });
   }

  ngOnInit() {
    this.pickedName = "plato";
  }



  registrarProducto()
  {
    if(this.pathImagen != null && this.pathImagen.length==3)
    {   
      this.pathImagen.forEach(data =>{
        this.st.storage.ref(data).getDownloadURL().then((link) =>
          {
             this.productoJson.fotos.push(link);
             if(this.productoJson.fotos.length==3)
             {
                this.pathImagen=null;
                this.bd.crear('productos',this.productoJson);
             }         
      });
    })
    
    }
    else
    {
      if(this.productoJson.fotos.length==3)
      {
       
      }
      else
      {
        this.productoJson.fotos.push("../../../assets/img/icon.png");
        this.productoJson.fotos.push("../../../assets/img/icon.png");
        this.productoJson.fotos.push("../../../assets/img/icon.png");

        this.bd.crear('productos',this.productoJson);
        
        this.complemetos.presentToastConMensajeYColor("¡El producto se creo con exito!","primary");
        
        this.productoJson.fotos.pop();
        this.productoJson.fotos.pop();
        this.productoJson.fotos.pop();

      }
     

    }

  }


  tomarFotografia()
  {
    if(this.productoJson.fotos.length<=3)
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
  
        var storageRef = firebase.storage().ref();
       
        let obtenerMili = new Date().getTime(); 
  
        var nombreFoto = "productos/"+obtenerMili+"."+this.productoJson.nombre+".jpg";
  
        var childRef = storageRef.child(nombreFoto);
  
       this.pathImagen.push(nombreFoto);
  
        childRef.putString(base64Str,'data_url').then(function(snapshot)
        {
  
        })
  
      },(Err)=>{
        alert(JSON.stringify(Err));
      })
      
    }else
    {
      this.complemetos.presentToastConMensajeYColor("No se puede cargar mas fotos","primary");
    }


    }
    

    

  pickerUser(pickedName){
    this.listaProductos.forEach((producto) =>{
      if(producto.tipo == pickedName )
      {
        this.productoJson.tipo = pickedName;
      }
    })
  }


}