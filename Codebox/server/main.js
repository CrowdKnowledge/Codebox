keys = ['java', 'c', 'c++', 'javascript', 'python', 'clojure', 'scala', 'erlang', 'method', 'class', 'function', 'struct', 'def', 'void', 'double', 'float', 'number', 'var', 'int', 'integer'];
nots = ['of', 'the', 'is', 'are', 'to', 'too'];

if (Meteor.isServer) {
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
						}
					}
				}
				
				for(var k = 0; k < parts.length; k++){
					for(var m = 0; m < dbparts.length; m++){
						if(levenshteinDistance(parts[k], dbparts[m]) <= 1  &&  nots.indexOf(parts[k]) == -1){
							scr += 2;
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
			}
			return a;
		},
		
		getalc: function(){
			return ALC();
		}
	});
}


var levenshteinDistance = function(u, v) {
		var m = u.length;
		var n = v.length;
		var D = [];
		for(var i = 0; i <= m; i++) {
			D.push([]);
			for(var j = 0; j <= n; j++) {
				D[i][j] = 0;
			}
		}
		for(var i = 1; i <= m; i++) {
			for(var j = 1; j <= n; j++) {
				if (j == 0) {
					D[i][j] = i;
				} else if (i == 0) {
					D[i][j] = j;
				} else {
					D[i][j] = [D[i-1][j-1] + (u[i-1] != v[j-1]), D[i][j-1] + 1, D[i-1][j] + 1].sort()[0];
				}
			}
		}
		return D[m][n];
	};