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
	var tmp = Snippets.find().fetch();
	for(var i = 0; i < tmp.length; i++){
		if(typeof(tmp[i].title) == 'undefined'){
			Snippets.remove(tmp[i]);
		}
	}
  });
}