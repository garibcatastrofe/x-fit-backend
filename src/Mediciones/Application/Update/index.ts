import { Medicion } from '../../Domain/Entities/Medicion';
import { MedicionId } from '../../Domain/Entities/MedicionId';
import { ClienteId } from '@/src/Clientes/Domain/Entities/ClienteId';
import { MedicionFecha } from '../../Domain/Entities/MedicionFecha';
import { MedicionBrazoDerecho } from '../../Domain/Entities/MedicionBrazoDerecho';
import { MedicionBrazoIzquierdo } from '../../Domain/Entities/MedicionBrazoIzquierdo';
import { MedicionPiernaDerecha } from '../../Domain/Entities/MedicionPiernaDerecha';
import { MedicionPiernaIzquierda } from '../../Domain/Entities/MedicionPiernaIzquierda';
import { MedicionCadera } from '../../Domain/Entities/MedicionCadera';
import { MedicionAbdomen } from '../../Domain/Entities/MedicionAbdomen';
import { MedicionEspalda } from '../../Domain/Entities/MedicionEspalda';
import { MedicionCuello } from '../../Domain/Entities/MedicionCuello';
import { MedicionRepository } from '../../Domain/Entities/MedicionRepository';
import { MedicionPrimitive } from '../../Domain/Interfaces/MedicionPrimitive';

export class UpdateMedicion {
  public constructor(private readonly medicionRepo: MedicionRepository) {}

  public async run(id: string, medicion: MedicionPrimitive): Promise<void> {
    const medicionId = new MedicionId(id);

    const newMedicion = new Medicion(
      new MedicionId(medicionId.value),
      new ClienteId(medicion.id_cliente),
      new MedicionFecha(medicion.fecha),
      new MedicionBrazoDerecho(medicion.brazo_derecho),
      new MedicionBrazoIzquierdo(medicion.brazo_izquierdo),
      new MedicionPiernaDerecha(medicion.pierna_derecha),
      new MedicionPiernaIzquierda(medicion.pierna_izquierda),
      new MedicionCadera(medicion.cadera),
      new MedicionAbdomen(medicion.abdomen),
      new MedicionEspalda(medicion.espalda),
      new MedicionCuello(medicion.cuello),
    );
    await this.medicionRepo.update(medicionId.value, newMedicion.toMedicionPrimitive());
  }
}
