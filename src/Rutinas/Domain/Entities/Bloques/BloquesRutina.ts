import { Bloques } from '../../Interfaces/RutinaPrimitive';
import { Sesiones } from './Sesion';

export class BloquesRutina {
  public bloque_1: Sesiones;
  public bloque_2: Sesiones;
  public bloque_3: Sesiones;

  public constructor(bloque_1: Sesiones, bloque_2: Sesiones, bloque_3: Sesiones) {
    this.bloque_1 = bloque_1;
    this.bloque_2 = bloque_2;
    this.bloque_3 = bloque_3;
  }

  public toPrimitive(): Bloques {
    return {
      bloque_1: this.bloque_1.toPrimitive(),
      bloque_2: this.bloque_2.toPrimitive(),
      bloque_3: this.bloque_3.toPrimitive(),
    };
  }
}
