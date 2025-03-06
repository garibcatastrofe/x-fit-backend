import { ReportePrimitive } from '../Domain/Interfaces/ReportePrimitive';
import { ServiceContainer } from '@/src/Shared/Infrastructure/ServiceContainer';
import { NextFunction, Request, Response } from 'express';
import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';

const { Reportes: Reporte } = ServiceContainer;

export class ReporteController {
  public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const body = req.body;
      await Reporte.create.run(body);
      res.status(201).json({ message: 'Reporte creado exitosamente' });
    } catch (error) {
      next(error);
    }
  }
  public async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { perPage = 5, order = 'asc', orderBy = 'id', direction = 'next' } = req.query;
      const ultimaDieta = req.body;

      const validKeys: (keyof ReportePrimitive)[] = [
        'id',
        'id_cliente',
        'id_rutina',
        'bloque',
        'sesion',
        'fecha',
      ];

      // Validar que orderBy es una clave válida
      if (!validKeys.includes(orderBy as keyof ReportePrimitive)) {
        throw new BadRequest({
          message: 'El campo orderBy no es válido.',
          campo: 'orderBy',
          data: orderBy,
        });
      }

      const reportes = await Reporte.getAll.run({
        ultimoDoc: ultimaDieta,
        perPage: Number(perPage),
        order: order as 'asc' | 'desc',
        orderBy: orderBy as keyof ReportePrimitive, // Ahora está validado
        direction: String(direction),
      });

      res.status(200).json(reportes);
    } catch (error) {
      next(error);
    }
  }
  public async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const reporte = await Reporte.getById.run(String(id));
      res.status(200).json(reporte);
    } catch (error) {
      next(error);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      if (Object.keys(req.body).length === 0) {
        res.status(400).json({ error: 'Faltan datos para actualizar el reporte.' });
        throw new Error(`Favor de proporcionar un reporte.`);
      }
      const reporte = req.body;
      await Reporte.update.run(String(id), reporte);
      res.status(200).json({ message: `El reporte con el id ${id} fue actualizada exitosamente` });
    } catch (error) {
      console.warn('Entró al error');
      next(error);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await Reporte.delete.run(String(id));
      res.status(200).json({ message: `El reporte con el id ${id} fue eliminado exitosamente` });
    } catch (error) {
      next(error);
    }
  }
}
