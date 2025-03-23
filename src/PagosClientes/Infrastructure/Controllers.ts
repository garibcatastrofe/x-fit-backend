import { NextFunction, Request, Response } from 'express';
import { ServiceContainer } from '@/src/Shared/Infrastructure/ServiceContainer';
import { PagoClientePrimitive } from '../Domain/Interfaces/PagoClientePrimitive';

const { PagosClientes: PagoCliente } = ServiceContainer;

export class PagoClienteController {
  public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const body = req.body;
      await PagoCliente.create.run(body);
      res.status(201).json({ message: 'Pago-cliente creado exitosamente' });
    } catch (error) {
      next(error);
    }
  }

  public async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const {
        page = 0,
        perPage = 10,
        order = 'desc',
        orderBy = 'id',
        eqAtribute = '',
        atribute = '',
      } = req.query;

      const validOrderByFields = ['id', 'cliente_id', 'pago_id'];

      if (!validOrderByFields.includes(orderBy.toString())) {
        throw new Error(`Invalid orderBy field: ${orderBy}`);
      }

      const pagos = await PagoCliente.getAll.run({
        page: Number(page),
        perPage: Number(perPage),
        order: order as 'asc' | 'desc',
        orderBy: orderBy as keyof PagoClientePrimitive,
        eqAtribute: eqAtribute as keyof PagoClientePrimitive,
        atribute: atribute.toString(),
      });

      res.status(200).json(pagos);
    } catch (error) {
      next(error);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const pago = await PagoCliente.getById.run(Number(id));
      res.status(200).json(pago);
    } catch (error) {
      next(error);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const pago = req.body;
      await PagoCliente.update.run(Number(id), pago);
      res
        .status(200)
        .json({ message: `El pago-cliente con el id ${id} fue actualizado exitosamente` });
    } catch (error) {
      next(error);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await PagoCliente.delete.run(Number(id));
      res
        .status(200)
        .json({ message: `El pago-cliente con el id ${id} fue eliminado exitosamente` });
    } catch (error) {
      next(error);
    }
  }
}
