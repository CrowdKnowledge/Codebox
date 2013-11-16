if(Meteor.isClient){
	Meteor.subscribe('userData');
}



if(Meteor.isServer){

	Meteor.publish("userData", function () {
		// only show users their profile, username, and credit
		return Meteor.users.find();
	});

	Meteor.users.allow({
		update: function(userId, doc, fieldNames, modifier){
 			return true;
 		}
	});

	Accounts.onCreateUser(function(options, user) {
		user.profile = options.profile || {};
		user.emailCount = 0;
		// no initial credit
		user.score = 0;
		user.votes = {};
		return user;
	});
	
	// Validate username, sending a specific error message on failure.
	Accounts.validateNewUser(function (user) {
		// if (!user.username || user.username.length < 3){
		// 	throw new Meteor.Error(403, "Username must have at least 3 characters");
		// }
		return true;
	});
}