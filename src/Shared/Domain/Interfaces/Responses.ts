export interface PaginatedResponse<T> {
  data: T[];
  count: number;
}

export interface PaginatedResponseUsuarios<T> {
  data: T[];
  countUsuarios: number;
  countEmpleados: number;
  countClientes: number;
}
