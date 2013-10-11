request = Meteor.require('request');
	var GithubApi = Meteor.require('github');
	var github = new GithubApi({
	  version: "3.0.0"
	});




Scraper = function(){
	this.storage = [];
}

Scraper.prototype.scrape =  function(url){
	var t = this;
	Meteor.sync(function(done){
		request.get(url, function (error, response, body) {
			t.storage.push(body);
			console.log(body);
					done(null, {});
		})
	});
}
	
Scraper.prototype.getStorage = function(){
	console.log('got');
	return this.storage;
}

Snippet = function(title, description, code, language){
	this.title = title;
	this.description = description;
	if(typeof(language) != 'undefined'){
		this.description = language + ' ' + description;
	}
	this.code = code;
}

Gister = function(user){

  var gists = Meteor.sync(function(done) {
	github.gists.getFromUser({user: user}, function(err, data) {
	  done(null, data);
	});
  });
  
  gists = gists.result;
  
  var snips = [];
  console.log('Gists: ' + gists.length);
  for(var i = 0; i < gists.length; i++){
  	var s = new Scraper();
  	var js = [];
  	for(var j in gists[i].files){
  		js.push(j);
  	}

		s.scrape(gists[i].files[js[0]].raw_url);


  	var t = gists[i].id;
  	var d = gists[i].description;
  	var c = s.getStorage();
  	console.log('over');

  	c = c.join('\n');

  	snips.push(new Snippet(t, d, c));
  }
  
  this.getSnips = function(){
  	return snips;
  }
}









keys = ['java', 'c', 'c++', 'javascript', 'python', 'clojure', 'scala', 'erlang', 'method', 'class', 'function', 'struct', 'def', 'void', 'double', 'float', 'number', 'var', 'int', 'integer'];
nots = ['of', 'the', 'is', 'are', 'to', 'too'];



if (Meteor.isServer) {
	
	LAST = 0;
	i = 0;
	scrape = function(url){
		request.get(url, function (error, response, body) {
			out = body;
			console.log(out);
			i++;
			LAST = out;
		});
	}

	
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
							scr += 7;
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
		
		'getGists': function getGists(user) {
// 		  var GithubApi = Meteor.require('github');
// 		  var github = new GithubApi({
// 			  version: "3.0.0"
// 		  });
// 	
// 		  var gists = Meteor.sync(function(done) {
// 			github.gists.getFromUser({user: user}, function(err, data) {
// 			  done(null, data);
// 			});
// 		  });
// 	
//		  return gists.result;
			console.log('User: ' + user);
 			var test = new Gister(user); 			
 			return test.getSnips();
		},
		
		getLast: function(url){
			scrape(url);
			return LAST;
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