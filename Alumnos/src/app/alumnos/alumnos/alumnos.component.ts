import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Alumno } from '../../model/Alumno';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AlumnoService } from '../../service/alumno.service';

@Component({
  selector: 'app-alumnos',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TableModule,
    ButtonModule,
    ConfirmPopupModule,
    ToastModule
  ],
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css'],
  providers: [ConfirmationService, MessageService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Agregar esto para suprimir el error
})
export class AlumnosComponent implements OnInit {
  losAlumnos: Alumno[] = [];

  constructor(
    private confirmationService: ConfirmationService, 
    private messageService: MessageService,
    private alumnoService: AlumnoService // Inyecta el servicio
  ) {}

  ngOnInit() {
    this.cargarAlumnos();
  }

  cargarAlumnos() {
    this.alumnoService.getAlumnos().subscribe(
      (data) => {
        this.losAlumnos = data;
      },
      (error) => {
        console.error('Error al cargar alumnos', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los alumnos' });
      }
    );
  }

  confirm2(event: Event, id: number) {
  this.confirmationService.confirm({
    target: event.target as EventTarget,
    message: '¿Estás seguro que deseas eliminar este alumno?',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.alumnoService.deleteAlumno(id).subscribe(
        () => {
          this.messageService.add({ severity: 'info', summary: 'Confirmado', detail: 'Alumno eliminado' });
          this.cargarAlumnos(); // Recargar la lista después de eliminar
        },
        (error) => {
          console.error('Error al eliminar alumno', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar el alumno' });
        }
      );
    },
    reject: () => {
      this.messageService.add({ severity: 'error', summary: 'Rechazado', detail: 'Eliminación cancelada' });
    }
  });
}
}
