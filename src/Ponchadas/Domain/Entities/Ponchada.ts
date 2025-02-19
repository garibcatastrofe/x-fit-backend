import { PonchadaId } from '@/src/Ponchadas/Domain/Entities/PonchadaId';
import { PonchadaFecha } from './PonchadaFecha';
import { UsuarioId } from '@/src/Usuarios/Domain/Entities/UsuarioId';
import { PonchadaPrimitive } from '../Interfaces/PonchadaPrimitive';

export class Ponchada {
  public ponchadaId: PonchadaId;
  public ponchadaFecha: PonchadaFecha;
  public ponchadaUsuarioId: UsuarioId;
  public constructor(id: PonchadaId, fecha: PonchadaFecha, ponchadaUsuarioId: UsuarioId) {
    this.ponchadaId = id;
    this.ponchadaFecha = fecha;
    this.ponchadaUsuarioId = ponchadaUsuarioId;
  }

  public toPrimitive(): PonchadaPrimitive {
    return {
      id: this.ponchadaId.value,
      fecha: this.ponchadaFecha.value,
      usuario_id: this.ponchadaUsuarioId.value,
    };
  }
}
