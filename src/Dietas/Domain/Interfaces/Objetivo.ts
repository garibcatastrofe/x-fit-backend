export const OBJETIVO = [
  'PERDIDA DE GRASA',
  'RECOMPOSICION CORPORAL',
  'GANANCIA DE MASA MUSCULAR',
] as const;

export type ObjetivoType = (typeof OBJETIVO)[number];
