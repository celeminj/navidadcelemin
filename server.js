require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Configuración de middleware
app.use(cors());
app.use(bodyParser.json());

// Conexión a la base de datos MySQL
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) {
        console.error('Error conectando a MySQL:', err);
        return;
    }
    console.log('Conectado a MySQL');
});

// Crear la tabla si no existe
const createTableQuery = `
CREATE TABLE IF NOT EXISTS cartas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    contenido TEXT NOT NULL,
    url VARCHAR(255)
)`;
db.query(createTableQuery, (err) => {
    if (err) console.error('Error creando la tabla:', err);
});

// Rutas de la API
app.get('/cartas', (req, res) => {
    db.query('SELECT * FROM cartas', (err, results) => {
        if (err) {
            console.error('Error obteniendo cartas:', err);
            res.status(500).send('Error en el servidor');
            return;
        }
        res.json(results);
    });
});

app.post('/cartas', (req, res) => {
    const { nombre, contenido, url } = req.body;
    const query = 'INSERT INTO cartas (nombre, contenido, url) VALUES (?, ?, ?)';
    db.query(query, [nombre, contenido, url], (err, result) => {
        if (err) {
            console.error('Error insertando carta:', err);
            res.status(500).send('Error en el servidor');
            return;
        }
        res.status(201).json({ id: result.insertId, nombre, contenido, url });
    });
});

app.delete('/cartas/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM cartas WHERE id = ?';
    db.query(query, [id], (err) => {
        if (err) {
            console.error('Error eliminando carta:', err);
            res.status(500).send('Error en el servidor');
            return;
        }
        res.sendStatus(204);
    });
});

// Iniciar el servidor
const PORT = 3306;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
