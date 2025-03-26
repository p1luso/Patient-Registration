const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

const sendSMS = async ({ phoneNumber, fullName }) => {
    if (!accountSid || !authToken || !twilioPhoneNumber) {
        console.warn('⚠ Twilio no está configurado. SMS deshabilitados.');
        return;
    }

    try {
        await client.messages.create({
            body: `Hola ${fullName}, tu registro ha sido exitoso.`,
            from: twilioPhoneNumber,
            to: phoneNumber
        });

        console.log('SMS enviado con éxito a', phoneNumber);
    } catch (error) {
        console.error('Error enviando SMS:', error);
    }
};

module.exports = sendSMS;
