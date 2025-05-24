import { Usuario } from '../../Domain/Entities/Usuario';
import { UsuarioId } from '../../Domain/Entities/UsuarioId';
import { UsuarioNombres } from '../../Domain/Entities/UsuarioNombres';
import { UsuarioApellidos } from '../../Domain/Entities/UsuarioApellidos';
import { UsuarioGenero } from '../../Domain/Entities/UsuarioGenero';
import { UsuarioFechaNacimiento } from '../../Domain/Entities/UsuarioFechaNacimiento';
import { UsuarioCorreo } from '../../Domain/Entities/UsuarioCorreo';
import { UsuarioPassword } from '../../Domain/Entities/UsuarioPassword';
import { UsuarioTelefono } from '../../Domain/Entities/UsuarioTelefono';
import { UsuarioEstatus } from '../../Domain/Entities/UsuarioEstatus';
import { UsuarioRepository } from '../../Domain/Entities/UsuarioRepository';
import { UsuarioCreateDto } from '../../Domain/Interfaces/UsuarioCreateDto';
import bcrypt from 'bcryptjs'

export class CreateUsuario {
  public constructor(private readonly usuarioRepo: UsuarioRepository) {}

  public async run({
    id,
    nombres,
    apellidos,
    genero,
    fecha_nacimiento,
    correo,
    password,
    telefono,
    estatus,
  }: UsuarioCreateDto): Promise<void> {
    const nuevoUsuario = new Usuario(
      id ? new UsuarioId(id) : UsuarioId.random(),
      new UsuarioNombres(nombres),
      new UsuarioApellidos(apellidos),
      new UsuarioGenero(genero),
      new UsuarioFechaNacimiento(fecha_nacimiento),
      new UsuarioCorreo(correo),
      new UsuarioPassword(password == null ? '' : password),
      new UsuarioTelefono(telefono),
      new UsuarioEstatus(estatus),
    );

    const hashedPassword = await bcrypt.hashSync(nuevoUsuario.usuarioPassword.value, 10)
    nuevoUsuario.usuarioPassword.value = hashedPassword

    await this.usuarioRepo.create(nuevoUsuario.toUsuarioPrimitive());
  }
}
