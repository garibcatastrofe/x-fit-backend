import { RuffierPrimitive } from '../Domain/Interfaces/RuffierPrimitive';
import { ServiceContainer } from '@/src/Shared/Infrastructure/ServiceContainer';
import { NextFunction, Request, Response } from 'express';

const { Ruffiers: Ruffier } = ServiceContainer;

export class RuffierController {
  public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const body = req.body;
      await Ruffier.create.run(body);
      res.status(201).json({ message: 'Ruffier creado exitosamente' });
    } catch (error) {
      next(error);
    }
  }
  public async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { perPage = 5, order = 'asc', orderBy = 'id', direction = 'next' } = req.query; //Aquí le mandaremos cuantos alimentos queremos por página, en que orden y por cual campo lo vamos a ordenar
      const ultimoRuffier = req.body; //Aquí le tendremos que mandar el alimento en json, que será el último alimento para la paginación, de tipo AlimentoPrimitive

      const ruffiers = await Ruffier.getAll.run({
        ultimoDoc: ultimoRuffier,
        perPage: Number(perPage),
        order: order as 'asc' | 'desc',
        orderBy: orderBy as keyof RuffierPrimitive,
        direction: String(direction),
      });

      res.status(200).json(ruffiers);
    } catch (error) {
      next(error);
    }
  }
  public async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const ruffier = await Ruffier.getById.run(String(id));
      res.status(200).json(ruffier);
    } catch (error) {
      next(error);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      if (Object.keys(req.body).length === 0) {
        res.status(400).json({ error: 'Faltan datos para actualizar el ruffier.' });
        throw new Error(`Favor de proporcionar un ruffier.`);
      }
      const ruffier = req.body;
      await Ruffier.update.run(String(id), ruffier);
      res.status(200).json({ message: `El ruffier con el id ${id} fue actualizado exitosamente` });
    } catch (error) {
      console.warn('Entró al error');
      next(error);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await Ruffier.delete.run(String(id));
      res.status(200).json({ message: `El ruffier con el id ${id} fue eliminado exitosamente` });
    } catch (error) {
      next(error);
    }
  }
}
