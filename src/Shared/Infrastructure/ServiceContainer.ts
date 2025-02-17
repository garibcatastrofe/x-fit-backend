/* 

// DESCANSOS
import { CreateDescanso } from '@/src/Descanso/Application/Create';
import { DeleteDescanso } from '@/src/Descanso/Application/Delete';
import { GetAllDescansos } from '@/src/Descanso/Application/GetAll';
import { GetDescansoById } from '@/src/Descanso/Application/GetById';
import { UpdateDescanso } from '@/src/Descanso/Application/Update';
import { DrizzleMySQlDescansoRepository } from '@/src/Descanso/Infrastructure/DrizzleMySQLRepository';
const DescansoRepository = new DrizzleMySQlDescansoRepository();

// EMPLEADOS
import { CreateEmpleado } from '@/src/Empleados/Application/Create/Index';
import { DeleteEmpleado } from '@/src/Empleados/Application/Delete';
import { GetAllEmpleados } from '@/src/Empleados/Application/GetAll';
import { GetEmpleadoById } from '@/src/Empleados/Application/GetById/Index';
import { UpdateEmpleado } from '@/src/Empleados/Application/Update/Index';
import { EmpleadoMySQLRepository } from '@/src/Empleados/Infrastructure/DrizzleMySQLRepositoty';

const EmpleadoRepository = new EmpleadoMySQLRepository();

// Parentescos
import { DrizzleParentescoRepository } from '@/src/Parentesco/Infrastructure/DrizzleMySQLRepository';
import { CreateParentesco } from '@/src/Parentesco/Application/Create/Index';
import { GetAllParentesco } from '@/src/Parentesco/Application/GetAll/Index';
import { GetParentescoById } from '@/src/Parentesco/Application/GetById/Index';
import { UpdateParentesco } from '@/src/Parentesco/Application/Update/Index';
import { DeleteParentesco } from '@/src/Parentesco/Application/Delete/Index';
const ParentescoRepository = new DrizzleParentescoRepository();

// Beneficiarios
import { CreateBeneficiario } from '@/src/Beneficiarios/Application/Create';
import { GetAllBeneficiarios } from '@/src/Beneficiarios/Application/GetAll';
import { GetBeneficiarioById } from '@/src/Beneficiarios/Application/GetById';
import { UpdateBeneficiario } from '@/src/Beneficiarios/Application/Update';
import { DeleteBeneficiario } from '@/src/Beneficiarios/Application/Delete';
import { BeneficiarioSQLRepository } from '@/src/Beneficiarios/Infrastructure/DrizzleMySQLRepository';
const BeneficiarioRepository = new BeneficiarioSQLRepository(); */

// USUARIOS
import { CreateUsuario } from '@/src/Usuarios/Application/Create';
import { DeleteUsuario } from '@/src/Usuarios/Application/Delete';
import { GetAllUsuarios } from '@/src/Usuarios/Application/GetAll';
import { GetUsuarioById } from '@/src/Usuarios/Application/GetById';
import { UpdateUsuario } from '@/src/Usuarios/Application/Update';
import { UsuarioMySQLRepository } from '@/src/Usuarios/Infrastructure/DrizzleMySQLRepositoty';
const UsuarioRepository = new UsuarioMySQLRepository();

export const ServiceContainer = {
  Usuarios: {
    create: new CreateUsuario(UsuarioRepository),
    getAll: new GetAllUsuarios(UsuarioRepository),
    getById: new GetUsuarioById(UsuarioRepository),
    update: new UpdateUsuario(UsuarioRepository),
    delete: new DeleteUsuario(UsuarioRepository),
  },
  /* 
  Descansos: {
    create: new CreateDescanso(DescansoRepository),
    getAll: new GetAllDescansos(DescansoRepository),
    getById: new GetDescansoById(DescansoRepository),
    update: new UpdateDescanso(DescansoRepository),
    delete: new DeleteDescanso(DescansoRepository),
  },
  Empleado: {
    create: new CreateEmpleado(EmpleadoRepository),
    getAll: new GetAllEmpleados(EmpleadoRepository),
    getById: new GetEmpleadoById(EmpleadoRepository),
    update: new UpdateEmpleado(EmpleadoRepository),
    delete: new DeleteEmpleado(EmpleadoRepository),
  },
  Parentesco: {
    create: new CreateParentesco(ParentescoRepository),
    getAll: new GetAllParentesco(ParentescoRepository),
    getById: new GetParentescoById(ParentescoRepository),
    update: new UpdateParentesco(ParentescoRepository),
    delete: new DeleteParentesco(ParentescoRepository),
  },
  Beneficiarios: {
    create: new CreateBeneficiario(BeneficiarioRepository, EmpleadoRepository, ParentescoRepository),
    getAll: new GetAllBeneficiarios(BeneficiarioRepository),
    getById: new GetBeneficiarioById(BeneficiarioRepository),
    update: new UpdateBeneficiario(BeneficiarioRepository, ParentescoRepository, EmpleadoRepository),
    delete: new DeleteBeneficiario(BeneficiarioRepository),
  }, */
};
