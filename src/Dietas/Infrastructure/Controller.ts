import { DietaPrimitive } from '../Domain/Interfaces/DietaPrimitive';
import { ServiceContainer } from '@/src/Shared/Infrastructure/ServiceContainer';
import { NextFunction, Request, Response } from 'express';
import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';

const { Dietas: Dieta } = ServiceContainer;

export class DietaController {
  public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const body = req.body;
      await Dieta.create.run(body);
      res.status(201).json({ message: 'Dieta creada exitosamente' });
    } catch (error) {
      next(error);
    }
  }
  public async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { perPage = 5, order = 'asc', orderBy = 'id', direction = 'next' } = req.query;
      const ultimaDieta = req.body;

      const validKeys: (keyof DietaPrimitive)[] = [
        'id',
        'id_cliente',
        'id_empleado',
        'fecha_creacion',
        'peso_kilogramos',
        'estatura_centimetros',
        'cuello_pulgadas',
        'cintura_pulgadas',
        'cadera_pulgadas',
        'objetivo',
        'factor_actividad',
      ];

      // Validar que orderBy es una clave válida
      if (!validKeys.includes(orderBy as keyof DietaPrimitive)) {
        throw new BadRequest({
          message: 'El campo orderBy no es válido.',
          campo: 'orderBy',
          data: orderBy,
        });
      }

      const dietas = await Dieta.getAll.run({
        ultimoDoc: ultimaDieta,
        perPage: Number(perPage),
        order: order as 'asc' | 'desc',
        orderBy: orderBy as keyof DietaPrimitive, // Ahora está validado
        direction: String(direction),
      });

      res.status(200).json(dietas);
    } catch (error) {
      next(error);
    }
  }
  public async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const dieta = await Dieta.getById.run(String(id));
      res.status(200).json(dieta);
    } catch (error) {
      next(error);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      if (Object.keys(req.body).length === 0) {
        res.status(400).json({ error: 'Faltan datos para actualizar la dieta.' });
        throw new Error(`Favor de proporcionar un alimento.`);
      }
      const dieta = req.body;
      await Dieta.update.run(String(id), dieta);
      res.status(200).json({ message: `La dieta con el id ${id} fue actualizada exitosamente` });
    } catch (error) {
      console.warn('Entró al error');
      next(error);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await Dieta.delete.run(String(id));
      res.status(200).json({ message: `La dieta con el id ${id} fue eliminada exitosamente` });
    } catch (error) {
      next(error);
    }
  }
}
