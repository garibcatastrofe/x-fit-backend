import { UsuarioPrimitive } from '../Interfaces/UsuarioPrimitive';
import { UsuarioId } from './UsuarioId';
import { UsuarioNombres } from './UsuarioNombres';
import { UsuarioApellidos } from './UsuarioApellidos';
import { UsuarioFechaNacimiento } from './UsuarioFechaNacimiento';
import { UsuarioCorreo } from './UsuarioCorreo';
import { UsuarioPassword } from './UsuarioPassword';
import { UsuarioTelefono } from './UsuarioTelefono';
import { UsuarioEstatus } from './UsuarioEstatus';

export class Usuario {
  public usuarioId: UsuarioId;
  public usuarioNombres: UsuarioNombres;
  public usuarioApellidos: UsuarioApellidos;
  public usuarioFechaNacimiento: UsuarioFechaNacimiento;
  public usuarioCorreo: UsuarioCorreo;
  public usuarioPassword: UsuarioPassword;
  public usuarioTelefono: UsuarioTelefono;
  public usuarioEstatus: UsuarioEstatus;

  public constructor(
    id: UsuarioId,
    nombres: UsuarioNombres,
    apellidos: UsuarioApellidos,
    fechaNacimiento: UsuarioFechaNacimiento,
    correo: UsuarioCorreo,
    password: UsuarioPassword,
    telefono: UsuarioTelefono,
    estatus: UsuarioEstatus,
  ) {
    this.usuarioId = id;
    this.usuarioNombres = nombres;
    this.usuarioApellidos = apellidos;
    this.usuarioFechaNacimiento = fechaNacimiento;
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
      fechaNacimiento: this.usuarioFechaNacimiento.value,
      correo: this.usuarioCorreo.value,
      password: this.usuarioPassword.value,
      telefono: this.usuarioTelefono.value,
      estatus: this.usuarioEstatus.value,
    };
  }
}
