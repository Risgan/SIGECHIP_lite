import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PrimengModule } from '../../shared/primeng/primeng.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TipoDocumentoService } from '../../services/tipo-documento.service';
import { EspecieService } from '../../services/especie.service';
import { RazaService } from '../../services/raza.service';
import { Especie } from '../../models/especie';
import { Raza } from '../../models/raza';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { GeneroService } from '../../services/genero.service';
import { Genero } from '../../models/genero';
import { MascotaService } from '../../services/mascota.service';
import { MessageService } from 'primeng/api';
import { Mascota, MascotaNueva } from '../../models/mascota';
import { PropietarioService } from '../../services/propietario.service';
import { ContactPageComponent } from '../contact-page/contact-page.component';

@Component({
  selector: 'app-pet-detail-page',
  standalone: true,
  imports: [PrimengModule, CommonModule, ReactiveFormsModule, FormsModule, ContactPageComponent],
  templateUrl: './pet-detail-page.component.html',
  styleUrl: './pet-detail-page.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService]
})
export class PetDetailPageComponent implements OnInit {

  nombreMascota: string = 'Documento Identidad';
  mascota?: Mascota

  // tipoDocumento!: string;

  selectEspecie?: Especie;
  // selectRaza?: Raza;
  // selectGenero?: Genero;

  listEspecies: Especie[] = [];
  listRazas: Raza[] = [];
  listGenero: Genero[] = [];

  isReadOnly: boolean = false;

  pathImage: string = '/assets/Images/noImage1.png';
  imageSrc: string = this.pathImage;

  petForm!: FormGroup;

  date: Date = new Date();
  minDate: Date = new Date();
  maxDate: Date = new Date();
  mode: string = 'create';
  uploadedFiles: any;

  toggleContact: boolean = false;

  constructor(
    private fb: FormBuilder,
    private tipoDocumentoService: TipoDocumentoService,
    private especieService: EspecieService,
    private razaService: RazaService,
    private generoService: GeneroService,
    private mascotaService: MascotaService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private propietarioService: PropietarioService
  ) {
  }

  async ngOnInit() {
    
    this.petForm = this.fb.group({
      tipoDocumento: ['', [Validators.required]],
      numeroDocumento: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      especie: ['', [Validators.required]],
      raza: ['', [Validators.required]],
      fechaNacimiento: ['', [Validators.required]],
      peso: ['', [Validators.required]],
      descripcion: ['']
    });

    
    
    await this.getConsecutivo();
    await this.getTipoDocumento();
    await this.getEspecie();
    await this.getGenero();
    
    this.getMode();

    this.minDate = new Date();
    this.maxDate = new Date();
  }

  getMode() {
    this.route.data.subscribe(data => {
      console.log(data['mode']);
      this.mode = data['mode'];
    });

    if (this.mode != 'create') {

      // setTimeout(() => {
        // this.nombreMascota = 'Nombre';
        this.getMascota();
        
      // }, 1000);
      if (this.mode == 'detail') {
        this.petForm.disable();
        this.isReadOnly = true;
        
      }
      // this.petForm.disable();
    }

  }

  async getConsecutivo() {
    await this.mascotaService.getConsecutivo().subscribe(data => {
      console.log(data);
      this.petForm.patchValue({ numeroDocumento: data });

    })
  }


  async getMascota() {
    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      await this.mascotaService.getMascotaById(Number(id)).subscribe(data => {
        console.log(data);
        this.mascota = data;
        this.petForm.patchValue({
          nombre: data.nombre,
          numeroDocumento: data.documento,
          fechaNacimiento: new Date(data.fechaNacimiento),
          peso: data.peso,
          descripcion: data.descripcion
        });
  
        console.log(this.listEspecies, this.listRazas, this.listGenero);
        

        this.imageSrc = data.foto ? data.foto : this.pathImage;
  
        // Obtener la especie y asignarla al formulario
        this.especieService.getEspecieById(data.idEspecie).subscribe(especie => {
          this.selectEspecie = especie;
          this.getRazaByEspecieId(especie.id);
          this.petForm.patchValue({ especie: especie });  // Aquí debe ser el objeto completo
  
          // Obtener la raza asociada a la especie y asignarla
          this.razaService.getRazaById(data.idRaza).subscribe(raza => {
            this.petForm.patchValue({ raza: raza });  // Aquí debe ser el objeto completo
          });
        });
  
        // Obtener el género y asignarlo al formulario
        this.generoService.getGeneroById(data.idGenero).subscribe(genero => {
          this.petForm.patchValue({ genero: genero });  // Aquí debe ser el objeto completo
        });
      });
    }
  }

  async getTipoDocumento() {
    await this.tipoDocumentoService.getTipoDocumentoById(6).subscribe(data => {
      console.log(data.sigla);
      this.petForm.patchValue({ tipoDocumento: data.nombre });
      // this.tipoDocumento = data.nombre;
    })
  }

  async getEspecie() {
    await this.especieService.getEspecies().subscribe(data => {
      this.listEspecies = data ? data : [];
    })
  }

  async getGenero() {
    await this.generoService.getGeneros().subscribe((data: Genero[]) => {
      console.log(data);
      this.listGenero = data ? data : [];
    })
  }

  selectedEspecie(event: any) {
    this.getRazaByEspecieId(event.value.id);

  }

  async getRazaByEspecieId(id: number) {
    await this.razaService.getRazaByEspecieId(id).subscribe(data => {
      console.log(data);

      this.listRazas = data ? data : [];
    })
  }

  onSubmit() {
    // console.log(this.petForm.value);
    // console.log(this.petForm.valid);
    // console.log(this.petForm);

    // console.log(JSON.parse(localStorage.getItem('propietario')!).id);

    if (this.imageSrc == this.pathImage) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Debe seleccionar una foto' });
      return;
    }

    if (this.mode == 'create') {
      var newPet: MascotaNueva = {
        tipoDocumento: 6,
        idPropietario: this.propietarioService.getPropietarioLogin().id,
        documento: this.petForm.value.numeroDocumento,
        nombre: this.petForm.value.nombre,
        idEspecie: this.petForm.value.especie.id,
        idRaza: this.petForm.value.raza.id,
        idGenero: this.petForm.value.genero.id,
        fechaNacimiento: this.petForm.value.fechaNacimiento,
        peso: this.petForm.value.peso,
        foto: this.imageSrc == this.pathImage ? null : this.imageSrc,
        descripcion: this.petForm.value.descripcion,
        // activo: true
      }
  
      this.mascotaService.createMascota(newPet).subscribe(data => {
        console.log(data);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Mascota creada correctamente' });
        this.router.navigate(['/pet']);
      });
      
    }
    else{
      var updatePet: Mascota = {
        id: this.mascota!.id,
        tipoDocumento: 6,
        idPropietario: this.propietarioService.getPropietarioLogin().id,
        documento: this.petForm.value.numeroDocumento,
        nombre: this.petForm.value.nombre,
        idEspecie: this.petForm.value.especie.id,
        idRaza: this.petForm.value.raza.id,
        idGenero: this.petForm.value.genero.id,
        fechaNacimiento: this.petForm.value.fechaNacimiento,
        peso: this.petForm.value.peso,
        foto: this.imageSrc == this.pathImage ? null : this.imageSrc,
        descripcion: this.petForm.value.descripcion,
        activo: true,
        fechaCreacion: this.mascota!.fechaCreacion,
        fechaActualizacion: this.mascota!.fechaActualizacion
      }
  
      this.mascotaService.updateMascota(updatePet).subscribe(data => {
        console.log(data);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Mascota actualizada correctamente' });
        this.router.navigate(['/pet']);
      });
    }

    
  }

  onUpload(event: any) {
    debugger
    console.log(event);
    console.log(event.files);
    console.log(event.files);
    // this.uploadedFiles = event.files[0];

  }
  onSelect(event: any) {
    console.log(event);

  }


  // onFileSelected(event: any) {
  //   console.log(event);
  // }

  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageSrc = e.target.result; // Mostrar imagen seleccionada
      };
      reader.readAsDataURL(file);
    }
  }

  triggerFileInput() {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    fileInput?.click();
  }

  toggle(){
    this.toggleContact = !this.toggleContact;
  }

}

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}