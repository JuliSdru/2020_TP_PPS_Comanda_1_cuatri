import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './componentes/menu/menu.component';
//import { AltaClienteComponent } from './componentes/alta-cliente/alta-cliente.component';


const routes: Routes = [
  
  //{ path:'registro',component:AltaClienteComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'login',
    loadChildren: () => import('./componentes/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registrar',
    loadChildren: () => import('./componentes/registrar/registrar.module').then( m => m.RegistrarPageModule)
  },
  {
    path: 'registrar-empleado',
    loadChildren: () => import('./componentes/registrar-empleado/registrar-empleado.module').then( m => m.RegistrarEmpleadoPageModule)
  },
  {
    path: 'registrar-supervisor',
    loadChildren: () => import('./componentes/registrar-supervisor/registrar-supervisor.module').then( m => m.RegistrarSupervisorPageModule)
  },
  
 {path:'menu',component:MenuComponent},
  {
    path: 'alta-producto',
    loadChildren: () => import('./componentes/alta-producto/alta-producto.module').then( m => m.AltaProductoPageModule)
  },
  {
    path: 'alta-mesa',
    loadChildren: () => import('./componentes/alta-mesa/alta-mesa.module').then( m => m.AltaMesaPageModule)
  },
  {
    path: 'pedir-mesa',
    loadChildren: () => import('./componentes/pedir-mesa/pedir-mesa.module').then( m => m.PedirMesaPageModule)
  },
  {
    path: 'lista-mesas',
    loadChildren: () => import('./componentes/lista-mesas/lista-mesas.module').then( m => m.ListaMesasPageModule)
  },  {
    path: 'lista-productos',
    loadChildren: () => import('./componentes/lista-productos/lista-productos.module').then( m => m.ListaProductosPageModule)
  },
  {
    path: 'hacer-pedido',
    loadChildren: () => import('./componentes/hacer-pedido/hacer-pedido.module').then( m => m.HacerPedidoPageModule)
  },
  {
    path: 'pedido',
    loadChildren: () => import('./componentes/pedido/pedido.module').then( m => m.PedidoPageModule)
  },
  {
    path: 'pedido-cocinero',
    loadChildren: () => import('./componentes/pedido-cocinero/pedido-cocinero.module').then( m => m.PedidoCocineroPageModule)
  },
  {
    path: 'pedido-bartender',
    loadChildren: () => import('./componentes/pedido-bartender/pedido-bartender.module').then( m => m.PedidoBartenderPageModule)
  },
  {
    path: 'consultas',
    loadChildren: () => import('./componentes/consultas/consultas.module').then( m => m.ConsultasPageModule)
  },
  {
    path: 'encuesta',
    loadChildren: () => import('./componentes/encuesta/encuesta.module').then( m => m.EncuestaPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
