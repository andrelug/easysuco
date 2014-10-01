var Users = require('./models/user'),
    Orcamento = require('./models/orcamento'),
    func = require('../config/functions'),
    facebook = require('../config/facebook.js'),
    ip = require('ip'),
    fs = require("fs"),
    nodemailer = require("nodemailer");


// Session check function
var sessionReload = function(req, res, next){
    if('HEAD' == req.method || 'OPTIONS' == req.method){
        return next();
    }else{
        req.session._garbage = Date();
        req.session.touch();
    }
}

var getProducts = function (codes) {
    var finalCodes = [];
    var prices = [];
    console.log("tamanho: " + codes.itens[2] + " do " + codes)
    for (i = 0; i < codes.itens.length; i++) {
        switch (codes.itens[i]) {
            case "1":
                finalCodes.push("Institucional")
                prices.push("200000")
                break;
            case "2":
                finalCodes.push("Blog")
                prices.push("150000")
                break;
            case "3":
                finalCodes.push("Landing Page")
                prices.push("120000")
                break;
            case "4":
                finalCodes.push("Hotsite")
                prices.push("90000")
                break;
            case "5":
                finalCodes.push("Ebook Landing")
                prices.push("100000")
                break;
            case "6":
                finalCodes.push("Ecommerce")
                prices.push("400000")
                break;
            case "7":
                finalCodes.push("Portfolio")
                prices.push("80000")
                break;
            case "8":
                finalCodes.push("Outros")
                prices.push("0")
                break;
            case "9":
                finalCodes.push("Servidor Já contratado")
                prices.push("15000")
                break;
            case "10":
                finalCodes.push("Servidor Sem preocupação")
                prices.push("10000")
                break;
            case "11":
                finalCodes.push("Servidor Quer contratar")
                prices.push("20000")
                break;
            case "12":
                finalCodes.push("Email")
                prices.push("10000")
                break;
            case "13":
                finalCodes.push("Analytics")
                prices.push("10000")
                break;
            case "14":
                finalCodes.push("CRM")
                prices.push("20000")
                break;
            case "15":
                finalCodes.push("Social")
                prices.push("20000")
                break;
            case "16":
                finalCodes.push("Tarefas")
                prices.push("30000")
                break;
            case "17":
                finalCodes.push("Gateway de Pagamento ")
                prices.push("30000")
                break;
            case "18":
                finalCodes.push("Transferir Conteúdo ")
                prices.push("500")
                break;
            case "19":
                finalCodes.push("Criação de Conteúdo")
                prices.push("5000")
                break;
            case "20":
                finalCodes.push("Aquisição de Domínios ")
                prices.push("5000")
                break;
            case "21":
                finalCodes.push("Outros Mais Opções")
                prices.push("0")
                break;
            case "22":
                finalCodes.push("Treinamento 1h (Grátis)")
                prices.push("0")
                break;
            case "23":
                finalCodes.push("Treinamento 2h")
                prices.push("10000")
                break;
            case "24":
                finalCodes.push("Treinamento 5h")
                prices.push("40000")
                break;
            case "25":
                finalCodes.push("Treinamento 10h")
                prices.push("70000")
                break;
            default:
                finalCodes.push("Error")
                prices.push("0")
        }
    }
    codes.prices = prices;
    codes.codes = finalCodes;
}


module.exports = function (app, passport, mongoose) {
    app.get('/', function (req, res, next) {
        var user = req.user;
        if (!user) {
            res.render('index', { title: 'Bonsaits - Fazemos ótimos WebSites' });
        } else {
            res.render('index', { title: 'Bonsaits - Fazemos ótimos WebSites', user: user });
        }

    });

    app.get('/entrar', function (req, res) {
        var user = req.user;

        if (!user) {
            res.render('login', { title: "Bonsaits Login" });
        } else {
            res.redirect('/painel');
        }
    });

    app.get('/painel', function (req, res) {
        var user = req.user;
        if (!user) {
            res.redirect('/entrar')
        } else {

            Orcamento.find({}).sort({ _id: -1 }).exec(function (err, docs) {
                for (i = 0; i < docs.length; i++) {
                    var timeStamp = docs[i]._id.toString().substring(0, 8);
                    var date = new Date(parseInt(timeStamp, 16) * 1000);
                    docs[i].date = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
                }
                res.render('painel', { title: "Painel Bonsaits", user: user, orc: docs });
            });
        }
    });


    // ORCAMENTOS REVIEW
    app.get('/orcamentos/:id', function (req, res) {
        var user = req.user;

        if (!user || user.status != 'admin') {
            res.redirect('/');
        } else {
            Orcamento.findOne({ _id: req.params.id }).exec(function (err, docs) {
                // console.log(docs);
                getProducts(docs);
                // console.log(docs);
                res.render('orcamento', { title: "Orçamento Análise", user: user, info: docs });
            });
        }
    });

    // ORÇAMENTO DELETE
    app.post('/deleteOrcamento', function (req, res) {
        var user = req.user;
        var id = req.body.id;

        if (!user || user.status != 'admin') {
            res.redirect('/');
        } else {
            Orcamento.remove({ _id: id }, function (err) {
                if (err)
                    throw err
                res.send("OK");
            });
        }
    });

    // CHANGE STATUS
    app.post('/changeStatus', function (req, res) {
        var user = req.user;
        var status = req.body.status;
        var id = req.body.id;

        if (!user || user.status != 'admin') {
            res.redirect('/');
        } else {
            Orcamento.update({ _id: id }, {$set: {status: status}}, function (err) {
                if (err)
                    throw err
                res.send("OK");
            });
        }
    });

    // ORÇAMENTO
    app.post('/orcamento', function (req, res) {
        var user = req.user;
        var str = req.body.str;
        var itens = [];
        var quantidade = [];

        for (i = 0; i < str.length; i++) {
            itens.push(str[i].item);
            quantidade.push(str[i].number);
        }

        new Orcamento({
            itens: itens,
            numbers: quantidade,
            nome: req.body.nome,
            email: req.body.email,
            cupom: req.body.cupon,
            status: "aberto"
        }).save(function (err, docs) {
            if (err)
                console.log(err);
            res.send("OK");
        });

    });



    // CUPONS
    app.get('/cupons', function (req, res) {
        var user = req.user;
        var data = req.query.cupom;

        if (data == "BeAll2014") {
            res.send("60000");
        } else {
            res.send('0');
        }
    });


    // =====================================
    // USER SIGNUP =========================
    // ===================================== I should later find a way to pass params to the jade file here and put values on the inputs
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/', // redirect to the secure profile section
        failureRedirect: '/registrar', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages     
    }));

    app.get('/registrar', function (req, res) {
        var user = req.user;
        if (!user) {
            res.render("signup", { title: "Bonsaits - Registrar", message: req.flash('signupMessage') });
        } else {
            res.redirect("/");
        }
    });



    // =====================================
    // LOG IN ==============================
    // =====================================
    app.get('/login', function (req, res) {
        var user = req.user;
        if (!user) {
            res.render("login", { message: req.flash('loginMessage') });
            if (req.url === '/favicon.ico') {
                r.writeHead(200, { 'Content-Type': 'image/x-icon' });
                return r.end();
            }
        } else {
            res.redirect("/");
        }
    });


    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    // =====================================
    // FACEBOOK ROUTES =====================
    // =====================================
    // route for facebook authentication and login
    app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'user_friends']
    }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
	    passport.authenticate('facebook', {
	        successRedirect: '/facebook',
	        failureRedirect: '/'
	    })
    );

    // =====================================
    // TWITTER ROUTES ======================
    // =====================================
    // route for twitter authentication and login
    app.get('/auth/twitter', passport.authenticate('twitter'));

    // handle the callback after twitter has authenticated the user
    app.get('/auth/twitter/callback',
		passport.authenticate('twitter', {
		    successRedirect: '/profile',
		    failureRedirect: '/'
		})
    );

    // =====================================
    // GOOGLE ROUTES =======================
    // =====================================
    // send to google to do the authentication
    // profile gets us their basic information including their name
    // email gets their emails
    app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email', 'openid'] }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/profile',
            failureRedirect: '/'
        })
    );


    // =============================================================================
    // AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
    // =============================================================================

    // facebook -------------------------------

    // send to facebook to do the authentication
    app.get('/connect/facebook', passport.authorize('facebook', { scope: ['email', 'user_about_me',
    'user_birthday ', 'user_hometown', 'user_website']
    }));

    // handle the callback after facebook has authorized the user
    app.get('/connect/facebook/callback',
			passport.authorize('facebook', {
			    successRedirect: '/facebook',
			    failureRedirect: '/'
			})
        );

    // twitter --------------------------------

    // send to twitter to do the authentication
    app.get('/connect/twitter', passport.authorize('twitter', { scope: 'email' }));

    // handle the callback after twitter has authorized the user
    app.get('/connect/twitter/callback',
			passport.authorize('twitter', {
			    successRedirect: '/profile',
			    failureRedirect: '/'
			})
        );


    // google ---------------------------------

    // send to google to do the authentication
    app.get('/connect/google', passport.authorize('google', { scope: ['profile', 'email', 'openid'] }));

    // the callback after google has authorized the user
    app.get('/connect/google/callback',
		passport.authorize('google', {
		    successRedirect: '/profile',
		    failureRedirect: '/'
		})
    );


    // =============================================================================
    // UNLINK ACCOUNTS =============================================================
    // =============================================================================
    // facebook -------------------------------
    app.get('/unlink/facebook', function (req, res) {
        var user = req.user;
        user.social.facebook.token = undefined;
        user.save(function (err) {
            res.redirect('/profile');
        });
    });


    // ADD FACEBOOK FRIENDS
    app.get('/facebook', function (req, res) {
        var user = req.user;
        facebook.getFbData(user.social.facebook.token, '/me/friends', function (data) {
            var friend = eval("(" + data + ")")
            Users.update({ _id: user._id }, { $pushAll: { 'social.facebook.friends': friend.data} }, function (err) {
                res.redirect('/');
            });
        });
    });

    // twitter --------------------------------
    app.get('/unlink/twitter', function (req, res) {
        var user = req.user;
        user.social.twitter.token = undefined;
        user.save(function (err) {
            res.redirect('/profile');
        });
    });

    // google ---------------------------------
    app.get('/unlink/google', function (req, res) {
        var user = req.user;
        user.social.google.token = undefined;
        user.save(function (err) {
            res.redirect('/profile');
        });
    });

    // =====================================
    // delete USER =========================
    // =====================================
    app.put('/users/delete', function (req, res) {
        Users.update(
            { 'name.loginName': req.user.name.loginName },
            { $set: {
                deleted: true
            }
            },
            function (err) {
                res.redirect('/logout')
            }
        );
    });

    // =====================================
    // RESTORE USER ========================
    // =====================================
    app.get('/users/restore', function (req, res) {
        user = req.user;
        res.render('profile/restore', { user: user });
    });

    app.put('/users/restore', function (req, res) {
        Users.update(
            { 'name.loginName': req.user.name.loginName },
            { $set: {
                deleted: false
            }
            },
            function (err) {
                res.redirect('/profile')
            }
        );
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });


    function isLoggedIn(req, res, next) {

        // if user is authenticated in the session, carry on 
        if (req.isAuthenticated())
            return next();

        // if they aren't redirect them to the home page
        res.redirect('/');
    }

}