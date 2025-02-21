export const CLASIFICACION = [
  'PROTEINA',
  'CARBOHIDRATOS',
  'GRASAS',
  'VEGETALES',
  'FRUTAS',
  'BEBIDAS',
  'ENDULZANTES',
  'SAZONADORES',
  'SNACKS',
] as const;

export type ClasificacionType = (typeof CLASIFICACION)[number];
