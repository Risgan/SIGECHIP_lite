import { Especie } from "./especie";
import { Genero } from "./genero";
import { Raza } from "./raza";

export interface Mascota {
    id:number;
    idPropietario:number;
    tipoDocumento:number;
    documento:number;
    nombre:string;
    idEspecie:number;
    idRaza:number;
    idGenero:number;
    fechaNacimiento:number;
    peso: number;
    foto: string | null;
    descripcion: string | null;
    activo: boolean;
    fechaCreacion: Date;
    fechaActualizacion: Date;

}

export interface MascotaNueva extends Omit<Mascota, 'id' | 'fechaCreacion' | 'fechaActualizacion' | 'activo'> {

}

export interface MascotaFull extends Mascota {
    raza: Raza;
    especie: Especie;
    genero: Genero;
}