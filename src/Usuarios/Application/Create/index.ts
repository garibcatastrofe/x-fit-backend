import { Usuario } from '../../Domain/Entities/Usuario';
import { UsuarioId } from '../../Domain/Entities/UsuarioId';
import { UsuarioNombres } from '../../Domain/Entities/UsuarioNombres';
import { UsuarioApellidos } from '../../Domain/Entities/UsuarioApellidos';
import { UsuarioFechaNacimiento } from '../../Domain/Entities/UsuarioFechaNacimiento';
import { UsuarioCorreo } from '../../Domain/Entities/UsuarioCorreo';
import { UsuarioPassword } from '../../Domain/Entities/UsuarioPassword';
import { UsuarioTelefono } from '../../Domain/Entities/UsuarioTelefono';
import { UsuarioEstatus } from '../../Domain/Entities/UsuarioEstatus';
import { UsuarioRepository } from '../../Domain/Entities/UsuarioRepository';
import { UsuarioCreateDto } from '../../Domain/Interfaces/UsuarioCreateDto';

export class CreateUsuario {
  public constructor(private readonly usuarioRepo: UsuarioRepository) {}

  public async run({
    id,
    nombres,
    apellidos,
    fechaNacimiento,
    correo,
    password,
    telefono,
    estatus,
  }: UsuarioCreateDto): Promise<void> {
    const nuevoUsuario = new Usuario(
      id ? new UsuarioId(id) : UsuarioId.random(),
      new UsuarioNombres(nombres),
      new UsuarioApellidos(apellidos),
      new UsuarioFechaNacimiento(fechaNacimiento),
      new UsuarioCorreo(correo),
      new UsuarioPassword(password),
      new UsuarioTelefono(telefono),
      new UsuarioEstatus(estatus),
    );
    await this.usuarioRepo.create(nuevoUsuario.toUsuarioPrimitive());
  }
}
