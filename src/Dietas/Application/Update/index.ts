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
import { DietaPrimitive } from '../../Domain/Interfaces/DietaPrimitive';
import { AlimentoDieta } from '../../Domain/Entities/DietaPlatillos/AlimentoDieta';
import { Platillo } from '../../Domain/Entities/DietaPlatillos/PlatilloDieta';

export class UpdateDieta {
  public constructor(private readonly dietaRepo: DietaRepository) {}

  public async run(id: string, dieta: DietaPrimitive): Promise<void> {
    const dietaId = new DietaId(id);

    // ⚡ Validamos todos los alimentos antes de crear la dieta
    const desayunoAlimentos = await Promise.all(
      dieta.platillos.desayuno.alimentos.map(a => AlimentoDieta.create(a.id_alimento, a.cantidad)),
    );

    const snack1Alimentos = await Promise.all(
      dieta.platillos.snack_1.alimentos.map(a => AlimentoDieta.create(a.id_alimento, a.cantidad)),
    );

    const comidaAlimentos = await Promise.all(
      dieta.platillos.comida.alimentos.map(a => AlimentoDieta.create(a.id_alimento, a.cantidad)),
    );

    const snack2Alimentos = await Promise.all(
      dieta.platillos.snack_2.alimentos.map(a => AlimentoDieta.create(a.id_alimento, a.cantidad)),
    );

    const cenaAlimentos = await Promise.all(
      dieta.platillos.cena.alimentos.map(a => AlimentoDieta.create(a.id_alimento, a.cantidad)),
    );

    // ✅ Ahora que los alimentos están validados, creamos la dieta
    const newDieta = new Dieta(
      id ? new DietaId(id) : DietaId.retornoVacio(),
      new DietaClienteId(dieta.id_cliente),
      new DietaEmpleadoId(dieta.id_empleado),
      new DietaFechaCreacion(dieta.fecha_creacion),
      new DietaPesoKilogramos(dieta.peso_kilogramos),
      new DietaEstaturaCentimetros(dieta.estatura_centimetros),
      new DietaCuelloPulgadas(dieta.cuello_pulgadas),
      new DietaCinturaPulgadas(dieta.cintura_pulgadas),
      new DietaCaderaPulgadas(dieta.cadera_pulgadas),
      new DietaObjetivo(dieta.objetivo),
      new DietaFactorActividad(dieta.factor_actividad),
      new DietaPlatillos(
        new Platillo(dieta.platillos.desayuno.comentario, desayunoAlimentos),
        new Platillo(dieta.platillos.snack_1.comentario, snack1Alimentos),
        new Platillo(dieta.platillos.comida.comentario, comidaAlimentos),
        new Platillo(dieta.platillos.snack_2.comentario, snack2Alimentos),
        new Platillo(dieta.platillos.cena.comentario, cenaAlimentos),
      ),
    );

    await this.dietaRepo.update(dietaId.value, newDieta.toDietaPrimitive());
  }
}
