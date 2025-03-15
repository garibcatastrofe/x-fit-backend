export interface IQuery<T> {
  page: number;
  perPage: number;
  order: 'asc' | 'desc';
  orderBy: keyof T extends string ? keyof T : never;
  eqAtribute: keyof T extends string ? keyof T : never;
  atribute: string
}
