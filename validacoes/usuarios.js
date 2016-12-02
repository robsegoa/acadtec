var url = require('url');

module.exports = function(req,res){
	var createUrl = url.parse(req.url).pathname == "/usuarios/create";
	var updateUrl = !createUrl;

	req.assert('nome', 'Informe o seu nome').notEmpty();
	if(createUrl){
		req.assert('email', 'E-mail inválido.').isEmail();
		req.assert('password',' Sua senha deve conter 6 ou 10 caracteres').len(6,10);
	}
	req.assert('site','Site não é uma url válida').isURL();

	var validateErros = reqvalidationErros() || [];

	//verificar se a senha confere

	if(req.body.password != req.body.password_confirmar){
		validateErros.push({msg:'Senha não confere'});
	}

	if(validateErros.lenth > 0){
		validateErros.forEach(function(e){
			req.flash('erro', e.msg);
		});
		return false
	}else{
		return true;
	}
}