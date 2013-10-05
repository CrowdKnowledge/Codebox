

if (Meteor.isClient) {

	Template.results.allResults = function(){
		return Snippets.find().fetch();
	}
	
	Template.results.name = function(){
		return this.name;
	}
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
