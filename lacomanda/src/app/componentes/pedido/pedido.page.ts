import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/servicios/database.service';
import { AngularFirestore,AngularFirestoreCollection } from '@angular/fire/firestore';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
})
export class PedidoPage implements OnInit {

  constructor(
    private firestore : AngularFirestore,
    private bd : DatabaseService,
    private ba: AngularFirestore
  ) { }
  listaPedido=[];
  listaPedidoListo=[];
 mostrar= false;
 mesa;
 mostrarPedidolisto=false;
 loading = true;
 /*ensalada= 0;
 empanada=0;
 papas=0;
 picada=0;
 pasta=0;
 agua=0;
 campari=0;
 coca=0;
 pepsi=0;
 vino=0;
 lemon=0;
 flan=0;
 helado=0;
 milkshake=0;
 torta=0;*/
 
  ngOnInit() {
    
    let fb = this.firestore.collection('pedidos');
   
      fb.valueChanges().subscribe(datos =>{      
        
        this.listaPedido = [];
        this.listaPedidoListo = [];
  
        datos.forEach( (dato:any) =>{
  
          if(dato.estado === 'pendiente') 
          {
            this.listaPedido.push(dato);     
          }
          if(dato.estado  == 'enProceso' && dato.estadoChef == 'listo' && dato.estadoBartender == 'listo') 
          {
            this.listaPedidoListo.push(dato);     
          }
          
        });
  
      })
      setTimeout(() => {
        this.loading = false;
      }, 3000);


     

      
      
  }
 
 mostrarPedido(numero,bebida,plato,postre)
 {
  this.mostrar=true;
  this.mesa=numero;  
 }

 mostrarPedidoListo(numero)
 {
  this.mostrarPedidolisto=true;
  this.mesa=numero;  
 }


 derivar(mesa){
   let aux;
this.firestore.collection('pedidos').get().subscribe( (querySnapShot)=>{ querySnapShot.forEach((dato) =>{      
  
        if(dato.data().mesa === mesa) 
        {
          aux=dato.data();
         aux.estado="enProceso";  
         this.bd.actualizar('pedidos',aux,dato.id);
         //this.mostrar=false;
        }
        
      })

    })

}

enviarPedido(mesa){
  let auxPedido;
this.firestore.collection('pedidos').get().subscribe( (querySnapShot)=>{ querySnapShot.forEach((dato) =>{      
 
       if(dato.data().mesa === mesa) 
       {
         auxPedido=dato.data();
        auxPedido.estado="listo";  
        this.bd.actualizar('pedidos',auxPedido,dato.id);
        //this.mostrarPedidolisto=false;
       }
       
     })

   })

}

}
