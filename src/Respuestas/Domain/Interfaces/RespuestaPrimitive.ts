export interface RespuestaPrimitive {
  id?: string;
  id_usuario: number;
  id_encuesta: string;
  fecha: Date;
  respuestas: Respuesta[];
}

export interface Respuesta {
  id_pregunta: string;
  texto: string;
  respuesta: string;
}
