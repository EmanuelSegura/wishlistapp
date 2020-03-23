import { Component } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { ActivatedRoute } from '@angular/router';
import { Lista } from 'src/app/models/lista.model';
import { ListaItem } from 'src/app/models/lista-item.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage {

  lista: Lista;
  nombreItem: '';

  constructor(private deseosService: DeseosService,
              private route: ActivatedRoute){ 
              //Como leer el id del URL? llamo al activatedRoute. 

              const listaId = this.route.snapshot.paramMap.get('listaId'); //Para leerlo del url! No quiero generar un observable asique uso un snapshot paramMap.
      
              //Metodo que esta en deseos.service para obtener esa lista. 
              this.lista = this.deseosService.obtenerLista(listaId);
              console.log(this.lista);
 };

   //Metodo para agregar un item nuevo en una lista.
  agregarItem(){
    if(this.nombreItem.length === 0){
      return;
    }

    const nuevoItem = new ListaItem(this.nombreItem); //Las listas dentro tienen objetos de items. Usamos this.nombreItem como la descripcion obligatoria. 
    this.lista.items.push(nuevoItem); //Agregamos el item al arreglo de items que tiene esa lista. 
    this.nombreItem = ''; //limpiamos la variable.
    this.deseosService.guardarStorage(); //Esto funciona porque JS trabaja por referencia. 
  }

  // Retorna un arreglo con todos los items pendientes. Nos dice cuantos faltan.
  cambioCheck(item:ListaItem){
    // console.log(item);
    const pendientes = this.lista.items.filter(itemData=> !itemData.completado).length;
    //F(x) de flecha en un unico renglon. 
    //el Filter es un metodo que me regresa una coleccion de elementos que cumplan cierta condicion. 

    if(pendientes === 0){
      this.lista.terminadaEn = new Date();
      this.lista.terminada = true;
    }else{
      this.lista.terminadaEn = null;
      this.lista.terminada = false;
    }

    this.deseosService.guardarStorage();
    // console.log('pendientes', pendientes);
    // console.log(this.deseosService.listas);
  };

  borrar(i:number){
    this.lista.items.splice(i,1); //splice nos permite borrar. desde la posicion i (inclusive) y el numero hacia la derecha de borrado. En este caso, solo i.
    this.deseosService.guardarStorage();
  }
          
}
