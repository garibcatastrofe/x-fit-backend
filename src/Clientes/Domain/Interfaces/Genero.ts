export const GENERO = ['F', 'M'] as const;

export type GeneroType = (typeof GENERO)[number];
