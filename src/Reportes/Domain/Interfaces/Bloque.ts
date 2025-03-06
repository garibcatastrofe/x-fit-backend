export const BLOQUE = ['BLOQUE I', 'BLOQUE II', 'BLOQUE III'] as const;

export type BloqueType = (typeof BLOQUE)[number];
