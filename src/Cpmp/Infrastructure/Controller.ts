import { CpmpPrimitive } from '../Domain/Interfaces/CpmpPrimitive';
import { ServiceContainer } from '@/src/Shared/Infrastructure/ServiceContainer';
import { NextFunction, Request, Response } from 'express';

const { Cpmps: Cpmp } = ServiceContainer;

export class CpmpController {
  public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const body = req.body;
      await Cpmp.create.run(body);
      res.status(201).json({ message: 'Cpmp creado exitosamente' });
    } catch (error) {
      next(error);
    }
  }
  public async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { page = 0, perPage = 10, order = 'asc', orderBy = 'id' } = req.query;
      const cpmp = await Cpmp.getAll.run({
        page: Number(page),
        perPage: Number(perPage),
        order: order as 'asc' | 'desc',
        orderBy: orderBy as keyof CpmpPrimitive,
      });

      res.status(200).json(cpmp);
    } catch (error) {
      next(error);
    }
  }
  public async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const cpmp = await Cpmp.getById.run(Number(id));
      res.status(200).json(cpmp);
    } catch (error) {
      next(error);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const cpmp = req.body;
      await Cpmp.update.run(Number(id), cpmp);
      res.status(200).json({ message: `El cpmp con el id ${id} fue actualizado exitosamente` });
    } catch (error) {
      next(error);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await Cpmp.delete.run(Number(id));
      res.status(200).json({ message: `El cpmp con el id ${id} fue eliminado exitosamente` });
    } catch (error) {
      next(error);
    }
  }
}
