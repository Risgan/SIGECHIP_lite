import { AfterContentInit, AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PrimengModule } from '../../shared/primeng/primeng.module';
import { FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PropietarioService } from '../../services/propietario.service';
import { Propietario } from '../../models/propietario';
import { After } from 'node:v8';
import { PetSearchComponent } from '../pet-search/pet-search.component';
import { TarjetaService } from '../../services/tarjeta.service';
import { MascotaService } from '../../services/mascota.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, PrimengModule, FormsModule, PetSearchComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  providers: [ConfirmationService, MessageService],
  encapsulation: ViewEncapsulation.None
})
export class LayoutComponent implements OnInit, AfterViewInit, AfterContentInit {

  visible: boolean = false;
  idMascota: string = '';

  propietario!: Propietario

  items: any[] = []


  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router,
    private propietarioService: PropietarioService,
    private tarjetaService: TarjetaService,
    private mascotaService: MascotaService
  ) { }

  ngAfterContentInit(): void {
    // throw new Error('Method not implemented.');
    this.propietario = this.propietarioService.getPropietarioLogin();
  }

  ngAfterViewInit(): void {
    // Perform any additional initialization after the view has been fully initialized
    // console.log('View has been initialized');
  }

  ngOnInit() {
    this.checkTokenAndSetupMenu();
  }

  showCardId(event: Event) {
    this.visible = true;
  }

  searchByIdCard(event: any) {
    // this._loadingButton = true;
    debugger
    if (event == null || event == 0) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se encontro una mascota con ese ID' });

    }
    else {

      this.tarjetaService.getByNumero(event).subscribe({
        next: (data) => {
          if (data) {
            console.log('Tarjeta encontrada:', data);
            this.router.navigate([`/petdetail/${data.idMascota}`]);
            this.visible = false;

          }
        },
        error: (error) => {
          if (error.status === 404) {

            console.log('Tarjeta no encontrada, ejecutar otra acción.');
            this.mascotaService.getMascotaById(event).subscribe({
              next: (pet) => {
                if (pet) {
                  console.log('Mascota encontrada:', pet);
                  this.router.navigate([`/petdetail/${pet.id}`]);
                  this.visible = false;

                }
              },
              error: (error) => {
                if (error.status === 404) {
                  console.log('Mascota no encontrada, ejecutar otra acción.');
                  this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se encontro una mascota con ese ID' });
                  this.visible = false;

                } else {
                  // Manejo de otros errores
                  console.error('Error inesperado:', error);
                  this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se encontro una mascota con ese ID' });
                  this.visible = false;


                }
              }
            });

          } else {
            // Manejo de otros errores
            console.error('Error inesperado:', error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se encontro una mascota con ese ID' });
            this.visible = false;

          }
        }
      });

      // setTimeout(() => {
      //   // this._loadingButton = false
      //   // this.router.navigate(['/pet']);

      // }, 2000);
    }

  }

  redirect(url: string) {
    this.router.navigate([url]);
  }

  checkTokenAndSetupMenu(): void {
    // Verificar si hay un token en el localStorage
    const token = localStorage.getItem('token');

    // Si hay token, agregar todos los items del menú
    if (token) {
      this.items = [
        {
          label: 'Menu',
          items: [
            {
              label: 'Home',
              icon: 'bi bi-house',
              command: () => this.router.navigate(['/home'])
            },
            {
              label: 'Mascotas',
              icon: 'bi bi-postcard',
              command: () => this.router.navigate(['/pet'])
            },
            {
              label: 'Contacto',
              icon: 'bi bi-file-person',
              command: () => this.router.navigate(['/contact'])
            },
            {
              label: 'Cerrar Sesión',
              icon: 'pi pi-sign-out',
              command: () => this.logout()
            }
          ]
        }
      ];
    } else {
      // Si no hay token, solo mostrar opciones mínimas como "Login" o "Register"
      this.items = [
        {
          label: 'Menu',
          items: [
            {
              label: 'Login',
              icon: 'pi pi-sign-in',
              command: () => this.router.navigate(['/login'])
            },
            {
              label: 'Register',
              icon: 'pi pi-user-plus',
              command: () => this.router.navigate(['/register'])
            }
          ]
        }
      ];
    }
  }

  logout(): void {
    // Aquí puedes limpiar el token y redirigir a login
    localStorage.removeItem('token');
    localStorage.removeItem('propietario');
    this.router.navigate(['/login']);
  }
}
