import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/servicios/database.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-pedido-cocinero',
  templateUrl: './pedido-cocinero.page.html',
  styleUrls: ['./pedido-cocinero.page.scss'],
})
export class PedidoCocineroPage implements OnInit {

  constructor(
    private firestore : AngularFirestore,
    private bd : DatabaseService,
    private ba: AngularFirestore
  ) { }
  listaPedido =[];
  listaComida=[];
  listaComidaAux=[];
  listaPostre=[];
  mostrar= false;
  mesa;
  nany = 0;
  //contadores 
  ensalada;
  empanada;
  papas;
  picada;
  pasta;

  loading = true;
  
  ngOnInit() {
    this.ensalada=0;
  this.empanada=0;
  this.papas=0;
  this.picada=0;
  this.pasta=0;

    let fb = this.firestore.collection('pedidos');
   
      fb.valueChanges().subscribe(datos =>{      
        
        this.listaPedido = [];
  
        datos.forEach( (dato:any) =>{
  
          if(dato.estado == 'enProceso' && dato.estadoChef =='pendiente' || dato.estadoChef=='elaborado'){

         
         
            
            this.listaPedido.push(dato);
            
            
        
        }
    
          
        });
        
      })
      setTimeout(() => {
        this.loading = false;
      }, 3000);
  }
  

mostrarPedido(numero)
{
 this.mostrar=true;
 this.mesa=numero; 
//this.listarPedido(numero)
//console.log("numero en nostrar"+ numero)
 
 
}
listarPedido(numero){
  console.log("numero en listar"+ numero);
 

  let fb = this.firestore.collection('pedidos');
   
      fb.valueChanges().subscribe(datos =>{      
        
        
  
        datos.forEach( (dato:any) =>{
          this.listaComidaAux= [];
        this.listaComida=[];
        this.ensalada=0;
        this.empanada=0;
        this.papas=0;
        this.picada=0;
        this.pasta=0;
  
          if(dato.estado == 'enProceso' &&  dato.mesa == numero &&dato.estadoChef =='pendiente' || dato.estadoChef=='elaborado') 
          {
              this.listaComidaAux=dato.platosPlato;
              for(var i=0 ; i<this.listaComidaAux.length ;i++ ){
               // console.log("entre al for")
                if(this.listaComidaAux[i] ==='Empanada'){
  
                  this.empanada++;
                  if (this.empanada===1)
                  {
                    this.listaComida.push(this.listaComidaAux[i]);
                  }
                }
                if(this.listaComidaAux[i]==='Papas con cheddar'){
                  this.papas++;
                  if (this.papas===1)
                  {
                    this.listaComida.push(this.listaComidaAux[i]);
                  }
                }
                if(this.listaComidaAux[i]==='Picada Mawey'){
                  this.picada++;
                  if (this.picada===1)
                  {
                    this.listaComida.push(this.listaComidaAux[i]);
                  }
                }
                if(this.listaComidaAux[i] ==='Pastas'){
                  this.pasta++; 
                  if (this.pasta ===1)
                  {
                    this.listaComida.push(this.listaComidaAux[i]);
                  }
                }

              }
              console.log("listafinal"+ this.listaComida)
          }   
        });
        
      }) 
}


elaborarPedido(mesa)
{
  let aux;
  this.firestore.collection('pedidos').get().subscribe( (querySnapShot)=>{ querySnapShot.forEach((dato) =>{      
    
          if(dato.data().mesa === mesa && dato.data().estado === 'enProceso') 
          {
           aux=dato.data();
           aux.estadoChef="elaborado"; 
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
           aux.estadoChef="listo";  
           this.nany = 0;
           this.bd.actualizar('pedidos',aux,dato.id);
          }
          
        })
  
      })
  
  }
  calcularCantidad(nombrePlato : string, tipo : string, numero)
  {
    let contador = 0 ;
    if (tipo == 'comida')
    {
      this.listaComida.forEach( (dato : any) => {
        if(nombrePlato == dato)
        {
          contador ++;
         /**/
        }
  
      })
    }
    else if(tipo == 'postre')
    {
      this.listaComida.forEach( (dato : any) => {
        if(nombrePlato == dato)
        {
          contador ++;
        }
  
      })
    }
  }
}
