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
		return this.author;
	}
	
	Template.results.cbid = function(){
		console.log('called');
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
console.log('something');
    $("html, body").animate({scrollTop: $("#inputTitle").offset().top}, 300); 
}

insertSnippet = function(){
	Snippets.insert(new Snippet(document.getElementById('inputTitle').value
				 	 		   ,document.getElementById('inputDescription').value
				 	 		   ,document.getElementById('inputCode').value));
}


Deps.autorun(function () {
	console.log(Session.get('query'));
});
