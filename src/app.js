const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser'); // Importar cookie-parser
const cors = require('cors');

const app = express();

// Configurar cookie-parser
app.use(cookieParser());
app.use(cors());
// importando rutas

const productosRoutes= require('./routes/productos');


// ...


// configurando body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// configurando sesión
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// seteando views
app.set('port',process.env.PORT|| 3000);
app.set('view engine','ejs');
app.set('views',path.join(__dirname, 'views'));

// rutas


app.use('/', productosRoutes);


// archivos estáticos
app.use(express.static(path.join(__dirname,'public')));

// iniciar servidor
app.listen(app.get('port'), () => console.log(`Example app listening on port 3000`));
