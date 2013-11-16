





keys = ['java', 'c', 'c++', 'javascript', 'python', 'clojure', 'scala', 'erlang', 'method', 'class', 'function', 'struct', 'def', 'void', 'double', 'float', 'number', 'var', 'int', 'integer'];
nots = ['of', 'the', 'is', 'are', 'to', 'too'];



if (Meteor.isServer) {
	
	Meteor.methods({
		analyze: function (query) {
			return Snippets.find().fetch();
		},
		
		'getGists': function getGists(user) {
 			var test = new Gister(user); 			
 			return test.getSnips();
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