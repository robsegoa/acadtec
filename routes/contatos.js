module.exports = function(app){

	var contato = app.controllers.contatos;
	var autenticar = require('../middleware/autenticar');

	app.route('/contatos/:id')
		.get(contato.index);
	app.route('/contatos/create/:id')
		.get(contato.create)
		.post(contato.post);

	app.route('/contatos/delete/:id/:amigo')
		.post(contato.excluir);
}