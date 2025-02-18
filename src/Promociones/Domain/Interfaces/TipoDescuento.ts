export const TIPO_DESCUENTO = ['PORCENTAJE', 'MONTO FIJO'] as const;

export type TipoDescuentoType = (typeof TIPO_DESCUENTO)[number];
