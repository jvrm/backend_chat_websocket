/* IMPORTAR AS CONFIGURAÇÕES DO SERVIDOR */
var app = require('./config/server');

/* PARAMETRIZAR A PORTA DE ESCUTA */
var server = app.listen(80, function(){ // É NECESSÁRIO COLOCAR O LISTEN DENTRO DE UMA VARIÁVEL PARA PASSAR COMO PARAMETRO PRO SOCKET.IO
    console.log('Servidor Online');
})

var io = require('socket.io').listen(server);

app.set('io', io) //Cria uma variável global para ser usada em qualquer lugar 

io.on('connection', function(socket){ //Variável connection é responsavel por ser executada quando a instância é criada no chat.ejs, a variável socket serve para executar ações no websocket
    console.log("Usuário Conectou");

    socket.on('disconnect', function(){ // função on significa que ele está ouvindo, e ao receber, realiza a função
        console.log('Usuário Desconectou');
    })

   
    socket.on('msgParaServidor', function(data){
         
        /* dialogo */
        socket.emit(
            'msgParaCliente', 
            {apelido: data.apelido, mensagem:data.mensagem}
        );

        socket.broadcast.emit(
        'msgParaCliente',
        {apelido: data.apelido, mensagem: data.mensagem}
        )

        console.log(data.apelido_cliente)
        /* participantes */
        if(parseInt(data.apelido_cliente) == 0){
            socket.emit(
                'participantesParaCliente', 
                {apelido: data.apelido}
            );
    
            socket.broadcast.emit(
            'participantesParaCliente',
            {apelido: data.apelido, mensagem: data.mensagem}
            )
        }
        
    })
});