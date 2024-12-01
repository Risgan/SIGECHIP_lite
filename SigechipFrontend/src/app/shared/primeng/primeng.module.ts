import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { MenuModule } from 'primeng/menu';

const modules = [
  ButtonModule,
  InputTextModule,
  FloatLabelModule,
  IconFieldModule,
  InputIconModule,
  InputNumberModule,
  ConfirmPopupModule,
  ToastModule,
  DialogModule,
  MenuModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    modules
  ],
  exports: [
    modules
  ]
})
export class PrimengModule { }
