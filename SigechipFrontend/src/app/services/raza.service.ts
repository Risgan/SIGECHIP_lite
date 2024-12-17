import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Raza } from '../models/raza';

@Injectable({
  providedIn: 'root'
})
export class RazaService {

  private apiUrl: string = environment.apiUrl + 'Raza';

  constructor(private http: HttpClient) { }

  getRazas() {
    return this.http.get<Raza[]>(this.apiUrl);
  }

  getRazaById(id: number) {
    return this.http.get<Raza>(this.apiUrl + '/' + id);
  }

  getRazaByEspecieId(id: number) {
    return this.http.get<Raza[]>(this.apiUrl + '/Especie/' + id);
  }

  createRaza(raza: any) {
    return this.http.post(this.apiUrl, raza);
  }

  updateRaza(raza: any) {
    return this.http.put(this.apiUrl + '/' + raza.id, raza);
  }

  deleteRaza(id: number) {
    return this.http.delete(this.apiUrl + '/' + id);
  }

}
