import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Form, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
      correo: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async ngOnInit() {
    // debugger
    await this.tipoDocumentoService.getTipoDocumentos().subscribe((data: TipoDocumento[]) =>{
      console.log(data);
      this.listTipoDoc = data;
      console.log(this.listTipoDoc);
      
    })
  }

  load() {

    this._loadingButton = true;
    console.log(this.listTipoDoc, this.propietarioform, this.propietarioform.value, this.propietarioform.valid, this.propietarioform.invalid);
    
    // propietario: PropietarioCreate = {}

    // this.propietarioService.createPropietario().subscribe({

    // });
      


    setTimeout(() => {
        this._loadingButton = false
    }, 100);
}

  togglePassword() {
    this._showPassword = this._showPassword === 'text' ? 'password' : 'text';
  }

  redirect(url: string) {
    this.router.navigate([url]);
  }

}
