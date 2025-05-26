/* export interface IQuery <T> {
  page: number;
  perPage: number;
  order: 'asc' | 'desc';
  orderBy: string;
  filters: {
    campo: keyof T;
    operador: '=' | '!=' | '<' | '<=' | '>' | '>=';
    valor: string | number;
  }[];
  orderBy: keyof T extends string ? keyof T : never;
  eqAtribute: keyof T extends string ? keyof T : never;
  atribute: string
  whereCondition: keyof T extends string ? keyof T : never;
} */

export type OperadorComparacion = '=' | '!=' | '<' | '<=' | '>' | '>=';

export interface Filtro<T> {
  campo: keyof T;
  operador: OperadorComparacion;
  valor: string | number;
}

export interface IQueryGeneral<T> {
  page: number;
  perPage: number;
  order: 'asc' | 'desc';
  orderBy: keyof T;
  filters: Filtro<T>[];
}
