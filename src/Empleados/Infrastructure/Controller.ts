import { EmpleadoPrimitive } from '../Domain/Interfaces/EmpleadoPrimitive';
import { ServiceContainer } from '@/src/Shared/Infrastructure/ServiceContainer';
import { NextFunction, Request, Response } from 'express';
import { UsuarioPrimitive } from '@/src/Usuarios/Domain/Interfaces/UsuarioPrimitive';

const { Empleados: Empleado } = ServiceContainer;

export class EmpleadoController {
  public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const body = req.body;
      await Empleado.create.run(body);
      res.status(201).json({ message: 'Empleado creado exitosamente' });
    } catch (error) {
      next(error);
    }
  }
  public async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const {
        page = 0,
        perPage = 10,
        order = 'asc',
        orderBy = 'id',
        eqAtribute = '',
        atribute = '',
      } = req.query;

      const validOrderByFields = [
        'id',
        'nombres',
        'apellidos',
        'genero',
        'fecha_nacimiento',
        'correo',
        'telefono',
        'estatus',
        'puesto',
        'is_admin',
        'usuario_id',
      ];

      if (!validOrderByFields.includes(orderBy.toString())) {
        throw new Error(`Invalid orderBy field: ${orderBy}`);
      }

      const empleado = await Empleado.getAll.run({
        page: Number(page),
        perPage: Number(perPage),
        order: order as 'asc' | 'desc',
        orderBy: orderBy as keyof (EmpleadoPrimitive | UsuarioPrimitive),
        eqAtribute: eqAtribute as keyof (EmpleadoPrimitive | UsuarioPrimitive),
        atribute: atribute.toString(),
      });

      res.status(200).json(empleado);
    } catch (error) {
      next(error);
    }
  }
  public async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const empleado = await Empleado.getById.run(Number(id));
      res.status(200).json(empleado);
    } catch (error) {
      next(error);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const empleado = req.body;
      await Empleado.update.run(Number(id), empleado);
      res.status(200).json({ message: `El empleado con el id ${id} fue actualizado exitosamente` });
    } catch (error) {
      next(error);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await Empleado.delete.run(Number(id));
      res.status(200).json({ message: `El empleado con el id ${id} fue eliminado exitosamente` });
    } catch (error) {
      next(error);
    }
  }
}
