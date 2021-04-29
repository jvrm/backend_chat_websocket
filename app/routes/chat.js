module.exports = function(application){
    application.post ('/chat', function(req, res){
        application.app.controller.chat.iniciaChat(application, req, res);
    })

    application.get ('/chat', function(req, res){
        application.app.controller.chat.getChat(application, req, res);
    })
}