import { AlimentoPrimitive } from '../Interfaces/AlimentoPrimitive';
import { AlimentoId } from './AlimentoId';
import { AlimentoNombre } from './AlimentoNombre';
import { AlimentoClasificacion } from './AlimentoClasificacion';
import { AlimentoProteinas } from './AlimentoProteinas';
import { AlimentoCarbohidratos } from './AlimentoCarbohidratos';
import { AlimentoGrasas } from './AlimentoGrasas';
import { AlimentoUnidadMedicion } from './AlimentoUnidadMedicion';
import { ClasificacionType } from '../Interfaces/Clasificacion';
import { UnidadMedicionType } from '../Interfaces/UnidadMedicion';

export class Alimento {
  public alimentoId: AlimentoId;
  public alimentoNombre: AlimentoNombre;
  public alimentoClasificacion: AlimentoClasificacion;
  public alimentoProteinas: AlimentoProteinas;
  public alimentoCarbohidratos: AlimentoCarbohidratos;
  public alimentoGrasas: AlimentoGrasas;
  public alimentoUnidadMedicion: AlimentoUnidadMedicion;

  public constructor(
    id: AlimentoId,
    nombre: AlimentoNombre,
    clasificacion: AlimentoClasificacion,
    proteinas: AlimentoProteinas,
    carbohidratos: AlimentoCarbohidratos,
    grasas: AlimentoGrasas,
    unidad_medicion: AlimentoUnidadMedicion,
  ) {
    this.alimentoId = id;
    this.alimentoNombre = nombre;
    this.alimentoClasificacion = clasificacion;
    this.alimentoProteinas = proteinas;
    this.alimentoCarbohidratos = carbohidratos;
    this.alimentoGrasas = grasas;
    this.alimentoUnidadMedicion = unidad_medicion;
  }

  public toAlimentoPrimitive(): AlimentoPrimitive {
    return {
      id: this.alimentoId.value,
      nombre: this.alimentoNombre.value,
      clasificacion: this.alimentoClasificacion.value as ClasificacionType,
      proteinas: this.alimentoProteinas.value,
      carbohidratos: this.alimentoCarbohidratos.value,
      grasas: this.alimentoGrasas.value,
      unidad_medicion: this.alimentoUnidadMedicion.value as UnidadMedicionType,
    };
  }
}
