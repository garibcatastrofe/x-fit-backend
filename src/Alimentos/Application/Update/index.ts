import { Alimento } from '../../Domain/Entities/Alimento';
import { AlimentoId } from '../../Domain/Entities/AlimentoId';
import { AlimentoNombre } from '../../Domain/Entities/AlimentoNombre';
import { AlimentoClasificacion } from '../../Domain/Entities/AlimentoClasificacion';
import { AlimentoProteinas } from '../../Domain/Entities/AlimentoProteinas';
import { AlimentoCarbohidratos } from '../../Domain/Entities/AlimentoCarbohidratos';
import { AlimentoGrasas } from '../../Domain/Entities/AlimentoGrasas';
import { AlimentoUnidadMedicion } from '../../Domain/Entities/AlimentoUnidadMedicion';
import { AlimentoRepository } from '../../Domain/Entities/AlimentoRepository';
import { AlimentoPrimitive } from '../../Domain/Interfaces/AlimentoPrimitive';

export class UpdateAlimento {
  public constructor(private readonly alimentoRepo: AlimentoRepository) {}

  public async run(id: string, alimento: AlimentoPrimitive): Promise<void> {
    const alimentoId = new AlimentoId(id);
    //const alimentoViejo = await this.alimentoRepo.getById(alimentoId.value);

    const newAlimento = new Alimento(
      new AlimentoId(alimentoId.value),
      new AlimentoNombre(alimento.nombre),
      new AlimentoClasificacion(alimento.clasificacion),
      new AlimentoProteinas(alimento.proteinas),
      new AlimentoCarbohidratos(alimento.carbohidratos),
      new AlimentoGrasas(alimento.grasas),
      new AlimentoUnidadMedicion(alimento.unidad_medicion),
    );
    await this.alimentoRepo.update(alimentoId.value, newAlimento.toAlimentoPrimitive());
  }
}
