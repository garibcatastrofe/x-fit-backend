export const OBJETIVO = [
  'GANAR MASA MUSCULAR',
  'PERDIDA DE GRASA',
  'RECOMPOSICION CORPORAL',
  'ACONDICIONAMIENTO FISICO',
] as const;

export type ObjetivoType = (typeof OBJETIVO)[number];
