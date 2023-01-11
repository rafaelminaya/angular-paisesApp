import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [],
})
export class PorCapitalComponent {
  // ATRIBUTOS
  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];
  mensajeFondo: string = 'Por capital';

  // CONSTRUCTOR
  constructor(private paisService: PaisService) {}

  // MÉTODOS
  buscar(termino: string) {
    this.hayError = false;
    this.termino = termino;

    console.log(this.termino);

    this.paisService.buscarCapital(this.termino).subscribe({
      next: (paises) => {
        console.log('next');
        console.log(paises);
        this.paises = paises;
      },
      error: (err) => {
        console.log('error');
        this.hayError = true;
        console.log(err);
        this.paises = [];
      },
    });
  }
}
