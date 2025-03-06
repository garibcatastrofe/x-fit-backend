export const TIPO_RESPUESTA = ['PALABRAS', 'NUMEROS', 'FECHA', 'LISTA'] as const;

export type TipoRespuestaType = (typeof TIPO_RESPUESTA)[number];
