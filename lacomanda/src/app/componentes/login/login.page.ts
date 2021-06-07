import { Component, OnInit } from '@angular/core';

// IMPORTO LA CLASE USUARIO.
import { Usuario } from "../../clases/usuario";

// IMPORTO EL TIMER:
import { timer } from 'rxjs';

// SERVICIO DE COMPLEMENTOS.
import {ComplementosService} from "../../servicios/complementos.service"

// IMPORTO EL SERVICIO DE AUTH.
import { AuthService } from "../../servicios/auth.service";


// IMPORTO EL ROUTER COMO ULTIMO PASO.
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  email : string;
  password : string;


  users: Usuario[] = [
  {  correo: "supervisor@supervisor.com", contrasenia: "111111", perfil: "supervisor"},
  {  correo: "duenio@duenio.com", contrasenia: "222222", perfil: "dueño"},
  {  correo: "mozo@mozo.com", contrasenia: "333333", perfil: "mozo"},
  {  correo: "cocinero@cocinero.com", contrasenia: "444444", perfil: "cocinero" },
  {  correo: "metre@metre.com", contrasenia: "555555", perfil: "metre"},
  { correo: "anonimo@anonimo.com", contrasenia: "666666", perfil: "anonimo"},
  {  correo: "bartender@bartender.com", contrasenia: "777777", perfil: "bartender"}]


  constructor(
  private authService : AuthService,
  private complementos : ComplementosService,  
  public router : Router, 

  ) { }

  ngOnInit() {
    localStorage.removeItem('correoUsuario');
    localStorage.removeItem('tieneCorreo');
    localStorage.removeItem('usuarioAnonimo');
    localStorage.removeItem('nombreAnonimo');
   
  }



// Con el boton, esto hace que directamente se verifique el usuario existe. Si lo hace, entra a home. Sino, da error.
public onSubmitLogin()
{

  this.authService.login(this.email, this.password)
  
  .then((res:any) => { 

    //this.complementos.presentLoading();

    let audio = new Audio();
    audio.src = 'assets/audio/login/efectoUno.mp3';
    audio.play();

    timer(2000).subscribe(() => {this.router.navigate(['/home']);
    localStorage.setItem('correoUsuario',res); // Guardamos el correo de la persona que ingreso
    //localStorage.setItem('tieneCorreo','conCorreo'); // Verificamos si se ingreso con correo (por el anonimo)
  });

  }).catch(err => this.complementos.ngValidarError(err.code));
}


// Boton para limpiar.
public onClearAll()
{
  this.email = null;
  this.password = null;

  let audio = new Audio();
  audio.src = 'assets/audio/login/sonidoBotonBORRAR.mp3';
  audio.play();
}


// Selector de usuarios.
pickUser(pickedName) {
  this.users.forEach((user) => {
    if (user.perfil === pickedName) {
      this.email = user.correo;
      this.password = user.contrasenia;
      //localStorage.setItem("usuario",JSON.stringify(user));
      return;
    }
  });
}


}
