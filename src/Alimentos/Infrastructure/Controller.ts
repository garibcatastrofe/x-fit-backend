import { AlimentoPrimitive } from '../Domain/Interfaces/AlimentoPrimitive';
import { ServiceContainer } from '@/src/Shared/Infrastructure/ServiceContainer';
import { NextFunction, Request, Response } from 'express';

const { Alimentos: Alimento } = ServiceContainer;

export class AlimentoController {
  public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const body = req.body;
      await Alimento.create.run(body);
      res.status(201).json({ message: 'Alimento creado exitosamente' });
    } catch (error) {
      next(error);
    }
  }
  public async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { page = 0, perPage = 10, order = 'asc', orderBy = 'id' } = req.query;
      const alimentos = await Alimento.getAll.run({
        page: Number(page),
        perPage: Number(perPage),
        order: order as 'asc' | 'desc',
        orderBy: orderBy as keyof AlimentoPrimitive,
      });

      res.status(200).json(alimentos);
    } catch (error) {
      next(error);
    }
  }
  public async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const alimento = await Alimento.getById.run(String(id));
      res.status(200).json(alimento);
    } catch (error) {
      next(error);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const empleado = req.body;
      await Alimento.update.run(String(id), empleado);
      res.status(200).json({ message: `El alimento con el id ${id} fue actualizado exitosamente` });
    } catch (error) {
      next(error);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await Alimento.delete.run(String(id));
      res.status(200).json({ message: `El alimento con el id ${id} fue eliminado exitosamente` });
    } catch (error) {
      next(error);
    }
  }
}
