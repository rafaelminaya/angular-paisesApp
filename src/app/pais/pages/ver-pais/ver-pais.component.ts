import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [],
})
export class VerPaisComponent implements OnInit {
  pais!: Country;

  // ActivatedRoute : Viene con todo lo necesario para suscribirnos a cualqiuer cambio en la URL del componente actual.
  constructor(
    private activatedRoute: ActivatedRoute,
    private paisService: PaisService
  ) {}

  // El ngOnInit() realiza una labor cuando el componente está inicializado
  // o también conocido como "a penas carga la página".
  // usaremos este método para suscribirnos a los cambios del URL del componente actual
  ngOnInit(): void {
    // Nos suscribiremos a cualquier cambio de la parte dinámica de la ruta del componente actual,
    // representada por el ":id", que es: " http://localhost:4200/pais/:id"
    // 1° OPCIÓN

    /*
    this.activatedRoute.params.subscribe(({ id }) => {
      console.log('param:', id);

      this.paisService.getPaisPorCodigo(id).subscribe((pais) => {
        this.pais = pais;
        console.log('pais: ', pais);
      });
    });
    */

    // 2° OPCIÓN
    /*
    - pipe() : Permite añadir en el argumento a diferentes parámetros "rxjs"
    -  switchMap() : Operador rxjs de transformación que recibe un Observable y devolver un Observable.
     Similar al "flatMap()" de Java 8.
    - tap() : Es operador que dispara un efecto secundario. Recibe el resultado imprimiendo en consola lo obtenido.
    */
    this.activatedRoute.params
      .pipe(
        switchMap((urlParam) => {
          return this.paisService.getPaisPorCodigo(urlParam['id']);
        }),
        tap((response) => console.log(response))
      )
      .subscribe((pais) => {
        this.pais = pais;
        //console.log('pais: ', pais);
      });
  }
}
