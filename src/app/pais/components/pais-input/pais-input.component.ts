import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styles: [],
})
/*
OnInit : Ciclo de vida de un componente que necesita implementar el método "ngOnInit()"
*/
export class PaisInputComponent implements OnInit {
  @Input()
  mensajePlaceholder: string = '';

  // onEnter : Esta propiedad será un "emisor dedeventos", es decir, un evento encargada de emitir otras propiedades.
  // EventEmitter<string> : Será de tipo "string" ya que la propiedad a emitir "termino" es de tipo "string"
  @Output()
  onEnter: EventEmitter<string> = new EventEmitter();

  // Evento que emite un string, en este caso se emitirá cuando el usuario deje de escribir en la caja de texto
  // Un "onDebounce" puede trabajar más fácil con formularios reactivos.
  // La librería "RxJs" viene con un Observable especial llamado "subject", el cual permite crear un "Observable" manualmente
  @Output()
  onDebounce: EventEmitter<string> = new EventEmitter();

  // Creación del Observable manualmente. Así que también se podrá disparar con el método "subscribe()"
  // Subject : Pertenece a la librería "RxJs" el cual es una librería externa de JavaScript pero usada también por Angular.
  debouncer: Subject<string> = new Subject();

  termino: string = '';

  // MÉTODO ngOnInit - Se dispara una única vez cuando el componente es creado
  ngOnInit(): void {
    /* 
     - Me suscribo a los eventos del Observable "debouncer".
     - debounceTime() : Operador "rxjs" que indica cuántos milisegundos espera antes de emitir el siguiente valor.
     - Prácticamente estamos indicando que no emita el "subscribe()" hasta que el Observable "this.debouncer"
     deje de emitir valor por los siguientes 300 milisegundos.
    */
    this.debouncer.pipe(debounceTime(300)).subscribe((valorTermino) => {
      console.log('debouncer: ', valorTermino);
      // Emitimos el valor obtenido hacia el template por medio de la propiedad/evento "onDebounce".
      this.onDebounce.emit(valorTermino);
    });
  }

  buscar() {
    // Emitimos la propiedad "termino" por medio de la propiedad/evento "onEnter".
    // Se emitirá hacie el selector "<app-pais-input></app-pais-input>"
    this.onEnter.emit(this.termino);
  }

  // llamamos al "debouncer" para emitir un valor
  teclaPresionada() {
    /*
    - next() : 
    - Envía el valor indicado en el argumento al observable "debouncer"
    - De esta manera conecto a la propiedad "debouncer" con la propiedad "termino"
    - Y como el "next()" del "debouncer" ya está suscrito en el "ngOnInit" por medio del "subscribe()",
    se recibirá el nuevo valor en dicho "subscribe()" para ser trabajarlo ahí, por ejemplo con operadores de 
    "RxJs" como "pipe()" al ser un "Observable"
    */
    this.debouncer.next(this.termino);
  }
}
