export interface IQuery<T> {
  page: number;
  perPage: number;
  order: 'asc' | 'desc';
  orderBy: keyof T;
}
