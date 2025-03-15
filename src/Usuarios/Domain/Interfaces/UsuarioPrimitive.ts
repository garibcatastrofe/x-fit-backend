export interface UsuarioPrimitive {
  id?: number;
  nombres: string;
  apellidos: string;
  genero: string;
  fecha_nacimiento: string;
  correo: string;
  password?: string;
  telefono: string;
  estatus: string
}