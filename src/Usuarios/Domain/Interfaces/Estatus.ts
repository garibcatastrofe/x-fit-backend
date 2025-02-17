export const ESTATUS = ['ACTIVO', 'INACTIVO'] as const;

export type EstatusType = (typeof ESTATUS)[number];