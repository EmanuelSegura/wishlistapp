import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { Router } from '@angular/router';
import { Lista } from 'src/app/models/lista.model';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {


  @ViewChild(IonList,{ static: true}) lista:IonList; //Para poder hacer lo del sliding items y que se cierren solos. 

  @Input() terminada = true; //Es una propiedad que voy a esperar dependiendo del componente estoy en terminados/pendientes
  

  constructor( public deseosService:DeseosService, private router:Router, private alertCtrl:AlertController) { 
    //Si quiero utilizar fuera de esta clase, hay que ponerlo public. El html es considerado externo.  
  }

  ngOnInit() {}

  listaSeleccionada(lista:Lista){
    if(this.terminada===true){
    //Navegar hacia la lista en la que clickeamos con su id correspondiente.
    this.router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`);
    }else{
    this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
    }
  };

    
  borrarLista(lista:Lista){
    this.deseosService.borrarLista(lista);
  }

  async editarLista(lista:Lista){
    
    const alert =  await this.alertCtrl.create({
      //await = espera a que todo el codigo se ejecute y luego lo guarde en la constante.
      header: 'Editar lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: lista.titulo
        }
      ],
        buttons: [
          {
          text: 'Cancelar',
          role: 'cancel',
          handler: ()=>{
            console.log('Cancelar');
            this.lista.closeSlidingItems();
          }
          },
          {
          text:'Actualizar',
          handler: (data)=>{
            console.log(data);
            if (data.titulo.length === 0){
                  return;
            }
            lista.titulo = data.titulo //Actualizamos el texto que acaban de escribir con respecto al titulo anterior.
           
          this.deseosService.guardarStorage();
          this.lista.closeSlidingItems();

          }
          }
        ]
    });

    alert.present();

}
};
