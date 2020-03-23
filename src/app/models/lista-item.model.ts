export //Porque necesito utilizarla fuera de este archivo lista-item.model.ts
class ListaItem {
        
    //Creamos el esqueleto con los items de la lista.
    desc: string;
    completado: boolean;

    constructor(desc:string){//Solo inicializamos el desc ya que el 'completado' va a estar por defecto en falso. 

            
            this.desc = desc;
            this.completado = false;
    } 
}