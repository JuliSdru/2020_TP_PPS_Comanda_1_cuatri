import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AngularFirestore } from '@angular/fire/firestore';
import { DatabaseService } from '../../servicios/database.service';
import { ComplementosService } from 'src/app/servicios/complementos.service';
@Component({
  selector: 'app-pedir-mesa',
  templateUrl: './pedir-mesa.page.html',
  styleUrls: ['./pedir-mesa.page.scss'],
})
export class PedirMesaPage implements OnInit {

  perfilUsuario : string;
  listaUsuarios = [];
  listaEspera = [];
  tieneCorreo: string;
  correoUsuario;
  nombreAnonimo;
bandera=true;
loading = true;
usuarioMesa= {
  mesa : 0,
  estadoMesa : "",
  nombreUsuario: "",
  perfilUsuario : "",
}
  constructor(
    private complementos : ComplementosService,
    private barcodeScanner : BarcodeScanner,
    private firestore : AngularFirestore,
    private bd : DatabaseService
  ) { }

  
 

  ngOnInit() {
   
    this.nombreAnonimo = localStorage.getItem('nombreAnonimo');
    this.correoUsuario = localStorage.getItem('correoUsuario');
    setTimeout(() => {
      this.loading = false;
    }, 3000);
  }


  listaEsperaQR()
  {
    let auxMesa;
    this.barcodeScanner.scan().then(barcodeData => {

      auxMesa= JSON.parse(barcodeData.text);
     
    
    this.firestore.collection('usuarios').get().subscribe((querySnapShot) => {
      querySnapShot.forEach((doc) => {

        if(doc.data().correo == this.correoUsuario)
        {
          
          switch(auxMesa) // CAMBIAR ESTO SI NO FUNCIONA
          {
            case 0:

              
                this.usuarioMesa.nombreUsuario = doc.data().nombre;
              this.usuarioMesa.estadoMesa = "enEspera";
              this.usuarioMesa.perfilUsuario = doc.data().perfil;
              this.bd.crear('listaEspera', this.usuarioMesa);
              this.complementos.presentToastConMensajeYColor('Estas en la lista de espera',"tertiary");
              
              
            break;

            default:
              this.complementos.presentToastConMensajeYColor('Error! QR incorrecto, este QR no corresponde al qr de la entrada',"warning");
              
            break;
          }
        }
          
          this.listaEspera = []; 

      })

    })

     }).catch(err => {
         console.log('Error', err);
         this.complementos.presentToastConMensajeYColor('Error al usar el Qr scanner',"warning");
     });  
   
}

}
