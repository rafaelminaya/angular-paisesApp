import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [],
})
export class PorPaisComponent {
  // ATRIBUTOS
  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];

  // CONSTRUCTOR
  constructor(private paisService: PaisService) {}

  // MÉTODOS
  buscar(termino: string) {
    // Asignamos de nuevo el error en false, por si previamente fue modificado.
    this.hayError = false;
    this.termino = termino;

    console.log(this.termino);

    /* - subscribe(response) : 
        Se necesita este método para poder disparar el servicio, el parámtro dentro representa la respuesta obtenida.
        Recibe 3 argumentos opcionales:
        1) next :  Cuando se obtiene una respuesta exitosa. Cuando se recibe un valor.
        2) error:  Cuando se recibe un error.
        3) complete: Cuando se termina y sabemos que no recibiremos nada más.
    */

    // OPCIÓN MODERNA
    this.paisService.buscarPais(this.termino).subscribe({
      next: (paises) => {
        console.log('Next');
        console.log(paises);
        this.paises = paises;
      },
      error: (err) => {
        this.hayError = true;
        console.log('Error');
        console.info(err);
        this.paises = [];
      },
    });

    // OPCIÓN ANTIGUA
    // this.paisService.buscarPais(this.termino).subscribe(
    //   (next) => {
    //     console.log('Next');
    //     console.log(next);
    //   },
    //   (err) => {
    //     this.hayError = true;
    //     console.log('Error');
    //     console.info(err);
    //   }
    // );
  }

  sugerencias(termino: string) {
    this.hayError = false;
  }
}
