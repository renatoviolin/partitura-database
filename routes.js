var partitura = require('./queries');

module.exports = {
    configure: function(app) {
        app.get('/', function(req, res) {
            res.send('Library API is running');
        });

        app.get('/index', function(req, res) {
            res.sendFile('index.html', { root: __dirname })
        });

        app.get('/partitura/', function(req, res) {
            partitura.get(res);
        });



        app.get('/partitura/:id/', function(req, res) {
            partitura.getById(req.params.id, res);
        });

        app.post('/partitura/', function(req, res) {
            partitura.create(req.body, res);
        });

        app.put('/partitura/', function(req, res) {
            partitura.update(req.body, res);
        });

        app.delete('/partitura/:id/', function(req, res) {
            partitura.remove(req.params.id, res);
        });


        // // M E N S A G E M 

        // app.post('/mensagem/', function(req, res) {
        //     mensagem.create(req.body, res);
        // });

        // app.get('/mensagem/:ra/', function(req, res) {
        //     mensagem.getByRa(req.params.ra, res);
        // });

        // app.put('/mensagemLida/:id/', function(req, res) {
        //     mensagemEnviada.updateLida(req.params.id, res);
        // });


    }
};
