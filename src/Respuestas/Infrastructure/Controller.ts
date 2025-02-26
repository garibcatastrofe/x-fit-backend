import { RespuestaPrimitive } from '../Domain/Interfaces/RespuestaPrimitive';
import { ServiceContainer } from '@/src/Shared/Infrastructure/ServiceContainer';
import { NextFunction, Request, Response } from 'express';
import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';

const { Respuestas: Respuesta } = ServiceContainer;

export class RespuestaController {
  public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const body = req.body;
      await Respuesta.create.run(body);
      res.status(201).json({ message: 'Respuesta creada exitosamente' });
    } catch (error) {
      next(error);
    }
  }
  public async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { perPage = 5, order = 'asc', orderBy = 'id', direction = 'next' } = req.query;
      const ultimaRespuesta = req.body;

      const validKeys: (keyof RespuestaPrimitive)[] = ['id', 'id_usuario', 'id_encuesta', 'fecha'];

      // Validar que orderBy es una clave válida
      if (!validKeys.includes(orderBy as keyof RespuestaPrimitive)) {
        throw new BadRequest({
          message: 'El campo orderBy no es válido.',
          campo: 'orderBy',
          data: orderBy,
        });
      }

      const respuestas = await Respuesta.getAll.run({
        ultimoDoc: ultimaRespuesta,
        perPage: Number(perPage),
        order: order as 'asc' | 'desc',
        orderBy: orderBy as keyof RespuestaPrimitive, // Ahora está validado
        direction: String(direction),
      });

      res.status(200).json(respuestas);
    } catch (error) {
      next(error);
    }
  }
  public async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const respuesta = await Respuesta.getById.run(String(id));
      res.status(200).json(respuesta);
    } catch (error) {
      next(error);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      if (Object.keys(req.body).length === 0) {
        res.status(400).json({ error: 'Faltan datos para actualizar la respuesta.' });
        throw new Error(`Favor de proporcionar una respuesta.`);
      }
      const dieta = req.body;
      await Respuesta.update.run(String(id), dieta);
      res
        .status(200)
        .json({ message: `La respuesta con el id ${id} fue actualizada exitosamente` });
    } catch (error) {
      console.warn('Entró al error');
      next(error);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await Respuesta.delete.run(String(id));
      res.status(200).json({ message: `La respuesta con el id ${id} fue eliminada exitosamente` });
    } catch (error) {
      next(error);
    }
  }
}
