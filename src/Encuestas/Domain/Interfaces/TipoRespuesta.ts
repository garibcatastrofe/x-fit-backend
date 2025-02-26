export const TIPO_RESPUESTA = ['PALABRAS', 'NUMEROS', 'FECHA'] as const;

export type TipoRespuestaType = (typeof TIPO_RESPUESTA)[number];
