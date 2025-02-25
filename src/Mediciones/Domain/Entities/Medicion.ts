import { MedicionPrimitive } from '../Interfaces/MedicionPrimitive';
import { MedicionId } from './MedicionId';
import { ClienteId } from '@/src/Clientes/Domain/Entities/ClienteId';
import { MedicionFecha } from './MedicionFecha';
import { MedicionBrazoDerecho } from './MedicionBrazoDerecho';
import { MedicionBrazoIzquierdo } from './MedicionBrazoIzquierdo';
import { MedicionPiernaDerecha } from './MedicionPiernaDerecha';
import { MedicionPiernaIzquierda } from './MedicionPiernaIzquierda';
import { MedicionCadera } from './MedicionCadera';
import { MedicionAbdomen } from './MedicionAbdomen';
import { MedicionEspalda } from './MedicionEspalda';
import { MedicionCuello } from './MedicionCuello';

export class Medicion {
  public medicionId: MedicionId;
  public medicionClienteId: ClienteId;
  public medicionFecha: MedicionFecha;
  public medicionBrazoDerecho: MedicionBrazoDerecho;
  public medicionBrazoIzquierdo: MedicionBrazoIzquierdo;
  public medicionPiernaDerecha: MedicionPiernaDerecha;
  public medicionPiernaIzquierda: MedicionPiernaIzquierda;
  public medicionCadera: MedicionCadera;
  public medicionAbdomen: MedicionAbdomen;
  public medicionEspalda: MedicionEspalda;
  public medicionCuello: MedicionCuello;

  public constructor(
    id: MedicionId,
    cliente_id: ClienteId,
    fecha: MedicionFecha,
    brazo_derecho: MedicionBrazoDerecho,
    brazo_izquierdo: MedicionBrazoIzquierdo,
    pierna_derecha: MedicionPiernaDerecha,
    pierna_izquierda: MedicionPiernaIzquierda,
    cadera: MedicionCadera,
    abdomen: MedicionAbdomen,
    espalda: MedicionEspalda,
    cuello: MedicionCuello,
  ) {
    this.medicionId = id;
    this.medicionClienteId = cliente_id;
    this.medicionFecha = fecha;
    this.medicionBrazoDerecho = brazo_derecho;
    this.medicionBrazoIzquierdo = brazo_izquierdo;
    this.medicionPiernaDerecha = pierna_derecha;
    this.medicionPiernaIzquierda = pierna_izquierda;
    this.medicionCadera = cadera;
    this.medicionAbdomen = abdomen;
    this.medicionEspalda = espalda;
    this.medicionCuello = cuello;
  }

  public toMedicionPrimitive(): MedicionPrimitive {
    return {
      id: this.medicionId.value,
      id_cliente: this.medicionClienteId.value,
      fecha: this.medicionFecha.value,
      brazo_derecho: this.medicionBrazoDerecho.value,
      brazo_izquierdo: this.medicionBrazoIzquierdo.value,
      pierna_derecha: this.medicionPiernaDerecha.value,
      pierna_izquierda: this.medicionPiernaIzquierda.value,
      cadera: this.medicionCadera.value,
      abdomen: this.medicionAbdomen.value,
      espalda: this.medicionEspalda.value,
      cuello: this.medicionCuello.value,
    };
  }
}
