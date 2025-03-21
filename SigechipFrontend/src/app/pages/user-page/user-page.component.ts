import { Component, ViewEncapsulation } from '@angular/core';
import { PrimengModule } from '../../shared/primeng/primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PropietarioService } from '../../services/propietario.service';
import { Propietario, PropietarioUpdate } from '../../models/propietario';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [PrimengModule, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss',
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None
})
export class UserPageComponent implements OnInit {
  propietarioForm!: FormGroup;
  tipoDocumentos: any[] = [
    { name: 'Cédula de Ciudadanía', value: 1 },
    { name: 'Tarjeta de Identidad', value: 2 },
    { name: 'Pasaporte', value: 3 },
  ];

  getPropietario: Propietario = this.propietarioService.getPropietarioLogin();

  constructor(
    private fb: FormBuilder,
    private propietarioService: PropietarioService,
    private messageService: MessageService
  ) { }

  async ngOnInit(): Promise<void> {
    this.propietarioForm = this.fb.group({
      tipodocumento: [null, Validators.required],
      documento: [null, [Validators.required, Validators.pattern('^[0-9]+$')]],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      celular: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      email: ['', [Validators.required, Validators.email]],
      activo: [false],
    });


    if (this.getPropietario.nombre !== '') {
      this.propietarioForm.patchValue(this.getPropietario);
      this.propietarioForm.patchValue({ tipodocumento: { name: this.getPropietario.tipoDocumento.nombre, value: this.getPropietario.tipoDocumento.id } });
    }

  }

  onSubmit(): void {

    const propietario: PropietarioUpdate = {
      id: this.getPropietario.id,
      nombre: this.propietarioForm.value.nombre,
      apellido: this.propietarioForm.value.apellido,
      tipoDocumentoId: this.propietarioForm.value.tipodocumento.value,
      documento: this.propietarioForm.value.documento,
      celular: this.propietarioForm.value.celular,
      email: this.propietarioForm.value.email,
      password: this.getPropietario.password,
      activo: this.propietarioForm.value.activo,
    };

    this.propietarioService.updatePropietario(propietario).subscribe((data) => {
      this.propietarioService.getPropietarioByEmail(propietario.email).subscribe((dataProp) => {
        this.propietarioService.setPropietarioLogin(dataProp);
        this.showSuccess();
      },(error) => {
        this.showError();
      });
    });

  }

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Propietario Actualizado' });
  }

  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al Guardar' });
  }

}
