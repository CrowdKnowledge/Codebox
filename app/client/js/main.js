Session.set('details', false);
Session.set('results', []);
Session.set('query', "");


if (Meteor.isClient) {
  
	Template.results.allResults = function(){
		return Session.get('results');
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

