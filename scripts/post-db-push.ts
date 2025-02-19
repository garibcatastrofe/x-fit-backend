import mysql from 'mysql2/promise';

async function updateDB() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1234',
        database: 'x-fit'
    });

    console.log("Aplicando cambios adicionales...");

    await connection.query(`
        ALTER TABLE usuarios MODIFY COLUMN fecha_nacimiento DATE;
    `);

    console.log("Cambios aplicados.");
    await connection.end();
}

updateDB().catch(console.error);
