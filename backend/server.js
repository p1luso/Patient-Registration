const express = require('express');
const fileUpload = require('express-fileupload');
const patientRoutes = require('./routes/patientRoutes');
const logger = require('./logs');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use('/api', patientRoutes);
app.use('/files', express.static(path.join(__dirname, 'files')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
    logger.info(`Servidor corriendo en puerto ${PORT}`);
});
