export const NIVEL_FUERZA = [
  'CLASE III-VI',
  'CLASE I-II',
  'MASTER-ELITE',
  'ELITE INTERNACIONAL',
] as const;

export type NivelFuerzaType = (typeof NIVEL_FUERZA)[number];
