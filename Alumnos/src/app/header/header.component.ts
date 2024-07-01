import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TabMenuModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'] // Corrección: 'styleUrls' en plural
})
export class HeaderComponent implements OnInit {
  elementosDelMenu: MenuItem[] | undefined; // Corrección: array de MenuItem

  ngOnInit(): void {
    this.elementosDelMenu = [
      {
        label: 'Home',
        icon: 'pi pi-home', // Agrega un icono si lo necesitas
        routerLink: ['/home']
      },
      {
        label: 'Alumnos',
        icon: 'pi pi-users', // Agrega un icono si lo necesitas
        routerLink: ['/alumnos']
      },
      {
        label: 'Alumnos Form',
        icon: 'pi pi-user-edit', // Agrega un icono si lo necesitas
        routerLink: ['/alumnosForm']
      }
    ];  
  }
}
