import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root' //Angular ahora trabaja los servicios de forma global gracias a esto. Se inyectan y se usan directamente en el constructor como con el deseosService
})
export class DeseosService {


  listas:Lista[] = []; //Es de tipo Lista. Para esto hicimos el model.

    // Nos permite manejar una unica instancia del mismo. Se inicializa solo la primera vez que voy a por ej. Pendientes. (Tab1)
  //  ya que el servicio esta de forma global :D Es lo que necesito para que toda la app comparta la misma info.

  constructor() { 
    //El constructor solo se llama una unica vez al iniciar la app.

    this.cargarStorage();
    // console.log(this.listas);
    
  }

    //El objetivo del servicio, manejar una unica instancia a lo largo de toda la aplicacion. 
    // console.log('Servicio de deseos inicializado');

    //Lo que voy a hacer es crear 2 listas que me sirvan para hacer pruebas visuales.loading-content
    // const lista1 = new Lista('Recolectar piedras de el infinito.');
    // const lista2 = new Lista ('Heroes a desaparecer');

    // this.listas.push(lista1, lista2); //Envio al arreglo de listas mis 2 constantes.
    // console.log(this.listas); //Para ver los datos 
    


  crearLista(titulo:string){
    const nuevaLista = new Lista(titulo);
    this.listas.push(nuevaLista);
    this.guardarStorage();

    return nuevaLista.id; //Como es sincrono nos permite retornar el id.
  }

  borrarLista(lista:Lista){
      this.listas = this.listas.filter(listaData => listaData.id !== lista.id) 
      //Retorna si la listaData.id es distinta a la que recibo como argumento. Retorna un nuevo arreglo.this.listas toma ese nuevo valor.
      this.guardarStorage();
  }

  //Lo llamo en mi pagina de agregar lista. agregar.page.ts
  obtenerLista(id:string|number){ //Necesito toda la info relacionada a esa lista gracias al id. 

    id = Number(id); //Nos aseguramos que sea un numero id. 

    return this.listas.find(listaData=>{//busco lista con ese id. 
      return listaData.id === id; //Devuelvo la lista que coincida con el id que estoy recibiendo por el parametro.
    });

  }


  guardarStorage(){
    localStorage.setItem('data', JSON.stringify(this.listas));
    //JSON.stringify -> convierte en un string plano un objeto. localStorage solo acepta pares de strings!
  }

  cargarStorage(){

    if (localStorage.getItem('data')){
      this.listas = JSON.parse (localStorage.getItem('data')); //nos pide el key con el que grabe el objeto en el guardarStorage, osea, data. 
      //Hacemos lo contrario al stringify. Mandamos a validar el JSON. Hacemos la validacion para evitar el null.
    }else{
      this.listas = []; //Linea innecesaria. Es para que quede mas claro.
    }
    
  }


}
