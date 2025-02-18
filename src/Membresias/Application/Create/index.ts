import { Membresia } from '../../Domain/Entities/Membresia';
import { MembresiaId } from '../../Domain/Entities/MembresiaId';
import { MembresiaNombre } from '../../Domain/Entities/MembresiaNombre';
import { MembresiaPrecio } from '../../Domain/Entities/MembresiaPrecio';
import { MembresiaDuracionMeses } from '../../Domain/Entities/MembresiaDuracionMeses';
import { MembresiaDescripcion } from '../../Domain/Entities/MembresiaDescripcion';
import { MembresiaRepository } from '../../Domain/Entities/MembresiaRepository';
import { MembresiaCreateDto } from '../../Domain/Interfaces/MembresiaCreateDto';

export class CreateMembresia {
  public constructor(private readonly membresiaRepo: MembresiaRepository) {}

  public async run({
    id,
    nombre,
    precio,
    duracion_meses,
    descripcion,
  }: MembresiaCreateDto): Promise<void> {
    const nuevaMembresia = new Membresia(
      id ? new MembresiaId(id) : MembresiaId.random(),
      new MembresiaNombre(nombre),
      new MembresiaPrecio(precio),
      new MembresiaDuracionMeses(duracion_meses),
      new MembresiaDescripcion(descripcion),
    );
    await this.membresiaRepo.create(nuevaMembresia.toMembresiaPrimitive());
  }
}
