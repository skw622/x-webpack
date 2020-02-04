const Content = require("../../models/content.js");

exports.addContent = function(request, response) {
    if (!request.session.loggedin) response.redirect('/login');
    response.render("admin/content/form.hbs", {
        layout: 'layouts/admin'
    });
};
exports.getContents = function(request, response) {
    if (!request.session.loggedin) response.redirect('/login');
    Content.find({}, function(err, allContents) {

        if (err) {
            console.log(err);
            return response.sendStatus(400);
        }
        response.render("admin/content/list.hbs", {
            content: allContents,
            layout: 'layouts/admin'
        });
    });
};

exports.updateContent = function(request, response) {
    if (!request.session.loggedin) response.redirect('/login');

    Content.findById(request.params.id, function(err, oneContent) {
        if (err) {
            console.log(err);
            return response.sendStatus(400);
        }
        response.render("admin/content/form.hbs", {
            content: oneContent,
            layout: 'layouts/admin'
        });
    });
};


exports.postUpdateContent = function(request, response) {
    if (!request.session.loggedin) response.redirect('/login');
    if (!request.body) return response.sendStatus(400);
    Content.findById(request.params.id, function(err, model) {
        if (!model) {
            console.log(err);
            return response.sendStatus(400);
        }
        else {
            model.title = request.body.title;
            model.identifikator = request.body.identifikator;
            model.text = request.body.text;

            model.save(function(err) {
                if (err) return console.log(err);
                response.redirect("/admin/content");
            });
        }
    });
};

exports.postContent = function(request, response) {
    if (!request.session.loggedin) response.redirect('/login');
    if (!request.body) return response.sendStatus(400);
    const contentTitle = request.body.title;
    const contentIdentifikator = request.body.identifikator;
    const contentText = request.body.text;
    const content = new Content({
        title: contentTitle,
        identifikator: contentIdentifikator,
        text: contentText
    });

    content.save(function(err) {
        if (err) return console.log(err);
        response.redirect("/admin/content");
    });
};

exports.deleteContent = function(request, response) {
    if (!request.session.loggedin) response.redirect('/login');
    if (!request.body) return response.sendStatus(400);
    Content.findById(request.params.id, function(err, model) {
        if (!model) {
            console.log(err);
            return response.sendStatus(400);
        }
        else {
            model.delete(function(err) {
                if (err) return console.log(err);
                response.redirect("/admin/content");
            });
        }
    });
};
