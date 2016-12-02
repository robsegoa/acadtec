module.exports = function(app){
	
	var validacao = require('../validacoes/usuarios');
	var Usuario = app.models.usuarios;


	var UsuarioController = {
		index: function(req,res){
			Usuario.find(function(err,dados){
				if(err){
					req.flash('erro','Erro ao buscar usuarios: ' + err);
					res.redirect('/usuarios');	
				}else{
					res.render('usuarios/index',{lista: dados});
				}
			});
		},
		create: function(req,res){
			res.render('usuarios/create')
		},
		post: function(req,res){
			if(validacao(req,res)){
				var model = new Usuario();
				model.nome = req.body.nome;
				model.email = req.body.email;
				model.site = req.body.site;
				model.password = model.generateHash(req.body.password);
				model.save(function(err){
					if(err){
						req.flash('erro', 'Erro ao cadastrar: '+err);
						res.render('usuarios/create', {user: req.body});
					}else{
						req.flash('info', 'Registro cadastrado com sucesso!');
						res.redirect('/usuarios');
					}
				})
			}else{
				res.render('usuarios/create',{user: req.body});
			}
			
		},
		show: function(req,res){
			Usuario.findById(req.params.id, function(err,dados){
				if(err){
					req.flash('erro', 'Erro ao visualizar usuário: ' + err);
					res.redirect('/usuarios');
				}else{
					res.render('usuarios/show', {dados: dados})
				}
			});
		},
		delete: function(req,res){
			Usuario.remove({_id: req.params.id}, function(err,dados){
				if(err){
					req.flash('erro','Erro ao excluir usuário: ' + err);
					res.redirect('/usuarios');
				}else{
					req.flash('info', 'Registro excluido com sucesso');
					res.redirect('/usuarios');
				}
			});
		},
		edit: function(req,res){
			Usuario.findById(req.params.id, function(err,data){
				if(err){
					req.flash('erro', 'Erro ao editar: '+ err);
				}else{
					res.render('usuarios/edit', {dados: data});
				}
			});
		},
		update: function(req,res){
			Usuario.findById(req.params.id,function(err,data){
				var model = data;
				model.nome = req.body.nome;
				model.site = req.body.site;

				model.save(function(err){
					if(err){
						req.flash('erro','Erro ao editar: '+err);
						res.render('usuarios/edit', {dados: model});
					}else{
						req.flash('info', 'Registro atualizado com sucesso');
						res.redirect('/usuarios');
					}
				})
			})
		}
	}

	return UsuarioController;
}