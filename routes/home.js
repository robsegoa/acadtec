module.exports = function(app){
	var home = app.controllers.home;
	//app.route('/').get(home.index);
	app.route('/')
		.get(home.login)
		.post(home.autenticacao);
	app.route('/home').get(home.index);
	app.route('/logout').get(home.logout);

}