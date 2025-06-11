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
};

export default emailTemplates;