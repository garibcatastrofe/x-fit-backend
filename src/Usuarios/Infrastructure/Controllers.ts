import { NextFunction, Request, Response } from 'express';
import { ServiceContainer } from '@/src/Shared/Infrastructure/ServiceContainer';
import { UsuarioPrimitive } from '../Domain/Interfaces/UsuarioPrimitive';
import jwt from 'jsonwebtoken';
//import cookieParser from "cookie-parser";

const { Usuarios: Usuario } = ServiceContainer;
const SECRET_KEY = 'secreto_super_seguro';

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

  public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { correo, password } = req.body;
      const usuario = await Usuario.login.run(correo, password);

      if (usuario.length === 0) {
        res.status(401).json({ message: 'Correo o contraseña incorrectos' });
        return;
      }

      const idArray = usuario.map(u => u.id);
      const id = idArray[0];

      const accessToken = jwt.sign({ id }, SECRET_KEY, { expiresIn: '7d' });

      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días en ms
      });

      res.status(200).json({ message: 'Inicio de sesión exitoso' });
    } catch (error) {
      next(error);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const usuario = req.body;
      await Usuario.update.run(Number(id), usuario);
      res.status(200).json({ message: `El usuario con el id ${id} fue actualizado exitosamente` });
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

  public async verify(req: Request, res: Response, next: NextFunction): Promise<void> {
    const token = req.cookies.accessToken;

    if (!token) {
      res.status(401).json({ message: 'No autorizado' });
      return;
    }
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      res.status(200).json(decoded);
    } catch (error) {
      res.status(403).json({ message: 'Token inválido' });
      next(error);
    }
  }

  public async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.clearCookie('accessToken', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      });

      res.status(200).json({ message: 'Logout exitoso' });
    } catch (error) {
      res.status(403).json({ message: 'Falló el logout' });
      next(error);
    }
  }
}
