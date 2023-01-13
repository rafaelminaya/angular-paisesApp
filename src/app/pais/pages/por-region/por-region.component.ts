import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [
    `
      button {
        margin-right: 5px;
      }
    `,
  ],
})
export class PorRegionComponent {
  // ATRIBUTOS
  paises: Country[] = [];
  regiones: string[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];
  regionActiva: string = '';

  // CONSTRUCTOR
  constructor(private paisService: PaisService) {}

  // MÉTODOS
  getClaseCSS(region: string): string {
    return region === this.regionActiva
      ? 'btn btn-primary'
      : 'btn btn-outline-primary';
  }

  activarRegion(region: string) {
    // Validadción para detener la petición en caso se vuelve a consultar la misma región
    if (region == this.regionActiva) {
      return;
    }
    this.regionActiva = region;
    // reiniciamos los paises para ser más optimizado
    this.paises = [];

    this.paisService.buscarRegion(region).subscribe((paises) => {
      this.paises = paises;
    });
  }
}
