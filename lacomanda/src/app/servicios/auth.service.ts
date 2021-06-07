import { Injectable } from '@angular/core';


// PRIMERO IMPORTO EL EL ANGULAR FIRE AUTH.
import { AngularFireAuth } from "@angular/fire/auth";
import { from } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private AFauth : AngularFireAuth
    
    ) { }


login(email : string, password : string){

  return new Promise((resolve, rejected) => {

  this.AFauth.signInWithEmailAndPassword(email, password)
  
  .then (user => resolve(user.user.email))
  
  .catch(err => rejected(err))

  });
  


}

registrarUsuario(email : string, password : string){

  return new Promise((resolve, rejected) => {

    this.AFauth.createUserWithEmailAndPassword(email, password)
    
    .then (user => resolve(user))
    
    .catch(err => rejected(err))
  
    });
    


}

mandarCorreoElectronico(email : string)
{
  setTimeout(()=>{
    this.AFauth.sendPasswordResetEmail(email);
  },3000);
//this.AFauth.sendPasswordResetEmail(email).then (user => resolve(user)).catch(err => rejected(err))
  
    
}

}



/* 
this.AFauth.signInWithEmailAndPassword(email, password).then 
  (res => {console.log(res)}).catch(err => console.log("ERROR!: " + err))*/