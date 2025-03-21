import { Component, ViewEncapsulation } from '@angular/core';
import { PrimengModule } from '../../shared/primeng/primeng.module';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PropietarioService } from '../../services/propietario.service';
import { Propietario } from '../../models/propietario';

@Component({
  selector: 'app-forgot-password-page',
  standalone: true,
  imports: [PrimengModule, FormsModule],
  templateUrl: './forgot-password-page.component.html',
  styleUrl: './forgot-password-page.component.scss',
  // encapsulation: ViewEncapsulation.None
})
export class ForgotPasswordPageComponent {

  _loadingButton: boolean = false;
  correo: string = '';
  mostrarDialog: boolean = false;
  nuevaContrasena: string = '';
  propietario!: Propietario

  constructor(
    private router: Router,
    private propietarioService: PropietarioService
  ) { }

  load() {
    this._loadingButton = true;

    this.propietarioService.getPropietarioByEmail(this.correo).subscribe(propietario => {
      console.log('Propietario:', propietario);

      if (propietario != null) {
        this.propietario = propietario;        
        this.mostrarModal();
        this._loadingButton = false;

      }
      else {
        console.log('Correo no encontrado');
        this._loadingButton = false;
      }
    });

    // setTimeout(() => {
    // }, 2000);
  }

  mostrarModal() {
    this.mostrarDialog = true;
  }

  ocultarModal() {
    this.mostrarDialog = false;
  }

  guardarNuevaContrasena() {
    console.log('Nueva contraseña:', this.nuevaContrasena);
    this.propietario.password = this.nuevaContrasena;
    this.propietarioService.updatePropietario(this.propietario).subscribe(() => {
      this.ocultarModal();
      this.redirect('/login');
    });
  }

  redirect(url: string) {
    this.router.navigate([url]);
  }

}
