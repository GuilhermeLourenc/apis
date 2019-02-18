/**
 *  Arquivo: server.js
 *  Descrição : Arquivo de configuração de rotas e servidor 
 * Author: Guilherme Gomes
 * Data de criação: 17/02/2019
 */

// Configurar o setup da App

// Chamadas dos pacotes
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose  = require('mongoose');
var Produto = require('./app/models/produto');

//URI: MongoDB Atlas
mongoose.connect('mongodb://guigomes:<gui123>@node-crud-api-shard-00-00-qeept.azure.mongodb.net:27017,node-crud-api-shard-00-01-qeept.azure.mongodb.net:27017,node-crud-api-shard-00-02-qeept.azure.mongodb.net:27017/test?ssl=true&replicaSet=node-crud-api-shard-0&authSource=admin&retryWrites=true');

// Maneira Local
//mongoose.connect('mongodb://localhost/node-crud-api');

// Configuração da variável app para usar o 'body-parser() para retornar os dados a partir de um json'
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Definindo uma porta onde será executada a nossa api
var port = process.env.port || 8000;


var router = express.Router(); // Vai pegar todas as instâncias rotas do express

//Criando uma rota de exemplo
router.get('/', function(req, res) {
  res.json({message: 'Beleza! Bem vindo a nossa loja XYZ'})
});

// Definindo um padrão das rotas prefixadas: '/api'
app.use('/api', router); // Todas as rotas vão ser prefixadas com o API

//Iniciando a aplicação (servidor)
app.listen(port);
console.log('Iniciando a app na porta' + port);