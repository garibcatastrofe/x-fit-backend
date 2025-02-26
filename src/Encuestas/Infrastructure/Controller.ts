import { EncuestaPrimitive } from '../Domain/Interfaces/EncuestaPrimitive';
import { ServiceContainer } from '@/src/Shared/Infrastructure/ServiceContainer';
import { NextFunction, Request, Response } from 'express';
import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';

const { Encuestas: Encuesta } = ServiceContainer;

export class EncuestaController {
  public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const body = req.body;
      await Encuesta.create.run(body);
      res.status(201).json({ message: 'Encuesta creada exitosamente' });
    } catch (error) {
      next(error);
    }
  }
  public async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { perPage = 5, order = 'asc', orderBy = 'id', direction = 'next' } = req.query;
      const ultimaEncuesta = req.body;

      const validKeys: (keyof EncuestaPrimitive)[] = ['id', 'id_empleado', 'fecha'];

      // Validar que orderBy es una clave válida
      if (!validKeys.includes(orderBy as keyof EncuestaPrimitive)) {
        throw new BadRequest({
          message: 'El campo orderBy no es válido.',
          campo: 'orderBy',
          data: orderBy,
        });
      }

      const encuestas = await Encuesta.getAll.run({
        ultimoDoc: ultimaEncuesta,
        perPage: Number(perPage),
        order: order as 'asc' | 'desc',
        orderBy: orderBy as keyof EncuestaPrimitive, // Ahora está validado
        direction: String(direction),
      });

      res.status(200).json(encuestas);
    } catch (error) {
      next(error);
    }
  }
  public async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const encuesta = await Encuesta.getById.run(String(id));
      res.status(200).json(encuesta);
    } catch (error) {
      next(error);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      if (Object.keys(req.body).length === 0) {
        res.status(400).json({ error: 'Faltan datos para actualizar la encuesta.' });
        throw new Error(`Favor de proporcionar un alimento.`);
      }
      const dieta = req.body;
      await Encuesta.update.run(String(id), dieta);
      res.status(200).json({ message: `La encuesta con el id ${id} fue actualizada exitosamente` });
    } catch (error) {
      console.warn('Entró al error');
      next(error);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await Encuesta.delete.run(String(id));
      res.status(200).json({ message: `La encuesta con el id ${id} fue eliminada exitosamente` });
    } catch (error) {
      next(error);
    }
  }
}
