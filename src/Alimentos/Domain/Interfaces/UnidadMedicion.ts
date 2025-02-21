export const UNIDAD_MEDICION = [
  'MILILITROS',
  'GRAMOS',
  'PIEZA',
  'REBANADA',
  'MITAD',
  'CUCHARADA',
  'LATA',
  'BOTELLA',
  'SOBRE',
  'TAZA',
  'PORCION',
] as const;

export type UnidadMedicionType = (typeof UNIDAD_MEDICION)[number];
