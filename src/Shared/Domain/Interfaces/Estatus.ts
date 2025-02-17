export const ESTATUS = ['PENDIENTE', 'APROBADO', 'RECHAZADO'] as const;

export type EstatusType = (typeof ESTATUS)[number];
