import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';

export class PreguntaOpciones {
  public opciones: string[];

  public constructor(opciones: string[]) {
    this.ensureIsValid(opciones);
    this.opciones = opciones;
  }

  private ensureIsValid(opciones: string[]): void {
    if (opciones.length === 0) {
      throw new BadRequest({
        message: 'Debe haber al menos una opcion en la pregunta en el platillo',
        campo: 'alimentos',
        data: opciones,
      });
    }
  }
}
