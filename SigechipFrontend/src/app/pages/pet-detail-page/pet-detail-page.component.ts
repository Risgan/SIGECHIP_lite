import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PrimengModule } from '../../shared/primeng/primeng.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pet-detail-page',
  standalone: true,
  imports: [PrimengModule, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './pet-detail-page.component.html',
  styleUrl: './pet-detail-page.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class PetDetailPageComponent implements OnInit {

  nombreMascota: string= 'Nombre Mascota';
  value?: string = 'value';

  tipoDocumentos: any[]= [
    {label: 'Cédula de Ciudadanía', value: 'CC'},
    {label: 'Tarjeta de Identidad', value: 'TI'},
    {label: 'Cédula de Extranjería', value: 'CE'},
    {label: 'Pasaporte', value: 'PA'}
  ]

  selectTipoDoc: string = 'CC';

  petform!: FormGroup;

  date: Date = new Date();
  minDate: Date = new Date();
  maxDate: Date = new Date();
 
  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    // this.petform = this.fb.group({
    //   nombre: ['', Validators.required],
    //   tipoDoc: ['', Validators.required],
    //   numeroDoc: ['', Validators.required],
    //   fechaNacimiento: ['', Validators.required]
    // });
    this.minDate = new Date();
        this.maxDate = new Date();
  }
}