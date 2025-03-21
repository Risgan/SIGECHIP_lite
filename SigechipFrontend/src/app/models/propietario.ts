import { TipoDocumento } from "./tipo-documento";

export interface Propietario {
    id: number,
    tipoDocumentoId: number,
    documento: number,
    nombre: string,
    apellido: string,
    celular: number,
    email: string,
    password: string,
    activo: boolean,
    tipoDocumento: TipoDocumento

}

export interface PropietarioCreate extends Omit<Propietario, 'id' | 'tipoDocumento'> {
}

export interface PropietarioUpdate extends Omit<Propietario, 'tipoDocumento'> {
    
}