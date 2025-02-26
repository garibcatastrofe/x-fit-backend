export interface EncuestaPrimitive {
  id?: string;
  id_empleado: number;
  fecha: Date;
  preguntas: Pregunta[];
}

export interface Pregunta {
  id_pregunta: string
  tipo_pregunta: string
  tipo_respuesta: string
  texto: string
  opciones: string[]
}