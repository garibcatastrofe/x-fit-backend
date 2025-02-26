export const TIPO_PREGUNTA = ['ABIERTA', 'CERRADA'] as const;

export type TipoPreguntaType = (typeof TIPO_PREGUNTA)[number];
