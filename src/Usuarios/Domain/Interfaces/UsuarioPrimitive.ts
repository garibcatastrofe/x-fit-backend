export interface UsuarioPrimitive {
  id?: number;
  nombres: string;
  apellidos: string;
  fecha_nacimiento: string;
  correo: string;
  password?: string;
  telefono: string;
  estatus: string
}