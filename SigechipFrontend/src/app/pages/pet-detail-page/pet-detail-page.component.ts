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

@Component({
  selector: 'app-pet-detail-page',
  standalone: true,
  imports: [PrimengModule, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './pet-detail-page.component.html',
  styleUrl: './pet-detail-page.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class PetDetailPageComponent implements OnInit {

  nombreMascota: string= 'Nombre Mascota';
  
  tipoDocumento!: string;

  selectEspecie?: Especie;
  selectRaza?: Raza;
  

  listEspecies: Especie[] = [];  
  listRazas: Raza[] = [];  
  
  value?: string = 'value';

  peso: number = 0;
  


  selectTipoDoc: string = 'CC';

  petform!: FormGroup;

  date: Date = new Date();
  minDate: Date = new Date();
  maxDate: Date = new Date();
 
  constructor(
    private fb: FormBuilder,
    private tipoDocumentoService: TipoDocumentoService,
    private especieService: EspecieService,
    private razaService: RazaService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    // this.petform = this.fb.group({
    //   nombre: ['', Validators.required],
    //   tipoDoc: ['', Validators.required],
    //   numeroDoc: ['', Validators.required],
    //   fechaNacimiento: ['', Validators.required]
    // });

    this.getTipoDocumento();
    this.getEspecie();

    this.minDate = new Date();
        this.maxDate = new Date();
  }

  async getTipoDocumento(){
    // await this.tipoDocumentoService.getTipoDocumentoById(1).subscribe(data=>{
    //   console.log(data.sigla);
      
    //   this.tipoDocumento = data.nombre;
    // })
  }

  async getEspecie(){
    await this.especieService.getEspecies().subscribe(data=>{
      this.listEspecies = data;
    })
  }

  selectedEspecie(event: any){
    this.getRazaByEspecieId(event.value.id);
    
  }

  async getRazaByEspecieId(id: number){
    await this.razaService.getRazaByEspecieId(id).subscribe(data=>{
      console.log(data);
      
      this.listRazas = data;
    })
  }


  test(){
    // this.tipoDocumentoService.getTipoDocumentos().subscribe(data=>{
    //   console.log(data);
      
    // })
    debugger
    // this.router.events
    // .pipe(filter(event => event instanceof NavigationEnd))
    // .subscribe((data) => {
    //   console.log(data);
      
    //   // this.initializeComponent();
    // });

    this.route.data.subscribe(data => {
      console.log(data['mode']);
    });

    // Obtener el parámetro 'id' si está presente
    this.route.paramMap.subscribe(params => {
      console.log(params.get('id'));
    });
    

  }
}