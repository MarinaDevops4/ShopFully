const csvFilePath = 'flyers_data_2024.csv'; // Ruta al archivo CSV
const csv = require('csvtojson');
const fs = require('fs');

// Función para leer el archivo CSV y convertirlo a JSON
csv()
  .fromFile(csvFilePath)
  .then((jsonObj) => {
    // jsonObj contendrá los datos del archivo CSV convertidos a JSON
    console.log(jsonObj);

    // Guardar el JSON en un archivo
    fs.writeFile('output.json', JSON.stringify(jsonObj, null, 2), (err) => {
      if (err) {
        console.error('Error al guardar el archivo JSON:', err);
      } else {
        console.log('Archivo JSON guardado exitosamente.');
      }
    });
  })
  .catch((err) => {
    // Manejar errores de lectura del archivo CSV
    console.error('Error al leer el archivo CSV:', err);
  });
