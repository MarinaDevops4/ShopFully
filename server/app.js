const express = require('express');
const cors = require('cors'); // Importa el paquete cors
const csvtojson = require('csvtojson');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Habilita CORS
app.use(cors());

// Ruta al archivo CSV
const csvFilePath = 'flyers_data_2024.csv';

// Definir el endpoint de API
app.get('/api/data', (req, res) => {
  // Leer el archivo CSV y convertirlo a JSON
  csvtojson()
    .fromFile(csvFilePath)
    .then((jsonArray) => {
      // Enviar los datos en formato JSON como respuesta
      res.json(jsonArray);
    })
    .catch((err) => {
      // Manejar errores de lectura del archivo CSV
      console.error('Error al leer el archivo CSV:', err);
      res.status(500).json({ error: 'Error al leer el archivo CSV' });
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
