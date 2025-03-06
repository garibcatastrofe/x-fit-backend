export interface ReportePrimitive {
  id?: string;
  id_cliente: number;
  id_rutina: string;
  bloque: string;
  sesion: string;
  fecha: Date;
  ejercicios: EjercicioReporte[];
}

export interface EjercicioReporte {
  id_ejercicio: string
  series: Serie[]
}

export interface Serie {
  carga: number
  repeticiones: number
}