import { NotFoundException } from '@/src/Shared/Domain/Exceptions/NotFound';
import { UsuarioId } from '../../Domain/Entities/UsuarioId';
import { UsuarioRepository } from '../../Domain/Entities/UsuarioRepository';
import { UsuarioPrimitive } from '../../Domain/Interfaces/UsuarioPrimitive';

export class GetUsuarioById {
  public constructor(private readonly usuarioRepository: UsuarioRepository) {}

  public async run(id: number): Promise<UsuarioPrimitive | null> {
    const idConvertido = new UsuarioId(id);
    const usuarioEncontrado = await this.usuarioRepository.getById(idConvertido.value);

    if (!usuarioEncontrado) {
      throw new NotFoundException({
        message: `El usuario con el id ${id} no fue encontrado`,
        campo: '/:id',
        data: id,
      });
    }

    return usuarioEncontrado ?? null;
  }
}
