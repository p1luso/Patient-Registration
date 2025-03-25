const express = require('express');
const fileUpload = require('express-fileupload');
const patientRoutes = require('./routes/patientRoutes');
const logger = require('./logs');
const cors = require('cors');
const path = require('path');
const app = express();
const fs = require('node:fs');
const multer = require('multer');


const upload = multer({derst:'uploads/'});


function saveImage(file) {
    const newPath = `/uploads/${file.originalName}`
    fs.renameSync(file.path, newPath);
    return newPath;
}

app.post('/images/single', upload.single('image'), (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: 'Debe subir una imagen' });
        }
        const filePath = saveImage(file);
        res.status(201).json({ message: 'Imagen subida exitosamente', path: filePath });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al subir la imagen', error });
    }
})

app.use(cors());
app.use(express.json());
app.use('/api', patientRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
    logger.info(`Servidor corriendo en puerto ${PORT}`);
});
