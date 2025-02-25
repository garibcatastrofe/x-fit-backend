import { RuffierPrimitive } from '../Interfaces/RuffierPrimitive';
import { RuffierId } from './RuffierId';
import { ClienteId } from '@/src/Clientes/Domain/Entities/ClienteId';
import { RutinaId } from '@/src/Rutinas/Domain/Entities/RutinaId';
import { RuffierBloque } from './RuffierBloque';
import { RuffierFecha } from './RuffierFecha';
import { RuffierFcPrevia } from './RuffierFcPrevia';
import { RuffierFcTerminarEsfuerzo } from './RuffierFcTerminarEsfuerzo';
import { RuffierFcMinutoTerminarEsfuerzo } from './RuffierFcMinutoTerminarEsfuerzo';
import { BloqueType } from '../Interfaces/Bloques';

export class Ruffier {
  public ruffierId: RuffierId;
  public ruffierClienteId: ClienteId;
  public ruffierRutinaId: RutinaId;
  public ruffierBloque: RuffierBloque;
  public ruffierFecha: RuffierFecha;
  public ruffierFcPrevia: RuffierFcPrevia;
  public ruffierFcTerminarEsfuerzo: RuffierFcTerminarEsfuerzo;
  public ruffierFcMinutoTerminarEsfuerzo: RuffierFcMinutoTerminarEsfuerzo;

  public constructor(
    id: RuffierId,
    cliente_id: ClienteId,
    rutina_id: RutinaId,
    bloque: RuffierBloque,
    fecha: RuffierFecha,
    fc_previa: RuffierFcPrevia,
    fc_terminar_esfuerzo: RuffierFcTerminarEsfuerzo,
    fc_minuto_terminar_esfuerzo: RuffierFcMinutoTerminarEsfuerzo,
  ) {
    this.ruffierId = id;
    this.ruffierClienteId = cliente_id;
    this.ruffierRutinaId = rutina_id;
    this.ruffierBloque = bloque;
    this.ruffierFecha = fecha;
    this.ruffierFcPrevia = fc_previa;
    this.ruffierFcTerminarEsfuerzo = fc_terminar_esfuerzo;
    this.ruffierFcMinutoTerminarEsfuerzo = fc_minuto_terminar_esfuerzo;
  }

  public toRuffierPrimitive(): RuffierPrimitive {
    return {
      id: this.ruffierId.value,
      id_cliente: this.ruffierClienteId.value,
      id_rutina: this.ruffierRutinaId.value,
      bloque: this.ruffierBloque.value as BloqueType,
      fecha: this.ruffierFecha.value,
      fc_previa: this.ruffierFcPrevia.value,
      fc_terminar_esfuerzo: this.ruffierFcTerminarEsfuerzo.value,
      fc_minuto_terminar_esfuerzo: this.ruffierFcMinutoTerminarEsfuerzo.value,
    };
  }
}
