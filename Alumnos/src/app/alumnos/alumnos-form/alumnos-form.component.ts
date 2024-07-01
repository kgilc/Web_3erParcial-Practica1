import { Component } from '@angular/core';
import { AlumnoService } from '../../service/alumno.service';
import { Alumno } from '../../model/Alumno';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-alumnos-form',
  standalone: true,
  imports: [FormsModule, InputTextModule, ButtonModule, InputNumberModule, ConfirmDialogModule, ToastModule],
  templateUrl: './alumnos-form.component.html',
  styleUrl: './alumnos-form.component.css',
  providers: [ConfirmationService, MessageService]
})
export class AlumnosFormComponent {
  alumno: Alumno = new Alumno();
  isEdit: boolean = false;

  constructor(
    private alumnoService: AlumnoService,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEdit = true;
      this.alumnoService.getAlumno(id).subscribe(
        (data: Alumno) => {
          this.alumno = data;
        },
        error => {
          console.error('Error al obtener alumno:', error);
        }
      );
    }
  }

  saveAlumno() {
    if (this.isEdit) {
      this.alumnoService.updateAlumno(this.alumno.id, this.alumno).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Alumno actualizado' });
        },
        error => {
          console.error('Error al actualizar alumno:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar el alumno' });
        }
      );
    } else {
      this.alumnoService.createAlumno(this.alumno).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Alumno creado' });
        },
        error => {
          console.error('Error al crear alumno:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo crear el alumno' });
        }
      );
    }
  }

  confirm() {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que quieres realizar esta acción?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.saveAlumno();
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rechazado', detail: 'Has cancelado' });
      }
    });
  }
}
