const express = require('express');
const patientRoutes = require('./routes/patientRoutes');
const logger = require('./logs');
const cors = require('cors');
const path = require('path');
const app = express();

require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use('/api', patientRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
    logger.info(`Servidor corriendo en puerto ${PORT}`);
});
