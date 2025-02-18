import { NextFunction, Request, Response } from 'express';
import { ServiceContainer } from '@/src/Shared/Infrastructure/ServiceContainer';
import { PromocionPrimitive } from '../Domain/Interfaces/PromocionPrimitive';

const { Promociones: Promocion } = ServiceContainer;

export class PromocionController {
  public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const body = req.body;
      await Promocion.create.run(body);
      res.status(201).json({ message: 'Promoción creada exitosamente' });
    } catch (error) {
      next(error);
    }
  }

  public async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { page = 1, perPage = 10, order = 'asc', orderBy = 'id' } = req.query;
      const promociones = await Promocion.getAll.run({
        page: Number(page),
        perPage: Number(perPage),
        order: order as 'asc' | 'desc',
        orderBy: orderBy as keyof PromocionPrimitive,
      });

      res.status(200).json(promociones);
    } catch (error) {
      next(error);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const promocion = await Promocion.getById.run(Number(id));
      res.status(200).json(promocion);
    } catch (error) {
      next(error);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const promocion = req.body;
      await Promocion.update.run(Number(id), promocion);
      res
        .status(200)
        .json({ message: `La promoción con el id ${id} fue actualizado exitosamente` });
    } catch (error) {
      next(error);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await Promocion.delete.run(Number(id));
      res.status(200).json({ message: `La promoción con el id ${id} fue eliminada exitosamente` });
    } catch (error) {
      next(error);
    }
  }
}
