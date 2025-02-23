import { DietaPrimitive } from '../Interfaces/DietaPrimitive';
import { DietaId } from './DietaId';
import { DietaClienteId } from './DietaClienteId';
import { DietaEmpleadoId } from './DietaEmpleadoId';
import { DietaFechaCreacion } from './DietaFechaCreacion';
import { DietaPesoKilogramos } from './DietaPesoKilogramos';
import { DietaEstaturaCentimetros } from './DietaEstaturaCentimetros';
import { DietaCuelloPulgadas } from './DietaCuelloPulgadas';
import { DietaCinturaPulgadas } from './DietaCinturaPulgadas';
import { DietaCaderaPulgadas } from './DietaCaderaPulgadas';
import { DietaObjetivo } from './DietaObjetivo';
import { DietaFactorActividad } from './DietaFactorActividad';
import { DietaPlatillos } from './DietaPlatillos/PlatillosDieta';
import { ObjetivoType } from '../Interfaces/Objetivo';
import { FactorActividadType } from '../Interfaces/FactorActividad';

export class Dieta {
  public dietaId: DietaId;
  public dietaClienteId: DietaClienteId;
  public dietaEmpleadoId: DietaEmpleadoId;
  public dietaFechaCreacion: DietaFechaCreacion;
  public dietaPesoKilogramos: DietaPesoKilogramos;
  public dietaEstaturaCentimetros: DietaEstaturaCentimetros;
  public dietaCuelloPulgadas: DietaCuelloPulgadas;
  public dietaCinturaPulgadas: DietaCinturaPulgadas;
  public dietaCaderaPulgadas: DietaCaderaPulgadas;
  public dietaObjetivo: DietaObjetivo;
  public dietaFactorActividad: DietaFactorActividad;
  public dietaPlatillos: DietaPlatillos;

  public constructor(
    id: DietaId,
    cliente_id: DietaClienteId,
    empleado_id: DietaEmpleadoId,
    fecha_creacion: DietaFechaCreacion,
    peso_kilogramos: DietaPesoKilogramos,
    estatura_centimetros: DietaEstaturaCentimetros,
    cuello_pulgadas: DietaCuelloPulgadas,
    cintura_pulgadas: DietaCinturaPulgadas,
    cadera_pulgadas: DietaCaderaPulgadas,
    objetivo: DietaObjetivo,
    factor_actividad: DietaFactorActividad,
    platillos: DietaPlatillos,
  ) {
    this.dietaId = id;
    this.dietaClienteId = cliente_id;
    this.dietaEmpleadoId = empleado_id;
    this.dietaFechaCreacion = fecha_creacion;
    this.dietaPesoKilogramos = peso_kilogramos;
    this.dietaEstaturaCentimetros = estatura_centimetros;
    this.dietaCuelloPulgadas = cuello_pulgadas;
    this.dietaCinturaPulgadas = cintura_pulgadas;
    this.dietaCaderaPulgadas = cadera_pulgadas;
    this.dietaObjetivo = objetivo;
    this.dietaFactorActividad = factor_actividad;
    this.dietaPlatillos = platillos;
  }

  public toDietaPrimitive(): DietaPrimitive {
    return {
      id: this.dietaId.value,
      id_cliente: this.dietaClienteId.value,
      id_empleado: this.dietaEmpleadoId.value,
      fecha_creacion: this.dietaFechaCreacion.value,
      peso_kilogramos: this.dietaPesoKilogramos.value,
      estatura_centimetros: this.dietaEstaturaCentimetros.value,
      cuello_pulgadas: this.dietaCuelloPulgadas.value,
      cintura_pulgadas: this.dietaCinturaPulgadas.value,
      cadera_pulgadas: this.dietaCaderaPulgadas.value,
      objetivo: this.dietaObjetivo.value as ObjetivoType,
      factor_actividad: this.dietaFactorActividad.value as FactorActividadType,
      platillos: this.dietaPlatillos.toPrimitive(),
    };
  }
}
