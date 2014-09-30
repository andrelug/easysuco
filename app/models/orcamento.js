var mongoose = require('mongoose');


var OrcamentoSchema = new mongoose.Schema({
    itens: [],
    numbers: [],
    nome: String,
    email: String,
    cupom: String,
    status: String
});

// create the model for users and expose it to app // Users var
module.exports = mongoose.model('Orcamento', OrcamentoSchema);