import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PorPaisComponent } from './pais/pages/por-pais/por-pais.component';
import { PorRegionComponent } from './pais/pages/por-region/por-region.component';
import { PorCapitalComponent } from './pais/pages/por-capital/por-capital.component';
import { VerPaisComponent } from './pais/pages/ver-pais/ver-pais.component';

// Definimos el arreglo de las rutas.
// 'full' : Para que al estar en exactamente en esta url indicada se muestre el componente
const routes: Routes = [
  {
    path: '', // http://localhost:4200/
    component: PorPaisComponent,
    pathMatch: 'full',
  },
  {
    path: 'region', // http://localhost:4200/region
    component: PorRegionComponent,
  },
  {
    path: 'capital', // http://localhost:4200/capital
    component: PorCapitalComponent,
  },
  // :codigoPais : Indica que este bloque de la URL será dinámica, y "id" es el nombre del argumento
  {
    path: 'pais/:id', // http://localhost:4200/pais/1
    component: VerPaisComponent,
  },

  {
    path: '**', // Ruta en caso busque una url no mapeada. Por lo general esta ruta se pone al final de las demás rutas.
    redirectTo: '', // Rediriremos a la ruta con el " path: '' ",
  },
];

/*
 - "forRoot()" indica que estamos trabajando en la ruta principal, solo tendremos 1 por aplicación
 - Si tuviésemos otras rutas, serían rutas hijas usando "forChild()" en vez de "forRoot"
*/
@NgModule({
  imports: [RouterModule.forRoot(routes)], // Importamos la rutas a usar.
  exports: [RouterModule], // Exportamos el módulo de rutas (para AppModule) para usarlas en toda la aplicación.
})
export class AppRoutingModule {}
