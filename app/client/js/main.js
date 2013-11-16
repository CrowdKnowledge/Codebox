Session.set('details', false);
Session.set('results', []);
Session.set('query', "");


if (Meteor.isClient) {

	Template.results.score = function(){
		return this.score;
	}

	Template.results.isNo = function(){
		if (Meteor.userId()) {
			return Meteor.users.findOne(Meteor.userId()).votes[this._id] == -1;
		};
		return false;
	}

	Template.results.isYes = function(){
		if (Meteor.userId()) {
			return Meteor.users.findOne(Meteor.userId()).votes[this._id] == 1;
		};
		return false;
	}
  
	Template.results.allResults = function(){
		var res = Session.get('results');
		sortedRes = res.sort(function(a,b){
			return b.score - a.score;
		});
		console.log('sorted:');
		console.log(sortedRes);
		return sortedRes;
	}
	
	Template.results.title = function(){
		return this.title;
	}
	
	Template.results.author = function(){
		var user = Meteor.users.findOne(this.owner);
		if(user){
			return user.profile.name;
		}
		return "unknown author";
	}

	Template.results.ref = function(){
		var user = Meteor.users.findOne(this.owner);
		if(user){
			return 'http://github.com/' + user.services.github.username;
		}
		return "";
	}
	
	Template.details.isInDetail = function(){
		if(Session.get('details') == false){
			return false;
		} 
		return true;
	}
	
	Template.searchbar.events({
		'keydown': function (event) {
			Session.set('query', document.getElementById('searchbar').value);
		}
	});
}



openContributor = function(){
	$("html, body").animate({scrollTop: $("#inputTitle").offset().top}, 300); 
}

insertSnippet = function(){
	if(document.getElementById('inputTitle').value != "")
		if(document.getElementById('inputDescription').value != "")
			if(document.getElementById('inputCode').value != ""){
				Snippets.insert(new Snippet(document.getElementById('inputTitle').value
										   ,document.getElementById('inputDescription').value
										   ,document.getElementById('inputCode').value,
										   ['snippet']));
			}
	document.getElementById('inputTitle').value = "";
	document.getElementById('inputDescription').value = "";
	document.getElementById('inputCode').value = "";
	Session.set('query', document.getElementById('searchbar').value);
}


Deps.autorun(function () {
	// should add a cancel call here
	if(Session.get('query') != ''  && typeof(Session.get('query')) != 'undefined'){
		Meteor.call('analyze', Session.get('query'), function(e, r){
			Session.set('results', r);
		});
	}
});


makeNo = function(id){
	if(Meteor.userId()){
		var usr = Meteor.users.findOne(Meteor.userId());
		if(usr){
			if(usr.votes[id] != -1){
				var newVotes = usr.votes;
				newVotes[id] = -1;
				Meteor.users.update(Meteor.userId(), {$set: {votes: newVotes}});
				// if prev liked, dislike
				if(usr.votes[id] == 1){
					Snippets.update(id, {$inc: {score: -2}})
				// if prev nothing, dislike
				} else{
					Snippets.update(id, {$inc: {score: -1}})
				}
			}
		}
	}
}

makeYes = function(id){
	if(Meteor.userId()){
		var usr = Meteor.users.findOne(Meteor.userId());
		if(usr){
			if(usr.votes[id] != 1){
				var newVotes = usr.votes;
				newVotes[id] = 1;
				Meteor.users.update(Meteor.userId(), {$set: {votes: newVotes}});
				// if prev disliked, like
				if(usr.votes[id] == -1){
					Snippets.update(id, {$inc: {score: +2}})
				// if prev nothing, dislike
				} else{
					Snippets.update(id, {$inc: {score: +1}})
				}
			}
		}
	}
}

