import { NextFunction, Request, Response } from 'express';
import { ServiceContainer } from '@/src/Shared/Infrastructure/ServiceContainer';
import { MembresiaPrimitive } from '../Domain/Interfaces/MembresiaPrimitive';

const { Membresias: Membresia } = ServiceContainer;

export class MembresiaController {
  public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const body = req.body;
      await Membresia.create.run(body);
      res.status(201).json({ message: 'Membresia creada exitosamente' });
    } catch (error) {
      next(error);
    }
  }

  public async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { page = 1, perPage = 10, order = 'asc', orderBy = 'id' } = req.query;
      const pagos = await Membresia.getAll.run({
        page: Number(page),
        perPage: Number(perPage),
        order: order as 'asc' | 'desc',
        orderBy: orderBy as keyof MembresiaPrimitive,
      });

      res.status(200).json(pagos);
    } catch (error) {
      next(error);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const pago = await Membresia.getById.run(Number(id));
      res.status(200).json(pago);
    } catch (error) {
      next(error);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const membresia = req.body;
      await Membresia.update.run(Number(id), membresia);
      res
        .status(200)
        .json({ message: `La membresia con el id ${id} fue actualizada exitosamente` });
    } catch (error) {
      next(error);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await Membresia.delete.run(Number(id));
      res.status(200).json({ message: `La membresia con el id ${id} fue eliminada exitosamente` });
    } catch (error) {
      next(error);
    }
  }
}
