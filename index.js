const express = require('express');
require('dotenv').config();
const cors = require('cors');

//Crear servidor express
const app = express();

//Configurar CORS
app.use(cors());



//Rutas
app.use('/api/items', require('./routes/product'));


app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo' + 3000);
});