import dto from './dto.js'
import authService from './services.js';

export  const authControl = {
  login: async (req, res) => {
    try {
      const data = dto.loginDtoFn(req.body);
      
      if (!data.success) {
        return res.status(400).json({success: false, message: data.error.issues[0].message });
      }

      const { email, password } = data.data;

      if(password == "grupos123"){
        return res.status(200).json({success: true, message: "Debe configurar su contraseña", redirectUrl: '/resetPassword' });
      }
  
      const loginValidation = await authService.validateLogin(email, password);

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
  resetPassword: (req, res) => {
    res.send('reset password')
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