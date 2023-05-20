const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser'); // Importar cookie-parser

const app = express();

// Configurar cookie-parser
app.use(cookieParser());

// importando rutas
const pedidoCompletadoRoutes= require('./routes/pedidosCompletados');
const pedidoRoutes= require('./routes/pedidos');
const categoriaRoutes= require('./routes/categorias');
const loginRoutes= require('./routes/login');
const productosRoutes= require('./routes/productos');
const ApiCustomerRoutes= require('./routes/customerApi');

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

app.use('/', pedidoCompletadoRoutes);
app.use('/', pedidoRoutes);
app.use('/', loginRoutes);
app.use('/', categoriaRoutes);
app.use('/', productosRoutes);
app.use('/', ApiCustomerRoutes);

// archivos estáticos
app.use(express.static(path.join(__dirname,'public')));

// iniciar servidor
app.listen(app.get('port'), () => console.log(`Example app listening on port 3000`));
