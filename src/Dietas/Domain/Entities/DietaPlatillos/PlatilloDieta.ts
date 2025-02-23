import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';
import { AlimentoDieta } from './AlimentoDieta';
import { PlatilloPrimitive } from '../../Interfaces/DietaPrimitive';

export class Platillo {
  public comentario: string;
  public alimentos: AlimentoDieta[];

  private campoComentario = 'comentario';

  public constructor(comentario: string, alimentos: AlimentoDieta[]) {
    this.ensureIsValid(comentario, alimentos);
    this.comentario = comentario;
    this.alimentos = alimentos;
  }

  private ensureIsValid(comentario: string, alimentos: AlimentoDieta[]): void {
    if (!comentario) {
      throw new BadRequest({
        message: 'El comentario es necesario',
        campo: this.campoComentario,
        data: comentario,
      });
    }

    if (comentario.length > 100)
      throw new BadRequest({
        message: 'El comentario del platillo debe ser menor a 100 caracteres',
        campo: this.comentario,
        data: comentario,
      });

    if (alimentos.length === 0) {
      throw new BadRequest({
        message: 'Debe haber al menos un alimento en el platillo',
        campo: 'alimentos',
        data: alimentos,
      });
    }
  }

  public toPrimitive(): PlatilloPrimitive {
    return {
      comentario: this.comentario,
      alimentos: this.alimentos.map(alimento => alimento.toPrimitive()),
    };
  }
}
