export interface Propietario {
    Id: number,
    TipoDocumento: number,
    Documento: number,
    Nombre: string,
    Apellido: string,
    Celular: number,
    Email: string,
    Password: string,
    Activo: boolean,

}

export interface PropietarioCreate extends Omit<Propietario, 'Id'> {
}