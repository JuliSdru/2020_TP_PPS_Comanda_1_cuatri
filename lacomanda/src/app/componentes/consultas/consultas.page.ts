import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DatabaseService } from 'src/app/servicios/database.service';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.page.html',
  styleUrls: ['./consultas.page.scss'],
})
export class ConsultasPage implements OnInit {

  constructor(
    private firestore : AngularFirestore,
      private bd : DatabaseService,
  ) { }
  listarConsulta=[];
  mostrar=0;
  lista ;
  mesa;
  listaPedido = [];
  mostrarP= false;
  nany = 0;
  loading = true;
  ngOnInit() {


    let fb = this.firestore.collection('consultas');
   
      fb.valueChanges().subscribe(datos =>{      
        
        this.listarConsulta = [];
  
        datos.forEach( (dato:any) =>{
  
          if(dato.estado == 'pendiente' ) 
          {
           let consulta = {
              mesa : "",
            consulta : "",
             
            }
            consulta.consulta=dato.consulta;
            consulta.mesa=dato.mesa;
            
            this.listarConsulta.push(consulta);
            
            this.mostrar=1;
          }
         
    
          
        });
        this.lista=this.listarConsulta[0];
        console.log(this.listarConsulta);   
      })
    
      setTimeout(() => {
        this.loading = false;
      }, 3000);
  }

  mostrarPedido(numero,bebida)
{
 this.mostrarP=true;
 this.mesa=numero;  
}
  consulta(mesa){
    
console.log('hola');
    this.firestore.collection('consultas').get().subscribe((querySnapShot) => {
      querySnapShot.forEach((doc) => {
  
      
       
       if(doc.data().mesa == mesa)
       {
        let consulta;
      consulta=doc.data();
        
        consulta.estado= 'listo';
       
        this.bd.actualizar('consultas',consulta,doc.id);
  
         
       }
  
      })
    })
  }
  consultaEma(mesa){
    //console.log('nany')
    
    console.log('hola');
        this.firestore.collection('consultas').get().subscribe((querySnapShot) => {
          querySnapShot.forEach((doc) => {
      
            //console.log(doc.data().estado);
           
           if(doc.data().mesa == mesa)
           {
            let consulta;
            consulta=doc.data();
              
              consulta.estado= 'listo';
             
              this.bd.actualizar('consultas',consulta,doc.id);
      
             
           }
      
          })
        })
  }



}
