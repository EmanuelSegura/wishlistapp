import { Pipe, PipeTransform } from '@angular/core';
import { Lista } from '../models/lista.model';

@Pipe({
  name: 'filtroCompletado',
  pure: false //Solo se van a modificar o llamar cuando la accion del ciclo de deteccion de cambios suceda en el mismo componente en el que estan usando. Poniendolo en false, se llamara a este pipe cada vez que haya un ciclo de deteccion de cambios.
})
export class FiltroCompletadoPipe implements PipeTransform {

  transform(listas: Lista[], completada: boolean=true): Lista[] {
    
   return listas.filter(lista => lista.terminada === completada);
   //Retorno las listas pasadas por el filtro fijandonos que el completada de las listaas este en true.
   // Usamos el pipe como ayuda para crear nuestro filtro.

  }

}
