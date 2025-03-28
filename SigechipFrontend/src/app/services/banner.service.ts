import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  constructor() { }

  banner: any[] = [
    {image: 'Deporte.webp'},
    {image: 'Dieta.webp'},
    {image: 'Dieta2.webp'},
    {image: 'Ejercicio2.webp'},
    {image: 'Ejercicio3.webp'},
    {image: 'Vacunas.webp'},
    {image: 'Vacunas2.webp'},
    {image: 'Veterinario.webp'},
    {image: 'Veterinario2.webp'},
  ];


  getBanner() {
    return this.banner;
  }

}
