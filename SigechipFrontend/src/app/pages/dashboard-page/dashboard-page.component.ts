import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PrimengModule } from '../../shared/primeng/primeng.module';
import { FormsModule } from '@angular/forms';
import { BannerService } from '../../services/banner.service';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [PrimengModule, FormsModule],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class DashboardPageComponent implements OnInit {

  banners: any[]=[]

  responsiveOptions: any[] = [
    { 
      breakpoint: '1199px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '991px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  alimentacion = [
    'Proporcionar comida balanceada y rica en proteínas.',
    'Evitar dar alimentos tóxicos como chocolate y cebolla.',
    'Mantener siempre agua fresca y limpia.'
  ];

  cuidado = [
    'Llevar al veterinario al menos una vez al año.',
    'Proporcionar un ambiente seguro y cómodo.',
    'Observar cambios en el comportamiento.'
  ];

  higiene = [
    'Cepillar su pelaje regularmente.',
    'Limpiar su caja de arena diariamente.',
    'Revisar sus oídos y dientes con frecuencia.'
  ];

  juguetes = [
    'Ofrecer juguetes interactivos para estimular su mente.',
    'Evitar objetos pequeños que pueda tragar.',
    'Rotar los juguetes para evitar el aburrimiento.'
  ];

  datosCuriosos = [
    'Los gatos pueden girar sus orejas 180 grados.',
    'El ronroneo de los gatos puede tener efectos terapéuticos en los humanos.',
    'Los gatos tienen un órgano especial llamado “órgano de Jacobson” que les ayuda a analizar olores.',
    'El gato doméstico comparte el 95.6% de su ADN con los tigres.',
    'En el antiguo Egipto, los gatos eran considerados sagrados y momificados junto a sus dueños.',
    'Los gatos pueden hacer más de 100 sonidos diferentes.',
    'Tienen la capacidad de saltar hasta seis veces la longitud de su cuerpo.'
  ];

  constructor(
    private readonly bannerService: BannerService
  ) {
    this.banners = [];
   }
  
  ngOnInit(): void {
    this.loadBanners();
  }

  private loadBanners(): void {

    this.banners = this.bannerService.getBanner();
      
  }

  test(){
    console.log(this.banners);
    
  }
}
