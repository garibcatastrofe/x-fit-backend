// USUARIOS
import { CreateUsuario } from '@/src/Usuarios/Application/Create';
import { DeleteUsuario } from '@/src/Usuarios/Application/Delete';
import { GetAllUsuarios } from '@/src/Usuarios/Application/GetAll';
import { GetUsuarioById } from '@/src/Usuarios/Application/GetById';
import { UpdateUsuario } from '@/src/Usuarios/Application/Update';
import { UsuarioMySQLRepository } from '@/src/Usuarios/Infrastructure/DrizzleMySQLRepositoty';

// PAGOS
import { CreatePago } from '@/src/Pagos/Application/Create';
import { DeletePago } from '@/src/Pagos/Application/Delete';
import { GetAllPagos } from '@/src/Pagos/Application/GetAll';
import { GetPagoById } from '@/src/Pagos/Application/GetById';
import { UpdatePago } from '@/src/Pagos/Application/Update';
import { PagoMySQLRepository } from '@/src/Pagos/Infrastructure/DrizzleMySQLRepository';

// MEMBRESIAS
import { CreateMembresia } from '@/src/Membresias/Application/Create';
import { DeleteMembresia } from '@/src/Membresias/Application/Delete';
import { GetAllMembresias } from '@/src/Membresias/Application/GetAll';
import { GetMembresiaById } from '@/src/Membresias/Application/GetById';
import { UpdateMembresia } from '@/src/Membresias/Application/Update';
import { MembresiaMySQLRepository } from '@/src/Membresias/Infrastructure/DrizzleMySQLRepository';

// PROMOCIONES
import { CreatePromocion } from '@/src/Promociones/Application/Create';
import { DeletePromocion } from '@/src/Promociones/Application/Delete';
import { GetAllPromociones } from '@/src/Promociones/Application/GetAll';
import { GetPromocionById } from '@/src/Promociones/Application/GetById';
import { UpdatePromocion } from '@/src/Promociones/Application/Update';
import { PromocionMySQLRepository } from '@/src/Promociones/Infrastructure/DrizzleMySQLRepositoty';

// EMPLEADOS
import { CreateEmpleado } from '@/src/Empleados/Application/Create';
import { DeleteEmpleado } from '@/src/Empleados/Application/Delete';
import { GetAllEmpleado } from '@/src/Empleados/Application/GetAll';
import { GetEmpleadoById } from '@/src/Empleados/Application/GetById';
import { UpdateEmpleado } from '@/src/Empleados/Application/Update';
import { EmpleadoMySQLRepository } from '@/src/Empleados/Infrastructure/DrizzleMySQLRepository';

// PONCHADAS
import { CreatePonchada } from '@/src/Ponchadas/Application/Create';
import { DeletePonchada } from '@/src/Ponchadas/Application/Delete';
import { GetAllPonchadas } from '@/src/Ponchadas/Application/GetAll';
import { GetPonchadaById } from '@/src/Ponchadas/Application/GetById';
import { UpdatePonchada } from '@/src/Ponchadas/Application/Update';
import { PonchadaMySQLRepository } from '@/src/Ponchadas/Infrastructure/DrizzleMySQLRepository';

// CLIENTES
import { CreateCliente } from '@/src/Clientes/Application/Create';
import { DeleteCliente } from '@/src/Clientes/Application/Delete';
import { GetAllCliente } from '@/src/Clientes/Application/GetAll';
import { GetClienteById } from '@/src/Clientes/Application/GetById';
import { UpdateCliente } from '@/src/Clientes/Application/Update';
import { ClienteMySQLRepository } from '@/src/Clientes/Infrastructure/DrizzleMySQLRepository';

const UsuarioRepository = new UsuarioMySQLRepository();
const PagoRepository = new PagoMySQLRepository();
const MembresiaRepository = new MembresiaMySQLRepository();
const PromocionRepository = new PromocionMySQLRepository();
const EmpleadoRepository = new EmpleadoMySQLRepository();
const PonchadaRepository = new PonchadaMySQLRepository();
const ClienteRepository = new ClienteMySQLRepository();

export const ServiceContainer = {
  Usuarios: {
    create: new CreateUsuario(UsuarioRepository),
    getAll: new GetAllUsuarios(UsuarioRepository),
    getById: new GetUsuarioById(UsuarioRepository),
    update: new UpdateUsuario(UsuarioRepository),
    delete: new DeleteUsuario(UsuarioRepository),
  },
  Pagos: {
    create: new CreatePago(PagoRepository),
    getAll: new GetAllPagos(PagoRepository),
    getById: new GetPagoById(PagoRepository),
    update: new UpdatePago(PagoRepository),
    delete: new DeletePago(PagoRepository),
  },
  Membresias: {
    create: new CreateMembresia(MembresiaRepository),
    getAll: new GetAllMembresias(MembresiaRepository),
    getById: new GetMembresiaById(MembresiaRepository),
    update: new UpdateMembresia(MembresiaRepository),
    delete: new DeleteMembresia(MembresiaRepository),
  },
  Promociones: {
    create: new CreatePromocion(PromocionRepository),
    getAll: new GetAllPromociones(PromocionRepository),
    getById: new GetPromocionById(PromocionRepository),
    update: new UpdatePromocion(PromocionRepository),
    delete: new DeletePromocion(PromocionRepository),
  },
  Empleados: {
    create: new CreateEmpleado(EmpleadoRepository, UsuarioRepository),
    getAll: new GetAllEmpleado(EmpleadoRepository),
    getById: new GetEmpleadoById(EmpleadoRepository),
    update: new UpdateEmpleado(EmpleadoRepository, UsuarioRepository),
    delete: new DeleteEmpleado(EmpleadoRepository),
  },
  Ponchadas: {
    create: new CreatePonchada(PonchadaRepository, UsuarioRepository),
    getAll: new GetAllPonchadas(PonchadaRepository),
    getById: new GetPonchadaById(PonchadaRepository),
    update: new UpdatePonchada(PonchadaRepository, UsuarioRepository),
    delete: new DeletePonchada(PonchadaRepository),
  },
  Clientes: {
    create: new CreateCliente(ClienteRepository, UsuarioRepository),
    getAll: new GetAllCliente(ClienteRepository),
    getById: new GetClienteById(ClienteRepository),
    update: new UpdateCliente(ClienteRepository, UsuarioRepository),
    delete: new DeleteCliente(ClienteRepository),
  },
};
