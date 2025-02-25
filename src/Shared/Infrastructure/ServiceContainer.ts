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

// ALIMENTOS
import { CreateAlimento } from '@/src/Alimentos/Application/Create';
import { DeleteAlimento } from '@/src/Alimentos/Application/Delete';
import { GetAllAlimentos } from '@/src/Alimentos/Application/GetAll';
import { GetAlimentoById } from '@/src/Alimentos/Application/GetById';
import { UpdateAlimento } from '@/src/Alimentos/Application/Update';
import { AlimentoFirebaseRepository } from '@/src/Alimentos/Infrastructure/FirebaseRepository';

// ALIMENTOS
import { CreateEjercicio } from '@/src/Ejercicios/Application/Create';
import { DeleteEjercicio } from '@/src/Ejercicios/Application/Delete';
import { GetAllEjercicios } from '@/src/Ejercicios/Application/GetAll';
import { GetEjercicioById } from '@/src/Ejercicios/Application/GetById';
import { UpdateEjercicio } from '@/src/Ejercicios/Application/Update';
import { EjercicioFirebaseRepository } from '@/src/Ejercicios/Infrastructure/FirebaseRepository';

// DIETAS
import { CreateDieta } from '@/src/Dietas/Application/Create';
import { DeleteDieta } from '@/src/Dietas/Application/Delete';
import { GetAllDietas } from '@/src/Dietas/Application/GetAll';
import { GetDietaById } from '@/src/Dietas/Application/GetById';
import { UpdateDieta } from '@/src/Dietas/Application/Update';
import { DietaFirebaseRepository } from '@/src/Dietas/Infrastructure/FirebaseRepository';

// RUTINAS
import { CreateRutina } from '@/src/Rutinas/Application/Create';
import { DeleteRutina } from '@/src/Rutinas/Application/Delete';
import { GetAllRutinas } from '@/src/Rutinas/Application/GetAll';
import { GetRutinaById } from '@/src/Rutinas/Application/GetById';
import { UpdateRutina } from '@/src/Rutinas/Application/Update';
import { RutinaFirebaseRepository } from '@/src/Rutinas/Infrastructure/FirebaseRepository';

const UsuarioRepository = new UsuarioMySQLRepository();
const PagoRepository = new PagoMySQLRepository();
const MembresiaRepository = new MembresiaMySQLRepository();
const PromocionRepository = new PromocionMySQLRepository();
const EmpleadoRepository = new EmpleadoMySQLRepository();
const PonchadaRepository = new PonchadaMySQLRepository();
const ClienteRepository = new ClienteMySQLRepository();
const AlimentoRepository = new AlimentoFirebaseRepository();
const EjercicioRepository = new EjercicioFirebaseRepository();
const DietaRepository = new DietaFirebaseRepository();
const RutinaRepository = new RutinaFirebaseRepository();

export const ServiceContainer = {
  Usuarios: {
    create: new CreateUsuario(UsuarioRepository),
    getAll: new GetAllUsuarios(UsuarioRepository),
    getById: new GetUsuarioById(UsuarioRepository),
    update: new UpdateUsuario(UsuarioRepository),
    delete: new DeleteUsuario(UsuarioRepository),
  },
  Pagos: {
    create: new CreatePago(
      PagoRepository,
      MembresiaRepository,
      ClienteRepository,
      PromocionRepository,
    ),
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
  Alimentos: {
    create: new CreateAlimento(AlimentoRepository),
    getAll: new GetAllAlimentos(AlimentoRepository),
    getById: new GetAlimentoById(AlimentoRepository),
    update: new UpdateAlimento(AlimentoRepository),
    delete: new DeleteAlimento(AlimentoRepository),
  },
  Ejercicios: {
    create: new CreateEjercicio(EjercicioRepository),
    getAll: new GetAllEjercicios(EjercicioRepository),
    getById: new GetEjercicioById(EjercicioRepository),
    update: new UpdateEjercicio(EjercicioRepository),
    delete: new DeleteEjercicio(EjercicioRepository),
  },
  Dietas: {
    create: new CreateDieta(DietaRepository),
    getAll: new GetAllDietas(DietaRepository),
    getById: new GetDietaById(DietaRepository),
    update: new UpdateDieta(DietaRepository),
    delete: new DeleteDieta(DietaRepository),
  },
  Rutinas: {
    create: new CreateRutina(RutinaRepository),
    getAll: new GetAllRutinas(RutinaRepository),
    getById: new GetRutinaById(RutinaRepository),
    update: new UpdateRutina(RutinaRepository),
    delete: new DeleteRutina(RutinaRepository),
  },
};
