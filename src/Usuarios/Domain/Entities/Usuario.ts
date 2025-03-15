import { UsuarioPrimitive } from '../Interfaces/UsuarioPrimitive';
import { UsuarioId } from './UsuarioId';
import { UsuarioNombres } from './UsuarioNombres';
import { UsuarioApellidos } from './UsuarioApellidos';
import { UsuarioGenero } from './UsuarioGenero';
import { UsuarioFechaNacimiento } from './UsuarioFechaNacimiento';
import { UsuarioCorreo } from './UsuarioCorreo';
import { UsuarioPassword } from './UsuarioPassword';
import { UsuarioTelefono } from './UsuarioTelefono';
import { UsuarioEstatus } from './UsuarioEstatus';
import { GeneroType } from '../Interfaces/Genero';

export class Usuario {
  public usuarioId: UsuarioId;
  public usuarioNombres: UsuarioNombres;
  public usuarioApellidos: UsuarioApellidos;
  public usuarioGeneros: UsuarioGenero;
  public usuarioFechaNacimiento: UsuarioFechaNacimiento;
  public usuarioCorreo: UsuarioCorreo;
  public usuarioPassword: UsuarioPassword;
  public usuarioTelefono: UsuarioTelefono;
  public usuarioEstatus: UsuarioEstatus;

  public constructor(
    id: UsuarioId,
    nombres: UsuarioNombres,
    apellidos: UsuarioApellidos,
    genero: UsuarioGenero,
    fecha_nacimiento: UsuarioFechaNacimiento,
    correo: UsuarioCorreo,
    password: UsuarioPassword,
    telefono: UsuarioTelefono,
    estatus: UsuarioEstatus,
  ) {
    this.usuarioId = id;
    this.usuarioNombres = nombres;
    this.usuarioApellidos = apellidos;
    this.usuarioGeneros = genero;
    this.usuarioFechaNacimiento = fecha_nacimiento;
    this.usuarioCorreo = correo;
    this.usuarioPassword = password;
    this.usuarioTelefono = telefono;
    this.usuarioEstatus = estatus;
  }

  public toUsuarioPrimitive(): UsuarioPrimitive {
    return {
      id: this.usuarioId.value,
      nombres: this.usuarioNombres.value,
      apellidos: this.usuarioApellidos.value,
      genero: this.usuarioGeneros.value as GeneroType,
      fecha_nacimiento: this.usuarioFechaNacimiento.value,
      correo: this.usuarioCorreo.value,
      password: this.usuarioPassword.value,
      telefono: this.usuarioTelefono.value,
      estatus: this.usuarioEstatus.value,
    };
  }
}
