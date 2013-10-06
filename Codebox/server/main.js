
if (Meteor.isServer) {
	Meteor.methods({
		analyze: function (query) {
			var rs = [];
			var db = Snippets.find().fetch();
			for(var i = 0; i < db.length; i++){
				rs.push(db[i].cbid);
			}
			return rs;
		}
	});
}
