import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from "@angular/router";
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(private router : Router,
    private menu: MenuController) { }

  ngOnInit() {}

  items = [
    {icono : "clipboard" , nombre : "Pedidos" , ruta : "/home/registrar"},
    {icono : "card" , nombre : "Solicitudes de pago" , ruta  : "/menu-mozo/solicitud-pago"}
  ]
  jefeLogueado = {nombre : "Pablo" , apellido : "Hidalgo" , path : "../../../assets/mozo.png" , perfil : "Mozo"}

  Cerrar()
  {
    this.router.navigate(['/login']);
  }
  
}
