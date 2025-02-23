export const FACTOR_ACTIVIDAD = [
  'SEDENTARIO',
  'ACTIVIDAD LIGERA',
  'ACTIVIDAD MODERADA',
  'ACTIVIDAD INTENSA',
  'ACTIVIDAD MUY INTENSA',
] as const;

export type FactorActividadType = (typeof FACTOR_ACTIVIDAD)[number];
