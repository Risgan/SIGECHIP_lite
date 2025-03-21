import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, Form, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PrimengModule } from '../../shared/primeng/primeng.module';
import { PropietarioService } from '../../services/propietario.service';
import { PropietarioCreate } from '../../models/propietario';
import { TipoDocumento } from '../../models/tipo-documento';
import { TipoDocumentoService } from '../../services/tipo-documento.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [PrimengModule, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class RegisterPageComponent implements OnInit{
  
  _showPassword: string = 'password';
  _showConfirmPassword: string = 'password';
  _loadingButton: boolean = false;

  _propietario?: PropietarioCreate;
  propietarioform!: FormGroup;

  listTipoDoc: TipoDocumento[] = [];
  selectTipoDoc: string="";

  constructor(
    private readonly router: Router,
    private readonly propietarioService: PropietarioService,
    private readonly tipoDocumentoService: TipoDocumentoService,
    private fb: FormBuilder,
  ) {
     this.propietarioform = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      tipoDoc: ['', Validators.required],
      numeroDoc: ['', Validators.required],
      celular: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    },{ validators: this.passwordMatchValidator });
  }

  async ngOnInit() {
    // debugger
    await this.tipoDocumentoService.getTipoDocumentos().subscribe((data: TipoDocumento[]) =>{
      console.log(data);
      this.listTipoDoc = data;
      console.log(this.listTipoDoc);
      
    })
  }

  async load() {

    this._loadingButton = true;
    
    
    const propietario: PropietarioCreate = {
      nombre: this.propietarioform.value.nombres,
      apellido: this.propietarioform.value.apellidos,
      tipoDocumentoId: this.propietarioform.value.tipoDoc.id,
      documento: this.propietarioform.value.numeroDoc,
      celular: this.propietarioform.value.celular,
      email: this.propietarioform.value.correo,
      password: this.propietarioform.value.password,
      activo: true
    };

    await this.propietarioService.createPropietario(propietario).subscribe((data:any)=>{
      
      this._loadingButton = false
      this.redirect('')
    });
      
}

  togglePassword() {
    this._showPassword = this._showPassword === 'text' ? 'password' : 'text';
  }

  toggleConfirmPassword() {
    this._showConfirmPassword = this._showConfirmPassword === 'text' ? 'password' : 'text';
  }

  redirect(url: string) {
    this.router.navigate([url]);
  }

  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword!.setErrors(null);
    }
  }

}
