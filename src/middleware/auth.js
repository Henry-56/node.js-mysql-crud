const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../models/user');

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).send('El correo electrónico ya está registrado');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword });

    if (!user) {
      throw new Error('El usuario no se creó correctamente');
    }
    
    req.session.user = { id: user.id, name, email };
    //res.redirect('/dashboard');
    res.json({ message: 'Inicio de sesión exitoso.' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en el servidor');
  }
};

exports.loginUser = async (req, res) => {
  const { nombre_usuario, contrasena } = req.body;

  try {
    const user = await User.findOne({ where: { nombre_usuario } });
    if (!user) {
      return res.status(400).send('El nombre de usuario o la contraseña son incorrectos');
    }

    const isMatch = (contrasena === user.contrasena);
    if (!isMatch) {
      return res.status(400).send('El nombre de usuario o la contraseña son incorrectos');
    }

    // Generar el token JWT
    const token = jwt.sign(
      { userId: user.id, nombre_usuario: user.nombre_usuario },
      'tu_clave_secreta', // Reemplaza esto con tu propia clave secreta
      { expiresIn: '1h' } // Configura la expiración del token como desees
    );

    res.cookie('token', token); // Opcional: guardar el token en una cookie

    //res.status(200).json({ token }); // Opcional: enviar el token como respuesta en JSON
    res.redirect('/productos');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en el servidor');
  }
};



