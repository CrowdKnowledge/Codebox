Session.set('details', false);
Session.set('results', []);
Session.set('query', "");


if (Meteor.isClient) {
	  getGists = function getGists(user, callback) {
		Meteor.call('getGists', user, callback);
	  }
	  
	  getDescription = function(gist){
		return gist.description;
	  }
	  
	  getCode = function(gist){
	  
	  }
  
	Template.results.allResults = function(){
		return Session.get('results');
	}
	
	Template.results.title = function(){
		return this.title;
	}
	
	Template.results.author = function(){
		return this.author;
	}
	
	Template.results.cbid = function(){
		return this.cbid;
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



	focusOn = function(id){
		Session.set('details', true);
		console.log('focussing on ' + id);
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
											   ,document.getElementById('inputCode').value));
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

