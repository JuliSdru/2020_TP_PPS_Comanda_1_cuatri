import { Component, OnInit , Input} from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ValueAccessor } from '@ionic/angular/directives/control-value-accessors/value-accessor';

import { ToastController } from '@ionic/angular';
import { async } from 'rxjs/internal/scheduler/async';
import { Button } from 'protractor';
import { messaging } from 'firebase';
import { DatabaseService } from 'src/app/servicios/database.service';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.page.html',
  styleUrls: ['./lista-productos.page.scss'],
})
export class ListaProductosPage implements OnInit {
  lista = [];
  bandera="";
  consulta={
    consulta:'',
    mesa:0,
    estado: 'pendiente'
  }
  @Input() tipo;
  constructor(
    private firestore : AngularFirestore,
    public alertController: AlertController ,
    public router : Router,
    public toastController: ToastController,
    private bd : DatabaseService,
  ) { }
  mesa;
  loading = true;
  ngOnInit() {
    this.mesa=localStorage.getItem('mesaCliente');
    // console.log(this.listaProductos);
    setTimeout(() => {
      this.loading = false;
    }, 3000);
   
  }


  listarProductos(pro : string)
  {
    if(pro=="comida")
    {
      this.bandera=pro;
      console.log(this.bandera);
      this.cargarProductos();
    }
    else if(pro=="bebida")
    {
      this.bandera=pro;
      this.cargarProductos();
    }else{
      this.bandera=pro;
      this.cargarProductos();
    }
  }

  cargarProductos()
{
 

  this.firestore.collection('productos').get().subscribe((querySnapShot) => {
    
    querySnapShot.forEach(datos => {


      if(datos.data().tipo === this.bandera){
       // localStorage.setItem('tipocomida',this.bandera);
        let fb = this.firestore.collection('productos');
            
        fb.valueChanges().subscribe(datos =>{       // <-- MUESTRA CAMBIOS HECHOS EN LA BASE DE DATOS.
          
          this.lista = [];
      
          datos.forEach( (dato:any) =>{
      
         this.lista.push(dato);  
            // <--- LISTA DE USUARIOS.
      //console.log(this.lista);
          });
      
        })
      }
        //this.tipo = datos.data().tipo;
       // 
      });
      })

     /* if(this.tipo==this.bandera)
      {
       

      }*/
    
}

  async alert(){


  const alert =  await this.alertController.create({
    cssClass: 'my-custom-class',
    header: ' Consulta',
    inputs: [
      {
        name: 'name1',
        type: 'text',
        placeholder: 'escribe aquí...',
        
      }
    ],
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel',
          cssClass: 'secondary',
          handler: async () => {
            const toast = await this.toastController.create({
              message: 'Consulta cancelada.',
              duration: 2000
            });
            toast.present();
          }
       
        }, {
          text: 'ACEPTAR',
          handler: async (data) => {
            //localStorage.setItem('consulta',data.name1);
            this.enviarConsulta(data.name1,this.mesa);
            const toast = await this.toastController.create({
              message: 'Su consulta fue enviada al mozo con exito!',
              duration: 2000
            });
            toast.present();
          }
        }
      ]
    });
  
    await alert.present();
  
 
  }


  enviarConsulta(consulta,mesa){

    
    this.consulta.consulta=consulta;
    this.consulta.mesa=mesa;     
    this.bd.crear('consultas',this.consulta);
      

  }



}


