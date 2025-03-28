import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Especie } from '../models/especie';

@Injectable({
  providedIn: 'root'
})
export class EspecieService {

  private apiUrl: string = environment.apiUrl + 'Especie';

  constructor(private http: HttpClient) { }

  getEspecies() {
    return this.http.get<Especie[]>(this.apiUrl);
  }

  getEspecieById(id: number) {
    return this.http.get<Especie>(this.apiUrl + '/' + id);
  }

  createEspecie(especie: any) {
    return this.http.post(this.apiUrl, especie);
  }

  updateEspecie(especie: any) {
    return this.http.put(this.apiUrl + '/' + especie.id, especie);
  }

  deleteEspecie(id: number) {
    return this.http.delete(this.apiUrl + '/' + id);
  }

}
