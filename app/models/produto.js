/**
 * Arquivo: produto.js
 * Author: Guilherme Gomes
 * Descrição: Arquivo responsável onde trataremos o modelo da classe : 'Produto'
 * Data: 17/02/2019
 * obs: 
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Produto:
 * 
 * Id: int
 * Nome: String 
 * Preco: Number
 * Descrição: String
 */

//Classe modelo chamda produto usando o mongoose, atráves dessa classe é possível interagir com a base de dados.

var ProdutoSchema = new Schema({
  nome: String,
  preco: Number,
  descricao: String
});

module.exports = mongoose.model('Produto', ProdutoSchema);