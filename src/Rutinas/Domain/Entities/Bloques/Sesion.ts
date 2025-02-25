import { Ejercicio } from './Ejercicio';
import { Sesion } from '../../Interfaces/RutinaPrimitive';

export class Sesiones {
  public sesion_1: Ejercicio[];
  public sesion_2: Ejercicio[];
  public sesion_3: Ejercicio[];
  public sesion_4: Ejercicio[];
  public sesion_5: Ejercicio[];
  public sesion_6: Ejercicio[];

  public constructor(
    sesion_1: Ejercicio[],
    sesion_2: Ejercicio[],
    sesion_3: Ejercicio[],
    sesion_4: Ejercicio[],
    sesion_5: Ejercicio[],
    sesion_6: Ejercicio[],
  ) {
    this.sesion_1 = sesion_1;
    this.sesion_2 = sesion_2;
    this.sesion_3 = sesion_3;
    this.sesion_4 = sesion_4;
    this.sesion_5 = sesion_5;
    this.sesion_6 = sesion_6;
  }

  public toPrimitive(): Sesion {
    return {
      sesion_1: this.sesion_1.map(s => s.toPrimitive()),
      sesion_2: this.sesion_2.map(s => s.toPrimitive()),
      sesion_3: this.sesion_3.map(s => s.toPrimitive()),
      sesion_4: this.sesion_4.map(s => s.toPrimitive()),
      sesion_5: this.sesion_5.map(s => s.toPrimitive()),
      sesion_6: this.sesion_6.map(s => s.toPrimitive()),
    };
  }
}
