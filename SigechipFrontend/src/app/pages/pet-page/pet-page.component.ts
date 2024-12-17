import { Component, ViewEncapsulation } from '@angular/core';
import { PrimengModule } from '../../shared/primeng/primeng.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pet-page',
  standalone: true,
  imports: [PrimengModule],
  templateUrl: './pet-page.component.html',
  styleUrl: './pet-page.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class PetPageComponent {
  pets = [
    { id: 1, name: 'Rex', breed: 'Pastor Alemán', age: 3, gender: 'Macho', image: '/assets/Images/Gato1.jpg' },
    { id: 2, name: 'Bella', breed: 'Labrador', age: 2, gender: 'Hembra', image: '/assets/Images/Gato1.jpg' },
    { id: 2, name: 'Bella', breed: 'Labrador', age: 2, gender: 'Hembra', image: '/assets/Images/Gato1.jpg' },
    { id: 2, name: 'Bella', breed: 'Labrador', age: 2, gender: 'Hembra', image: '/assets/Images/Gato1.jpg' },
    { id: 2, name: 'Bella', breed: 'Labrador', age: 2, gender: 'Hembra', image: '/assets/Images/Gato1.jpg' },
    // Agrega más mascotas aquí
  ];


  constructor(private router: Router) {
  }

  deletePet(id: number) {
    // Lógica para eliminar la mascota por ID
    console.log('Eliminando mascota con ID:', id);
    this.pets = this.pets.filter(pet => pet.id !== id);
  }

  createPet() {
    this.router.navigate(['/petcreate']);
  }

  showDetail(id: number) {
    this.router.navigate(['/petdetail', id]);
  }

  editPet(id: number) {
    this.router.navigate(['/petupdate', id]);
  }
}
