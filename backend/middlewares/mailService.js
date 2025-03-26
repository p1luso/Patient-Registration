const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "01a4edb2404ee9",
    pass: "b1754bf0ec6017",
  },
});


const sendConfirmationEmail = async ({
  email,
  fullName,
  phoneNumber,
  documentPhoto,
}) => {
  const mailOptions = {
    from: '"Patient Registration" <no-reply@patient-registration.com>',
    to: email,
    subject: "Confirmación de Registro",
    text: `Hola ${fullName},\n\nTu registro ha sido exitoso en nuestro sistema. ¡Bienvenido!\n\nAtentamente,\nEl equipo de Patient Registration\nNúmero de teléfono: ${phoneNumber}`,
    attachments: [
      {
        filename: "document_photo.jpg",
        path: documentPhoto,
        cid: "documentPhotoCid",
      },
    ],
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error enviando el correo:", error);
  }
};

module.exports = sendConfirmationEmail;
