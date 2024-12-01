import { Component, ViewEncapsulation } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PrimengModule } from '../../shared/primeng/primeng.module';
import { FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, PrimengModule, FormsModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  providers: [ConfirmationService, MessageService],
  encapsulation: ViewEncapsulation.None
})
export class LayoutComponent {

  visible: boolean = false;
  _loadingButton: boolean = false;
  idMascota: string = '';

  items: any[] = [
    {
      label: 'Menu',
      items: [
        {
          label: 'Mascotas',
          icon: 'bi bi-postcard'
          // icon: 'pi pi-refresh'
        },
        {
          label: 'Contacto',
          icon: 'bi bi-file-person'
        },
        {
          label: 'Cerrar Sesión',
          icon: 'pi pi-sign-out'
        }
      ]
    }
  ]


  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) { }

  showCardId(event: Event) {
    this.visible = true;
  }

  searchByIdCard() {
    this._loadingButton = true;

    setTimeout(() => {
      this._loadingButton = false
      this.visible = false;
      this.router.navigate(['/pet']);

    }, 2000);

  }
}
