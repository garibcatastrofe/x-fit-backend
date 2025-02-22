import { Alimento } from '../../Domain/Entities/Alimento';
import { AlimentoId } from '../../Domain/Entities/AlimentoId';
import { AlimentoNombre } from '../../Domain/Entities/AlimentoNombre';
import { AlimentoClasificacion } from '../../Domain/Entities/AlimentoClasificacion';
import { AlimentoProteinas } from '../../Domain/Entities/AlimentoProteinas';
import { AlimentoCarbohidratos } from '../../Domain/Entities/AlimentoCarbohidratos';
import { AlimentoGrasas } from '../../Domain/Entities/AlimentoGrasas';
import { AlimentoUnidadMedicion } from '../../Domain/Entities/AlimentoUnidadMedicion';
import { AlimentoRepository } from '../../Domain/Entities/AlimentoRepository';
import { AlimentoCreateDto } from '../../Domain/Interfaces/AlimentoCreateDto';

export class CreateAlimento {
  public constructor(private readonly alimentoRepo: AlimentoRepository) {}

  public async run({
    id,
    nombre,
    clasificacion,
    proteinas,
    carbohidratos,
    grasas,
    unidad_medicion,
  }: AlimentoCreateDto): Promise<void> {
    const nuevoAlimento = new Alimento(
      id ? new AlimentoId(id) : AlimentoId.retornoVacio(),
      new AlimentoNombre(nombre),
      new AlimentoClasificacion(clasificacion),
      new AlimentoProteinas(proteinas),
      new AlimentoCarbohidratos(carbohidratos),
      new AlimentoGrasas(grasas),
      new AlimentoUnidadMedicion(unidad_medicion),
    );
    await this.alimentoRepo.create(nuevoAlimento.toAlimentoPrimitive());
  }
}
