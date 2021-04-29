const { emit } = require("../../config/server");

module.exports.iniciaChat = function(application, req, res){
    
    var dadosForm = req.body;
    
    req.assert('apelido', 'O Apelido não pode ser vazio').notEmpty();
    req.assert('apelido', 'O Apelido deve conter 3 a 15 caracteres').len(3,15);

    var erros = req.validationErrors();

    if (erros){
        res.render("index", {validacao: erros}); //res.send finaliza igual um return
        return;
    }

    application.get('io').emit('msgParaCliente', 
    {apelido: dadosForm.apelido, mensagem: 'Acabou de entrar no chat'}); //application.get recebe a variável global, utilizando o nome dado

    res.render('chat', {dados : dadosForm});
}

module.exports.getChat = function(application, req, res){
    res.render('chat');
}