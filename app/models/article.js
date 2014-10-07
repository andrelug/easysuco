var mongoose = require('mongoose');


var ArticleSchema = new mongoose.Schema({
    title: String,
    slug: String,
    description: String,
    cover: String,
    subtitle: String,
    text: String,
    author: {
	    main: String,
        name: String,
        facebook: String,
        linkedIn: String,
        twitter: String
    },
	headline: String,
	link: String,
    tags: [String],
    type: String,
    status: {type: String, index: true, default: "rascunho"}
});

// create the model for users and expose it to app // Users var
module.exports = mongoose.model('Artigo', ArticleSchema);