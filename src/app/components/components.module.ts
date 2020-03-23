// La idea de los modulos es poner toda la logica relacionada a los componentes. 
// Para que al importarlos, simplemente importando el modulo de Componentes, seria suficiente.

import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { CommonModule } from '@angular/common'; //Es el ngif, ngfor etc. 
import { ListasComponent } from './listas/listas.component'; //Lo importo al declararlo en el ngModule.
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';



@NgModule({
  declarations: [ListasComponent], 
  exports: [
    ListasComponent
    //Todas las cosas que son propias de este modulo que van a ser necesarias si necesito este modulo o componentes en otra pagina. Ejemplo en tab1page 
  ],
  imports: [
    CommonModule,
    IonicModule, //Es necesario importar el Ionic Module! 
    // IonicModule es un NgModule que inicia una aplicación Ionic. Al pasar un componente raíz, IonicModule se asegurará de que se importen todos los componentes, directivas y proveedores del marco.
    PipesModule //Importamos el modulo de Pipes para poder usarlo.
  
  ]
})
export class ComponentsModule { }
