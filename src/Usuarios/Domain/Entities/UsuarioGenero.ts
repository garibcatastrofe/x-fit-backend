import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';
import { GENERO, GeneroType } from '../Interfaces/Genero';

export class UsuarioGenero {
  public value: string;
  private campo = 'genero';
  public constructor(value: string) {
    this.ensureIsValid(value);
    this.value = value;
  }
  private ensureIsValid(value: string): void {
    if (!value) {
      throw new BadRequest({
        message: 'Favor de Seleccionar un genero',
        campo: this.campo,
      });
    }
    if (!GENERO.includes(value as GeneroType)) {
      throw new BadRequest({
        message: 'Favor de seleccionar un valor válido de género: M o F',
        campo: this.campo,
        data: value,
      });
    }
  }
}
