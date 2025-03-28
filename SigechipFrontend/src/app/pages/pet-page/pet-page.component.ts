import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PrimengModule } from '../../shared/primeng/primeng.module';
import { Router } from '@angular/router';
import { MascotaService } from '../../services/mascota.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Mascota, MascotaFull } from '../../models/mascota';
import { PropietarioService } from '../../services/propietario.service';
import { Propietario } from '../../models/propietario';
import { QrCodeComponent } from '../../components/qr-code/qr-code.component';

@Component({
  selector: 'app-pet-page',
  standalone: true,
  imports: [PrimengModule, QrCodeComponent],
  templateUrl: './pet-page.component.html',
  styleUrl: './pet-page.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [ConfirmationService, MessageService]
})
export class PetPageComponent implements OnInit {
  // pets = [
  //   { id: 1, name: 'Rex', breed: 'Pastor Alemán', age: 3, gender: 'Macho', image: '/assets/Images/Gato1.jpg' },
  //   { id: 2, name: 'Bella', breed: 'Labrador', age: 2, gender: 'Hembra', image: '/assets/Images/Gato1.jpg' },
  //   { id: 2, name: 'Bella', breed: 'Labrador', age: 2, gender: 'Hembra', image: '/assets/Images/Gato1.jpg' },
  //   { id: 2, name: 'Bella', breed: 'Labrador', age: 2, gender: 'Hembra', image: '/assets/Images/Gato1.jpg' },
  //   { id: 2, name: 'Bella', breed: 'Labrador', age: 2, gender: 'Hembra', image: '/assets/Images/Gato1.jpg' },
  //   // Agrega más mascotas aquí
  // ];

  pets: MascotaFull[] = [];
  propietario!: Propietario

  displayQrModal: boolean = false; // Controla la visibilidad del modal
  qrData: string = ''; // Datos del QR que se mostrarán

  petId: number = 0;

  constructor(
    private router: Router,
    private mascotaService: MascotaService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private propietarioService: PropietarioService
  ) {
  }

  async ngOnInit() {

    this.propietario = await this.propietarioService.getPropietarioLogin();

    // if (this.propietario) {

    //   this.mascotaService.getMascotasByPropietarioId(this.propietario.id).subscribe((pets: MascotaFull[]) => {
    //     this.pets = pets;
    //     console.log('Mascotas:', this.pets);

    //   });
    // }
    this.loadData();

  }

  loadData() {

    if (this.propietario) {

      this.mascotaService.getMascotasByPropietarioId(this.propietario.id).subscribe((pets: MascotaFull[]) => {
        this.pets = pets;
        console.log('Mascotas:', this.pets);

      });
    }
  }

  deletePet(event: Event, pet: any) {
    // Lógica para eliminar la mascota por ID
    // console.log('Eliminando mascota con ID:', id);
    // this.pets = this.pets.filter(pet => pet.id !== id);

    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Quieres eliminar esta mascota?',
      header: 'Confirmacion',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
      acceptLabel: "Sí",
      rejectLabel: "No",
      accept: () => {
        // this.mascotaService.deleteMascota(id).subscribe(() => {
        //   this.messageService.add({ severity: 'success', summary: 'Confirmación', detail: 'Masota Eliminada', life: 3000 });
        //   this.loadData();
        // });
        pet.activo = false;

        this.mascotaService.updateMascota(pet).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Confirmación', detail: 'Masota Eliminada', life: 3000 });
          this.loadData();
        });

      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rechazado', detail: 'No se Elimino', life: 3000 });
      }
    });

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

  calcularEdad(fechaNacimiento: number | string | Date): number {
    const fechaNac = new Date(fechaNacimiento); // Maneja distintos formatos
    const hoy = new Date();

    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mes = hoy.getMonth() - fechaNac.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
      edad--;
    }

    return edad;
  }

  showRfidCard(event: number) {
    this.router.navigate([`/cards/${event}`]);
  }

  showQrModal(petId: number) {
    console.log('Mostrando QR para mascota con ID:', petId);
    
    // const pet = this.pets.find(p => p.id === petId);
    // if (pet) {
      // this.qrData = `Nombre: ${pet.nombre}\nID: ${pet.id}\nURL: http://localhost:4205/petdetail/${pet.id}`;
      this.petId = petId;
      this.displayQrModal = true;
    // }

  }

  closeQrModal() {
    this.displayQrModal = false;
  }
}
