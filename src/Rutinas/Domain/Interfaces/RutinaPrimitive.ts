export interface RutinaPrimitive {
  id?: string;
  id_cliente: number;
  id_empleado: number;
  fecha_creacion: Date;
  objetivo: string;
  visible: string;
  datos_especificos_grupo_muscular: DatosEspecificosGrupoMuscular;
  bloques: Bloques;
}

export interface Bloques {
  bloque_1: Sesion;
  bloque_2: Sesion;
  bloque_3: Sesion;
}

export interface Sesion {
  sesion_1: SesionPrimitive[];
  sesion_2: SesionPrimitive[];
  sesion_3: SesionPrimitive[];
  sesion_4: SesionPrimitive[];
  sesion_5: SesionPrimitive[];
  sesion_6: SesionPrimitive[];
}

export interface SesionPrimitive {
  id_ejercicio: string;
}

export interface DatosEspecificosGrupoMuscular {
  objetivo_programa: string,
  grupo_muscular: DatoEspecificoPrimitive[];
}

export interface DatoEspecificoPrimitive {
  nombre_grupo: string,
  nivel_fuerza: string,
  volumen_trabajo: string,
  recuperacion_historica: string
}