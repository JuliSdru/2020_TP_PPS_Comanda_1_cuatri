import { Component, OnInit } from '@angular/core';
import { Camera , CameraOptions} from '@ionic-native/camera/ngx';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.page.html',
  styleUrls: ['./encuesta.page.scss'],
})

  
export class EncuestaPage implements OnInit {
  
  encuesta : boolean = true;
  habilitado : boolean = false;
  habilitado2:boolean = false;
  cantidad : number = 0;
  fotos = [];
  loading = true;
  options : CameraOptions
  constructor(private camara : Camera,private toast : ToastController) { }

  ngOnInit() {
    this.options= {
      quality: 40,
      destinationType: this.camara.DestinationType.DATA_URL,
      encodingType: this.camara.EncodingType.JPEG,
      mediaType: this.camara.MediaType.PICTURE,
      correctOrientation: true
    }
    setTimeout(() => {
      this.loading = false;
    }, 3000);
  }

  tomarFoto(){
    
    if(this.cantidad < 3){
      this.camara.getPicture(this.options).then((imageData) => {
        let base64Image = 'data:image/jpeg;base64,' + imageData;
        this.fotos.push(base64Image);
        this.cantidad++;
        console.log("Cantidad:" + this.cantidad);
      }, (err) => {
        console.log(err);
      });
    }
    else{
      console.log("Solo se puede 3 fotos como máximo");
      this.presentToast();
    }
   
  }
  async presentToast() {
    const toast = await this.toast.create({
      message: 'Solo se permite sacar 3 fotos como máximo',
      duration: 3000,
      color : "danger"
    });
    toast.present();
  }
  enviarEncuesta(){
    this.encuesta = false;
  }

  


}