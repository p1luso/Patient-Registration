const sendConfirmationEmail = require('../middlewares/mailService');
const sendSMS = require('../middlewares/smsService'); // Crearemos este archivo después

const sendNotification = async ({ email, fullName, phoneNumber, documentPhoto }) => {
    try {
        // Enviar email (ya implementado)
        await sendConfirmationEmail({ email, fullName, phoneNumber, documentPhoto });

        // Enviar SMS (solo se activará cuando el cliente lo solicite)
        if (process.env.ENABLE_SMS === 'true') {
            await sendSMS({ phoneNumber, fullName });
        }

        console.log('Notificación enviada correctamente.');
    } catch (error) {
        console.error('Error enviando la notificación:', error);
    }
};

module.exports = sendNotification;
