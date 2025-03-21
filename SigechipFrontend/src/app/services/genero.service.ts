import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Genero } from '../models/genero';

@Injectable({
  providedIn: 'root'
})
export class GeneroService {

  private apiUrl: string = environment.apiUrl + 'Genero';
  
    constructor(private http: HttpClient) { }
  
    getGeneros() {
      return this.http.get<Genero[]>(this.apiUrl);
    }
  
    getGeneroById(id: number) {
      return this.http.get<Genero>(this.apiUrl + '/' + id);
    }
  
    getGeneroByEspecieId(id: number) {
      return this.http.get<Genero[]>(this.apiUrl + '/Especie/' + id);
    }
  
    createGenero(Genero: any) {
      return this.http.post(this.apiUrl, Genero);
    }
  
    updateGenero(Genero: any) {
      return this.http.put(this.apiUrl + '/' + Genero.id, Genero);
    }
  
    deleteGenero(id: number) {
      return this.http.delete(this.apiUrl + '/' + id);
    }
}
