export const TIPO = ['GRUPAL', 'INDIVIDUAL'] as const;

export type TipoType = (typeof TIPO)[number];
