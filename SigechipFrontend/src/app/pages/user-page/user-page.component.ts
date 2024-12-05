import { Component, ViewEncapsulation } from '@angular/core';
import { PrimengModule } from '../../shared/primeng/primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [PrimengModule, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class UserPageComponent implements OnInit {
  propietarioForm!: FormGroup;
  tipoDocumentos: any[] = [
    { name: 'Cédula de Ciudadanía', value: 1 },
    { name: 'Tarjeta de Identidad', value: 2 },
    { name: 'Pasaporte', value: 3 },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.propietarioForm = this.fb.group({
      tipo_documento: [null, Validators.required],
      documento: [null, [Validators.required, Validators.pattern('^[0-9]+$')]],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      celular: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      email: ['', [Validators.required, Validators.email]],
      activo: [false],
    });
  }

  onSubmit(): void {
    if (this.propietarioForm.valid) {
      console.log('Formulario enviado', this.propietarioForm.value);
    } else {
      console.log('Formulario no válido');
    }
  }
  
}
