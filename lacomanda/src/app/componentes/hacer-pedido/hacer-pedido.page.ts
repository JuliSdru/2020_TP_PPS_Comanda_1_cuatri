import { Component, OnInit , Input} from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController, PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ValueAccessor } from '@ionic/angular/directives/control-value-accessors/value-accessor';
import { DatabaseService } from 'src/app/servicios/database.service';
import { ComplementosService } from 'src/app/servicios/complementos.service';
import { TransitiveCompileNgModuleMetadata } from '@angular/compiler';

export interface Producto {
  nombre:string,
  cantidad: number,
  tiempo : number,
}

@Component({
  selector: 'app-hacer-pedido',
  templateUrl: './hacer-pedido.page.html',
  styleUrls: ['./hacer-pedido.page.scss'],
})



export class HacerPedidoPage implements OnInit {

largo: number;
  
  lista = [];

  bandera="";

 pedidoHecho;
  cantidad = 0;
  totalProducto= 0;
  loading = true;
  productoJson:Producto;

  pedidoEnFormatoJSON = {
    platosPlato :[],
    platosBebida : [],
    platosPostre : [],
    precioTotal : 0,
    estadoChef : "pendiente",
    estadoBartender : "pendiente",
    mesa : 0,
    estado:'pendiente',
    tiempo:0
  };
    productoA: string;
    listaProductosTipoPlato = [];
    listaProductosTipoBebida = [];
    listaProductosTipoPostre = [];
    contadorPlatos = 0;
    contadorBebidas = 0;
  contadorPostres = 0;
  contadorVecesQueConfirmaPedido = 0;
  //contadores 
  ensalada= 0;
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
  torta=0;
  ensaladaT= 0;
  empanadaT=0;
  papasT=0;
  picadaT=0;
  pastaT=0;
  aguaT=0;
  campariT=0;
  cocaT=0;
  pepsiT=0;
  vinoT=0;
  lemonT=0;
  flanT=0;
  heladoT=0;
  milkshakeT=0;
  tortaT=0;
  tiempoT=0
  ensaladaAux= 0;
  empanadaAux=0;
  papasAux=0;
  picadaAux=0;
  pastaAux=0;
  aguaAux=0;
  campariAux=0;
  cocaAux=0;
  pepsiAux=0;
  vinoAux=0;
  lemonAux=0;
  flanAux=0;
  heladoAux=0;
  milkshakeAux=0;
  tortaAux=0;
  tiempoAux=0
    variabledesplegarPedido = false;
  constructor(
    private firestore : AngularFirestore,
    public alertController: AlertController ,
    public router : Router,
    private bd : DatabaseService,
    private complementos : ComplementosService,
    public popoverController: PopoverController
  ) { }

mesa=0;
  ngOnInit() {
    this.ensalada= 0;
    this.productoJson = {
      nombre : "",
      tiempo : 0,
      cantidad : 0
    }
    //this.bandera = "comida";
    this.contadorPlatos = 0;
    this.contadorBebidas = 0;
    this.contadorPostres = 0;
    this.contadorVecesQueConfirmaPedido = 0;

    this.variabledesplegarPedido = false;
   
  this.mesa=parseInt(localStorage.getItem('mesaCliente'));
  
  this.pedidoEnFormatoJSON.mesa=this.mesa;
  this.firestore.collection('productos').get().subscribe((querySnapShot) => {
    querySnapShot.forEach((doc) => {
      if(doc.data().nombre =="Ensalada Vegana"){
      console.log("entro al if")
        this.ensaladaAux= doc.data().tiempo;
      }
      if(doc.data().nombre =="Empanada"){
  
        this.empanadaAux= doc.data().tiempo;
      }




    })})
    setTimeout(() => {
      this.loading = false;
    }, 3000);

  }


  listarProductos(pro : string)
  {
    if(pro=="comida")
    {
      this.bandera=pro;
      
      this.listaProductosTipoPlato = this.cargarProductosTipo("comida");
      
    }
    else if(pro=="bebida")
    {
      this.bandera=pro;
      this.listaProductosTipoBebida = this.cargarProductosTipo("bebida");
     
    }else{
      this.bandera=pro;
      this.listaProductosTipoPostre = this.cargarProductosTipo("postre");
      
    }
  }

  cargarJSONPedidosPlatos(plato : string, tipoDePlato : string, precio : number,tiempo: number)
  {
   console.log(tiempo);
    if (tipoDePlato == "comida")
    { 

      this.pedidoEnFormatoJSON.platosPlato.push(plato);
    

      this.contadorPlatos = this.contadorPlatos + 1;
      this.pedidoEnFormatoJSON.precioTotal = this.pedidoEnFormatoJSON.precioTotal + precio;

      this.pedidoEnFormatoJSON.tiempo= this.pedidoEnFormatoJSON.tiempo + tiempo;

  let cant= this.calcularCantidad(plato,tipoDePlato);
    switch(plato)
    {
      case'Ensalada Vegana':
     
      
        this.ensalada=cant;
       

      console.log( this.ensaladaAux)
      break;
      case 'Empanada':
        this.empanada=cant;
       
         
        
      break;
      case 'Papas con cheddar':
        this.papas=cant;
        
        
      break;
      case 'Picada Mawey':
        this.picada=cant;
        
      break;
      case 'Pastas':
        this.pasta=cant;
        
      break;
      

    }
   
      
    }

    if (tipoDePlato == "bebida")
    {
      this.pedidoEnFormatoJSON.platosBebida[this.contadorBebidas] = plato;
      this.contadorBebidas = this.contadorBebidas + 1;
      this.pedidoEnFormatoJSON.precioTotal = this.pedidoEnFormatoJSON.precioTotal + precio;
      this.pedidoEnFormatoJSON.tiempo= this.pedidoEnFormatoJSON.tiempo + tiempo;
      let cant= this.calcularCantidad(plato,tipoDePlato);
    switch(plato)
    {
      case'Agua sin gas':
      this.agua=cant;
      
      break;
      case 'Campari':
        this.campari=cant;
        
      break;
      case 'Coca-cola':
        this.coca=cant;
       
      break;
      case 'Pepsi':
        this.pepsi=cant;
        
      break;
      case 'Vino':
        this.vino=cant;
        
      break;
      
     
    }
   
    }

    if (tipoDePlato == "postre")
    {
      this.pedidoEnFormatoJSON.platosPostre[this.contadorPostres] = plato;
      this.contadorPostres = this.contadorPostres + 1;
      this.pedidoEnFormatoJSON.precioTotal = this.pedidoEnFormatoJSON.precioTotal + precio;
      this.pedidoEnFormatoJSON.tiempo= this.pedidoEnFormatoJSON.tiempo + tiempo;
      let cant= this.calcularCantidad(plato,tipoDePlato);
    switch(plato)
    {
      case'Lemon pie':
      this.lemon=cant;
      
      break;
      case 'Flan casero':
        this.flan=cant;
       
      break;
      case 'Helado':
        this.helado=cant;
        
      break;
      case 'Milkshake':
        this.milkshake=cant;
       
      break;
      case 'Torta Matilda':
        this.torta=cant;
       
      break;
    }

    }

    

  }


  cargarProductosTipo(tipoProducto : string) : any
  {

    var listaProductos = [];
    this.firestore.collection("productos").get().subscribe((querySnapShot) => {
      querySnapShot.forEach((doc) => {

        // Correo de la BD == Correo de la lista.
       if(doc.data().tipo == tipoProducto)
       {
        listaProductos.push(doc.data()); 
        
     
       }

      })
    })

    return listaProductos;
  }







 


  

desplegarPedido()
  {
    this.variabledesplegarPedido = true;
  }

  desplegarInversoPedido()
  {
    this.variabledesplegarPedido = false;
  }


  confirmarPedido()
  {

    if (this.contadorVecesQueConfirmaPedido == 0 && this.pedidoEnFormatoJSON.precioTotal>0)
    {
      this.complementos.presentToastConMensajeYColor("Pedido generado con éxito. Será redirigido al menú!", "tertiary")
      this.bd.crear('pedidos',this.pedidoEnFormatoJSON);
      this.contadorVecesQueConfirmaPedido = 1;
      this.desplegarInversoPedido();
      
      this.router.navigate(['/home']);
      this.pedidoHecho=this.pedidoEnFormatoJSON.mesa;
      localStorage.setItem('pedidoHecho',this.pedidoHecho);
    }else if(this.contadorVecesQueConfirmaPedido == 0 && this.pedidoEnFormatoJSON.precioTotal==0){
      this.complementos.presentToastConMensajeYColor("¡No se puede confirmar un pedido vacio!", "warning")
    }

    else
    {
      this.complementos.presentToastConMensajeYColor("¡Su orden ya fue cargada!", "tertiary")
      this.desplegarInversoPedido();
      
      this.router.navigate(['/home']);
    }

   
  }
  
  cancelarPedido()
  {
    if (this.contadorVecesQueConfirmaPedido == 0&& this.pedidoEnFormatoJSON.precioTotal>0)
    {
      this.pedidoEnFormatoJSON.platosPlato = [];
      this.pedidoEnFormatoJSON.platosBebida = [];
      this.pedidoEnFormatoJSON.platosPostre = [];
      this.pedidoEnFormatoJSON.precioTotal = 0;
      this.ensalada=0;
      this.picada=0;
      this.pasta=0;
      this.papas=0;
      this.empanada=0;
      this.agua=0;
      this.campari=0;
      this.coca=0;
      this.pepsi=0;
      this.vino=0;
      this.lemon=0;
      this.flan=0;
      this.helado=0;
      this.milkshake=0;
      this.torta=0;

      this.contadorPlatos = 0;
      this.contadorBebidas = 0;
      this.contadorPostres = 0;

      this.complementos.presentToastConMensajeYColor("¡El pedido fue cancelado!", "success")
    }
    else if(this.contadorVecesQueConfirmaPedido == 0 && this.pedidoEnFormatoJSON.precioTotal==0){
      this.complementos.presentToastConMensajeYColor("¡No se puede cancelar un pedido vacio!", "warning")
    }
    else
    {
      this.complementos.presentToastConMensajeYColor("¡No puede cancelar un pedido ya enviado!", "warning")
    }
    
  }

 eliminar(plato : string, tipoDePlato : string, precio : number)
  {
   
    if (tipoDePlato == "comida")
    {

      let auxIndice = this.pedidoEnFormatoJSON.platosPlato.indexOf(plato);

      if(auxIndice >= 0 ){
        let retorno = this.pedidoEnFormatoJSON.platosPlato.splice(auxIndice,1);

          if(this.pedidoEnFormatoJSON.precioTotal > 0 && retorno.length > 0)
          {
            this.contadorPlatos = this.contadorPlatos - 1;
            this.pedidoEnFormatoJSON.precioTotal = this.pedidoEnFormatoJSON.precioTotal - precio;
            let cant= this.calcularCantidad(plato,tipoDePlato);
            switch(plato)
            {
              case'Ensalada Vegana':
              this.ensalada=cant;
              //console.log( this.ensalada)
              break;
              case 'Empanada':
                this.empanada=cant;
              break;
              case 'Papas con cheddar':
                this.papas=cant;
              break;
              case 'Picada Mawey':
                this.picada=cant;
              break;
              case 'Pastas':
                this.pasta=cant;
              break;
              
        
            }
            
          }
      }
    }

    if (tipoDePlato == "bebida")
    {

      let auxIndice = this.pedidoEnFormatoJSON.platosBebida.indexOf(plato);

      if(auxIndice >= 0 ){
        let retorno = this.pedidoEnFormatoJSON.platosBebida.splice(auxIndice,1);

          if(this.pedidoEnFormatoJSON.precioTotal > 0 && retorno.length > 0)
          {
            this.contadorBebidas = this.contadorBebidas - 1;
            this.pedidoEnFormatoJSON.precioTotal = this.pedidoEnFormatoJSON.precioTotal - precio;
            let cant= this.calcularCantidad(plato,tipoDePlato);
            switch(plato)
            {
              case'Agua sin gas':
              this.agua=cant;
              break;
              case 'Campari':
                this.campari=cant;
              break;
              case 'Coca-cola':
                this.coca=cant;
              break;
              case 'Pepsi':
                this.pepsi=cant;
              break;
              case 'Vino':
                this.vino=cant;
              break;
              
             
            }
          }
      }


    }

    if (tipoDePlato == "postre")
    {
      let auxIndice = this.pedidoEnFormatoJSON.platosPostre.indexOf(plato);

      if(auxIndice >= 0 ){
        let retorno = this.pedidoEnFormatoJSON.platosPostre.splice(auxIndice,1);

          if(this.pedidoEnFormatoJSON.precioTotal > 0 && retorno.length > 0)
          {
            this.contadorPostres = this.contadorPostres - 1;
            this.pedidoEnFormatoJSON.precioTotal = this.pedidoEnFormatoJSON.precioTotal - precio;
            let cant= this.calcularCantidad(plato,tipoDePlato);
            switch(plato)
            {
              case'Lemon pie':
              this.lemon=cant;
              break;
              case 'Flan Casero':
                this.flan=cant;
              break;
              case 'Helado':
                this.helado=cant;
              break;
              case 'Milkshake':
                this.milkshake=cant;
              break;
              case 'Torta Matilda':
                this.torta=cant;
              break;
            }
        
          }
      }
     
    }


   console.log(this.pedidoEnFormatoJSON);


  }
  calcularCantidad(nombrePlato : string, tipo : string)
  {
    let contador = 0 ;
    if (tipo == 'comida')
    {
      this.pedidoEnFormatoJSON.platosPlato.forEach( (dato : any) => {
        if(nombrePlato == dato)
        {
          contador ++;
         /**/
        }
  
      })
    }
    else if(tipo == 'postre')
    {
      this.pedidoEnFormatoJSON.platosPostre.forEach( (dato : any) => {
        if(nombrePlato == dato)
        {
          contador ++;
        }
  
      })
    }
    else
    {
      this.pedidoEnFormatoJSON.platosBebida.forEach( (dato : any) => {
        if(nombrePlato == dato)
        {
          contador ++;
        }
  
      })
    }
  

    return contador;
  }


}