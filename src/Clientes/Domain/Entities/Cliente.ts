import { ClienteId } from '@/src/Clientes/Domain/Entities/ClienteId';
import { ClienteFechaInicio } from './ClienteFechaInicio';
import { ClienteTipo } from './ClienteTipo';
import { UsuarioId } from '@/src/Usuarios/Domain/Entities/UsuarioId';
import { ClientePrimitive } from '../Interfaces/ClientePrimitive';
import { TipoType } from '../Interfaces/Tipo';

export class Cliente {
  public clienteId: ClienteId;
  public clienteFechaInicio: ClienteFechaInicio;
  public clienteTipo: ClienteTipo;
  public clienteUsuarioId: UsuarioId;
  public constructor(
    id: ClienteId,
    fecha_inicio: ClienteFechaInicio,
    tipo: ClienteTipo,
    clienteUsuarioId: UsuarioId,
  ) {
    this.clienteId = id;
    this.clienteFechaInicio = fecha_inicio;
    this.clienteTipo = tipo;
    this.clienteUsuarioId = clienteUsuarioId;
  }

  public toPrimitive(): ClientePrimitive {
    return {
      id: this.clienteId.value,
      fecha_inicio: this.clienteFechaInicio.value,
      tipo: this.clienteTipo.value as TipoType,
      usuario_id: this.clienteUsuarioId.value,
    };
  }
}
