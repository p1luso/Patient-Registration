const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', ''); // Extraemos el token del header

    if (!token) {
        return res.status(401).json({ message: 'Acceso no autorizado. No se proporcionó token.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verificamos el token
        req.user = decoded; // Agregamos el usuario decodificado a la solicitud
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Token no válido o expirado.' });
    }
};

module.exports = authenticateJWT;
