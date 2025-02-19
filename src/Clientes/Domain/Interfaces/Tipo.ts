export const TIPO = ['PERSONALIZADO', 'NORMAL'] as const;

export type TipoType = (typeof TIPO)[number];
