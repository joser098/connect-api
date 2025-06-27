const emailTemplates = {
  resetPassword: {
    subject: 'Restablecer contraseña',
    html: (hash) => `
      <!DOCTYPE html>
      <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Restablecer contraseña</title>
        </head>
        <body style="font-family: Arial, sans-serif;">
          <p>Has click en el  siguiente el link para restablecer tu contraseña</p>
          <a href="${process.env.WEB_URL}/resetPassword/${hash}">Restablecer contraseña</a>
        </body>
      </html>
    `
  },
  whatsappInvitation: {
    subject: 'Invitación a WhatsApp',
    html: (name) => `
      <!DOCTYPE html>
      <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Invitación a WhatsApp</title>
        </head>
        <body style="font-family: Arial, sans-serif;">
          <p>¡Hola ${name}!</p>
          <p>Te invitamos a unirte a nuestro grupo de WhatsApp para conectar.</p>
          <p>Para unirte, simplemente haz clic en el siguiente enlace:</p>
          <a href="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX">Unirse al grupo de WhatsApp</a>
          <p>¡Gracias por ser parte de nuestra comunidad!</p>
        </body>
      </html>
    `
  },
  groupAssigned: {
    subject: 'Grupo Asignado',
    html: (name) => `
      <!DOCTYPE html>
      <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Grupo Asignado</title>
        </head>
        <body style="font-family: Arial, sans-serif;">
          <p>¡Hola, ${name}!</p>
          <p>Te hemos asignado un grupo de conexion.</p>
          <p>Pronto recibiras un mensaje con los detalles del grupo.</p>
          <p>Si tienes alguna pregunta, no dudes en contactarnos.</p>
          <p>¡Gracias por ser parte de nuestra comunidad!</p>
        </body>
      </html>
    `
  }
  
};

export default emailTemplates;