import { Mascota } from "./mascota";

export interface Tarjeta {
    id: number;
    numeroTarjeta: string;
    idMascota: number;
    activo: boolean;
}
