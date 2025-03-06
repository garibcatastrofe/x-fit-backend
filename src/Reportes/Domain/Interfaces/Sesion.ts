export const SESION = [
  'SESION 1',
  'SESION 2',
  'SESION 3',
  'SESION 4',
  'SESION 5',
  'SESION 6',
] as const;

export type SesionType = (typeof SESION)[number];
