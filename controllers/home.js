

module.exports = function(app){
	var Usuario = app.models.usuarios;
	var validacao = require('../validacoes/autenticacao');
	var nodemailer = require('nodemailer');
	
	var HomeController = {
		index: function(req,res){
			res.render('home/index');	
		},
		login: function(req,res){
			res.render('home/login');
		},

		autenticacao: function(req,res){


			var usuario = new Usuario();
			var email = req.body.email;
			var password = req.body.password;

			if(validacao(req,res)){
				Usuario.find(function(err,dados){
					if(dados.length == 0){

						var model = new Usuario();
						model.nome = "Admin";
						model.email = "robson.sevenmkt@gmail.com";
						model.site = "facebook.com";
						model.password = model.generateHash("123456");
						model.save(function(err,data){
							if(!err){
								req.session.usuario = data;
								res.redirect('/home');
							}
						});
					}else{
						Usuario.findOne({'email': email},function(err,data){
							if(err){
								req.flash('erro', 'Erro ao entrar no sistema: '+err);
								res.redirect('/');	
							}else if(!data){
								req.flash('erro', 'E-mail não encontrado!');
								res.redirect('/');
							}else if(!usuario.validPassword(password, data.password)){
								req.flash('erro', 'Senha não confere!');
								res.redirect('/');
							}else{
								req.session.usuario = data;
								res.redirect('/home');
							}
						});
					}
				});
			}else{
				res.redirect('/');
			}
		},

		logout: function(req,res){
			req.session.destroy();
			res.redirect('/');
		},
		email: function(req,res){
			res.render('home/email');
		},
		enviar(req,res){
			var transport = nodemailer.createTransport("SMTP",{
				host:"smtp.gmail.com",
				port: 587,
				auth:{
					user: 'robson.segoa@neoway.com.br',
					pass:'Preencher aqui'
				}


			});

			var mailOptions = {
				from: req.body.nome+" <" + req.body.email+">",
				to: "robson.segoa@neoway.com.br",
				subject: req.body.assunto,
				text: req.body.mensagem
			}

			transport.sendMail(mailOptions, function(err,response){
				if(err){
					req.flash('erro','Erro ao enviar email: '+err)

				}else{
					req.flash('info','E-mail Enviado com sucesso!');
					res.redirect('/email');	
				}
				
			});
		}
		
	}

	return HomeController;
}
