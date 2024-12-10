import { Component } from '@angular/core';
import { PrimengModule } from '../../shared/primeng/primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [PrimengModule, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.scss'
})
export class ContactPageComponent {

  contact = {
    ownerName: '',
    phone: '',
    email: ''
  };

  onSubmit() {
    console.log('Datos de contacto actualizados:', this.contact);
  }
}
