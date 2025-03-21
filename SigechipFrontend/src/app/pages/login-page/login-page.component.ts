import { Component, OnInit } from '@angular/core';
import { PrimengModule } from '../../shared/primeng/primeng.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Auth, ResponseAuth } from '../../models/auth';
import e from 'express';
import { PropietarioService } from '../../services/propietario.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [PrimengModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit {
  
  _showPassword: string = 'password';
  _loadingButton: boolean = false;

  loginForm!: FormGroup;

  auth?: Auth

  constructor(
    private readonly router: Router,
    private fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly propietarioService: PropietarioService,
  ) {
    this.loginForm = this.fb.group({
      correo: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }


  load() {
      this._loadingButton = true;     
      
      this.auth = {
        Email: this.loginForm.value.correo,
        Password: this.loginForm.value.password
      }
      
      this.authService.login(this.auth).subscribe(
        async (response: ResponseAuth) => {
          this.authService.setToken(response.token);
          await this.propietarioService.getPropietarioByEmail(this.loginForm.value.correo).subscribe( dataProp =>{
            console.log(dataProp);
            this.propietarioService.setPropietarioLogin(dataProp);
            this._loadingButton = false
            this.router.navigate(['/home']);
          });
        },
        (error) => {
          this._loadingButton = false
          console.log(error);
        }
      );
  }


  togglePassword() {
    this._showPassword = this._showPassword === 'text' ? 'password' : 'text';
  }

  redirect(url: string) {
    this.router.navigate([url]);    
  }
}
