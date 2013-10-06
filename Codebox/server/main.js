keys = ['java', 'c', 'c++', 'javascript', 'python', 'clojure', 'scala', 'erlang', 'method', 'class', 'function', 'struct', 'def', 'void', 'double', 'float', 'number', 'var', 'int', 'integer'];
nots = ['of', 'the', 'is', 'are', 'to', 'too'];

if (Meteor.isServer) {

	Meteor.startup(function () {
	});

	Meteor.methods({
		analyze: function (query) {
			var parts = query.split(' ');
			var rs = [];
			var db = Snippets.find().fetch();
			for(var i = 0; i < db.length; i++){
				var scr = 0;
				
				var dbparts = db[i].description.split(' ');
				
				for(var k = 0; k < keys.length; k++){
					if(parts.indexOf(keys[k]) != -1){
						if(dbparts.indexOf(keys[k]) != -1){
							scr += 5;
							console.log('+ FIVE');
						}
					}
				}
				
				for(var k = 0; k < parts.length; k++){
					for(var m = 0; m < dbparts.length; m++){
						if(parts[k] == dbparts[m]  &&  nots.indexOf(parts[k]) == -1){
							scr += 2;
							console.log('+ TWO');
						}
					}
				}
				
				rs.push({
					id: db[i].cbid,
					score: scr
				});
			}
			rs.sort(function(a, b){return b.score - a.score;});
			a = [];
			for(var i = 0; i < rs.length; i++){
				a.push(rs[i].id);
				console.log(rs[i].score);
			}
			return a;
		},
		
		getalc: function(){
			return ALC();
		}
	});
}