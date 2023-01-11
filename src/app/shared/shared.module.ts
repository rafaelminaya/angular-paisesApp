import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';

// Importamos "RouterModule" para poder usar propiedades como routerLink, routerLinkActive, routerLinkActiveOptions en los template módulo actual
@NgModule({
  declarations: [SidebarComponent],
  exports: [SidebarComponent],
  imports: [CommonModule, RouterModule],
})
export class SharedModule {}
