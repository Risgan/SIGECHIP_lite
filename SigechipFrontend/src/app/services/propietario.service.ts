import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Propietario } from '../models/propietario';

@Injectable({
  providedIn: 'root'
})
export class PropietarioService{

  private apiUrl: string = environment.apiUrl + 'Propietario';
  private propietarioLogin!: Propietario
  
  constructor(private http: HttpClient) 
  { 
    // this.propietarioLogin = JSON.parse(localStorage.getItem('propietario') || "{nombre: ''}");
    if (typeof window !== 'undefined' && window.localStorage) {
      const propietarioData = localStorage.getItem('propietario');
      this.propietarioLogin = propietarioData ? JSON.parse(propietarioData) : null;
    } else {
      this.propietarioLogin = {nombre: ''} as Propietario; // O inicializa con valores predeterminados
    }
  }


  getPropietarios() {
    return this.http.get<Propietario[]>(this.apiUrl);
  }

  getPropietarioById(id: number) {
    return this.http.get<Propietario>(this.apiUrl + '/' + id);
  }

  getPropietarioByIdIncludes(id: number) {
    return this.http.get<Propietario>(this.apiUrl + '/includes/' + id);
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

  getPropietarioByEmail(email: string) {
    return this.http.get<Propietario>(this.apiUrl + '/email/' + email);
  }

  setPropietarioLogin(propietario: Propietario){
    this.propietarioLogin = propietario;
    localStorage.setItem('propietario', JSON.stringify(propietario));
  }

  getPropietarioLogin(){
    return this.propietarioLogin;

  }

}
