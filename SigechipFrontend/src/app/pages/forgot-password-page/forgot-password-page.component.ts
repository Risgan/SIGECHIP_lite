import { Component, ViewEncapsulation } from '@angular/core';
import { PrimengModule } from '../../shared/primeng/primeng.module';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private router: Router) { }

  load() {
    this._loadingButton = true;

    setTimeout(() => {
      this._loadingButton = false
    }, 2000);
  }

  redirect(url: string) {
    this.router.navigate([url]);
  }

}
