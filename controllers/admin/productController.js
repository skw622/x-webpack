const Product = require("../../models/product.js");
var fs = require('fs');

exports.addProduct = function(request, response) {
    if (!request.session.loggedin) response.redirect('/login');
    response.render("admin/product/form.hbs", {
        layout: 'layouts/admin'
    });
};
exports.getProducts = function(request, response) {
    if (!request.session.loggedin) response.redirect('/login');

    Product.find({}, function(err, allProducts) {

        if (err) {
            console.log(err);
            return response.sendStatus(400);
        }
        response.render("admin/product/list.hbs", {
            product: allProducts,
            layout: 'layouts/admin'
        });
    });
};

exports.updateProduct = function(request, response) {
    if (!request.session.loggedin) response.redirect('/login');
    Product.findById(request.params.id, function(err, oneProduct) {
        if (err) {
            console.log(err);
            return response.sendStatus(400);
        }
        response.render("admin/product/form.hbs", {
            product: oneProduct,
            layout: 'layouts/admin'
        });
    });
};


exports.postUpdateProduct = function(request, response) {
    if (!request.session.loggedin) response.redirect('/login');
    if (!request.body) return response.sendStatus(400);

    Product.findById(request.params.id, function(err, model) {
        if (!model) {
            console.log(err);
            return response.sendStatus(400);
        }
        else {
            img = '';
            if (request.files) {
                img = request.files.image.name;
            }
            model.title = request.body.title;
            model.text = request.body.text;
            model.size = request.body.size;
            model.price_rub = request.body.price_rub;
            model.price_usd = request.body.price_usd;
            model.position = request.body.position;
            model.status = request.body.status;
            model.image = img;

            model.save(function(err) {
                if (err) return console.log(err);
                if (request.files) {
                    var image = request.files.image;
                    var dir = appRoot + '/public/uploads/images/'+model.id+'/';
                    if (!fs.existsSync(appRoot + '/public/uploads/')){
                        fs.mkdirSync(appRoot + '/public/uploads/');
                    }
                    if (!fs.existsSync(appRoot + '/public/uploads/images/')){
                        fs.mkdirSync(appRoot + '/public/uploads/images/');
                    }
                    if (!fs.existsSync(dir)){
                        fs.mkdirSync(dir);
                    }
                    image.mv(dir+image.name, function(err) {
                        if(err){
                            console.log(err);
                        }
                    });
                }
                response.redirect("/admin/product");
            });
        }
    });
};

exports.postProduct = function(request, response) {
    if (!request.session.loggedin) response.redirect('/login');
    if (!request.body) return response.sendStatus(400);
    img = '';
    if (request.files) {
        img = request.files.image.name;
    }

    const product = new Product({
        title: request.body.title,
        text: request.body.text,
        size: request.body.size,
        price_rub: request.body.price_rub,
        price_usd: request.body.price_usd,
        position: request.body.position,
        status: request.body.status,
        image: img,
    });

    product.save(function(err) {
        if (err) return console.log(err);
        if (request.files) {
            var image = request.files.image;
            var dir = appRoot + '/public/uploads/images/'+product.id+'/';
            if (!fs.existsSync(appRoot + '/public/uploads/')){
                fs.mkdirSync(appRoot + '/public/uploads/');
            }
            if (!fs.existsSync(appRoot + '/public/uploads/images/')){
                fs.mkdirSync(appRoot + '/public/uploads/images/');
            }
            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir);
            }
            image.mv(dir+image.name, function(err) {
                if(err){
                    console.log(err);
                }
            });
        }
        response.redirect("/admin/product");
    });
};

exports.deleteProduct = function(request, response) {
    if (!request.session.loggedin) response.redirect('/login');
    if (!request.body) return response.sendStatus(400);
    Product.findById(request.params.id, function(err, model) {
        if (!model) {
            console.log(err);
            return response.sendStatus(400);
        }
        else {
            model.delete(function(err) {
                if (err) return console.log(err);
                response.redirect("/admin/product");
            });
        }
    });
};
