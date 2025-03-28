import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tarjeta } from '../models/tarjeta';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {
  private apiUrl: string = environment.apiUrl +'Tarjeta';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Tarjeta[]> {
    return this.http.get<Tarjeta[]>(this.apiUrl);
  }

  getById(id: number): Observable<Tarjeta> {
    return this.http.get<Tarjeta>(`${this.apiUrl}/${id}`);
  }

  getByNumero(numeroTarjeta: string): Observable<Tarjeta | null> {
    return this.http.get<Tarjeta>(`${this.apiUrl}/numero/${numeroTarjeta}`);
  }

  create(tarjeta: Tarjeta){
    return this.http.post(this.apiUrl, tarjeta);
  }

  update(id: number, tarjeta: Tarjeta){
    return this.http.put(`${this.apiUrl}/${id}`, tarjeta);
  }

  deactivate(id: number){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
