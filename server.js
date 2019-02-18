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
//mongoose.connect('mongodb://guigomes:gui123@node-crud-api-shard-00-00-qeept.azure.mongodb.net:27017,node-crud-api-shard-00-01-qeept.azure.mongodb.net:27017,node-crud-api-shard-00-02-qeept.azure.mongodb.net:27017/test?ssl=true&replicaSet=node-crud-api-shard-0&authSource=admin&retryWrites=true', {
//  useMongoClient:true
//});

// Maneira Local
mongoose.connect('mongodb://localhost:27017/node-crud-api', {useNewUrlParser: true});


// Configuração da variável app para usar o 'body-parser() para retornar os dados a partir de um json'
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Definindo uma porta onde será executada a nossa api
var port = process.env.port || 8000;

// Vai pegar todas as instâncias rotas do express
var router = express.Router(); 

// Rotas da nossa API
/*****************************************************/
router.use(function(req, res, next) {
  console.log('Algo está acontecendo aqui...');
  next();
});

//Criando uma rota de exemplo
router.get('/', function(req, res) {
  res.json({message: 'Beleza! Bem vindo a nossa loja XYZ'})
});

//APIS 
/*****************************************************/

//Rotas que terminarem com /produtos (Servir: GET ALL & POST)
router.route('/produtos')

/*1) Método: Criar Produto(acessar em: POST http://localhost:8000/api/produtos)*/
.post(function(req, res) {
  var produto = new Produto();


// Aqui vamos setar os campos do produto (via request)
  produto.nome = req.body.nome;
  produto.preco = req.body.preco;
  produto.descricao = req.body.descricao;

  produto.save(function(err) { 
    if(err) 
    res.send('Erro ao tentar salvar o produto' + error);

    res.json({ message: 'Produto cadastrado com sucesso!'});
  });
})

/*2) Método: Selecionar todos os produtos(acessar em: GET http://localhost:8000/api/produtos)*/
.get(function(req, res){
  Produto.find(function(error, produtos){
    if(error) 
    res.send('Erro ao tentar selecionar todos os produtos' + error)
 
  res.json(produtos);
  });
});


// Definindo um padrão das rotas prefixadas: '/api'
app.use('/api', router); // Todas as rotas vão ser prefixadas com o API

//Iniciando a aplicação (servidor)
app.listen(port);
console.log('Iniciando a app na porta' + port);