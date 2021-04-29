/* IMPORTAR O MÓDULO DO FRAMEWORK EXPRESS */
var express = require('express');

/* IMPORTAR O MÓDULO CONSIGN */
var consign = require('consign');

/* IMPORTAR O BODYPARSER */
var bodyParser = require('body-parser');

/* IMPORTAR O MÓDULO DO EXPRESS-VALIDATOR*/
var expressValidator = require('express-validator');

/* INICIAR O OBJETO DO EXPRESS */
var app = express();

/* CONFIGURAR O MIDDLEWARE EXPRESS.STATIC */
app.use(express.static('./app/public'));

/* CONFIGURAR O MIDDLEWARE BODY-PARSER */
app.use(bodyParser.urlencoded({extended: true}));

/* CONFIGURAR O MIDDLEWARE EXPRESS-VALIDATOR */
app.use(expressValidator());

/* EFETURA O AUTOLOAD DAS ROTAS, DOS MODELS E DOS CONTROLLERS PARA O OBJETO APP */
consign()
    .include('app/routes')
    .then('app/models')
    .then('app/controller')
    .into(app);

/* EXPORTAR O OBJETO APP */
module.exports = app;