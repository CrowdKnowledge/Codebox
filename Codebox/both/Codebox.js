Snippets = new Meteor.Collection('Snippets');

Snippet = function(title, description, code, author){
	this.title = title;
	this.author = author  ||  'Public';
	this.code = code;
	this.description = description;
	this.stars = 0;
	this.cbid = randKey(15);
}

if (Meteor.isServer) {
  Meteor.startup(function () {
  });
}