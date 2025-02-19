import { ClienteId } from '@/src/Clientes/Domain/Entities/ClienteId';
import { ClienteFechaInicio } from './ClienteFechaInicio';
import { ClienteGenero } from './ClienteGenero';
import { ClienteTipo } from './ClienteTipo';
import { UsuarioId } from '@/src/Usuarios/Domain/Entities/UsuarioId';
import { ClientePrimitive } from '../Interfaces/ClientePrimitive';
import { GeneroType } from '../Interfaces/Genero';
import { TipoType } from '../Interfaces/Tipo';

export class Cliente {
  public clienteId: ClienteId;
  public clienteFechaInicio: ClienteFechaInicio;
  public clienteTipo: ClienteTipo;
  public clienteGenero: ClienteGenero;
  public clienteUsuarioId: UsuarioId;
  public constructor(
    id: ClienteId,
    fecha_inicio: ClienteFechaInicio,
    tipo: ClienteTipo,
    genero: ClienteGenero,
    clienteUsuarioId: UsuarioId,
  ) {
    this.clienteId = id;
    this.clienteFechaInicio = fecha_inicio;
    this.clienteTipo = tipo;
    this.clienteGenero = genero;
    this.clienteUsuarioId = clienteUsuarioId;
  }

  public toPrimitive(): ClientePrimitive {
    return {
      id: this.clienteId.value,
      fecha_inicio: this.clienteFechaInicio.value,
      tipo: this.clienteTipo.value as TipoType,
      genero: this.clienteGenero.value as GeneroType,
      usuario_id: this.clienteUsuarioId.value,
    };
  }
}
