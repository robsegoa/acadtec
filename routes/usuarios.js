module.exports = function(app){
	var usuario = app.controllers.usuarios;

	app.route('/usuarios').get(usuario.index);
	app.route('/usuarios/create').get(usuario.create);
}