import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Propietario } from '../models/propietario';

@Injectable({
  providedIn: 'root'
})
export class PropietarioService {

  private apiUrl: string = environment.apiUrl + 'Propietario';
  
  constructor(private http: HttpClient) { }

  getPropietarios() {
    return this.http.get<Propietario[]>(this.apiUrl);
  }

  getPropietarioById(id: number) {
    return this.http.get<Propietario>(this.apiUrl + '/' + id);
  }

  createPropietario(PropietarioCreate: any) {
    return this.http.post(this.apiUrl, PropietarioCreate);
  }

  updatePropietario(propietario: any) {
    return this.http.put(this.apiUrl + '/' + propietario.id, propietario);
  }

  deletePropietario(id: number) {
    return this.http.delete(this.apiUrl + '/' + id);
  }

}
