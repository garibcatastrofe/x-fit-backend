import { MembresiaPrimitive } from '../Interfaces/MembresiaPrimitive';
import { MembresiaId } from './MembresiaId';
import { MembresiaNombre } from './MembresiaNombre';
import { MembresiaPrecio } from './MembresiaPrecio';
import { MembresiaDuracionMeses } from './MembresiaDuracionMeses';
import { MembresiaDescripcion } from './MembresiaDescripcion';
import { MembresiaTipo } from './MembresiaTipo';
import { TipoType } from '../Interfaces/Tipo';

export class Membresia {
  public membresiaId: MembresiaId;
  public membresiaNombre: MembresiaNombre;
  public membresiaPrecio: MembresiaPrecio;
  public membresiaDuracionMeses: MembresiaDuracionMeses;
  public membresiaDescripcion: MembresiaDescripcion;
  public membresiaTipo: MembresiaTipo;

  public constructor(
    id: MembresiaId,
    nombre: MembresiaNombre,
    precio: MembresiaPrecio,
    duracion_meses: MembresiaDuracionMeses,
    descripcion: MembresiaDescripcion,
    tipo: MembresiaTipo,
  ) {
    this.membresiaId = id;
    this.membresiaNombre = nombre;
    this.membresiaPrecio = precio;
    this.membresiaDuracionMeses = duracion_meses;
    this.membresiaDescripcion = descripcion;
    this.membresiaTipo = tipo;
  }

  public toMembresiaPrimitive(): MembresiaPrimitive {
    return {
      id: this.membresiaId.value,
      nombre: this.membresiaNombre.value,
      precio: this.membresiaPrecio.value,
      duracion_meses: this.membresiaDuracionMeses.value,
      descripcion: this.membresiaDescripcion.value,
      tipo: this.membresiaTipo.value as TipoType,
    };
  }
}
