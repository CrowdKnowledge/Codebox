Counters = new Meteor.Collection('Counters');



Counter = function(title, value){
	this.title = title;
	this.value = value || 0;
}

isValidCounter = function(doc){
	try{
		check(doc.title, String);
		check(doc.value, Number);
	} catch(e){
		return false;
	}
	return true;
}



if(Meteor.isClient){
	Meteor.subscribe("Counters");
}



if (Meteor.isServer) {

	Meteor.startup(function () {
		// make counters here
	});

  	Meteor.publish("Counters", function () {
		return Counters.find();
	});


	Counters.allow({
  		insert: function (userId, doc) {
			return false;
 		},

 		remove: function(userId, doc){
 			return false;
 		}, 

 		update: function(userId, doc, fieldNames, modifier){
 			if(fieldNames == ['value']){
 				if(modifier == {$inc: {value: 1}}){
 					return true;
 				}
 			}
 			return false;
 		}
	});


	Counters.deny({
	  remove: function (userId, doc) {
	    // can't remove locked documents
	    return doc.locked;
	  }
	});
}