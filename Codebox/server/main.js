Words = new Meteor.Collection('Words');
alc = require('alchemy-api');

Word = function(word){
	this.str = word;
	this.score = 0;
	
}
	

if (Meteor.isServer) {

	Meteor.startup(function () {
	});

	Meteor.methods({
		analyze: function (query) {
			var rs = [];
			var db = Snippets.find().fetch();
			for(var i = 0; i < db.length; i++){
				rs.push(db[i].cbid);
			}
			return rs;
		},
		
		getalc: function(){
			return ALC();
		}
	});
}