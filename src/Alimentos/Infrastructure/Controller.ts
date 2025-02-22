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
      const { perPage = 5, order = 'asc', orderBy = 'id', direction = 'next' } = req.query; //Aquí le mandaremos cuantos alimentos queremos por página, en que orden y por cual campo lo vamos a ordenar
      const ultimoAlimento = req.body; //Aquí le tendremos que mandar el alimento en json, que será el último alimento para la paginación, de tipo AlimentoPrimitive

      const alimentos = await Alimento.getAll.run({
        ultimoDoc: ultimoAlimento,
        perPage: Number(perPage),
        order: order as 'asc' | 'desc',
        orderBy: orderBy as keyof AlimentoPrimitive,
        direction: String(direction),
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
      if (Object.keys(req.body).length === 0) {
        res.status(400).json({ error: 'Faltan datos para actualizar el alimento.' });
        throw new Error(`Favor de proporcionar un alimento.`);
      }
      const alimento = req.body;
      await Alimento.update.run(String(id), alimento);
      res.status(200).json({ message: `El alimento con el id ${id} fue actualizado exitosamente` });
    } catch (error) {
      console.warn('Entró al error');
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
