import { EjercicioQuery } from '../../Domain/Interfaces/FirebaseQuery';
import { EjercicioRepository } from '../../Domain/Entities/EjercicioRepository';
import { EjercicioPrimitive } from '../../Domain/Interfaces/EjercicioPrimitive';
import { EjercicioWithRelations } from '../../Domain/Interfaces/Responses';
import { PaginatedResponse } from '@/src/Shared/Domain/Interfaces/Responses';

export class GetAllEjercicios {
  public constructor(private readonly ejercicioRepo: EjercicioRepository) {}

  public async run(
    query: EjercicioQuery<EjercicioPrimitive>,
  ): Promise<PaginatedResponse<EjercicioWithRelations>> {
    const ejercicios = await this.ejercicioRepo.getAll(query);
    return ejercicios;
  }
}
