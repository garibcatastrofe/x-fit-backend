import { RutinaPrimitive } from '../Domain/Interfaces/RutinaPrimitive';
import { ServiceContainer } from '@/src/Shared/Infrastructure/ServiceContainer';
import { NextFunction, Request, Response } from 'express';
import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';

const { Rutinas: Rutina } = ServiceContainer;

export class RutinaController {
  public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const body = req.body;
      await Rutina.create.run(body);
      res.status(201).json({ message: 'Rutina creada exitosamente' });
    } catch (error) {
      next(error);
    }
  }
  public async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { perPage = 5, order = 'asc', orderBy = 'id', direction = 'next' } = req.query;
      const ultimaRutina = req.body;

      const validKeys: (keyof RutinaPrimitive)[] = [
        'id',
        'id_cliente',
        'id_empleado',
        'fecha_creacion',
        'objetivo',
        'visible',
      ];

      // Validar que orderBy es una clave válida
      if (!validKeys.includes(orderBy as keyof RutinaPrimitive)) {
        throw new BadRequest({
          message: 'El campo orderBy no es válido.',
          campo: 'orderBy',
          data: orderBy,
        });
      }

      const rutinas = await Rutina.getAll.run({
        ultimoDoc: ultimaRutina,
        perPage: Number(perPage),
        order: order as 'asc' | 'desc',
        orderBy: orderBy as keyof RutinaPrimitive, // Ahora está validado
        direction: String(direction),
      });

      res.status(200).json(rutinas);
    } catch (error) {
      next(error);
    }
  }
  public async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const rutina = await Rutina.getById.run(String(id));
      res.status(200).json(rutina);
    } catch (error) {
      next(error);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      if (Object.keys(req.body).length === 0) {
        res.status(400).json({ error: 'Faltan datos para actualizar la rutina.' });
        throw new Error(`Favor de proporcionar un ejercicio.`);
      }
      const rutina = req.body;
      await Rutina.update.run(String(id), rutina);
      res.status(200).json({ message: `La rutina con el id ${id} fue actualizada exitosamente` });
    } catch (error) {
      console.warn('Entró al error');
      next(error);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await Rutina.delete.run(String(id));
      res.status(200).json({ message: `La rutina con el id ${id} fue eliminada exitosamente` });
    } catch (error) {
      next(error);
    }
  }
}
