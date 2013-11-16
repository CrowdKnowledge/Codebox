if (Meteor.isServer) {
	igs = [' on', ' a', ' is', ' what', ' who', ' why', ' where', ' to', ','];

	Meteor.methods({
		analyze: function (query) {
			for(i in igs){
				query = query.split(igs[i]).join('');
			}
			parts = query.split(' ');
			var out = Snippets.find().fetch();
			for(p in parts){
				var tout = [];
				for(i in out){
					if(out[i].description.indexOf(parts[p]) != -1){
						tout.push(out[i]);
					}
				}
				out = tout;
				if(out.length < 5){
					break;
				}
			}
			return out;
		}
	});
}