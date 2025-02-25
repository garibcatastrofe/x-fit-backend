export const OBJETIVO_PROGRAMA = ['FUERZA', 'HIPERTROFIA', 'RESISTENCIA'] as const;

export type ObjetivoProgramaType = (typeof OBJETIVO_PROGRAMA)[number];
