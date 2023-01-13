import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Country } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root',
})
export class PaisService {
  // ATRIBUTOS
  private apiUrl: string = 'https://restcountries.com/v2';

  // GETTER
  get httpParams() {
    // HttpParams : Objeto que permite configurar los parámetros en una petición HTTP.
    // set() : Envíamos los parámetros por medio de un "key/value"
    return new HttpParams().set(
      'fields',
      'name,capital,alpha2Code,flag,population'
    );
  }

  // CONSTRUCTOR
  constructor(private httpClient: HttpClient) {}

  // MÉTODOS
  /*
  Indicamos que devolverá un tipo "Observable", ya que ese es el tipo que retorna la función "get(url)"
  */
  buscarPais(termino: string): Observable<Country[]> {
    // Url del endpoint
    const url = `${this.apiUrl}/name/${termino}`;

    /*
    - Devuelvo la información a quien invoque a la función.
    - pipe() : Permite añadir operadores de RxJS.
    - Los operadores son funciones que se van a ejecutar en base al resultado de la petición HTTP la cual es de tipo "Observable".
    - catchError() : Función que captura un error para devolver un "Observable". 
    Impidiendo que en el "subscribe()" manteniendo el resultado en el parámetro "next", sin enviarlo al "error"
    - of() : Función que transforma el argumento en un "Observable". En este caso un arreglo vacio.
    */
    // return this.httpClient.get(url).pipe(catchError((err) => of([])));
    // Al añadir el genérico  "get<Country[]>", podríamos prescindir del "Observable<Country[]>" en la firma del método
    return this.httpClient.get<Country[]>(url, { params: this.httpParams });
  }

  buscarCapital(termino: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${termino}`;

    return this.httpClient.get<Country[]>(url, { params: this.httpParams });
  }

  getPaisPorCodigo(id: string): Observable<Country> {
    const url = `${this.apiUrl}/alpha/${id}`;

    return this.httpClient.get<Country>(url);
  }

  buscarRegion(region: string): Observable<Country[]> {
    // const url = `${this.apiUrl}/region/${region}?fields=name,capital,alpha2Code,flag,population`;
    const url = `${this.apiUrl}/region/${region}`;

    // Añadimos los parámetros a la petición http
    return this.httpClient
      .get<Country[]>(url, { params: this.httpParams })
      .pipe(tap(console.log));
  }
}
