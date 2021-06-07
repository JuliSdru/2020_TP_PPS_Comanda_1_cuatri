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
//import { IonicPage, NavController } from 'ionic-angular';


@Component({
  selector: 'app-registrar-empleado',
  templateUrl: './registrar-empleado.page.html',
  styleUrls: ['./registrar-empleado.page.scss'],
})
export class RegistrarEmpleadoPage implements OnInit {

 dni : string;
  qr:any;

  //list<UsuarioBD> ;
  pickedName :string;
  Empleado: FormGroup;



    usuarioJson = 
      {nombre : "",
      apellido : "",
      dni : "",
      correo: "",
      contrasenia: "",
      cuil:"",
      foto:"../../../assets/img/avatarRR.png",
      tipo:"",
      estado:0
};
listaPerfiles = [ 
  { perfil : "mozo" },
  { perfil : "cocinero" },
  { perfil : "bartender" },
  { perfil : "metre" }
]

    
    pathImagen : string;

  constructor(
    private camera: Camera,
    public plataform:Platform,
    private bd : DatabaseService,
    private st : AngularFireStorage,
    private complemetos : ComplementosService,
    private auth : AuthService,
    private barcodeScanner: BarcodeScanner,public fb: FormBuilder) {
      this.Empleado = this.fb.group({
        nombre: ['', [Validators.required,Validators.pattern('^[a-zA-Z]{3,10}$')]],
        apellido: ['', [Validators.required,, Validators.pattern('^[a-zA-Z]{3,10}$')]],
        email: ['', [Validators.required, Validators.email]],
        cuil: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]],
        dni: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
        contraseña: ['', [Validators.pattern('^[a-z0-9_-]{6,18}$')]],
      });
     
    }
  
    /*saveData(){
      alert(JSON.stringify(this.todo.value));
    }*/
    

  ngOnInit() {
    this.pickedName = "mozo";
  this.usuarioJson.tipo = this.pickedName;
    
  }


  options : CameraOptions = {
    quality: 40,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true
  }
  pickerUser(pickedName){
    this.listaPerfiles.forEach((usuario) =>{
      if(usuario.perfil == pickedName )
      {
        this.usuarioJson.tipo = pickedName;
      }
    })
  }

  registrarUsuario()
  {
    this.usuarioJson.estado= 2;
    //this.usuarioJson.tipo="empleado";
    if(this.pathImagen != null){
      

      this.st.storage.ref(this.pathImagen).getDownloadURL().then((link) =>
      {

        this.usuarioJson.foto = link;
        this.bd.crear('usuarios',this.usuarioJson);

      });
    }
    else{
      this.bd.crear('usuarios',this.usuarioJson);
    }
    this.auth.registrarUsuario(this.usuarioJson.correo,this.usuarioJson.contrasenia);
    this.complemetos.presentToastConMensajeYColor("¡Empleado registrado con éxito!","tertiary");
    this.limpiar();
    
  }
limpiar(){
  this.usuarioJson.nombre = "";
  this.usuarioJson.apellido = "";
  this.usuarioJson.dni = "";
  this.usuarioJson.correo= "";
  this.usuarioJson.contrasenia= "";
  this.usuarioJson.cuil="";
  this.usuarioJson.foto="../../../assets/img/avatarRR.png";
  this.usuarioJson.tipo=""; 
   this.usuarioJson.estado=0;
}

  tomarFoto()
  {
    this.camera.getPicture(this.options).then((imageData) => {
      //let base64Image = 'data:image/jpeg;base64,' + imageData;
      var base64Str = 'data:image/jpeg;base64,'+imageData;
      this.usuarioJson.foto = base64Str;
      var storageRef = firebase.storage().ref();
     //obtenemos la foto que fue sacada en esen instante
      let obtenerLaFoto = new Date().getTime(); 
      var nombreFoto = "usuarios/"+obtenerLaFoto+"."+this.usuarioJson.dni+".jpg";
      var childRef = storageRef.child(nombreFoto);
      this.pathImagen = nombreFoto;
      childRef.putString(base64Str,'data_url').then(function(snapshot)
      {

      })

    },(Err)=>{
      alert(JSON.stringify(Err));
    })
    
  }


  escanearCodigo()
  {

    let texto;
  //lee el formato del dni que es pdf417
    this.barcodeScanner.scan({formats : "PDF_417"}).
    then(barcodeData => {
      


      texto = barcodeData.text.split("@");
      //alert('dni ' +texto + texto.length);
      if(texto.length==8|| texto.length == 9)
    {
      this.usuarioJson.nombre = texto[2];
       this.usuarioJson.apellido = texto[1];
      this.usuarioJson.dni=texto[4];//el 4 indica el 4to @
      this.complemetos.presentToastConMensajeYColor("¡Se cargaron con exito tus datos!","tertiary");
    }
      

     }).catch(err => {
      this.complemetos.presentToastConMensajeYColor("Hubo un error, intenta más tarde.","warning");
    
     });

  }
 
  /*pickUser(pickedName) {
    this.clientes.forEach((user) => {
      if (user.perfil === pickedName) {
        
        
      }
    });
  }*/
  
  /*checkEmptyInputs() {
    if (this.email && this.psw) {
      return false;
    } else {
      return true;
    }
  }*/
}

