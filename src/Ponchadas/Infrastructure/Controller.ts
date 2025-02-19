import { PonchadaPrimitive } from '../Domain/Interfaces/PonchadaPrimitive';
import { ServiceContainer } from '@/src/Shared/Infrastructure/ServiceContainer';
import { NextFunction, Request, Response } from 'express';

const { Ponchadas: Ponchada } = ServiceContainer;

export class PonchadaController {
  public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const body = req.body;
      await Ponchada.create.run(body);
      res.status(201).json({ message: 'Ponchada creada exitosamente' });
    } catch (error) {
      next(error);
    }
  }
  public async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { page = 0, perPage = 10, order = 'asc', orderBy = 'id' } = req.query;
      const ponchada = await Ponchada.getAll.run({
        page: Number(page),
        perPage: Number(perPage),
        order: order as 'asc' | 'desc',
        orderBy: orderBy as keyof PonchadaPrimitive,
      });

      res.status(200).json(ponchada);
    } catch (error) {
      next(error);
    }
  }
  public async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const ponchada = await Ponchada.getById.run(Number(id));
      res.status(200).json(ponchada);
    } catch (error) {
      next(error);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const ponchada = req.body;
      await Ponchada.update.run(Number(id), ponchada);
      res.status(200).json({ message: `La ponchada con el id ${id} fue actualizada exitosamente` });
    } catch (error) {
      next(error);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await Ponchada.delete.run(Number(id));
      res.status(200).json({ message: `La ponchada con el id ${id} fue eliminada exitosamente` });
    } catch (error) {
      next(error);
    }
  }
}
