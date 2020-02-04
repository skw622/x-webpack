const Product = require("../models/product.js");
const Content = require("../models/content.js");
const nodemailer = require('nodemailer');

exports.login = function(request, response) {
    if (request.session.loggedin) response.redirect('/admin/product');
    var ctx = {};
    Content.find({}, ['identifikator', 'text'], function(err, contents) {

        contents.forEach(function(el, index) {
            ctx[el.identifikator] = el.text;
        });

        response.render("home/login.hbs", {
            layout: 'layouts/base.hbs',
            contents: ctx,
        });
    });
};

// exports.contact = function(request, response) {
//     let transport = nodemailer.createTransport({
//         host: 'smtp.mail.ru',
//         port: 465,
//         auth: {
//            user: 'fashion.butik99@mail.ru',
//            pass: 'mkHI1MXr7x'
//         }
//     });
//     const message = {
//         from: 'fashion.butik99@mail.ru',
//         to: 'fashion.butik99@mail.ru',
//         subject: 'Обратная связь',
//         html: '<table><tr><td>Имя: </td><td>'+request.body.name+'</td></tr><tr><td>Компания: </td><td>'+request.body.company+'</td></tr><tr><td>Страна: </td><td>'+request.body.country+'</td></tr><tr><td>Email: </td><td>'+request.body.email+'</td></tr><tr><td>Телефон: </td><td>'+request.body.telephone+'</td></tr></table>'
//     };
//     transport.sendMail(message, function(err, info) {
//         if (err) {
//           // console.log(err)
//           return response.sendStatus(400);
//         } else {
//            response.redirect('/');
//         }
//     });
// }

exports.index = function(request, response) {
    var ctx = {};
    Product.find({status: true}, ['title', 'size', 'text', 'price_rub', 'price_usd', 'image'], {sort: { position: 1 }}, function(err, products) {
        Content.find({}, ['identifikator', 'text'], function(err, contents) {

            contents.forEach(function(el, index) {
                ctx[el.identifikator] = el.text;
            });

            response.render("home/index.hbs", {
                layout: 'layouts/base.hbs',
                products: products,
                contents: ctx,
            });
        });
    });
};

exports.thanks = function(request, response) {
    let transport = nodemailer.createTransport({
        host: 'smtp.mail.ru',
        port: 465,
        auth: {
           user: 'fashion.butik99@mail.ru',
           pass: 'mkHI1MXr7x'
        }
    });
    const message = {
        from: 'fashion.butik99@mail.ru',
        to: 'fashion.butik99@mail.ru',
        subject: 'Обратная связь',
        html: '<table><tr><td>Имя: </td><td>'+request.body.name+'</td></tr><tr><td>Компания: </td><td>'+request.body.company+'</td></tr><tr><td>Страна: </td><td>'+request.body.country+'</td></tr><tr><td>Email: </td><td>'+request.body.email+'</td></tr><tr><td>Телефон: </td><td>'+request.body.telephone+'</td></tr></table>'
    };
    transport.sendMail(message, function(err, info) {
        if (err) {
          // console.log(err)
          return response.sendStatus(400);
        } else {
           response.redirect('/');
        }
    });

    var ctx = {};
    Content.find({}, ['identifikator', 'text'], function(err, contents) {

        contents.forEach(function(el, index) {
            ctx[el.identifikator] = el.text;
        });

        response.render("home/thanks.hbs", {
            layout: 'layouts/base.hbs',
            contents: ctx,
        });
    });
};

exports.login = function(request, response) {
    if (request.session.loggedin) response.redirect('/admin/product');
    var ctx = {};
    Content.find({}, ['identifikator', 'text'], function(err, contents) {

        contents.forEach(function(el, index) {
            ctx[el.identifikator] = el.text;
        });

        response.render("home/login.hbs", {
            layout: 'layouts/base.hbs',
            contents: ctx,
        });
    });
};
