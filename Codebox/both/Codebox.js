Snippets = new Meteor.Collection('Snippets');

Snippet = function(){
	name = randKey(5);
	author = randKey(5) + " " + randKey(7);
	code = randKey(500);
	stars = Math.round(Math.random());
}

if (Meteor.isServer) {
  Meteor.startup(function () {
  	Snippets.remove({});
  	for(i = 0; i < 100; i++){
  		Snippets.insert(new Snippet(i));
  	}
  });
}