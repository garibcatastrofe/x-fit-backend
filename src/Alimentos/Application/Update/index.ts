/* import { Alimento } from '../../Domain/Entities/Alimento';
import { AlimentoId } from '../../Domain/Entities/AlimentoId';
import { AlimentoNombre } from '../../Domain/Entities/AlimentoNombre';
import { AlimentoClasificacion } from '../../Domain/Entities/AlimentoClasificacion';
import { AlimentoCalorias } from '../../Domain/Entities/AlimentoCalorias';
import { AlimentoProteinas } from '../../Domain/Entities/AlimentoProteinas';
import { AlimentoCarbohidratos } from '../../Domain/Entities/AlimentoCarbohidratos';
import { AlimentoGrasas } from '../../Domain/Entities/AlimentoGrasas';
import { AlimentoUnidadMedicion } from '../../Domain/Entities/AlimentoUnidadMedicion'; */
import { AlimentoRepository } from '../../Domain/Entities/AlimentoRepository';
import { AlimentoPrimitive } from '../../Domain/Interfaces/AlimentoPrimitive';

export class UpdateAlimento {
  public constructor(private readonly alimentoRepo: AlimentoRepository) {}

  public async run(id: string, alimento: AlimentoPrimitive): Promise<void> {
    await this.alimentoRepo.getById(id);

    await this.alimentoRepo.update(id, alimento);
  }
}
