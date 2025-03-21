import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PrimengModule } from '../../shared/primeng/primeng.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PropietarioService } from '../../services/propietario.service';
import { ActivatedRoute } from '@angular/router';
import { MascotaService } from '../../services/mascota.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [PrimengModule, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ContactPageComponent implements OnInit {

  contactoForm!: FormGroup;
  mode: string = 'consult';
  isReadonly: boolean = true;

  id: number | null = 0;

  constructor(
    private fb: FormBuilder,
    private propietarioService: PropietarioService,
    private route: ActivatedRoute,
    private mascotaService: MascotaService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.contactoForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      celular: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      email: ['', [Validators.required, Validators.email]]
    });


    this.loadData();
    // this.getMode();
  }

  loadData() {

    this.id = Number(this.route.snapshot.paramMap.get('id'));

    if (this.id) {
      this.mascotaService.getMascotaById(this.id).subscribe(mascota => {
        console.log('Mascota:', mascota);
        if (mascota) {
          this.propietarioService.getPropietarioById(mascota.idPropietario).subscribe(propietario => {
            console.log('Propietario:', propietario);

            this.contactoForm.patchValue({
              nombre: propietario.nombre,
              apellido: propietario.apellido,
              celular: propietario.celular,
              email: propietario.email
            })
          });
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se encontró la mascota' });
        }
      });
    }
    else {
      this.contactoForm.patchValue({
        nombre: this.propietarioService.getPropietarioLogin().nombre,
        apellido: this.propietarioService.getPropietarioLogin().apellido,
        celular: this.propietarioService.getPropietarioLogin().celular,
        email: this.propietarioService.getPropietarioLogin().email
      })
    }
  }

  // getMode() {
  //   this.route.data.subscribe(data => {
  //     console.log(data['mode']);
  //     this.mode = data['mode'];
  //   });

  //   if (this.mode == 'update') {

  //     this.isReadonly = false;

  //     }
  //     // this.petForm.disable();


  // }



  onSubmit() {
    console.log('Datos de contacto actualizados:', this.contactoForm.value);
  }
}
