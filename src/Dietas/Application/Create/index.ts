import { Dieta } from '../../Domain/Entities/Dieta';
import { DietaId } from '../../Domain/Entities/DietaId';
import { DietaClienteId } from '../../Domain/Entities/DietaClienteId';
import { DietaEmpleadoId } from '../../Domain/Entities/DietaEmpleadoId';
import { DietaFechaCreacion } from '../../Domain/Entities/DietaFechaCreacion';
import { DietaPesoKilogramos } from '../../Domain/Entities/DietaPesoKilogramos';
import { DietaEstaturaCentimetros } from '../../Domain/Entities/DietaEstaturaCentimetros';
import { DietaCuelloPulgadas } from '../../Domain/Entities/DietaCuelloPulgadas';
import { DietaCinturaPulgadas } from '../../Domain/Entities/DietaCinturaPulgadas';
import { DietaCaderaPulgadas } from '../../Domain/Entities/DietaCaderaPulgadas';
import { DietaObjetivo } from '../../Domain/Entities/DietaObjetivo';
import { DietaFactorActividad } from '../../Domain/Entities/DietaFactorActividad';
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
    platillos,
  }: DietaCreateDto): Promise<void> {
    const nuevaDieta = new Dieta(
      id ? new DietaId(id) : DietaId.retornoVacio(),
      new DietaClienteId(id_cliente),
      new DietaEmpleadoId(id_empleado),
      new DietaFechaCreacion(fecha_creacion),
      new DietaPesoKilogramos(peso_kilogramos),
      new DietaEstaturaCentimetros(estatura_centimetros),
      new DietaCuelloPulgadas(cuello_pulgadas),
      new DietaCinturaPulgadas(cintura_pulgadas),
      new DietaCaderaPulgadas(cadera_pulgadas),
      new DietaObjetivo(objetivo),
      new DietaFactorActividad(factor_actividad),
      new DietaPlatillos(
        new Platillo(
          platillos.desayuno.comentario,
          platillos.desayuno.alimentos.map(a => new AlimentoDieta(a.id_alimento, a.cantidad)),
        ),
        new Platillo(
          platillos.snack_1.comentario,
          platillos.snack_1.alimentos.map(a => new AlimentoDieta(a.id_alimento, a.cantidad)),
        ),
        new Platillo(
          platillos.comida.comentario,
          platillos.comida.alimentos.map(a => new AlimentoDieta(a.id_alimento, a.cantidad)),
        ),
        new Platillo(
          platillos.snack_2.comentario,
          platillos.snack_2.alimentos.map(a => new AlimentoDieta(a.id_alimento, a.cantidad)),
        ),
        new Platillo(
          platillos.cena.comentario,
          platillos.cena.alimentos.map(a => new AlimentoDieta(a.id_alimento, a.cantidad)),
        ),
      ),
    );
    await this.dietaRepo.create(nuevaDieta.toDietaPrimitive());
  }
}
