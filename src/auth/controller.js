import emailTemplates from '../services/email-templates.js';
import emailsService from '../services/emails.service.js';
import dto from './dto.js'
import authRepo from './repository.js';
import authService from './services.js';
import bcrypt from "bcrypt";


export  const authControl = {
  login: async (req, res) => {
    try {
      const data = dto.loginDtoFn(req.body);
      
      if (!data.success) {
        return res.status(400).json({success: false, message: data.error.issues[0].message });
      }

      const { email, password } = data.data;

      //VERIFICACION PARA USUARION GUARDADOS SIN CONTRASENA
      const user = await authRepo.getPassByEmail(email);
      if (user && user.password == 'grupos123!') {
        const generated = await authService.generateHash(email);
        // ENVIAR CORREO
        const emailTemplate = emailTemplates.resetPassword.html(generated.hash);
        await emailsService.sendEmailSES(email,emailTemplates.resetPassword.subject, emailTemplate);
        return res.status(200).json({ success: true, message: 'Debe configurar una nueva contraseña'});
      }
  
      const loginValidation = await authService.validateLogin(email, password);

      await authRepo.updateLastLogin(email);
      return res.status(200).json({ success: true, data: loginValidation });
    } catch (error) {
      let status;
      switch (error.message) {
        case "Correo electrónico no verificado":
          status = 401;
        case "Correo o contraseña incorrectos":
          status = 404;
          break;
        default:
          status = 500;
          break;
      }

      return res.status(status).json({success: false, message: error.message });
    }
  },
  register: (req, res) => {
    res.send('register')
  },
  logout: (req, res) => {
    res.send('logout')
  },
  forgotPassword: (req, res) => {
    res.send('forgot password')
  },
  resetPassword: async (req, res) => {
    const { email, password, hash } = req.body;
    const emailByHash = await authRepo.getEmailByHash(hash);
    if(!emailByHash || (email !== emailByHash.email)){
      return res.status(404).json({success: false, message: 'Ha ocurrido un error. Por favor, verifica que hayas solicitado restablecer tu contraseña o inténtalo de nuevo más tarde.'})
    }

    const hashedPassword = await bcrypt.hash(password, 5);
    const updatePassword = await authRepo.updatePassword(email, hashedPassword);

    if(!updatePassword){
      return res.status(500).json({success: false, message: 'Ha ocurrido un error. Por favor, inténtalo de nuevo más tarde.'})
    }

    await authRepo.deleteHash(hash);
    return res.status(200).json({success: true, message: 'Contraseña actualizada correctamente.'})
  },
  verifyResetPasswordHash: async (req, res) => {
    try {
      const { hash } = req.params;
      const email = await authRepo.getEmailByHash(hash);
      
      if(!email){
        return res.status(404).json({success: false, message: 'Hash no encontrado', data: { isValid: false }})
      }
    
      await authRepo.setEmailVerification(email.email);
      return res.status(200).json({success: true, data: { email: email.email, isValid: true }})
    } catch (error) {
      return res.status(500).json({success: false, message: error.message })
    }
  },
  verifyEmail: (req, res) => {
    res.send('verify email')
  },
  resendVerificationEmail: (req, res) => {
    res.send('resend verification email')
  },
  verifyToken: (req, res) => {
    res.send('verify token')
  },
  refreshToken: (req, res) => {
    res.send('refresh token')
  }
}