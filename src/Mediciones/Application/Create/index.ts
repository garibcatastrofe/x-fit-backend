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
import { MedicionCreateDto } from '../../Domain/Interfaces/MedicionCreateDto';

export class CreateMedicion {
  public constructor(private readonly medicionRepo: MedicionRepository) {}

  public async run({
    id,
    id_cliente,
    fecha,
    brazo_derecho,
    brazo_izquierdo,
    pierna_derecha,
    pierna_izquierda,
    cadera,
    abdomen,
    espalda,
    cuello,
  }: MedicionCreateDto): Promise<void> {
    const nuevoMedicion = new Medicion(
      id ? new MedicionId(id) : MedicionId.retornoVacio(),
      new ClienteId(id_cliente),
      new MedicionFecha(fecha),
      new MedicionBrazoDerecho(brazo_derecho),
      new MedicionBrazoIzquierdo(brazo_izquierdo),
      new MedicionPiernaDerecha(pierna_derecha),
      new MedicionPiernaIzquierda(pierna_izquierda),
      new MedicionCadera(cadera),
      new MedicionAbdomen(abdomen),
      new MedicionEspalda(espalda),
      new MedicionCuello(cuello),
    );
    await this.medicionRepo.create(nuevoMedicion.toMedicionPrimitive());
  }
}
