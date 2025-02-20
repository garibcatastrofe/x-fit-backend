import mysql from 'mysql2/promise';

async function updateDB() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'x-fit',
  });

  console.log('Aplicando cambios adicionales...');

  await connection.query(`ALTER TABLE usuarios MODIFY COLUMN fecha_nacimiento DATE;`);
  await connection.query(`ALTER TABLE promociones MODIFY COLUMN fecha_inicio DATE;`);
  await connection.query(`ALTER TABLE promociones MODIFY COLUMN fecha_vencimiento DATE;`);
  await connection.query(`ALTER TABLE ponchadas MODIFY COLUMN fecha DATETIME;`);
  await connection.query(`ALTER TABLE pagos MODIFY COLUMN fecha_pago DATE;`);
  await connection.query(`ALTER TABLE pagos MODIFY COLUMN fecha_vencimiento DATE;`);
  await connection.query(`ALTER TABLE clientes MODIFY COLUMN fecha_inicio DATE;`);

  console.log('Cambios aplicados.');
  await connection.end();
}

updateDB().catch(console.error);
