import { EjercicioPrimitive } from '../Domain/Interfaces/EjercicioPrimitive';
import { ServiceContainer } from '@/src/Shared/Infrastructure/ServiceContainer';
import { NextFunction, Request, Response } from 'express';

const { Ejercicios: Ejercicio } = ServiceContainer;

export class EjercicioController {
  public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const body = req.body;
      await Ejercicio.create.run(body);
      res.status(201).json({ message: 'Ejercicio creado exitosamente' });
    } catch (error) {
      next(error);
    }
  }
  public async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { perPage = 5, order = 'asc', orderBy = 'id', direction = 'next' } = req.query; //Aquí le mandaremos cuantos alimentos queremos por página, en que orden y por cual campo lo vamos a ordenar
      const ultimoEjercicio = req.body; //Aquí le tendremos que mandar el alimento en json, que será el último alimento para la paginación, de tipo AlimentoPrimitive

      const ejercicios = await Ejercicio.getAll.run({
        ultimoDoc: ultimoEjercicio,
        perPage: Number(perPage),
        order: order as 'asc' | 'desc',
        orderBy: orderBy as keyof EjercicioPrimitive,
        direction: String(direction),
      });

      res.status(200).json(ejercicios);
    } catch (error) {
      next(error);
    }
  }
  public async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const ejercicio = await Ejercicio.getById.run(String(id));
      res.status(200).json(ejercicio);
    } catch (error) {
      next(error);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      if (Object.keys(req.body).length === 0) {
        res.status(400).json({ error: 'Faltan datos para actualizar el ejercicio.' });
        throw new Error(`Favor de proporcionar un ejercicio.`);
      }
      const ejercicio = req.body;
      await Ejercicio.update.run(String(id), ejercicio);
      res
        .status(200)
        .json({ message: `El ejercicio con el id ${id} fue actualizado exitosamente` });
    } catch (error) {
      console.warn('Entró al error');
      next(error);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await Ejercicio.delete.run(String(id));
      res.status(200).json({ message: `El ejercicio con el id ${id} fue eliminado exitosamente` });
    } catch (error) {
      next(error);
    }
  }
}
