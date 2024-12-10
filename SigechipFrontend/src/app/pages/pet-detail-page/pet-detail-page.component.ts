import { Component, ViewEncapsulation } from '@angular/core';
import { PrimengModule } from '../../shared/primeng/primeng.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pet-detail-page',
  standalone: true,
  imports: [PrimengModule, CommonModule, ReactiveFormsModule],
  templateUrl: './pet-detail-page.component.html',
  styleUrl: './pet-detail-page.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class PetDetailPageComponent {
  mascotaForm: FormGroup;

  especies = [
    { label: 'Perro', value: 1 },
    { label: 'Gato', value: 2 },
    // Agrega más especies según sea necesario
  ];

  razas = [
    { label: 'Labrador', value: 1 },
    { label: 'Siames', value: 2 },
    // Agrega más razas según sea necesario
  ];

  generos = [
    { label: 'Macho', value: 1 },
    { label: 'Hembra', value: 2 },
    // Agrega más géneros según sea necesario
  ];

  constructor(
    private fb: FormBuilder
  ) {
    this.mascotaForm = this.fb.group({
      id_propietario: ['', Validators.required],
      tipo_documento: ['', Validators.required],
      documento: [''],
      nombre: ['', Validators.required],
      id_especie: ['', Validators.required],
      id_raza: ['', Validators.required],
      id_genero: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      peso: [''],
      foto: [''],
      descripcion: [''],
      activo: [true],
      // Los campos fecha_creacion y fecha_actualizacion suelen manejarse automáticamente en el backend
    });
  }

  onSubmit() {
    if (this.mascotaForm.valid) {
      console.log('Formulario enviado', this.mascotaForm.value);
      // Aquí puedes manejar el envío del formulario, por ejemplo, enviarlo a un servicio
    } else {
      console.log('Formulario inválido');
    }
  }
}