import { Component, EventEmitter, Output } from '@angular/core';
import { PrimengModule } from '../../shared/primeng/primeng.module';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pet-search',
  standalone: true,
  imports: [PrimengModule, FormsModule],
  templateUrl: './pet-search.component.html',
  styleUrl: './pet-search.component.scss'
})
export class PetSearchComponent {

  _loadingButton: boolean = false;
  idMascota: string = '';

  @Output() idEmitido: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private router: Router
  ) { }

  searchByIdCard() {
    this._loadingButton = true;

    setTimeout(() => {
      this._loadingButton = false
      // this.visible = false;
      // this.router.navigate(['/pet']);
      // this.router.navigate(['/petdetail/2']);
      // this.visible.emit(false);
      this.idEmitido.emit(this.idMascota);

    }, 2000);

  }
}
