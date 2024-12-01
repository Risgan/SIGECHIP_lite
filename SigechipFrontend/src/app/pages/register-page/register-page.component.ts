import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PrimengModule } from '../../shared/primeng/primeng.module';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [PrimengModule, FormsModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss'
})
export class RegisterPageComponent {
  
  _showPassword: string = 'password';
  _loadingButton: boolean = false;


  constructor(
    private readonly router: Router,
  ) {
  }

  load() {
    this._loadingButton = true;

    setTimeout(() => {
        this._loadingButton = false
    }, 2000);
}

  togglePassword() {
    this._showPassword = this._showPassword === 'text' ? 'password' : 'text';
  }

  redirect(url: string) {
    this.router.navigate([url]);
  }

}
