import { ClientePrimitive } from '../Domain/Interfaces/ClientePrimitive';
import { ServiceContainer } from '@/src/Shared/Infrastructure/ServiceContainer';
import { UsuarioPrimitive } from '@/src/Usuarios/Domain/Interfaces/UsuarioPrimitive';
import { NextFunction, Request, Response } from 'express';

const { Clientes: Cliente } = ServiceContainer;

export class ClienteController {
  public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const body = req.body;
      await Cliente.create.run(body);
      res.status(201).json({ message: 'Cliente creado exitosamente' });
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
        'fecha_inicio',
        'tipo',
        'usuario_id',
      ];

      if (!validOrderByFields.includes(orderBy.toString())) {
        throw new Error(`Invalid orderBy field: ${orderBy}`);
      }

      const cliente = await Cliente.getAll.run({
        page: Number(page),
        perPage: Number(perPage),
        order: order as 'asc' | 'desc',
        orderBy: orderBy as keyof (ClientePrimitive | UsuarioPrimitive),
        eqAtribute: eqAtribute as keyof (ClientePrimitive | UsuarioPrimitive),
        atribute: atribute.toString(),
      });

      res.status(200).json(cliente);
    } catch (error) {
      next(error);
    }
  }
  public async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const cliente = await Cliente.getById.run(Number(id));
      res.status(200).json(cliente);
    } catch (error) {
      next(error);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const cliente = req.body;
      await Cliente.update.run(Number(id), cliente);
      res.status(200).json({ message: `El cliente con el id ${id} fue actualizado exitosamente` });
    } catch (error) {
      next(error);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await Cliente.delete.run(Number(id));
      res.status(200).json({ message: `El cliente con el id ${id} fue eliminado exitosamente` });
    } catch (error) {
      next(error);
    }
  }
}
