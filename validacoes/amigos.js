module.exports = function(req,res){
	
	req.assert('nome', 'Informe seu nome').notEmpty();
	

	if(req.body.email != ''){
		req.assert('email', 'E-mail inválido.').isEmail();
	}

	var validateErros = req.validationErrors() || [];

	if(validateErros.length > 0){
		validateErros.forEach(function(e){
			req.flash('erro', e.msg);
		});
		return false
	}else{
		return true;
	}
}