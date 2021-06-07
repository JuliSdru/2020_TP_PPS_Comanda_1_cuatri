import { Component } from '@angular/core';


// IMPORTO EL ROUTER COMO ULTIMO PASO.
import { Router } from "@angular/router";
import { MenuController, AlertController } from '@ionic/angular';


import { async } from '@angular/core/testing';
import {AngularFirestore} from "@angular/fire/firestore";
import { DatabaseService } from '../servicios/database.service';
import { AuthService } from '../servicios/auth.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ComplementosService } from '../servicios/complementos.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  banderaPerfilCliente=true;
  mostrarP= false;
  menuMozo=true;
  mesaP;
  perfilUsuario : string;
  banderaMostrarCuentasPagadas = false;
  listaCuentasPagadas = [];
  listaUsuarios = [];
  listaEspera = [];
  tieneCorreo: string;
  nombreAnonimo;
  loading = true;
  correoCliente ;
  jsonEncuesta ={
    preguntaUno: 0,
    preguntaDos: 0,
    fotos : [],
  }
  mostrarSolicitudPago=false;
 solicitudPago=false;
  gradoSatisfaccion ;
  gradoSatisfaccionRes;
    // Mensaje avisando al cliente  su asignacion de mesa
    informarEstadoMesa ={
      mesa: '',
      seAsignoMesa : "no",
    };
    mostrarEncuestaBoton = false;

    mostrarCuentaDiv = false;
    mostrarEncuestaDiv = false;
  
   
  constructor(private router : Router,
    private barcodeScanner : BarcodeScanner,
    private menu: MenuController,
    private firestore : AngularFirestore,
      private bd : DatabaseService,
      private auth : AuthService,
      public alertController: AlertController,
      private complementos : ComplementosService,
      
      ) {  }
listarConsulta=[];

mostrarConsulta= false;
      usuarioMesa = {
        mesa : 0,
        estadoMesa : "",
        nombreUsuario: "",
        apellidoUsuario: "",
        perfilUsuario : "",
      }
      pedidoPendiente=false;
      pedidoEnproceso=false;
      pedidoFinalizado=false;
      cantConsulta=0;
      mostrarEstadoPedido=false;
      infoUsuario : any;
      foto;
      qrBandera=true;
    nombre:string;
    qrPedido=false;
    correoUsuario : string;
    cantPedido=0;
    cantPedidoPagadas=0;
    cantPedidoenProceso=0
    cantPedidoCocinero=0
    cantPedidoBartender=0
    listaPedido=[];
    listaPedidoCocinero=[];
    listaPedidoBartender=[];
  listaPedidoListo=[];
  listaPedidoenProceso = [];
     // Variable que nos mostrara los productos una vez escaneado el codigo qr
  mostrarProductos = false;
  mesa:string;
  banderaMesaAsignada= true;
      mesaPedido= '';
      mostrarItem=true;
      mostrarEncuesta= false;
      ocultarqr=false;
  // Lista de los productos que se mostraran
 //listaProductos = [];

      ngOnInit() {
this.mesa='';
this.menuMozo=true;
this.mesaPedido=localStorage.getItem('pedidoHecho');
console.log(this.mesaPedido)

  


        let fb = this.firestore.collection('pedidos');
   
        fb.valueChanges().subscribe(datos =>{      
          
          this.listaPedido = [];
          this.listaPedidoListo = [];
          this.listaPedidoenProceso = [];
          this.listaPedidoCocinero=[];
    this.listaPedidoBartender=[];
    
          datos.forEach( (dato:any) =>{
    
            if(dato.estado === 'pendiente') 
            {
              this.listaPedido.push(dato); 
             
            }
            if(dato.estado  == 'enProceso' && dato.estadoChef === 'pendiente') 
            {
              this.listaPedidoCocinero.push(dato); 
             
            }
            if(dato.estado  == 'enProceso' && dato.estadoBartender === 'pendiente') 
            {
              this.listaPedidoBartender.push(dato); 
             
            }
/*if(dato.estado=='enProceso'){
  
}*/
            if(dato.estado  == 'enProceso' && dato.estadoChef == 'listo' && dato.estadoBartender == 'listo') 
            {
              this.listaPedidoenProceso.push(dato);     
            }
            if(dato.estado === 'pagado') 
            {
              this.listaCuentasPagadas.push(dato);     
            }
            
          });
          this.cantPedido=this.listaPedido.length;
          this.cantPedidoenProceso=this.listaPedidoenProceso.length;
          this.cantPedidoPagadas=this.listaCuentasPagadas.length;
          this.cantPedidoCocinero= this.listaPedidoCocinero.length;
          this.cantPedidoBartender= this.listaPedidoBartender.length;
        })
        
        //console.log(this.cantPedido)
        //this.cantPedidoListo=this.listaPedidoListo.length;




        this.firestore.collection('consultas').get().subscribe((querySnapShot) => {
    
          querySnapShot.forEach(dato => {
      
            if(dato.data().estado == 'pendiente')
            {
             this.listarConsulta.push(dato);
            }
      
          })
          this.cantConsulta=this.listarConsulta.length;
        
        });
  
           let auxCorreoUsuario = localStorage.getItem('correoUsuario'); 
           console.log("correo en home"+auxCorreoUsuario)// Obtenemos el correo del usuario que ingreso 
          
           this.firestore.collection('usuarios').get().subscribe((querySnapShot) => {
    
            querySnapShot.forEach(datos => {
      
              if(datos.data().correo == auxCorreoUsuario )
              {
                this.perfilUsuario = datos.data().perfil;
                this.foto = datos.data().foto;
                console.log(datos.data());
                this.nombre= datos.data().nombre;
                localStorage.setItem('nombreAnonimo',this.nombre);
                this.infoUsuario = datos.data();
                console.log("infoUsuario"+this.infoUsuario)
        
                if(this.perfilUsuario == 'dueño' || this.perfilUsuario == 'supervisor')
                {
                  // Voy a obtener la colección de usuarios y la guardo en FB.
                  console.log("Estoy aca dentro");
                let fb = this.firestore.collection('usuarios');
                  
          
                // Me voy a suscribir a la colección, y si el usuario está "ESPERANDO", se va a guardar en una lista de usuarios.
                fb.valueChanges().subscribe(datos =>{       // <-- MUESTRA CAMBIOS HECHOS EN LA BASE DE DATOS.
                  
                  this.listaUsuarios = [];
          
                  datos.forEach( (dato:any) =>{
          
                    if(dato.estado == 1) // Verifico que el estado sea esperando.
                    {
                      this.listaUsuarios.push(dato);      // <--- LISTA DE USUARIOS.
                    }
                    
                  });
          
                })
                }
          
                // Si el perfil es metre le cargara la lista de espera
                else if (this.perfilUsuario == 'metre')
                {
                  let fb = this.firestore.collection('listaEspera');
                  
          
                // Me voy a suscribir a la colección, y si el usuario está "ESPERANDO", se va a guardar en una lista de usuarios.
                fb.valueChanges().subscribe(datos =>{       // <-- MUESTRA CAMBIOS HECHOS EN LA BASE DE DATOS.
                  
                  this.listaEspera = [];//***************
          
                  datos.forEach( (dato:any) =>{
          
                    if(dato.estadoMesa == 'enEspera') // Verifico que el estado sea esperando.
                    {
                      this.listaEspera.push(dato);      // <--- LISTA DE USUARIOS.
                    }
                    
                  });
          
                   })
                
                }

               //Si el perfil del usuario que ingreso es un cliente, comprobara el estado de lista de espera
            else if (this.perfilUsuario == 'cliente' ||this.perfilUsuario =='anonimo' )
            {
              // Obtenemos el correo del usuario que 
              this.correoCliente = this.correoUsuario ;
              let fb = this.firestore.collection('listaEspera');
          
              fb.valueChanges().subscribe(datos =>{       // <-- MUESTRA CAMBIOS HECHOS EN LA BASE DE DATOS.
              
              this.listaEspera = [];
      
              datos.forEach( (datoCl:any) =>{
                
                // Si el estado de la mesa esta asignada y coincide la informacion del usuario que inicio sesion, se guardara en un json el numero de mesa que se le asigno uy una bandera
                if(datoCl.estadoMesa == 'mesaAsignada' && datoCl.nombreUsuario == this.infoUsuario.nombre) 
                {
                  this.informarEstadoMesa.mesa = datoCl.mesa;
                  this.informarEstadoMesa.seAsignoMesa = "si";
                  localStorage.setItem('mesaCliente',this.informarEstadoMesa.mesa);
                 this.mesa=this.informarEstadoMesa.mesa;
                 console.log()

                }
                
                });
      
               })

            }
          
          }
        })
  
      })
    
    
          setTimeout(() => {
            this.loading = false;
          }, 3000);
    
        
    
       
      }        

      realizoPedido(numero){

    this.firestore.collection('pedidos').get().subscribe((qSnapSh => {
      qSnapSh.forEach((pedido) => {
        if(pedido.data().mesa == numero && this.mostrarProductos== true)
        {
          
        }
      })
    }))

      }






organizarUsuario(usuario,estado){


  let indice = this.listaUsuarios.indexOf(usuario); 

  this.listaUsuarios.splice(indice,1); 

  
  this.firestore.collection('usuarios').get().subscribe((querySnapShot) => {
    querySnapShot.forEach((doc) => {

    
      
     if(doc.data().correo == usuario.correo)
     {

      
       if(estado == "rechazado")
       {
        usuario.estado = estado;                        
        this.bd.actualizar('usuarios',usuario,doc.id);  
       }

       else{    


        if (doc.data().perfil == "cliente")
        {
        usuario.estado = estado;                                          
        this.bd.actualizar('usuarios',usuario,doc.id);                                  
        this.auth.registrarUsuario(usuario.correo,usuario.contrasenia);   
        this.auth.mandarCorreoElectronico(usuario.correo);                
        }

        else
        {
          usuario.estado = estado;                                          
          this.bd.actualizar('usuarios',usuario,doc.id);                          
        }

       }
      
       this.listaUsuarios = []; 
     }

    })
  })
  
}


  cerrarSesion() {
    
    let audio = new Audio();
    audio.src = 'assets/audio/login/efectoDos.mp3';
    audio.play();
    localStorage.removeItem('correoUsuario');
    localStorage.removeItem('tieneCorreo');
    localStorage.removeItem('usuarioAnonimo');
    localStorage.removeItem('perfilUsuario');
    localStorage.removeItem('nombreAnonimo');
    this.perfilUsuario = "";
    this.router.navigate(['/login']);
    
    
  }

  
 /* listaEsperaQRCliente()
  {
    let auxMesa;

    this.barcodeScanner.scan().then(barcodeData => {

    auxMesa = JSON.parse(barcodeData.text);

    this.firestore.collection('usuarios').get().subscribe((querySnapShot) => {
      querySnapShot.forEach((doc) => {

        if(doc.data().correo == this.correoCliente)
        {
          if(auxMesa == 101010)
          {
                this.usuarioMesa.nombreUsuario = doc.data().nombre;
                this.usuarioMesa.apellidoUsuario = doc.data().apellido;
                this.usuarioMesa.estadoMesa = "enEspera";
                this.usuarioMesa.perfilUsuario = doc.data().perfil;
                
          }
          this.bd.crear('listaEspera', this.usuarioMesa);
        }

          this.listaEspera = []; 

      })

    })

     }).catch(err => {
         console.log('Error', err);
     });
     
  }

*/
   
  comprobarMesas(mesa)
  {
    localStorage.setItem('usuarioMesa',JSON.stringify(mesa));
    this.router.navigate(['/lista-mesas']);
  }


qrMesaAsignada()
{
  let auxMesa;

  this.barcodeScanner.scan().then(barcodeData => {

  auxMesa = JSON.parse(barcodeData.text);

  this.firestore.collection('listaMesas').get().subscribe((querySnapShot) => {
    querySnapShot.forEach((doc) => {
      
      if(doc.data().mesa === auxMesa) 
      {
        //
       // 
       // this.banderaMesaAsignada=false;
        this.firestore.collection('listaEspera').get().subscribe((querySnapShot) => {
          querySnapShot.forEach((dato) => {
           
            if(auxMesa=== dato.data().mesa && dato.data().nombreUsuario === this.nombre)
        {
          this.mostrarProductos = true;
          this.mostrarItem=false;
          
          this.ocultarqr=true;
          this.qrPedido=true;
          this.complementos.presentToastConMensajeYColor('Ya podes acceder al menu y hacer tu pedido',"tertiary");
         
        }    
        if(auxMesa!= dato.data().mesa && dato.data().nombreUsuario != this.nombre )
        {
          this.complementos.presentToastConMensajeYColor('Este no es el QR de tu mesa',"warning");
          
       //this.complementos.presentToastConMensajeYColor('Ya podes ver el estado de tu pedido y acceder a la encuesta',"tertiary");
        }   
      
          })
        })

        

       
      } 
       else{
        this.complementos.presentToastConMensajeYColor('Error, esta mesa no existe',"warning");
      }

    }
    )

  }
  )
 
  








   }).catch(err => {
       console.log('Error', err);
       this.complementos.presentToastConMensajeYColor('Error al usar el Qr scanner',"warning");
   });






}

qrpedido()
{
  let auxMesa;

  this.barcodeScanner.scan().then(barcodeData => {

  auxMesa = JSON.parse(barcodeData.text);

  this.firestore.collection('listaMesas').get().subscribe((querySnapShot) => {
    querySnapShot.forEach((doc) => {
      
      if(doc.data().mesa === auxMesa) 
      {
        //
       // 
       // this.banderaMesaAsignada=false;
        this.firestore.collection('pedidos').get().subscribe((querySnapShot) => {
          querySnapShot.forEach((dato) => {
           
            if(auxMesa=== dato.data().mesa)
        {
          this.mostrarProductos = true;
          this.mostrarEncuesta=true;
          this.mostrarItem=true;
          this.qrPedido=false;
          this.complementos.presentToastConMensajeYColor('Ya podes acceder a la encuesta y tu estado de pedido',"tertiary");
         
        }    
        if(auxMesa!= dato.data().mesa)
        {
          this.complementos.presentToastConMensajeYColor('Error, esta mesa no existe',"warning");
          
       //this.complementos.presentToastConMensajeYColor('Ya podes ver el estado de tu pedido y acceder a la encuesta',"tertiary");
        }   
      
          })
        })

        

       
      } 
       else{
        this.complementos.presentToastConMensajeYColor('Este no es el QR de tu mesa',"warning");
      }

    }
    )

  }
  )
 

   }).catch(err => {
       console.log('Error', err);
       this.complementos.presentToastConMensajeYColor('Error al usar el Qr scanner',"warning");
   });


}



mostrarConsultas(){

this.mostrarConsulta= true;
}

enviarEncuesta()
{
  this.jsonEncuesta.preguntaUno=this.gradoSatisfaccion;
  this.jsonEncuesta.preguntaDos=this.gradoSatisfaccionRes;
   this.bd.crear('encuestas',this.jsonEncuesta);
} 

/*mostrarEncuestaLista()
{
  this.mostrarCuentaDiv = false;
  this.mostrarEncuestaDiv = true;
 
}

mostrarCuentaLista()
{
  this.mostrarCuentaDiv = true;
  this.mostrarEncuestaDiv = false;
  
}
*/



estadoPedido(){

  let auxiliar;
  this.barcodeScanner.scan().then(barcodeData => {

    auxiliar = JSON.parse(barcodeData.text);

    this.firestore.collection('pedidos').get().subscribe((querySnapShot) => {
      querySnapShot.forEach( async (dato:any) =>{
        
      if(dato.data().estado === 'pendiente'&& dato.data().mesa===this.mesa ) 
      {
        this.pedidoPendiente=true;
        
        
    }
      if(dato.data().estado  == 'enProceso'&& dato.data().mesa===this.mesa) 
      {
        this.pedidoEnproceso=true;
    }
      if(dato.data().estado === 'listo' && dato.data().mesa===this.mesa) 
      {
        console.log('entre');
        this.pedidoFinalizado=true;
    }

    });
    
  })
  this.menu.close();
  
  }).catch(err => {
    console.log('Error', err);
    this.complementos.presentToastConMensajeYColor('Error al usar el Qr scanner',"warning");
});


   

}
  

confirmarFinalizado(){
  this.pedidoFinalizado=false;
  this.mostrarSolicitudPago=true;
  
}
confirmarEnproceso(){
  this.pedidoEnproceso=false;
}confirmarPendiente(){
  this.pedidoPendiente=false;
}



darPropina()
{
  let auxiliar;
  this.barcodeScanner.scan().then(barcodeData => {

    auxiliar = JSON.parse(barcodeData.text);

      switch(auxiliar) 
      {
        case 4:
          this.propina = "Excelente -> 20%";
          this.jsonCuenta.precioTotal = this.jsonCuenta.precioTotal  * 0.2 + this.jsonCuenta.precioTotal ;
        break ;
        case 3 :
          this.propina = "Muy bien -> 15%";
          this.jsonCuenta.precioTotal = this.jsonCuenta.precioTotal  * 0.15 + this.jsonCuenta.precioTotal;
          break;
        case 2 : 
        this.propina = "Bien -> 10%";
        this.jsonCuenta.precioTotal = this.jsonCuenta.precioTotal  * 0.1 + this.jsonCuenta.precioTotal;
        break;
        case 1 :
          this.propina = "Regular -> 5%";
          this.jsonCuenta.precioTotal = this.jsonCuenta.precioTotal  * 0.05 + this.jsonCuenta.precioTotal;
          break;
          case 0 :
            this.propina = "Malo -> 0%";
          break;
      }
      
    }).catch(err => {
      console.log('Error', err);
})

}

propina;

jsonCuenta = {
  pedidos: [],
  propina: this.propina,
  precioTotal:0
}
mostrarCuentaLista()
{  
  

  this.solicitudPago=true;

  this.firestore.collection('pedidos').get().subscribe((querySnapShot) => {
    querySnapShot.forEach((doc) => {

      if(doc.data().mesa == this.informarEstadoMesa.mesa) // Comparamos las mesas y nos dara el pedido de esa mesa
      {
          doc.data().platosPlato.forEach(element => {
            this.firestore.collection('productos').get().subscribe((querySnapShot) => {
              querySnapShot.forEach((docP) => { 
     
                if(element == docP.data().nombre)
                {
                  let jsonPedido = {
                    precioUnitario : 0,
                    nombreProducto : ""
                  }
                  jsonPedido.precioUnitario = docP.data().precio;
                  jsonPedido.nombreProducto = element;
                  this.jsonCuenta.pedidos.push(jsonPedido);
                }
              })
                 
            });
          });

          doc.data().platosPostre.forEach(element => {
            this.firestore.collection('productos').get().subscribe((querySnapShot) => {
              querySnapShot.forEach((docP) => { 
     
                if(element == docP.data().nombre)
                {
                  let jsonPedido = {
                    precioUnitario : 0,
                    nombreProducto : ""
                  }
                  jsonPedido.precioUnitario = docP.data().precio;
                  jsonPedido.nombreProducto = element;
                  this.jsonCuenta.pedidos.push(jsonPedido);
                }
              })
                 
            });
          });

          doc.data().platosBebida.forEach(element => {
            this.firestore.collection('productos').get().subscribe((querySnapShot) => {
              querySnapShot.forEach((docP) => { 
     
                if(element == docP.data().nombre)
                {
                  let jsonPedido = {
                    precioUnitario : 0,
                    nombreProducto : ""
                  }
                  jsonPedido.precioUnitario = docP.data().precio;
                  jsonPedido.nombreProducto = element;
                  this.jsonCuenta.pedidos.push(jsonPedido);
                }
              })
                 
            });
          });
          this.jsonCuenta.precioTotal = doc.data().precioTotal;

      }

    })

  
  })
  this.menu.close();
}

pagarCuenta()
{
  let auxPedido;
  let auxLisEsp;

  this.firestore.collection('pedidos').get().subscribe((querySnapShot) => {
    querySnapShot.forEach((doc) => {
      if(doc.data().mesa == this.informarEstadoMesa.mesa)
      {
        auxPedido = doc.data();
        auxPedido.estado = "pagado"
        this.bd.actualizar("pedidos",auxPedido,doc.id);

        this.firestore.collection('listaEspera').get().subscribe((querySnapShot) => {
          querySnapShot.forEach((docDos) => {
            if(this.informarEstadoMesa.mesa == docDos.data().mesa)
            {
              this.informarEstadoMesa.mesa = '';
              this.informarEstadoMesa.seAsignoMesa = "no";
              // this.firestore.doc(docDos.id).delete() -> Fijarse como borrlo de la lista de espera
              this.firestore.collection('listaEspera').doc(docDos.id).delete();
             
              this.complementos.presentToastConMensajeYColor("Su pago esta por ser confirmado, gracias por utilizarnos!","tertiary");
            }
          })
        });
      
      }

    })
  });
  this.mostrarProductos = false;
   this.mostrarItem=false;
this.mostrarSolicitudPago=false;
this.mostrarEncuesta=false;
}
mostrarSolicitudMozo(){
  this.menuMozo=false;
  this.banderaMostrarCuentasPagadas = true;
  this.menu.close();

}
mostrarPedido(numero)
{
 this.mostrarP=true;
 this.mesaP=numero;  
}

liberarMesa(mesaA)
  {
    
    
    let auxMesa ;
    
    this.firestore.collection('pedidos').get().subscribe((querySnapShot) => {
      
      querySnapShot.forEach(dato => {  
        if(mesaA == dato.data().mesa)
        {

          this.firestore.collection('listaMesas').get().subscribe((querySnapShot) => {
      
            querySnapShot.forEach(datoMesa => {  

              if(mesaA == datoMesa.data().mesa)
              {
                auxMesa = datoMesa.data();
                auxMesa.estado = "desocupada";
                this.bd.actualizar("listaMesas",auxMesa,datoMesa.id);
                this.firestore.collection('pedidos').doc(dato.id).delete();
                this.complementos.presentToastConMensajeYColor("Mesa liberada!","tertiary");
              }

             })

          });
        }

      })

    });
    this.menuMozo=true;
    this.banderaMostrarCuentasPagadas = false;
  }

}