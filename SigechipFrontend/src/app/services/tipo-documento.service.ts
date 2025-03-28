import { Injectable } from '@angular/core';
import e from 'express';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { TipoDocumento } from '../models/tipo-documento';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {

  private apiUrl: string = environment.apiUrl + 'TipoDocumento';

  constructor(private readonly http: HttpClient) { }

  getTipoDocumentos(){
    return this.http.get<TipoDocumento[]>(this.apiUrl);
  }

  getTipoDocumentoById(id: number) {
    return this.http.get<TipoDocumento>(this.apiUrl + '/' + id);
  }

  createTipoDocumento(tipoDocumento: any) {
    return this.http.post(this.apiUrl, tipoDocumento);
  }

  updateTipoDocumento(tipoDocumento: any) {
    return this.http.put(this.apiUrl + '/' + tipoDocumento.id, tipoDocumento);
  }

  deleteTipoDocumento(id: number) {
    return this.http.delete(this.apiUrl + '/' + id);
  }
}
