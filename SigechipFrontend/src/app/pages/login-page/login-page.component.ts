import { Component, OnInit } from '@angular/core';
import { PrimengModule } from '../../shared/primeng/primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [PrimengModule, FormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit {
  
  _showPassword: string = 'password';
  _loadingButton: boolean = false;

  constructor(
    private readonly router: Router,
  ) {

  }

  ngOnInit(): void {
  }


  load() {
      this._loadingButton = true;

      setTimeout(() => {
          this._loadingButton = false
          this.router.navigate(['/home']);
      }, 2000);
  }


  togglePassword() {
    this._showPassword = this._showPassword === 'text' ? 'password' : 'text';
  }

  redirect(url: string) {
    this.router.navigate([url]);    
  }
}
