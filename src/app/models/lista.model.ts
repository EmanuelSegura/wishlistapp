import { ListaItem } from './lista-item.model';

//Esta lista tiene informacion sobre la agrupacion de las tareas que yo quiero asignar

export class Lista{
    
    id:number;
    titulo:string;
    creadaEn: Date; 
    terminadaEn: Date;
    terminada: boolean;
    items:ListaItem[]; //items es de tipo ListaItem. Una clase que creamos en lista-item.model.ts

    constructor(titulo:string){ //Es la instruccion que se llama cuando creamos una nueva instancia de la lista.
this.titulo = titulo;
this.creadaEn = new Date();
this.terminada = false;
this.items = [];
this.id = new Date().getTime(); //Genera un entero unico. Va a ser imposible que 2 listas tengan exactamente el mismo instante.
    }
}