import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/servicios/database.service';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-pedido-bartender',
  templateUrl: './pedido-bartender.page.html',
  styleUrls: ['./pedido-bartender.page.scss'],
})
export class PedidoBartenderPage implements OnInit {

  constructor(
    private firestore : AngularFirestore,
    private bd : DatabaseService,
    private ba: AngularFirestore
  ) { }
  listaPedido=[];
  mostrar= false;
  mesa;
  nany = 0;
  loading = true;
  ngOnInit() {
    let fb = this.firestore.collection('pedidos');
   
      fb.valueChanges().subscribe(datos =>{      
        
        this.listaPedido = [];
  
        datos.forEach( (dato:any) =>{
  
          if(dato.estado == 'enProceso' && dato.estadoBartender =='pendiente' || dato.estadoBartender=='elaborado') 
          {
            this.listaPedido.push(dato);     
          }
          
  
          
        });
  
      })
      setTimeout(() => {
        this.loading = false;
      }, 3000);
  }
 

mostrarPedido(numero,bebida)
{
 this.mostrar=true;
 this.mesa=numero;  
}
elaborarPedido(mesa)
{
  let aux;
  this.firestore.collection('pedidos').get().subscribe( (querySnapShot)=>{ querySnapShot.forEach((dato) =>{      
    
          if(dato.data().mesa === mesa && dato.data().estado === 'enProceso') 
          {
           aux=dato.data();
           aux.estadoBartender="elaborado"; 
           this.nany = 1;
           this.bd.actualizar('pedidos',aux,dato.id);
          }
    
          
        })
  
      })
  
  }
  pedidoListo(mesa)
{
  let aux;
  this.firestore.collection('pedidos').get().subscribe( (querySnapShot)=>{ querySnapShot.forEach((dato) =>{      
    
        
          if(dato.data().mesa === mesa && dato.data().estado === 'enProceso') 
          {
           aux=dato.data();
           aux.estadoBartender="listo";  
           this.nany = 0;
           this.bd.actualizar('pedidos',aux,dato.id);
          }
          
        })
  
      })
  
  }
}

