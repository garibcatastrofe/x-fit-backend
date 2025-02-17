import { NextFunction, Request, Response } from 'express';
import { ServiceContainer } from '@/src/Shared/Infrastructure/ServiceContainer';
import { UsuarioPrimitive } from '../Domain/Interfaces/UsuarioPrimitive';

const { Usuarios: Usuario } = ServiceContainer;

export class UsuarioController {
  public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const body = req.body;
      await Usuario.create.run(body);
      res.status(201).json({ message: 'Usuario creado exitosamente' });
    } catch (error) {
      next(error);
    }
  }

  public async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { page = 1, perPage = 10, order = 'asc', orderBy = 'id' } = req.query;
      const usuarios = await Usuario.getAll.run({
        page: Number(page),
        perPage: Number(perPage),
        order: order as 'asc' | 'desc',
        orderBy: orderBy as keyof UsuarioPrimitive,
      });

      res.status(200).json(usuarios);
    } catch (error) {
      next(error);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const usuario = await Usuario.getById.run(Number(id));
      res.status(200).json(usuario);
    } catch (error) {
      next(error);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const usuario = req.body;
      await Usuario.update.run(Number(id), usuario);
      res
        .status(200)
        .json({ message: `El usuario con el id ${id} fue actualizado exitosamente` });
    } catch (error) {
      next(error);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await Usuario.delete.run(Number(id));
      res.status(200).json({ message: `El usuario con el id ${id} fue eliminado exitosamente` });
    } catch (error) {
      next(error);
    }
  }
}
