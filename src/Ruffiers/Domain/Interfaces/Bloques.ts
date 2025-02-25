export const BLOQUES = ['BLOQUE I', 'BLOQUE II', 'BLOQUE III'] as const;

export type BloqueType = (typeof BLOQUES)[number];
