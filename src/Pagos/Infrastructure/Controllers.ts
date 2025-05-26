import { NextFunction, Request, Response } from 'express';
import { ServiceContainer } from '@/src/Shared/Infrastructure/ServiceContainer';
import { PagoPrimitive } from '../Domain/Interfaces/PagoPrimitive';
import { PagoClientePrimitive } from '@/src/PagosClientes/Domain/Interfaces/PagoClientePrimitive';

const { Pagos: Pago } = ServiceContainer;

export class PagoController {
  public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const body = req.body;
      await Pago.create.run(body);
      const ultimoPago = await Pago.getAll.run({
        page: 1,
        perPage: 1,
        order: 'desc',
        orderBy: 'id',
        checkFilters: false,
        filters: [],
      });
      res.status(201).json({ id: ultimoPago.data[0].id, message: 'Pago creado exitosamente' });
    } catch (error) {
      next(error);
    }
  }

  public async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { filters, page, perPage, order, orderBy, checkFilters } = req.body;

      const pagos = await Pago.getAll.run({
        page: Number(page),
        perPage: Number(perPage),
        order: order as 'asc' | 'desc',
        orderBy: orderBy as keyof (PagoPrimitive | PagoClientePrimitive),
        checkFilters: checkFilters,
        filters: filters,
      });

      res.status(200).json(pagos);
    } catch (error) {
      next(error);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const pago = await Pago.getById.run(Number(id));
      res.status(200).json(pago);
    } catch (error) {
      next(error);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const pago = req.body;
      await Pago.update.run(Number(id), pago);
      res.status(200).json({ message: `El pago con el id ${id} fue actualizado exitosamente` });
    } catch (error) {
      next(error);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await Pago.delete.run(Number(id));
      res.status(200).json({ message: `El pago con el id ${id} fue eliminado exitosamente` });
    } catch (error) {
      next(error);
    }
  }
}
