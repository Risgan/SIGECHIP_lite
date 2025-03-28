import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PrimengModule } from '../../shared/primeng/primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TarjetaService } from '../../services/tarjeta.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Tarjeta } from '../../models/tarjeta';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-card-rfid-page',
  standalone: true,
  imports: [PrimengModule, FormsModule, KeyFilterModule, ReactiveFormsModule],
  templateUrl: './card-rfid-page.component.html',
  styleUrl: './card-rfid-page.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [ConfirmationService, MessageService]
})
export class CardRfidPageComponent implements OnInit {

  tarjetas: Tarjeta[] = [];
  displayDialog: boolean = false;
  tarjeta: string | null = '';
  id: number = 0;

  block: boolean = false;

  constructor(
    private tarjetaService: TarjetaService,
    private router: Router,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {

    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.tarjetaService.getAll().subscribe(data => {
      this.tarjetas = data.filter(x => x.idMascota == this.id);
    });
  }

  return() {
    this.router.navigate(['/pet']);
  }

  updateEstate(id: number) {


    this.confirmationService.confirm({
      message: '¿Estás seguro de que quieres eliminar esta tarjeta?',
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      accept: () => {
        // this.updateEstate(id);
        this.tarjetaService.deactivate(id).subscribe(data => {
          this.loadData();
        });
        this.messageService.add({ severity: 'success', summary: 'Eliminado', detail: 'Tarjeta eliminada correctamente' });
      },
      reject: () => {
        this.messageService.add({ severity: 'info', summary: 'Cancelado', detail: 'Acción cancelada' });
      }
    });
  }

  showDialog() {
    this.displayDialog = true;
  }

  closeDialog() {
    this.displayDialog = false;
    this.tarjeta = '';
  }

  saveCard() {
    this.block = true;

    if (this.tarjeta) {

      var newCard: Tarjeta = {
        id: 0,
        numeroTarjeta: this.tarjeta,
        idMascota: this.id,
        activo: true
      }

      this.tarjetaService.create(newCard).subscribe(data => {
        this.loadData();
      });
      console.log(newCard);


      this.closeDialog();
      this.block = false;

    }
  }
}
