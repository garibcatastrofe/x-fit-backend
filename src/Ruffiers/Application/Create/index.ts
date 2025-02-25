import { Ruffier } from '../../Domain/Entities/Ruffier';
import { RuffierId } from '../../Domain/Entities/RuffierId';
import { ClienteId } from '@/src/Clientes/Domain/Entities/ClienteId';
import { RutinaId } from '@/src/Rutinas/Domain/Entities/RutinaId';
import { RuffierBloque } from '../../Domain/Entities/RuffierBloque';
import { RuffierFecha } from '../../Domain/Entities/RuffierFecha';
import { RuffierFcPrevia } from '../../Domain/Entities/RuffierFcPrevia';
import { RuffierFcTerminarEsfuerzo } from '../../Domain/Entities/RuffierFcTerminarEsfuerzo';
import { RuffierFcMinutoTerminarEsfuerzo } from '../../Domain/Entities/RuffierFcMinutoTerminarEsfuerzo';
import { RuffierRepository } from '../../Domain/Entities/RuffierRepository';
import { RuffierCreateDto } from '../../Domain/Interfaces/RuffierCreateDto';

export class CreateRuffier {
  public constructor(private readonly ruffierRepo: RuffierRepository) {}

  public async run({
    id,
    id_cliente,
    id_rutina,
    bloque,
    fecha,
    fc_previa,
    fc_terminar_esfuerzo,
    fc_minuto_terminar_esfuerzo,
  }: RuffierCreateDto): Promise<void> {
    const nuevoRuffier = new Ruffier(
      id ? new RuffierId(id) : RuffierId.retornoVacio(),
      new ClienteId(id_cliente),
      new RutinaId(id_rutina),
      new RuffierBloque(bloque),
      new RuffierFecha(fecha),
      new RuffierFcPrevia(fc_previa),
      new RuffierFcTerminarEsfuerzo(fc_terminar_esfuerzo),
      new RuffierFcMinutoTerminarEsfuerzo(fc_minuto_terminar_esfuerzo),
    );
    await this.ruffierRepo.create(nuevoRuffier.toRuffierPrimitive());
  }
}
