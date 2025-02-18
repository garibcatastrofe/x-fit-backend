import { Promocion } from '../../Domain/Entities/Promocion';
import { PromocionId } from '../../Domain/Entities/PromocionId';
import { PromocionNombre } from '../../Domain/Entities/PromocionNombre';
import { PromocionDescuento } from '../../Domain/Entities/PromocionDescuento';
import { PromocionTipoDescuento } from '../../Domain/Entities/PromocionTipoDescuento';
import { PromocionFechaInicio } from '../../Domain/Entities/PromocionFechaInicio';
import { PromocionFechaVencimiento } from '../../Domain/Entities/PromocionFechaVencimiento';
import { PromocionEstatus } from '../../Domain/Entities/PromocionEstatus';
import { PromocionRepository } from '../../Domain/Entities/PromocionRepository';
import { PromocionCreateDto } from '../../Domain/Interfaces/PromocionCreateDto';

export class CreatePromocion {
  public constructor(private readonly promocionRepo: PromocionRepository) {}

  public async run({
    id,
    nombre,
    descuento,
    tipo_descuento,
    fecha_inicio,
    fecha_vencimiento,
    estatus,
  }: PromocionCreateDto): Promise<void> {
    const nuevaPromocion = new Promocion(
      id ? new PromocionId(id) : PromocionId.random(),
      new PromocionNombre(nombre),
      new PromocionDescuento(descuento),
      new PromocionTipoDescuento(tipo_descuento),
      new PromocionFechaInicio(fecha_inicio),
      new PromocionFechaVencimiento(fecha_vencimiento),
      new PromocionEstatus(estatus),
    );
    await this.promocionRepo.create(nuevaPromocion.toPromocionPrimitive());
  }
}
