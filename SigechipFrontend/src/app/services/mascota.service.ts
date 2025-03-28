import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Mascota, MascotaFull, MascotaNueva } from '../models/mascota';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  private apiUrl: string = environment.apiUrl + 'Mascota';
    
      constructor(private http: HttpClient) { }
    
      getMascotas() {
        return this.http.get<Mascota[]>(this.apiUrl);
      }
    
      getMascotaById(id: number) {
        return this.http.get<Mascota>(this.apiUrl + '/' + id);
      }
    
      getMascotaByEspecieId(id: number) {
        return this.http.get<Mascota[]>(this.apiUrl + '/Especie/' + id);
      }
    
      createMascota(Mascota: MascotaNueva) {
        return this.http.post(this.apiUrl, Mascota);
      }
    
      updateMascota(Mascota: any) {
        return this.http.put(this.apiUrl + '/' + Mascota.id, Mascota);
      }
    
      deleteMascota(id: number) {
        return this.http.delete(this.apiUrl + '/' + id);
      }

      getConsecutivo(){
        return this.http.get<number>(this.apiUrl + '/consecutivo');
      }

      getMascotasByPropietarioId(id: number) {
        return this.http.get<MascotaFull[]>(this.apiUrl + '/Propietario/' + id);
      }
}
