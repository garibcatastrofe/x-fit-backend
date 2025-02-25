import { MedicionPrimitive } from '../Domain/Interfaces/MedicionPrimitive';
import { ServiceContainer } from '@/src/Shared/Infrastructure/ServiceContainer';
import { NextFunction, Request, Response } from 'express';

const { Mediciones: Medicion } = ServiceContainer;

export class MedicionController {
  public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const body = req.body;
      await Medicion.create.run(body);
      res.status(201).json({ message: 'Medicion creada exitosamente' });
    } catch (error) {
      next(error);
    }
  }
  public async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { perPage = 5, order = 'asc', orderBy = 'id', direction = 'next' } = req.query; //Aquí le mandaremos cuantos alimentos queremos por página, en que orden y por cual campo lo vamos a ordenar
      const ultimaMedicion = req.body; //Aquí le tendremos que mandar el alimento en json, que será el último alimento para la paginación, de tipo AlimentoPrimitive

      const mediciones = await Medicion.getAll.run({
        ultimoDoc: ultimaMedicion,
        perPage: Number(perPage),
        order: order as 'asc' | 'desc',
        orderBy: orderBy as keyof MedicionPrimitive,
        direction: String(direction),
      });

      res.status(200).json(mediciones);
    } catch (error) {
      next(error);
    }
  }
  public async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const medicion = await Medicion.getById.run(String(id));
      res.status(200).json(medicion);
    } catch (error) {
      next(error);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      if (Object.keys(req.body).length === 0) {
        res.status(400).json({ error: 'Faltan datos para actualizar la medicion.' });
        throw new Error(`Favor de proporcionar una medicion.`);
      }
      const medicion = req.body;
      await Medicion.update.run(String(id), medicion);
      res.status(200).json({ message: `La medicion con el id ${id} fue actualizado exitosamente` });
    } catch (error) {
      console.warn('Entró al error');
      next(error);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await Medicion.delete.run(String(id));
      res.status(200).json({ message: `La medicion con el id ${id} fue eliminado exitosamente` });
    } catch (error) {
      next(error);
    }
  }
}
