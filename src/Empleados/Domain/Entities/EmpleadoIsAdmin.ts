import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';
import { IS_ADMIN, IsAdminType } from '../Interfaces/IsAdmin';

export class EmpleadoIsAdmin {
  public value: string;
  private campo = 'is_admin';
  public constructor(value: string) {
    this.ensureIsValid(value);
    this.value = value;
  }
  private ensureIsValid(value: string): void {
    if (!value) {
      throw new BadRequest({
        message: 'Favor de Seleccionar una opción para IsAdmin: SI o NO',
        campo: this.campo,
      });
    }
    if (!IS_ADMIN.includes(value as IsAdminType)) {
      throw new BadRequest({
        message:
          'No a seleccionado uno válido, favor de seleccionar un valor válido de tipo isAdmin: SI o NO',
        campo: this.campo,
        data: value,
      });
    }
  }
}
