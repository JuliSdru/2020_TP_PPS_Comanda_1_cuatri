export class UsuarioBD {

    id :number;
    nombre : string ;
    apellido :string;
    dni : string ;
    perfil: string;
    cuil: string;
    foto:string;
   // estado:string;
    //mesa:string;
    //pedido : string;

    constructor(nombre: string,apellido: string, perfil: string,cuil: string,dni?: string,foto?: string){
        this.apellido=apellido;
        this.nombre= nombre;
        this.perfil=perfil;
        this.cuil=cuil;
        if(dni != null){
            this.dni= dni;
        }
        if(foto!=null)
        {
            this.foto= foto;
        }
        
        

    }
}
