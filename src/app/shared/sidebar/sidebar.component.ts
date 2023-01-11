import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  // Indicamos que los elementos "li" de este componente tendrán el estilo de cursor
  styles: [
    `
      li {
        cursor: pointer;
      }
    `,
  ],
})
export class SidebarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
