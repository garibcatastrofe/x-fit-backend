import { EjercicioQuery } from '../../Domain/Interfaces/FirebaseQuery';
import { EjercicioRepository } from '../../Domain/Entities/EjercicioRepository';
import { EjercicioPrimitive } from '../../Domain/Interfaces/EjercicioPrimitive';

export class GetAllEjercicios {
  public constructor(private readonly ejercicioRepo: EjercicioRepository) {}

  public async run(query: EjercicioQuery<EjercicioPrimitive>): Promise<EjercicioPrimitive[]> {
    const ejercicios = await this.ejercicioRepo.getAll(query);
    return ejercicios;
  }
}
