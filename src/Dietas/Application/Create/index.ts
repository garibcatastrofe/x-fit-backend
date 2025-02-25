import { Dieta } from '../../Domain/Entities/Dieta';
import { DietaId } from '../../Domain/Entities/DietaId';
import { ClienteId } from '@/src/Clientes/Domain/Entities/ClienteId';
import { EmpleadoId } from '@/src/Empleados/Domain/Entities/EmpleadoId';
import { DietaFechaCreacion } from '../../Domain/Entities/DietaFechaCreacion';
import { DietaPesoKilogramos } from '../../Domain/Entities/DietaPesoKilogramos';
import { DietaEstaturaCentimetros } from '../../Domain/Entities/DietaEstaturaCentimetros';
import { DietaCuelloPulgadas } from '../../Domain/Entities/DietaCuelloPulgadas';
import { DietaCinturaPulgadas } from '../../Domain/Entities/DietaCinturaPulgadas';
import { DietaCaderaPulgadas } from '../../Domain/Entities/DietaCaderaPulgadas';
import { DietaObjetivo } from '../../Domain/Entities/DietaObjetivo';
import { DietaFactorActividad } from '../../Domain/Entities/DietaFactorActividad';
import { Visible } from '@/src/Shared/Domain/Entities/Visible';
import { DietaPlatillos } from '../../Domain/Entities/DietaPlatillos/PlatillosDieta';
import { DietaRepository } from '../../Domain/Entities/DietaRepository';
import { DietaCreateDto } from '../../Domain/Interfaces/DietaCreateDto';
import { Platillo } from '../../Domain/Entities/DietaPlatillos/PlatilloDieta';
import { AlimentoDieta } from '../../Domain/Entities/DietaPlatillos/AlimentoDieta';

export class CreateDieta {
  public constructor(private readonly dietaRepo: DietaRepository) {}

  public async run({
    id,
    id_cliente,
    id_empleado,
    fecha_creacion,
    peso_kilogramos,
    estatura_centimetros,
    cuello_pulgadas,
    cintura_pulgadas,
    cadera_pulgadas,
    objetivo,
    factor_actividad,
    visible,
    platillos,
  }: DietaCreateDto): Promise<void> {
    // ⚡ Validamos todos los alimentos antes de crear la dieta
    const desayunoAlimentos = await Promise.all(
      platillos.desayuno.alimentos.map(a => AlimentoDieta.create(a.id_alimento, a.cantidad)),
    );

    const snack1Alimentos = await Promise.all(
      platillos.snack_1.alimentos.map(a => AlimentoDieta.create(a.id_alimento, a.cantidad)),
    );

    const comidaAlimentos = await Promise.all(
      platillos.comida.alimentos.map(a => AlimentoDieta.create(a.id_alimento, a.cantidad)),
    );

    const snack2Alimentos = await Promise.all(
      platillos.snack_2.alimentos.map(a => AlimentoDieta.create(a.id_alimento, a.cantidad)),
    );

    const cenaAlimentos = await Promise.all(
      platillos.cena.alimentos.map(a => AlimentoDieta.create(a.id_alimento, a.cantidad)),
    );

    // ✅ Ahora que los alimentos están validados, creamos la dieta
    const nuevaDieta = new Dieta(
      id ? new DietaId(id) : DietaId.retornoVacio(),
      new ClienteId(id_cliente),
      new EmpleadoId(id_empleado),
      new DietaFechaCreacion(fecha_creacion),
      new DietaPesoKilogramos(peso_kilogramos),
      new DietaEstaturaCentimetros(estatura_centimetros),
      new DietaCuelloPulgadas(cuello_pulgadas),
      new DietaCinturaPulgadas(cintura_pulgadas),
      new DietaCaderaPulgadas(cadera_pulgadas),
      new DietaObjetivo(objetivo),
      new DietaFactorActividad(factor_actividad),
      new Visible(visible),
      new DietaPlatillos(
        new Platillo(platillos.desayuno.comentario, desayunoAlimentos),
        new Platillo(platillos.snack_1.comentario, snack1Alimentos),
        new Platillo(platillos.comida.comentario, comidaAlimentos),
        new Platillo(platillos.snack_2.comentario, snack2Alimentos),
        new Platillo(platillos.cena.comentario, cenaAlimentos),
      ),
    );

    await this.dietaRepo.create(nuevaDieta.toDietaPrimitive());
  }
}
