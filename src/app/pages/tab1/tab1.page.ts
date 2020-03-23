import { Component } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { Identifiers } from '@angular/compiler';
import { Lista } from 'src/app/models/lista.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  
  //Defino el constructor porque sino no puedo inyectar nada. Inyecto el servicio publicamente y lo importo arriba.
  // Usamos el router ya que queremos navegar. Private xq solo lo usamos en este archivo.
  constructor(public deseosService:DeseosService, 
              private router: Router, 
              private alertCtrl: AlertController) {
    
        


  }

  //Boton para agregar una lista nueva. 
  //async sirve para convertir la funcion/metodo en una promesa. 
  async agregarLista(){
    
      const alert =  await this.alertCtrl.create({
        //await = espera a que todo el codigo se ejecute y luego lo guarde en la constante.
        header: 'Nueva lista',
        inputs: [
          {
            name: 'titulo',
            type: 'text',
            value: '',
            placeholder: 'Nombre de la lista'
          }
        ],
          buttons: [
            {
            text: 'Cancelar',
            role: 'cancel',
            handler: ()=>{
              console.log('Cancelar');
            }
            },
            {
            text:'Crear',
            handler: (data)=>{
              console.log(data);
              if (data.titulo.length === 0){
                    return;
              }

              const listaId = this.deseosService.crearLista(data.titulo); //Creo la lista con el titulo asignado. Lo llamo de deseosService que es global.
              // listaId me guarda el return del this.deseosService con el Id. 

              // Tengo que crear la lista
              this.router.navigateByUrl(`/tabs/tab1/agregar/${listaId}`);


            }
            }
          ]
      });
  
      alert.present();
  }




}
