import { Injectable } from '@angular/core';
import {AngularFirestore,AngularFirestoreCollection } from "@angular/fire/firestore";
import {  AngularFireAuth } from '@angular/fire/auth';
import { AuthService} from "../servicios/auth.service"
import { from } from 'rxjs';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  constructor(private firestore: AngularFirestore ,private angular : AngularFireAuth, private auth :AuthService) 
  {
    
   }
  
 //Crea un nuevo dato   
 public crear(collection: string, data: any) 
 {    
    return this.firestore.collection(collection).add(data);   
  }
  public crearA(collection: string, data: any) 
  {  
   // this.auth.registrarUsuario(data["correo"],data["contrasenia"]);  
     return this.firestore.collection(collection).add(data); 
     

     /*await this.angular.auth.createUserWithEmailAndPassword(cliente["correo"],cliente["clave"]).then(
      accion =>
      {
       let id = this.angularFirestore.createId();
       cliente.id = id;
       this.colecion.doc(id).set(cliente);
      }*/
   }
 
   public obtenerPorId(coleccion:string,id:string)
   {
     return this.firestore.collection(coleccion).doc(id).snapshotChanges();
     // El documento que tenga ese id tal cual este ahora, le saca una foto y me lo devuelve
   }
 
   public obtenerTodos(coleccion:string)
   {
     return this.firestore.collection(coleccion).snapshotChanges();
   }
 
   public actualizar(coleccion:string, data:any,id:string)
   {
     return this.firestore.collection(coleccion).doc(id).set(data);
   }
}
