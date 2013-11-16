Snippets = new Meteor.Collection('Snippets');



Snippet = function(title, description, code, collections){
	this.title = title;
	this.owner = Meteor.userId();
	this.code = code;
	this.description = description;
	this.collections = collections;
	this.comments = []
	this.score = 0;
	this.codebox = 'main'
	this.visable = true;
}

isValidSnippet = function(doc){
	try{
		check(doc.title, String);
		check(doc.owner, String);
		check(doc.code, String);
		check(doc.description, String);
		check(doc.collections, Array);
		check(doc.comments, Array);
		check(doc.score, Number);
		check(doc.codebox, String);		
		check(doc.visable, Boolean);
	} catch(e){
		return falses;
	}
	return true;
}



if(Meteor.isClient){
	Meteor.subscribe("Snippets");
}



if (Meteor.isServer) {

	Meteor.startup(function () {
		//Snippets.remove({});
	});

  	Meteor.publish("Snippets", function () {
		return Snippets.find({visable: true});
	});


	
	Snippets.allow({
  		insert: function (userId, doc) {
  			// deny if user not logged in or user isn't owner
  			if(!(userId && doc.owner === userId)){
  				return false;
  			}

  			if(isValidSnippet(doc)){
  				return true;
			}
			return false;
 		},

 		remove: function(userId, doc){
 			// can only remove own Snippets
			return doc.owner === userId;
 		}, 

 		update: function(userId, doc, fieldNames, modifier){
 			return false;
 		}
	});


	Snippets.deny({
	  update: function (userId, docs, fields, modifier) {
	    // can't change owners
	    return _.contains(fields, 'owner');
	  },
	  remove: function (userId, doc) {
	    // can't remove locked documents
	    return doc.locked;
	  },
	  fetch: ['locked'] // no need to fetch 'owner'
	});
}