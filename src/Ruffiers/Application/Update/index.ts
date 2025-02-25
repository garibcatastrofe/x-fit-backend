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
import { RuffierPrimitive } from '../../Domain/Interfaces/RuffierPrimitive';

export class UpdateRuffier {
  public constructor(private readonly ruffierRepo: RuffierRepository) {}

  public async run(id: string, ruffier: RuffierPrimitive): Promise<void> {
    const ruffierId = new RuffierId(id);

    const newRuffier = new Ruffier(
      new RuffierId(ruffierId.value),
      new ClienteId(ruffier.id_cliente),
      new RutinaId(ruffier.id_rutina),
      new RuffierBloque(ruffier.bloque),
      new RuffierFecha(ruffier.fecha),
      new RuffierFcPrevia(ruffier.fc_previa),
      new RuffierFcTerminarEsfuerzo(ruffier.fc_terminar_esfuerzo),
      new RuffierFcMinutoTerminarEsfuerzo(ruffier.fc_minuto_terminar_esfuerzo),
    );
    await this.ruffierRepo.update(ruffierId.value, newRuffier.toRuffierPrimitive());
  }
}
