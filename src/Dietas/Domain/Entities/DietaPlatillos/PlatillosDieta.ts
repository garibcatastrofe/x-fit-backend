import { Platillo } from './PlatilloDieta';
import { PlatillosPrimitive } from '../../Interfaces/DietaPrimitive';

export class DietaPlatillos {
  public desayuno: Platillo;
  public snack1: Platillo;
  public comida: Platillo;
  public snack2: Platillo;
  public cena: Platillo;

  public constructor(
    desayuno: Platillo,
    snack1: Platillo,
    comida: Platillo,
    snack2: Platillo,
    cena: Platillo,
  ) {
    this.desayuno = desayuno;
    this.snack1 = snack1;
    this.comida = comida;
    this.snack2 = snack2;
    this.cena = cena;
  }

  public toPrimitive(): PlatillosPrimitive {
    return {
      desayuno: this.desayuno.toPrimitive(),
      snack_1: this.snack1.toPrimitive(),
      comida: this.comida.toPrimitive(),
      snack_2: this.snack2.toPrimitive(),
      cena: this.cena.toPrimitive(),
    };
  }
}
