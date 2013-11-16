Snippets = new Meteor.Collection('Snippets');



Snippet = function(title, description, code, author){
	this.title = title;
	this.author = author  ||  'Public';
	this.code = code;
	this.description = description;
	this.score = 0;
	this.cbid = randKey(15);
}



if(Meteor.isClient){
	Meteor.subscribe("Snippets");
}



if (Meteor.isServer) {
  Meteor.startup(function () {
	var tmp = Snippets.find().fetch();
	Snippets.remove({});
  });

  	Meteor.publish("Data", function () {
		// return all datasets for user that are still in use
		return Data.find({owner: this.userId, active: true});
		//return Data.find({owner: this.userId}, {fields: {}});
	});


	isValidDataset = function(set){
		try{
			check(set.name, String);
			check(set.data, Array);
			for(i in set.data){
				check(set.data[i], Object);
			}
			check(set.owner, String);
			check(set.active, Boolean);
			check(set.credit, Number);
			check(set.stage, Number);
			check(set.progress, Number);
		} catch(e){
			return false;
		}
		// progress is [0, 100]
		if(set.progress < 0)   return false;
		if(set.progress > 100) return false;
		return true;
	}
	
	Data.allow({
  		insert: function (userId, doc) {
  			// deny if user not logged in or user isn't owner
  			if(!(userId && doc.owner === userId)){

  			}
 		},

 		remove: function(userId, doc){
 			// can only remove own data
			return doc.owner === userId;
 		}, 

 		update: function(userId, doc, fieldNames, modifier){
 			// users can only modify these fields manually
 			var mods = ['name', 'stage'];
 			for(i in fieldNames){
 				if(mods.indexOf(fieldNames[i]) == -1){
 					return false;
 				}
 			}
  			return true;
 		}
	});


	Data.deny({
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